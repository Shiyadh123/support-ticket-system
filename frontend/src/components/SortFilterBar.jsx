import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const SortFilterBar = ({ setSortFilter }) => {
  return (
    <>
      <Row className="align-items-center justify-content-center m-2">
        <Col className="m-1">
          Sort By:
          <Form.Select
            aria-label="Sort-By"
            onChange={(e) => setSortFilter("sort", e.target.value)}
          >
            <option value={"all"}>All</option>
            <option value="Asc Date Created">Asc-Date Created</option>
            <option value="Des Date Created">Des-Date Created</option>
            <option value="Asc Date Resolved">Asc-Date Resolved</option>
            <option value="Des Date Resolved">Des-Date Resolved</option>
          </Form.Select>
        </Col>

        <Col className="m-1">
          Filter Status:
          <Form.Select
            aria-label="Filter-Status"
            onChange={(e) => {
              setSortFilter("status", e.target.value);
            }}
          >
            <option value={"all"}>All</option>
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="Resolved">Resolved</option>
          </Form.Select>
        </Col>

        <Col className="m-1">
          Filter Type:
          <Form.Select
            aria-label="Filter-Type"
            onChange={(e) => {
              setSortFilter("type", e.target.value);
            }}
          >
            <option value={"all"}>All</option>
            <option value="Incident tickets">Incident tickets</option>
            <option value="Service request tickets">
              Service request tickets
            </option>
            <option value="Problem tickets">Problem tickets</option>
            <option value="Change request tickets">
              Change request tickets
            </option>
            <option value="Billing inquiries">Billing inquiries</option>
          </Form.Select>
        </Col>

        <Col className="m-1">
          Filter Severity:
          <Form.Select
            aria-label="Filter-Severity"
            onChange={(e) => setSortFilter("severity", e.target.value)}
          >
            <option value={"all"}>All</option>
            <option value="Informational only">Informational only</option>
            <option value="Minor impact">Minor impact</option>
            <option value="Significant impact">Significant impact</option>
          </Form.Select>
        </Col>
      </Row>
    </>
  );
};

export default SortFilterBar;
