import React from 'react'
import {Button, FormControl, Row, Col, Grid} from 'react-bootstrap/lib'
import axios from 'axios'

import '../css/SearchBar.css'

import Firebase from './database'
import List from './List'

class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      bars: []
    }
  }

  getLocation(e) {
    this.setState({query: e.target.value});
  }

  search() {
    axios.get('http://localhost:4000/search/?location=' + this.state.query)
      .then((res) => {
        // Update the state
        this.setState({
          bars: res.data
        });

        // Save the searched location
        let savedSearch = {
          query: this.state.query,
          time: new Date().getTime()
        }

        if(this.props.userRef) {
          this.props.userRef.child('/saved-search').push(savedSearch)
        }

      })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <Row>
              <Col xs={12} md={8}>
                <FormControl id="search-bar" onChange={this.getLocation.bind(this)}/>
              </Col>
              <Col xs={12} md={4}>
                <Button id="search-btn" bsStyle='primary' onClick={this.search.bind(this)}>Search</Button>
              </Col>
            </Row>
            <List bars={this.state.bars} userRef={this.props.userRef}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default SearchBar;
