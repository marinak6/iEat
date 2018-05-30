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
            error: null
        }
    }

    updateField=(field, value)=>{
        this.setState({
            ...this.state,
            [field]:value
        });
    }

    register=()=>{
       console.log(this.state)
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
        let isInvalid = 
            this.state.passwordOne !== this.state.passwordTwo || 
            this.state.passwordOne === '' ||
            this.state.email === '' ||
            this.state.username === '';
            
        return(
            <div className = "Sign up">
            <Login 
            updateSignUp = {this.updateField}
            signUpUsername = {this.state.username}
            signUpPasswordOne = {this.state.passwordOne}
            signUpPasswordTwo = {this.state.passwordTwo}
            signUpEmail = {this.state.email}
            invalidSignUp = {this.isInvalid}
            success = {this.register}
            />
            </div>
        )
    }
}