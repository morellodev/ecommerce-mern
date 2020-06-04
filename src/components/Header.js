import Link from "next/link";
import { useRouter } from "next/router";

// Bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  const router = useRouter();

  return (
    <Navbar
      className="shadow-sm"
      bg="dark"
      variant="dark"
      sticky="top"
      expand="lg"
    >
      <Link href="/" passHref>
        <Navbar.Brand>Apple</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="top-navbar-nav" />
      <Navbar.Collapse id="top-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/" passHref>
            <Nav.Link active={router.pathname === "/"}>Home</Nav.Link>
          </Link>
          <Link href="/products" passHref>
            <Nav.Link active={router.pathname.startsWith("/products")}>
              Products
            </Nav.Link>
          </Link>
        </Nav>
        <Nav>
          <Link href="/cart" passHref>
            <Nav.Link active={router.pathname === "/cart"}>Cart</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
