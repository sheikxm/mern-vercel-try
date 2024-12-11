import React, { useEffect, useState } from 'react'
import Footer from '../footer/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, resetPassword } from '../../actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
const [password,setPassword] = useState("");
const dispatch = useDispatch();
const {isAuthenticated,error} = useSelector(state=>state.authState)
const navigate = useNavigate();
const { token } = useParams();
const[confirmPassword,setConfirmPassword]=useState("");
const submitHandler= (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('password',password)
    formData.append('confirmPassword',confirmPassword)
    dispatch(resetPassword(formData,token))
}

useEffect(()=>{
if(isAuthenticated){
    toast('password reset success', {
        type: 'success',   
    })
   navigate('/')
return
}
if(error)  {
    toast(error, {
        type: 'error',
        onOpen: ()=> {dispatch(clearAuthError) }
    })
    return
}
},[isAuthenticated,error,dispatch,navigate])



  return (
    <div>
    <div className="row wrapper py-4 ">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ResetPassword