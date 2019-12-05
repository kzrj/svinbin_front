import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS3SowIncomeTab from '../components/WorkshopThree/WS3SowIncomeTab'
import WS3SowTransferCellToWsTab from '../components/WorkshopThree/WS3SowTransferCellToWsTab'
import WS3SowInnerTransferTab from '../components/WorkshopThree/WS3SowInnerTransferTab'
import WS3SowFarrowTab from '../components/WorkshopThree/WS3SowFarrowTab'
import WS3SowWeaningTab from '../components/WorkshopThree/WS3SowWeaningTab'
import WSSowCullingTab from '../components/SowTabs/WSSowCullingTab'

import WS3PigletsWeaningTab from '../components/WorkshopThree/WS3PigletsWeaningTab'
import WS3CreateGiltTab from '../components/WorkshopThree/WS3CreateGiltTab'
import WS3PigletsCullingTab from '../components/WorkshopThree/WS3PigletsCullingTab'
import WS3PigletsRecountTab from '../components/WorkshopThree/WS3PigletsRecountTab'
import WS3InfoTab from '../components/WorkshopThree/WS3InfoTab'

import { WhoIs }  from '../components/CommonComponents'

// # actions
import SowsActions from '../redux/redux-sauce/sows';
import SectionsActions from '../redux/redux-sauce/sections';
import LocationsActions from '../redux/redux-sauce/locations';
import PigletsActions from '../redux/redux-sauce/piglets';
import ToursActions from '../redux/redux-sauce/tours';
import WsDataActions from '../redux/redux-sauce/wsData';


class WorkshopThreeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        balanceTab: false,
        returnPigletsTab: false,
        comingSowsTab: false,
        transferTab: false,
        transferCellToWsTab: false,
        farrowTab: false,
        weaningSowsTab: false,
        recountTab: false,
        weaningPigletsTab: false,
        createGiltTab: true,
        sowCullingTab: false,
        pigletsCullingTab: false,
      }
    }
    this.setTab = this.setTab.bind(this);
  }
  
  componentDidMount() {
    this.props.getSections({workshop: 3})
    this.props.getTours()
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
      <div className="workshop container-fluid">
        <div className='workshop-header'>
          Цех №3
          <button onClick={() => console.log(this.props.state)}>00</button>
          {/* <button onClick={() => this.props.setSow()}>223</button> */}
          <WhoIs user={this.props.state.auth.user}/>
        </div>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.balanceTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('balanceTab')}
          >
            ИНФО
          </div>
          <div className={this.state.tabs.returnPigletsTab ? 'workshop-tab tab-active col-sm' :
           'workshop-tab col-sm'}
            onClick={() => this.setTab('returnPigletsTab')}
          >
            Возврат поросята
          </div>
          <div className={this.state.tabs.comingSowsTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('comingSowsTab')}
          >
            Поступление матки
          </div>
          {/* <div className={this.state.tabs.transferCellToWsTab ? 'workshop-tab tab-active col-sm' :
           'workshop-tab col-sm'}
            onClick={() => this.setTab('transferCellToWsTab')}
          >
            Внутреннее перемещение(из клетки в цех)
          </div> */}
          {/* <div className={this.state.tabs.transferTab ? 'workshop-tab tab-active col-sm' :
           'workshop-tab col-sm'}
            onClick={() => this.setTab('transferTab')}
          >
            Внутреннее перемещение
          </div> */}
          <div className={this.state.tabs.farrowTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('farrowTab')}
          >
            ОПОРОС
          </div>
          {/* <div className={this.state.tabs.recountTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('recountTab')}
          >
            Пересчет
          </div> */}
          <div className={this.state.tabs.weaningSowsTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('weaningSowsTab')}
          >
            Отъем свиноматки
          </div>
          <div className={this.state.tabs.weaningPigletsTab ? 'workshop-tab tab-active col-sm' :
           'workshop-tab col-sm'}
            onClick={() => this.setTab('weaningPigletsTab')}
          >
            Отъем поросята
          </div>
          <div className={this.state.tabs.createGiltTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('createGiltTab')}
          >
            Биркование
          </div>
          <div className={this.state.tabs.sowCullingTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('sowCullingTab')}
          >
            Выбраковка/Аборт
          </div>
          <div className={this.state.tabs.pigletsCullingTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('pigletsCullingTab')}
          >
            Выбраковка поросят
          </div>
        </div>
        <div className='workshop-header-3'>
        </div>
        { this.state.tabs.balanceTab && 
          <WS3InfoTab 
            getInfoWs3={this.props.getInfoWs3}
            infoData={this.props.state.wsData.info_ws3}
            fetching={this.props.state.wsData.fetching}
            error={this.props.state.wsData.error}
          />}

        { this.state.tabs.comingSowsTab && 
          <WS3SowIncomeTab 
            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            listFetching={this.props.state.sows.fetching}
            sowsListError={this.props.state.sows.errorList}

            getSow={this.props.getSow}
            sow={this.props.state.sows.sow}
            sowFetching={this.props.state.sows.sowSingleFetching}
            sowsSingleError={this.props.state.sows.errorSingle}
            setSow={this.props.setSow}

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
            eventError={this.props.state.sows.errorEvent}
          />}

        { this.state.tabs.transferCellToWsTab && 
          <WS3SowTransferCellToWsTab 
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations1={this.props.getLocations}
            locations1={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsListError={this.props.state.locations.errorList}
            
            sowMoveTo={this.props.sowMoveTo}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.errorEvent}
            message={this.props.state.sows.message}
          />}

        { this.state.tabs.transferTab && 
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
            eventError={this.props.state.sows.errorEvent}
            message={this.props.state.sows.message}
          />}

        { this.state.tabs.farrowTab && 
          <WS3SowFarrowTab
            workshopNumber={3}
            statusTitleFilter={'Супорос 35'}
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

            sowFarrow={this.props.sowFarrow}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.errorEvent}
            message={this.props.state.sows.message}
          />}

        { this.state.tabs.weaningSowsTab && 
          <WS3SowWeaningTab
            workshopNumber={3}
            statusTitleFilter={''}
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
            error={this.props.state.sows.error}
            eventError={this.props.state.sows.errorEvent}

            message={this.props.state.sows.message}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}
            toursFetching={this.props.state.tours.fetching}
            toursError={this.props.state.tours.error}
          />}

        { this.state.tabs.sowCullingTab && 
          <WSSowCullingTab 
            workshopNumber={3}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            listFetching={this.props.state.sows.fetching}
            sowsListError={this.props.state.sows.errorList}

            getSow={this.props.getSow}
            sow={this.props.state.sows.sow}
            tours_info={this.props.state.sows.tours_info}
            singleFetching={this.props.state.sows.sowSingleFetching}
            sowsSingleError={this.props.state.sows.errorSingle}

            eventFetching={this.props.state.sows.eventFetching}
            cullingSow={this.props.cullingSow}
            abortionSow={this.props.abortionSow}
            eventError={this.props.state.sows.errorEvent}
          />}

        { this.state.tabs.weaningPigletsTab && 
          <WS3PigletsWeaningTab 
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsListError={this.props.state.locations.errorList}
            
            getPiglets={this.props.getPiglets}
            listPiglets={this.props.state.piglets.list}
            listError={this.props.state.piglets.errorList}

            mergeFromListPiglets={this.props.mergeFromListPiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            eventMessage={this.props.state.piglets.message}
          />}

        { this.state.tabs.createGiltTab && 
          <WS3CreateGiltTab 
            workshopNumber={3}
            // statusTitleFilter={'Супорос 35'}
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
            eventError={this.props.state.sows.errorEvent}
            message={this.props.state.sows.message}
          />}

        {/* { this.state.tabs.pigletsCullingTab && 
          <WS3PigletsCullingTab
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsListError={this.props.state.locations.errorList}
            
            cullingPiglets={this.props.cullingPiglets}
            cullingGilt={this.props.cullingGilt}
            eventFetching={this.props.state.newbornPiglets.eventFetching}
            eventError={this.props.state.newbornPiglets.errorEvent}
            message={this.props.state.newbornPiglets.message}
          />} */}

        {/* { this.state.tabs.recountTab && 
          <WS3PigletsRecountTab
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsListError={this.props.state.locations.errorList}
            
            recountPiglets={this.props.recountPiglets}
            eventFetching={this.props.state.newbornPiglets.eventFetching}
            eventError={this.props.state.newbornPiglets.errorEvent}
            message={this.props.state.newbornPiglets.message}

            getBalancesbyTours={this.props.getBalancesbyToursWs3}
            balancesData={this.props.state.wsData.balances_by_tours}
            balancesFetching={this.props.state.wsData.fetching}
            balancesMessage={this.props.state.wsData.message}
            wsDataError={this.props.state.wsData.error}
          />} */}
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
  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowFarrow: data => dispatch(SowsActions.sowFarrowRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowRequest(id)),
  markAsNurse: id => dispatch(SowsActions.markAsNurseRequest(id)),
  createGilt: data => dispatch(SowsActions.createGiltRequest(data)),
  setSow: () => dispatch(SowsActions.setSow()),

  //piglets
  getPiglets: query => dispatch(PigletsActions.getPigletsRequest(query)),
  mergeFromListPiglets: data => dispatch(PigletsActions.mergeFromListPigletsRequest(data)),

  // info
  getInfoWs3: () => dispatch(WsDataActions.getInfoWs3Request()),
  getBalancesbyToursWs3: () => dispatch(WsDataActions.getBalancesByToursWs3Request())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopThreeContainer);
