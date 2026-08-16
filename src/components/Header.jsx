import { useEffect, useState } from 'react'
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
  { label: 'ACTIVITIES', href: '/activities', path: '/activities' },
  { label: 'NEWS', href: '/news', path: '/news' },
  { label: 'CONTACT', href: '/contact', path: '/contact' },
]

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

function siteHref(path) {
  return path === '/' ? (basePath ? `${basePath}/` : '/') : `${basePath}${path}`
}

function Header({ currentPath, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [peopleMenuOpen, setPeopleMenuOpen] = useState(false)
  const [isMobileNavigation, setIsMobileNavigation] = useState(() => window.matchMedia('(max-width: 860px)').matches)
  const closeMenu = () => {
    setMenuOpen(false)
    setPeopleMenuOpen(false)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 860px)')
    const handleBreakpointChange = (event) => {
      setIsMobileNavigation(event.matches)
      setMenuOpen(false)
      setPeopleMenuOpen(false)
    }

    mediaQuery.addEventListener('change', handleBreakpointChange)
    return () => mediaQuery.removeEventListener('change', handleBreakpointChange)
  }, [])

  useEffect(() => {
    setPeopleMenuOpen(false)
  }, [currentPath])

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="site-brand" href={siteHref('/')} onClick={(event) => { event.preventDefault(); closeMenu(); onNavigate('/') }}>
          <img className="university-logo" src={cnuSymbol} alt="Chonnam National University symbol" />
          <span className="brand-copy">
            <strong>Food Processing Laboratory</strong>
            <small>Department of Marine Bio-Food Sciences<br />Chonnam National University</small>
          </span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((current) => { const nextOpen = !current; if (!nextOpen) setPeopleMenuOpen(false); return nextOpen })}>
          <span className="sr-only">Toggle navigation</span>
          <span className="menu-line" aria-hidden="true" />
          <span className="menu-line" aria-hidden="true" />
        </button>
        <nav id="primary-navigation" className={`primary-navigation${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
          {navigation.map((item) => (
            <div className={`navigation-item${item.children ? ' has-submenu' : ''}${item.children && peopleMenuOpen ? ' is-submenu-open' : ''}`} key={item.label}>
              <a
                className={item.path === currentPath || item.activePrefix && currentPath.startsWith(item.activePrefix) ? 'is-active' : ''}
                href={siteHref(item.href)}
                aria-haspopup={item.children ? 'true' : undefined}
                aria-expanded={item.children && isMobileNavigation ? peopleMenuOpen : undefined}
                aria-controls={item.children ? 'people-submenu' : undefined}
                onClick={(event) => {
                  if (item.children && isMobileNavigation) {
                    event.preventDefault()
                    setPeopleMenuOpen((current) => !current)
                    return
                  }
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
                <div className="navigation-submenu" id="people-submenu" aria-label="People sections">
                  {item.children.map((child) => (
                    <a href={siteHref(child.href)} key={child.label} onClick={(event) => { event.preventDefault(); closeMenu(); onNavigate(child.path) }}>{child.label}</a>
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
