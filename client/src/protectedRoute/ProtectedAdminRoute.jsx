import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/Context";



// eslint-disable-next-line react/prop-types
const ProtectedAdminRoute = ({ children }) => {
    const { admin, isAdminLoading } = useAppContext();

    if (isAdminLoading) {
        return <h1>Loading....</h1>
    }

    

    if (!admin){
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedAdminRoute