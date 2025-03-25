import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import '../assets/css/SignUp.css'

const SignUp = () =>{
    const [firstname,setFirstName]= useState("");
    const [lastname,setLastName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    var navigate = useNavigate();
    function click(){
        alert("Form submitted successfully");
    }
    var signUp = async(event) =>{
        event.preventDefault()
        var req = await axios.post('http://localhost:3001/signup',{
            firstName:firstname,
            lastName:lastname,
            email:email,
            password: password
        })
        console.log("Signup successfully");
        navigate('/login');
    }
    return (
    <section>
        <h1>SIGNUP</h1>
        <form onSubmit = {signUp}>
        <label>Enter your first name:</label>
             <input type="text" placeholder="eg:John" value = {firstname} onChange = {(e)=>setFirstName(e.target.value)} required/><br />
        <label>Enter your last name:</label>
            <input type ="text" placeholder="eg:Doe" value = {lastname} onChange = {(e)=>setLastName(e.target.value)} required/><br />
        <label>Enter your email:</label>
            <input type ="email" placeholder="example@gmail.com" value = {email} onChange = {(e)=>setEmail(e.target.value)}/><br />
        <label>Enter your password:</label>
            <input type ="password" value = {password} onChange = {(e)=>setPassword(e.target.value)} /><br />
        <button onClick={click}>Submit</button>
        <p>If already have account? <Link to = "/login">Login</Link></p>
    </form>
    </section>);
}

export default SignUp;