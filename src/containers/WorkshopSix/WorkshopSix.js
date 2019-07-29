import React, { Component } from 'react';
import { connect } from 'react-redux';

// components

// actions
import SowsActions from '../../redux/redux-sauce/sows';
import AuthActions from '../../redux/redux-sauce/auth';


class WorkshopSixContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        arrivalTab: true,
        transferToSlaughterTab: false,
        transferToSevenFiveTab: false,
        cullingTab: false,
        infoTab: false,
      }
    }
	}

  componentDidMount() {
    // $('body').addClass('loaded');
    // this.props.startup();

    // const token = localStorage.getItem('token');
    // if (token) {
    //   this.props.checkToken(token);
    // }
  }

  setTab = (tab) => {
    let { tabs } = this.state
    Object.keys(tabs).forEach((key) => {
      tabs[key] = false
    })
    this.setState({
      tabs: {
        ...tabs,
        [tab]: true
      }
    })
  }

  render() {
    return (
      <div className="workshop container">
        <h1>WorkshopFive</h1>
        <button onClick={this.showState}>state</button>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.arrivalTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('arrivalTab')}
          >
            Поступление
          </div>
          <div className={this.state.tabs.transferToSlaughterTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transferToSlaughterTab')}
          >
            Перегон в убойный цех
          </div>
          <div className={this.state.tabs.transferToSevenFiveTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transferToSevenFiveTab')}
          >
            Перегон в 7-5
          </div>
          <div className={this.state.tabs.cullingTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('cullingTab')}
          >
            Выбраковка
          </div>
          <div className={this.state.tabs.infoTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('infoTab')}
          >
            Инфо
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

  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  getSow: id => dispatch(SowsActions.getSowRequest(id)),
  // seminationSow: data => dispatch(SowsActions.seminationSowRequest(data)),
  // ultrasoundSow: data => dispatch(SowsActions.ultrasoundSowRequest(data)),
  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopSixContainer);
