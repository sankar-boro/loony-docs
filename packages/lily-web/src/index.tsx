import React from 'react'
import { createRoot } from 'react-dom/client'
import Route from './route'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

const container: any = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <Route />
  </BrowserRouter>
)
