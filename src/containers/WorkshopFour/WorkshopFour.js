import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS4IncomeTab from '../../components/WorkshopFour/WS4IncomeTab'
import WS4ResettelmentTab from '../../components/WorkshopFour/WS4ResettelmentTab'
import WS4TransferTab from '../../components/WorkshopFour/WS4TransferTab'
import WS4InnerTransferTab from '../../components/WorkshopFour/WS4InnerTransferTab'
import WS4CullingTab from '../../components/WorkshopFour/WS4CullingTab'

// actions
import Ws4Actions from '../../redux/redux-sauce/ws4';
import NomadPigletsActions from '../../redux/redux-sauce/nomadPiglets';


class WorkshopFourContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        incomeTab: false,
        resettlementTab: false,
        innerTransferTab: false,
        transferTab: false,
        cullingTab: true,
        // infoTab: false,
      }
    };
    this.setTab = this.setTab.bind(this);
  }

  setTab (tab) {
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
    console.log(state)
  }

  render() {
    return (
      <div className="workshop container">
        <div className='workshop-header'>
          Цех №4
          <button onClick={this.showStateConsole}>O</button>
        </div>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.incomeTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('incomeTab')}
            >
              Поступление и взвешивание
            </div>
          <div className={this.state.tabs.resettlementTab ? 'workshop-tab tab-active col-sm' :
            'workshop-tab col-sm'}
            onClick={() => this.setTab('resettlementTab')}
          >
            Расселение поступивших
          </div>
          <div className={this.state.tabs.innerTransferTab ? 'workshop-tab tab-active col-sm' :
            'workshop-tab col-sm'}
            onClick={() => this.setTab('innerTransferTab')}
          >
            Перемещение
          </div>
          <div className={this.state.tabs.transferTab ? 'workshop-tab tab-active col-sm' :
            'workshop-tab col-sm'}
            onClick={() => this.setTab('transferTab')}
          >
            Перегон
          </div>
          <div className={this.state.tabs.cullingTab ? 'workshop-tab tab-active col-sm' :
            'workshop-tab col-sm'}
            onClick={() => this.setTab('cullingTab')}
          >
            Выбраковка
          </div>
          <div className={this.state.tabs.infoTab ? 'workshop-tab tab-active col-sm' :
            'workshop-tab col-sm'}
            onClick={() => this.setTab('infoTab')}
          >
            Инфо
          </div>
        </div>
        <div className='workshop-header-3'>
        </div>
        { this.state.tabs.incomeTab &&
          <WS4IncomeTab 
            getPiglets={this.props.getPiglets}
            piglets={this.props.state.ws4.incomingPigletsList}

            weighingPiglets={this.props.weighingPiglets}
            weighingData={this.props.state.nomadPiglets.weighing}
            eventFetching={this.props.state.nomadPiglets.eventFetching}
            message={this.props.state.nomadPiglets.message}
          />}
        { this.state.tabs.resettlementTab &&
          <WS4ResettelmentTab 
          getPiglets={this.props.getPiglets}
          piglets={this.props.state.ws4.incomingPigletsList}

          getSections={this.props.getSections}
          sections={this.props.state.ws4.sections}

          getLocations={this.props.getIncomeTabLocations}
          locations={this.props.state.ws4.incomeTabLocations}

          setllePiglets={this.props.moveToCellPiglets}
          eventFetching={this.props.state.nomadPiglets.eventFetching}
          message={this.props.state.nomadPiglets.message}
        />}

        { this.state.tabs.innerTransferTab &&
          <WS4InnerTransferTab 
          getSections={this.props.getSections}
          sections={this.props.state.ws4.sections}

          getLocations1={this.props.getInnerTransferTabLocations1}
          getLocations2={this.props.getInnerTransferTabLocations2}

          locations1={this.props.state.ws4.innerTransferLocations1}
          locations2={this.props.state.ws4.innerTransferLocations2}

          movePiglets={this.props.moveToCellPiglets}
          eventFetching={this.props.state.nomadPiglets.eventFetching}
          message={this.props.state.nomadPiglets.message}
        />}

        { this.state.tabs.transferTab &&
          <WS4TransferTab 
            getPiglets={this.props.getTransferPiglets}
            piglets={this.props.state.ws4.transferPiglets}

            getSections={this.props.getSections}
            sections={this.props.state.ws4.sections}

            getLocations={this.props.getIncomeTabLocations}
            locations={this.props.state.ws4.incomeTabLocations}

            movePiglets={this.props.movePiglets}
            eventFetching={this.props.state.nomadPiglets.eventFetching}
            message={this.props.state.nomadPiglets.message}
        />}

        { this.state.tabs.cullingTab &&
          <WS4CullingTab
            getSections={this.props.getSections}
            sections={this.props.state.ws4.sections}

            getLocations={this.props.getIncomeTabLocations}
            locations={this.props.state.ws4.incomeTabLocations}

            cullingPiglets={this.props.cullingPiglets}
            cullingGilt={this.props.cullingGilt}
            eventFetching={this.props.state.nomadPiglets.eventFetching}
            message={this.props.state.nomadPiglets.message}
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
  dispatch: dispatch,
  getPiglets: query => dispatch(Ws4Actions.getNomadPigletsWs4Request(query)),
  getSections: query => dispatch(Ws4Actions.getSectionsWs4Request(query)),
  getIncomeTabLocations: query => dispatch(Ws4Actions.getIncomeTabLocationsWs4Request(query)),
  setllePiglets: data => dispatch(Ws4Actions.setllePigletsWs4Request(data)),
  getTransferPiglets: query => dispatch(Ws4Actions.getTransferPigletsWs4Request(query)),
  movePiglets: data => dispatch(NomadPigletsActions.moveToPigletsRequest(data)),
  moveToCellPiglets: data => dispatch(NomadPigletsActions.moveToCellPigletsRequest(data)),
  getInnerTransferTabLocations1: query => dispatch(Ws4Actions.getInnerTransferTabLocations1Ws4Request(query)),
  getInnerTransferTabLocations2: query => dispatch(Ws4Actions.getInnerTransferTabLocations2Ws4Request(query)),
  weighingPiglets: data => dispatch(NomadPigletsActions.weighingPigletsRequest(data)),
  cullingPiglets: data => dispatch(NomadPigletsActions.cullingPigletsRequest(data)),
  cullingGilt: data => dispatch(NomadPigletsActions.cullingGiltPigletsRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopFourContainer);
