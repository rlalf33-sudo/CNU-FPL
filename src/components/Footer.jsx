const quickLinks = [
  ['Home', '#top'], ['Research', '#research'], ['People', '#people'],
  ['Publications', '#publications'], ['Resources', '#resources'], ['News', '#news'], ['Contact', '#contact'],
]

const researchAreas = [
  'Food Processing Engineering', 'Starch & Hydrocolloid Systems', 'Marine Food Processing',
  'Hyperspectral Imaging & AI', 'Food Structure & Quality Analysis',
]

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <div className="footer-identity">
          <p className="footer-name">Food Processing Laboratory</p>
          <p className="footer-affiliation">Department of Marine Bio-Food Sciences<br />Chonnam National University</p>
          <span className="footer-accent" aria-hidden="true" />
        </div>
        <div className="footer-column">
          <p className="footer-heading">Quick Links</p>
          <ul>{quickLinks.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Research Areas</p>
          <ul>{researchAreas.map((area) => <li key={area}>{area}</li>)}</ul>
        </div>
        <div className="footer-column footer-contact">
          <p className="footer-heading">Contact</p>
          <dl className="footer-contact-details">
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:sungmin@jnu.ac.kr">sungmin@jnu.ac.kr</a></dd>
            </div>
            <div>
              <dt>Tel</dt>
              <dd><a href="tel:+82616597216">+82-61-659-7216</a></dd>
            </div>
          </dl>
          <a className="back-to-top" href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
      <div className="footer-bottom"><p>Food Processing Laboratory · Department of Marine Bio-Food Sciences · Chonnam National University</p></div>
    </footer>
  )
}

export default Footer
