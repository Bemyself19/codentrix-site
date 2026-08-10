import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Self-hosted fonts — two families, latin subsets only. EN/FR are the only
// locales, so shipping cyrillic/greek/vietnamese faces is pure dead weight.
import '@fontsource-variable/inter/latin.css'
import '@fontsource/space-grotesk/latin-400.css'
import '@fontsource/space-grotesk/latin-500.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/typography.css'
import './styles/utilities.css'

import App from './App'
import './i18n'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
