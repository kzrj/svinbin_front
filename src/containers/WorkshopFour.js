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
import SectionsActions from '../redux/redux-sauce/sections';
import LocationsActions from '../redux/redux-sauce/locations';
import PigletsActions from '../redux/redux-sauce/piglets';
import ReportsActions from '../redux/redux-sauce/reports';
import InputsActions from '../redux/redux-sauce/inputs';


class WorkshopFourContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {name: 'incomeTab',        active: false, title: 'Поступление и взвешивание'},
        {name: 'resettlementTab',  active: false, title: 'Размещение прибывших'},
        {name: 'innerTransferTab', active: false, title: 'Внутреннее перемещение'},
        {name: 'transferTab',      active: false, title: 'Перегон'},
        {name: 'cullingTab',       active: false, title: 'Выбытие/Убой'},
        {name: 'pigletsRecountTab',active: false,  title: 'Пересчет поросят'},
        {name: 'infoTab',          active: true, title: 'Инфо'},
      ],
    };
    this.setTab = this.setTab.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
  }

  componentDidMount() {
    this.props.getSections({sections_by_workshop_number:4, sections: true})
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
    let grid = 'col-5 '

    return (
      <div className="">
        <TabMenu 
          tabs={this.state.tabs} setTab={this.setTab} workshop={'Цех №4'} activeTab={activeTab}
          user={this.props.state.auth.user}
        />

        { activeTab.name === 'incomeTab' &&
          <WSNomadIncomeTab 
            workshopNumber={4}
            weighingPlace={'3/4'}
            returnLocation={3}
            user={this.props.state.auth.user}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.piglets.list}
            listFetching={this.props.state.piglets.listFetching}
            listError={this.props.state.piglets.errorList}

            // recountWeighingPiglets={this.props.recountWeighingPiglets}
            weighingPiglets={this.props.weighingPiglets}
            weighingData={this.props.state.piglets.weighing}
            initPiglets={this.props.initPiglets}
            eventError={this.props.state.piglets.eventError}
            eventFetching={this.props.state.piglets.eventFetching}
            message={this.props.state.piglets.message}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
          />}

        { activeTab.name === 'resettlementTab' &&
          <WSNomadResettelmentTab 
            workshopNumber={4}
            weighingPlace={'3/4'}
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
            workshopNumber={4}
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
            workshopNumber={4}
            toLocation={8}
            toLocations={null}
            buttonName={'Отправить в Цех8'}
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

            movePiglets={this.props.movePiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
        />}

        { activeTab.name === 'cullingTab' &&
          <WSNomadCullingTab
            user={this.props.state.auth.user}
            workshopNumber={4}
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
            cullingTypes={[{value:'padej', label: 'Падеж'}, {value:'prirezka', label: 'Прирезка'},
              {value: 'vinuzhd', label: 'Вынужденный убой'}]}
            recountPiglets={this.props.recountPiglets}
            eventFetching={this.props.state.piglets.eventFetching}
            eventError={this.props.state.piglets.eventError}
            message={this.props.state.piglets.message}

            form={this.props.state.form.cullingPigletsForm}
            grid={grid}

            pigletsResetErrorsAndMessages={this.props.pigletsResetErrorsAndMessages}
        />}

        { this.props.state.auth.user.is_officer && activeTab.name === 'pigletsRecountTab' &&
          <WSPigletsRecountTab
            workshopNumber={3}
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
          <InfoTab ws_number={'4'}/>
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
  dispatch: dispatch,
  // locations
  getSections: query => dispatch(SectionsActions.getSectionsRequest(query)),
  getLocations: query => dispatch(LocationsActions.getLocationsRequest(query)),
  getLocationsAdditional: query => dispatch(LocationsActions.getLocationsAdditionalRequest(query)),

  //piglets
  getPiglets: query => dispatch(PigletsActions.getPigletsRequest(query)),
  movePiglets: query => dispatch(PigletsActions.movePigletsRequest(query)),
  weighingPiglets: query => dispatch(PigletsActions.weighingPigletsRequest(query)),
  recountWeighingPiglets: query => dispatch(PigletsActions.recountWeighingPigletsRequest(query)),
  cullingPiglets: query => dispatch(PigletsActions.cullingPigletsRequest(query)),
  pigletsResetErrorsAndMessages: () => dispatch(PigletsActions.pigletsResetErrorsAndMessages()),
  initPiglets: data => dispatch(PigletsActions.initPigletsRequest(data)),
  recountPiglets: data => dispatch(PigletsActions.recountPigletsRequest(data)),

  // info
  getOperationsReport: (token) => dispatch(ReportsActions.getOperationsReportRequest(token)),
  getWsReportPigsCount: () => dispatch(ReportsActions.getWsReportPigsCountRequest()),

  // inputs
  changeOperationsInputs: data => dispatch(InputsActions.changeOperationsInputs(data)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopFourContainer);
