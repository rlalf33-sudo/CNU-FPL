import MemberPortrait from '../components/MemberPortrait.jsx'
import PageHeader from '../components/PageHeader.jsx'
import members from '../data/members.js'

function StudentProfile({ member }) {
  return (
    <article className="student-profile">
      <MemberPortrait image={member.image} name={member.name} />
      <div className="student-profile-copy">
        <h3>{member.name}</h3>
        <p className="student-position">{member.degree || member.position}</p>
        {member.email && <div className="member-field"><h4>Email</h4><a href={`mailto:${member.email}`}>{member.email}</a></div>}
        {member.researchKeywords?.length > 0 && <div className="member-field"><h4>Research Keywords</h4><p>{member.researchKeywords.join(' · ')}</p></div>}
      </div>
    </article>
  )
}

function StudentGroup({ title, students }) {
  const titleId = `${title.toLowerCase().replace(' ', '-')}-title`

  return (
    <section className="student-group" aria-labelledby={titleId}>
      <h2 className="student-group-heading" id={titleId}>{title}</h2>
      {students.length > 0 ? (
        <div className="student-profile-list">{students.map((member) => <StudentProfile member={member} key={member.name} />)}</div>
      ) : (
        <div className="people-empty-state"><span aria-hidden="true" /><p>No {title.toLowerCase()} have been added yet.</p></div>
      )}
    </section>
  )
}

function CurrentMembers() {
  return (
    <main className="people-page current-members-page" id="top">
      <PageHeader title="Current Members" />
      <div className="people-page-content section-shell student-groups">
        <StudentGroup title="Graduate Students" students={members.graduateStudents} />
        <StudentGroup title="Undergraduate Students" students={members.undergraduateStudents} />
      </div>
    </main>
  )
}

export default CurrentMembers
