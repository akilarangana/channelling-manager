import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="xl" fixed="top" >
      <Container>
        <Navbar.Brand href="">Patient Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="addNewPatient">Add New Patient</Nav.Link>
            <Nav.Link href="searchPatient">Search Patient</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;