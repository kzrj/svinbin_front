import React, { Component } from 'react';
import { connect } from 'react-redux';

import LocationsActions from '../../redux/redux-sauce/locations';
import SowsActions from '../../redux/redux-sauce/sows';

class Full extends Component {

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

  render() {
    return (
      <div className="app">
        <h1>Oppa</h1>
        <div id="pageContent">
          {this.props.children}
          <button onClick={this.props.getLocations}>
            Button get locations
          </button>

          <button onClick={this.props.getSows}>
            Button get sows
          </button>
          
          <button onClick={this.showStateConsole}>
            Button show store
          </button>
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
  // checkToken: (token) => {
  // dispatch(AuthActions.checkTokenRequest(token))
  // }
  getLocations: () => dispatch(LocationsActions.getLocationsRequest()),
  getSows: () => dispatch(SowsActions.getSowsRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Full);
