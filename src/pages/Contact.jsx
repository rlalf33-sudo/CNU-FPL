import PageHeader from '../components/PageHeader.jsx'
import contact from '../data/contact.js'

function ContactValue({ label, value, type }) {
  let content = value

  if (value && type === 'email') content = <a href={`mailto:${value}`}>{value}</a>
  if (value && type === 'phone') content = <a href={`tel:${value}`}>{value}</a>

  return (
    <div className="contact-detail-row">
      <dt>{label}</dt>
      <dd className={value ? '' : 'is-placeholder'}>{value ? content : 'To be added'}</dd>
    </div>
  )
}

function ContactLinks() {
  const links = [
    ['Google Scholar', contact.links.googleScholar],
    ['ORCID', contact.links.orcid],
    ['University Profile', contact.links.universityProfile],
  ].filter(([, url]) => url)

  if (!contact.email && links.length === 0) return null

  return (
    <div className="contact-links" aria-label="Contact and profile links">
      {contact.email && <a href={`mailto:${contact.email}`}>Email <span aria-hidden="true">→</span></a>}
      {links.map(([label, url]) => <a href={url} key={label}>{label} <span aria-hidden="true">→</span></a>)}
    </div>
  )
}

function MapPlaceholder() {
  return (
    <div className="map-placeholder" aria-label="Map placeholder">
      <span className="map-axis map-axis-horizontal" aria-hidden="true" />
      <span className="map-axis map-axis-vertical" aria-hidden="true" />
      <span className="map-marker" aria-hidden="true" />
      <div>
        <p>{contact.university}</p>
        <span>{contact.campus || 'Campus information to be added'}</span>
      </div>
    </div>
  )
}

function GuidanceItem({ number, title, value }) {
  return (
    <article className="guidance-item">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{value || 'Guidance will be added when available.'}</p>
    </article>
  )
}

function Contact() {
  const guidance = contact.prospectiveStudents.guidance

  return (
    <main className="contact-page" id="top">
      <PageHeader title="Contact" />

      <section className="contact-primary-section" aria-labelledby="contact-information-title">
        <div className="section-shell contact-primary-grid">
          <div className="contact-information">
            <p className="contact-section-label">Contact Information</p>
            <h2 id="contact-information-title">{contact.labName}</h2>
            <p className="contact-institution">{contact.department}<br />{contact.university}</p>
            <dl className="contact-details">
              <ContactValue label="Address" value={contact.address} />
              <ContactValue label="Professor" value={contact.professor} />
              <ContactValue label="Email" value={contact.email} type="email" />
              <ContactValue label="Telephone" value={contact.phone} type="phone" />
            </dl>
            <ContactLinks />
          </div>

          <div className="location-panel">
            <div className="location-heading"><p>Location</p><h2>Campus Location</h2></div>
            {contact.mapUrl ? (
              <a className="map-link" href={contact.mapUrl}>View map <span aria-hidden="true">→</span></a>
            ) : (
              <MapPlaceholder />
            )}
            <dl className="location-details">
              <ContactValue label="Campus" value={contact.campus} />
              <ContactValue label="Building" value={contact.building} />
              <ContactValue label="Room" value={contact.room} />
            </dl>
          </div>
        </div>
      </section>

      <section className="prospective-section" aria-labelledby="prospective-title">
        <div className="section-shell">
          <div className="contact-editorial-heading">
            <p>01</p>
            <div><span>Join the Laboratory</span><h2 id="prospective-title">Prospective Students</h2></div>
          </div>
          <p className="prospective-introduction">{contact.prospectiveStudents.introduction}</p>
          <div className="guidance-grid">
            <GuidanceItem number="01" title="Graduate Research Opportunities" value={guidance.graduateOpportunities} />
            <GuidanceItem number="02" title="Undergraduate Research Opportunities" value={guidance.undergraduateOpportunities} />
            <GuidanceItem number="03" title="Research Interests" value={guidance.researchInterests} />
            <GuidanceItem number="04" title="Contact Documents" value={guidance.contactDocuments} />
          </div>
        </div>
      </section>

      <section className="collaboration-section" aria-labelledby="collaboration-title">
        <div className="section-shell collaboration-inner">
          <p>02</p>
          <div><span>Academic Partnerships</span><h2 id="collaboration-title">Research Collaboration</h2><p>{contact.collaboration}</p></div>
        </div>
      </section>
    </main>
  )
}

export default Contact
