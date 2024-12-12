import axios from "axios"
import { adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess } from "../slices/orderSlice"

// Set the base URL for all Axios requests
axios.defaults.baseURL = "https://mern-vercel-9ccofya27-sheikxms-projects.vercel.app";

export const adminOrders = async(dispatch) =>{
    try{
        dispatch(adminOrdersRequest())
        const{data}=await axios.get(`/api/v1/admin/orders`)
        dispatch(adminOrdersSuccess(data))
    }catch(error){
        dispatch(adminOrdersFail(error.message.data.message))
    }
}

export const createOrder = order => async(dispatch) => {
    try {
       dispatch(createOrderRequest())
       const {data} = await axios.post(`/api/v1/order/new`, order)
       dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}
export const deleteOrder = id => async(dispatch) => {
    try {
       dispatch(deleteOrderRequest())
       const {data} = await axios.delete(`/api/v1/admin/order/${id}`)
       dispatch(deleteOrderSuccess(data))
    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message))
    }
}