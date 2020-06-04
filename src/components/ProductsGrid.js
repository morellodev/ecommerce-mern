// Bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Components
import ProductCard from "./ProductCard";

export default function ProductsGrid({ products = [] }) {
  return (
    <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 py-5">
      {products.map((product) => (
        <Col key={product._id} className="py-3">
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
}
