import axios from "axios"
import { useState } from "react"
import { FaApple } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from "react-router-dom"

const SignIn=()=>{
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    const[loading,setLoading]=useState("")
    const[success,setSuccess]=useState("")
    const[error,setError]=useState("")
    const navigate=useNavigate()
    const submit=async(e)=>{
        e.preventDefault()
        setLoading('please wait....')
        try {
            const data=new FormData()
                data.append('username',username)
                data.append('password',password)
            
            const response = await axios.post('https://philipswala.alwaysdata.net/api/signin',data)
            setLoading('')
            setSuccess(response.data.message)
            //clear the form data
            setUsername('')
            setPassword('')
            if (response.data.user){
                //if user found save user item in local storage
                localStorage.setItem('user',JSON.stringify(response.data.user))//stringify changes the user object from data object to string
                //redirect to home component==get products
                navigate('/')
            }else{
                //if user not found show an error
                setError(response.data.message)
            }
        } catch (error) {
            setLoading('')
            setError(error.message)
            }
    }
    return(
        <div className="d-flex justify-content-center row">
            <div className="col-md-6 p-2 mt-4 card shadow" style={{backgroundColor:'lightblue'}}>
                <h1 className="display text-bold" ><b>Sign In</b> </h1>
                {loading}
                {success}
                {error}
                <form onSubmit={submit}>
                    <input type="text" placeholder="username" className="form-control"required value={username} onChange={(e)=>setUsername(e.target.value)}/> <br />{username}
                    <input type="password" placeholder="password" className="form-control"required value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />{password} 
                    <button type="submit" className="btn btn-primary">Sign In</button>
                    <div className="divider text-center">
                        <span>or continue with</span>
                    </div>
                    <div class="social">
                    <button type="submit" className="btn btn-primary social-btn google">
                    <FcGoogle className="icon"/>
                    Google</button><br />
                    <button type="submit" className="btn btn-primary social-btn apple">
                    <FaApple className='icon'/>    
                    Apple</button>
                    </div>
                    <p>Don't have an account? <Link to='/signUp'>Sign up</Link></p>
                    
                </form>
            </div>
        </div>
    )
}
export default SignIn