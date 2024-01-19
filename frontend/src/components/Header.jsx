import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link
            onClick={() => navigate("/")}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Navbar.Brand>Support Ticket Entry System</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
