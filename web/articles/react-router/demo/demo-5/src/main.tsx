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
          <Route path="/invoices" element={<Invoices/>}>
          <Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select an invoice</p>
              </main>
            }
          />
            {/* 当不以 "/" 开头时，可以继承上面的路径，推荐这种写法，方便修改 */}
            <Route path=":number" element={<InvoicesDetail/>} />
          </Route>
          
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
