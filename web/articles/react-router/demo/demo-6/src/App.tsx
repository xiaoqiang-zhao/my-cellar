import { NavLink, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <NavLink className="App-link" to="/about">About</NavLink>
          {' | '}
          <NavLink className="App-link" to="/inbox">Inbox</NavLink>
        </p>
      </header>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default App
