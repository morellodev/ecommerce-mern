import Link from "next/link";

// Bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";

export default function ProductDetails({ product }) {
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: product.currency,
  });

  return (
    <>
      <Breadcrumb className="mt-5">
        <Link href="/products" passHref>
          <Breadcrumb.Item>&#x2190; Back</Breadcrumb.Item>
        </Link>
      </Breadcrumb>

      <Card className="mb-5" border="0">
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="text-muted">
            {currencyFormatter.format(product.unitPrice)}
          </Card.Subtitle>
        </Card.Body>
        <Card.Img
          className="mx-auto"
          src={product.imageUrl}
          variant="bottom"
          style={{ width: "50%" }}
        ></Card.Img>
      </Card>
    </>
  );
}
