import axios from "axios";
import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice";

// Set the base URL for all Axios requests
axios.defaults.baseURL = "https://mern-vercel-9ccofya27-sheikxms-projects.vercel.app";

export const addCartItem = (id, quantity) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest());

        const { data } = await axios.get(`/api/v1/product/${id}`);

        const item = {
            product: data.Product._id,
            name: data.Product.name,
            price: data.Product.price,
            image: data.Product.images[0]?.image,
            stock: data.Product.stock,
            quantity,
        };

        dispatch(addCartItemSuccess(item));
    } catch (error) {
        console.error("Error adding to cart:", error.message);
    }
};
