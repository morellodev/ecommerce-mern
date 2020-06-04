// Bootstrap
import Alert from "react-bootstrap/Alert";

export default function ErrorMessage({
  title = "Error",
  message = "An error has occurred.",
}) {
  return (
    <Alert className="my-5" variant="danger">
      {title && <Alert.Heading>{title}</Alert.Heading>}
      {message && <p className="mb-0">{message}</p>}
    </Alert>
  );
}
