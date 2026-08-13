import PageHeader from '../components/PageHeader.jsx'
import publications from '../data/publications.js'

function groupPublicationsByYear(items) {
  const indexedItems = items.map((publication, sourceIndex) => ({ publication, sourceIndex }))

  return indexedItems
    .sort((a, b) => Number(b.publication.year) - Number(a.publication.year) || a.sourceIndex - b.sourceIndex)
    .reduce((groups, { publication }) => {
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

function PublicationEntry({ publication, number }) {
  const journalDetails = [
    publication.journal,
    publication.volume && `Vol. ${publication.volume}`,
    publication.issue && `No. ${publication.issue}`,
    publication.pages && `pp. ${publication.pages}`,
    publication.year,
  ].filter(Boolean)

  return (
    <article className="publication-entry">
      <span className="publication-number">{String(number).padStart(2, '0')}</span>
      <div className="publication-entry-main">
        <div className="publication-labels">
          {publication.featured && <span>Featured</span>}
          {publication.category && <span>{publication.category}</span>}
        </div>
        <h3>{publication.title}</h3>
        {publication.authors && <p className="publication-authors">{publication.authors}</p>}
        {journalDetails.length > 0 && <p className="publication-journal">{journalDetails.join(', ')}</p>}
        {(publication.doi || publication.scholarUrl) && (
          <div className="publication-links">
            {publication.doi && <a href={`https://doi.org/${publication.doi}`}>DOI <span aria-hidden="true">→</span></a>}
            {publication.scholarUrl && <a href={publication.scholarUrl}>Scholar <span aria-hidden="true">→</span></a>}
          </div>
        )}
      </div>
    </article>
  )
}

function Publications() {
  const publicationGroups = groupPublicationsByYear(publications)

  return (
    <main className="publications-page" id="top">
      <PageHeader title="Publications" />

      <section className="publications-content" aria-label="Publication list">
        <div className="section-shell">
          <div className="publication-list-heading">
            <p>Research Output</p>
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
        </div>
      </section>
    </main>
  )
}

export default Publications
