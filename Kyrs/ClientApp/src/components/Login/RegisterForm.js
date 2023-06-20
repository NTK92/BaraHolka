import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import "./RegisterStyle.css"

const styles = {
    btn: {
        margin: '0'
    }
}

export class RegisterForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isRegistration : props.isRegistration,
            modal : props.modal,
            login: "",
            password: "",
            fio: "",
            mobile: ""
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
        const {login, password, fio, mobile} = this.state
        let redirect = false;
        if (login=='' || password=='' || fio=='' || mobile=='')
        {
            alert("Заполнены не все поля");
            return;
        }
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password, fio, mobile})
        });
        if (response.status === 404) {
             alert("Данный логин уже существует");
        }
        /*else if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Request failed: ${response.status}`);
        }*/
        else if (response.status === 200 || response.status === 201 ) {
             this.setState({
                 modal: !this.state.modal
             });
        }
        
    }
    
    render() {
        return (
                <Form>
                <div>
                    <FormGroup className="mb-lg-3 me-sm-2 sm-0">
                        <Label className="me-sm-2">
                            Логин
                        </Label>
                        <Input
                            name="login"
                            type="email"
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
                            type="password"
                            required
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                </div>
                <div>
                    <FormGroup className="mb-lg-3 me-sm-2 sm-0">
                        <Label
                            className="me-sm-2"
                        >
                            Имя
                        </Label>
                        <Input
                            name="fio"
                            type="text"
                            required
                            value={this.state.fio}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                </div>
                <div>
                    <FormGroup className="mb-lg-3 me-sm-2 sm-0">
                        <Label
                            className="me-sm-2"
                        >
                            Номер телефона
                        </Label>
                        <Input
                            name="mobile"
                            type="text"
                            required
                            value={this.state.mobile}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                </div>
                    
                
                <Button style={styles.btn}  color="secondary" className="float-right"
                        onClick={this.onSubmit}> Зарегистрироватся </Button>
            </Form>
                
            
        );
    }
}