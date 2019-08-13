import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WorkshopFattening from '../Workshop/WorkshopFattening';
import WS75IncomeTab from '../../components/WorkshopSevenFive/WS75IncomeTab'
import WS75TransferTab from '../../components/WorkshopSevenFive/WS75TransferTab'
import WS75CullingTab from '../../components/WorkshopSevenFive/WS75CullingTab'

// actions
import Ws75Actions from '../../redux/redux-sauce/ws75';
import NomadPigletsActions from '../../redux/redux-sauce/nomadPiglets';


class WorkshopSevenFiveContainer extends WorkshopFattening {
  render() {
    return (
      <div className="workshop container">
        <h1>WorkshopSevenFive</h1>
        <button onClick={this.showState}>state</button>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.incomeTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('incomeTab')}>
            Поступление
          </div>
          <div className={this.state.tabs.transferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transferTab')}>
            Перегон в убойный цех
          </div>
          <div className={this.state.tabs.cullingTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('cullingTab')}>
            Выбраковка
          </div>
        </div>
        { this.state.tabs.incomeTab &&
          <WS75IncomeTab 
            query={null}
            getPiglets={this.props.getPiglets}
            setllePiglets={this.props.setllePiglets}
            piglets={this.props.state.ws75.incomingPigletsList}
          />}
        
        { this.state.tabs.transferTab &&
          <WS75TransferTab 
            query={null}
            getPiglets={this.props.getTransferPiglets}
            movePiglets={this.props.movePiglets}
            getLocations={this.props.getLocations}
            locations={this.props.state.ws75.locations}
          />}

        { this.state.tabs.cullingTab &&
          <WS75CullingTab 
            query={null}
            getPiglets={this.props.getPiglets}
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
  getPiglets: query => dispatch(Ws75Actions.getNomadPigletsRequest(query)), 
  setllePiglets: data => dispatch(Ws75Actions.setllePigletsRequest(data)),
  movePiglets: data => dispatch(NomadPigletsActions.moveToPigletsRequest(data)),
  cullingPiglets: data => dispatch(NomadPigletsActions.cullingPigletsRequest(data)),
  getLocations: query => dispatch(Ws75Actions.getLocationsRequest(query)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopSevenFiveContainer);
