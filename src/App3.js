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
            ndb: [],
            count: 0
        }
    }
    
    componentDidMount() {
      this.gettingNdb();
    }

    gettingNdb(){
        let userID = "/users/"+firebase.auth().currentUser.uid+"/foods"
        firebase.database().ref(userID).on("value",snapshot => {
            let entry = [];
            let count = 0;
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
                ndb: entry,
            });
            console.log(this.state.ndb.length)
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
                    amount: element.amount,
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
            <div className = "arraySpace">
                <p>Calories: {totalCalories.toFixed(2)} </p>
                <p>Protein: {totalProt.toFixed(2)} g </p>
                <p>Fat: {totalFat.toFixed(2)} g </p>
                <p>Carbohydrates: {totalCarb.toFixed(2)} g </p>
                <p>Sugar: {totalSugar.toFixed(2)} g </p>
                <p>Fiber: {totalFiber.toFixed(2)} g </p>
            </div>
        return v;

    }

    delete = (entry)=>{
        console.log(this.state.ndb.length);
        let userID = "/users/"+firebase.auth().currentUser.uid+"/foods"
        firebase.database().ref(userID).child(entry.id).remove();
        if(this.state.ndb.length===1){
            console.log("hello")
            this.setState({
                foods: [],
                calories: 0,
                protein: 0,
                fat: 0,
                carb: 0,
                sugar: 0,
                fiber: 0
            })
        }
    }
    clearAll = ()=>{
        let userID = "/users/"+firebase.auth().currentUser.uid+"/foods"
        this.state.foods.forEach((entry)=>{
            firebase.database().ref(userID).child(entry.id).remove();
        });
        this.setState({
            foods: [],
            calories: 0,
            protein: 0,
            fat: 0,
            carb: 0,
            sugar: 0,
            fiber: 0
        });
        console.log(this.state)
    }

    render() { 
        let array = [];
        if(this.state.foods.length!==0){
            console.log(this.state.foods)
            array = this.state.foods.map(entry => {
                return <div className = "space"><div className="array">
                    <ButtonToolbar>
                        <Button  id="but4" onClick = {()=>this.delete(entry)}>
                            {" "}
                            x{" "}
                        </Button>
                    </ButtonToolbar>
                <div className="nameTitle">
                <p id="foodNameSpace">{entry.name.includes(", UPC")&&entry.name.substring(0,(entry.name.indexOf(", UPC")))+" ("+entry.amount+")"}
                    {!entry.name.includes(", UPC")&&entry.name+" ("+entry.amount+")"}</p></div>
                <p id = "lit">Calories: {entry.calories.toFixed(2)} </p>
                <p id = "lit">Protein: {entry.protein.toFixed(2)} g</p>
                <p id = "lit">Fat: {entry.fat.toFixed(2)} g</p>
                <p id = "lit">Carbohydrates: {entry.carbs.toFixed(2)} g</p>
                <p id = "lit">Sugar: {entry.sugar.toFixed(2)} g</p>
                <p id = "lit">Fiber: {entry.fiber.toFixed(2)} g</p>
                </div></div>
            });
        }
        else{
            array = ()=>{
                return <div></div>
            }
        }

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
                <div className="calculatedTotal"><div className="calcualtedtotalHeader">Calculated Total:</div>
                <div className="thisCalculatedTotal">{this.calculate()}</div></div>
                <div className="arraySpace">{this.state.foods!==0&&array}</div>
                    <ButtonToolbar id = "clearAll">
                        <Button id="but3" type = "submit" value = "Submit" onClick = {()=>this.clearAll()}> 
                            {" "}
                            Clear All{" "}
                        </Button>
                    </ButtonToolbar>
                <div className="bottomHeader3"></div>

            </div>
        );
    }
}

