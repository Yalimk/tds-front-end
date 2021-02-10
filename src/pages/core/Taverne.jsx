/* eslint-disable no-lone-blocks */
// Native modules import
import React, { Component } from "react";

// Personal modules import
import ChatMessage from "../../components/chat/ChatMessage";
import ChatForm from "../../components/chat/ChatForm";
import { isLoggedIn } from "../../logic/auth/index";

// Constants definition
const URL = `ws://localhost:9092`;

// eslint-disable-next-line no-empty-pattern
class Taverne extends Component {
  state = {
    pseudo: "",
    messages: [],
  };

  socket = new WebSocket(URL);

  addMessage = (message) =>
    this.setState((state) => ({
      messages: [message, ...state.messages],
    }));

  submitMessage = (messageString) => {
    const messageData = { pseudo: this.state.pseudo, message: messageString };
    this.socket.send(JSON.stringify(messageData));
    this.addMessage(messageData);
  };

  componentDidMount() {
    this.socket.onopen = (data) => {
      if (isLoggedIn()) {
        const pirateName = isLoggedIn().user.pseudo;
        // console.log('data', data);
        this.setState({
          pseudo: pirateName,
        });
        // console.log(`${pirateName} s'est connecté au tchat.`);
      } else {
        this.setState({
          pseudo: "Pirate inconnu",
        });
        // console.log(`Un pirate inconnu s'est connecté au tchat.`);
      }
    };

    this.socket.onmessage = (message) => {
      const messageData = JSON.parse(message.data);
      this.addMessage(messageData);
    };

    this.socket.onclose = () => {
      this.setState({
        socket: new WebSocket(URL),
      });
    };
  };

  render() {
    const { messages } = this.state;
    return (
      <div className="container jumbotron">
        <ChatForm
          socket={this.socket}
          onSubmitMessage={(messageString) => this.submitMessage(messageString)}
        />
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            pseudo={message.pseudo}
          />
        ))}
      </div>
    );
  };
};

export default Taverne;
