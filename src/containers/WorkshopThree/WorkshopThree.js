import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS3SowIncomeTab from '../../components/WorkshopThree/WS3SowIncomeTab'
import WS3SowInnerTransferTab from '../../components/WorkshopThree/WS3SowInnerTransferTab'
import WS3SowFarrowTab from '../../components/WorkshopThree/WS3SowFarrowTab'

// # actions
import SowsActions from '../../redux/redux-sauce/sows';
import AuthActions from '../../redux/redux-sauce/auth';
import Ws3Actions from '../../redux/redux-sauce/ws3';


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
  showStateConsole = () => {
    const { state } = this.props
    console.log('Hi')
    console.log(state)
  }

  render() {
    return (
      <div className="workshop container">
        <h1>WorkshopThree</h1>
      
        <button onClick={this.showStateConsole}>state</button>
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
          <div className={this.state.tabs.weaningSowTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('weaningSowTab')}
          >
            Отъем свиноматки
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
        { this.state.tabs.comingSowsTab && 
          <WS3SowIncomeTab 
            sow={this.props.state.ws3.incomeSow}
            sows={this.props.state.ws3.incomeSows}
            getSows={this.props.getIncomeSows}
            getSow={this.props.getIncomeSow}
            getSections={this.props.getSections}
            sections={this.props.state.ws3.sections}
            getLocations={this.props.getSowIncomeTabLocations}
            locations={this.props.state.ws3.incomeTabLocations}
            sowMoveTo={this.props.sowMoveTo}
          />}
        { this.state.tabs.transferTab && 
          <WS3SowInnerTransferTab 
            getSections={this.props.getSections}
            sections={this.props.state.ws3.sections}
            getLocations1={this.props.getSowInnerTransferTabLocations1}
            getLocations2={this.props.getSowInnerTransferTabLocations2}
            locations1={this.props.state.ws3.sowInnerTransferLocations1}
            locations2={this.props.state.ws3.sowInnerTransferLocations2}
            sowMoveTo={this.props.sowMoveTo}
          />}

        { this.state.tabs.farrowTab && 
          <WS3SowFarrowTab 
            getSections={this.props.getSections}
            sections={this.props.state.ws3.sections}
            getLocations={this.props.getSowFarrowTabLocations}
            locations={this.props.state.ws3.sowFarrowLocations}
            sowFarrow={this.props.sowFarrow}
          />}
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
  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  // sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),

  getIncomeSows: query => dispatch(Ws3Actions.getIncomeSowsWs3Request(query)),
  getIncomeSow: id => dispatch(Ws3Actions.getIncomeSowWs3Request(id)),
  getSections: query => dispatch(Ws3Actions.getSectionsWs3Request(query)),
  getSowIncomeTabLocations: query => dispatch(Ws3Actions.getSowIncomeTabLocationsWs3Request(query)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  getSowInnerTransferTabLocations1: query => dispatch(Ws3Actions.getSowInnerTransferTabLocations1Ws3Request(query)),
  getSowInnerTransferTabLocations2: query => dispatch(Ws3Actions.getSowInnerTransferTabLocations2Ws3Request(query)),
  getSowFarrowTabLocations: query => dispatch(Ws3Actions.getSowFarrowTabLocationsWs3Request(query)),
  sowFarrow: data => dispatch(SowsActions.sowFarrowRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopThreeContainer);
