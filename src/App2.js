import React, { Component } from "react";
import {auth} from "./configs";
import firebase from "./configs";
import {ButtonToolbar, Button, DropdownButton, MenuItem} from "react-bootstrap";
import lime from './lime.png';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import App3 from './App3.js';
import axios from "axios";
export default class App2 extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            foods: [],   // contains all the foods for the key word entered
            showDropdown: false
        }
    }

    grabNdb(name){
        const apiKey = "xfDET5R7EqwtYYaPcIdwa2DkKpf1jRzGXGJRFhsl";
        let ndbtemp = [];
            let ndburl = "https://api.nal.usda.gov/ndb/search/?format=json&q="+name+"&sort=n&max=25&offset=0&api_key="+apiKey
            console.log(ndburl)
            axios.get(ndburl)
            .then(response =>{
                let results = response.data.list.item;
                for(let i = 0; i < results.length; i++){
                    let entry = {
                        ndb: results[i].ndbno,
                        name: results[i].name
                    }
                    ndbtemp.push(entry)
                }
                this.setState({
                    foods: ndbtemp,
                    showDropdown: true
                })
                console.log(this.state.foods)
            })
    }

    addtoFirebase(){
        let e = document.getElementById("select").value;
        console.log(e)
        let obj = this.state.foods[e-1].ndb;
        console.log(this.state.foods)
        console.log(obj)
        let userID = firebase.auth().currentUser.uid
        let newPostKey =firebase.database().ref("/users/"+userID).child('foods').push().key
        let updates = {};
        updates['/foods/'+newPostKey] = obj;
        this.setState({
            name: "",
        })
        return firebase.database().ref("/users/"+userID).update(updates)
    }

    updateField(field, value){
        this.setState({
            ...this.state,
            [field]:value
        });
    }
    renderDropdown=(title,i)=>{
        return(
            <div className = "dropdown">
                <select id = "select">
                    <option value="1">{this.state.foods[0].name}</option>
                    <option value="2">{this.state.foods[1].name}</option>
                    <option value="3">{this.state.foods[2].name}</option>
                    <option value="4">{this.state.foods[3].name}</option>
                    <option value="5">{this.state.foods[4].name}</option>
                    <option value="6">{this.state.foods[5].name}</option>
                    <option value="7">{this.state.foods[6].name}</option>
                    <option value="8">{this.state.foods[7].name}</option>
                    <option value="9">{this.state.foods[8].name}</option>
                    <option value="10">{this.state.foods[9].name}</option>
                    <option value="11">{this.state.foods[10].name}</option>
                    <option value="12">{this.state.foods[11].name}</option>
                    <option value="13">{this.state.foods[12].name}</option>
                    <option value="14">{this.state.foods[13].name}</option>
                    <option value="15">{this.state.foods[14].name}</option>
                    <option value="16">{this.state.foods[15].name}</option>
                    <option value="17">{this.state.foods[16].name}</option>
                    <option value="18">{this.state.foods[17].name}</option>
                    <option value="19">{this.state.foods[18].name}</option>
                    <option value="20">{this.state.foods[19].name}</option>
                    <option value="21">{this.state.foods[20].name}</option>
                    <option value="22">{this.state.foods[21].name}</option>
                    <option value="23">{this.state.foods[22].name}</option>
                    <option value="24">{this.state.foods[23].name}</option>
                    <option value="25">{this.state.foods[24].name}</option>
                </select>
            </div>
        );
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
                    </input>
                    <ButtonToolbar id = "btntoolbar">
                        <Button  id="but2" type = "submit" value = "Submit" onClick = {()=> this.grabNdb(newFood.n)}>
                            {" "}
                            Add{" "}
                        </Button>
                    </ButtonToolbar>
                    </div>
                <div className="amountLabel">
                    <label for="amount" id="amountID">Amount: </label>
                    {this.state.showDropdown&&this.renderDropdown()}
                    <ButtonToolbar id = "btntoolbar">
                        <Button id="but3" type = "submit" value = "Submit" onClick={()=>this.addtoFirebase()}> 
                            {" "}
                            Select{" "}
                        </Button>
                    </ButtonToolbar> 
                    </div>
                    <ButtonToolbar id = "btntoolbar">
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

