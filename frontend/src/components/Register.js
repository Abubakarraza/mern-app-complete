import React, { useState } from 'react';
import validator from "validator";
import 'bootstrap/dist/css/bootstrap.css'
import { BsFillPersonFill, BsEnvelopeFill, BsKeyFill, BsFillTelephoneFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { NavLink, useNavigate } from 'react-router-dom';
import { userData } from "../slices/UserSlices";
import BarLoader from 'react-spinners/BarLoader'
import { SpinnerRoundFilled } from "spinners-react"
import { useDispatch, useSelector } from 'react-redux'
export default function Register() {
    const state = useSelector((state) => state.user.loading);

    const message = useSelector((state) => state.user.message)
    const error = useSelector((state) => state.user.error);

    const [status, setStatus] = useState(useSelector((state) => state.user.status))
    console.log(state);
    const dispatch = useDispatch();
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [disable, setDisable] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [check, setCheck] = useState("");
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();



        if (!name || !email || !password || !cpassword) {
            alert('please type all field')
        }
        if (!validator.isEmail(email)) {
            return window.alert("please Type valide email")
        }

        if (password !== cpassword) {
            return setCheck(true);
        };
      //  await onUploadImageHandler();
        dispatch(userData({ name, email, password, phone, imageUrl })).then((res) => {

            if (res.payload.status == 201) {
                window.alert("user is successfully Registered")
                navigate("/login");

            } else if (res.payload.error) {
                window.alert(res.payload.error);
            }
        })


        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
        setPhone('')


    }
    const onUploadImageHandler = (e) => {
          e.preventDefault();
          setImage(e.target.files[0]);
        const data = new FormData;
        setDisable(true)
        data.append("file", image);
        data.append("upload_preset", "abubakarraza");
        data.append("cloud_name", "abubakarraza64");
        fetch("https://api.cloudinary.com/v1_1/abubakarraza64/image/upload", {
            method: "post",
            body: data
        }).then((res => res.json())).then(((res) => {
            setImageUrl(res.url);
            setDisable(false)
        })).catch((e => console.log(e)))

    }
    // const onChangeImage =(e)=>{
    // setImage(e.target.file[0]);
    //   const data = new FormData;
    //         data.append("file", image);
    //         data.append("upload_preset", "abubakarraza");
    //         data.append("cloud_name", "abubakarraza64");
    //         fetch("https://api.cloudinary.com/v1_1/abubakarraza64/image/upload/w_200,h_100,c_scale", {
    //          method: "post",
    //             body: data
    //         }).then((res => res.json())).then(((res) =>{ 
    //             setImageUrl(res.url);
    //             setDisable(true)
    //         })).catch((e => console.log(e)))

    // }
    return (
        <>
            <section className="vh-100" style={{ marginTop: "20px" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: '25px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4" onSubmit={onSubmitHandler}>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <BsFillPersonFill style={{ height: "25px", width: "25px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                                        <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <BsEnvelopeFill style={{ height: "25px", width: "25px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                                        <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <BsFillTelephoneFill style={{ height: "25px", width: "25px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="number" id="form3Example4c" className="form-control" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                                                        <label className="form-label" for="form3Example4c">Phone</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <BsKeyFill style={{ height: "30px", width: "30px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example5c" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                                        <label className="form-label" for="form3Example5c">Password</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <BsKeyFill style={{ height: "30px", width: "30px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4cd" className="form-control" value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} />
                                                        <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-row align-items-center '>
                                                    <CgProfile style={{ height: "30px", width: "30px", marginTop: "3px" }} className="fas  fa-lg me-3 fa-fw" />
                                                    <div className="input-group ">
                                                        <input accept='.jpg,.png,.gif,.jpeg,' type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={(e) =>onUploadImageHandler(e)} />
                                                        
                                                    </div>

                                                </div>
                                                <label style={{ marginLeft: "43px" }} className='form-label'  >Profile image</label>
                                                {
                                                    check ?
                                                        <div className='d-flex justify-content-center' style={{ color: "red" }}>
                                                            password is not match
                                                        </div>
                                                        :
                                                        <div className='d-flex justify-content-right' style={{ color: "green" }}>

                                                        </div>
                                                }

                                                {/* {error} */}
                                                {state &&
                                                    <SpinnerRoundFilled size={50} thickness={100} speed={100} color="rgba(57, 122, 172, 1)" />

                                                }
                                                
                                                <div className="form-check d-flex justify-content-center mb-5">

                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />

                                                    <label className="form-check-label" for="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type='submit' disabled={disable} className="btn btn-primary btn-lg" onClick={onSubmitHandler}>Register</button>


                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <span>Already have an account <NavLink to='/login'><span>Login</span></NavLink></span>




                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
