import { Navigate } from "react-router-dom"

const PrivateRoute = ({isLoggedIn, Component}) =>{
    return isLoggedIn ? Component : <Navigate to="/login" />
}

export default PrivateRoute;