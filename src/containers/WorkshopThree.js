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

import WSNomadInnerTransferTab from '../components/PigletsTabs/WSNomadInnerTransferTab'
import WSNomadCullingTab from '../components/PigletsTabs/WSNomadCullingTab'
import WSPigletsRecountTab from '../components/PigletsTabs/WSPigletsRecountTab'
import WSNomadResettelmentTab from '../components/PigletsTabs/WSNomadResettelmentTab'
import InfoTab from '../containers/InfoTab'

import { TabMenu }  from '../components/CommonComponents'

// # actions
import { change, reset } from "redux-form";
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
        {name: 'infoTab',                 active: false,  title: 'ИНФО'},
        {name: 'returnPigletsTab',        active: false, title: 'Возврат поросята'},
        {name: 'comingSowsTab',           active: false, title: 'Поступление матки'},
        {name: 'farrowTab',               active: false, title: 'Опорос'},
        {name: 'nurseSowTab',             active: false, title: 'Кормилица'},
        {name: 'weaningPigletsTab',       active: false, title: 'Отъем поросят'},
        {name: 'createGiltTab',           active: false, title: 'Биркование'},
        {name: 'sowCullingTab',           active: true, title: 'Выбытие свиноматок'},
        {name: 'pigletsCullingTab',       active: false, title: 'Выбытие поросят'},
        {name: 'pigletsInnerTransferTab', active: false, title: 'Перемещение поросят из клетки в клетку'},
        {name: 'searchSowTab',            active: false, title: 'Поиск по всем цехам'},
        {name: 'sowInnerTransferTab',     active: false, title: 'Перемещение свиноматок из клетки в клетку'},
        {name: 'sowTransferToWsTab',      active: false, title: 'Перегон свиноматок в цех1, цех3'},
        {name: 'sowAndPigletsTransferTab',active: false, title: 'Перемещение свиноматок вместе с поросятами из клетки в клетку'},
        {name: 'pigletsRecountTab',       active: false, title: 'Пересчет поросят'},
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
    let pigletsCellsGrid = 'col-2 '
    // console.log(this.props.state)
    return (
      <div className="">
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
            sow={this.props.state.sows.sow}
            listFetching={this.props.state.sows.fetching}
            sowsListError={this.props.state.sows.errorList}
            queryCount={this.props.state.sows.queryCount}
            getSowFromSows={this.props.getSowFromSows}

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
            resetLocations={this.props.resetLocations}
            
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

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsListError={this.props.state.locations.errorList}
            initLocations={this.props.resetLocations}

            sowAndPiglets={false}
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

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sow={this.props.state.sows.sow}
            sowsListFetching={this.props.state.sows.fetching}
            sowsErrorList={this.props.state.sows.errorList}
            errorSingle={this.props.state.sows.errorSingle}
            getByFarmIdSow={this.props.getByFarmIdSow}
            setSow={this.props.setSow}

            getFarrows={this.props.getFarrows}
            farrows={this.props.state.sows.farrows}

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

            errorSingle={this.props.state.sows.errorSingle}
            getByFarmIdSow={this.props.getByFarmIdSow}
            sow={this.props.state.sows.sow}
            setSow={this.props.setSow}

            getNurses={this.props.getNurses}
            nurses={this.props.state.sows.nurses}

            eventFetching={this.props.state.sows.eventFetching}
            markAsNurse={this.props.markAsNurse}
            eventError={this.props.state.sows.eventError}

            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}

        {activeTab.name === 'sowCullingTab' &&
          <WSSowCullingTab 
            workshopNumber={3}
            abort={true}

            sow={this.props.state.sows.sow}
            cycles={this.props.state.sows.cycles}

            getByFarmIdSow={this.props.getByFarmIdSow}
            singleSowFetching={this.props.state.sows.sowSingleFetching}
            errorSingle={this.props.state.sows.errorSingle}
            setSow={this.props.setSow}

            getSowCullings={this.props.getSowCullings}
            cullings={this.props.state.sows.cullings}

            cullingSow={this.props.cullingSow}
            abortionSow={this.props.abortionSow}
            eventError={this.props.state.sows.eventError}
            eventFetching={this.props.state.sows.eventFetching}
            message={this.props.state.sows.message}

            form={this.props.state.form.cullingSowForm}
            cullingSowFormResetID={this.props.cullingSowFormResetID}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}
        {activeTab.name === 'weaningPigletsTab' &&
          <WS3PigletsWeaningTab 
            user={this.props.state.auth.user}
            grid={pigletsCellsGrid}

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
            sowsListFetching={this.props.state.sows.fetching}
            sowsErrorList={this.props.state.sows.errorList}

            getByFarmIdSow={this.props.getByFarmIdSow}
            singleSowFetching={this.props.state.sows.sowSingleFetching}
            errorSingle={this.props.state.sows.errorSingle}
            sow={this.props.state.sows.sow}
            setSow={this.props.setSow}

            createGilt={this.props.createGilt}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.eventError}
            message={this.props.state.sows.message}

            giltJournal={this.props.state.wsData.gilt_journal}
            getGiltJournal={this.props.getGiltJournal}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}

            form={this.props.state.form.createGiltForm}
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

            form={this.props.state.form.cullingPigletsForm}
            cullingFormSetID={this.props.cullingFormSetID}

            grid={pigletsCellsGrid}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
        />}
        {activeTab.name === 'pigletsInnerTransferTab' &&
          <WSNomadInnerTransferTab
            user={this.props.state.auth.user}
            workshopNumber={3}
            grid={pigletsCellsGrid}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            listFetching={this.props.state.locations.fetching}
            locationsErrorList={this.props.state.locations.errorList}

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
            grid={'col-3 '}

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

        {activeTab.name === 'pigletsRecountTab' &&
          <WSPigletsRecountTab
            workshopNumber={3}
            user={this.props.state.auth.user}
            grid={pigletsCellsGrid}

            getRecountBalance={this.props.getRecountBalance}
            recountData={this.props.state.reports.recountData}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            resetLocations={this.props.resetLocations}

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

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsListError={this.props.state.locations.errorList}
            initLocations={this.props.resetLocations}

            sowAndPiglets={true}
            ws3TransferSowAndPiglets={this.props.ws3TransferSowAndPiglets}
            eventFetching={this.props.state.wsData.fetching}
            eventError={this.props.state.wsData.error}
            message={this.props.state.wsData.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}

        {activeTab.name === 'searchSowTab' &&
          <WSSowGlobalSearchTab 
            sow={this.props.state.sows.sow}
            cycles={this.props.state.sows.cycles}
            setSow={this.props.setSow}

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
  resetLocations: () => dispatch(LocationsActions.resetLocations()),

  //tours
  getTours: query => dispatch(ToursActions.getToursRequest(query)),

  //sows
  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  getSow: id => dispatch(SowsActions.getSowRequest(id)),
  setSow: sow => dispatch(SowsActions.setSow(sow)),
  getByFarmIdSow: query => dispatch(SowsActions.getSowByFarmIdRequest(query)),
  getSowFromSows: farm_id => dispatch(SowsActions.getSowFromSows(farm_id)),

  cullingSow: data => dispatch(SowsActions.cullingSowWs3Request(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyWs3Request(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowFarrow: data => dispatch(SowsActions.sowFarrowRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowWs3Request(id)),
  markAsNurse: id => dispatch(SowsActions.markAsNurseRequest(id)),
  createGilt: id => dispatch(SowsActions.createGiltRequest(id)),

  getSowCullings: query => dispatch(SowsActions.cullingsRequest(query)),
  getFarrows: query => dispatch(SowsActions.farrowsRequest(query)),
  getNurses: query => dispatch(SowsActions.nursesRequest(query)),
  
  sowsResetErrorsAndMessages: () => dispatch(SowsActions.sowsResetErrorsAndMessages()),

  //piglets
  getPiglets: query => dispatch(PigletsActions.getPigletsRequest(query)),
  mergeFromListPiglets: data => dispatch(PigletsActions.mergeFromListPigletsRequest(data)),
  mergeFromInitListPiglets: data => dispatch(PigletsActions.mergeFromInitListPigletsRequest(data)),
  movePiglets: query => dispatch(PigletsActions.movePigletsRequest(query)),
  cullingPiglets: data => dispatch(PigletsActions.cullingPigletsRequest(data)),
  recountPiglets: data => dispatch(PigletsActions.recountPigletsRequest(data)),

  cullingFormSetID: id => dispatch(change( "cullingPigletsForm", "id", id )),
  cullingSowFormResetID:() => dispatch(reset('cullingSowForm')),

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
