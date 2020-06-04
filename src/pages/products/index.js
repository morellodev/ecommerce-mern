import Head from "next/head";

// Components
import Layout from "@components/Layout";
import ProductsGrid from "@components/ProductsGrid";

function Products({ data }) {
  return (
    <Layout>
      <Head>
        <title>Apple Store – Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductsGrid products={data} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.DEPLOY_URI}/api/products`);
  const data = await res.json();

  return { props: { data: data.data } };
}

export default Products;
