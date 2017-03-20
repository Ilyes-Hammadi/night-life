import React from 'react'
import {ListGroup, Col, Row} from 'react-bootstrap'

import ListItem from './ListItem'

class List extends React.Component {

  render() {
    let items = this.props.bars.map((bar) => {
      return <ListItem key={bar.id} bar={bar} userRef={this.props.userRef}/>
    });
    return (
      <Row>
        <Col xs={12} md={12}>
          <ListGroup>
            {items}
          </ListGroup>
        </Col>
      </Row>
    )
  }
}

export default List;
