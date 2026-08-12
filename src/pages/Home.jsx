import news from '../data/news.js'
import publications from '../data/publications.js'
import research from '../data/research.js'

function EmptyState({ children }) {
  return (
    <div className="empty-state">
      <span className="empty-state-line" aria-hidden="true" />
      <p>{children}</p>
    </div>
  )
}

function Home() {
  return (
    <main id="top">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Chonnam National University</p>
          <h1 id="hero-title">Food Processing Laboratory</h1>
          <p className="hero-affiliation">
            Department of Marine Bio-Food Sciences
            <br />
            Chonnam National University
          </p>
          <p className="hero-introduction">
            We study food materials, processing systems, and analytical methods to
            deepen the understanding of food structure, function, and quality.
          </p>
        </div>

        <div className="hero-visual" aria-label="Reserved area for future laboratory imagery">
          <div className="visual-field" aria-hidden="true">
            <span className="visual-axis visual-axis-horizontal" />
            <span className="visual-axis visual-axis-vertical" />
            <span className="visual-circle" />
          </div>
          <p>Laboratory image forthcoming</p>
        </div>
      </section>

      <section className="research-section" id="research" aria-labelledby="research-title">
        <div className="section-shell">
          <div className="section-heading">
            <p className="section-number">01</p>
            <div>
              <p className="eyebrow">Fields of inquiry</p>
              <h2 id="research-title">Research Areas</h2>
            </div>
          </div>

          <div className="research-list">
            {research.map((area, index) => (
              <article className="research-item" key={area.title}>
                <span className="research-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section section-shell" id="publications" aria-labelledby="publications-title">
        <div className="section-heading">
          <p className="section-number">02</p>
          <div>
            <p className="eyebrow">Selected output</p>
            <h2 id="publications-title">Recent Publications</h2>
          </div>
        </div>
        {publications.length === 0 && (
          <EmptyState>Publication records will be added as they become available.</EmptyState>
        )}
      </section>

      <section className="editorial-section section-shell" id="news" aria-labelledby="news-title">
        <div className="section-heading">
          <p className="section-number">03</p>
          <div>
            <p className="eyebrow">From the laboratory</p>
            <h2 id="news-title">Latest News</h2>
          </div>
        </div>
        {news.length === 0 && (
          <EmptyState>Laboratory news and announcements will appear here.</EmptyState>
        )}
      </section>

      <div id="people" className="anchor-target" aria-hidden="true" />
      <div id="resources" className="anchor-target" aria-hidden="true" />
    </main>
  )
}

export default Home
