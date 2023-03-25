import { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import Modals from "../Modals";
import EditForm from "../EditForm";
import { USER_LIST } from "../../actions";



const UsersList = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(null);
  const handleShow = (email) => {
    setShow(!show);
    setEmail(email);
  }

  const handleDelete = (email) =>{
    const index = users.findIndex(user => user.email === email);

    if(index > 0){
      users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
      dispatch({type: USER_LIST, payload: users});
      alert('user deleted successfully!');
    }else{
      alert('something went wrong!');
    }
  }

  return (
    <div className="py-3 px-5">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length &&
            users.map((user, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleShow(user.email)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(user.email)}>Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modals Component={<EditForm email={email} />} show={show} onHide={() => setShow(!show)} heading="Edit User Form" />
    </div>
  );
};

export default UsersList;
