import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS3SowIncomeTab from '../../components/WorkshopThree/WS3SowIncomeTab'
import WS3SowInnerTransferTab from '../../components/WorkshopThree/WS3SowInnerTransferTab'
import WS3SowFarrowTab from '../../components/WorkshopThree/WS3SowFarrowTab'
import WS3SowWeaningTab from '../../components/WorkshopThree/WS3SowWeaningTab'
import WSSowCullingTab from '../../components/WorkshopTabs/WSSowCullingTab'

import WS3PigletsWeaningTab from '../../components/WorkshopThree/WS3PigletsWeaningTab'
import WS3CreateGiltTab from '../../components/WorkshopThree/WS3CreateGiltTab'
import WS3PigletsCullingTab from '../../components/WorkshopThree/WS3PigletsCullingTab'
import WS3PigletsRecountTab from '../../components/WorkshopThree/WS3PigletsRecountTab'

// # actions
import SowsActions from '../../redux/redux-sauce/sows';
import SectionsActions from '../../redux/redux-sauce/sections';
import LocationsActions from '../../redux/redux-sauce/locations';
import NewbornPigletsActions from '../../redux/redux-sauce/newbornPiglets';
import NomadPigletsActions from '../../redux/redux-sauce/nomadPiglets';


class WorkshopThreeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        balanceTab: false,
        returnPigletsTab: false,
        comingSowsTab: true,
        transferTab: false,
        farrowTab: false,
        weaningSowsTab: false,
        recountTab: false,
        weaningPigletsTab: false,
        createGiltTab: false,
        sowCullingTab: false,
        pigletsCullingTab: false,
      }
    }
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
          Цех №3
        </div>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.balanceTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('balanceTab')}
          >
            БАЛАНС
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
          <div className={this.state.tabs.transferTab ? 'workshop-tab tab-active col-sm' :
           'workshop-tab col-sm'}
            onClick={() => this.setTab('transferTab')}
          >
            Внутреннее перемещение
          </div>
          <div className={this.state.tabs.farrowTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('farrowTab')}
          >
            ОПОРОС
          </div>
          <div className={this.state.tabs.recountTab ? 'workshop-tab tab-active col-sm' : 
            'workshop-tab col-sm'}
            onClick={() => this.setTab('recountTab')}
          >
            Пересчет
          </div>
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
        { this.state.tabs.comingSowsTab && 
          <WS3SowIncomeTab 
            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            listFetching={this.props.state.sows.fetching}

            getSow={this.props.getSow}
            sow={this.props.state.sows.sow}
            sowFetching={this.props.state.sows.sowSingleFetching}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

            sowMoveTo={this.props.sowMoveTo}
            eventFetching={this.props.state.sows.eventFetching}

          />}

        { this.state.tabs.transferTab && 
          <WS3SowInnerTransferTab 
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}

            getLocations1={this.props.getLocations}
            locations1={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            
            getLocations2={this.props.getLocationsAdditional}
            locations2={this.props.state.locations.additional_list}
            locationsAddFetching={this.props.state.locations.fetchingAdditional}

            sowMoveTo={this.props.sowMoveTo}
            eventFetching={this.props.state.sows.eventFetching}
          />}

        { this.state.tabs.farrowTab && 
          <WS3SowFarrowTab 
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

            sowFarrow={this.props.sowFarrow}
            eventFetching={this.props.state.sows.eventFetching}
          />}

        { this.state.tabs.weaningSowsTab && 
          <WS3SowWeaningTab 
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

            eventFetching={this.props.state.sows.eventFetching}
            massMove={this.props.sowsMoveMany}
          />}

        { this.state.tabs.sowCullingTab && 
          <WSSowCullingTab 
            workshopNumber={3}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            listFetching={this.props.state.sows.fetching}

            getSow={this.props.getSow}
            sow={this.props.state.sows.sow}
            tours_info={this.props.state.sows.tours_info}
            singleFetching={this.props.state.sows.sowSingleFetching}

            eventFetching={this.props.state.sows.eventFetching}
            cullingSow={this.props.cullingSow}
            abortionSow={this.props.abortionSow}
          />}

        { this.state.tabs.weaningPigletsTab && 
          <WS3PigletsWeaningTab 
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            
            mergeNewbornPiglets={this.props.mergeNewbornPiglets}
            megreFetching={this.props.state.newbornPiglets.eventFetching}

            getNomadPiglets={this.props.getNomadPiglets}
            nomadPiglets={this.props.state.nomadPiglets.list}

            moveNomadPiglets={this.props.moveNomadPiglets}
            moveNomadFetching={this.props.state.nomadPiglets.eventFetching}
          />}

        { this.state.tabs.createGiltTab && 
          <WS3CreateGiltTab 
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            
            createGilt={this.props.createGilt}
            eventFetching={this.props.state.newbornPiglets.eventFetching}
            message={this.props.state.newbornPiglets.message}
          />}

        { this.state.tabs.pigletsCullingTab && 
          <WS3PigletsCullingTab
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            
            cullingPiglets={this.props.cullingPiglets}
            cullingGilt={this.props.cullingGilt}
            eventFetching={this.props.state.newbornPiglets.eventFetching}
            message={this.props.state.newbornPiglets.message}
          />}
        { this.state.tabs.recountTab && 
          <WS3PigletsRecountTab
            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            
            recountPiglets={this.props.recountPiglets}
            eventFetching={this.props.state.newbornPiglets.eventFetching}
            message={this.props.state.newbornPiglets.message}
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

  //sows
  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  getSow: id => dispatch(SowsActions.getSowRequest(id)),
  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowFarrow: data => dispatch(SowsActions.sowFarrowRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowRequest(id)),

  // newborn piglets
  getNewbornPiglets: query => dispatch(NewbornPigletsActions.getNewbornPigletsRequest(query)),
  mergeNewbornPiglets: data => dispatch(NewbornPigletsActions.mergeNewbornPigletsRequest(data)),
  createGilt: data => dispatch(NewbornPigletsActions.createGiltRequest(data)),
  cullingPiglets: data => dispatch(NewbornPigletsActions.cullingNewbornPigletsRequest(data)),
  cullingGilt: data => dispatch(NewbornPigletsActions.cullingGiltNewbornPigletsRequest(data)),
  recountPiglets: data => dispatch(NewbornPigletsActions.recountNewbornPigletsRequest(data)),

  //nomad piglets
  getNomadPiglets: query => dispatch(NomadPigletsActions.getNomadPigletsRequest(query)),
  moveNomadPiglets: data => dispatch(NomadPigletsActions.moveToPigletsRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopThreeContainer);
