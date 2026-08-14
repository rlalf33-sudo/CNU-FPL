import PageHeader from '../components/PageHeader.jsx'

function Research() {
  return (
    <main className="research-page" id="top">
      <PageHeader title="Research" />
      <section className="research-coming-soon" aria-labelledby="research-coming-soon-title">
        <div className="section-shell">
          <div className="research-coming-soon-content">
            <p className="research-coming-soon-label">Research Areas</p>
            <h2 id="research-coming-soon-title">Coming Soon</h2>
            <p className="research-coming-soon-description">
              We are currently preparing detailed information on our research areas and ongoing projects.
              Please check back soon.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Research
