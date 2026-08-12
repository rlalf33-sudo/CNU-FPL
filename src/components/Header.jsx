import { useState } from 'react'

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
          <span className="brand-mark" aria-hidden="true">FPL</span>
          <span className="brand-name">Food Processing Laboratory</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <a
              key={item.label}
              className={item.label === 'HOME' ? 'is-active' : ''}
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
