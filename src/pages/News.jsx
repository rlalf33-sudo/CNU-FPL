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

function contentLanguage(item) {
  return /[가-힣]/.test(`${item.title} ${item.summary || ''}`) ? 'ko' : undefined
}

function NewsImageLink({ item, onNavigate }) {
  const href = `${import.meta.env.BASE_URL.replace(/\/$/, '')}${item.detailPath}`

  return (
    <a className="news-image-link" href={href} aria-label={`Read ${item.title}`} onClick={(event) => { event.preventDefault(); onNavigate(item.detailPath) }}>
      {item.image ? (
        <img className="news-image" src={item.image} alt="" />
      ) : (
        <div className="news-image-placeholder" aria-label="News image placeholder">
          <span aria-hidden="true" />
          <p>Image placeholder</p>
        </div>
      )}
    </a>
  )
}

function NewsCard({ item, onNavigate }) {
  return (
    <article className="news-card" lang={contentLanguage(item)}>
      <NewsImageLink item={item} onNavigate={onNavigate} />
      <div className="news-card-copy">
        <div className="news-card-meta">
          {item.category && <span>{item.category}</span>}
          {item.date && <time dateTime={item.date}>{formatDate(item.date)}</time>}
        </div>
        <h3>{item.title}</h3>
        {item.summary && <p>{item.summary}</p>}
      </div>
    </article>
  )
}

function News({ onNavigate }) {
  return (
    <main className="news-page" id="top">
      <PageHeader title="News" />

      <section className="news-list-section" aria-label="News articles">
        <div className="section-shell">
          {news.length > 0 ? (
            <div className="news-grid">{news.map((item) => <NewsCard key={item.id} item={item} onNavigate={onNavigate} />)}</div>
          ) : (
            <div className="news-empty-state">
              <span className="news-empty-mark" aria-hidden="true" />
              <div>
                <h3>No news available yet.</h3>
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
