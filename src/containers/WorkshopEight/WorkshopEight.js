import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WorkshopRearing from '../Workshop/WorkshopRearing';
import WS8IncomeTab from '../../components/WorkshopEight/WS8IncomeTab'
import WS8ResettelmentTab from '../../components/WorkshopEight/WS8ResettelmentTab'
import WS8TransferTab from '../../components/WorkshopEight/WS8TransferTab'
import WS8InnerTransferTab from '../../components/WorkshopEight/WS8InnerTransferTab'
import WS8CullingTab from '../../components/WorkshopEight/WS8CullingTab'

// actions
import Ws8Actions from '../../redux/redux-sauce/ws8';
import NomadPigletsActions from '../../redux/redux-sauce/nomadPiglets';


class WorkshopEightContainer extends WorkshopRearing {
  render() {
    return (
      <div className="workshop container">
        <h1>WorkshopEight</h1>
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
            Перегон
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
          <WS8IncomeTab 
            query={null}
            getPiglets={this.props.getPiglets}
            piglets={this.props.state.ws8.incomingPigletsList}
            weighingPiglets={this.props.weighingPiglets}
            weighingData={this.props.state.ws8.weighingData}
          />}
        { this.state.tabs.resettlementTab &&
          <WS8ResettelmentTab 
            query={null}
            getPiglets={this.props.getPiglets}
            piglets={this.props.state.ws8.incomingPigletsList}
            getSections={this.props.getSections}
            sections={this.props.state.ws8.sections}
            getLocations={this.props.getIncomeTabLocations}
            locations={this.props.state.ws8.incomeTabLocations}
            setllePiglets={this.props.setllePiglets}
          />}

        { this.state.tabs.innerTransferTab &&
          <WS8InnerTransferTab 
            query={null}
            getSections={this.props.getSections}
            sections={this.props.state.ws8.sections}
            getLocations1={this.props.getInnerTransferTabLocations1}
            getLocations2={this.props.getInnerTransferTabLocations2}
            locations1={this.props.state.ws8.innerTransferLocations1}
            locations2={this.props.state.ws8.innerTransferLocations2}
            movePiglets={this.props.movePiglets}
          />}

        { this.state.tabs.transferTab &&
          <WS8TransferTab 
            query={null}
            getPiglets={this.props.getTransferPiglets}
            piglets={this.props.state.ws8.transferPiglets}
            getSections={this.props.getSections}
            sections={this.props.state.ws8.sections}
            getLocations={this.props.getIncomeTabLocations}
            locations={this.props.state.ws8.incomeTabLocations}
            setllePiglets={this.props.setllePiglets}
            movePiglets={this.props.movePiglets}
          />}

        { this.state.tabs.cullingTab &&
            <WS8CullingTab 
            query={null}
            getSections={this.props.getSections}
            sections={this.props.state.ws8.sections}
            getLocations={this.props.getIncomeTabLocations}
            locations={this.props.state.ws8.incomeTabLocations}
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
  getPiglets: query => dispatch(Ws8Actions.getNomadPigletsRequest(query)),
  getSections: query => dispatch(Ws8Actions.getSectionsRequest(query)),
  getIncomeTabLocations: query => dispatch(Ws8Actions.getIncomeTabLocationsRequest(query)),
  setllePiglets: data => dispatch(Ws8Actions.setllePigletsRequest(data)),
  getTransferPiglets: query => dispatch(Ws8Actions.getTransferPigletsRequest(query)),
  movePiglets: data => dispatch(NomadPigletsActions.moveToPigletsRequest(data)),
  getInnerTransferTabLocations1: query => dispatch(Ws8Actions.getInnerTransferTabLocations1Request(query)),
  getInnerTransferTabLocations2: query => dispatch(Ws8Actions.getInnerTransferTabLocations2Request(query)),
  weighingPiglets: data => dispatch(Ws8Actions.weighingPigletsRequest(data)),
  cullingPiglets: data => dispatch(NomadPigletsActions.cullingPigletsRequest(data)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopEightContainer);
