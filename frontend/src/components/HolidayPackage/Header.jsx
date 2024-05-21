// Header component for the application
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#home">Ceylon Herbcare</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="/CreatePackage">Create Package</Nav.Link>
          <Nav.Link href="/StaffDashboard">Edit Package</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
