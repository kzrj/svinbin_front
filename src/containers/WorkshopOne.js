import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS1Semination12Tab from '../components/SowTabs/WS1Semination12Tab'
import WSSowTransferToWSTab from '../components/SowTabs/WSSowTransferToWSTab'
import WS12SowCullingTab from '../components/SowTabs/WS12SowCullingTab'
import WSSowUltrasoundTab from '../components/SowTabs/WSSowUltrasoundTab'
import WSSowGlobalSearchTab from '../components/SowTabs/WSSowGlobalSearchTab'
import WS1ImportSeminationTab from '../components/SowTabs/WS1ImportSeminationTab'
import WS12ReportTab from '../components/Reports/WS12Report'

import { TabMenu }  from '../components/CommonComponents'

// actions
import SowsActions from '../redux/redux-sauce/sows';
import ToursActions from '../redux/redux-sauce/tours';
import WsDataActions from '../redux/redux-sauce/wsData';
import ReportsActions from '../redux/redux-sauce/reports';


class WorkshopOneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {name: 'semination12Tab',     active: false, title: 'Осеменение'},
        {name: 'importSeminationTab', active: false, title: 'Импорт из Фарма'},
        {name: 'ultrasound30Tab',     active: false, title: 'УЗИ 28'},
        {name: 'ultrasound60Tab',     active: false, title: 'УЗИ 35'},
        {name: 'transferToWS2Tab',    active: false,  title: 'Перегон'},
        {name: 'cullingTab',          active: false, title: 'Выбытие'},
        {name: 'searchSowTab',        active: true, title: 'Поиск по всем цехам'},
        {name: 'infoTab',             active: false, title: 'Инфо'},
      ]
    }
    this.setTab = this.setTab.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
  }

  componentDidMount() {
    this.props.getTours({by_workshop_number: 1})
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

        {activeTab.name === 'semination12Tab' &&
          <WS1Semination12Tab 
            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            queryCount={this.props.state.sows.queryCount}

            getBoars={this.props.getBoars}
            boars={this.props.state.sows.boars}

            getSeminators={this.props.getSeminators}
            seminators={this.props.state.wsData.seminators}

            tours={this.props.state.tours.list}

            seminationForm={this.props.state.form.seminationForm}

            seminationSow={this.props.seminationSow}
            eventError={this.props.state.sows.eventError}
            eventFetching={this.props.state.sows.eventFetching}
            message={this.props.state.sows.message}

            // sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
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
            errorList={this.props.state.sows.errorList}
            queryCount={this.props.state.sows.queryCount}

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
            errorList={this.props.state.sows.errorList}
            queryCount={this.props.state.sows.queryCount}

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
            errorList={this.props.state.sows.errorList}
            queryCount={this.props.state.sows.queryCount}

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
          <WS12SowCullingTab 
            workshopNumber={1}
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
          />
        }

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

        {activeTab.name === 'infoTab' &&
          <WS12ReportTab 
            ws_number={1} 
            getWsReport={this.props.getWsReport}
            wsReport={this.props.state.reports.ws12Report}
        
            eventError={this.props.state.reports.reportsErrorFetching}
            eventFetching={this.props.state.reports.reportsFetching}
            message={this.props.state.reports.message}
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
  getTours: query => dispatch(ToursActions.getToursRequest(query)),

  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  getBoars: query => dispatch(SowsActions.getBoarsRequest(query)),
  getSow: id => dispatch(SowsActions.getSowRequest(id)),
  getByFarmIdSow: query => dispatch(SowsActions.getSowByFarmIdRequest(query)),
  setSow: sow => dispatch(SowsActions.setSow(sow)),

  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),
  seminationSow: data => dispatch(SowsActions.seminationSowRequest(data)),
  massSemination: data => dispatch(SowsActions.massSeminationRequest(data)),
  massUltrasound: data => dispatch(SowsActions.massUltrasoundRequest(data)),
  massCulling: data => dispatch(SowsActions.massCullingRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowRequest(id)),
  sowsResetErrorsAndMessages: () => dispatch(SowsActions.sowsResetErrorsAndMessages()),

  cullingBoar: data => dispatch(SowsActions.cullingBoarRequest(data)),
  createBoar: data => dispatch(SowsActions.createBoarRequest(data)),

  getSeminators: query => dispatch(WsDataActions.getSeminatorsRequest(query)),
  uploadFile: data => dispatch(WsDataActions.importSeminationsFromFarmRequest(data)),

  getWsReport: query => dispatch(ReportsActions.getWs12ReportRequest(query)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopOneContainer);
