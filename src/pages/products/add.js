import Head from "next/head";

// Components
import ProductEditorForm from "@components/ProductEditorForm";
import Layout from "@components/Layout";

export default function AddProduct() {
  return (
    <Layout>
      <Head>
        <title>Apple Store – Admin – Add Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-5">
        <h1 className="mb-5">Add Product</h1>

        <ProductEditorForm />
      </div>
    </Layout>
  );
}
