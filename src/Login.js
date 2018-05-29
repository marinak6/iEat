import React, { Component } from "react";
import firebase from "./configs";
import {ButtonToolbar, Button} from "react-bootstrap";
import potato from './potato.png';
import {BrowserRouter, Route, Link} from 'react-router-dom';


export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            amount: "",
            foods: [],
        }
    }

    updateField(field, value){
        this.setState({
            ...this.state,
            [field]:value
        });
    }
    render(){
        let newFood = {
            n: this.state.name,
            a: this.state.amount
        };

        return(
        <div className='secondPage'>
            <div className="box">
            <div className = "imagess">
                <img src={potato} className = "potato"/></div>
            <div className="title">
            <h2>Login:</h2></div>
            <div className="labels1">
                <div class="foodLabel">
                    <label for="food" id="username">Username: </label>
                    <input 
                    type="text" name="food"
                    value = {this.state.name}
                    onChange = {e => this.updateField("name",e.target.value)}
                    >
                    </input></div>
                <div className="amountLabel">
                    <label for="amount" id="password">Password: </label>
                    <input 
                    type="text" name="amount" 
                    value = {this.state.amount}
                    onChange = {e => this.updateField("amount",e.target.value)}
                    >
                    </input></div>
             </div>
            <div className="Button2">
            <ButtonToolbar>
                <Link to = {"/Info"}>
                <Button id="but2" type = "submit" value = "Submit" onClick = {()=> this.addtoFirebase(newFood)}>
                    {" "}
                    Submit{" "}
                </Button></Link>
         </ButtonToolbar>
            </div> 
            </div>
            <div className="bottomHeader" />
            <div className="box">
            <div className = "imagess">
                <img src={potato} className = "potato"/></div>
            <div className="title">
            <h2>Login:</h2></div>
            <div className="labels1">
                <div class="foodLabel">
                    <label for="food" id="username">Username: </label>
                    <input 
                    type="text" name="food"
                    value = {this.state.name}
                    onChange = {e => this.updateField("name",e.target.value)}
                    >
                    </input></div>
                <div className="amountLabel">
                    <label for="amount" id="password">Password: </label>
                    <input 
                    type="text" name="amount" 
                    value = {this.state.amount}
                    onChange = {e => this.updateField("amount",e.target.value)}
                    >
                    </input></div>
             </div>
            <div className="Button2">
            <ButtonToolbar>
                <Button id="but2" type = "submit" value = "Submit" onClick = {()=> this.addtoFirebase(newFood)}>
                    {" "}
                    Submit{" "}
                </Button>
            </ButtonToolbar>
            </div> 
            </div>
            <div className="bottomHeader" />
         </div>
    );
    }
}


