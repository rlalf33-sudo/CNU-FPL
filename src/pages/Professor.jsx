import MemberPortrait from '../components/MemberPortrait.jsx'
import PageHeader from '../components/PageHeader.jsx'
import members from '../data/members.js'

function Professor() {
  const professor = members.professor

  return (
    <main className="people-page professor-page" id="top">
      <PageHeader title="Professor" />
      <section className="people-page-content professor-page-content" aria-labelledby="professor-name">
        <div className="section-shell professor-profile">
          <MemberPortrait image={professor.image} name={professor.name} prominent />
          <div className="professor-details">
            <div className="professor-information">
              <h1 id="professor-name">{professor.name}</h1>
              <p className="professor-position">{professor.position}</p>
              <p className="professor-affiliation">{professor.affiliation.map((line) => <span key={line}>{line}</span>)}</p>
              <div className="professor-field"><h2>Email</h2><a href={`mailto:${professor.email}`}>{professor.email}</a></div>
              <div className="professor-field"><h2>Education</h2><ul>{professor.education.map((degree) => <li key={degree}>{degree}</li>)}</ul></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Professor
