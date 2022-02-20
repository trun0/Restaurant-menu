import "./FoodItem.css";
import React from 'react';

function FoodItem(props) {

    return (
        <div className="food-item">
            <div>
                <img className="item-image" src={props.img_src} alt="fooditem" />
            </div>
            <button onClick={() => {props.addItem(props.id, props.name, props.price)}} className="add-btn btn btn-sm btn-outline-danger">Add +</button>
            <p className="item-name" name="itemName">{props.name}</p>
            <p className="item-description">{props.description}</p>
            <p className="item-price" name="price">₹ {props.price}</p>
        </div>
    )
}

export default FoodItem;