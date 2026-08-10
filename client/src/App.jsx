import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import SmoothScroll from './components/motion/SmoothScroll'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import PageTransition from './components/layout/PageTransition'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Products from './pages/Products'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Apply from './pages/Apply'

const ROUTES = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/services', element: <Services /> },
  { path: '/products', element: <Products /> },
  { path: '/careers', element: <Careers /> },
  { path: '/contact', element: <Contact /> },
  { path: '/apply', element: <Apply /> }
]

export default function App() {
  const location = useLocation()

  return (
    <SmoothScroll>
      <div className="app-root">
        <NavBar />
        <main id="main">
          {/* `mode="wait"` avoids the two pages overlapping mid-transition,
              which would otherwise double the document height and jump the
              scrollbar. */}
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              {ROUTES.map(({ path, element }) => (
                <Route key={path} path={path} element={<PageTransition>{element}</PageTransition>} />
              ))}
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
