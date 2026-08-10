import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Self-hosted fonts. EN/FR only, so Space Grotesk is pinned to the latin
// subset (which covers every accented character French needs, including œ).
// Inter's variable build has no per-subset entrypoint; `wght` is its smallest
// one, and its unicode-range rules keep the non-latin faces from downloading.
import '@fontsource-variable/inter/wght.css'
import '@fontsource/space-grotesk/latin-400.css'
import '@fontsource/space-grotesk/latin-500.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/typography.css'
import './styles/utilities.css'

import App from './App'
import './i18n'

// Lenis owns the scroll position; letting the browser restore its own on
// reload puts the two out of sync and the page sticks wherever it was left.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
