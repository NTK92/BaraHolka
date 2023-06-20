import React, { useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {
    Row,
    Col,
    Label
} from 'reactstrap';
import "../HomeView/HomeStyle.css"

export function Product(props) {
    const styles = {
        h2: {
            display: 'inline',
            borderBottom: '3px solid #dee2e6'
        },
        label: {
            marginBottom: '25px'
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

    const {id} = useParams();
    const [prod, setProd] = useState([]);
    const [seller, setSeller] = useState([]);
    const fetchData = async () => {
        const response = await fetch('product/' + id,{ method: 'GET'});
        const data = await response.json();
        setProd(data);
    };
    
    useEffect(() => {
        fetchData().then(async () => {
        const response1 = await fetch('product/userid/'+id,{ method: 'GET'});
        const sellerData = await response1.json();
        setSeller(sellerData);}
        );
    }, []);
    
    
    return (
        <div>
            <Label style={styles.label}>
                <h2 style={styles.h2}> {prod.login}</h2>
            </Label>
            <Row lg={2}>
                <Col sm-auto>
                    <img alt src={prod.picture} height="500px" width="500px"/>
                </Col>
                <Col sm-auto>
                    <Row>
                        <Col sm-auto>
                            <h3>Цена:</h3>
                        </Col>
                        <Col sm-auto>
                            <h3> {prod.price}</h3>
                        </Col>
                    </Row>
                    <ColoredLine color="#dee2e6"/>
                    <h3>Описание:</h3>
                    <h5>{prod.description}</h5>
                    <ColoredLine color="#dee2e6"/>
                    <h3>Продавец:</h3>
                    <h5>{seller.fio}</h5>
                    <ColoredLine color="#dee2e6"/>
                    <h3>Номер для связи:</h3>
                    <h5>{seller.mobile}</h5>
                    <ColoredLine color="#dee2e6"/>
                    <h5>{props.loggedInStatus}</h5>
                    <ColoredLine color="#dee2e6"/>
                    <h5>{props.user}</h5>
                    <ColoredLine color="#dee2e6"/>
                </Col>
            </Row>
        </div>
    );
}
