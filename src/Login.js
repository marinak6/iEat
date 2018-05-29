import React, { Component } from "react";
import firebase from "./configs";
import {ButtonToolbar, Button} from "react-bootstrap";
import potato from './potato.png';
import apple from './apple.png';
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
        <div className='loginPage'>
            <div className="box2">
            <div className = "imagess">
                <img src={potato} className = "potato"/></div>
            <div className="title">
            <h2>Login:</h2></div>
            <div className="loginBox">
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
                <Button id="but2" type = "submit" value = "Submit">Submit
                </Button></Link>
         </ButtonToolbar>
            </div> 
            </div><div className="box3">
            {/* <div className = "imagess"> */}
                {/* <img src={apple} className = "apple"/></div> */}
            <div className="title">
            <h2>Sign Up:</h2></div>
            <div className="signUpBox">
                <div className="fooLabel">
                    <label for="food" id="username">Email: </label>
                    <input 
                    type="text" name="food" 
                    value = {this.state.amount}
                    onChange = {e => this.updateField("amount",e.target.value)}
                    >
                    </input></div>
                <div class="foodLabel">
                    <label for="food" id="username">Username: </label>
                    <input 
                    type="text" name="food"
                    value = {this.state.name}
                    onChange = {e => this.updateField("name",e.target.value)}
                    >
                    </input></div>
                <div className="foodLabel">
                    <label for="food" id="password">Password: </label>
                    <input 
                    type="text" name="food" 
                    value = {this.state.amount}
                    onChange = {e => this.updateField("amount",e.target.value)}
                    >
                    </input></div>
                <div className="amountLabel">
                    <label for="amount" id="password">Re-Enter Password: </label>
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
                <Button id="but2" type = "submit" value = "Submit">Submit
                </Button></Link>
            </ButtonToolbar>
            </div> 
            </div>
            <div className="bottomHeader2" />
         </div>
    );
    }
}


