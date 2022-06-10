import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/product/${id}`, {
            title: title,
            price: price,
        });
        navigate("/");
    };
    const getProducts = async () => {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        setTitle(response.data.title);
        setPrice(response.data.price);
    };

    useEffect(() => {
        getProducts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <form onSubmit={updateProduct}>
                <div className="field">
                    <label className="label">Title</label>
                    <input
                        name="title"
                        className="input"
                        type="text"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="field">
                    <label className="label">Price</label>
                    <input
                        name="price"
                        className="input"
                        type="text"
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </div>
                <div className="field">
                    <button className="button is-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
