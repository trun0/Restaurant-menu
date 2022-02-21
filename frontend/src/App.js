import './App.css';
import { useState, useEffect } from "react";
import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    let tPrice = 0, tCount = 0;
    let temp = JSON.parse(localStorage.getItem("thumbstackRestaurantBoughtItemArray"));
    if (temp) {
      temp.forEach(element => {
        tPrice += element.itemCount * element.itemPrice;
        tCount += element.itemCount;
      });
      setTotalPrice(tPrice);
      setTotalCount(tCount);
    }
  }, [orderItems]);

  function handleTotal() {
    setTotalCount(0);
    setTotalPrice(0);
  }

/********************************************************Add Item  ****************************************************/  
  function addItem(id, itemName, itemPrice) {
    if (localStorage.getItem("thumbstackRestaurantBoughtItemArray")) {
        var boughtItemArray = JSON.parse(localStorage.getItem("thumbstackRestaurantBoughtItemArray"));
    }
    else {
        boughtItemArray = [];
    }
    const found = boughtItemArray.find(element => element.itemName === itemName);
    if (!found) {
        boughtItemArray.push({ id: id, itemName: itemName, itemCount: 1, itemPrice: itemPrice });
    }
    else {
        const index = boughtItemArray.indexOf(found);
        boughtItemArray.splice(index, 1, { id: id, itemName: itemName, itemCount: found.itemCount + 1, itemPrice: itemPrice });
    }
    localStorage.setItem("thumbstackRestaurantBoughtItemArray", JSON.stringify(boughtItemArray));
    setOrderItems(boughtItemArray);
}


/********************************************************Remove Item  ****************************************************/  
function removeItem(id, itemName) {
  if (localStorage.getItem("thumbstackRestaurantBoughtItemArray")) {
      var boughtItemArray = JSON.parse(localStorage.getItem("thumbstackRestaurantBoughtItemArray"));
  }
  else {
      boughtItemArray = [];
  }
  const found = boughtItemArray.find(element => element.itemName === itemName);
  if (found) {
      const index = boughtItemArray.indexOf(found);
      if(found.itemCount - 1 <= 0) {
          boughtItemArray.splice(index, 1);
      }
      else {
          boughtItemArray.splice(index, 1, { id: id, itemName: itemName, itemCount: found.itemCount - 1, itemPrice: found.itemPrice });
      }
      
  }
  localStorage.setItem("thumbstackRestaurantBoughtItemArray", JSON.stringify(boughtItemArray));
  setOrderItems(boughtItemArray);
}


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="menu" element={<Menu totalPrice={totalPrice} totalCount={totalCount} addItem={addItem} removeItem={removeItem} />} />
          <Route path="cart" element={<Cart totalPrice={totalPrice} totalCount={totalCount} addItem={addItem} removeItem={removeItem} handleTotal={handleTotal} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
