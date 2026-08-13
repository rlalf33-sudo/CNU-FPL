import PageHeader from '../components/PageHeader.jsx'
import members from '../data/members.js'

function Portrait({ image, name, prominent = false, protectedImage = false }) {
  if (image) {
    return (
      <img
        className={`member-portrait-image${protectedImage ? ' is-protected' : ''}`}
        src={image}
        alt={name ? `${name} portrait` : 'Member portrait'}
        draggable={protectedImage ? false : undefined}
        onContextMenu={protectedImage ? (event) => event.preventDefault() : undefined}
      />
    )
  }

  return (
    <div className={`member-portrait-placeholder${prominent ? ' is-prominent' : ''}`} aria-label="Portrait placeholder">
      <span aria-hidden="true" />
      <p>Portrait placeholder</p>
    </div>
  )
}

function ProfessorProfile() {
  const professor = members.professor

  return (
    <section className="people-section professor-section" id="professor" aria-labelledby="professor-title">
      <div className="section-shell">
        <div className="people-section-heading"><p>01</p><h2 id="professor-title">Professor</h2></div>
        <div className="professor-profile">
          <Portrait image={professor?.image} name={professor?.name} prominent protectedImage />
          <div className="professor-details">
            <div className="professor-information">
              <h3>{professor.name}</h3>
              <p className="professor-position">{professor.position}</p>
              <p className="professor-affiliation">{professor.affiliation.map((line) => <span key={line}>{line}</span>)}</p>
              <div className="professor-field">
                <h4>Email</h4>
                <a href={`mailto:${professor.email}`}>{professor.email}</a>
              </div>
              <div className="professor-field">
                <h4>Education</h4>
                <ul>{professor.education.map((degree) => <li key={degree}>{degree}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MemberCard({ member }) {
  return (
    <article className="member-card">
      <Portrait image={member.image} name={member.name} />
      <div className="member-card-copy">
        <h3>{member.name}</h3>
        {(member.degree || member.position) && <p className="member-position">{member.degree || member.position}</p>}
        {member.research && <p className="member-research">{member.research}</p>}
        {member.email && <a href={`mailto:${member.email}`}>{member.email}</a>}
        {member.profileUrl && <a href={member.profileUrl}>View profile</a>}
      </div>
    </article>
  )
}

function StudentGroup({ title, students }) {
  const titleId = `${title.toLowerCase().replace(' ', '-')}-title`

  return (
    <section className="student-group" aria-labelledby={titleId}>
      <h3 className="student-group-heading" id={titleId}>{title}</h3>
      {students.length > 0 ? (
        <div className="member-grid">{students.map((member) => <MemberCard key={member.name} member={member} />)}</div>
      ) : (
        <div className="people-empty-state"><span aria-hidden="true" /><p>No {title.toLowerCase()} have been added yet.</p></div>
      )}
    </section>
  )
}

function CurrentMembersSection() {
  return (
    <section className="people-section current-members-section" id="current-members" aria-labelledby="current-members-title">
      <div className="section-shell">
        <div className="people-section-heading"><p>02</p><h2 id="current-members-title">Current Members</h2></div>
        <div className="student-groups">
          <StudentGroup title="Graduate Students" students={members.graduateStudents} />
          <StudentGroup title="Undergraduate Students" students={members.undergraduateStudents} />
        </div>
      </div>
    </section>
  )
}

function AlumniSection() {
  return (
    <section className="people-section alumni-section" id="alumni" aria-labelledby="alumni-title">
      <div className="section-shell">
        <div className="people-section-heading"><p>03</p><h2 id="alumni-title">Alumni</h2></div>
        {members.alumni.length > 0 ? (
          <div className="alumni-list">
            {members.alumni.map((alumnus) => (
              <article className="alumni-row" key={`${alumnus.name}-${alumnus.graduationYear || ''}`}>
                <h3>{alumnus.name}</h3>
                <p>{alumnus.degree || alumnus.position}</p>
                <p>{alumnus.graduationYear}</p>
                <p>{alumnus.currentAffiliation}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="people-empty-state is-compact"><span aria-hidden="true" /><p>Alumni records have not been added yet.</p></div>
        )}
      </div>
    </section>
  )
}

function People() {
  return (
    <main className="people-page" id="top">
      <PageHeader title="People" />
      <ProfessorProfile />
      <CurrentMembersSection />
      <AlumniSection />
    </main>
  )
}

export default People
