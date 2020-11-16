import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WSNomadCullingTab from '../components/PigletsTabs/WSNomadCullingTab'
import WSNomadTransferTab from '../components/PigletsTabs/WSNomadTransferTab'
import WSNomadInnerTransferTab from '../components/PigletsTabs/WSNomadInnerTransferTab'
import WSNomadResettelmentTab from '../components/PigletsTabs/WSNomadResettelmentTab'
import WSNomadIncomeTab from '../components/PigletsTabs/WSNomadIncomeTab'
import WSPigletsRecountTab from '../components/PigletsTabs/WSPigletsRecountTab'
import InfoTab from '../containers/InfoTab'

import { TabMenu }  from '../components/CommonComponents'

// actions
import { change } from "redux-form";
import SectionsActions from '../redux/redux-sauce/sections';
import LocationsActions from '../redux/redux-sauce/locations';
import PigletsActions from '../redux/redux-sauce/piglets';
import ReportsActions from '../redux/redux-sauce/reports';
import InputsActions from '../redux/redux-sauce/inputs';


class WorkshopSevenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {name: 'incomeTab',        active: false, title: 'Поступление и взвешивание'},
        {name: 'resettlementTab',  active: false, title: 'Размещение прибывших'},
        {name: 'innerTransferTab', active: false, title: 'Внутреннее перемещение'},
        {name: 'transferTab',      active: false, title: 'Перегон ремонт'},
        {name: 'cullingTab',       active: false, title: 'Выбытие'},
        // {name: 'pigletsRecountTab',active: false,  title: 'Пересчет поросят'},
        {name: 'infoTab',          active: true, title: 'Инфо'},
      ],
    };
    this.setTab = this.setTab.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
  }

  componentDidMount() {
    this.props.getSections({sections_by_workshop_number:7, sections: true})
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
    const grid = 'col-4 '
    return (
      <div className="">
        <TabMenu 
          tabs={this.state.tabs} setTab={this.setTab} workshop={'Цех №7'} activeTab={activeTab}
          user={this.props.state.auth.user}
        />
        { activeTab.name === 'incomeTab' &&
          <WSNomadIncomeTab 
            user={this.props.state.auth.user}
            workshopNumber={7}
            weighingPlace={'8/7'}
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
            form={this.props.state.form.weighingPigletsForm}
          />}

        { activeTab.name === 'resettlementTab' &&
          <WSNomadResettelmentTab 
            workshopNumber={7}
            weighingPlace={'8/7'}
            user={this.props.state.auth.user}
            grid={grid}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.piglets.list}
            listFetching={this.props.state.piglets.listFetching}
            listError={this.props.state.piglets.errorList}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsListError={this.props.state.locations.errorList}

            movePiglets={this.props.movePiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
        />}

        { activeTab.name === 'innerTransferTab' &&
          <WSNomadInnerTransferTab
            workshopNumber={7}
            user={this.props.state.auth.user}
            grid={grid}

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

        { activeTab.name === 'transferTab' &&
          <WSNomadTransferTab 
            workshopNumber={7}
            toLocation={2}
            toLocations={null}
            buttonName={'Отправить в ремонтных в цех 1-2'}
            user={this.props.state.auth.user}
            grid={grid}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.piglets.list}
            listFetching={this.props.state.piglets.listFetching}
            listError={this.props.state.piglets.errorList}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsErrorList={this.props.state.locations.errorList}

            movePiglets={this.props.moveGiltsToWs12}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
        />}

        { activeTab.name === 'cullingTab' &&
          <WSNomadCullingTab
            user={this.props.state.auth.user}
            workshopNumber={7}
            grid={grid}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}
            sectionsFetching={this.props.state.sections.fetching}
            sectionsListError={this.props.state.sections.errorList}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}
            locationsErrorList={this.props.state.locations.errorList}

            cullingPiglets={this.props.cullingPiglets}
            cullingTypes={[{value:'padej', label: 'Падеж'}, {value:'spec', label: 'Спец. убой'},
             {value: 'vinuzhd', label: 'Вынужденный убой'}]}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}

            form={this.props.state.form.cullingPigletsForm}
            cullingFormSetID={this.props.cullingFormSetID}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
        />}

        { this.props.state.auth.user.is_officer && activeTab.name === 'pigletsRecountTab' &&
          <WSPigletsRecountTab
            workshopNumber={7}
            user={this.props.state.auth.user}
            grid={grid}

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

        {activeTab.name === 'infoTab' &&
          <InfoTab ws_number={'7'}/>
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
  pigletsResetErrorsAndMessages: () => dispatch(PigletsActions.pigletsResetErrorsAndMessages()),
  moveGiltsToWs12: data => dispatch(PigletsActions.moveGiltsToWs12Request(data)),
  cullingFormSetID: id => dispatch(change( "cullingPigletsForm", "id", id )),

  // info
  getOperationsReport: (token) => dispatch(ReportsActions.getOperationsReportRequest(token)),
  getWsReportPigsCount: () => dispatch(ReportsActions.getWsReportPigsCountRequest()),

  // inputs
  changeOperationsInputs: data => dispatch(InputsActions.changeOperationsInputs(data)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopSevenContainer);
