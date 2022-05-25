import { useParams } from "react-router-dom";

function InvoiceDetail() {

  let params = useParams();

  return (
    <div>
      <header>Invoice Detail</header>
      <article>
        参数: {`number: ${params.number}`}
      </article>
    </div>
  )
}

export default InvoiceDetail
