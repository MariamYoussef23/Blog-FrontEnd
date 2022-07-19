import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts.actions";
import { useContext } from "react";
import { ThemeContext } from "../contexts.js/theme";

function PostForm() {

  const { currentMode, mode } = useContext(ThemeContext);
  
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    formik.resetForm
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const postNew = async (values) => {
    try {
      const data = await axios.post("https://api.tawwr.com/posts", values);
      const posts = await axios.get("https://api.tawwr.com/posts");
      dispatch(getPosts(posts.data.data));
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      userId: "",
      body: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(20, "Min 20 Characters")
        .max(40, "Max 40 Characters")
        .required("Required"),
      userId: Yup.number()
        .min(1, "Must be a positive number")
        .max(10, "Max 10 characters")
        .required("Required"),
      body: Yup.string().min(20, "Min 20 Characters").required("Required"),
    }),
    onSubmit: (values) => {
      handleClose();
      postNew(values);
      formik.resetForm;
    },
  });

  return (
    <>
      <Button style={{color:"white",backgroundColor: "#ff5700", border:"#ff5700"}} onClick={handleShow}>
        + New Post
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton onClick={formik.resetForm} className={`border-0 ${currentMode ? mode.primaryLight : mode.primaryDark}`}>
          <Modal.Title>Your Next Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${currentMode ? mode.primaryLight : mode.primaryDark }`}>
          <div className="input-container">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>title</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Post Title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              <Form.Text className="text-muted">
                {formik.touched.title && formik.errors.title ? (
                  <p>{formik.errors.title}</p>
                ) : null}
              </Form.Text>
            </Form.Group>
          </div>
          <div className="input-container">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="number"
                placeholder="userId"
                name="userId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userId}
              />
              <Form.Text className="text-muted">
                {formik.touched.userId && formik.errors.userId ? (
                  <p>{formik.errors.userId}</p>
                ) : null}
              </Form.Text>
            </Form.Group>
          </div>
          <div className="input-container">
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control as="textarea" rows={3}
                type="text"
                placeholder=" start writing ..."
                name="body"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.body}
              />
              <Form.Text className="text-muted">
                {formik.touched.body && formik.errors.body ? (
                  <p>{formik.errors.body}</p>
                ) : null}
              </Form.Text>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer className={`${currentMode ? mode.primaryLight : mode.primaryDark } border-0`}>
          <Button style={{color:"white",backgroundColor: "#ff5700", border:"#ff5700"}} onClick={formik.handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostForm;
