import React, {Component} from "react";
import {Button, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import "./UserStyle.css"

const ColoredLine = ({color}) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            marginTop: 50
        }}
    />
)

const styles = {
    btn: {
        margin: '0px 0px 10px 0px'
    },
    cntnr: {
        margin: '0px 0px 20px 0px',
        padding: '5px 15px 50px 15px'
    },
    form: {
        margin: '0px 0px 50px 0px',
    }
}

export class Message extends Component{
    constructor(props) {
        super(props);
        this.state ={
            username:"",
            productname:"",
            id: this.props.msg.id,
            userid: this.props.msg.receiverid,
            productid: this.props.msg.productid,
            receiverid: this.props.msg.userid,
            text: "",
            time: this.props.msg.time.split("T")[1],
            date: this.props.msg.time.split("T")[0]
            
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }
    componentDidMount() {
        this.fetchData();
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async onSubmit(event) {
        if (this.state.text==="")
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
    
    async fetchData() {
        if (!this.props.isSendedMessages) {
            const response = await fetch('message/userid/' + this.state.id, {method: 'GET'});
            const data = await response.json();
            this.setState({username: data.fio});
        }
        else {
            const response = await fetch('message/receiverid/' + this.state.id, {method: 'GET'});
            const data = await response.json();
            this.setState({username: data.fio});
        }
        
        const response1 = await fetch('message/productid/' + this.state.id, {method: 'GET'});
        const data1 = await response1.json();
        this.setState({productname: data1.name});

        /*this.setState({productid: data.productid});
        this.setState({userid: data.userid});*/
    }
    render() {
        let form;
        if(!this.props.isSendedMessages)
        {
            form = <div>
                <Row lg={2}>
                    <Col>
                        <h3> {this.state.username} </h3>
                    </Col>
                    <Col className="text-lg-right">
                        <h5> {this.state.time} </h5>
                    </Col>
                    <Col>
                        <h4> {this.state.productname} </h4>
                    </Col>
                    <Col className="text-lg-right">
                        <h5> {this.state.date} </h5>
                    </Col>
                </Row>
                    
                    <h5 className="font-weight-normal"> {this.props.msg.text} </h5>
                    <Form> 
                        <FormGroup className="mb-lg-3 me-sm-2 sm-0">
                        <Input
                        name="text"
                        required
                        value={this.state.text}
                        onChange={this.onChange}/>
                        </FormGroup>
                    </Form>
                    <Button style={styles.btn} color="secondary" className="float-right"
                            onClick={this.onSubmit}> Ответить </Button>
            </div>
                
        }
        else {
            form = <div> <Row lg={2}>
                <Col>
                    <h3> {this.state.username} </h3>
                </Col>
                <Col className="text-lg-right">
                    <h5> {this.state.time} </h5>
                </Col>
                <Col>
                    <h4> {this.state.productname} </h4>
                </Col>
                <Col className="text-lg-right">
                    <h5> {this.state.date} </h5>
                </Col>
            </Row>

            <h5 className="font-weight-normal"> {this.props.msg.text} </h5>
            </div>
        }
        return(<Container style={styles.cntnr} className="containerR"
                          fluid="xl">
                {form}
            </Container>
        )
    }
}