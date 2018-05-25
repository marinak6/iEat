import React, { Component } from "react";
import firebase from "./configs";
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
        if(obj.name!==""&&obj.amount!==""){
            let curr = this.state.foods
            curr.push(obj)
            firebase.database().ref("/usersFood").set(curr);
        }
    }

    updateField(field, value){
        this.setState({
            ...this.state,
            [field]:value
        });
    }
    render(){
        return(
        <div className='secondPage'>
            <div className="box">
            <div className="title">
            <h2>1. Enter Info</h2></div>
            <div className="labels1">
                <div class="foodLabel">
                    <label for="food">Food Name: </label>
                    <input type="text" name="food"></input></div>
                <div className="amountLabel">
                    <label for="amount">Amount: </label>
                    <input type="text" name="amount"></input></div>
             </div>
            </div>
         </div>
    );
    }
}


