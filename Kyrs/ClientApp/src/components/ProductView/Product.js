import React, {Component} from "react";
import { withRouter} from "react-router-dom";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import "../UserPage/UserStyle.css"

const styles = {
    h2: {
        display: 'inline',
        borderBottom: '3px solid #dee2e6'
    },
    label: {
        marginBottom: '25px'
    },
    cntnr: {
        padding: '10px 0px 0px 0px'
    },
    cntnrR: {
        padding: '0'
    },
    btn: {
        margin: '10px 0px 10px 0px'
    },
    form: {
        margin: '10px 0px 0px 0px'
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

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prod: [],
            seller: [],
            userid: this.props.user.id,
            text: "",
            productid: 0,
            receiverid: 0
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() 
    {
        let id = this.props.match.params.id;
        this.fetchData(id);
        this.state.productid = id;
    }
    async fetchData(id) {
        const response = await fetch('product/' + id,{ method: 'GET'});
        const data = await response.json();
        this.setState({prod: data});
        const response1 = await fetch('product/userid/'+id,{ method: 'GET'});
        const sellerData = await response1.json();
        this.setState({seller: sellerData});
        this.state.receiverid = this.state.seller.id;
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async onSubmit() {
        if (this.state.text==="")
            return
        if (this.props.user.id===null)
            return
        const {text, userid, productid, receiverid} = this.state
        const response = await fetch('/message', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text, userid, productid, receiverid})
        });
    }
    
    render() 
    {
        let form
        if (this.props.loggedInStatus==="NOT_LOGGED_IN" || this.props.user===null)
        {
            form = <div> </div>
        }
        else
        {
            form = <div>
                <h3>Задать вопрос продавцу:</h3>
                <Form style={styles.form}>
                    <FormGroup className="mb-lg-3 me-sm-2 sm-0">
                        <Input
                    name="text"
                    required
                    value={this.state.text}
                    onChange={this.onChange}/>
                    <Button style={styles.btn} color="secondary" className="float-right"
                             onClick={this.onSubmit}> Отправить </Button>
                    </FormGroup>
                </Form>
            </div>
        }
        return(
            <div>
        <Label style={styles.label}>
            <h2 style={styles.h2}> {this.state.prod.name}</h2>
        </Label>
        <Row lg={2}>
            <Col sm-auto>
                <Container style={styles.cntnrR} className="containerR"
                           fluid="lg">
                <img alt src={this.state.prod.picture} height="500px" width="540px"/>
                </Container>
            </Col>
            
            <Container style={styles.cntnr} className="containerR"
                       fluid="lg">
            <Col sm-auto>
                <Row>
                    <Col sm-auto>
                        <h3>Цена:</h3>
                    </Col>
                    <Col sm-auto>
                        <h3> {this.state.prod.price}</h3>
                    </Col>
                </Row>
                <ColoredLine color="#dee2e6"/>
                <h3>Описание:</h3>
                <h5>{this.state.prod.description}</h5>
                <ColoredLine color="#dee2e6"/>
                <h3>Продавец:</h3>
                <h5>{this.state.seller.fio}</h5>
                <ColoredLine color="#dee2e6"/>
                <h3>Номер для связи:</h3>
                <h5>{this.state.seller.mobile}</h5>
                <ColoredLine color="#dee2e6"/>
                {form}
            </Col>
            </Container>
        </Row>
        </div>
        )
    }
}
const ProductT = withRouter(Product);
export default ProductT;

