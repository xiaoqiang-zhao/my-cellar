import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Link className="App-link" to="/about">About</Link>
          {' | '}
          <Link className="App-link" to="/inbox">Inbox</Link>
        </p>
      </header>
    </div>
  )
}

export default App
