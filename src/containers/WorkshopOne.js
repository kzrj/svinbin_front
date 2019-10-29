import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS1SeminationTab from '../components/WorkshopOne/WS1SeminationTab'
import WS1Semination2Tab from '../components/WorkshopOne/WS1Semination2Tab'
import WS1Semination12Tab from '../components/WorkshopOne/WS1Semination12Tab'
import WS1CreateTab from '../components/WorkshopOne/WS1CreateTab'
import WS1TransferToWS2Tab from '../components/WorkshopOne/WS1TransferToWS2Tab'
import WSSowCullingTab from '../components/SowTabs/WSSowCullingTab'
import WSSowUltrasoundTab from '../components/SowTabs/WSSowUltrasoundTab'
import WS1ImportSeminationTab from '../components/WorkshopOne/WS1ImportSeminationTab'

// actions
import SowsActions from '../redux/redux-sauce/sows';
import ToursActions from '../redux/redux-sauce/tours';
import Ws1Actions from '../redux/redux-sauce/ws1';


class WorkshopOneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        seminationTab: false,
        semination2Tab: false,
        semination12Tab: false,
        importSeminationTab: false,
        createTab: false,
        ultrasound30Tab: true,
        ultrasound60Tab: false,
        transferToWS2Tab: false,
        cullingTab: false,
        infoTab: false,
      }
    }
    this.setTab = this.setTab.bind(this);
	}

  setTab(tab) {
    let { tabs } = this.state
    Object.keys(tabs).forEach((key) => {
      tabs[key] = false
    })
    this.setState({
      ...this.state,
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
      <div className="workshop container">
        <div className='workshop-header'>
          Цех №1
        </div>
        <div className='row workshop-menu'>
            <div className={this.state.tabs.createTab ? 'workshop-tab tab-active col-sm' 
              : 'col-sm workshop-tab'}
              onClick={() => this.setTab('createTab')}
            >
              Создание
            </div>
            {/* <div className={this.state.tabs.semination12Tab ? 'workshop-tab tab-active col-sm' 
              : 'col-sm workshop-tab'}
              onClick={() => this.setTab('semination12Tab')}
            >
              Осеменение 12
            </div>
            <div className={this.state.tabs.seminationTab ? 'workshop-tab tab-active col-sm' 
              : 'col-sm workshop-tab'}
              onClick={() => this.setTab('seminationTab')}
            >
              Осеменение
            </div>
            <div className={this.state.tabs.semination2Tab ? 'workshop-tab tab-active col-sm' 
              : 'col-sm workshop-tab'}
              onClick={() => this.setTab('semination2Tab')}
            >
              Осеменение 2
            </div> */}
            <div className={this.state.tabs.importSeminationTab ? 'workshop-tab tab-active col-sm' 
              : 'col-sm workshop-tab'}
              onClick={() => this.setTab('importSeminationTab')}
            >
              Осеменение(импорт из Фарма)
            </div>
            <div className={this.state.tabs.ultrasound30Tab ? 'workshop-tab tab-active col-sm' 
              : 'col-sm workshop-tab'}
              onClick={() => this.setTab('ultrasound30Tab')}
            >
              УЗИ 28
            </div>

            <div className={this.state.tabs.ultrasound60Tab ? 'workshop-tab tab-active col-sm' 
              : 'col-sm workshop-tab'}
              onClick={() => this.setTab('ultrasound60Tab')}
            >
              УЗИ 35
            </div>

            <div className={this.state.tabs.transferToWS2Tab ? 'workshop-tab tab-active col-sm' 
              : 'col-sm workshop-tab'}
              onClick={() => this.setTab('transferToWS2Tab')}
            >
              Перевод в ЦЕХ2
            </div>
            <div className={this.state.tabs.cullingTab ? 'workshop-tab tab-active col-sm' 
              : 'col-sm workshop-tab'}
              onClick={() => this.setTab('cullingTab')}
            >
              Выбраковка/Аборт
            </div>
            <div className={this.state.tabs.infoTab ? 'workshop-tab tab-active col-sm' 
              : 'col-sm workshop-tab'}
              onClick={() => this.setTab('infoTab')}
            >
              ИНФО
            </div>
        </div>
        <div className='workshop-header-3'>
        </div>
        { this.state.tabs.createTab && 
          <WS1CreateTab 
            getSows={this.props.getSows}
            sows={this.props.state.sows.list}

            createNewSow={this.props.createNewSow}
            sow={this.props.state.sows.createdSow}

            nonameSow={this.props.state.sows.createdNonameSow}
            nonameSowsCount={this.props.state.sows.nonameSowsCount}
            createNewNonameSow={this.props.createNewNonameSow}

            message={this.props.state.sows.message}
            error={this.props.state.sows.error}
          />}

        {/* { this.state.tabs.seminationTab && 
          <WS1SeminationTab 
            getSows={this.props.getSeminationSows}
            sows={this.props.state.ws1.seminationList}

            getSeminators={this.props.getSeminators}
            seminationEmployes={this.props.state.ws1.seminators}

            getBoars={this.props.getBoars}
            boars={this.props.state.sows.boars}
            
            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massSemination={this.props.massSemination}

            eventFetching={this.props.state.sows.fetching}
            sowsListFetching={this.props.state.ws1.fetching}
          />}

        { this.state.tabs.semination2Tab && 
          <WS1Semination2Tab 
            getSows={this.props.getSeminationSows}
            sows={this.props.state.ws1.seminationList}

            getSeminators={this.props.getSeminators}
            seminationEmployes={this.props.state.ws1.seminators}

            getBoars={this.props.getBoars}
            boars={this.props.state.sows.boars}
            
            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massSemination={this.props.massSemination}

            eventFetching={this.props.state.sows.fetching}
            sowsListFetching={this.props.state.ws1.fetching}
          />}

        { this.state.tabs.semination12Tab && 
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

        { this.state.tabs.importSeminationTab && 
          <WS1ImportSeminationTab 
            eventFetching={this.props.state.ws1.fetching}
            uploadFile={this.props.uploadFile}

            message={this.props.state.ws1.message}
            error={this.props.state.ws1.error}

            responseData={this.props.state.ws1.import_from_file_data}
          />}

        { this.state.tabs.ultrasound30Tab &&
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

            massUltrasound={this.props.massUltrasound}
            eventFetching={this.props.state.sows.eventFetching}
          />}

        { this.state.tabs.ultrasound60Tab &&
          <WSSowUltrasoundTab
            workshopNumber={1}
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
          />}

        { this.state.tabs.transferToWS2Tab &&
          <WS1TransferToWS2Tab 
            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massMove={this.props.sowsMoveMany}
            eventFetching={this.props.state.sows.eventFetching}
          />}

        { this.state.tabs.cullingTab &&
          <WSSowCullingTab 
            workshopNumber={1}

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
  getBoars: query => dispatch(SowsActions.getBoarsRequest(query)),
  getSow: id => dispatch(SowsActions.getSowRequest(id)),

  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),
  createNewSow: data => dispatch(SowsActions.createNewSowRequest(data)),
  createNewNonameSow: data => dispatch(SowsActions.createNewNonameSowRequest(data)),
  massSemination: data => dispatch(SowsActions.massSeminationRequest(data)),
  massUltrasound: data => dispatch(SowsActions.massUltrasoundRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowRequest(id)),

  getSeminators: query => dispatch(Ws1Actions.getSeminatorsRequest(query)),
  uploadFile: data => dispatch(Ws1Actions.importSeminationsFromFarmRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopOneContainer);
