import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const FormikSchema = yup.object().shape({
  topic: yup.string().required("required"),
  description: yup.string().required("required"),
  severity: yup.string().required("required"),
  type: yup.string().required("required"),
});

const initialValues = {
  topic: "",
  description: "",
  severity: "",
  type: "",
};

const TicketForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [dateCreated, setDateCreated] = useState(Date.now());

  const handleFormSubmit = async (values, onSubmitProps) => {
    setIsLoading(true);
    const api = axios.create({
      baseURL: process.env.API_URL,
    });
    const response = await api.post(`/api/support-tickets`, {
      topic: values.topic,
      description: values.description,
      severity: values.severity,
      type: values.type,
      dateCreated: dateCreated,
    });
    toast.success("Ticket created");
    onSubmitProps.resetForm();
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div>
      <Container>
        <Col>
          <Link to="/" className="btn btn-dark m-2">
            Back
          </Link>
        </Col>
      </Container>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={FormikSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <FormContainer>
            <h4>Create Ticket</h4>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="my-2" controlId="topic">
                <Form.Label>Topic</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter topic"
                  name="topic"
                  value={values.topic}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.topic) && Boolean(errors.topic)}
                  helperText={touched.topic && errors.topic}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="dateCreated">
                <Form.Label>Date </Form.Label>
                <Row>
                  <Col className="ml-13">
                    <DatePicker
                      selected={dateCreated}
                      onChange={(date) => setDateCreated(date)}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="my-2" controlId="severity">
                <Form.Label>Severity</Form.Label>
                <Form.Select
                  defaultValue="Informational only"
                  type="text"
                  name="severity"
                  placeholder="Enter severity"
                  value={values.severity}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.severity) && Boolean(errors.severity)}
                  helperText={touched.severity && errors.severity}
                >
                  <option>Informational only</option>
                  <option>Minor impact</option>
                  <option>Significant impact</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="my-2" controlId="type">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  defaultValue="Service request tickets"
                  type="text"
                  name="type"
                  placeholder="Enter type"
                  value={values.type}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.type) && Boolean(errors.type)}
                  helperText={touched.type && errors.type}
                >
                  <option>Service request tickets</option>
                  <option>Incident tickets</option>
                  <option>Problem tickets</option>
                  <option>Change request tickets</option>
                  <option>Billing inquiries</option>
                </Form.Select>
              </Form.Group>

              {isLoading ? (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              ) : (
                <Button disabled={isLoading} type="submit" variant="primary">
                  Create
                </Button>
              )}
            </Form>
          </FormContainer>
        )}
      </Formik>
    </div>
  );
};

export default TicketForm;
