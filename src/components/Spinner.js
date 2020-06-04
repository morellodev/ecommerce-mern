// Bootstrap
import BootsrapSpinner from "react-bootstrap/Spinner";

export default function Spinner() {
  return (
    <div className="text-center py-5">
      <BootsrapSpinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </BootsrapSpinner>
    </div>
  );
}
