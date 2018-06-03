import React, { Component } from "react";
import {auth} from "./configs";
import firebase from "./configs";
import {ButtonToolbar, Button, DropdownButton, MenuItem} from "react-bootstrap";
import lime from './lime.png';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import App3 from './App3.js';
import axios from "axios";
export default class App2 extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            foods: [],   // contains all the foods for the key word entered
            showDropdown: false,
            ndb: "",
            redirect: false
        }
    }

    grabNdb(name){
        console.log(name)
        const apiKey = "xfDET5R7EqwtYYaPcIdwa2DkKpf1jRzGXGJRFhsl";
        let ndbtemp = [];
            let ndburl = "https://api.nal.usda.gov/ndb/search/?format=json&q="+name+"&sort=n&max=100&offset=0&api_key="+apiKey
            console.log(ndburl)
            axios.get(ndburl)
            .then(response =>{
                let results = response.data.list.item;
                    for(let i = 0; i < results.length; i++){
                        let temp = results[i].name
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
        let userID = firebase.auth().currentUser.uid
        let newPostKey =firebase.database().ref("/users/"+userID).child('foods').push().key
        let updates = {};
        updates['/foods/'+newPostKey] = obj;
        this.setState({
            name: "",
            ndb: obj
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
        let arr = [];
        for(let i = 1; i < this.state.foods.length;i++){
            arr.push(<option key={i} value ={i}>{this.state.foods[i-1].name}</option>)
        }
        return(
            <select id = "select">           
                {arr}
            </select>
        );
    }

    emptyDropdown=()=>{
        return(
                <select id = "s">
                    <option value="1">No items</option>
                </select>
        )
    }

    logout = () => {
        console.log("what")
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          return <Redirect to = '/iEat'/>
        }).catch(function(error) {
          // An error happened.
        });
        this.setState({
            redirect: true
        })
      }

    render(){
        let newFood = {
            n: this.state.name,
            a: this.state.amount
        };    
        if(this.state.redirect){
            return <Redirect to = '/iEat'/>
          }
        return(
        <div className='secondPage'>
            <ButtonToolbar id = "signout">
                <Button id = "outbut"onClick = {this.logout}>
                    {" "}
                    Log Out {" "}
                </Button>
            </ButtonToolbar>
            <div className="box">
            <div className = "imagess">
                <img src={lime} className = "lime"/></div>
            <div className="title">
            <h2>Enter Info: </h2></div>
            <div className="labels1">
                <div class="foodLabel">
                    <label for="food" id="foodID">Food:</label>
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
                    <label for="amount" id="amountID">Type: </label>
                    {this.state.showDropdown&&this.renderDropdown()}
                    {!this.state.showDropdown&&this.emptyDropdown()}
                    <ButtonToolbar id = "btntoolbar">
                        <Button id="but2" type = "submit" value = "Submit" onClick={()=>this.addtoFirebase()}> 
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
                    </ButtonToolbar></div>
            </div>
            <div className="bottomHeader" />
         </div>
    );
    }
}

