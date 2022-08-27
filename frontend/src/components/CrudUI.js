import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SpinnerDotted } from 'spinners-react'
import { CreateStudent, GetStudent, DeleteStudent, UpdateStudent } from '../slices/CrudSlices'
import 'bootstrap/dist/css/bootstrap.css';
const CrudUI = () => {
    const status =useSelector((state)=>state.crud.status);
    console.log(status);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.crud.value);
     const [_id,set_Id]=useState('');

    // setUserData(data);
    const [Fname, setFname] = useState('');
    const [Sname, setSname] = useState('');
    const [phone, setphone] = useState("");
    const [check, setCheck] = useState(false);
    const onClickHandler = (e) => {
        e.preventDefault();
        if (!Fname || !Sname || !phone) {
            alert("please type all field")
        }
        dispatch(CreateStudent({ Fname, Sname, phone })).then(
            (res) => {
                console.log(res);
            })
            .catch((error) => console.log(error))
            onClearHandler();

    };
    const deleteCrud = (_id) => {
        dispatch(DeleteStudent(_id));
    };
    const onClickUpdateHandler = () => {
        if (!Fname || !Sname || !phone) { 
            alert("please type all field")
        };
        const body = { Fname, Sname, phone,_id };  
        dispatch(UpdateStudent(body)).then(()=>{
            setCheck(false);
            onClearHandler()
        })
    };
    const ocCtaHandler = (item) => {
        setFname(item.Fname);
        setSname(item.Sname);
        setphone(item.phone)
        setCheck(true);
       set_Id(item._id);
     
    };
    const onClearHandler =()=>{
        setFname('');
        setSname('');
        setphone('');
        setCheck(false);
    }
    useEffect(() => {
        dispatch(GetStudent());
        // setUserData(data)
    }, [])
    return (

        <>
            <form >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-12">

                            <input style={{ marginTop: "12px" }} type="text" onChange={(e) => setFname(e.target.value)} className="form-control" placeholder="First name" value={Fname} required />

                        </div>
                        <div className="col-lg-4 col-12">

                            <input style={{ marginTop: "12px" }} type="text" onChange={(e) => setSname(e.target.value)} className="form-control" placeholder="Last name" value={Sname} required />

                        </div>
                        <div className="col-lg-4 col-12">

                            <input style={{ marginTop: "12px" }} onChange={(e) => setphone(e.target.value)} type="number" className="form-control" placeholder="Phone" value={phone} required />

                        </div>

                    </div>
                </div>

            </form>
            {check ?
                <span>
                    <button style={{ marginTop: "12px", marginBottom: "12px" }} onClick={onClickUpdateHandler} className="btn btn-success" type="submit">Update</button>
                    <button style={{ marginTop: "12px", marginBottom: "12px", marginLeft: '12px' }} onClick={onClearHandler} className="btn btn-secondary" type="submit">Clear</button>
                </span>
                :
                <button style={{ marginTop: "12px", marginBottom: "12px" }} onClick={onClickHandler} className="btn btn-primary" type="submit">Submit</button>
            }
            <div>

            {status && 

             <SpinnerDotted style={{marginBottom:"12px"}} size={30} thickness={180} speed={105} color="#3E528A" /> 
            }</div>
            <table className="table">
                <thead className="thead-dark" style={{ background: "#3E528A" }}>
                    <tr>
                        <th scope="col"><span style={{ color: "white" }}>#</span></th>
                        <th scope="col" ><span style={{ color: "white" }}>FirstName</span> </th>
                        <th scope="col"><span style={{ color: "white" }}>LastName</span></th>
                        <th scope="col"><span style={{ color: "white" }}>Email</span></th>
                        <th scope="col"><span style={{ color: "white" }}>Delete</span></th>
                        <th scope="col"><span style={{ color: "white" }}>Update</span></th>
                    </tr>
                </thead>
                {data.map((item, index) => {
                    return <tbody key={item._id}>
                        <tr>
                            <th scope="row">{index}</th>
                            <td>{item.Fname}</td>
                            <td>{item.Sname}</td>
                            <td>{item.phone}</td>


                            <td><button type="button" onClick={() => deleteCrud(item._id)} className="btn btn-danger">Delete</button></td>
                           <td><button type="button" onClick={() => ocCtaHandler(item)} className="btn btn-primary">Update</button></td>
                        </tr>

                    </tbody>
                })}

            </table>
        </>
    )
}

export default CrudUI
