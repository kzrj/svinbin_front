import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WSNomadCullingTab from '../components/PigletsTabs/WSNomadCullingTab'
import WSNomadTransferTab from '../components/PigletsTabs/WSNomadTransferTab'
import WSNomadInnerTransferTab from '../components/PigletsTabs/WSNomadInnerTransferTab'
import WSNomadResettelmentTab from '../components/PigletsTabs/WSNomadResettelmentTab'
import WSNomadIncomeTab from '../components/PigletsTabs/WSNomadIncomeTab'

import { TabMenu }  from '../components/CommonComponents'

// actions
import SectionsActions from '../redux/redux-sauce/sections';
import LocationsActions from '../redux/redux-sauce/locations';
import PigletsActions from '../redux/redux-sauce/piglets';


class WorkshopEightContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {name: 'incomeTab',        active: true, title: 'Поступление и взвешивание'},
        {name: 'resettlementTab',  active: false, title: 'Размещение прибывших'},
        {name: 'innerTransferTab', active: false, title: 'Внутреннее перемещение'},
        {name: 'transferTab',      active: false, title: 'Перегон'},
        {name: 'cullingTab',       active: false, title: 'Выбраковка'},
        {name: 'infoTab',          active: false, title: 'Инфо'},
      ]
    };
    this.setTab = this.setTab.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
  }

  componentDidMount() {
    this.props.getSections({workshop: 8})
  }

  setTab (tab) {
    let { tabs } = this.state
    tabs.map((tb) => {
      tb.active = false
      if (tb.name === tab.name)
        tb.active= true
    })

    this.setState({
      tabs: tabs
    })
  }

  getActiveTab () {
    let { tabs } = this.state
    let activeTab = {}
    tabs.map(tb => {
      if (tb.active)
        activeTab = tb
    })
    return activeTab
  }

  render() {
    const activeTab = this.getActiveTab()

    return (
      <div className="workshop container">
        <TabMenu 
          tabs={this.state.tabs} setTab={this.setTab} workshop={'Цех №8'} activeTab={activeTab}
          user={this.props.state.auth.user}
        />
        { activeTab.name === 'incomeTab' &&
          <WSNomadIncomeTab 
            workshopNumber={8}
            weighingPlace={'4/8'}
            returnLocation={4}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.piglets.list}
            listFetching={this.props.state.piglets.listFetching}
            listError={this.props.state.piglets.errorList}

            weighingPiglets={this.props.weighingPiglets}
            weighingData={this.props.state.piglets.weighing}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}
          />}

        { activeTab.name === 'resettlementTab' &&
          <WSNomadResettelmentTab 
            workshopNumber={8}
            weighingPlace={'4/8'}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.piglets.list}
            listFetching={this.props.state.piglets.listFetching}
            listError={this.props.state.piglets.errorList}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

            movePiglets={this.props.movePiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}
        />}

        { activeTab.name === 'innerTransferTab' &&
          <WSNomadInnerTransferTab
            workshopNumber={8}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}

            getLocations1={this.props.getLocations}
            locations1={this.props.state.locations.list}
            listFetching={this.props.state.locations.fetching}

            getLocations2={this.props.getLocationsAdditional}
            locations2={this.props.state.locations.additional_list}
            list2Fetching={this.props.state.locations.fetchingAdditional}

            movePiglets={this.props.movePiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}
        />}

        { activeTab.name === 'transferTab' &&
          <WSNomadTransferTab 
            workshopNumber={8}
            toLocation={5}
            toLocations={[5,6,7]}
            buttonName={'Отправить в откорм'}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.piglets.list}
            listFetching={this.props.state.piglets.listFetching}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

            movePiglets={this.props.movePiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}
        />}

        { activeTab.name === 'cullingTab' &&
          <WSNomadCullingTab
            workshopNumber={8}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

            cullingPiglets={this.props.cullingPiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}
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
  movePiglets: query => dispatch(PigletsActions.movePigletsRequest(query)),
  weighingPiglets: query => dispatch(PigletsActions.weighingPigletsRequest(query)),
  cullingPiglets: query => dispatch(PigletsActions.cullingPigletsRequest(query)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopEightContainer);
