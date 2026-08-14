import MarkdownContent from '../components/MarkdownContent.jsx'
import PageHeader from '../components/PageHeader.jsx'

function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

function NewsDetail({ item, onNavigate }) {
  return (
    <main className="news-detail-page" id="top">
      <PageHeader title="News" />
      <article className="news-article section-shell">
        <a className="news-back-link" href={`${import.meta.env.BASE_URL}news`} onClick={(event) => { event.preventDefault(); onNavigate('/news') }}>← All News</a>
        <div className="news-article-header">
          <p>{item.category}</p>
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          <h1>{item.title}</h1>
          {item.summary && <p className="news-article-summary">{item.summary}</p>}
        </div>
        {item.image && <img className="news-article-image" src={item.image} alt="" />}
        {item.body && <div className="news-article-body"><MarkdownContent source={item.body} /></div>}
      </article>
    </main>
  )
}

export default NewsDetail
