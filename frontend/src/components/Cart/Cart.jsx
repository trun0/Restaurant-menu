import "./Cart.css";
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import Invoice from "../Invoice/Invoice";
import axios from "axios";


function Cart(props) {

    const [boughtItemArray, setBoughtItemArray] = useState([]);
    const [userName, setUserName] = useState("");
    const [printButton, setPrintButton] = useState(false);

    const navigate = useNavigate();

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: ()=> {
            navigate("/menu");
            props.handleTotal();
            localStorage.removeItem("thumbstackRestaurantBoughtItemArray"); 
        }
    });

    function handlePay(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/invoices', {
            name: userName,
            list: boughtItemArray,
            count: props.totalCount,
            price: props.totalPrice
          })
          .then(function (response) {
            //console.log(response);
            if(response.data) {
                alert("Successfuly Paid");
                setPrintButton(true);
            }
            else {
                alert("Something went wrong!!!");
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    useEffect(() => {
        const boughtArray = JSON.parse(localStorage.getItem("thumbstackRestaurantBoughtItemArray"));
        setBoughtItemArray(boughtArray);
    }, [props])

    return (
        <div>
            <h1 className="cart-heading">Cart</h1>

            <div className="cart">
                <div className="cart-items">
                    {(boughtItemArray === null) ? null : boughtItemArray.map((item) => {
                        return <div key={item.itemName}>
                            <div className="count-btn">
                                <button onClick={() => { props.removeItem(item.id, item.itemName) }} className="minus btn btn-sm btn-danger">-</button>
                                <div className="cart-item-count">{item.itemCount}</div>
                                <button onClick={() => { props.addItem(item.id, item.itemName, item.itemPrice) }} className="plus btn btn-sm btn-danger">+</button>
                            </div>
                            <div className="cart-item-name">{item.itemName}</div>

                            <div className="cart-item-price">₹ {item.itemPrice}</div>
                            <hr />
                        </div>
                    })}

                    <div>Total : ₹ {props.totalPrice}</div>
                </div>
                <div className="user-detail">
                    {(props.totalPrice === 0) ?
                        <div>
                            <h1>Ooops! Cart empty</h1>
                            <p>Please Buy Something to proceed</p>
                            <Link to="/menu"><button className="btn btn-danger">Food Here</button></Link>
                        </div>
                        :
                        <form onSubmit={handlePay} className="">
                            <label className="form-label" htmlFor="">Your Name</label>
                            <input onChange={(e) => { setUserName(e.target.value) }} className="form-control" type="text" placeholder="Please enter your name" required autoComplete="off" value={userName} />
                            <button type="submit" className="pay-btn btn btn-primary">Pay</button>
                        </form>
                    }

                    {(printButton) ? <button className="print-btn btn btn-success" onClick={handlePrint}>Print the Invoice!</button> : null}

                </div>

            </div>

            <div style={{ display: "none" }}><Invoice ref={componentRef} userName={userName} totalPrice={props.totalPrice} totalCount={props.totalCount} /></div>

        </div>
    )
}

export default Cart;