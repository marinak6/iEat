import React, { Component} from 'react';
import './App.css';
import { ButtonToolbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import App2 from './App2.js';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import headerpic from './header.png';
import {auth,provider} from './configs'; 
import firebase from './configs'; 


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      // log in variables
      email: "",
      password: "",
      // clock variables
      today: new Date(),
      dd: "",
      mm: "",
      m: "",
      h: "",
      day: "",
      noon: "",
      yyyy: "",
      user: false,
      click: false
    };
  }

  
  componentWillMount(){
    this.setTime();
    //this.logout();
  }
  componentDidMount(){
    window.setInterval(function(){
      this.setTime();
    }.bind(this),1000);
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user!==null) {
        this.setState({
          user: true
        })
      } else {
        user: false
      }
    });
  }

  setTime(){
    let today = new Date();
    this.setState({
      dd:today.getDate(),
      mm:today.getMonth()+1,
      yyyy:today.getFullYear()
    });
    if(this.state.dd<10){
      this.setState({
        dd: '0'+this.state.dd
      });
    }
    if(this.state.mm<10){
      this.setState({
        mm: '0'+this.state.mm
      });
    }
    if(today.getDay()==0){
      this.setState({
        day: "Sunday"
      });
    }
    else if(today.getDay()==1){
      this.setState({
        day: "Monday"
      });
    }
    else if(today.getDay()==2){
      this.setState({
        day: "Tuesday"
      });
    }
    else if(today.getDay()==3){
      this.setState({
        day: "Wednesday"
      });
    }
    else if(today.getDay()==4){
      this.setState({
        day: "Thursday"
      });
    }
    else if(today.getDay()==5){
      this.setState({
        day: "Friday"
      });
    }
    else if(today.getDay()==6){
      this.setState({
        day: "Saturday"
      });
    }
    let noon = "";

    this.setState({
      h: (today.getHours()<10?'0':'')+today.getHours()
    });
    if(this.state.h<12){
      this.setState({
        noon: "AM"
      });
    }
    else{
      this.setState({
        noon: "PM"
      });
    }
    this.setState({
      h: this.state.h%12
    });
    this.setState({
      m: (today.getMinutes()<10?'0':'')+today.getMinutes()
    });
    this.setState({
      today: this.state.day + " "+this.state.mm + '/' + this.state.dd + '/' + this.state.yyyy+ " "+this.state.h+":"+this.state.m+" "+this.state.noon
    });
  }

  login = () => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      return <Redirect to = '/Info'/>
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    console.log(this.state)
  }

  logout = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
    this.setState({
      user: null
    })
  }

  buttonclick=()=>{
    this.setState({
      click: true
    })
    if(!this.state.user){
      this.login()
    }
  }
  render() {
    if(this.state.user&&this.state.click){
      console.log("hey")
      return <Redirect to = '/Info'/>
    }
    return (
      <div className='Background'>
          <div className="Header">
            <header>
            <img id = "pic"src={headerpic} class = "header" alt = "headerpic" />
            </header></div>
            
          <div className="Button">
            <ButtonToolbar>
              <Button 
               id="but" bsStyle="success" bsSize="large"
               onClick = {this.buttonclick}>
               GET<br />STARTED
              </Button>
            </ButtonToolbar>
            </div>
          <div className="timeStamp"><h1 id = "stamp">{this.state.today}</h1></div>
          </div>
    );
  }
}

export default App;