import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Home = () => {

    const [loggedinUser, setLoggedInUser] = useState('');

    // for displaying the products
    const [products, setProducts] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
    }, [])

    const handleLogout = (event) => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        handleSuccess('LoggedOut successfully')
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }


    // fetching Products
    const fetchProducts = async () => {
        try {
            const url = 'http://localhost:8080/products';

            const headers = {
                headers: {
                    'Authorization': localStorage.getItem("token")
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            setProducts(result);
            // console.log(result);

        } catch (error) {
            handleError(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    },[])

    return (
        <div>
            <h1>Welcome {loggedinUser}</h1>
            <button onClick={handleLogout}>LogOut</button>
            <div>
                {
                    products && products?.map((item, index) => (
                        <ul key={index}>
                            <p>{item.name} : {item.price}</p>
                        </ul>
                    )
                    )
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home;