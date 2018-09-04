import axios from 'axios';
import React from 'react';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core/';

//sort messages by user, display latest one, create new component to render user chat, be able to reply
export default class MyMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    this.props.updateAppBarStyle({height: 60, background: "#009090"});
    axios.get('/api/messages')
    .then(res => {
      if(res.data.success) {
        this.setState({messages: res.data.messages}, () => {
          console.log(this.state.messages)

        });
        //sort messages by user
      }
    });
  }

  render() {
    return (
      <div style={{height: "100%", fontSize: 14, backgroundColor: 'rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', border: "solid 1px #eee", backgroundColor: 'white', padding: 20}}>
          {this.state.messages.map(message => <span style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Avatar src={message.from.imgUrl} />
            <span style={{marginLeft: 20}}>{message.from.name.fname}  {new Date(message.timestamp).getHours()}:{new Date(message.timestamp).getMinutes()}: {message.content}</span></span>)}
        </div>
      </div>
    )
  }
}
