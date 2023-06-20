import React, {Component} from 'react';
import {
    Row,
    Col,
    Label, Button, ListGroup, ListGroupItem, Form, FormGroup, Input, Container
} from 'reactstrap';
import "../HomeView/HomeStyle.css"
import "./UserStyle.css"
import {UserProds} from "./UserProds";
import {AddProduct} from "./AddProduct";
import {UserMessages} from "./UserMessages";
import {SendedMessages} from "./SendedMessages";

const styles = {
    h2: {
        display: 'inline',
        borderBottom: '3px solid #dee2e6',

    },
    label: {
        marginBottom: '25px'
    },
    btn: {
        margin: '10px 0px 150px 0px'
    },
    cntnr: {
        padding: '0px 0px 0px 0px',
        
    },
    listgroup: {
        marginBottom: '0',
        borderRight: '0', borderTop: '0' , borderLeft: '0'
    },
    formgroup: {
        marginBottom: '15px !important',
    }
}
const ColoredLine = ({color}) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            marginTop: 0
        }}
    />
)

export class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.user.id,
            login: this.props.user.login,
            mobile: this.props.user.mobile,
            fio: this.props.user.fio,
            fioChange: "",
            mobileChange: "",
            productsList: [],
            page: 1,
            user: []
        };
        //this.fetchData = this.fetchData.bind(this)
        this.onUpdate = this.onUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.FirstPage = this.FirstPage.bind(this);
        this.SecondPage = this.SecondPage.bind(this);
        this.ThirdPage = this.ThirdPage.bind(this);
        this.FourthPage = this.FourthPage.bind(this);
        this.FifthPage = this.FifthPage.bind(this);
        this.checkLoginStatus = this.checkLoginStatus.bind(this);
    }

    async componentDidMount() {
        await this.checkLoginStatus();
        /*try {
            await this.fetchData();
        } 
        catch (e) {
            console.log("server not responding")
        }*/
    }
    async checkLoginStatus() {
        const response = await fetch('/auth/user',{
            method:'GET',
            headers:{'Content-type':'application/json'},
            credentials:'include'
        });
        const user = await response.json();

        if(response.ok)
        {
            this.setState({
                loggedInStatus: "LOGGED_IN",
                user: user
            });
        }
        else{
            this.setState({
                loggedInStatus: "NOT_LOGGED_IN",
                user: {}
            });
        }
    }
    
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async onUpdate(event) {
        event.preventDefault();
        const {fioChange, mobileChange} = this.state
        if(fioChange==="" && mobileChange!=="")
        {
            const response = await fetch('/user/'+ this.state.user.id+"/same_fio/"+ this.state.mobileChange, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({mobileChange})
            });
        }
        else if(mobileChange==="" && fioChange!=="") {

            const response = await fetch('/user/' + this.state.user.id + "/" + this.state.fioChange + "/same_mobile", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({fioChange})
            });
        }
        else if (mobileChange!=="" && fioChange!=="") 
        {
            const response = await fetch('/user/' + this.state.user.id + "/" + this.state.fioChange + "/" + this.state.mobileChange, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({fioChange,mobileChange})
            });
        }
        
        //const data = await response.json();
        //this.setState({user:data});
    }
    /*
    async fetchData() {
        const response = await fetch('user/' + this.state.id, {method: 'GET'}); //user/{id}/prods
        const data = await response.json();
        this.setState({login: data.login, mobile: data.mobile, fio: data.fio})
    };*/
    
    async FirstPage() {
        this.setState({page : 1})
    }
    async SecondPage() {
        this.setState({page : 2})
    }
    async ThirdPage() {
        this.setState({page : 3})
    }
    async FourthPage() {
        this.setState({page : 4})
    }
    async FifthPage() {
        this.setState({page : 5})
    }

    render() {
        let currentPage;
        if (this.state.page === 1)
        {
            currentPage =  <div>
                <h2>Мой аккаунт</h2>
                <ColoredLine color="#dee2e6"/>
                <h3>Имя: {this.state.user.fio}</h3>
                <h3>Номер телефона: {this.state.user.mobile}</h3>
                <h3>Логин: {this.state.user.login}</h3>
                <ColoredLine color="#dee2e6"/>
                <Form>
                    <div>
                        <FormGroup className="mb-lg-3 me-sm-2 sm-0" style={styles.formgroup}>
                            <Label
                                className="me-sm-2"
                            >
                                Имя
                            </Label>
                            <Input
                                name="fioChange"
                                type="text"
                                value={this.state.fioChange}
                                onChange={this.onChange}
                            />
                        </FormGroup>
                    </div>
                    <div>
                        <FormGroup className="mb-lg-3 me-sm-2 sm-0" style={styles.formgroup}>
                            <Label
                                className="me-sm-2"
                            >
                                Номер телефона
                            </Label>
                            <Input
                                name="mobileChange"
                                type="text"
                                value={this.state.mobileChange}
                                onChange={this.onChange}
                            />
                        </FormGroup>
                    </div>
                    <Button style={styles.btn} color="secondary" className="float-right"
                            onClick={this.onUpdate}> Обновить данные </Button>
                </Form>
            </div>
        }
        else if (this.state.page === 2)
        {
            currentPage = <UserProds userid={this.state.user.id}/>
        }
        else if (this.state.page === 3)
        {
            currentPage = <AddProduct userid={this.state.user.id}/>
        }
        else if (this.state.page === 4)
        {
            currentPage = <div> <UserMessages userid={this.state.user.id} isSendedMessages={false}/></div>
        }
        else if (this.state.page === 5)
        {
            currentPage = <div> <SendedMessages userid={this.state.user.id} isSendedMessages={true}/></div>
        }
        return (
            <div>
                <Label style={styles.label}>
                    <h2 style={styles.h2}> {this.state.user.login}</h2>
                </Label>
                
                <Row lg={2}>
                    <Col lg={3}>
                        <Container style={styles.cntnr} className="containerR"
                                   fluid="xl">
                        <ListGroup>
                            <ListGroupItem style={styles.listgroup}>
                                    <Button color="link" onClick={this.FirstPage}>  Моя страница </Button>
                            </ListGroupItem >
                            <ListGroupItem style={styles.listgroup}>
                                    <Button color="link" onClick={this.SecondPage}> Мои товары </Button>
                            </ListGroupItem>
                            <ListGroupItem style={styles.listgroup}>
                                    <Button color="link" onClick={this.ThirdPage}> Добавить новый товар </Button>
                            </ListGroupItem>
                            <ListGroupItem style={styles.listgroup}>
                                    <Button color="link" onClick={this.FourthPage}> Полученные сообщения </Button>
                            </ListGroupItem>
                            <ListGroupItem style={styles.listgroup}>
                                <Button color="link" onClick={this.FifthPage}> Отправленные сообщения </Button>
                            </ListGroupItem>
                        </ListGroup>
                        </Container>
                    </Col>
                    <Col lg={9}>
                        {currentPage}
                    </Col>
                </Row>
                
            </div>
        );
    }
}
