import React, {Component} from 'react';
import { Label, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {RegisterForm} from "./RegisterForm";
import {SignInForm} from "./SignInForm";


export class Login extends Component {
    constructor(props) {
        super(props);
        this.handleRegistrationClick = this.handleRegistrationClick.bind(this);
        this.handleEnterClick = this.handleEnterClick.bind(this);
        this.state = {
            modal: false,
            description: '',
            isRegistration: true
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    
    handleRegistrationClick() {
        this.setState({
            isRegistration: true
        });
    }

    handleEnterClick() {
        this.setState({
            isRegistration: false
        });
    }
   
    render() {
        const isRegistration = this.state.isRegistration;
        let footer, header, form;
        if (!isRegistration) {
            header = <ModalHeader toggle={this.toggle}>{this.props.title} Вход </ModalHeader>
            form = <SignInForm isRegistration={this.state.isRegistration} modal={this.state.modal} toggle={this.toggle}  
                               checkLoginStatus={this.props.checkLoginStatus} handleLogin={this.props.handleLogin}/>
            footer = <ModalFooter>
                <Label> Нет аккаунта?</Label>
                <Button color="link" onClick={this.handleRegistrationClick}> Зарегистрироватся </Button>
            </ModalFooter>
        } 
        else {
            header = <ModalHeader toggle={this.toggle}> {this.props.title} Регистрация </ModalHeader>
            form = <RegisterForm isRegistration={this.state.isRegistration} modal={this.state.modal} toggle={this.toggle}
                                 checkLoginStatus={this.props.checkLoginStatus} handleLogin={this.props.handleLogin}/>
            footer = <ModalFooter>
                <Label> Есть аккаунт? </Label>
                <Button color="link" onClick={this.handleEnterClick}> Войти </Button>
            </ModalFooter>
        }
        
        return (
            <div>
                <Button color="light" onClick={this.toggle}> Log in </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    {header}
                    <ModalBody>
                        {this.props.modal}
                        {form}
                    </ModalBody>
                    {footer}
                </Modal>
            </div>
        );
    }
}