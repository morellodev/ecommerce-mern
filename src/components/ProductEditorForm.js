import { useCallback, useState } from "react";
import { queryCache, useMutation } from "react-query";
import Router from "next/router";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Configurations
import { KEY_ALL_PRODUCTS_GET } from "@configs/queryKeys";

export default function ProductEditorForm({ product }) {
  const [formValue, setFormValue] = useState(
    () =>
      product ?? {
        name: "",
        unitPrice: 0,
        currency: "USD",
        imageUrl: "",
      }
  );

  const [formErrors, setFormErrors] = useState({
    name: false,
    unitPrice: false,
    currency: false,
    imageUrl: false,
  });

  const [addProductMutation, { status: addProductStatus }] = useMutation(
    async (data) => {
      const res = await fetch(`/api/products`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      return await res.json();
    },
    {
      onSuccess({ data }) {
        queryCache.setQueryData(KEY_ALL_PRODUCTS_GET, (oldData) => [
          ...(oldData ?? []),
          ...data.ops,
        ]);

        Router.push(`/products`);
      },
    }
  );

  const [editProductMutation, { status: editProductStatus }] = useMutation(
    async ({ id, data }) => {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      return await res.json();
    },
    {
      onSuccess({ data }, { id }) {
        console.log(data);
        queryCache.setQueryData(KEY_ALL_PRODUCTS_GET, (oldData) => {
          const editedProduct = { ...data.ops[0], _id: id };

          return (
            oldData?.map((oldProduct) =>
              oldProduct._id === id ? editedProduct : oldProduct
            ) ?? [editedProduct]
          );
        });

        Router.push(`/products`);
      },
    }
  );

  const onFormValueChange = useCallback((event) => {
    const { name, value } = event.target;

    setFormValue((oldValue) => ({
      ...oldValue,
      [name]: value,
    }));

    setFormErrors((errors) => {
      if (errors[name]) {
        return {
          ...errors,
          [name]: !value,
        };
      }

      return errors;
    });
  }, []);

  const onFormSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const errors = Object.entries(formValue)
        .filter(([, value]) => !value)
        .map(([key]) => [[key], true]);

      setFormErrors(Object.fromEntries(errors));

      if (errors.length === 0) {
        if (product) {
          editProductMutation({
            id: product._id,
            data: {
              name: formValue.name,
              unitPrice: formValue.unitPrice,
              currency: formValue.currency,
              imageUrl: formValue.imageUrl,
            },
          });
        } else {
          addProductMutation(formValue);
        }
      }
    },
    [addProductMutation, editProductMutation, formValue, product]
  );

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formValue.name}
          onChange={onFormValueChange}
          isInvalid={formErrors.name}
        />
        <Form.Control.Feedback type="invalid">
          Please specify a name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="unitPrice">
        <Form.Label>Unit Price</Form.Label>
        <Form.Control
          type="number"
          name="unitPrice"
          min="0"
          step="any"
          value={formValue.unitPrice}
          onChange={onFormValueChange}
          isInvalid={formErrors.unitPrice}
        />
        <Form.Control.Feedback type="invalid">
          Please specify a positive price.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="currency">
        <Form.Label>Currency</Form.Label>
        <Form.Control
          as="select"
          name="currency"
          custom
          value={formValue.currency}
          onChange={onFormValueChange}
          isInvalid={formErrors.currency}
        >
          <option value="USD">USD (United States of America)</option>
          <option value="EUR">EUR (European Union)</option>
          <option value="GBP">GBP (United Kingdom)</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="imageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="imageUrl"
          value={formValue.imageUrl}
          onChange={onFormValueChange}
          isInvalid={formErrors.imageUrl}
        />
        <Form.Control.Feedback type="invalid">
          Please specify an image URL.
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        className="mt-5"
        block
        disabled={
          addProductStatus === "loading" || editProductStatus === "loading"
        }
      >
        {product
          ? editProductStatus === "loading"
            ? "Saving..."
            : "Save"
          : addProductStatus === "loading"
          ? "Adding..."
          : "Add"}
      </Button>
    </Form>
  );
}
