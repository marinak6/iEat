import React, { Component } from "react";
import {auth} from "./configs";
import firebase from "./configs";
import {ButtonToolbar, Button} from "react-bootstrap";
import lime from './lime.png';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import App3 from './App3.js';
export default class App2 extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            amount: "",
            foods: [],
            passArray: null
        }
    }

    addtoFirebase(obj){
        let userID = firebase.auth().currentUser.uid
        let newPostKey =firebase.database().ref("/users/"+userID).child('foods').push().key
        let updates = {};
        updates['/foods/'+newPostKey] = obj;
        this.setState({
            name: "",
            amount: ""
        })
        return firebase.database().ref("/users/"+userID).update(updates)
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
                <img src={lime} className = "lime"/></div>
            <div className="title">
            <h2>Enter Info: </h2></div>
            <div className="labels1">
                <div class="foodLabel">
                    <label for="food" id="foodID">Food Name: </label>
                    <input 
                    type="text" name="food"
                    value = {this.state.name}
                    onChange = {e => this.updateField("name",e.target.value)}
                    >
                    </input></div>
                <div className="amountLabel">
                    <label for="amount" id="amountID">Amount: </label>
                    <input 
                    type="text" name="amount" 
                    value = {this.state.amount}
                    onChange = {e => this.updateField("amount",e.target.value)}
                    >
                    </input></div>
             </div>
            <div className="Button3">
            <ButtonToolbar>
                <Button id="but2" type = "submit" value = "Submit" onClick = {()=> this.addtoFirebase(newFood)}>
                    {" "}
                    Add{" "}
                </Button>
                <Link to={'/Summary'}>
                <Button id="but3" type = "submit" value = "Submit"> 
                    {" "}
                    Calculate{" "}
                </Button>
                </Link>
            </ButtonToolbar> 
            </div> 
            </div>
            <div className="bottomHeader" />
         </div>
    );
    }
}

