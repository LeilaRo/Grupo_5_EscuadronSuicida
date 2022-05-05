import React from "react";

function CardsProducts (props){ 
    return (
    <div>
        <h1>{props.product.name}</h1>
        <h1>{props.product.price}</h1>
        <h1>{props.product.discount}</h1>
        <img src={props.product.image}  width="80vw" alt="" />
    </div>
    )}

    export default CardsProducts