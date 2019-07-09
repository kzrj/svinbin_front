import React, { Component } from 'react';
import { connect } from 'react-redux';

import LocationsActions from '../../redux/redux-sauce/locations';
import SowsActions from '../../redux/redux-sauce/sows';

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
  }

  render() {
    return (
      <div className="app">
        <h1>Oppa</h1>
        <div id="pageContent">
          {this.props.children}
          <button onClick={this.getLocations}>
            Button get locations
          </button>

          <button onClick={this.getSows}>
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
  getLocations: query => dispatch(LocationsActions.getLocationsRequest(query)),
  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Full);
