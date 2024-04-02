import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './sellerBag.css'

function SellerBag() {

    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:8070/sellerBag/allBag')
        .then((res)=>{
            console.log(res.data)
            setItems(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

    } , [] );

    const removeItem = (id)=>{
        axios.delete('http://localhost:8070/sellerBag/deleteItem/' + id)
        .then((res)=>{
            console.log(res.data)
            console.log("delete the item")

            axios.get('http://localhost:8070/sellerBag/allBag')
            .then((res)=>{
                console.log(res.data)
                setItems(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })

        })
        .catch((err) => {
            console.log(err)
        })
    }

    const toggleSelect = (id) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(id)) {
                return prevSelectedItems.filter(itemId => itemId !== id);
            } else {
                return [...prevSelectedItems, id];
            }
        });
        console.log(selectedItems)
    };


  return (
    <>
    <div>SellerBag</div>


    {items.map((item, index) => (

        <div className="searchItem" key={index}>
            <img src="https://th.bing.com/th/id/R.415058df456a4e2fad958b7f05aa06a8?rik=sdiU4nxQeJtCwg&pid=ImgRaw&r=0" alt="" className="siImg" />

            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.category}</span>
                <span className="siTaxiOp">{item.description}</span>
                <span className="siSubtitle">
                    {item.quantity}
                </span>
                <span className="siFeatures">{item.description}</span>
                <span className="siCancelOp"></span>
                <span className="siCancelOpSubtitle">
                    
                </span>
            </div>

            <div className="siDetails">
                {/* {item.rating && <div className="siRating">
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>} */}
            
                <div className="siDetailTexts">
                    <span className="siPrice">${item.price}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <button className="siCheckButton" onClick={() => {removeItem(item.item_id)}}>Remove</button> 
                    <input
                        type="checkbox"
                        checked={selectedItems.includes(item.item_id)}
                        onChange={() => toggleSelect(item.item_id)}
                    />
                </div>

                
            </div>
        </div>
    ))}

    
    </>
  )
}

export default SellerBag