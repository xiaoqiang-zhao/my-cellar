import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Link className="App-link" to="/invoices">Invoices</Link>
        </p>
      </header>
      <Outlet/>
      <article>
        <Link to="/">首页</Link>
      </article>
    </div>
  )
}

export default App
