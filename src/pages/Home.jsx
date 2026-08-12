import news from '../data/news.js'
import publications from '../data/publications.js'
import research from '../data/research.js'
import heroImage from '../assets/Hero.png'

function EmptyState({ children }) {
  return <div className="empty-state"><span className="empty-state-mark" aria-hidden="true" /><p>{children}</p></div>
}

function Home() {
  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner section-shell">
          <div className="hero-copy">
            <h1 id="hero-title">Food Processing<br />Laboratory</h1>
            <p className="hero-affiliation">Department of Marine Bio-Food Sciences,<br />Chonnam National University</p>
            <p className="hero-introduction">Advancing food processing through structure, engineering, and intelligent analysis for sustainable and healthy food systems.</p>
          </div>
          <div className="hero-visual">
            <img
              src={heroImage}
              alt="Food processing research materials and analytical equipment"
            />
          </div>
        </div>
      </section>

      <section className="research-section" id="research" aria-labelledby="research-title">
        <div className="section-shell">
          <div className="section-heading"><h2 id="research-title">Research Areas</h2></div>
          <div className="research-list">
            {research.map((area, index) => (
              <article className="research-item" key={area.title}>
                <span className="research-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <span className="research-arrow" aria-hidden="true">→</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="updates-section">
        <div className="updates-grid section-shell">
          <section className="editorial-section" id="publications" aria-labelledby="publications-title">
            <div className="compact-heading"><h2 id="publications-title">Recent Publications</h2><a href="#publications" aria-disabled="true">View all publications <span aria-hidden="true">→</span></a></div>
            {publications.length === 0 && <EmptyState><strong>No publications available yet.</strong><span>Our latest research outputs will appear here.</span></EmptyState>}
          </section>
          <section className="editorial-section" id="news" aria-labelledby="news-title">
            <div className="compact-heading"><h2 id="news-title">Latest News</h2><a href="#news" aria-disabled="true">View all news <span aria-hidden="true">→</span></a></div>
            {news.length === 0 && <EmptyState><strong>No news available yet.</strong><span>Updates on our activities will appear here.</span></EmptyState>}
          </section>
        </div>
      </div>
      <div id="people" className="anchor-target" aria-hidden="true" />
      <div id="resources" className="anchor-target" aria-hidden="true" />
    </main>
  )
}

export default Home
