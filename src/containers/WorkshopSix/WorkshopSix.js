import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WorkshopFattening from '../Workshop/WorkshopFattening';
import WS5IncomeTab from '../../components/WorkshopFive/WS5IncomeTab'
import WS5ResettelmentTab from '../../components/WorkshopFive/WS5ResettelmentTab'
import WS5TransferTab from '../../components/WorkshopFive/WS5TransferTab'
import WS5Transfer75Tab from '../../components/WorkshopFive/WS5Transfer75Tab'
import WS5InnerTransferTab from '../../components/WorkshopFive/WS5InnerTransferTab'
import WS5CullingTab from '../../components/WorkshopFive/WS5CullingTab'

// actions
import Ws6Actions from '../../redux/redux-sauce/ws6';
import NomadPigletsActions from '../../redux/redux-sauce/nomadPiglets';


class WorkshopSixContainer extends WorkshopFattening {
  render() {
    return (
      <div className="workshop container">
        <h1>WorkshopSix</h1>
        <button onClick={this.showState}>state</button>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.incomeTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('incomeTab')}>
            Поступление и взвешивание
          </div>
          <div className={this.state.tabs.resettlementTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('resettlementTab')}>
            Расселение поступивших
          </div>
          <div className={this.state.tabs.innerTransferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('innerTransferTab')}>
            Перемещение
          </div>
          <div className={this.state.tabs.transferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transferTab')}>
            Перегон в убойный цех
          </div>
          <div className={this.state.tabs.transfer75Tab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transfer75Tab')}>
            Перегон в 7-5
          </div>
          <div className={this.state.tabs.cullingTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('cullingTab')}>
            Выбраковка
          </div>
          <div className={this.state.tabs.infoTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('infoTab')}>
            Инфо
          </div>
        </div>
        { this.state.tabs.incomeTab &&
          <WS5IncomeTab 
            query={null}
            getPiglets={this.props.getPiglets}
            piglets={this.props.state.ws5.incomingPigletsList}
            weighingPiglets={this.props.weighingPiglets}
            weighingData={this.props.state.ws5.weighingData}
          />}
        { this.state.tabs.resettlementTab &&
          <WS5ResettelmentTab 
            query={null}
            getPiglets={this.props.getPiglets}
            piglets={this.props.state.ws5.incomingPigletsList}
            getSections={this.props.getSections}
            sections={this.props.state.ws5.sections}
            getLocations={this.props.getIncomeTabLocations}
            locations={this.props.state.ws5.incomeTabLocations}
            setllePiglets={this.props.setllePiglets}
          />}

        { this.state.tabs.innerTransferTab &&
          <WS5InnerTransferTab 
            query={null}
            getSections={this.props.getSections}
            sections={this.props.state.ws5.sections}
            getLocations1={this.props.getInnerTransferTabLocations1}
            getLocations2={this.props.getInnerTransferTabLocations2}
            locations1={this.props.state.ws5.innerTransferLocations1}
            locations2={this.props.state.ws5.innerTransferLocations2}
            movePiglets={this.props.movePiglets}
          />}

        { this.state.tabs.transferTab &&
          <WS5TransferTab 
            query={null}
            getPiglets={this.props.getTransferPiglets}
            piglets={this.props.state.ws5.transferPiglets}
            getSections={this.props.getSections}
            sections={this.props.state.ws5.sections}
            getLocations={this.props.getIncomeTabLocations}
            locations={this.props.state.ws5.incomeTabLocations}
            setllePiglets={this.props.setllePiglets}
            movePiglets={this.props.movePiglets}
          />}

        { this.state.tabs.transfer75Tab &&
          <WS5Transfer75Tab 
            query={null}
            getPiglets={this.props.getTransferPiglets}
            piglets={this.props.state.ws5.transferPiglets}
            getSections={this.props.getSections}
            sections={this.props.state.ws5.sections}
            getLocations={this.props.getIncomeTabLocations}
            locations={this.props.state.ws5.incomeTabLocations}
            setllePiglets={this.props.setllePiglets}
            movePiglets={this.props.movePiglets}
          />}

        { this.state.tabs.cullingTab &&
          <WS5CullingTab 
            query={null}
            getSections={this.props.getSections}
            sections={this.props.state.ws5.sections}
            getLocations={this.props.getIncomeTabLocations}
            locations={this.props.state.ws5.incomeTabLocations}
            cullingPiglets={this.props.cullingPiglets}
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
  getPiglets: query => dispatch(Ws6Actions.getNomadPigletsRequest(query)),
  getSections: query => dispatch(Ws6Actions.getSectionsRequest(query)),
  getIncomeTabLocations: query => dispatch(Ws6Actions.getIncomeTabLocationsRequest(query)),
  setllePiglets: data => dispatch(Ws6Actions.setllePigletsRequest(data)),
  getTransferPiglets: query => dispatch(Ws6Actions.getTransferPigletsRequest(query)),
  movePiglets: data => dispatch(NomadPigletsActions.moveToPigletsRequest(data)),
  getInnerTransferTabLocations1: query => dispatch(Ws6Actions.getInnerTransferTabLocations1Request(query)),
  getInnerTransferTabLocations2: query => dispatch(Ws6Actions.getInnerTransferTabLocations2Request(query)),
  weighingPiglets: data => dispatch(Ws6Actions.weighingPigletsRequest(data)),
  cullingPiglets: data => dispatch(NomadPigletsActions.cullingPigletsRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopSixContainer);
