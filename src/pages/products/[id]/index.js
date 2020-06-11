import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

// Components
import ErrorMessage from "@components/ErrorMessage";
import Layout from "@components/Layout";
import ProductDetails from "@components/ProductDetails";
import Spinner from "@components/Spinner";

// Configurations
import { KEY_PRODUCT_BY_ID_GET } from "@configs/queryKeys";

export default function Products() {
  const router = useRouter();
  const { data, error, status } = useQuery(
    router.query.id && [KEY_PRODUCT_BY_ID_GET, router.query.id],
    async (key, id) => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      if (data.status.http !== 200) {
        throw new Error(data.status.message);
      }

      return data.data;
    },
    { retry: false }
  );

  return (
    <Layout>
      <Head>
        <title>Apple Store – Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {status === "loading" && <Spinner />}

      {status === "error" && (
        <ErrorMessage message={error?.message ?? "Failed to fetch data"} />
      )}

      {status !== "loading" && data && <ProductDetails product={data} />}
    </Layout>
  );
}
