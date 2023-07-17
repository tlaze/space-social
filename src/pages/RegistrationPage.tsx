import { ReactEventHandler, useEffect, useState } from "react";
import InputField from "../components/InputField";
import { useDao } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";


export interface FormData{
    username:string 
    email:string 
    password:string 
    password2:string
}

export interface FormErrors{
    usernameError:string 
    emailError:string 
    passwordError:string 
    password2Error:string
}

export default function RegistrationPage(){
    const [formData, setFormData] = useState<FormData>({username:"",email:"",password:"",password2:""});
    const [formErrors, setFormErrors] = useState<FormErrors>({usernameError:"",emailError:"",passwordError:"",password2Error:""})
    const [valid, setValid] = useState<boolean>(true);
    const router = useNavigate();
    const dao = useDao();

    useEffect(()=>{
        validate();
    },[formData,formErrors])

    function setUser(e:React.ChangeEvent<HTMLInputElement>){
        const val = e.target.value;
        (val.length < 3 ) ? setFormErrors({...formErrors, usernameError:"Username must have at least 3 characters"}):setFormErrors({...formErrors, usernameError:""});
        setFormData({...formData, username:val})
    }

    function setEmail(e:React.ChangeEvent<HTMLInputElement>){
        const val = e.target.value;
        val.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? setFormErrors({...formErrors, emailError:""}):setFormErrors({...formErrors, emailError:"Not a valid email address"});
        setFormData({...formData, email:val})
    }

    function setPassword(e:React.ChangeEvent<HTMLInputElement>){
        const val = e.target.value;
        (val.length < 9 ) ? setFormErrors({...formErrors, passwordError:"Password must have at least 8 characters"}):setFormErrors({...formErrors, passwordError:""});
        setFormData({...formData, password:val})
    }

    function setPassword2(e:React.ChangeEvent<HTMLInputElement>){
        const val = e.target.value;
        (val.localeCompare(formData.password) ) ? setFormErrors({...formErrors, password2Error:"Passwords must match"}):setFormErrors({...formErrors, password2Error:""});
        setFormData({...formData, password2:val})
    }

    function submitData(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(formData)
        dao.put({userId:0,userName:formData.username,userEmail:formData.email,userPassword:formData.password});
        router("/login");
    }

    function validate(){
        if(formData.username && !formErrors.usernameError && formData.email && !formErrors.emailError && formData.password && !formErrors.passwordError && formData.password2 && !formErrors.password2Error){
            setValid(false)
        }else{setValid(true)}
    }

    return<>
        
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <h1>Register</h1>
            <form onSubmit={submitData}>
                <InputField name={"username"} label={"Username"} type={"text"} placeholder={"Select a username"} error={formErrors.usernameError} callback={setUser} value={formData.username}/>
                <InputField name={"email"} label={"Email"} type={"email"} placeholder={"example@example.com"} error={formErrors.emailError} callback={setEmail} value={formData.email}/>
                <InputField name={"password"} label={"Password"} type={"password"} placeholder={"super secret password"} error={formErrors.passwordError} callback={setPassword} value={formData.password}/>
                <InputField name={"password2"} label={"Retype Password"} type={"password"} placeholder={"type password again to verify"} error={formErrors.password2Error} callback={setPassword2} value={formData.password2}/>
                <input disabled={valid} type="submit"></input>
            </form>
        </div>
    </>
}