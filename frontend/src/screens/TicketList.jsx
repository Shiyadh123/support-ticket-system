import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, ToggleButton } from "react-bootstrap";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import SortFilterBar from "../components/SortFilterBar";
import { toast } from "react-toastify";

const TicketList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [severityFilter, setSeverityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("all");

  const setSortFilter = (criteria, value) => {
    if (criteria === "sort") {
      setSortBy(value);
    } else if (criteria === "status") {
      setStatusFilter(value);
    } else if (criteria === "type") {
      setTypeFilter(value);
    } else if (criteria === "severity") {
      setSeverityFilter(value);
    }
  };

  const handleResolve = async (ticketId) => {
    setIsButtonLoading(true);
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    const response = await api.patch(`/api/resolve-ticket`, {
      _id: ticketId,
    });
    toast.success("Ticket resolved");
    setIsButtonLoading(false);
    fetchTickets();
  };

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    const url = `/api/support-tickets?sort=${sortBy}&statusFilter=${statusFilter}&severityFilter=${severityFilter}&typeFilter=${typeFilter}`;
    console.log(process.env.REACT_APP_API_URL);
    const response = await api.get(url);
    setTickets(response.data);
    setIsLoading(false);
  }, [severityFilter, typeFilter, statusFilter, sortBy]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <>
      <SortFilterBar setSortFilter={setSortFilter}></SortFilterBar>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>TOPIC</th>
              <th>DESCRIPTION</th>
              <th>CREATED ON</th>
              <th>SEVERITY</th>
              <th>TYPE</th>
              <th>STATUS</th>
              <th>ASSIGNED TO</th>
              <th>RESOLVED ON</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{`...${ticket._id.substr(20)}`}</td>
                <td>{ticket.topic}</td>
                <td>{ticket.description}</td>
                <td>
                  {ticket.dateCreated === ""
                    ? ""
                    : ticket.dateCreated.substr(0, 10)}
                </td>
                <td>{ticket.severity}</td>
                <td>{ticket.type}</td>

                <td>
                  <ToggleButton
                    className="m-1"
                    type="checkbox"
                    variant={
                      ticket.status === "New"
                        ? "outline-danger"
                        : ticket.status === "Assigned"
                        ? "outline-warning"
                        : "outline-success"
                    }
                    value="1"
                  >
                    {ticket.status}
                  </ToggleButton>
                </td>

                <td>{ticket.assignedName}</td>

                <td>
                  {ticket.status === "New" ? (
                    " "
                  ) : ticket.resolvedOn && ticket.resolvedOn !== "" ? (
                    ticket.resolvedOn.substr(0, 10)
                  ) : (
                    <Button
                      disabled={isButtonLoading}
                      variant="success"
                      onClick={() => {
                        handleResolve(ticket._id);
                      }}
                    >
                      Resolve
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default TicketList;
