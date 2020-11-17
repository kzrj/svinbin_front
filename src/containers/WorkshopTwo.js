import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WSSowTransferToWSTab from '../components/SowTabs/WSSowTransferToWSTab'
import WS12SowCullingTab from '../components/SowTabs/WS12SowCullingTab'
import WSSowUltrasoundTab from '../components/SowTabs/WSSowUltrasoundTab'
import WS2CreateTransferTab from '../components/SowTabs/WS2CreateTransferTab'
import WSSowGlobalSearchTab from '../components/SowTabs/WSSowGlobalSearchTab'
import { WhoIs }  from '../components/CommonComponents'

import { TabMenu }  from '../components/CommonComponents'

// actions
import SowsActions from '../redux/redux-sauce/sows';
import ToursActions from '../redux/redux-sauce/tours';


class WorkshopTwoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {name: 'transferTab',         active: false, title: 'Перегон'},
        {name: 'ultrasoundTab',       active: false, title: 'УЗИ 35'},
        {name: 'cullingTab',          active: true,  title: 'Выбытие'},
        {name: 'searchSowTab',        active: false, title: 'Поиск по всем цехам'},
        // {name: 'initAndTransferTab',     active: false, title: 'Инициализация для Цеха 3'},
        // {name: 'infoTab',             active: false, title: 'Инфо'},
      ],
      online: true,
    }
    this.setTab = this.setTab.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
  }
  
  componentDidMount() {
    this.props.getTours({by_workshop_number: 2})
    window.addEventListener('offline', this.handleNetworkChange);
    window.addEventListener('online', this.handleNetworkChange);
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.handleNetworkChange);
    window.removeEventListener('online', this.handleNetworkChange);
  }

  handleNetworkChange = () => {
    this.setState({ online: window.navigator.onLine });
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
  // {this.state.online 
  //   ? <span style={{"color": "green", "float": "left"}}>Online</span> 
  //   : <span style={{"color": "red", "float": "left"}}>Offline</span>}

  render() {
    const activeTab = this.getActiveTab()

    return (
      <div className="workshop container-fluid">
        <TabMenu 
          tabs={this.state.tabs} setTab={this.setTab} workshop={'Цех №2'} activeTab={activeTab}
          user={this.props.state.auth.user} online={this.state.online}
        />

        { activeTab.name === 'transferTab' &&
          <WSSowTransferToWSTab
            workshopNumber={2}
            to_locations={[{id: 1, number: 1}, {id:3, number: 3}]}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}
            errorList={this.props.state.sows.errorList}
            queryCount={this.props.state.sows.queryCount}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massMove={this.props.sowsMoveMany}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.eventError}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}

        { activeTab.name === 'ultrasoundTab' &&
          <WSSowUltrasoundTab
            workshopNumber={2}
            days={35}
            daysValue={60}
            statusTitleFilter={'Супорос 28'}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}
            queryCount={this.props.state.sows.queryCount}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massUltrasound={this.props.massUltrasound}
            abortionSow={this.props.abortionSow}
            eventFetching={this.props.state.sows.eventFetching}
            eventError={this.props.state.sows.eventError}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}

        { activeTab.name === 'cullingTab' &&
          <WS12SowCullingTab
            workshopNumber={2}
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
            massCulling={this.props.massCulling}
            abortionSow={this.props.abortionSow}
            eventError={this.props.state.sows.eventError}
            eventFetching={this.props.state.sows.eventFetching}
            message={this.props.state.sows.message}

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

        { activeTab.name === 'initAndTransferTab' &&
          <WS2CreateTransferTab
            massInitTransfer={this.props.massInitTransfer}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
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
  getTours: query => dispatch(ToursActions.getToursRequest(query)),
  
  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  setSow: sow => dispatch(SowsActions.setSow(sow)),
  getSow: id => dispatch(SowsActions.getSowRequest(id)),
  getByFarmIdSow: query => dispatch(SowsActions.getSowByFarmIdRequest(query)),

  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),  
  massUltrasound: data => dispatch(SowsActions.massUltrasoundRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowRequest(id)),
  massInitTransfer: data => dispatch(SowsActions.massInitTransferRequest(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),  
  sowsResetErrorsAndMessages: () => dispatch(SowsActions.sowsResetErrorsAndMessages()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopTwoContainer);
