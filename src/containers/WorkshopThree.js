import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import WS3SowIncomeTab from '../components/WorkshopThree/WS3SowIncomeTab'
import WS3SowTransferToWsTab from '../components/WorkshopThree/WS3SowTransferToWsTab'
import WS3SowInnerTransferTab from '../components/WorkshopThree/WS3SowInnerTransferTab'
import WS3SowFarrowTab from '../components/WorkshopThree/WS3SowFarrowTab'
import WS3NurseSowTab from '../components/WorkshopThree/WS3NurseSowTab'
import WSSowCullingTab from '../components/SowTabs/WSSowCullingTab'

import WS3PigletsWeaningTab from '../components/WorkshopThree/WS3PigletsWeaningTab'
import WS3CreateGiltTab from '../components/WorkshopThree/WS3CreateGiltTab'
import WS3CreateAndMoveTab from '../components/WorkshopThree/WS3CreateAndMoveTab'

import WSNomadInnerTransferTab from '../components/PigletsTabs/WSNomadInnerTransferTab'
import WSNomadCullingTab from '../components/PigletsTabs/WSNomadCullingTab'
import WSPigletsRecountTab from '../components/PigletsTabs/WSPigletsRecountTab'
import WSNomadResettelmentTab from '../components/PigletsTabs/WSNomadResettelmentTab'
import WS3InfoTab from '../components/WorkshopThree/WS3InfoTab'

import { TabMenu }  from '../components/CommonComponents'

// # actions
import SowsActions from '../redux/redux-sauce/sows'
import SectionsActions from '../redux/redux-sauce/sections'
import LocationsActions from '../redux/redux-sauce/locations'
import PigletsActions from '../redux/redux-sauce/piglets'
import ToursActions from '../redux/redux-sauce/tours'
import WsDataActions from '../redux/redux-sauce/wsData'


class WorkshopThreeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        // {name: 'balanceTab',           active: false, title: 'ИНФО'},
        {name: 'returnPigletsTab',        active: false, title: 'Возврат поросята'},
        {name: 'comingSowsTab',           active: false,  title: 'Поступление матки'},
        {name: 'sowInnerTransferTab',     active: false, title: 'Перемещение свиноматок из клетки в клетку'},
        {name: 'sowTransferToWsTab',      active: true, title: 'Перемещение свиноматок в цех1, цех3'},
        {name: 'farrowTab',               active: false, title: 'Опорос'},
        {name: 'nurseSowTab',             active: false, title: 'Кормилица'},
        {name: 'weaningPigletsTab',       active: false, title: 'Отъем поросят'},
        {name: 'createGiltTab',           active: false, title: 'Биркование'},
        {name: 'sowCullingTab',           active: false, title: 'Выбраковка свиноматок'},
        {name: 'pigletsCullingTab',       active: false, title: 'Выбраковка поросят'},
        {name: 'pigletsInnerTransferTab', active: false, title: 'Перемещение поросят из клетки в клетку'},
        {name: 'pigletsRecountTab',       active: false,  title: 'Пересчет поросят'},
        {name: 'pigletsInitPartTab',      active: false, title: 'Создание и перевод партии'},
      ]
    }
    this.setTab = this.setTab.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
  }
  
  componentDidMount() {
    this.props.getSections({workshop: 3})
    this.props.getTours()
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
        // this.props.sowsResetErrorsAndMessages()
    })

    return activeTab
  }

  render() {
    const activeTab = this.getActiveTab()

    return (
      <div className="workshop container-fluid">
        <TabMenu 
          tabs={this.state.tabs} setTab={this.setTab} workshop={'Цех №3'} activeTab={activeTab}
          user={this.props.state.auth.user}
        />
        
        {activeTab.name === 'balanceTab' &&
          <WS3InfoTab 
            getInfoWs3={this.props.getInfoWs3}
            infoData={this.props.state.wsData.info_ws3}
            fetching={this.props.state.wsData.fetching}
            error={this.props.state.wsData.error}
        />}

        {activeTab.name === 'comingSowsTab' &&
          <WS3SowIncomeTab 
            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            listFetching={this.props.state.sows.fetching}
            sowsListError={this.props.state.sows.errorList}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsListError={this.props.state.locations.errorList}

            sowMoveTo={this.props.sowMoveTo}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.eventError}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />
        }
        
        {activeTab.name === 'sowTransferToWsTab' &&
          <WS3SowTransferToWsTab 
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsListError={this.props.state.locations.errorList}
            
            sowsMoveMany={this.props.sowsMoveMany}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.eventError}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}
        {activeTab.name === 'sowInnerTransferTab' &&
          <WS3SowInnerTransferTab 
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations1={this.props.getLocations}
            locations1={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsListError={this.props.state.locations.errorList}
            
            getLocations2={this.props.getLocationsAdditional}
            locations2={this.props.state.locations.additional_list}
            locationsAddFetching={this.props.state.locations.fetchingAdditional}
            locationsList2Error={this.props.state.locations.errorAdditional}

            sowMoveTo={this.props.sowMoveTo}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.eventError}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}

        {activeTab.name === 'farrowTab' &&
          <WS3SowFarrowTab
            workshopNumber={3}
            statusTitleFilter={'Супорос 35'}
            sectionId={6}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}
            sowsError={this.props.state.sows.error}

            tours={this.props.state.tours.list}
            toursFetching={this.props.state.tours.fetching}
            toursError={this.props.state.tours.error}

            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            sowFarrow={this.props.sowFarrow}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.eventError}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}
        {activeTab.name === 'nurseSowTab' &&
          <WS3NurseSowTab
            workshopNumber={3}
            statusTitleFilters={['Опоросилась', 'Отъем']}
            sectionId={6}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            listFetching={this.props.state.sows.fetching}
            sowsListError={this.props.state.sows.errorList}

            eventFetching={this.props.state.sows.eventFetching}
            massMove={this.props.sowsMoveMany}
            markAsNurse={this.props.markAsNurse}
            eventError={this.props.state.sows.eventError}

            message={this.props.state.sows.message}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}
            toursFetching={this.props.state.tours.fetching}
            toursError={this.props.state.tours.error}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}
        {activeTab.name === 'sowCullingTab' &&
          <WSSowCullingTab 
            workshopNumber={3}
            abort={true}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}

            getSow={this.props.getSow}
            setSow={this.props.setSow}

            sow={this.props.state.sows.sow}
            tours_info={this.props.state.sows.tours_info}
            singleSowFetching={this.props.state.sows.sowSingleFetching}

            cullingSow={this.props.cullingSow}
            abortionSow={this.props.abortionSow}
            eventError={this.props.state.sows.eventError}
            eventFetching={this.props.state.sows.eventFetching}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}
        {activeTab.name === 'weaningPigletsTab' &&
          <WS3PigletsWeaningTab 
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsListError={this.props.state.locations.errorList}

            mergeFromListPiglets={this.props.mergeFromListPiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            eventMessage={this.props.state.piglets.message}
            
            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
          />}
        {activeTab.name === 'createGiltTab' &&
          <WS3CreateGiltTab 
            workshopNumber={3}
            statusTitleFilter={'Опоросилась'}
            sectionId={6}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsFetching={this.props.state.sows.fetching}
            sowsError={this.props.state.sows.error}

            tours={this.props.state.tours.list}
            toursFetching={this.props.state.tours.fetching}
            toursError={this.props.state.tours.error}

            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            createGilt={this.props.createGilt}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.eventError}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}
        {activeTab.name === 'pigletsCullingTab' &&
          <WSNomadCullingTab
            workshopNumber={3}
            user={this.props.state.auth.user}

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
        {activeTab.name === 'pigletsInnerTransferTab' &&
          <WSNomadInnerTransferTab
            workshopNumber={3}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations1={this.props.getLocations}
            locations1={this.props.state.locations.list}
            listFetching={this.props.state.locations.fetching}

            getLocations2={this.props.getLocationsAdditional}
            locations2={this.props.state.locations.additional_list}
            list2Fetching={this.props.state.locations.fetchingAdditional}

            movePiglets={this.props.movePiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            message={this.props.state.piglets.message}
            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
          />}
        {activeTab.name === 'returnPigletsTab' &&
          <WSNomadResettelmentTab
            workshopNumber={3}
            // weighingPlace={'3/4'}
            // pigletsStatus={null}

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
            message={this.props.state.piglets.message}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
          />}

        {activeTab.name === 'pigletsInitPartTab' &&
          <WS3CreateAndMoveTab
            workshopNumber={3}

            mergeFromInitListPiglets={this.props.mergeFromInitListPiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
          />}

        {activeTab.name === 'pigletsRecountTab' &&
          <WSPigletsRecountTab
            workshopNumber={3}
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
  // sections and locations
  getSections: query => dispatch(SectionsActions.getSectionsRequest(query)),
  getLocations: query => dispatch(LocationsActions.getLocationsRequest(query)),
  getLocationsAdditional: query => dispatch(LocationsActions.getLocationsAdditionalRequest(query)),

  //tours
  getTours: query => dispatch(ToursActions.getToursRequest(query)),

  //sows
  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  getSow: id => dispatch(SowsActions.getSowRequest(id)),
  setSow: sow => dispatch(SowsActions.setSow(sow)),

  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowFarrow: data => dispatch(SowsActions.sowFarrowRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowRequest(id)),
  markAsNurse: id => dispatch(SowsActions.markAsNurseRequest(id)),
  createGilt: data => dispatch(SowsActions.createGiltRequest(data)),
  
  sowsResetErrorsAndMessages: () => dispatch(SowsActions.sowsResetErrorsAndMessages()),

  //piglets
  getPiglets: query => dispatch(PigletsActions.getPigletsRequest(query)),
  mergeFromListPiglets: data => dispatch(PigletsActions.mergeFromListPigletsRequest(data)),
  mergeFromInitListPiglets: data => dispatch(PigletsActions.mergeFromInitListPigletsRequest(data)),
  movePiglets: query => dispatch(PigletsActions.movePigletsRequest(query)),
  cullingPiglets: data => dispatch(PigletsActions.cullingPigletsRequest(data)),
  recountPiglets: data => dispatch(PigletsActions.recountPigletsRequest(data)),

  pigletsResetErrorsAndMessages: () => dispatch(PigletsActions.pigletsResetErrorsAndMessages()),

  // info
  getInfoWs3: () => dispatch(WsDataActions.getInfoWs3Request()),
  getBalancesbyToursWs3: () => dispatch(WsDataActions.getBalancesByToursWs3Request())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopThreeContainer);
