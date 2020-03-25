import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WSSowTransferToWSTab from '../components/SowTabs/WSSowTransferToWSTab'
import WSSowCullingTab from '../components/SowTabs/WSSowCullingTab'
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
        {name: 'transferTab', active: true, title: 'Перегон'},
        {name: 'ultrasoundTab',           active: false, title: 'УЗИ 35'},
        {name: 'cullingTab',          active: false, title: 'Выбраковка'},
        {name: 'searchSowTab',        active: false, title: 'Поиск по всем цехам'},
        {name: 'initAndTransferTab',     active: false, title: 'Инициализация для Цеха 3'},
        // {name: 'infoTab',             active: false, title: 'Инфо'},
      ]
    }
    this.setTab = this.setTab.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
  }
  
  componentDidMount() {
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
    })

    return activeTab
  }

  render() {
    const activeTab = this.getActiveTab()

    return (
      <div className="workshop container-fluid">
        <TabMenu 
          tabs={this.state.tabs} setTab={this.setTab} workshop={'Цех №2'} activeTab={activeTab}
          user={this.props.state.auth.user}
        />

        { activeTab.name === 'transferTab' &&
          <WSSowTransferToWSTab
            workshopNumber={2}
            to_locations={[{id: 1, number: 1}, {id:3, number: 3}]}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massMove={this.props.sowsMoveMany}
            eventFetching={this.props.state.sows.eventFetching}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}

        { activeTab.name === 'ultrasoundTab' &&
          <WSSowUltrasoundTab
            workshopNumber={2}
            days={35}
            daysValue={60}
            statusTitleFilter={'Супорос 30'}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massUltrasound={this.props.massUltrasound}
            eventFetching={this.props.state.sows.eventFetching}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}

        { activeTab.name === 'cullingTab' &&
          <WSSowCullingTab
            workshopNumber={2}
            abort={false}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}

            getSow={this.props.getSow}
            sow={this.props.state.sows.sow}
            tours_info={this.props.state.sows.tours_info}
            singleSowFetching={this.props.state.sows.sowSingleFetching}

            cullingSow={this.props.cullingSow}
            abortionSow={this.props.abortionSow}
            eventFetching={this.props.state.sows.eventFetching}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />}

        {activeTab.name === 'searchSowTab' &&
          <WSSowGlobalSearchTab 
            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}

            getSow={this.props.getSow}
            setSow={this.props.setSow}

            sow={this.props.state.sows.sow}
            tours_info={this.props.state.sows.tours_info}
            singleSowFetching={this.props.state.sows.sowSingleFetching}

            eventError={this.props.state.sows.eventError}
            eventFetching={this.props.state.sows.eventFetching}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
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
  getSow: id => dispatch(SowsActions.getSowRequest(id)),
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
