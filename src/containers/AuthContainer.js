import React from 'react';
import { connect } from 'react-redux';
import AuthActions from '../redux/redux-sauce/auth'

export default function requireAuthentication(Component, ws_numbers) {

    class AuthenticatedComponent extends React.Component {
        componentDidMount() {
          const token = localStorage.getItem('token');
          if (token) {
            this.props.checkToken(token);
          }
        //   this.props.router.push(`/login?redirect=${redirect}`);
        }

        render() {
          let { fetching } = this.props.state.auth
          let access = false
        //   if (this.props.isLoggedIn === true && (ws_numbers.includes(this.props.user.workshop_number) || 
        //     this.props.user.is_officer)) access = true
        
          if (this.props.isLoggedIn === true) access = true

          return (
              <div>
                  {fetching 
                    ? <p>Loading</p>
                    : this.props.isLoggedIn
                      ? <Component {...this.props} />
                      : null
                  }
              </div>
          )
        }
    }

    const mapStateToProps = (state) => ({
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        state: state
    });


    const mapDispatchToProps = dispatch => ({
        // checkAuth: (groups) => dispatch(authActions.checkAuthRequest(groups))
        // auth
        checkToken: (token) => dispatch(AuthActions.checkTokenRequest(token)),
    })

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}

