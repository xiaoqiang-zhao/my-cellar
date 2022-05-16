import { useParams, Link } from "react-router-dom";

function InvoiceDetail() {

  let params = useParams();

  return (
    <div>
      <header>Invoice Detail</header>
      <article>
        <div>
          参数: {`number: ${params.number}`}
        </div>
        <Link to="/invoices">返回列表</Link>
      </article>
    </div>
  )
}

export default InvoiceDetail
