import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WorkshopRearing from '../Workshop/WorkshopRearing';
import WS4IncomeTab from '../../components/WorkshopFour/WS4IncomeTab'
import WS4ResettelmentTab from '../../components/WorkshopFour/WS4ResettelmentTab'
import WS4TransferTab from '../../components/WorkshopFour/WS4TransferTab'
import WS4InnerTransferTab from '../../components/WorkshopFour/WS4InnerTransferTab'

// actions
import Ws4Actions from '../../redux/redux-sauce/ws4';
import NomadPigletsActions from '../../redux/redux-sauce/nomadPiglets';


class WorkshopFourContainer extends WorkshopRearing {
  render() {
    return (
      <div className="workshop container">
        <h1>WorkshopFour</h1>
        <button onClick={this.showStateConsole}>store</button>
        <button onClick={this.showProps}>props</button>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.incomeTab ? 'tab-active col-sm' : 'col-sm'}
              onClick={() => this.setTab('incomeTab')}
            >
              Поступление и взвешивание
            </div>
          <div className={this.state.tabs.resettlementTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('resettlementTab')}
          >
            Расселение поступивших
          </div>
          <div className={this.state.tabs.innerTransferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('innerTransferTab')}
          >
            Перемещение
          </div>
          <div className={this.state.tabs.transferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transferTab')}
          >
            Перегон
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
        { this.state.tabs.incomeTab &&
          <WS4IncomeTab 
            query={null}
            getPiglets={this.props.getPiglets}
            piglets={this.props.state.ws4.incomingPigletsList}
          />}
        { this.state.tabs.resettlementTab &&
          <WS4ResettelmentTab 
          query={null}
          getPiglets={this.props.getPiglets}
          piglets={this.props.state.ws4.incomingPigletsList}
          getSections={this.props.getSections}
          sections={this.props.state.ws4.sections}
          getLocations={this.props.getIncomeTabLocations}
          locations={this.props.state.ws4.incomeTabLocations}
          setllePiglets={this.props.setllePiglets}
        />}

      { this.state.tabs.innerTransferTab &&
          <WS4InnerTransferTab 
          query={null}
          getPiglets={this.props.getTransferPiglets}
          piglets={this.props.state.ws4.transferPiglets}
          getSections={this.props.getSections}
          sections={this.props.state.ws4.sections}
          getLocations1={this.props.getInnerTransferTabLocations1}
          getLocations2={this.props.getInnerTransferTabLocations2}
          locations1={this.props.state.ws4.innerTransferLocations1}
          locations2={this.props.state.ws4.innerTransferLocations2}
          setllePiglets={this.props.setllePiglets}
          movePiglets={this.props.movePiglets}
        />}

        { this.state.tabs.transferTab &&
          <WS4TransferTab 
          query={null}
          getPiglets={this.props.getTransferPiglets}
          piglets={this.props.state.ws4.transferPiglets}
          getSections={this.props.getSections}
          sections={this.props.state.ws4.sections}
          getLocations={this.props.getIncomeTabLocations}
          locations={this.props.state.ws4.incomeTabLocations}
          setllePiglets={this.props.setllePiglets}
          movePiglets={this.props.movePiglets}
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
  getPiglets: query => dispatch(Ws4Actions.getNomadPigletsRequest(query)),
  getSections: query => dispatch(Ws4Actions.getSectionsRequest(query)),
  getIncomeTabLocations: query => dispatch(Ws4Actions.getIncomeTabLocationsRequest(query)),
  setllePiglets: data => dispatch(Ws4Actions.setllePigletsRequest(data)),
  getTransferPiglets: query => dispatch(Ws4Actions.getTransferPigletsRequest(query)),
  movePiglets: data => dispatch(NomadPigletsActions.moveToPigletsRequest(data)),
  getInnerTransferTabLocations1: query => dispatch(Ws4Actions.getInnerTransferTabLocations1Request(query)),
  getInnerTransferTabLocations2: query => dispatch(Ws4Actions.getInnerTransferTabLocations2Request(query)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopFourContainer);
