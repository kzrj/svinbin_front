import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS3SowIncomeTab from '../../components/WorkshopThree/WS3SowIncomeTab'
import WS3SowInnerTransferTab from '../../components/WorkshopThree/WS3SowInnerTransferTab'
import WS3SowFarrowTab from '../../components/WorkshopThree/WS3SowFarrowTab'
import WS3SowWeaningTab from '../../components/WorkshopThree/WS3SowWeaningTab'
import WS3SowCullingTab from '../../components/WorkshopThree/WS3SowCullingTab'

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
        sowCullingTab: false,
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
        <div className='workshop-header'>
          Цех №3
        </div>      
        <div className='row workshop-menu'>
          <div className={this.state.tabs.balanceTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('balanceTab')}
          >
            БАЛАНС
          </div>
          <div className={this.state.tabs.returnPigletsTab ? 'workshop-tab tab-active col-sm' :
           'workshop-tab col-sm'}
            onClick={() => this.setTab('returnPigletsTab')}
          >
            Возврат поросята
          </div>
          <div className={this.state.tabs.comingSowsTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('comingSowsTab')}
          >
            Поступление матки
          </div>
          <div className={this.state.tabs.transferTab ? 'workshop-tab tab-active col-sm' :
           'workshop-tab col-sm'}
            onClick={() => this.setTab('transferTab')}
          >
            Внутреннее перемещение
          </div>
          <div className={this.state.tabs.farrowTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('farrowTab')}
          >
            ОПОРОС
          </div>
          <div className={this.state.tabs.recountTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('recountTab')}
          >
            Пересчет
          </div>
          <div className={this.state.tabs.weaningSowsTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('weaningSowsTab')}
          >
            Отъем свиноматки
          </div>
          <div className={this.state.tabs.weaningPigletsTab ? 'workshop-tab tab-active col-sm' :
           'workshop-tab col-sm'}
            onClick={() => this.setTab('weaningPigletsTab')}
          >
            Отъем поросята
          </div>
          <div className={this.state.tabs.taggingTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('taggingTab')}
          >
            Биркование
          </div>
          <div className={this.state.tabs.sowCullingTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('sowCullingTab')}
          >
            Выбраковка/Аборт
          </div>
        </div>
        <div className='workshop-header-3'>
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
            eventFetching={this.props.state.sows.fetching}
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

        { this.state.tabs.weaningSowsTab && 
          <WS3SowWeaningTab 
            getSections={this.props.getSections}
            sections={this.props.state.ws3.sections}
            getLocations={this.props.getSowWeaningTabLocations}
            locations={this.props.state.ws3.sowWeaningLocations}
            massMove={this.props.sowsMoveMany}
          />}

        { this.state.tabs.sowCullingTab && 
          <WS3SowCullingTab 
            getSows={this.props.getSows}
            getSow={this.props.getSow}
            sows={this.props.state.sows.list}
            sow={this.props.state.sows.sow}
            cullingSow={this.props.cullingSow}
            abortionSow={this.props.abortionSow}
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
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowFarrow: data => dispatch(SowsActions.sowFarrowRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowRequest(id)),

  getIncomeSows: query => dispatch(Ws3Actions.getIncomeSowsWs3Request(query)),
  getIncomeSow: id => dispatch(Ws3Actions.getIncomeSowWs3Request(id)),
  getSections: query => dispatch(Ws3Actions.getSectionsWs3Request(query)),
  getSowIncomeTabLocations: query => dispatch(Ws3Actions.getSowIncomeTabLocationsWs3Request(query)),
  getSowInnerTransferTabLocations1: query => dispatch(Ws3Actions.getSowInnerTransferTabLocations1Ws3Request(query)),
  getSowInnerTransferTabLocations2: query => dispatch(Ws3Actions.getSowInnerTransferTabLocations2Ws3Request(query)),
  getSowFarrowTabLocations: query => dispatch(Ws3Actions.getSowFarrowTabLocationsWs3Request(query)),
  getSowWeaningTabLocations: query => dispatch(Ws3Actions.getSowWeaningTabLocationsWs3Request(query)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopThreeContainer);
