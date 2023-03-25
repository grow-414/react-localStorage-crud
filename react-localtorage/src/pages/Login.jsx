import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { APP_LOAD } from "../actions";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
    const login = useSelector(state => state.app.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleSignIn = (data) => {
    const users = JSON.parse(localStorage.getItem("users"));
    
    if (users && users.length) {
        const foundUser = users.find(
            (user) => user.email === data.email && user.password === data.password
          );
      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        localStorage.setItem('token', true);
        dispatch({type: APP_LOAD, payload: {token: true, user: foundUser}})
        console.log("foundUser", foundUser);
      } else {
        console.log("found", foundUser);
        alert("credentials doesnot match")
      }
    }else{
        alert("user not available")
    }
  };

  useEffect(() =>{
    if(login){
        navigate("/")
    }
  }, [login])
  return (
    <div>
      <div className="form_bg">
        <Form
          onSubmit={handleSubmit(handleSignIn)}
          style={{ width: "30%" }}
          className="mx-auto py-3 px-4 bg-light rounded shadow-lg"
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            <p className="text-danger">{errors?.email?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
              <p className="text-danger">{errors?.password?.message}</p>
          </Form.Group>
          <div>
            <p>
              Don't have an account? <Link to="/signup">SignUp</Link>
            </p>
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
