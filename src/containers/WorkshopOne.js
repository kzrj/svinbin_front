import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS1Semination12Tab from '../components/SowTabs/WS1Semination12Tab'
import WS1CreateTab from '../components/SowTabs/WS1CreateTab'
import WSSowTransferToWSTab from '../components/SowTabs/WSSowTransferToWSTab'
import WSSowCullingTab from '../components/SowTabs/WSSowCullingTab'
import WSSowUltrasoundTab from '../components/SowTabs/WSSowUltrasoundTab'
import WSSowGlobalSearchTab from '../components/SowTabs/WSSowGlobalSearchTab'
import WS1ImportSeminationTab from '../components/SowTabs/WS1ImportSeminationTab'

import { TabMenu }  from '../components/CommonComponents'

// actions
import SowsActions from '../redux/redux-sauce/sows';
import ToursActions from '../redux/redux-sauce/tours';
import WsDataActions from '../redux/redux-sauce/wsData';


class WorkshopOneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        // {name: 'semination12Tab',     active: false, title: 'Осеменение'},
        {name: 'importSeminationTab', active: false, title: 'Импорт из Фарма'},
        {name: 'createTab',           active: false, title: 'Создание свиноматок'},
        {name: 'ultrasound30Tab',     active: false, title: 'УЗИ 28'},
        {name: 'ultrasound60Tab',     active: false, title: 'УЗИ 35'},
        {name: 'transferToWS2Tab',    active: true, title: 'Перегон'},
        {name: 'cullingTab',          active: false, title: 'Выбраковка'},
        {name: 'searchSowTab',        active: false, title: 'Поиск по всем цехам'},
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
          tabs={this.state.tabs} setTab={this.setTab} workshop={'Цех №1'} activeTab={activeTab}
          user={this.props.state.auth.user}
        />

        {activeTab.name === 'importSeminationTab' &&
          <WS1ImportSeminationTab 
            eventFetching={this.props.state.wsData.fetching}
            uploadFile={this.props.uploadFile}

            message={this.props.state.wsData.message}
            eventError={this.props.state.wsData.error}

            responseData={this.props.state.wsData.import_from_file_data}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}/>
          }

        {activeTab.name === 'createTab' &&
          <WS1CreateTab 
            getSows={this.props.getSows}
            sows={this.props.state.sows.list}

            createNewSow={this.props.createNewSow}
            sow={this.props.state.sows.createdSow}

            nonameSow={this.props.state.sows.createdNonameSow}
            nonameSowsCount={this.props.state.sows.nonameSowsCount}
            createNewNonameSow={this.props.createNewNonameSow}

            eventError={this.props.state.sows.eventError}
            eventFetching={this.props.state.sows.eventFetching}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />
        }

        {activeTab.name === 'ultrasound30Tab' &&
          <WSSowUltrasoundTab
            workshopNumber={1}
            days={28}
            daysValue={30}
            statusTitleFilter={'Осеменена 2'}
          
            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            abortionSow={this.props.abortionSow}
            massUltrasound={this.props.massUltrasound}
            eventError={this.props.state.sows.eventError}
            eventFetching={this.props.state.sows.eventFetching}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />
        }

        {activeTab.name === 'ultrasound60Tab' &&
          <WSSowUltrasoundTab
            workshopNumber={1}
            days={35}
            daysValue={60}
            statusTitleFilter={'Супорос 28'}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            abortionSow={this.props.abortionSow}
            massUltrasound={this.props.massUltrasound}
            eventError={this.props.state.sows.eventError}
            eventFetching={this.props.state.sows.eventFetching}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />
        }

        {activeTab.name === 'transferToWS2Tab' &&
          <WSSowTransferToWSTab
            workshopNumber={1}
            to_locations={[{id:2, number: 2}]}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massMove={this.props.sowsMoveMany}
            eventError={this.props.state.sows.eventError}
            eventFetching={this.props.state.sows.eventFetching}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />
        }

        {activeTab.name === 'cullingTab' &&
          <WSSowCullingTab 
            workshopNumber={1}
            abort={false}

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
          />
        }

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

        {/* { this.state.tabs.semination12Tab && 
          <WS1Semination12Tab 
            getSows={this.props.getSeminationSows}
            sows={this.props.state.ws1.seminationList}

            getSow={this.props.getSeminationSow}
            sow={this.props.state.ws1.seminationSow}
            tours_info={this.props.state.ws1.tours_info}

            getSeminators={this.props.getSeminators}
            seminationEmployes={this.props.state.ws1.seminators}

            getBoars={this.props.getBoars}
            boars={this.props.state.sows.boars}
            
            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massSemination={this.props.massSemination}

            eventFetching={this.props.state.sows.fetching}
            sowsListFetching={this.props.state.ws1.fetching}
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
  getTours: query => dispatch(ToursActions.getToursRequest(query)),

  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  getBoars: query => dispatch(SowsActions.getBoarsRequest(query)),
  getSow: id => dispatch(SowsActions.getSowRequest(id)),
  setSow: sow => dispatch(SowsActions.setSow(sow)),

  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),
  createNewSow: data => dispatch(SowsActions.createNewSowRequest(data)),
  createNewNonameSow: data => dispatch(SowsActions.createNewNonameSowRequest(data)),
  massSemination: data => dispatch(SowsActions.massSeminationRequest(data)),
  massUltrasound: data => dispatch(SowsActions.massUltrasoundRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowRequest(id)),
  sowsResetErrorsAndMessages: () => dispatch(SowsActions.sowsResetErrorsAndMessages()),

  getSeminators: query => dispatch(WsDataActions.getSeminatorsRequest(query)),
  uploadFile: data => dispatch(WsDataActions.importSeminationsFromFarmRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopOneContainer);
