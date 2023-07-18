import { Link } from "react-router-dom";


export default function NavBar(){

    

    return<>
        <Link to={"/"} style={{}}>Home</Link>
        <Link to={"/article/:id"}>Article</Link>
        <Link to={"/register"}>Registration</Link>
        <Link to={"/login"}>Login</Link>
    </>
}