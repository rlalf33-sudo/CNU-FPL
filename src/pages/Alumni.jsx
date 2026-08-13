import PageHeader from '../components/PageHeader.jsx'
import members from '../data/members.js'

function Alumni() {
  return (
    <main className="people-page alumni-page" id="top">
      <PageHeader title="Alumni" />
      <section className="people-page-content section-shell" aria-label="Alumni list">
        {members.alumni.length > 0 ? (
          <div className="alumni-list">
            {members.alumni.map((alumnus) => (
              <article className="alumni-row" key={`${alumnus.name}-${alumnus.graduationYear || ''}`}>
                <h2>{alumnus.name}</h2><p>{alumnus.degree || alumnus.position}</p><p>{alumnus.graduationYear}</p><p>{alumnus.currentAffiliation}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="people-empty-state is-compact"><span aria-hidden="true" /><p>Alumni records have not been added yet.</p></div>
        )}
      </section>
    </main>
  )
}

export default Alumni
