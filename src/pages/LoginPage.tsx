import { useState } from "react";
import InputField from "../components/InputField";

interface FormData{
    username:string 
    password:string 
}

interface FormErrors{
    usernameError:string 
    passwordError:string 
}

export default function LoginPage(){

    const [formData, setFormData] = useState<FormData>({username:"",password:""});
    const [formErrors, setFormErrors] = useState<FormErrors>({usernameError:"",passwordError:""})

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
        //TODO: create context to store user data
    }

    return<>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <h1>Register</h1>
            <form onSubmit={submitData}>
                <InputField name={"username"} label={"Username"} type={"text"} placeholder={"Input your username"} error={formErrors.usernameError} callback={setUser} value={formData.username}/>
                <InputField name={"password"} label={"Password"} type={"password"} placeholder={"Your password"} error={formErrors.passwordError} callback={setPassword} value={formData.password}/>
                <input type="submit"></input>
            </form>
        </div>
    </>
}