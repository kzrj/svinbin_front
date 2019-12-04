import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WSNomadCullingTab from '../components/PigletsTabs/WSNomadCullingTab'
import WSNomadTransferTab from '../components/PigletsTabs/WSNomadTransferTab'
import WSNomadInnerTransferTab from '../components/PigletsTabs/WSNomadInnerTransferTab'
import WSNomadResettelmentTab from '../components/PigletsTabs/WSNomadResettelmentTab'
import WSNomadIncomeTab from '../components/PigletsTabs/WSNomadIncomeTab'

// actions
import SectionsActions from '../redux/redux-sauce/sections';
import LocationsActions from '../redux/redux-sauce/locations';
import PigletsActions from '../redux/redux-sauce/piglets';


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

  componentDidMount() {
    this.props.getSections({workshop: 5})
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
            piglets={this.props.state.nomadPiglets.list}
            listFetching={this.props.state.nomadPiglets.listFetching}

            weighingPiglets={this.props.weighingPiglets}
            weighingData={this.props.state.nomadPiglets.weighing}
            eventFetching={this.props.state.nomadPiglets.eventFetching}
            message={this.props.state.nomadPiglets.message}
          />}

        { this.state.tabs.resettlementTab &&
          <WSNomadResettelmentTab 
            workshopNumber={8}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.nomadPiglets.list}
            listFetching={this.props.state.nomadPiglets.listFetching}

            getSections={this.props.getSections}
            sections={this.props.state.ws8.sections}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

            setllePiglets={this.props.moveToCellPiglets}
            eventFetching={this.props.state.nomadPiglets.eventFetching}
            message={this.props.state.nomadPiglets.message}
        />}

        { this.state.tabs.innerTransferTab &&
          <WSNomadInnerTransferTab
            workshopNumber={8}

            getSections={this.props.getSections}
            sections={this.props.state.ws8.sections}

            getLocations1={this.props.getLocations}
            locations1={this.props.state.locations.list}
            listFetching={this.props.state.locations.fetching}

            getLocations2={this.props.getLocationsAdditional}
            locations2={this.props.state.locations.additional_list}
            list2Fetching={this.props.state.locations.fetchingAdditional}

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

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

            movePiglets={this.props.movePiglets}
            eventFetching={this.props.state.nomadPiglets.eventFetching}
            message={this.props.state.nomadPiglets.message}
        />}

        { this.state.tabs.cullingTab &&
          <WSNomadCullingTab
            workshopNumber={8}

            getSections={this.props.getSections}
            sections={this.props.state.ws5.sections}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

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
  // locations
  getSections: query => dispatch(SectionsActions.getSectionsRequest(query)),
  getLocations: query => dispatch(LocationsActions.getLocationsRequest(query)),
  getLocationsAdditional: query => dispatch(LocationsActions.getLocationsAdditionalRequest(query)),

  //piglets
  getPiglets: query => dispatch(PigletsActions.getPigletsRequest(query)),
  setllePiglets: query => dispatch(PigletsActions.getPigletsRequest(query)),
  getTransferPiglets: query => dispatch(PigletsActions.getPigletsRequest(query)),

  movePiglets: query => dispatch(PigletsActions.getPigletsRequest(query)),
  moveToCellPiglets: query => dispatch(PigletsActions.getPigletsRequest(query)),
  weighingPiglets: query => dispatch(PigletsActions.getPigletsRequest(query)),
  cullingPiglets: query => dispatch(PigletsActions.getPigletsRequest(query)),
  cullingGilt: query => dispatch(PigletsActions.getPigletsRequest(query)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopEightContainer);
