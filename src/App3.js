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
                    let childData = child.val();
                   let key = child.key;
                    console.log(key)
                    console.log(childData)
                    entry.push({data: childData, id: key});
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
                    if(nutr[i].name==="Protein"){
                        proteintemp = nutr[i].value+nutr[i].unit
                        prot.push(nutr[i].value);
                        console.log(prot)
                    }
                    if(nutr[i].nutrient_id===204||nutr[i].nutrient_id==="204"){
                        fattemp = nutr[i].value+nutr[i].unit
                        fat.push(nutr[i].value);
                    }
                    if(nutr[i].nutrient_id===205||nutr[i].nutrient_id==="205"){
                        carbstemp = nutr[i].value+nutr[i].unit
                        carb.push(nutr[i].value);
                    }
                    if(nutr[i].nutrient_id===291||nutr[i].nutrient_id==="291"){
                        fibertemp = nutr[i].value+nutr[i].unit
                        fib.push(nutr[i].value);
                    }
                    if(nutr[i].nutrient_id===269||nutr[i].nutrient_id==="269"){
                        sugartemp = nutr[i].value+nutr[i].unit
                        sug.push(nutr[i].value);
                    }
                }
                let entry = {
                    name: results.name,
                    foodGroup: fgtemp,
                    fat: fattemp,
                    protein: proteintemp,
                    carbs: carbstemp,
                    fiber: fibertemp,
                    sugar: sugartemp,
                    id: element.id
                }
                foodTemp.push(entry)
                this.setState({
                    foods: foodTemp,
                    fat: fat,
                    protein: prot,
                    sugar: sug,
                    carb: carb,
                    fiber: fib
                })
                console.log(this.state.foods)
                this.calculate();
            });
        })
    }

    calculate=()=>{
        console.log(this.state)
        let totalProt=0; let totalFat=0; let totalSugar=0; let totalCarb=0; let totalFiber=0;
        for(let i = 0; i < this.state.protein.length; i++){
            console.log(parseFloat(this.state.protein[i]))
            if(typeof this.state.protein === 'string') {
                totalProt += parseFloat(this.state.protein[i]);
            }
            else{
                totalProt += this.state.protein[i]
            }

            if(typeof this.state.fat === 'string') {
                totalFat += parseFloat(this.state.fat[i]);
            }
            else{ 
                totalFat += this.state.fat[i]; 
            }

            if(typeof this.state.sugar === 'string') {
                totalSugar += parseFloat(this.state.sugar[i]);
            }
            else { 
                totalSugar += this.state.sugar[i]
            }

            if(typeof this.state.carb === 'string') {
                totalCarb += parseFloat(this.state.carb[i]);
            }
            else { 
                totalCarb += this.state.carb[i]
            }

            if(typeof this.state.fiber === 'string') {
                totalFiber += parseFloat(this.state.fiber[i]);
            }
            else { 
                totalFiber += this.state.fiber[i]; 
            }
        } 


        console.log(totalProt)
        let v =
            <div className = "space">
                <p> Total Protein: {totalProt.toString()} </p>
                <p> Total Fat: {totalFat.toString()} </p>
                <p> Total Sugar: {totalSugar.toString()} </p>
                <p> Total Carbohydrates: {totalCarb.toString()} </p>
                <p> Total Fiber: {totalFiber.toString()} </p>
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
                    <Button onClick = {()=>this.delete(entry)}>
                        {" "}
                        delete{" "}
                    </Button>
                </ButtonToolbar>
            <p>Food: {entry.name.includes(", UPC")&&entry.name.substring(0,(entry.name.indexOf(", UPC")))}
                {!entry.name.includes(", UPC")&&entry.name}</p>
            <p>Food group: {entry.foodGroup}</p>
            <p>Fat: {entry.fat}</p>
            <p>Protein: {entry.protein}</p>
            <p>Sugar: {entry.sugar}</p>
            <p>Carbohydrates: {entry.carbs}</p>
            <p>Fiber: {entry.fiber}</p>
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
                <div className="calculatedTotal"><h4>Calculated Total:</h4>{this.calculate()}</div>
                <div className="bottomHeader3"></div>
            </div>
        );
    }
}

