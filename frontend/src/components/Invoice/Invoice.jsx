import "./Invoice.css";
import React, { useState, useEffect } from 'react';

const Invoice = React.forwardRef((props, ref) => {

    const [boughtItemArray, setBoughtItemArray] = useState([]);

    useEffect(() => {
        const boughtArray = JSON.parse(localStorage.getItem("thumbstackRestaurantBoughtItemArray"));
        setBoughtItemArray(boughtArray);
    }, [props])

    return (
        <div ref={ref} className="invoice">
            <h2 className="invoice-header">THE RESTAURANT</h2>
            <p className="">Customer Name: <strong>{props.userName}</strong></p>


            <div className="invoice-item-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Price (1pc)</th>
                            <th scope="col">Item Count</th>
                            <th scope="col">Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(boughtItemArray === null) ? null : boughtItemArray.map((item, index) => {
                            return <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.itemName}</td>
                                <td>₹{item.itemPrice}</td>
                                <td>{item.itemCount}</td>
                                <td>₹{item.itemCount * item.itemPrice}</td>
                            </tr>
                        })}
                        <tr>
                            <th scope="row"></th>
                            <td></td>
                            <td><strong style={{ fontFamily: "cursive" }}>Total</strong></td>
                            <td><strong>{props.totalCount}</strong></td>
                            <td><strong>₹{props.totalPrice}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br />
            <p><strong>Amount Paid</strong>(Total + 10% tip) = ₹ <strong>{Math.round(props.totalPrice * 1.1)}</strong></p>
            <div className="thankyou">
                <div>Thank you for visiting</div>
                <div>Have an Awesome day!</div>
            </div>

        </div>
    );
});

export default Invoice;