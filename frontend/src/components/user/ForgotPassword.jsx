import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword,clearAuthError } from "../../actions/userAction";
import { toast } from "react-toastify";

export default function ForgotPassword(){
    const dispatch = useDispatch()
    const{error,message}=useSelector(state=>state.authState)
const [email,setEmail] = useState("");
const submitHandler = (e) =>{
e.preventDefault();
const formData = new FormData();
formData.append('email',email)
dispatch(forgotPassword(formData))



}

useEffect(()=>{
    if(message) {
        toast(message, {
            type: 'success',
            
        })
        setEmail("");
        return;
    }

    if(error)  {
        toast(error, {
         
            type: 'error',
            onOpen: ()=> { dispatch(clearAuthError) }
        })
        return
    }
}, [message, error, dispatch])

    return(

       <div>
         <div className="row wrapper py-5">
        <div className="col-10 col-lg-5">
            <form  onSubmit={submitHandler} className="shadow-lg">
                <h1 className="mb-3">Forgot Password</h1>
                <div className="form-group">
                    <label htmlFor="email_field">Enter Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                   value={email}
                   onChange={e=>setEmail(e.target.value)}
                        
                    />
                </div>

                <button
                    id="forgot_password_button"
                    type="submit"
                    className="btn btn-block py-3">
                    Send Email
            </button>

            </form>
        </div>
    </div>
    <Footer/>
       </div>
    )
}