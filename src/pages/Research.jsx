import PageHeader from '../components/PageHeader.jsx'
import research from '../data/research.js'

function Research() {
  return (
    <main className="research-page" id="top">
      <PageHeader title="Research" />

      <div className="research-detail-list">
        {research.map((area, index) => (
          <section className="research-detail" key={area.detailTitle} aria-labelledby={`research-area-${index + 1}`}>
            <div className="section-shell research-detail-inner">
              <div className="research-detail-copy">
                <span className="research-detail-number">{String(index + 1).padStart(2, '0')}</span>
                <h2 id={`research-area-${index + 1}`}>{area.detailTitle}</h2>
                <p className="research-detail-description">{area.detailDescription}</p>
                <div className="research-keywords">
                  <p>Focus Areas</p>
                  <ul>{area.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}</ul>
                </div>
              </div>
              <div className="research-image-placeholder" aria-label={`Reserved image area for ${area.detailTitle}`}>
                <span className="placeholder-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="placeholder-line" aria-hidden="true" />
                <p>Research image placeholder</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

export default Research
