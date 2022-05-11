import { Link } from 'react-router-dom'

function Invoices() {
  let invoices = [
    {
      name: "Santa Monica",
      number: 1995,
      amount: "$10,800",
      due: "12/05/1995",
    },
    {
      name: "Stankonia",
      number: 2000,
      amount: "$8,000",
      due: "10/31/2000",
    }
  ]

  return (
    <div>
      <header>Invoices</header>
      <ul>
        {invoices.map((item) => (
          <li key={ item.number }>
            <Link to={`/invoices/${ item.number }`}>
              { item.name }
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Invoices
