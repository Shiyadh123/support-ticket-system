import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TicketList from "./TicketList";

const HomeScreen = () => {
  return (
    <>
      <Row className="align-items-center justify-content-center">
        <Col>
          <Link to="/ticket-form" className="btn btn-dark  m-2">
            Create Ticket
          </Link>
          <Link to="/agent-form" className="btn btn-dark m-2">
            Create Agent
          </Link>
        </Col>
      </Row>

      <Container className="d-flex flex-column align-items-center justify-content-center">
        <Row className="my-2">
          <Col>
            <h3>Ticket List</h3>
          </Col>
        </Row>

        <TicketList></TicketList>
      </Container>
    </>
  );
};

export default HomeScreen;
