import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WSNomadCullingTab from '../components/PigletsTabs/WSNomadCullingTab'
import WSNomadTransferTab from '../components/PigletsTabs/WSNomadTransferTab'
import WSNomadInnerTransferTab from '../components/PigletsTabs/WSNomadInnerTransferTab'
import WSNomadResettelmentTab from '../components/PigletsTabs/WSNomadResettelmentTab'
import WSNomadIncomeTab from '../components/PigletsTabs/WSNomadIncomeTab'
import { WhoIs }  from '../components/CommonComponents'

// actions
import SectionsActions from '../redux/redux-sauce/sections';
import LocationsActions from '../redux/redux-sauce/locations';
import PigletsActions from '../redux/redux-sauce/piglets';


class WorkshopFourContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        incomeTab: false,
        resettlementTab: false,
        innerTransferTab: true,
        transferTab: false,
        cullingTab: false,
        // infoTab: false,
      }
    };
    this.setTab = this.setTab.bind(this);
  }

  componentDidMount() {
    this.props.getSections({workshop: 4})
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

  showStateConsole = () => {
    const { state } = this.props
    console.log(state)
  }

  render() {
    return (
      <div className="workshop container-fluid">
        <div className='workshop-header'>
          Цех №4 
          {/* <button onClick={this.showStateConsole}>O</button> */}
          <WhoIs user={this.props.state.auth.user}/>
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
            workshopNumber={4}
            weighingPlace={'3/4'}

            getPiglets={this.props.getPiglets}
            piglets={this.props.state.piglets.list}
            listFetching={this.props.state.piglets.listFetching}

            weighingPiglets={this.props.weighingPiglets}
            weighingData={this.props.state.piglets.weighing}
            eventFetching={this.props.state.piglets.eventFetching}
            message={this.props.state.piglets.message}
          />}

        { this.state.tabs.resettlementTab &&
          <WSNomadResettelmentTab 
            workshopNumber={4}
            weighingPlace={'3/4'}

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
        />}

        { this.state.tabs.innerTransferTab &&
          <WSNomadInnerTransferTab
            workshopNumber={4}

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
            message={this.props.state.piglets.message}
        />}

        { this.state.tabs.transferTab &&
          <WSNomadTransferTab 
            workshopNumber={4}
            toLocation={5}
            buttonName={'Отправить в Цех8'}

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
        />}

        { this.state.tabs.cullingTab &&
          <WSNomadCullingTab
            workshopNumber={4}

            getSections={this.props.getSections}
            sections={this.props.state.sections.list}

            getLocations={this.props.getLocations}
            locations={this.props.state.locations.list}
            locationsFetching={this.props.state.locations.fetching}

            cullingPiglets={this.props.cullingPiglets}
            eventFetching={this.props.state.piglets.eventFetching}
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
  dispatch: dispatch,
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
)(WorkshopFourContainer);
