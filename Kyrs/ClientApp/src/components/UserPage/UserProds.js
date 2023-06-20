import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle, CardText, Button
} from 'reactstrap';
import "../HomeView/HomeStyle.css"

const styles = {
    h2: {
        display: 'inline',
        borderBottom: '3px solid #dee2e6',

    },
    label: {
        marginBottom: '25px'
    },
    btn: {
        margin: '10px 5px 0 5px'
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
export class UserProds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.userid,
            productsList : []
        };
        this.onDelete = this.onDelete.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    async fetchData() {
        const response = await fetch('user/'+this.state.id+"/products",{ method: 'GET'});
        const data = await response.json();
        this.setState({ productsList: data});
    }
    async onDelete(event,prodid){
        await fetch('user/'+this.state.id+"/product/"+prodid,{ method: 'DELETE'});
        //window.location.reload();
    }
    render() {
        let productCards = this.state.productsList.map( prod => {
        return (
            <Col lg={4}>
                <div>
                    <Card>
                        <CardImg
                            alt="Card image cap"
                            src={prod.picture}
                            height="100px"
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5">
                                {prod.name}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {prod.price}
                            </CardSubtitle>
                            <CardText>
                                {prod.description}
                            </CardText>
                            <Button onClick={(e) => {
                                this.onDelete(e, prod.id)
                            }} className="float-right"  color="secondary">
                                Удалить
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        )
    })
        return (
            <div>
                <h2>Мои товары</h2>
                <ColoredLine color="#dee2e6"/>
                <Row>
                    {productCards}
                </Row>
            </div>
        )
    }
}