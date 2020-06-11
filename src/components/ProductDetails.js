import { useCallback } from "react";
import { queryCache, useMutation } from "react-query";
import Link from "next/link";
import Router from "next/router";

// Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Configurations
import { KEY_ALL_PRODUCTS_GET } from "@configs/queryKeys";

export default function ProductDetails({ product }) {
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: product.currency,
  });

  const [deleteProductMutation, { status }] = useMutation(
    async ({ id }) => {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      return await res.json();
    },
    {
      onSuccess(response, { id }) {
        queryCache.setQueryData(
          KEY_ALL_PRODUCTS_GET,
          (oldData) =>
            oldData?.filter((oldProduct) => oldProduct._id !== id) ?? []
        );

        Router.push(`/products`);
      },
    }
  );

  const onDeleteClick = useCallback(async () => {
    await deleteProductMutation({ id: product._id });
  }, [product._id, deleteProductMutation]);

  return (
    <Card className="my-5" border="0">
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="text-muted">
          {currencyFormatter.format(product.unitPrice)}
        </Card.Subtitle>
      </Card.Body>
      <Card.Img
        className="mx-auto"
        src={product.imageUrl}
        style={{ width: "50%" }}
      ></Card.Img>
      <Card.Body>
        <Row>
          <Col sm={6} className="mb-3">
            <Link
              href="/products/[id]/edit"
              as={`/products/${product._id}/edit`}
              passHref
            >
              <Button variant="outline-dark" block>
                Edit
              </Button>
            </Link>
          </Col>
          <Col sm={6}>
            <Button
              variant="outline-danger"
              block
              onClick={onDeleteClick}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Deleting..." : "Delete"}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
