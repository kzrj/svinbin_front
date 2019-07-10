import React, { Component } from 'react';
import { connect } from 'react-redux';

import LocationsActions from '../../redux/redux-sauce/locations';
import SowsActions from '../../redux/redux-sauce/sows';
import AuthActions from '../../redux/redux-sauce/auth';


class Full extends Component {
  // constructor(props) {
	// 	super(props);  
	// }

  // componentDidMount() {
  //   $('body').addClass('loaded');
  //   this.props.startup();

  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     this.props.checkToken(token);
  //   }
  // }

  showStateConsole = () => {
    const { state } = this.props
    console.log('Hi')
    console.log(state)
  }

  getLocations = () => {
    this.props.getLocations({by_workshop: 1})
  }

  getSows = () => {
    // this.props.getSows({by_workshop_number: 3})
    this.props.getSows()
    const token = localStorage.getItem('token');
    console.log(token)
  }

  seminationSow = () => {
    let data = {
      id: '1',
      week: '104',
      seminationEmployeeId: '5'
    }
    this.props.seminationSow(data)
  }

  ultrasoundSow = () => {
    let data = {
      id: '1',
      week: '104',
      result: true
    }
    this.props.ultrasoundSow(data)
  }

  cullingSow = () => {
    let data = {
      id: '1',
      culling_type: 'padej',
      reason: 'test reason'
    }
    this.props.cullingSow(data)
  }

  sowMoveTo = () => {
    let data = {
      id: '1',
      location: '1',
    }
    this.props.sowMoveTo(data)
  }

  login = () => {
    this.props.login({username: 'test_seminator', password: 'qwerty123'})
    
  }

  render() {
    return (
      <div className="app">
        <h1>Oppa</h1>
        <div id="pageContent">
          {this.props.children}
          <div>
            <button onClick={this.login}>
              Button login
            </button>
          </div>
          <br/>
          <div>
            <button onClick={this.showStateConsole}>
              Button show store
            </button>
          </div>
          <br/>
          <div>
            <label>Locations</label>
            <br/>
            <button onClick={this.getLocations}>
              Button get locations
            </button>
          </div>
          <br/>
          <div>
            <label>Sows</label>
            <br/>
            <button onClick={this.getSows}>
              Button get sows
            </button>

            <button onClick={this.seminationSow}>
              Button semination sow 1
            </button>

            <button onClick={this.ultrasoundSow}>
              Button ultrasound sow 1
            </button>

            <button onClick={this.cullingSow}>
              Button culling sow 1
            </button>

            <button onClick={this.sowMoveTo}>
              Button sow 1 move to 1
            </button>
          </div>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notifications,
  state: state
})

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(AuthActions.loginRequest(payload)),

  getLocations: query => dispatch(LocationsActions.getLocationsRequest(query)),

  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  seminationSow: data => dispatch(SowsActions.seminationSowRequest(data)),
  ultrasoundSow: data => dispatch(SowsActions.ultrasoundSowRequest(data)),
  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Full);
