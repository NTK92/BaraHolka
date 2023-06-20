import React, {Component} from 'react';
import { FormGroup, Label, Input, Button, Form
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
        margin: '10px 0px 150px 0px'
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

export class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.userid,
            name: "",
            picture: "",
            description: "",
            price: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async onSubmit() {
        const {name, picture, description, price,userid} = this.state
        const response = await fetch("user/"+userid+"/product", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, picture, description, price, userid})
        });
    }
    render() {
        return(
            <div>
            <h2>Добавить товар</h2>
             <ColoredLine color="#dee2e6"/>
            <Form>
                <div>
                    <FormGroup className="mb-lg-3 me-sm-2 sm-0">
                        <Label className="me-sm-2">
                            Название
                        </Label>
                        <Input
                            name="name"
                            type="text"
                            required
                            value={this.state.name}
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
                            Картинка
                        </Label>
                        <Input
                            name="picture"
                            type="text"
                            required
                            value={this.state.picture}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                </div>
                <div>
                    <FormGroup className="mb-lg-3 me-sm-2 sm-0">
                        <Label
                            className="me-sm-2"
                        >
                            Описание
                        </Label>
                        <Input
                            name="description"
                            type="text"
                            required
                            value={this.state.description}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                </div>
                <div>
                    <FormGroup className="mb-lg-3 me-sm-2 sm-0">
                        <Label
                            className="me-sm-2"
                        >
                            Цена
                        </Label>
                        <Input
                            name="price"
                            type="text"
                            required
                            value={this.state.price}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                </div>

                <Button style={styles.btn}  color="secondary" className="float-right"
                        onClick={this.onSubmit}> Добавить </Button>
            </Form>
            </div>
        )
    }
}