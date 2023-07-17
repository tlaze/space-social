
interface inputFieldProps{
    name:string 
    label:string 
    type:string 
    placeholder:string 
    error:string
    value:string 
    callback:any
}

export default function InputField({name, label, type, placeholder, error, value, callback}:inputFieldProps){


    return<>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <label htmlFor={name}>{label}</label>
            <input id={name} name={name} type={type} placeholder={placeholder} value={value} onChange={callback}></input>
            {error && <p>{error}</p>}
        </div>
    </>
}