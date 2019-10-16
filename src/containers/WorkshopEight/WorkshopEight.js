import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WSNomadCullingTab from '../../components/WorkshopTabs/WSNomadCullingTab'
import WSNomadTransferTab from '../../components/WorkshopTabs/WSNomadTransferTab'
import WSNomadInnerTransferTab from '../../components/WorkshopTabs/WSNomadInnerTransferTab'
import WSNomadResettelmentTab from '../../components/WorkshopTabs/WSNomadResettelmentTab'
import WSNomadIncomeTab from '../../components/WorkshopTabs/WSNomadIncomeTab'

// actions
import Ws8Actions from '../../redux/redux-sauce/ws8';
import NomadPigletsActions from '../../redux/redux-sauce/nomadPiglets';


class WorkshopEightContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        incomeTab: true,
        resettlementTab: false,
        innerTransferTab: false,
        transferTab: false,
        cullingTab: false,
        infoTab: false,
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

  render() {
    return (
      <div className="workshop container">
        <div className='workshop-header'>
          Цех №8
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
          <WSNomadIncomeTab 
            workshopNumber={8}
            weighingPlace={'4/8'}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.ws8.incomingPigletsList}

            weighingPiglets={this.props.weighingPiglets}
            weighingData={this.props.state.nomadPiglets.weighing}
            eventFetching={this.props.state.nomadPiglets.eventFetching}
            message={this.props.state.nomadPiglets.message}
          />}

        { this.state.tabs.resettlementTab &&
          <WSNomadResettelmentTab 
            workshopNumber={8}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.ws8.incomingPigletsList}

            getSections={this.props.getSections}
            sections={this.props.state.ws8.sections}

            getLocations={this.props.getIncomeTabLocations}
            locations={this.props.state.ws8.incomeTabLocations}

            setllePiglets={this.props.moveToCellPiglets}
            eventFetching={this.props.state.nomadPiglets.eventFetching}
            message={this.props.state.nomadPiglets.message}
        />}

        { this.state.tabs.innerTransferTab &&
          <WSNomadInnerTransferTab
            workshopNumber={8}

            getSections={this.props.getSections}
            sections={this.props.state.ws8.sections}

            getLocations1={this.props.getInnerTransferTabLocations1}
            getLocations2={this.props.getInnerTransferTabLocations2}

            locations1={this.props.state.ws8.innerTransferLocations1}
            locations2={this.props.state.ws8.innerTransferLocations2}

            movePiglets={this.props.moveToCellPiglets}
            eventFetching={this.props.state.nomadPiglets.eventFetching}
            message={this.props.state.nomadPiglets.message}
        />}

        { this.state.tabs.transferTab &&
          <WSNomadTransferTab 
            workshopNumber={8}
            toLocation={6}
            buttonName={'Отправить в откорм'}

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
          <WSNomadCullingTab
            workshopNumber={8}

            getSections={this.props.getSections}
            sections={this.props.state.ws5.sections}

            getLocations={this.props.getIncomeTabLocations}
            locations={this.props.state.ws5.incomeTabLocations}

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
  getPiglets: query => dispatch(Ws8Actions.getNomadPigletsWs8Request(query)),
  getSections: query => dispatch(Ws8Actions.getSectionsWs8Request(query)),
  getIncomeTabLocations: query => dispatch(Ws8Actions.getIncomeTabLocationsWs8Request(query)),
  setllePiglets: data => dispatch(Ws8Actions.setllePigletsWs8Request(data)),
  getTransferPiglets: query => dispatch(Ws8Actions.getTransferPigletsWs8Request(query)),
  movePiglets: data => dispatch(NomadPigletsActions.moveToPigletsRequest(data)),
  moveToCellPiglets: data => dispatch(NomadPigletsActions.moveToCellPigletsRequest(data)),
  getInnerTransferTabLocations1: query => dispatch(Ws8Actions.getInnerTransferTabLocations1Ws8Request(query)),
  getInnerTransferTabLocations2: query => dispatch(Ws8Actions.getInnerTransferTabLocations2Ws8Request(query)),
  weighingPiglets: data => dispatch(NomadPigletsActions.weighingPigletsRequest(data)),
  cullingPiglets: data => dispatch(NomadPigletsActions.cullingPigletsRequest(data)),
  cullingGilt: data => dispatch(NomadPigletsActions.cullingGiltPigletsRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopEightContainer);
