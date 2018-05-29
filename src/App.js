import React, { Component } from 'react';
import './App.css';
import { ButtonToolbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import App2 from './App2.js';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import headerpic from './header.png';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      today: new Date(),
      dd: "",
      mm: "",
      m: "",
      h: "",
      day: "",
      noon: "",
      yyyy: "",
    };
  }
  componentWillMount(){
    this.setTime();
  }
  componentDidMount(){
    window.setInterval(function(){
      this.setTime();
    }.bind(this),1000);
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

  render() {
    return (
      <div className='Background'>
          <div className="Header">
            <header>
            <img src={headerpic} className = "header" alt = "headerpic" />
            </header></div>
          <div className="Button">
            <ButtonToolbar>
              <Link to={"/Info"}>
              <Button 
               id="but" bsStyle="success" bsSize="large">GET<br />STARTED
              </Button></Link>
            </ButtonToolbar>
            </div>
          <div className="timeStamp"><h1 id = "stamp">{this.state.today}</h1></div>
          </div>
    );
  }
}

export default App;