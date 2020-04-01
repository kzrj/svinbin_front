import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WSNomadCullingTab from '../components/PigletsTabs/WSNomadCullingTab'
import WSNomadTransferTab from '../components/PigletsTabs/WSNomadTransferTab'
import WSNomadInnerTransferTab from '../components/PigletsTabs/WSNomadInnerTransferTab'
import WSNomadResettelmentTab from '../components/PigletsTabs/WSNomadResettelmentTab'
import WSNomadIncomeTab from '../components/PigletsTabs/WSNomadIncomeTab'
import WSPigletsRecountTab from '../components/PigletsTabs/WSPigletsRecountTab'

import { TabMenu }  from '../components/CommonComponents'

// actions
import SectionsActions from '../redux/redux-sauce/sections';
import LocationsActions from '../redux/redux-sauce/locations';
import PigletsActions from '../redux/redux-sauce/piglets';


class WorkshopSixContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {name: 'incomeTab',        active: true, title: 'Поступление и взвешивание'},
        {name: 'resettlementTab',  active: false, title: 'Размещение прибывших'},
        {name: 'innerTransferTab', active: false, title: 'Внутреннее перемещение'},
        // {name: 'transferTab',      active: false, title: 'Перегон в убойный цех'},
        {name: 'transferTo75Tab',  active: false, title: 'Перегон ремонтных в 7-5'},
        {name: 'cullingTab',       active: false, title: 'Выбраковка'},
        {name: 'pigletsRecountTab',active: false,  title: 'Пересчет поросят'},
        {name: 'infoTab',          active: false, title: 'Инфо'},
      ],
    };
    this.setTab = this.setTab.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
  }

  componentDidMount() {
    this.props.getSections({sections_by_workshop_number:6, sections: true})
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
      <div className="workshop container-fluid">
        <TabMenu 
          tabs={this.state.tabs} setTab={this.setTab} workshop={'Цех №6'} activeTab={activeTab}
          user={this.props.state.auth.user}
        />
        { activeTab.name === 'incomeTab' &&
          <WSNomadIncomeTab 
            user={this.props.state.auth.user}
            workshopNumber={6}
            weighingPlace={'8/6'}
            returnLocation={8}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.piglets.list}
            listFetching={this.props.state.piglets.listFetching}
            listError={this.props.state.piglets.errorList}

            weighingPiglets={this.props.weighingPiglets}
            initPiglets={this.props.initPiglets}
            weighingData={this.props.state.piglets.weighing}
            eventError={this.props.state.piglets.eventError}
            eventFetching={this.props.state.piglets.eventFetching}
            message={this.props.state.piglets.message}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
          />}

        { activeTab.name === 'resettlementTab' &&
          <WSNomadResettelmentTab 
            workshopNumber={6}
            weighingPlace={'8/6'}

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

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
        />}

        { activeTab.name === 'innerTransferTab' &&
          <WSNomadInnerTransferTab
            workshopNumber={6}

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

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
        />}

        { activeTab.name === 'transferTab' &&
          <WSNomadTransferTab 
            workshopNumber={6}
            toLocation={9}
            toLocations={null}
            buttonName={'Отправить в Убойный цех'}

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

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
        />}

        { activeTab.name === 'transferTo75Tab' &&
          <WSNomadTransferTab 
            workshopNumber={6}
            toLocation={11}
            toLocations={null}
            buttonName={'Отправить в Цех7-5'}

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

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
          />}

        { activeTab.name === 'cullingTab' &&
          <WSNomadCullingTab
            user={this.props.state.auth.user}
            workshopNumber={6}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

            cullingPiglets={this.props.cullingPiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
        />}

        { this.props.state.auth.user.is_officer && activeTab.name === 'pigletsRecountTab' &&
          <WSPigletsRecountTab
            workshopNumber={6}
            user={this.props.state.auth.user}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

            recountPiglets={this.props.recountPiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
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
  initPiglets: data => dispatch(PigletsActions.initPigletsRequest(data)),
  recountPiglets: data => dispatch(PigletsActions.recountPigletsRequest(data)),

  pigletsResetErrorsAndMessages: () => dispatch(PigletsActions.pigletsResetErrorsAndMessages()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopSixContainer);