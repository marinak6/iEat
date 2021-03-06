import React, { Component } from "react";
import {auth} from "./configs";
import firebase from "./configs";
import {ButtonToolbar, Button, DropdownButton, MenuItem, Alert} from "react-bootstrap";
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
            redirect: false,
            amount: "",
            amtLabel: "",
            showAmount: false,
            added: false,
            alertndb: false,
            alertamt: false
        }
    }
    componentDidMount(){
        console.log(this.state)
        if(this.state.added){
            this.grabNbd(this.state.name);
        }
    }
    grabNdb(name){
        console.log(this.state)
            console.log(name)
            const apiKey = "RQkkzls5ItqfvHurh8gJglBESkqPBFsA0TEFDUU6";
            let ndbtemp = [];
                let ndburl = "https://api.nal.usda.gov/ndb/search/?format=json&q="+name+"&sort=n&max=100&offset=0&api_key="+apiKey
                console.log(ndburl)
                axios.get(ndburl)
                .then(response =>{
                    if(typeof response.data.list!== 'undefined'){
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
                    }
                    else{
                        this.setState({
                            alertndb: true
                        }) 
                    }
                })
        
    }

    addtoFirebase(){
        if(this.state.amount!=""&&!isNaN(this.state.amount)){
            let e = document.getElementById("select").value;
            console.log(e)
            let obj = {ndb: this.state.foods[e-1].ndb, amount: this.state.amount};
            let userID = firebase.auth().currentUser.uid
            let newPostKey =firebase.database().ref("/users/"+userID).child('foods').push().key
            let updates = {};
            updates['/foods/'+newPostKey] = obj;
            this.setState({
                name: "",
                ndb: obj,
                amount: ""
            })
            return firebase.database().ref("/users/"+userID).update(updates)
        }
        else{
            this.setState({
                alertamt: true
            })
        }
    }

    updateField(field, value){
        this.setState({
            ...this.state,
            [field]:value
        });
    }

    amount=()=>{
        this.setState({
            showAmount: true
        })
    }
    add=()=>{
        this.setState({
            added: true
        })
        console.log(this.state)
        this.grabNdb(this.state.name);
    }
    getAmount=()=>{
        let e = document.getElementById("select").value;
        let obj = this.state.foods[e-1].ndb;
        const apiKey = "RQkkzls5ItqfvHurh8gJglBESkqPBFsA0TEFDUU6";
        let foodurl = "https://api.nal.usda.gov/ndb/reports/?ndbno="+obj+"&type=f&format=json&api_key="+apiKey
        console.log(foodurl)
        axios.get(foodurl)
        .then(response=>{
            let amtLabel = "";
            let results= response.data.report.food.nutrients;
            console.log(results)
            for(let i = 0; i < results.length; i++){
                if(results[i].nutrient_id===208||results[i].nutrient_id==="208"){
                    amtLabel = results[i].measures[0].qty+" "+results[i].measures[0].label+" ("+results[i].measures[0].eqv+" "+results[i].measures[0].eunit+")";
                }
            }
            this.setState({
                amtLabel: "Serving size: "+amtLabel
            })       
        });
    }
    renderDropdown=(title,i)=>{
        let arr = [];
        for(let i = 1; i < this.state.foods.length;i++){
            arr.push(<option key={i} value ={i}>{this.state.foods[i-1].name}</option>)
        }
        return(
            <select id = "select" name = "select">           
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

    alert = () =>{
        if(this.state.alertndb){
            alert("No results found")
            this.setState({
                alertndb: false
            })
        }
        if(this.state.alertamt){
            alert("Please enter in the number of servings.")
            this.setState({
                alertamt: false
            })
        }
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
            <h2>Enter Info </h2></div>
            <div className="labels1">
            <label for="food" id="foodID">Food</label>
                <div class="foodLabel">
                    <input 
                    type="text" name="food"
                    value = {this.state.name}
                    onChange = {e => this.updateField("name",e.target.value)}
                    >
                    </input>
                    <ButtonToolbar id = "btntoolbar">
                        <Button  id="but2" type = "submit" value = "Submit" onClick = {()=> this.grabNdb(this.state.name)}>
                            {" "}
                            Enter{" "}
                        </Button>
                    </ButtonToolbar>
                    {this.state.alertndb&&this.alert()}
                    </div>
                <div className="foodLabel">
                    {this.state.showDropdown&&this.renderDropdown()}
                    {!this.state.showDropdown&&this.emptyDropdown()}
                    <div class = "tooltip2">
                    <ButtonToolbar id = "btntoolbar">
                        <Button disabled = {!this.state.showDropdown} id="but5" type = "submit" value = "Submit" onClick = {()=>this.getAmount()}> 
                            {" "}
                            Add{" "}
                        </Button>
                        <span class = "tooltiptext">Select an option and press "Add" before inputting amount</span>
                    </ButtonToolbar>
                    </div>
                    </div>
                    <div className = "servings">
                        <label id="foodID">Amount</label>
                        <br></br>
                        <input 
                        type="text" name="food" id ="servingsID"
                        value = {this.state.amount}
                        onChange = {e => this.updateField("amount",e.target.value)}
                        >
                        </input>
                    <div class="tooltip">Servings
                        <span class = "tooltiptext">{this.state.amtLabel}</span>
                    </div>
                        <ButtonToolbar id = "btntoolbar">
                            <Button id="but2" type = "submit" value = "Submit" onClick = {()=>this.addtoFirebase()}> 
                                {" "}
                                Enter{" "}
                            </Button>
                        </ButtonToolbar>
                        {this.state.alertamt&&this.alert()}
                    </div>
                    <ButtonToolbar id = "btntoolbar2">
                        <Link to={'/Summary'}>
                        <Button id="but3" type = "submit" value = "Submit"> 
                            {" "}
                            View Summary{" "}
                        </Button>
                        </Link>
                    </ButtonToolbar></div>
            </div>
            <div className="bottomHeader" />
         </div>
    );
    }
}



