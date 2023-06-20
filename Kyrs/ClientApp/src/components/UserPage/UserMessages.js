import React, {Component} from "react";
import {Message} from "./Message";

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

export class UserMessages extends Component {
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
            const response = await fetch('message/' + this.state.id + "/receivedmessages", {method: 'GET'});
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
                <h2>Полученные сообщения</h2>
                <ColoredLine color="#dee2e6"/>
                {messagesItem}
            </div>
        )
    }
}