import { Link } from "react-router-dom";


export default function NavBar(){

    

    return<>
        <Link to={"/"} style={{margin:"15px"}}>Home</Link>
        <Link to={"/article/:id"} style={{margin:"15px"}}>Article</Link>
        <Link to={"/register"} style={{margin:"15px"}}>Registration</Link>
        <Link to={"/login"} style={{margin:"15px"}}>Login</Link>
    </>
}