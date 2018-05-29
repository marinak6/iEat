import React, { Component } from 'react';
import './App.css';
import App from './App.js';
import App2 from './App2.js';
import Login from './Login.js'
import {BrowserRouter, Route, Link,Redirect} from 'react-router-dom'

export default class RouteC extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                <Redirect to='/Main' />    
                <Route path = "/Main" component = {App}/>
                <Route path = "/Info" component = {App2}/>
                <Route path = "/Login" component = {Login}/>
                {App}
                </div>
            </BrowserRouter>
        );
    }
}