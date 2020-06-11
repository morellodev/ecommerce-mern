import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

// Components
import ErrorMessage from "@components/ErrorMessage";
import Layout from "@components/Layout";
import ProductEditorForm from "@components/ProductEditorForm";
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
        <title>Apple Store – Admin – Edit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {status === "loading" && <Spinner />}

      {status === "error" && (
        <ErrorMessage message={error?.message ?? "Failed to fetch data"} />
      )}

      {status !== "loading" && data && (
        <div className="my-5">
          <h1 className="mb-5">Edit Product</h1>

          <ProductEditorForm product={data} />
        </div>
      )}
    </Layout>
  );
}
