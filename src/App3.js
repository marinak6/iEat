import React, { Component } from "react";
import firebase from "./configs";
import axios from "axios";
import apple from './apple.png';
import orange from './orange.png';
import banana from './banana.png';
import broccoli from './broccoli.png';


export default class App3 extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            amount: "",
            foodGroup: "",
            calories: "", 
            fat: "",
            protein: "",
            foods: [],
            nbd: []
        }
    }
    
    componentDidMount() {
        // grabbing data from firebase // 
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
        // grabbing nbdno //
        const apiKey = "xfDET5R7EqwtYYaPcIdwa2DkKpf1jRzGXGJRFhsl";
        let nbdtemp = [];
        this.state.foods.forEach(entry=>{
            let nbdurl = "https://api.nal.usda.gov/ndb/search/?format=json&q="+entry.n+"&sort=n&max=25&offset=0&api_key="+apiKey
            console.log(nbdurl)
            axios.get(nbdurl)
            .then(response =>{
                let narrowData = []
                let results = response.data.list.item;
                for(let i = 0; i < results.length; i++){
                  if(results[i].name.length<entry.n.length+24){ // grabs the nbd number if the name is short 
                      nbdtemp.push(results[i].nbdno)
                      break;
                  }  
                }
            })
        })
        this.setState({
            nbd: nbdtemp
        })
        /*
        const ndbno = document.getElementById();
        const type = "b";
        const format = "json";
        const url = "https://api.nal.usda.gov/ndb/V2/reports/?ndbno=" + ndbno + "&type=" + type + "&format=" + format + "&api_key=" + apiKey;
       /* $.get(url, function( data ) {
            alert( "Data Loaded: " + JSON.stringify(data) );
        });*/
/*
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
*/
console.log(this.state.nbd)
    }
    
    render() { 
        let array = this.state.foods.map(entry => {
            return <div className = "space"><div className="array">
            <h1>Food: {entry.n}</h1>
            <p>Amount: {entry.a}</p>
            </div></div>

        });
        /*
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
        });*/

        return(
            <div className='Background'>
                <div className="summaryTitle">
                    <h2>~ Diet Summary ~</h2></div>
                <div className="decorations">
                    <img src={orange} className = "orange"/>
                    <img src={apple} className = "apple"/>
                    <img src={banana} className = "banana"/>
                    <img src={broccoli} className = "broccoli"/>
                    </div>
                <div>{array}</div>
                <div className="bottomHeader"></div>
            </div>
        );
    }
}
        
    


