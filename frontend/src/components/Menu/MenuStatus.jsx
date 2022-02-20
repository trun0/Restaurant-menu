import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./MenuStatus.css";

function MenuStatus(props) {

  const [boughtItemArray, setBoughtItemArray] = useState([]);

  useEffect(() => {
    const boughtArray = JSON.parse(localStorage.getItem("thumbstackRestaurantBoughtItemArray"));
    setBoughtItemArray(boughtArray);
  }, [props])

  function handleDropup() {
    let doc = document.getElementsByClassName("items-dropmenu")[0];
    if(doc.style.display === "block") {
      doc.style.display = "none";
      document.getElementsByClassName("fasfa")[0].style.transform="rotate(0deg)";
    }
    else {
      doc.style.display = "block";
      document.getElementsByClassName("fasfa")[0].style.transform="rotate(180deg)";
    }
  }

  return (
    <div className='menu-status'>

        <div className="row items-dropmenu">
          {(boughtItemArray === null) ? null : boughtItemArray.map(item => {
            return <div className='col-12' key={item.id}>
              <li className='list-item'>{item.itemName} ({item.itemCount})
                <div className="item-count-btn">
                  <button onClick={() => { props.removeItem(item.id, item.itemName) }} className="minus btn btn-sm btn-danger">-</button>
                  <div className="cart-item-count ctext">{item.itemCount}</div>
                  <button onClick={() => { props.addItem(item.id, item.itemName, item.itemPrice) }} className="plus btn btn-sm btn-danger">+</button>
                </div>
              </li>
            </div>
          })}
        </div>
        <button onClick={handleDropup} className='btn btn-secondary items-dropup'><i className="fasfa fas fa-angle-up"></i></button>

      <div className="row">
        <div className="col-9 col-sm-6">
          <div className="row">
            <div className='col-12 col-md-6'>Your Order({props.totalCount})</div>
            <div className='col-12 col-md-6'>Subtotal : ₹{props.totalPrice}</div>
          </div>
        </div>
        <div className="col-3 col-sm-6">
          <Link to="/cart"><button className='proceed-btn btn btn-success'>Proceed</button></Link>
        </div>
      </div>

    </div>
  )
}

export default MenuStatus;