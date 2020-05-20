import React from 'react';
import { connect } from 'react-redux';
import AuthActions from '../redux/redux-sauce/auth'

export default function requireAuthentication(Component, ws_number) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            // this.checkAuth(this.props.isLoggedIn);
        }

        componentWillReceiveProps(nextProps) {
            // this.props.checkAuth(groups)
        }

        componentDidMount() {
          const token = localStorage.getItem('token');
          if (token) {
            this.props.checkToken(token);
          }
        }

        render() {
          let access = false
          if (this.props.isLoggedIn === true && (this.props.user.workshop_number === ws_number || 
            this.props.user.is_officer)) access = true

          return (
              <div>
                  {access
                      ? <Component {...this.props} />
                      : <div className="container"><h4>403 У вас нету доступа к этой странице</h4></div>
                  }
              </div>
          )
        }
    }

    const mapStateToProps = (state) => ({
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user
    });


    const mapDispatchToProps = dispatch => ({
        // checkAuth: (groups) => dispatch(authActions.checkAuthRequest(groups))
        // auth
        checkToken: (token) => dispatch(AuthActions.checkTokenRequest(token)),
    })

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}

