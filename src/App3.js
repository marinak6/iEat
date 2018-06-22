import React, { Component } from "react";
import firebase from "./configs";
import axios from "axios";


export default class App3 extends Component{
    constructor(props){
        super(props)
        this.state = {
            foodName: [],
            foodGroup: [],
            calories: [], 
            fat: [],
            protein: [] 
        }
    }
    
    componentDidMount() {
            
        const apiKey = "xfDET5R7EqwtYYaPcIdwa2DkKpf1jRzGXGJRFhsl";
        const ndbno = document.getElementById();
        const type = "b";
        const format = "json";
        const url = "https://api.nal.usda.gov/ndb/V2/reports/?ndbno=" + ndbno + "&type=" + type + "&format=" + format + "&api_key=" + apiKey;
        $.get(url, function( data ) {
            alert( "Data Loaded: " + JSON.stringify(data) );
        });

        axios
        .get(url)
        .then(response => {
          this.setState({
            foodName: response.data.results,
            foodGroup: response.data.results,
            calories: response.data.results,
            fat: response.data.results,
            protein: response.data.results,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    
render() { 

     let {foodName, foodGroup, calories, fat, protein} = this.state;
     let points = foodName.map(x => {
        return 
        <div>
        <li>{" "}Food:{x.foodName}{" "}</li>
        <li>{" "}Group:{x.foodGroup}{" "}</li>    
        <li>{" "}Calories:{x.calories}{" "}</li>    
        <li>{" "}Fat:{x.fat}{" "}</li>    
        <li>{" "}Protein:{x.protein}{" "}</li> 
        </div>
    });

    return(
        <div className='Background'>
         <div className="title">
            <h2>Diet Summary</h2></div>
            <ul>{points}</ul>
        </div>
    );
}
}