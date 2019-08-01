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

  getLocations = () => {
    this.props.getLocations({by_workshop: 3})
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

  sowFarrow = () => {
    let data = {
      id: '2',
      week: '104',
      alive_quantity: '11',
      dead_quantity: '2',
      mummy_quantity: '3',
    }
    this.props.sowFarrow(data)
  }

  getNomadPiglets = () => {
    let query = {

    }
    this.props.getNomadPiglets(query)
  }

  weighingPiglets = () => {
    let data = {
      id: 1,
      total_weight: 720,
      place: '3/4'
    }
    this.props.weighingPiglets(data)
  }
  
  cullingPiglets = () => {
    let data = {
      id: 1,
      culling_type: 'padej',
      reason: 'test reason'
    }
    this.props.cullingPiglets(data)
  }

  cullingGiltPiglets = () => {
    let data = {
      id: 1,
      culling_type: 'padej',
      reason: 'test reason'
    }
    this.props.cullingPiglets(data)
  }

  moveGroupFromCellToCell = () => {
    let data = {
      id: 1,
      from_location: 3,
      to_location: 41,
      quantity: 5,
      gilt_quantity: 0
    }
    this.props.moveGroupFromCellToCell(data)
  }

  moveToPiglets = () => {
    let data = {
      id: 1,
      to_location: 41,
      quantity: 5,
      gilt_quantity: 0
    }
    this.props.moveToPiglets(data)
  }

  login = () => {
    this.props.login({username: 'test_seminator', password: 'qwerty123'})
    
  }

  getSeminationSows = () => {
    this.props.getSeminationSows()
    const token = localStorage.getItem('token');
    console.log('get semination sows')
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

  getLocations: query => dispatch(LocationsActions.getLocationsRequest(query)),

  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  seminationSow: data => dispatch(SowsActions.seminationSowRequest(data)),
  ultrasoundSow: data => dispatch(SowsActions.ultrasoundSowRequest(data)),
  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowFarrow: data => dispatch(SowsActions.sowFarrowRequest(data)),

  getNomadPiglets: query => dispatch(NomadPigletsActions.getNomadPigletsRequest(query)),
  weighingPiglets: data => dispatch(NomadPigletsActions.weighingPigletsRequest(data)),
  cullingPiglets: data => dispatch(NomadPigletsActions.cullingPigletsRequest(data)),
  cullingGiltPiglets: data => dispatch(NomadPigletsActions.cullingGiltPigletsRequest(data)),
  moveGroupFromCellToCell: data => dispatch(NomadPigletsActions.moveGroupFromCellToCellRequest(data)),
  moveToPiglets: data => dispatch(NomadPigletsActions.moveToPiglets(data)),

  getSeminationSows: query => dispatch(Ws1Actions.getSeminationSowsRequest(query)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Full);
