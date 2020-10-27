import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import WS3SowIncomeTab from '../components/WorkshopThree/WS3SowIncomeTab'
import WS3SowTransferToWsTab from '../components/WorkshopThree/WS3SowTransferToWsTab'
import WS3SowInnerTransferTab from '../components/WorkshopThree/WS3SowInnerTransferTab'
import WS3SowFarrowTab from '../components/WorkshopThree/WS3SowFarrowTab'
import WS3NurseSowTab from '../components/WorkshopThree/WS3NurseSowTab'
import WSSowCullingTab from '../components/SowTabs/WSSowCullingTab'
import WSSowGlobalSearchTab from '../components/SowTabs/WSSowGlobalSearchTab'

import WS3PigletsWeaningTab from '../components/WorkshopThree/WS3PigletsWeaningTab'
import WS3CreateGiltTab from '../components/WorkshopThree/WS3CreateGiltTab'
import WS3CreateAndMoveTab from '../components/WorkshopThree/WS3CreateAndMoveTab'

import WSNomadInnerTransferTab from '../components/PigletsTabs/WSNomadInnerTransferTab'
import WSNomadCullingTab from '../components/PigletsTabs/WSNomadCullingTab'
import WSPigletsRecountTab from '../components/PigletsTabs/WSPigletsRecountTab'
import WSNomadResettelmentTab from '../components/PigletsTabs/WSNomadResettelmentTab'
import InfoTab from '../containers/InfoTab'

import { TabMenu }  from '../components/CommonComponents'

// # actions
import SowsActions from '../redux/redux-sauce/sows'
import SectionsActions from '../redux/redux-sauce/sections'
import LocationsActions from '../redux/redux-sauce/locations'
import PigletsActions from '../redux/redux-sauce/piglets'
import ToursActions from '../redux/redux-sauce/tours'
import ReportsActions from '../redux/redux-sauce/reports';
import InputsActions from '../redux/redux-sauce/inputs';
import WSDataActions from '../redux/redux-sauce/wsData';


class WorkshopThreeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {name: 'infoTab',                 active: false, title: 'ИНФО'},
        {name: 'returnPigletsTab',        active: false, title: 'Возврат поросята'},
        {name: 'comingSowsTab',           active: false, title: 'Поступление матки'},
        {name: 'farrowTab',               active: false,  title: 'Опорос'},
        {name: 'nurseSowTab',             active: false, title: 'Кормилица'},
        {name: 'weaningPigletsTab',       active: true, title: 'Отъем поросят'},
        {name: 'createGiltTab',           active: false, title: 'Биркование'},
        {name: 'sowCullingTab',           active: false, title: 'Выбытие свиноматок'},
        {name: 'pigletsCullingTab',       active: false, title: 'Выбытие поросят'},
        {name: 'pigletsInnerTransferTab', active: false, title: 'Перемещение поросят из клетки в клетку'},
        {name: 'searchSowTab',            active: false, title: 'Поиск по всем цехам'},
        {name: 'sowInnerTransferTab',     active: false, title: 'Перемещение свиноматок из клетки в клетку'},
        {name: 'sowTransferToWsTab',      active: false, title: 'Перемещение свиноматок в цех1, цех3'},
        {name: 'sowAndPigletsTransferTab',active: false, title: 'Перемещение свиноматок вместе с поросятами из клетки в клетку'},
        {name: 'pigletsRecountTab',       active: false,  title: 'Пересчет поросят'},
        // {name: 'pigletsInitPartTab',      active: false, title: 'Создание и перевод партии'},
      ]
    }
    this.setTab = this.setTab.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
  }
  
  componentDidMount() {
    this.props.getSections({sections_by_workshop_number:3, sections: true})
    this.props.getTours({by_workshop_number: 3})
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
          tabs={this.state.tabs} setTab={this.setTab} workshop={'Цех №3'} activeTab={activeTab}
          user={this.props.state.auth.user}
        />
        
        {activeTab.name === 'infoTab' &&
          <InfoTab ws_number={'3'}/>
        }

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

            sowAndPiglets={false}
            sowMoveTo={this.props.sowMoveTo}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.eventError}
            message={this.props.state.sows.message}

            wsDataResetErrorsAndMessages={this.props.wsDataResetErrorsAndMessages}
          />}

        {activeTab.name === 'farrowTab' &&
          <WS3SowFarrowTab
            workshopNumber={3}
            statusTitleFilter={'Супорос 35'}
            sectionId={6}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}
            sowsErrorList={this.props.state.sows.errorList}

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
            errorList={this.props.state.sows.errorList}
            queryCount={this.props.state.sows.queryCount}

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
            user={this.props.state.auth.user}

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

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sow={this.props.state.sows.sow}
            sowsListFetching={this.props.state.sows.fetching}
            sowsErrorList={this.props.state.sows.errorList}

            createGilt={this.props.createGilt}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.eventError}
            message={this.props.state.sows.message}

            giltJournal={this.props.state.wsData.gilt_journal}
            getGiltJournal={this.props.getGiltJournal}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}
        {activeTab.name === 'pigletsCullingTab' &&
          <WSNomadCullingTab
            workshopNumber={3}
            user={this.props.state.auth.user}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsErrorList={this.props.state.locations.errorList}

            cullingPiglets={this.props.cullingPiglets}
            cullingTypes={[{value:'padej', label: 'Падеж'}, {value:'prirezka', label: 'Прирезка'},
              {value: 'vinuzhd', label: 'Вынужденный убой'}]}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
        />}
        {activeTab.name === 'pigletsInnerTransferTab' &&
          <WSNomadInnerTransferTab
            user={this.props.state.auth.user}
            workshopNumber={3}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations1={this.props.getLocations}
            locations1={this.props.state.locations.list}
            listFetching={this.props.state.locations.fetching}
            locationsErrorList={this.props.state.locations.errorList}

            getLocations2={this.props.getLocationsAdditional}
            locations2={this.props.state.locations.additional_list}
            list2Fetching={this.props.state.locations.fetchingAdditional}
            locations2ErrorList={this.props.state.locations.errorAdditional}

            movePiglets={this.props.movePiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}
            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
          />}
        {activeTab.name === 'returnPigletsTab' &&
          <WSNomadResettelmentTab
            user={this.props.state.auth.user}
            workshopNumber={3}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.piglets.list}
            listFetching={this.props.state.piglets.listFetching}
            errorList={this.props.state.piglets.errorList}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsErrorList={this.props.state.locations.errorList}

            movePiglets={this.props.movePiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
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

            getRecountBalance={this.props.getRecountBalance}
            recountData={this.props.state.reports.recountData}

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

        {activeTab.name === 'sowAndPigletsTransferTab' &&
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

            sowAndPiglets={true}
            ws3TransferSowAndPiglets={this.props.ws3TransferSowAndPiglets}
            eventFetching={this.props.state.wsData.fetching}
            eventError={this.props.state.wsData.error}
            message={this.props.state.wsData.message}
            showButton={true}

            wsDataResetErrorsAndMessages={this.props.wsDataResetErrorsAndMessages}
          />}

        {activeTab.name === 'searchSowTab' &&
          <WSSowGlobalSearchTab 
            sow={this.props.state.sows.sow}
            cycles={this.props.state.sows.cycles}

            getByFarmIdSow={this.props.getByFarmIdSow}
            singleSowFetching={this.props.state.sows.sowSingleFetching}
            errorSingle={this.props.state.sows.errorSingle}
          />
        }
          
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
  getByFarmIdSow: query => dispatch(SowsActions.getSowByFarmIdRequest(query)),

  cullingSow: data => dispatch(SowsActions.cullingSowWs3Request(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyWs3Request(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowFarrow: data => dispatch(SowsActions.sowFarrowRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowWs3Request(id)),
  markAsNurse: id => dispatch(SowsActions.markAsNurseRequest(id)),
  createGilt: id => dispatch(SowsActions.createGiltRequest(id)),
  
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
  getOperationsReport: (token) => dispatch(ReportsActions.getOperationsReportRequest(token)),
  getWsReportPigsCount: () => dispatch(ReportsActions.getWsReportPigsCountRequest({ws_number: 3})),
  getRecountBalance: () => dispatch(ReportsActions.getRecountBalanceRequest({ws_number: 3})),

  // inputs
  changeOperationsInputs: data => dispatch(InputsActions.changeOperationsInputs(data)),

  // rest
  ws3TransferSowAndPiglets: data => dispatch(WSDataActions.ws3TransferSowAndPigletsRequest(data)),
  wsDataResetErrorsAndMessages: () => dispatch(WSDataActions.wsDataResetErrorsAndMessages()),
  getGiltJournal: () => dispatch(WSDataActions.getWs3GiltJournalRequest()),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopThreeContainer);
