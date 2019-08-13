import React, { Component } from 'react';
import { connect } from 'react-redux';

import LocationsActions from '../../redux/redux-sauce/locations';
import SowsActions from '../../redux/redux-sauce/sows';
import NomadPigletsActions from '../../redux/redux-sauce/nomadPiglets';
import AuthActions from '../../redux/redux-sauce/auth';

import Ws1Actions from '../../redux/redux-sauce/ws1';


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
    console.log(this.props.state.sowsByTours)
    console.log('JHIU')
  }


  login = () => {
    this.props.login({username: 'test_seminator', password: 'qwerty123'})
    
  }

  render() {
    return (
      <div className="app container">
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Full);
