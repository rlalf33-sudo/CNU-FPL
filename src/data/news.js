const newsFiles = import.meta.glob('../content/news/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

const requiredFields = ['title', 'date', 'category', 'summary']
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

function parseScalar(value) {
  const trimmed = value.trim()

  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (trimmed === 'null' || trimmed === '~') return null
  if (trimmed === '[]') return []

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed)
    } catch {
      return trimmed.slice(1, -1)
    }
  }

  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'")
  }

  return trimmed
}

function parseBlockScalar(lines, startIndex, indicator) {
  const style = indicator[0]
  const chomping = indicator[1] || ''
  const blockLines = []
  let index = startIndex

  while (index + 1 < lines.length) {
    const nextLine = lines[index + 1]
    if (nextLine && !/^\s/.test(nextLine)) break
    index += 1
    blockLines.push(nextLine)
  }

  const indentation = blockLines
    .filter((line) => line.trim())
    .reduce((smallest, line) => Math.min(smallest, line.match(/^\s*/)[0].length), Infinity)
  const normalizedLines = blockLines.map((line) => line.trim() ? line.slice(Number.isFinite(indentation) ? indentation : 0) : '')

  let value
  if (style === '|') {
    value = normalizedLines.join('\n')
  } else {
    value = normalizedLines.reduce((result, line, lineIndex) => {
      if (lineIndex === 0) return line
      const previousLine = normalizedLines[lineIndex - 1]
      return `${result}${previousLine && line ? ' ' : '\n'}${line}`
    }, '')
  }

  const withoutTrailingBreaks = value.replace(/\n+$/, '')
  if (chomping === '-') value = withoutTrailingBreaks
  else if (chomping === '+') value = `${value}\n`
  else value = `${withoutTrailingBreaks}\n`

  return { value, endIndex: index }
}

function parseFrontMatter(source, filePath) {
  const metadata = {}
  const lines = source.split('\n')

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (!line.trim() || line.trimStart().startsWith('#')) continue

    const separator = line.indexOf(':')
    if (separator < 1 || /^\s/.test(line)) {
      throw new Error(`[News] Invalid front matter in ${filePath} at line ${index + 2}.`)
    }

    const key = line.slice(0, separator).trim()
    const rawValue = line.slice(separator + 1)
    const blockIndicator = rawValue.trim().match(/^[|>][+-]?$/)?.[0]

    if (blockIndicator) {
      const block = parseBlockScalar(lines, index, blockIndicator)
      metadata[key] = block.value
      index = block.endIndex
      continue
    }

    if (rawValue.trim()) {
      metadata[key] = parseScalar(rawValue)
      continue
    }

    const values = []
    while (index + 1 < lines.length && /^\s+-\s+/.test(lines[index + 1])) {
      index += 1
      values.push(parseScalar(lines[index].replace(/^\s+-\s+/, '')))
    }
    metadata[key] = values
  }

  return metadata
}

function parseNewsFile(source, filePath) {
  const normalizedSource = source.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n')
  const match = normalizedSource.match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/)

  if (!match) {
    throw new Error(`[News] ${filePath} must begin with YAML front matter enclosed by --- lines.`)
  }

  const metadata = parseFrontMatter(match[1], filePath)

  const missingFields = requiredFields.filter((field) => typeof metadata[field] !== 'string' || !metadata[field].trim())
  if (missingFields.length > 0) {
    throw new Error(`[News] ${filePath} is missing required field(s): ${missingFields.join(', ')}.`)
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.date) || Number.isNaN(Date.parse(`${metadata.date}T00:00:00Z`))) {
    throw new Error(`[News] ${filePath} has an invalid date. Use YYYY-MM-DD.`)
  }

  const slug = filePath.split('/').pop().replace(/\.md$/i, '')

  return {
    id: slug,
    slug,
    title: metadata.title,
    date: metadata.date,
    category: metadata.category,
    summary: metadata.summary,
    image: metadata.image ? resolveSiteAsset(metadata.image) : '',
    gallery: Array.isArray(metadata.gallery)
      ? metadata.gallery.filter((image) => typeof image === 'string' && image.trim()).map(resolveSiteAsset)
      : [],
    body: match[2].trim(),
    detailPath: `/news/${slug}`,
  }
}

export function resolveSiteAsset(path) {
  if (!path || /^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) return path || ''
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${basePath}${normalizedPath}`
}

function newsTimestamp(date) {
  return Date.parse(`${date}T00:00:00Z`)
}

const news = Object.entries(newsFiles)
  .map(([filePath, source]) => parseNewsFile(source, filePath))
  .sort((a, b) => newsTimestamp(b.date) - newsTimestamp(a.date) || a.slug.localeCompare(b.slug))

export function getNewsBySlug(slug) {
  return news.find((item) => item.slug === slug)
}

export default news
