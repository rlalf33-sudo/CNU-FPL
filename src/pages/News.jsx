import PageHeader from '../components/PageHeader.jsx'
import news from '../data/news.js'

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

function NewsImage({ item, featured = false }) {
  if (item.image) {
    return <img className="news-image" src={item.image} alt="" />
  }

  return (
    <div className={`news-image-placeholder${featured ? ' is-featured' : ''}`} aria-label="News image placeholder">
      <span aria-hidden="true" />
      <p>Image placeholder</p>
    </div>
  )
}

function NewsLink({ item, onNavigate, children }) {
  const href = `${import.meta.env.BASE_URL.replace(/\/$/, '')}${item.detailPath}`
  return <a href={href} onClick={(event) => { event.preventDefault(); onNavigate(item.detailPath) }}>{children} <span aria-hidden="true">→</span></a>
}

function FeaturedNews({ item, onNavigate }) {
  return (
    <section className="featured-news" aria-labelledby="featured-news-title">
      <div className="section-shell featured-news-inner">
        <NewsImage item={item} featured />
        <div className="featured-news-copy">
          <p className="news-label">Featured {item.category && <span>{item.category}</span>}</p>
          {item.date && <time dateTime={item.date}>{formatDate(item.date)}</time>}
          <h2 id="featured-news-title">{item.title}</h2>
          {item.summary && <p className="featured-news-summary">{item.summary}</p>}
          <NewsLink item={item} onNavigate={onNavigate}>Read more</NewsLink>
        </div>
      </div>
    </section>
  )
}

function NewsCard({ item, onNavigate }) {
  return (
    <article className="news-card">
      <NewsImage item={item} />
      <div className="news-card-copy">
        <div className="news-card-meta">
          {item.category && <span>{item.category}</span>}
          {item.date && <time dateTime={item.date}>{formatDate(item.date)}</time>}
        </div>
        <h3>{item.title}</h3>
        {item.summary && <p>{item.summary}</p>}
        <NewsLink item={item} onNavigate={onNavigate}>Read more</NewsLink>
      </div>
    </article>
  )
}

function News({ onNavigate }) {
  const featuredItem = news.find((item) => item.featured)
  const listItems = featuredItem ? news.filter((item) => item.id !== featuredItem.id) : news

  return (
    <main className="news-page" id="top">
      <PageHeader title="News" />

      {featuredItem && <FeaturedNews item={featuredItem} onNavigate={onNavigate} />}

      <section className="news-list-section" aria-labelledby="news-list-title">
        <div className="section-shell">
          <div className="news-list-heading">
            <p>Laboratory Updates</p>
            <h2 id="news-list-title">Latest News</h2>
          </div>

          {listItems.length > 0 ? (
            <div className="news-grid">{listItems.map((item) => <NewsCard key={item.id} item={item} onNavigate={onNavigate} />)}</div>
          ) : (
            <div className="news-empty-state">
              <span className="news-empty-mark" aria-hidden="true" />
              <div>
                <h3>{featuredItem ? 'No additional news available.' : 'No news available yet.'}</h3>
                <p>Laboratory updates and activities will appear here when available.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default News
