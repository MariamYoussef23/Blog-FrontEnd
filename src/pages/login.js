import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions/login.actions";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts.js/theme";
import reddit_logo_light from "../images/reddit_logo_light.png";
import reddit_logo_dark from "../images/reddit_logo_dark.png";
import Image from "react-bootstrap/Image";

const Login = () => {
  const { currentMode, mode } = useContext(ThemeContext);

  const loggedIn = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    formik.resetForm;
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Not a valid email").required("Required"),
      password: Yup.string().min(8, "Must be at least 8 characters"),
    }),
    onSubmit: (values) => {},
  });

  return (
    <>
      <Button
        className="mx-2"
        style={{
          color: "white",
          backgroundColor: "#ff5700",
          border: "#ff5700",
        }}
        onClick={handleShow}
      >
        logIn
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={formik.resetForm}  className={`border-0 ${currentMode ? mode.primaryLight : mode.primaryDark}`}>
          <Modal.Title><Image
            src={` ${currentMode ? reddit_logo_light : reddit_logo_dark}`}
            height={25}
          ></Image></Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className={`${currentMode ? mode.primaryLight : mode.primaryDark }`}>
          <Form className="d-flex align-items-center justify-content-center" >
            <Card style={{ width: "25rem" }} className={`text-center ${currentMode ? mode.primaryLight : mode.secondaryDark }`}>
              <Card.Header >Login and start blogging! </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </Form.Group>

                <Button
                  style={{color:"white",backgroundColor: "#ff5700", border:"#ff5700"}}
                  onClick={() => {
                    dispatch(login());
                    formik.handleSubmit;
                    console.log(loggedIn);
                    navigate("/");
                  }}
                >
                  login
                </Button>
              </Card.Body>
            </Card>
          </Form>
        </Modal.Body>
      </Modal>

      
    </>
  );
};

export default Login;
