import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Link className="App-link" to="/invoices?a=123">Invoices</Link>
        </p>
      </header>
      <Outlet/>
    </div>
  )
}

export default App
