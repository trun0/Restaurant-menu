import "./Menu.css";
import React, { useState, useEffect } from 'react';
import FoodItem from "../FoodItem/FoodItem";
import MenuStatus from "./MenuStatus";
import axios from "axios";

function Menu(props) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/items')
            .then(function (response) {
                //console.log(response);
                setItems(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])


    return (
        <div className="menu">
            <div className="container">
                <div className="row">
                    {
                        items.map((element) => {
                            return (
                                <div key={element.itemName} className="col">
                                    <FoodItem
                                        id={element._id}
                                        name={element.itemName}
                                        description={element.description}
                                        price={element.price}
                                        img_src={element.image}
                                        addItem={props.addItem}
                                    />
                                </div>

                            );
                        })
                    }
                </div>
            </div>
            {(props.totalPrice === 0) ? null : <MenuStatus totalPrice={props.totalPrice} totalCount={props.totalCount} addItem={props.addItem} removeItem={props.removeItem} />}
            
        </div>
    )
}

export default Menu;