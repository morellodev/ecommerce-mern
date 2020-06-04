import Head from "next/head";
import Link from "next/link";

// Bootstrap
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

// Components
import Layout from "@components/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Apple Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Jumbotron className="my-5">
        <h1>Apple Store</h1>
        <p className="lead">
          This is a simple clone of the Apple Store Online.
        </p>
        <hr className="my-4" />
        <p>
          You cannot actually buy something, but the items you see are real!
        </p>
        <Link href="/products" passHref>
          <Button variant="primary">Explore Products &#10095;</Button>
        </Link>
      </Jumbotron>
    </Layout>
  );
}
