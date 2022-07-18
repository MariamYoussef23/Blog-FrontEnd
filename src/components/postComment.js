import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import {getPosts} from '../actions/posts.actions'
import { ThemeContext } from "../contexts.js/theme";
import { useContext } from "react";


function PostComment({ id}) {

  const posts = useSelector (state => state.posts)
  const dispatch = useDispatch()

  const { currentMode, mode } = useContext(ThemeContext);

  const formik = useFormik({
    initialValues: {
      userId: 1,
      body: "",
    },
    validationSchema: Yup.object({
      userId: Yup.number().required("Required"),
      body: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
        console.log({values})
        newComment(values)
        formik.resetForm

      },
  });

    const newComment = async (values) => {
      try {
        const data = await axios.post(`https://api.tawwr.com/posts/${id}/comment`, values);
        const newList = await axios.get("https://api.tawwr.com/posts");
        dispatch(getPosts((newList.data.data)));
      } catch (error) {
          console.error({x: error})
      }
    };

  return (
    <>
      <Form onSubmit={formik.handleSubmit} >
        

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  placeholder="write a comment ..."
                  name="body"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.body}
                  
                  
                />
                <Form.Text className="text-muted">
                  {formik.touched.body ? <p>{formik.errors.body}</p> : null}
                </Form.Text>
              </Form.Group>
            
            <Button variant="primary" type="submit" style={{color:"white",backgroundColor: "#ff5700", border:"#ff5700"}}>
              Add Comment
            </Button>
          
      </Form>

    </>
  );
}

export default PostComment;
