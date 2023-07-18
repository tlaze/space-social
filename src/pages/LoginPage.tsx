import { useState } from "react";
import InputField from "../components/InputField";
import { useDao } from "../contexts/UserContext";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export interface FormData{
    username:string 
    password:string 
}

interface FormErrors{
    usernameError:string 
    passwordError:string 
}

export default function LoginPage(){

    const [formData, setFormData] = useState<FormData>({username:"",password:""});
    const [formErrors, setFormErrors] = useState<FormErrors>({usernameError:"",passwordError:""});

    const dao = useDao();
    const router = useNavigate();

    function setUser(e:React.ChangeEvent<HTMLInputElement>){
        const val = e.target.value;
        (val.length < 1 ) ? setFormErrors({...formErrors, usernameError:"Username must have a value"}):setFormErrors({...formErrors, usernameError:""});
        setFormData({...formData, username:val})
    }

    function setPassword(e:React.ChangeEvent<HTMLInputElement>){
        const val = e.target.value;
        (val.length < 1 ) ? setFormErrors({...formErrors, passwordError:"Password must have at a value"}):setFormErrors({...formErrors, passwordError:""});
        setFormData({...formData, password:val})
    }

    function submitData(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(formData)
        const success = dao.login(formData);
        console.log(dao.current);
        if(success){router("/")}
    }


    return<>
        
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <h1>Login</h1>
            <form onSubmit={submitData}>
                <InputField name={"username"} label={"Username"} type={"text"} placeholder={"Input your username"} error={formErrors.usernameError} callback={setUser} value={formData.username}/>
                <InputField name={"password"} label={"Password"} type={"password"} placeholder={"Your password"} error={formErrors.passwordError} callback={setPassword} value={formData.password}/>
                <input type="submit"></input>
            </form>
        </div>
    </>
}