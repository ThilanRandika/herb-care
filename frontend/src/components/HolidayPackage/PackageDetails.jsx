import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Update import statement
import Header from "./Header";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
import { FaHotel, FaMapMarkerAlt } from "react-icons/fa";
import config from "../../config";

const PackageDetails = () => {
  const navigate = useNavigate(); // Update hook usage
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [defaultServices, setDefaultServices] = useState([]);
  const [addOnServices, setAddOnServices] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios
      .get(`${config.BASE_URL}/packages/${id}`)
      .then((response) => {
        const responseData = response.data;
        setPackageDetails(responseData);

        Promise.all(
          responseData.defaultServices.map((serviceId) =>
            axios.get(`${config.BASE_URL}/services/${serviceId}`)
          )
        ).then((responses) => {
          setDefaultServices(responses.map((res) => res.data));

          Promise.all(
            responseData.addOnServices.map((serviceId) =>
              axios.get(`${config.BASE_URL}/services/${serviceId}`)
            )
          ).then((addOnResponses) => {
            setAddOnServices(addOnResponses.map((res) => res.data));
          });
        });
      })
      .catch((error) =>
        console.error("Error fetching package details:", error)
      );
  }, [id]);

  const handleCheckboxChange = (serviceId) => {
    if (selectedAddOns.includes(serviceId)) {
      setSelectedAddOns(selectedAddOns.filter((id) => id !== serviceId));
    } else {
      setSelectedAddOns([...selectedAddOns, serviceId]);
    }
  };

  useEffect(() => {
    let total = packageDetails?.defaultPrice || 0;
    selectedAddOns.forEach((serviceId) => {
      const selectedService = addOnServices.find(
        (service) => service._id === serviceId
      );
      if (selectedService) {
        total += selectedService.price;
      }
    });
    setTotalPrice(total);
  }, [selectedAddOns, packageDetails, addOnServices]);

  return (
    <Container>
      <Header />
      {packageDetails && (
        <Container className="mt-5">
          <h2>{packageDetails.name}</h2>
          <Row className="mt-4">
            <Col md={6}>
              <Card style={{ width: "100%" }}>
                <Card.Img variant="top" src={packageDetails.images[0]} />
                <Card.Body>
                  <Card.Text className="text-justify">
                    {packageDetails.description}
                  </Card.Text>
                  <Card.Text className="mb-1">
                    <FaHotel className="mr-2" />
                    <span className="small m-lg-2">
                      {packageDetails.hotelName}
                    </span>
                  </Card.Text>
                  <Card.Text className="mt-0">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="small m-lg-2">
                      {packageDetails.hotelLocation}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Text>
                    <strong>Total Price:</strong> ${totalPrice}
                  </Card.Text>
                  <div className="mb-4">
                    <h5>Default Services:</h5>
                    <ListGroup variant="flush">
                      {defaultServices.map((service) => (
                        <ListGroup.Item key={service._id}>
                          {service.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                  <div className="mb-4">
                    <h5>Add-On Services:</h5>
                    <Form>
                      {addOnServices.map((service) => (
                        <Form.Check
                          key={service._id}
                          type="checkbox"
                          id={`service-${service._id}`}
                          className="add-on-service"
                          label={
                            <>
                              <span>{service.name}</span>
                              <span className="separator"> - </span>
                              <span className="service-price">
                                ${service.price}
                              </span>
                            </>
                          }
                          checked={selectedAddOns.includes(service._id)}
                          onChange={() => handleCheckboxChange(service._id)}
                        />
                      ))}
                    </Form>
                  </div>
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={() =>
                      navigate("/BookingForm", { state: { packageDetails } })
                    }
                  >
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default PackageDetails;
