import React, { Component } from "react";
import firebase from "./configs";
import {ButtonToolbar, Button} from "react-bootstrap"
export default class App2 extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            amount: "",
            foods: [],
        }
    }

    componentWillMount(){
        firebase.database().ref("/usersFood").on("value",snapshot => {
            if(snapshot.val()){
                this.setState({
                    ...this.state,
                    foods: snapshot.val()
                });
            }
        });
    }

    addtoFirebase(obj){
        if(obj.n!==""&&obj.a!==""){
            let curr = this.state.foods
            curr.push(obj)
            firebase.database().ref("/usersFood").set(curr);
        }
        console.log(this.state.foods)
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
            <div className="title">
            <h2>Enter Info</h2></div>
            <div className="labels1">
                <div class="foodLabel">
                    <label for="food">Food Name: </label>
                    <input 
                    type="text" name="food"
                    value = {this.state.name}
                    onChange = {e => this.updateField("name",e.target.value)}
                    >
                    </input></div>
                <div className="amountLabel">
                    <label for="amount">Amount: </label>
                    <input 
                    type="text" name="amount" 
                    value = {this.state.amount}
                    onChange = {e => this.updateField("amount",e.target.value)}
                    >
                    </input></div>
             </div>
            <ButtonToolbar>
                <Button id="but2" type = "submit" value = "Submit" onClick = {()=> this.addtoFirebase(newFood)}>
                    {" "}
                    Submit{" "}
                </Button>
            </ButtonToolbar>
            </div>
         </div>
    );
    }
}


