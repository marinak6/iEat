import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Login from './Login';
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

    updateField(field, value){
        this.setState({
            ...this.state,
            [field]:value
        });
    }

    register(){
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
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
        const{
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid = 
            passwordOne !== passwordTwo || 
            passwordOne === '' ||
            email === '' ||
            username === '';
            
        return(
            <Login 
            updateSignUp = {(field,value)=>this.updateField(field,value)}
            signUpUsername = {this.state.username}
            signUpPassword = {this.state.password}
            signUpEmail = {this.state.email}
            invalidSignUp = {this.isInvalid}
            />
        )
    }
}