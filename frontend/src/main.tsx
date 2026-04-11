import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import CodeName from './CodeName.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CodeName></CodeName>
  </StrictMode>,
)
