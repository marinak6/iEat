import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Login from './Login.js';
import {auth} from './configs';

export default class signUp extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
            isInvalid: false,
            error: null
        };
    }

    invalid=()=>{
        if(
            this.props.passwordOne !== this.state.passwordTwo || 
            this.state.passwordOne === '' ||
            this.state.email === '' ||
            this.state.username === ''
        ){
            this.setState({
                ...this.state,
                isInvalid: true
            })
        }
        else{
            this.setState({
                ...this.state,
                isInvalid: false
            })
        }
    }
    updateField=(field, value)=>{
        console.log("I'm happening")
        this.setState({
            ...this.state,
            [field]:value
        });
    }

    
    register=()=>{
       console.log("hello")
        auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.passwordOne)
        .then(authUser => {
            this.setState(()=>({    // if success then clear input state
                username: '',
                email: '',
                passwordOne: '',
                passwordTwo: '',
                error: null
            }));
            // NEED TO REDIRECT TO INFO PAGE
        })
        .catch(error => {
            this.setState(this.updateField('error',error))
        });
    }
    render(){
        return(
            <div className = "Sign up">
            <Login 
            updateSignUp = {this.updateField}
            signUpUsername = {this.state.username}
            signUpPasswordOne = {this.state.passwordOne}
            signUpPasswordTwo = {this.state.passwordTwo}
            signUpEmail = {this.state.email}
            invalidSignUp = {this.state.isInvalid}
            success = {this.register}
            />
            </div>
        )
    }
}