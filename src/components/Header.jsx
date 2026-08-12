import { useState } from 'react'
import cnuSymbol from '../assets/CNU_symbol.png'

const navigation = [
  { label: 'HOME', href: '#top' },
  { label: 'RESEARCH', href: '#research' },
  { label: 'PEOPLE', href: '#people' },
  { label: 'PUBLICATIONS', href: '#publications' },
  { label: 'RESOURCES', href: '#resources' },
  { label: 'NEWS', href: '#news' },
  { label: 'CONTACT', href: '#contact' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="site-brand" href="#top" onClick={closeMenu}>
          <img className="university-logo" src={cnuSymbol} alt="Chonnam National University symbol" />
          <span className="brand-copy">
            <strong>Food Processing Laboratory</strong>
            <small>Department of Marine Bio-Food Sciences<br />Chonnam National University</small>
          </span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((current) => !current)}>
          <span className="sr-only">Toggle navigation</span>
          <span className="menu-line" aria-hidden="true" />
          <span className="menu-line" aria-hidden="true" />
        </button>
        <nav id="primary-navigation" className={`primary-navigation${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
          {navigation.map((item) => <a key={item.label} className={item.label === 'HOME' ? 'is-active' : ''} href={item.href} onClick={closeMenu}>{item.label}</a>)}
        </nav>
      </div>
    </header>
  )
}

export default Header
