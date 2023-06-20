import React, {Component} from "react";
import {
    Container,
} from "reactstrap";
import {Message} from "./Message";
import "./UserStyle.css"

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

const styles = {
    cntnr: {
        padding: '0px 0px 0px 0px'
    }
}

export class SendedMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.userid,
            isSendedMessages: this.props.isSendedMessages,
            messagesList: [],
            productid: 0,
            userid: 0,

        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        
            const response = await fetch('message/' + this.state.id + "/sendedmessages", {method: 'GET'});
            const data = await response.json();
            this.setState({messagesList: data});
    }

    render() {
        let messagesItem = this.state.messagesList.map( msg => {
            return (
                <Message msg = {msg}  isSendedMessages={this.props.isSendedMessages}/>
            )
        })
        return (
            <div>
                <h2>Отправленные сообщения</h2>
                <ColoredLine color="#dee2e6"/>
            <Container style={styles.cntnr} 
                   fluid="xl">
                
                {messagesItem}
            </Container>
            </div>
        )
    }
}