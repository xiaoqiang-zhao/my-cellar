import { Outlet, Link } from 'react-router-dom'

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
        <li>
          <Link to={`/invoices/a/b`}>
            无匹配子路由
          </Link>
        </li>
      </ul>
      <article>
        <header>详情信息:</header>
        <section>
          <Outlet/>
        </section>
      </article>
    </div>
  )
}

export default Invoices
