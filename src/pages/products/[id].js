import Head from "next/head";

// Components
import Layout from "@components/Layout";

function Products({ data }) {
  return (
    <Layout>
      <Head>
        <title>Apple Store – Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.DEPLOY_URI}/api/products/${params.id}`
  );
  const data = await res.json();

  return { props: { data } };
}

export default Products;
