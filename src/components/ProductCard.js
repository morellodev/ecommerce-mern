import Link from "next/link";

// Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ProductCard({ product }) {
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: product.currency,
  });

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={product.imageUrl} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">
          {currencyFormatter.format(product.unitPrice)}
        </Card.Subtitle>
        <Link href="/products/[id]" as={`/products/${product._id}`} passHref>
          <Button variant="outline-dark" block>
            Details
          </Button>
        </Link>
        <Button variant="dark" block>
          Add to Cart
        </Button>
      </Card.Body>

      <style jsx>{`
        :global(.card > img) {
          height: 384px;
          object-fit: contain;
        }
      `}</style>
    </Card>
  );
}
