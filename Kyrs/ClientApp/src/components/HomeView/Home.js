import React, { Component } from 'react';
import {Col, Container, Row} from 'reactstrap';
import "./HomeStyle.css"
import ProductCards from "./ProductCards";


export class Home extends Component {
    constructor() {
        super();
        this.state = { 
            user: {},
            productsList:[]};
    }
    componentDidMount() {
        this.fetchData();
    }
    async fetchData() {
        const response = await fetch('/product',{ method: 'GET'});
        const data = await response.json();
        this.setState({ productsList: data});
    }
    
    render() {
        let productCards = this.state.productsList.map( prod => {
            return (
                <Col sm="4">
                    <ProductCards prod = {prod}/>
                </Col>
            )
        })
        return (
            
        <Container fluid>
            <Row>
                {productCards}
            </Row>
        </Container>
        
        )
    }
    
}
//<Product prod = {prod}/>