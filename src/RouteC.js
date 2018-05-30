import React, { Component } from 'react';
import './App.css';
import App from './App.js';
import App2 from './App2.js';
import Login from './Login.js';
import signUp from './signUp.js';
import App3 from './App3.js';

import {BrowserRouter, Route, Link,Redirect} from 'react-router-dom'

export default class RouteC extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                <Redirect to='/iEat' />    
                <Route path = "/iEat" component = {App}/>
                <Route path = "/Info" component = {App2}/>
                <Route path = "/Summary" component = {App3}/>
                </div>
            </BrowserRouter>
        );
    }
}