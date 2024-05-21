import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const BookingForm = ({ packageDetails }) => {
  const [formData, setFormData] = useState({
    bookedDate: "",
    startTime: "",
    endTime: "",
    firstName: "",
    lastName: "",
    email: "",
    nicNumber: "",
    homeAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic
    console.log(formData);
  };

  return (
    <Container className="mt-5">
      <h2>Booking Form</h2>
      <Row className="mt-4">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBookedDate">
              <Form.Label>Booking Date</Form.Label>
              <Form.Control
                type="date"
                name="bookedDate"
                value={formData.bookedDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNicNumber">
              <Form.Label>NIC Number</Form.Label>
              <Form.Control
                type="text"
                name="nicNumber"
                value={formData.nicNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formHomeAddress">
              <Form.Label>Home Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
