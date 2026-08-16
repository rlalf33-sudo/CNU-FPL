import PageHeader from '../components/PageHeader.jsx'
import activities from '../data/activities.js'

function Activities() {
  return (
    <main className="activities-page" id="top">
      <PageHeader title="Activities" />
      {activities.map((club) => (
        <article className="activity-club" id={club.id} key={club.id}>
          <section className="activity-introduction">
            <div className="activity-introduction-inner section-shell">
              <div className="activity-logo-frame">
                {club.logo ? <img src={club.logo} alt={club.logoAlt} /> : <div className="activity-logo-placeholder">Logo forthcoming</div>}
              </div>
              <div className="activity-introduction-copy">
                <h2 lang="ko">{club.name}</h2>
                <p className="activity-subtitle">{club.subtitle}</p>
                <p className="activity-description">{club.description}</p>
                <dl className="activity-information">
                  <div><dt>Faculty Advisor</dt><dd>{club.advisor}</dd></div>
                  <div><dt>Participants</dt><dd>{club.participants}</dd></div>
                  <div><dt>Schedule</dt><dd>{club.schedule}</dd></div>
                  <div><dt>Established</dt><dd>{club.established}</dd></div>
                </dl>
              </div>
            </div>
          </section>

          <section className="activity-work section-shell" aria-labelledby={`${club.id}-work-title`}>
            <div className="activity-section-heading"><p>01</p><h2 id={`${club.id}-work-title`}>What We Do</h2></div>
            <div className="activity-work-list">
              {club.activityAreas.map((item, index) => (
                <div className="activity-work-item" key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

        </article>
      ))}
    </main>
  )
}

export default Activities
