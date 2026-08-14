import news from '../data/news.js'
import heroImage from '../assets/Hero.png'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

function siteHref(path) {
  return `${basePath}${path}`
}

function EmptyState({ children }) {
  return <div className="empty-state"><span className="empty-state-mark" aria-hidden="true" /><p>{children}</p></div>
}

function formatDate(date) {
  const timestamp = Date.parse(date)

  if (!timestamp) return date || ''

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(timestamp))
}

function Home({ onNavigate }) {
  const latestNews = news.slice(0, 4)

  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner section-shell">
          <div className="hero-copy">
            <h1 id="hero-title">Engineering Food<br />Through Science</h1>
            <p className="hero-affiliation">Food Processing · Rheology · Food AI</p>
            <p className="hero-introduction">Exploring structure, processing, and quality to create better food systems.</p>
          </div>
          <div className="hero-visual">
            <img
              src={heroImage}
              alt="Food processing research materials and analytical equipment"
            />
          </div>
        </div>
      </section>

      <section className="home-news-preview" id="news" aria-labelledby="news-title">
        <div className="section-shell">
          <div className="home-news-heading">
            <h2 id="news-title">News</h2>
            <a href={siteHref('/news')}>View all news <span aria-hidden="true">→</span></a>
          </div>
          {latestNews.length > 0 ? (
            <div className={`home-news-grid is-count-${latestNews.length}`}>
              {latestNews.map((item, index) => {
                const itemHref = siteHref(item.detailPath)

                return (
                  <article className="home-news-card" key={item.id}>
                    <span className="home-news-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    {item.image ? (
                      <img className="home-news-image" src={item.image} alt="" />
                    ) : (
                      <div className="home-news-image-placeholder" aria-label="News image placeholder">
                        <span aria-hidden="true" />
                        <p>Image placeholder</p>
                      </div>
                    )}
                    <div className="home-news-card-copy">
                      <div className="home-news-meta">
                        {item.date && <time dateTime={item.date}>{formatDate(item.date)}</time>}
                        {item.category && <span>{item.category}</span>}
                      </div>
                      <h3>{item.title}</h3>
                      {item.summary && <p>{item.summary}</p>}
                      <a href={itemHref} aria-label={`Read ${item.title}`} onClick={(event) => { event.preventDefault(); onNavigate(item.detailPath) }}><span aria-hidden="true">→</span></a>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <EmptyState><strong>No news available yet.</strong><span>Updates on our activities will appear here.</span></EmptyState>
          )}
        </div>
      </section>
    </main>
  )
}

export default Home
