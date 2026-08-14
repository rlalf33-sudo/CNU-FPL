import PageHeader from '../components/PageHeader.jsx'
import contact from '../data/contact.js'
import campusMap from '../assets/contact/campus-map.png'

function ContactValue({ label, value, type }) {
  let content = value

  if (value && type === 'email') content = <a href={`mailto:${value}`}>{value}</a>
  if (Array.isArray(value)) {
    content = <span className="contact-multiline">{value.map((line) => <span key={line}>{line}</span>)}</span>
  }

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

  if (links.length === 0) return null

  return (
    <div className="contact-links" aria-label="Profile links">
      {links.map(([label, url]) => <a href={url} key={label}>{label} <span aria-hidden="true">→</span></a>)}
    </div>
  )
}

function MapPlaceholder() {
  return (
    <a className="map-placeholder" href={contact.mapUrl} target="_blank" rel="noopener noreferrer" aria-label="View Chonnam National University Yeosu Campus on Naver Map">
      <img className="campus-map-image" src={campusMap} alt="Map of Chonnam National University Yeosu Campus" />
      <span className="map-action">View on Naver Map <span aria-hidden="true">→</span></span>
    </a>
  )
}

function Contact() {
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
            </dl>
            <ContactLinks />
          </div>

          <div className="location-panel">
            <div className="location-heading"><p>Location</p><h2>Campus Location</h2></div>
            <MapPlaceholder />
            <dl className="location-details">
              <ContactValue label="Campus" value={contact.campus} />
              <ContactValue label="Building" value={contact.building} />
              <ContactValue label="Rooms" value={contact.rooms} />
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
        </div>
      </section>
    </main>
  )
}

export default Contact
