import React, { Component } from 'react';
import { connect } from 'react-redux';

// components


// # actions
import SowsActions from '../../redux/redux-sauce/sows';
import AuthActions from '../../redux/redux-sauce/auth';


class WorkshopThreeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        balanceTab: false,
        returnPigletsTab: false,
        comingSowsTab: true,
        transferTab: false,
        farrowTab: false,
        weaningSowsTab: false,
        recountTab: false,
        weaningPigletsTab: false,
        taggingTab: false,
        cullingTab: false,
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
        <h1>WorkshopThree</h1>
      
        <button onClick={this.showState}>state</button>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.balanceTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('balanceTab')}
          >
            БАЛАНС
          </div>
          <div className={this.state.tabs.returnPigletsTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('returnPigletsTab')}
          >
            Возврат поросята
          </div>
          <div className={this.state.tabs.comingSowsTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('comingSowsTab')}
          >
            Поступление матки
          </div>
          <div className={this.state.tabs.transferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transferTab')}
          >
            Перемещение
          </div>
          <div className={this.state.tabs.farrowTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('farrowTab')}
          >
            ОПОРОС
          </div>
          <div className={this.state.tabs.weaningSowsTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('weaningSowsTab')}
          >
            Пересчет
          </div>
          <div className={this.state.tabs.weaningPigletsTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('weaningPigletsTab')}
          >
            Отъем поросята
          </div>
          <div className={this.state.tabs.taggingTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('taggingTab')}
          >
            Биркование
          </div>
          <div className={this.state.tabs.cullingTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('cullingTab')}
          >
            Выбраковка
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
)(WorkshopThreeContainer);
