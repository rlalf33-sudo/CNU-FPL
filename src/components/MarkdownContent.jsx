import { Fragment } from 'react'
import { resolveSiteAsset } from '../data/news.js'

function safeHref(href) {
  if (/^(?:https?:|mailto:|tel:|#|\/)/i.test(href)) return href
  return '#'
}

function renderInline(text, keyPrefix) {
  const pattern = /(!?\[[^\]]*\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g

  return text.split(pattern).filter(Boolean).map((part, index) => {
    const key = `${keyPrefix}-${index}`
    const image = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (image) return <img className="news-body-image" src={resolveSiteAsset(image[2])} alt={image[1]} key={key} />

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return <a href={safeHref(link[2])} key={key}>{link[1]}</a>
    if (part.startsWith('**')) return <strong key={key}>{part.slice(2, -2)}</strong>
    if (part.startsWith('`')) return <code key={key}>{part.slice(1, -1)}</code>
    if (part.startsWith('*')) return <em key={key}>{part.slice(1, -1)}</em>
    return <Fragment key={key}>{part}</Fragment>
  })
}

function MarkdownContent({ source }) {
  if (!source) return null

  const blocks = source.replace(/\r\n/g, '\n').split(/\n{2,}/)

  return blocks.map((block, index) => {
    const text = block.trim()
    if (!text) return null

    const heading = text.match(/^(#{1,4})\s+(.+)$/s)
    if (heading) {
      const Heading = `h${Math.min(heading[1].length + 1, 5)}`
      return <Heading key={index}>{renderInline(heading[2], `heading-${index}`)}</Heading>
    }

    if (/^([-*_])(?:\s*\1){2,}$/.test(text)) return <hr key={index} />

    const lines = text.split('\n')
    if (lines.every((line) => /^[-*+]\s+/.test(line))) {
      return <ul key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{renderInline(line.replace(/^[-*+]\s+/, ''), `ul-${index}-${lineIndex}`)}</li>)}</ul>
    }

    if (lines.every((line) => /^\d+\.\s+/.test(line))) {
      return <ol key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{renderInline(line.replace(/^\d+\.\s+/, ''), `ol-${index}-${lineIndex}`)}</li>)}</ol>
    }

    if (lines.every((line) => /^>\s?/.test(line))) {
      return <blockquote key={index}>{renderInline(lines.map((line) => line.replace(/^>\s?/, '')).join(' '), `quote-${index}`)}</blockquote>
    }

    return <p key={index}>{lines.map((line, lineIndex) => <Fragment key={lineIndex}>{lineIndex > 0 && <br />}{renderInline(line, `p-${index}-${lineIndex}`)}</Fragment>)}</p>
  })
}

export default MarkdownContent
