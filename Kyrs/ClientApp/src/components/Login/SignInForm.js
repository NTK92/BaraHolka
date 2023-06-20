import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import "./RegisterStyle.css"
import {Link, useHistory, useRouteMatch, Redirect, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { connect } from 'react-redux';
import { changeParams } from './actions'
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import store from "./store";

const styles = {
    btn: {
        margin: '0'
    }
}

export class SignInForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isRegistration : props.isRegistration,
            modal : props.modal,
            login: "",
            password: "",
            userid: 0,
            redirect: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async onSubmit(event) {
        event.preventDefault();
        const {login, password} = this.state
        const response = await fetch('/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password})
        });
        const data = await response.json();
        this.setState({ userid: data.id });
        //alert(this.state.userid)
        //console.log(data.id)
        if (response.status === 400) {
            alert("Такого логина не существует");
            return;
        }
        if (response.status === 404) {
            alert("Неверный пароль");
            return;
        }
        if (response.status !== 200 && response.status !== 201 && response.status !== 404) {
            throw new Error(`Sign in failed: ${response.status}`);
        }
        
        this.props.toggle();
        
        this.props.handleLogin();
        
        this.state.redirect=true;
        if(this.state.redirect){
            this.setState({
                modal: !this.state.modal
            });
        }
    }
    render() {
        /*if (this.state.redirect) {
            return <Redirect to={{pathname: "/user/" + 1 }}/>;
        }*/
        return (
            <Form>
                <div>
                    <FormGroup className="mb-lg-3 me-sm-2 sm-0">
                        <Label className="me-sm-2">
                            Логин
                        </Label>
                        <Input
                            name="login"
                            type="text"
                            required
                            value={this.state.login}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                </div>
                <div>
                    <FormGroup className="mb-lg-3 me-sm-2 sm-0">
                        <Label
                            className="me-sm-2"
                            for="examplePassword"
                        >
                            Пароль
                        </Label>
                        <Input
                            name="password"
                            type="text"
                            required
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                </div>
                
                <Button style={styles.btn} onClick={this.onSubmit} color="secondary" className="float-right"> Войти </Button>
                
            </Form>
        );
    }
}
/*
const mapStateToProps = (state) => {
    return {
        params: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeParams: (nameField, type) => {
            dispatch(changeParams(nameField, type))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);*/