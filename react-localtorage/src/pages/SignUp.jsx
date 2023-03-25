import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { APP_LOAD } from "../actions";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("first name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const SignUp = () => {
  const login = useSelector((state) => state.app.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleSignUp = (data) => {
    console.log("data", data);
    const users = JSON.parse(localStorage.getItem("users"));

    console.log("users", users);
    if (users && users.length) {
      const foundUser = users.find((user) => user.email === data.email);
      console.log("foundUser", foundUser);
      if (foundUser) {
        alert("User Already Exist");
      } else {
        localStorage.setItem("users", JSON.stringify([...users, data]));
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", true);
        dispatch({ type: APP_LOAD, payload: { token: true, user: data } });
        navigate("/");
      }
    } else {
      console.log("data", data);
      localStorage.setItem("users", JSON.stringify([data]));
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", true);
      dispatch({ type: APP_LOAD, payload: { token: true, user: data } });
      navigate("/");
    }
  };

//   useEffect(() => {
//     if (login) {
//       navigate("/");
//     }
//   }, [login]);

  return (
    <div className="form_bg">
      <Form
        onSubmit={handleSubmit(handleSignUp)}
        style={{ width: "30%" }}
        className="mx-auto py-3 px-4 bg-light rounded shadow-lg"
      >
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            placeholder="Enter First Name"
            {...register("firstName")}
          />
          <p className="text-danger">{errors?.firstName?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastName"
            placeholder="Enter Last Name"
            {...register("lastName")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          <p className="text-danger">{errors?.email?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <p className="text-danger">{errors?.password?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="conf_password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <p className="text-danger">{errors?.confirmPassword?.message}</p>
        </Form.Group>
        <div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
