import { useState } from 'react'
import cnuSymbol from '../assets/CNU_symbol.png'

const navigation = [
  { label: 'HOME', href: '/', path: '/' },
  { label: 'RESEARCH', href: '/research', path: '/research' },
  {
    label: 'PEOPLE',
    href: '/people/current-members',
    path: '/people/current-members',
    activePrefix: '/people/',
    children: [
      { label: 'Professor', href: '/people/professor', path: '/people/professor' },
      { label: 'Current Members', href: '/people/current-members', path: '/people/current-members' },
      { label: 'Alumni', href: '/people/alumni', path: '/people/alumni' },
    ],
  },
  { label: 'PUBLICATIONS', href: '/publications', path: '/publications' },
  { label: 'RESOURCES', href: '/resources', path: '/resources' },
  { label: 'NEWS', href: '/news', path: '/news' },
  { label: 'CONTACT', href: '/contact', path: '/contact' },
]

function Header({ currentPath, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="site-brand" href="/" onClick={(event) => { event.preventDefault(); closeMenu(); onNavigate('/') }}>
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
          {navigation.map((item) => (
            <div className={`navigation-item${item.children ? ' has-submenu' : ''}`} key={item.label}>
              <a
                className={item.path === currentPath || item.activePrefix && currentPath.startsWith(item.activePrefix) ? 'is-active' : ''}
                href={item.href}
                onClick={(event) => {
                  closeMenu()
                  if (item.path) {
                    event.preventDefault()
                    onNavigate(item.path)
                  }
                }}
              >
                {item.label}
              </a>
              {item.children && (
                <div className="navigation-submenu" aria-label="People sections">
                  {item.children.map((child) => (
                    <a href={child.href} key={child.label} onClick={(event) => { event.preventDefault(); closeMenu(); onNavigate(child.path) }}>{child.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
