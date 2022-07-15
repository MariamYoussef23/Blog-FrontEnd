import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {

  const loginStatus = useSelector((state) => state.loginStatus);
  const dispatch= useDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Not a valid email").required("Required"),
      password: Yup.string().min(8, "Must be at least 8 characters")
    }),
    onSubmit: (values) => {

    },
  });

  return (
    <Form>
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
        <Form.Control type="password" placeholder="Password" name="password" onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}/>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={()=> {formik.handleSubmit, dispatch(loginStatus(loginStatus))}}>
        login 
      </Button>
    </Form>
  );
};

export default Login;
