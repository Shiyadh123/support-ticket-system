import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TicketList from "./TicketList";
import { useState } from "react";

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return (
    <>
      <Row className="align-items-center justify-content-center">
        <Col>
          {loading ? (
            <button className="btn btn-dark m-2" disabled>
              Create Ticket
            </button>
          ) : (
            <Link to="/ticket-form" className="btn btn-dark m-2">
              Create Ticket
            </Link>
          )}
          {loading ? (
            <button className="btn btn-dark m-2" disabled>
              Create Agent
            </button>
          ) : (
            <Link to="/agent-form" className="btn btn-dark m-2">
              Create Agent
            </Link>
          )}
        </Col>
      </Row>

      <Container className="d-flex flex-column align-items-center justify-content-center">
        <Row className="my-2">
          <Col>
            <h3>Ticket List</h3>
          </Col>
        </Row>

        <TicketList
          loading={loading}
          startLoading={startLoading}
          stopLoading={stopLoading}
        ></TicketList>
      </Container>
    </>
  );
};

export default HomeScreen;
