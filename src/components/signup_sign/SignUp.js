import React, { useContext, useState } from 'react'
// import "./signup.css";
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SignUp = () => {
    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });
    // console.log(udata);

    const adddata = (e) => {
        const { name, value } = e.target;
        // console.log(name,value);

        setUdata((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    };

    const senddata = async (e) => {

        e.preventDefault();
        const { fname, email, mobile, password, cpassword } = udata;

        //For validation in each Field
        {/*if (fname === "") {
            toast.warn("Enter first name.", {
                position: "top-center",
            })
        }else if (email === "") {
            toast.warn("Enter Email id.", {
                position: "top-center",
            })
        }else if (mobile === "") {
            toast.warn("Enter Mobile Number.", {
                position: "top-center",
            })
        }else if (password === "") {
            toast.warn("Enter Password.", {
                position: "top-center",
            })
        }else if (cpassword === "") {
            toast.warn("Enter confirm Password.", {
                position: "top-center",
            })
        }else {}
    */}

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, email, mobile, password, cpassword
            })
        });
        const data = await res.json();
        // console.log(data);

        if (res.status === 422 || !data) {
            alert("Invalid Details!🥺")
            toast.warn("Invalid Details!🥺", {
                position: "top-center",
            })
        } else {
            alert("Data Successfully Added 🤗.")
            toast.success("Data Successfully Added 🤗.", {
                position: "top-center",
            })
            setUdata({ ...udata, fname: "", email: "", mobile: "", password: "", cpassword: "" });
        }
    }

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method='POST' >
                        <h1>Create account</h1>
                        <div className="form_data">
                            <label htmlFor="name">Your name</label>
                            <input type="text" name="fname"
                                onChange={adddata}
                                value={udata.fname}
                                id="name" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="email">email</label>
                            <input type="email" name="email"
                                onChange={adddata}
                                value={udata.email}
                                id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="number">Mobile number</label>
                            <input type="number" name="mobile"
                                onChange={adddata}
                                value={udata.mobile}
                                id="mobile" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                onChange={adddata}
                                value={udata.password}

                                id="password" placeholder="At least 6 characters" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input type="password" name="cpassword"
                                onChange={adddata}
                                value={udata.cpassword}
                                id="cpassword" />
                        </div>
                        <button type="submit" className="signin_btn" onClick={senddata} >Continue</button>
                        <div className="signin_info">
                            <p>Already have an account?</p>
                            <NavLink to="/login">Sign in</NavLink>

                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    )
}

export default SignUp