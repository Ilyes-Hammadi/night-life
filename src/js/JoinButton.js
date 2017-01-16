import React from 'react'
import {Button} from 'react-bootstrap/lib'

class JoinButton extends React.Component {
  constructor() {
    super()
    this.state = {
      added: false
    }
  }
  componentWillMount() {
    if (this.props.isGoing) {
      this.setState({added: true, isLoggedIn: this.props.isLoggedIn});
    }
  }

  addBar() {
    this.props.barRef.set('Going')
    this.setState({added: true});
  }

  removeBar() {
    this.props.barRef.remove()
    this.setState({added: false});
  }

  render() {
    let button;
    // If not added
    if (!this.state.added) {
      button = <Button onClick={this.addBar.bind(this)}>Join</Button>
    } else {
      button = <Button onClick={this.removeBar.bind(this)} bsStyle="warning">Dont Go</Button>
    }
    return (
      <span>
        {button}
      </span>
    )
  }
}

export default JoinButton;
