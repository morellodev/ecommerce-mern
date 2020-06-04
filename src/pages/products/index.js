import Head from "next/head";
import { useQuery } from "react-query";

// Components
import Layout from "@components/Layout";
import ProductsGrid from "@components/ProductsGrid";
import Spinner from "@components/Spinner";

// Configurations
import { KEY_ALL_PRODUCTS_GET } from "@configs/queryKeys";

export default function Products() {
  const { data, status } = useQuery(KEY_ALL_PRODUCTS_GET, async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    return data;
  });

  return (
    <Layout>
      <Head>
        <title>Apple Store – Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {status === "loading" && <Spinner />}

      {status !== "loading" && data?.data && (
        <ProductsGrid products={data.data} />
      )}
    </Layout>
  );
}
