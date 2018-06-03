import React, { Component } from "react";
import firebase from "./configs";
import axios from "axios";
import apple from './apple.png';
import orange from './orange.png';
import banana from './banana.png';
import broccoli from './broccoli.png';
import {ButtonToolbar, Button, DropdownButton, MenuItem} from "react-bootstrap";


export default class App3 extends Component{
    constructor(props){
        super(props)
        this.state = {
            protein: [],
            calories: [],
            fat: [],
            sugar: [],
            carb: [],
            fiber: [],
            foods: [],
            ndb: []
        }
    }
    
    componentDidMount() {
      this.gettingNdb();
    }

    gettingNdb(){
        let userID = "/users/"+firebase.auth().currentUser.uid+"/foods"
        firebase.database().ref(userID).on("value",snapshot => {
            let entry = [];
            if(snapshot.val()){
               /* for(let i = 0; i <snapshot.val().length; i++){
                    let childData = snapshot.val().child[i].val()
                   let key = snapshot.val().child[i]
                    console.log(key)
                    console.log(childData)
                    entry.push(childData);
                }*/
                snapshot.forEach((child)=>{
                    let childndb = child.val().ndb;
                    let childamount = child.val().amount;
                    let key = child.key;
                    console.log(key)
                    console.log(childndb)
                    entry.push({data: childndb, id: key, amount: childamount});
                    console.log(entry);
                });
            }
            this.setState({
                ...this.state,
                ndb: entry
            });
            this.pullingData(entry);
        });
    }

    pullingData(entry){
        //api call
        let calories = []
        let prot = []
        let sug = []
        let fat = []
        let carb = []
        let fib = []
        let foodTemp = [];
        const apiKey = "xfDET5R7EqwtYYaPcIdwa2DkKpf1jRzGXGJRFhsl";
        entry.forEach((element)=>{
            console.log(element)
            let foodurl = "https://api.nal.usda.gov/ndb/reports/?ndbno="+element.data+"&type=f&format=json&api_key="+apiKey
            axios.get(foodurl)
            .then(response=>{
                let results = response.data.report.food;
                let nutr = results.nutrients
                // variables to print for food information //
                let caloriestemp = "0 kcal"
                let proteintemp = "0 g"
                let fattemp = "0 g"
                let carbstemp = "0 g"
                let fibertemp = "0 g"
                let sugartemp = "0 g"
                let fgtemp = "N/A"

                // variables to calculate total nutrition//

                if(results.fg!==null){
                    fgtemp = results.fg
                }
                for(let i = 0; i<nutr.length; i++){
                    if(nutr[i].nutrient_id===208||nutr[i].nutrient_id==="208"){
                        if(isNaN(nutr[i].measures[0].value)){
                            caloriestemp = 0;
                        }
                        else{
                            caloriestemp = parseFloat((parseFloat(nutr[i].measures[0].value)*element.amount).toFixed(2));
                        }
                        calories.push(caloriestemp);
                    }
                    if(nutr[i].name==="Protein"){
                        if(isNaN(nutr[i].value)){
                            proteintemp = 0;
                        }
                        else{
                            proteintemp = parseFloat((parseFloat(nutr[i].value)*element.amount).toFixed(2));
                        }
                        prot.push(proteintemp);
                    }
                    if(nutr[i].nutrient_id===204||nutr[i].nutrient_id==="204"){
                        if(isNaN(nutr[i].value)){
                            fattemp = 0;
                        }
                        else{
                            fattemp = parseFloat((parseFloat(nutr[i].value)*element.amount).toFixed(2));
                        }
                        fat.push(fattemp);
                    }
                    if(nutr[i].nutrient_id===205||nutr[i].nutrient_id==="205"){
                        if(isNaN(nutr[i].value)){
                            carbstemp = 0;
                        }
                        else{
                            carbstemp = parseFloat((parseFloat(nutr[i].value)*element.amount).toFixed(2));
                        }
                        carb.push(carbstemp);
                    }
                    if(nutr[i].nutrient_id===291||nutr[i].nutrient_id==="291"){
                        if(isNaN(nutr[i].value)){
                            fibertemp = 0;
                        }
                        else{
                            fibertemp = parseFloat((parseFloat(nutr[i].value)*element.amount).toFixed(2));
                        }
                        fib.push(fibertemp);
                    }
                    if(nutr[i].nutrient_id===269||nutr[i].nutrient_id==="269"){
                        if(isNaN(nutr[i].value)){
                            sugartemp = 0;
                        }
                        else{
                            sugartemp = parseFloat((parseFloat(nutr[i].value)*element.amount).toFixed(2));
                        }
                        sug.push(sugartemp);
                    }
                }
                let entry = {
                    name: results.name,
                    foodGroup: fgtemp,
                    calories: caloriestemp,
                    fat: fattemp,
                    protein: proteintemp,
                    carbs: carbstemp,
                    fiber: fibertemp,
                    sugar: sugartemp,
                    id: element.id
                }
                foodTemp.push(entry)
                this.setState({
                    calories: calories,
                    foods: foodTemp,
                    protein: prot,
                    fat: fat,
                    carb: carb,
                    sugar: sug,
                    fiber: fib
                })
                console.log(this.state)
                this.calculate();
            });
        })
    }

    calculate=()=>{
        console.log(this.state)
        let totalCalories = 0; let totalProt=0; let totalFat=0; let totalSugar=0; let totalCarb=0; let totalFiber=0;
        for(let i = 0; i < this.state.protein.length; i++){
            totalCalories+=this.state.calories[i];
            totalProt+=this.state.protein[i];
            totalFat+=this.state.fat[i];
            totalSugar+=this.state.sugar[i];
            totalCarb+=this.state.carb[i];
            totalFiber+=this.state.fiber[i];
        } 


        console.log(totalProt)
        let v =
            <div className = "space">
                <p> Total Calories: {totalCalories} g </p>
                <p> Total Protein: {totalProt} g </p>
                <p> Total Fat: {totalFat} g </p>
                <p> Total Carbohydrates: {totalCarb} g </p>
                <p> Total Sugar: {totalSugar} g </p>
                <p> Total Fiber: {totalFiber} g </p>
            </div>
        return v;

    }

    delete = (entry)=>{
        let userID = "/users/"+firebase.auth().currentUser.uid+"/foods"
        firebase.database().ref(userID).child(entry.id).remove();
    }
    render() { 
        let array = this.state.foods.map(entry => {
            return <div className = "space"><div className="array">
                <ButtonToolbar>
                    <Button  id="but4" onClick = {()=>this.delete(entry)}>
                        {" "}
                        x{" "}
                    </Button>
                </ButtonToolbar>
            <div className="nameTitle">
            <p id="foodNameSpace">{entry.name.includes(", UPC")&&entry.name.substring(0,(entry.name.indexOf(", UPC")))}
                {!entry.name.includes(", UPC")&&entry.name}</p></div>
            <p id="red">Calories: {entry.calories}</p>
            <p id="red">Protein: {entry.protein}</p>
            <p id="yellow">Fat: {entry.fat}</p>
            <p id="orange">Carbohydrates: {entry.carbs}</p>
            <p id="pink">Sugar: {entry.sugar}</p>
            <p id="green">Fiber: {entry.fiber}</p>
            </div></div>

        });

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
                <div className="arraySpace">{array}</div>
                <div className="calculatedTotal"><div className="calcualtedtotalHeader">Calculated Total:</div>
                <div className="thisCalculatedTotal">{this.calculate()}</div></div>
                <div className="bottomHeader3"></div>
            </div>
        );
    }
}

