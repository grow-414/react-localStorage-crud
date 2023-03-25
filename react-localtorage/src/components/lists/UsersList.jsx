import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

const UsersList = () => {
    const {users} = useSelector(state => state.user);
    console.log("users", users);
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
          {
            users && users.length && users.map((user, i) =>
                <tr>
                    <td>{i+1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                        <Button variant="info" className="me-2">Edit</Button>
                        <Button variant="danger">Delete</Button>
                    </td>
                </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;
