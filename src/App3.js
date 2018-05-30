import React, { Component } from "react";
import firebase from "./configs";
import axios from "axios";
import App2 from './App2.js'
/*
var apiKey = "DEMO_KEY";
var ndbno = "01009";
var type = "b";
var format = "json";
var url = "http://api.nal.usda.gov/ndb/reports/?ndbno=" + ndbno + "&type=" + type + "&format=" + format + "&api_key=" + apiKey;
$.get(url, function( data ) {
    alert( "Data Loaded: " + JSON.stringify(data) );
});

name + group + cf + ff + pf*/

export default class App3 extends Component{
    constructor(props){
        super(props)
        this.state = {
            foods: [],
        }
    }

    componentDidMount(){
        let userID = "/users/"+firebase.auth().currentUser.uid+"/foods"
        firebase.database().ref(userID).on("value",snapshot => {
            if(snapshot.val()){
                let entry = [];
                snapshot.forEach((child)=>{
                    let childData = child.val();
                    entry.push(childData);
                    console.log(childData);
                });
                this.setState({
                    ...this.state,
                    foods: entry
                });
            }
        });
        console.log(this.state.foods)
    }
    /*
    componentDidMount() {
        let url =
          "/src/USDA API" +
          API_KEY;
    
        axios
          .get(url)
          .then(response => {
            this.setState({ ""
            });
          })
          .catch(err => {
            console.log(err);
          });
      }*/

render() { 
    let array = this.state.foods.map(entry => {
        return <div>
        <h1> Name: {entry.n}</h1>
        <p> amount: {entry.a}</p>
        </div>
      });

    return(
        <div className='Background'>
         <div className="title">
            <h2>Diet Summary</h2></div>
            {array}
        </div>
    )
}
}

