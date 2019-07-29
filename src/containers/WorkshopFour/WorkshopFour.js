import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WorkshopRearing from '../Workshop/WorkshopRearing';
import WS4IncomeTab from '../../components/WorkshopFour/WS4IncomeTab'
import WS4ResettelmentTab from '../../components/WorkshopFour/WS4ResettelmentTab'

// actions
import Ws4Actions from '../../redux/redux-sauce/ws4';


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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopFourContainer);
