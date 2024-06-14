import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import "../styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Login() {

    const { TokenHandler, NameHandler, token, cartItemToggle, setCartItemToggle } = useUser();
    // console.log(token);

    const [toggle, setToggle] = useState(true);
    const [gendertoggle, setgendertoggle] = useState(true);


    const [data, setData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        mobno: '',
        appType: 'ecommerce'
    });
    // console.log(data.gender);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const submitLoginHandler = (event) => {
        event.preventDefault();
        setError(null);
        if (!data.name) {
            // setError("User name is Mandatory");
            setError(toast("User name is Mandatory"));
            return;
        }
        else if (!data.email) {
            setError(toast("Email is Mandatory"))
            return;
        }
        else if (!data.password) {
            setError(toast("Pasword can not be empty"))
            return;
        }
        // else if (data.name !== name || data.email !== email || data.password !== password){
        //     setError(toast("Please Enter a valid Details"))
        //     return;
        // }
        
        // console.log(data);
        axios.post('https://academics.newtonschool.co/api/v1/user/login', data, {
            headers: {
                projectID: "rhxg8aczyt09"
            }
        }).then((result) => {
            TokenHandler(result.data.token);
            NameHandler(result.data.data.name);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("name", result.data.data.user.name);
            setCartItemToggle(!cartItemToggle)
            console.log(result.data.token);
            console.log(result);

            navigate('/');
        }).catch((err) => {
            // console.log(err.message?err.message:"Internal Server Error")
            console.log(err)
            if (err.response.data.message === "Incorrect EmailId or Password") {
                alert('Incorrect EmailId or Password')
            } else if (err.response.data.message === "please provide email and password") {
                alert("please provide email and password")
            }
        });
    }

    const submitRegisterHandler = (event) => {
        event.preventDefault();
        setError(null);
        if (!data.name) {
            setError(toast("User name is Mandatory"));            
            return;
        }
        else if (!data.email) {
            setError(toast("Email is Mandatory"))
            return;
        }
        else if (!data.password) {
            setError(toast("Pasword can not be empty"))
            return;
        }
        let regex = /^[0-9]{10}$/;
        let result = regex.test(data.mobno);
        console.log(data.mobno);
        // console.log(result);
        if (result == false){
            setError(toast("Invalid MobileNo."));
            return;
        }
        
        // else if (gendertoggle) {
        //     setError("Please select gender")
        //     return;
        // }
        // console.log(data);
        axios.post('https://academics.newtonschool.co/api/v1/user/signup', data, {
            headers: {
                projectID: "rhxg8aczyt09"
            }
        }).then((result) => {
            // console.log(result)
            // navigate('/login')
            if (result.data.status === 'success') {
                setToggle(!toggle)
                setCartItemToggle(!cartItemToggle)
            }
        }).catch((err) => {
            console.log(err.message ? err.message : "Internal Server Error")
                toast("User already exists")
            // if (err.message ? err.message : "User already exists") {
            //     alert(toast("User already exists"))
            // }
        });
    }

    return (
        <> <div className="lg-main">
            <div className="main-login-register-ctn">
               <ToastContainer position="top-right" />
                <div className="toggle-btn-container">
                    <button className={`btn-toggle ${toggle && "active-log-reg"}`} onClick={() => { setToggle(true) }}>Login</button>
                    <button className={`btn-toggle ${!toggle && "active-log-reg"}`} onClick={() => { setToggle(false) }}>Register</button>
                </div>
                {toggle && <div className="container">
                    <div className="row">
                        <div className="col-4">
                            {/* {error && <div className="alert alert-secondary" role="alert">
                                {error}
                            </div>} */}
                            <form >
                                <div className="form-group">
                                    <label htmlFor="name">User Name</label>
                                    <input type="text" className="form-control" onChange={onChangeHandler} value={data.name} name="name" autoComplete="off" placeholder="Enter name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" onChange={onChangeHandler} value={data.email} name="email" placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" onChange={onChangeHandler} value={data.password} name="password" placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <button onClick={(event) => submitLoginHandler(event)} type="button" className="btn btn-pry">Login</button>
                                </div>
                                <p onClick={() => { setToggle(false) }} className="signup-user">Not an existing user. Sign up</p>
                            </form>
                        </div>
                    </div>
                </div>}


                {!toggle &&
                    <div className="rtg-container">
                        <h2></h2>
                        <div className="row">
                            <div className="col-4">
                                {/* {error && <div class="alert alert-secondary" role="alert">
                                    {error}
                                </div>} */}
                                <form onSubmit={submitRegisterHandler}>
                                    <div className="form-group">
                                        <label htmlFor="name">User Name</label>
                                        <input type="text" className="form-control" onChange={onChangeHandler} value={data.name} name="name" autoComplete="off" placeholder="Enter name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">LastName</label>
                                        <input type="text" className="form-control" onChange={onChangeHandler} value={data.LastName} name="lastName" autoComplete="off" placeholder="Enter Lastname" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input type="email" className="form-control" onChange={onChangeHandler} value={data.email} name="email" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" onChange={onChangeHandler} value={data.password} name="password" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mobno">Mobile No.</label>
                                        <input type="text" maxLength={10} minLength={10} className="form-control" onChange={onChangeHandler} value={data.mobno} name="mobno" autoComplete="off" placeholder="Enter Mob no." />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="gender">Gender</label>
                                        <input type="radio" id="male" onClick={() => setgendertoggle(!gendertoggle)} name="gender" />
                                        <label htmlFor="male">Male</label>
                                        <input type="radio" id="female" onClick={() => setgendertoggle(!gendertoggle)} name="gender" />
                                        <label htmlFor="female">Female</label>
                                        <input type="radio" id="other" onClick={() => setgendertoggle(!gendertoggle)} name="gender" />
                                        <label htmlFor="other">Other</label>
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-pry">Register</button>
                                    </div>
                                    <p onClick={() => { setToggle(!toggle) }} className="signup-user">Already a user. Login</p>

                                </form>
                                {/* </div>
                    <div className="col-4"> */}
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
        
        </>
    )
}
export default Login;