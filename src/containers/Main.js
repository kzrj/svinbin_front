import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthActions from '../redux/redux-sauce/auth';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.setData = this.setData.bind(this);
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <h4>Войдите</h4>
        <div className="input-group">
          <input type='text' value={this.state.username} onChange={this.setData} 
            name='username' className="form-control search-input"
            placeholder="username" />
          <input type='password' value={this.state.password} onChange={this.setData} 
            name='password' className="form-control search-input"
            placeholder="password" />
          <button className="btn btn-outline-secondary" type="button" 
            onClick={() =>
              this.props.login({username: this.state.username, password: this.state.password})}>
            Войти
          </button>
        </div>
      </div>
    );
  }
}

class Main extends Component {
  constructor(props) {
		super(props);  
	}

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.checkToken(token);
    }
  }

  render() {
    const { isLoggedIn, user, error } = this.props.state.auth
    const locationsFetching = this.props.state.locations.fetching
    const sectionsFetching = this.props.state.sections.fetching

    const pigletsListFetching = this.props.state.piglets.listFetching
    const pigletsEventFetching = this.props.state.piglets.eventFetching

    const sowsListFetching = this.props.state.sows.fetching
    const sowsEventFetching = this.props.state.sows.eventFetching

    return (
      <div className="app container-fluid">
        <div id="pageContent">
          {!isLoggedIn && 
            <div>
              {/* <button onClick={this.login}>
                Button login
              </button> */}
              <h1>Свинокомплекс Николаевский</h1>
              <LoginForm login={this.props.login}/>
              {error && 
                <p className='error'>{error}</p>
              }
            </div>
          }
          { isLoggedIn &&
            <div>
              {this.props.children}
              <div>
                <button onClick={this.props.logout}>
                  Выйти
                </button>
              </div>
            </div>
          }
          
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
  logout: (payload) => dispatch(AuthActions.logoutRequest(payload)),
  checkToken: (token) => dispatch(AuthActions.checkTokenRequest(token))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
