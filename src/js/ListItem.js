import React from 'react'
import {ListGroupItem, Image, Row, Col} from 'react-bootstrap/lib'

import '../css/ListItem.css'

import JoinButton from './JoinButton'

class ListItem extends React.Component {
  constructor() {
    super()
    this.state = {
      isGoing: false,
      isLoggedIn: false
    }
  }
  componentWillMount() {
    // Check if the bar is not saved for the current user
    if (this.props.userRef) {
      this.setState({
        isLoggedIn: true
      });

      const barRef = this.props.userRef.child('saved-bars/' + this.props.bar.id)

      barRef.on('value', (snap) => {
        this.setState({
          isGoing: snap.exists()
        });
      });

      this.setState({
        barRef: barRef
      });
    }
  }

  render () {

    let img
    if(this.props.bar.image_url) {
      img = this.props.bar.image_url
    } else {
      img = 'http://placehold.it/100x100'
    }

    // Show join button if user is logged in
    let button = null
    if(this.state.isLoggedIn) {
      button = <JoinButton barRef={this.state.barRef} isGoing={this.state.isGoing} isLoggedIn={this.state.isLoggedIn}/>
    }

    return (
      <ListGroupItem>
        <Row>

          <Col xs={3} md={4}>
            <Image src={img} thumbnail />
          </Col>

          <Col xs={9} md={8}>

            <Row>
              <Col xs={12} sm={9}><h3 className="bar-name"><a href={this.props.bar.url}>{this.props.bar.name}</a></h3></Col>
              <Col xs={12} sm={3}>{button}</Col>
            </Row>

            <p className="bar-description">{this.props.bar.snippet_text}</p>
          </Col>
        </Row>
      </ListGroupItem>
    )
  }
}

export default ListItem;
