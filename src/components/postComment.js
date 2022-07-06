import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function PostComment({ post, id, setNewList }) {
  const formik = useFormik({
    initialValues: {
      userId: "",
      body: "",
    },
    validationSchema: Yup.object({
      userId: Yup.number().required("Required"),
      body: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
        console.log({values})
        newComment(values)

      },
  });

    const newComment = async (values) => {
      try {
        const data = await axios.post(`https://api.tawwr.com/posts/${id}/comment`, values);
        const newList = await axios.get("https://api.tawwr.com/posts");
        setNewList(newList.data.data);
      } catch (error) {
          console.error({x: error})
      }
    };

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Card className="m-5">
          <Card.Header as="h5">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>New Comment</Form.Label>
            </Form.Group>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  type="number"
                  placeholder="userId"
                  name="userId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Form.Text className="text-muted">
                  {formik.touched.userId ? <p>{formik.errors.userId}</p> : null}
                </Form.Text>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  placeholder="write comment ..."
                  name="body"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Form.Text className="text-muted">
                  {formik.touched.body ? <p>{formik.errors.body}</p> : null}
                </Form.Text>
              </Form.Group>
            </Card.Text>
            <Button variant="primary" type="submit">
              Add Comment
            </Button>
          </Card.Body>
        </Card>
      </Form>

      {/* <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <button type="submit"> Add Comment </button>
      </Form> */}
    </>
  );
}

export default PostComment;
