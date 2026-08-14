import { useEffect, useState } from 'react'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import News from './pages/News.jsx'
import Alumni from './pages/Alumni.jsx'
import CurrentMembers from './pages/CurrentMembers.jsx'
import Professor from './pages/Professor.jsx'
import Publications from './pages/Publications.jsx'
import Research from './pages/Research.jsx'
import Resources from './pages/Resources.jsx'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const redirectStorageKey = 'cnu-fpl-redirect'

function routeFromBrowserPath(pathname) {
  if (!basePath) return pathname
  if (pathname === basePath || pathname === `${basePath}/`) return '/'
  return pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length) : pathname
}

function browserPathFromRoute(route) {
  if (route === '/') return basePath ? `${basePath}/` : '/'
  return `${basePath}${route}`
}

function restorePagesRoute() {
  try {
    const redirectedLocation = window.sessionStorage.getItem(redirectStorageKey)
    if (!redirectedLocation || routeFromBrowserPath(window.location.pathname) !== '/') return

    const redirectedUrl = new URL(redirectedLocation, window.location.origin)
    if (basePath && !redirectedUrl.pathname.startsWith(`${basePath}/`)) return

    window.sessionStorage.removeItem(redirectStorageKey)
    window.history.replaceState({}, '', `${redirectedUrl.pathname}${redirectedUrl.search}${redirectedUrl.hash}`)
  } catch {
    // Session storage can be unavailable in privacy-restricted browsers.
  }
}

restorePagesRoute()

function App() {
  const [path, setPath] = useState(() => routeFromBrowserPath(window.location.pathname))

  useEffect(() => {
    const handlePopState = () => setPath(routeFromBrowserPath(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (path === '/people') {
      window.history.replaceState({}, '', browserPathFromRoute('/people/current-members'))
      setPath('/people/current-members')
    }
  }, [path])

  const navigate = (nextPath) => {
    const browserPath = browserPathFromRoute(nextPath)
    if (window.location.pathname !== browserPath) {
      window.history.pushState({}, '', browserPath)
      setPath(nextPath)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const availablePaths = ['/', '/research', '/people/professor', '/people/current-members', '/people/alumni', '/publications', '/resources', '/news', '/contact']
  const currentPath = path === '/people' ? '/people/current-members' : availablePaths.includes(path) ? path : '/'

  const pages = {
    '/': <Home />,
    '/research': <Research />,
    '/people/professor': <Professor />,
    '/people/current-members': <CurrentMembers />,
    '/people/alumni': <Alumni />,
    '/publications': <Publications />,
    '/resources': <Resources />,
    '/news': <News />,
    '/contact': <Contact />,
  }

  return (
    <div className="site-shell">
      <Header currentPath={currentPath} onNavigate={navigate} />
      {pages[currentPath]}
      <Footer />
    </div>
  )
}

export default App
