import React, { useState } from "react";
import { Container, Col, Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const FormikSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  description: yup.string().required("required"),
  phone: yup.string().required("required"),
});

const initialValues = {
  name: "",
  email: "",
  description: "",
  phone: "",
};

const AgentForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values, onSubmitProps) => {
    setIsLoading(true);
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    const response = await api.post(`/api/support-agents`, {
      name: values.name,
      email: values.email,
      description: values.description,
      phone: values.phone,
    });
    toast.success("Agent created");
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
            <h4>Register Agent</h4>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.phone) && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                ></Form.Control>
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
                  Register
                </Button>
              )}
            </Form>
          </FormContainer>
        )}
      </Formik>
    </div>
  );
};

export default AgentForm;
