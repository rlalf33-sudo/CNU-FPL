import PageHeader from '../components/PageHeader.jsx'
import publications from '../data/publications.js'

function sortPublications(items) {
  return items
    .map((publication, sourceIndex) => ({ publication, sourceIndex }))
    .sort((a, b) => (
      Number(b.publication.year) - Number(a.publication.year)
      || Number(b.publication.month || 0) - Number(a.publication.month || 0)
      || Number(b.publication.day || 0) - Number(a.publication.day || 0)
      || a.sourceIndex - b.sourceIndex
    ))
    .map(({ publication }) => publication)
}

function groupPublicationsByYear(items) {
  return sortPublications(items).reduce((groups, publication) => {
    const year = String(publication.year)
    const existingGroup = groups.find((group) => group.year === year)

    if (existingGroup) {
      existingGroup.publications.push(publication)
    } else {
      groups.push({ year, publications: [publication] })
    }

    return groups
  }, [])
}

function formatCitation(publication) {
  const volumeAndIssue = publication.volume
    ? `${publication.volume}${publication.issue ? `(${publication.issue})` : ''}`
    : publication.issue ? `No. ${publication.issue}` : ''
  const details = [volumeAndIssue, publication.pages].filter(Boolean).join(', ')

  return [details, publication.year ? `(${publication.year})` : ''].filter(Boolean).join(' ')
}

function PublicationEntry({ publication, number }) {
  const citation = formatCitation(publication)

  return (
    <article className="publication-entry">
      <span className="publication-number">{String(number).padStart(2, '0')}</span>
      <div className="publication-entry-main">
        <h3>{publication.title}</h3>
        {publication.authors.length > 0 && (
          <p className="publication-authors">
            {publication.authors.map((author, index) => (
              <span key={`${author}-${index}`}>
                {index > 0 && ', '}
                {author === 'Sungmin Jeong' ? <strong>{author}</strong> : author}
              </span>
            ))}
          </p>
        )}
        {(publication.journal || citation) && (
          <p className="publication-bibliography">
            {publication.journal}
            {publication.journal && citation && <span aria-hidden="true"> · </span>}
            {citation}
          </p>
        )}
        <div className="publication-meta">
          {publication.keywords.length > 0 && (
            <p className="publication-keywords">{publication.keywords.join(' · ')}</p>
          )}
          {publication.doiUrl && (
            <a className="publication-doi" href={publication.doiUrl} target="_blank" rel="noopener noreferrer">
              DOI <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Publications() {
  const publicationGroups = groupPublicationsByYear(publications)
  const featuredPublications = sortPublications(publications.filter((publication) => publication.featured))

  return (
    <main className="publications-page" id="top">
      <PageHeader title="Publications" />

      <section className="publications-content" aria-label="Publications">
        <div className="section-shell">
          {featuredPublications.length > 0 && (
            <section className="featured-publications" aria-labelledby="featured-publications-title">
              <h2 className="publication-section-title" id="featured-publications-title">Featured Publications</h2>
              <div className="publication-entries">
                {featuredPublications.map((publication, index) => (
                  <PublicationEntry key={publication.id} publication={publication} number={index + 1} />
                ))}
              </div>
            </section>
          )}

          <section className="all-publications" aria-labelledby="all-publications-title">
            <div className="publication-list-heading">
              <h2 className="publication-section-title" id="all-publications-title">All Publications</h2>
              <p>Grouped by publication year</p>
            </div>

            {publicationGroups.length > 0 ? (
              <div className="publication-year-list">
                {publicationGroups.map((group) => (
                  <section className="publication-year-group" key={group.year} aria-labelledby={`publications-${group.year}`}>
                    <h2 id={`publications-${group.year}`}>{group.year}</h2>
                    <div className="publication-entries">
                      {group.publications.map((publication, index) => (
                        <PublicationEntry key={publication.id} publication={publication} number={index + 1} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="publications-empty-state">
                <span className="publications-empty-mark" aria-hidden="true" />
                <div>
                  <h2>No publications available yet.</h2>
                  <p>Publication records will appear here when they are added.</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}

export default Publications
