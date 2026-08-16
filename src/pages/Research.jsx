import PageHeader from '../components/PageHeader.jsx'
import research from '../data/research.js'
import researchScheme from '../assets/research/research-scheme.jpg'

function ResearchImage({ pillar, number }) {
  if (pillar.image) {
    return <img className="research-image" src={pillar.image} alt={pillar.imageAlt} />
  }

  return (
    <div className="research-image-placeholder" role="img" aria-label={pillar.imageAlt}>
      <span className="placeholder-index" aria-hidden="true">{number}</span>
      <span className="placeholder-line" aria-hidden="true" />
      <p>Research imagery forthcoming</p>
    </div>
  )
}

function Research() {
  return (
    <main className="research-page" id="top">
      <PageHeader title="Research" />

      <section className="research-overview" aria-labelledby="research-overview-title">
        <div className="section-shell">
          <div className="research-overview-copy">
            <h2 id="research-overview-title">Our Research Approach</h2>
            <p>From processing and structural characterization to intelligent prediction of food quality.</p>
          </div>
          <img
            className="research-scheme"
            src={researchScheme}
            alt="Overview of the laboratory's research approach"
          />
        </div>
      </section>

      <div className="research-pillars">
        {research.map((pillar, index) => {
          const number = String(index + 1).padStart(2, '0')

          return (
            <section className="research-detail" id={pillar.id} aria-labelledby={`${pillar.id}-title`} key={pillar.id}>
              <div className="research-detail-inner section-shell">
                <div className="research-detail-copy">
                  <span className="research-detail-number" aria-hidden="true">{number}</span>
                  <h2 id={`${pillar.id}-title`}>{pillar.title}</h2>
                  <p className="research-detail-description">{pillar.intro}</p>
                  <div className="research-keywords">
                    <p>Focus Areas</p>
                    <ul>{pillar.focusAreas.map((area) => <li key={area}>{area}</li>)}</ul>
                  </div>
                </div>
                <ResearchImage pillar={pillar} number={number} />
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}

export default Research
