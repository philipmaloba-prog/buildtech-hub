import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
const SignUp=()=>{
    const [Username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
    const [loading,setLoading]=useState("") //show message while loading
    const [success,setSuccess]=useState("")//successfully signed up
    const [error,setError]=useState("")//incase we get an error
    //function to handle submit
    const submit =async(e)=>{
        e.preventDefault()//prevents refreshing the browser
        //update loading hook with a message
        setLoading('Please wait...')
        try {
            //put the updated hooks data into variables by creating a form data
            const data = new FormData()
            data.append('username',Username)
            data.append('email',email)
            data.append('password',password)
            data.append('phone',phone)
            //post data to backend API
            const response = await axios.post('https://philipswala.alwaysdata.net/api/signup',data)
            //after data has been posted successfully set loading hook variable to be empty
            setLoading('')
            // update success hook with a message
            setSuccess(response.data.success)
            //clear the formfields
            setUsername('')
            setEmail('')
            setPassword('')
            setPhone('')
        } catch (error) {
            setLoading('')
            setError(error.message)
        }
    }
    return(
    <div className="d-flex justify-content-center row text-center">
        <div className="col-md-6 p-2 mt-4 card shadow h-100%" style={{backgroundColor:'lightblue'}}>
            {success}
            {loading}
            {error}
            <h1 className="display text-center text-bold"><b>Sign Up</b></h1>
            <form onSubmit={submit} >
                <input type="text" placeholder="Enter Your Username" className="form-control"required value={Username}
                onChange={(e)=>setUsername(e.target.value)}/><br />{Username}
                <input type="email" placeholder="Enter your email" className="form-control" required 
                value={email} onChange={(e)=>setEmail(e.target.value)}
                /><br />{email}
                <input type="password" placeholder="Enter Your Password" className="form-control"required
                value={password} onChange={(e)=>setPassword(e.target.value)}/><br />{password}
                <input type="text" placeholder="Enter Your Phone Number" className="form-control" required value={phone} onChange={(e)=>setPhone(e.target.value)}/><br />{phone}
                <button type="submit" className="btn btn-primary ">Sign Up</button>
                
                <p className="text-center">Already have an account? <Link to='/signin'>Sign In</Link></p>
            </form>
        </div>
        </div>
    )
}
export default SignUp