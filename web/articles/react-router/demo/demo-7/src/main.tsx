import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Invoices from './routes/invoices'
import InvoicesDetail from './routes/invoiceDetail'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/invoices" element={<Invoices/>} />
          <Route path="/invoices/:number" element={<InvoicesDetail/>} />
          <Route
            path="*"
            element={
              <section style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </section>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
