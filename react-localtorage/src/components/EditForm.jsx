import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("first name is required")
});

const EditForm = ({email}) => {
    const { users } = useSelector((state) => state.user);
    const [user, setUser] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleEdit = (data) => {
    const index = users.findIndex(user => user.email === email);
    if(index > -1){
        users.splice(index, 1, {...user, ...data});
        localStorage.setItem('users', JSON.stringify(users));
        alert("user updated successfully!")
    }else{
        alert('something went wrong');
    }
  };

  useEffect(() => {
    if(users && users.length){
        const foundUser = users.find(user => user.email === email);
        if(foundUser){
            setUser(foundUser);
            setValue("firstName", foundUser.firstName);
            setValue("lastName", foundUser.lastName);
        }
    }
  }, [users, email])

  return (
    <div>
      <Form onSubmit={handleSubmit(handleEdit)}>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditForm;
