import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import App from './App.jsx'
import './index.css'
import './styles/HackTheBoxTheme.css'

// Mantine theme configuration
const theme = {
  colorScheme: 'dark',
  colors: {
    htb: ['#9fef00', '#7bc800', '#6ba700', '#5a8c00', '#4a7300', '#3a5a00', '#2a4200', '#1a2900', '#0a1100', '#000000'],
  },
  primaryColor: 'htb',
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
