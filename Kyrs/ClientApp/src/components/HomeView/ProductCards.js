import React,{Component} from "react";
import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";
import {Link } from "react-router-dom";

class ProductCards extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <Card>
                   <CardImg
                            alt="Card image cap"
                            src={this.props.prod.picture}
                            height = "228px"
                            width="100%"
                   />
                        <CardBody>
                            <CardTitle tag="h5">
                                {this.props.prod.name}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {this.props.prod.price}
                            </CardSubtitle>
                            <CardText>
                                {this.props.prod.description}
                            </CardText>
                            <Link to={`product/${this.props.prod.id}`}>
                                <Button className="float-right"  color="secondary">
                                    Купить
                                </Button>
                            </Link>
                        </CardBody>
                    </Card>
            </div>
        )
    }
}
export default ProductCards;