import React, { Component } from "react";

export default class App2 extends Component{
    render(){
        return(
        <div className='secondPage'>
            <div className="box">
            <h2>1. Enter Info</h2>
            <div className="labels">
                <div class="foodLabel">
                    <label for="food">Food Name: </label>
                    <input type="text" name="food"></input></div>
                <div className="amountLabel">
                    <label for="amount">Amount: </label>
                    <input type="text" name="amount"></input></div>
             </div>
            </div>
         </div>
    );
    }
}


