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

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (path === '/people') {
      window.history.replaceState({}, '', '/people/current-members')
      setPath('/people/current-members')
    }
  }, [path])

  const navigate = (nextPath) => {
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
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
