// Bootstrap
import Container from "react-bootstrap/Container";

// Components
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ header = true, footer = true, children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {header && <Header />}
      <Container className="flex-grow-1">{children}</Container>
      {footer && <Footer />}
    </div>
  );
}
