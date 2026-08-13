import { useEffect, useState } from 'react'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import News from './pages/News.jsx'
import People from './pages/People.jsx'
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

  const navigate = (nextPath) => {
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
      setPath(nextPath)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const availablePaths = ['/', '/research', '/people', '/publications', '/resources', '/news', '/contact']
  const currentPath = availablePaths.includes(path) ? path : '/'

  const pages = {
    '/': <Home />,
    '/research': <Research />,
    '/people': <People />,
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
