import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WorkshopFattening from '../Workshop/WorkshopFattening';
import WS7IncomeTab from '../../components/WorkshopSeven/WS7IncomeTab'
import WS7ResettelmentTab from '../../components/WorkshopSeven/WS7ResettelmentTab'
import WS7TransferTab from '../../components/WorkshopSeven/WS7TransferTab'
import WS7Transfer75Tab from '../../components/WorkshopSeven/WS7Transfer75Tab'
import WS7InnerTransferTab from '../../components/WorkshopSeven/WS7InnerTransferTab'
import WS7CullingTab from '../../components/WorkshopSeven/WS7CullingTab'

// actions
import Ws7Actions from '../../redux/redux-sauce/ws7';
import NomadPigletsActions from '../../redux/redux-sauce/nomadPiglets';


class WorkshopSevenContainer extends WorkshopFattening {
  render() {
    return (
      <div className="workshop container">
        <h1>WorkshopSeven</h1>
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
          <WS7IncomeTab 
            query={null}
            getPiglets={this.props.getPiglets}
            piglets={this.props.state.ws5.incomingPigletsList}
            weighingPiglets={this.props.weighingPiglets}
            weighingData={this.props.state.ws5.weighingData}
          />}
        { this.state.tabs.resettlementTab &&
          <WS7ResettelmentTab 
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
          <WS7InnerTransferTab 
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
          <WS7TransferTab 
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
          <WS7Transfer75Tab 
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
          <WS7CullingTab 
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
  getPiglets: query => dispatch(Ws7Actions.getNomadPigletsRequest(query)),
  getSections: query => dispatch(Ws7Actions.getSectionsRequest(query)),
  getIncomeTabLocations: query => dispatch(Ws7Actions.getIncomeTabLocationsRequest(query)),
  setllePiglets: data => dispatch(Ws7Actions.setllePigletsRequest(data)),
  getTransferPiglets: query => dispatch(Ws7Actions.getTransferPigletsRequest(query)),
  movePiglets: data => dispatch(NomadPigletsActions.moveToPigletsRequest(data)),
  getInnerTransferTabLocations1: query => dispatch(Ws7Actions.getInnerTransferTabLocations1Request(query)),
  getInnerTransferTabLocations2: query => dispatch(Ws7Actions.getInnerTransferTabLocations2Request(query)),
  weighingPiglets: data => dispatch(Ws7Actions.weighingPigletsRequest(data)),
  cullingPiglets: data => dispatch(NomadPigletsActions.cullingPigletsRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopSevenContainer);
