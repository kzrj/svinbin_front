import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS1SeminationTab from '../../components/WorkshopOne/WS1SeminationTab'
import WS1Semination2Tab from '../../components/WorkshopOne/WS1Semination2Tab'
import WS1Semination12Tab from '../../components/WorkshopOne/WS1Semination12Tab'
import WS1CreateTab from '../../components/WorkshopOne/WS1CreateTab'
import WS1Ultrasound30Tab from '../../components/WorkshopOne/WS1Ultrasound30Tab'
import WS1Ultrasound60Tab from '../../components/WorkshopOne/WS1Ultrasound60Tab'
import WS1TransferToWS2Tab from '../../components/WorkshopOne/WS1TransferToWS2Tab'
import WS1CullingTab from '../../components/WorkshopOne/WS1CullingTab'
import WS1ImportSeminationTab from '../../components/WorkshopOne/WS1ImportSeminationTab'

// actions
import SowsActions from '../../redux/redux-sauce/sows';
import ToursActions from '../../redux/redux-sauce/tours';
import AuthActions from '../../redux/redux-sauce/auth';
import Ws1Actions from '../../redux/redux-sauce/ws1';


class WorkshopOneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        seminationTab: false,
        semination2Tab: false,
        semination12Tab: false,
        importSeminationTab: true,
        createTab: false,
        ultrasound30Tab: false,
        ultrasound60Tab: false,
        transferToWS2Tab: false,
        cullingTab: false,
        infoTab: false,
      }
    }
	}

  componentDidMount() {
    // $('body').addClass('loaded');
    // this.props.startup();

    // const token = localStorage.getItem('token');
    // if (token) {
    //   this.props.checkToken(token);
    // }
  }

  setTab = (tab) => {
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

  login = () => {
    this.props.login({username: 'test_seminator', password: 'qwerty123'})
  }

  render() {
    return (
      <div className="workshop container">
        <div className='workshop-header'>
          Цех №1
          <button onClick={this.showStateConsole}>o</button>
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
              УЗИ 30
            </div>

            <div className={this.state.tabs.ultrasound60Tab ? 'workshop-tab tab-active col-sm' 
              : 'col-sm workshop-tab'}
              onClick={() => this.setTab('ultrasound60Tab')}
            >
              УЗИ 60
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

            sow={this.props.state.ws1.createdSow}

            nonameSow={this.props.state.sows.createdNonameSow}
            nonameSowsCount={this.props.state.sows.nonameSowsCount}

            createNewSow={this.props.createNewSow}
            createNewNonameSow={this.props.createNewNonameSow}

            message={this.props.state.ws1.message}
            error={this.props.state.ws1.error}
          />}

        { this.state.tabs.seminationTab && 
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
          />}

        { this.state.tabs.importSeminationTab && 
          <WS1ImportSeminationTab 
            eventFetching={this.props.state.ws1.fetching}
            uploadFile={this.props.uploadFile}
            message={this.props.state.ws1.message}
            error={this.props.state.ws1.error}
            responseData={this.props.state.ws1.import_from_file_data}
          />}

        { this.state.tabs.ultrasound30Tab &&
          <WS1Ultrasound30Tab 
            getSows={this.props.getUltrasoundSows}
            sows={this.props.state.ws1.ultrasoundList}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massUltrasound={this.props.massUltrasound}

            eventFetching={this.props.state.sows.fetching}
            sowsListFetching={this.props.state.ws1.fetching}
          />}

        { this.state.tabs.ultrasound60Tab &&
          <WS1Ultrasound60Tab 
            getSows={this.props.getUltrasoundSows}
            sows={this.props.state.ws1.ultrasoundList}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massUltrasound={this.props.massUltrasound}

            eventFetching={this.props.state.sows.fetching}
            sowsListFetching={this.props.state.ws1.fetching}
          />}

        { this.state.tabs.transferToWS2Tab &&
          <WS1TransferToWS2Tab 
            getSows={this.props.getUltrasoundSows}
            sows={this.props.state.ws1.ultrasoundList}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massMove={this.props.sowsMoveMany}

            eventFetching={this.props.state.sows.fetching}
            sowsListFetching={this.props.state.ws1.fetching}
          />}

        { this.state.tabs.cullingTab &&
          <WS1CullingTab 
            getSows={this.props.getCullingSows}
            sows={this.props.state.ws1.cullingList}

            getSow={this.props.getCullingSow}
            sow={this.props.state.ws1.cullingSow}
            tours_info={this.props.state.ws1.tours_info}

            cullingSow={this.props.cullingSow}
            abortionSow={this.props.abortionSow}
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
  login: (payload) => dispatch(AuthActions.loginRequest(payload)),

  getTours: query => dispatch(ToursActions.getToursRequest(query)),

  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  getBoars: query => dispatch(SowsActions.getBoarsRequest(query)),
  getSow: id => dispatch(SowsActions.getSowRequest(id)),
  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),  
  createNewNonameSow: data => dispatch(SowsActions.createNewNonameSowRequest(data)),
  massSemination: data => dispatch(SowsActions.massSeminationRequest(data)),
  massUltrasound: data => dispatch(SowsActions.massUltrasoundRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowRequest(id)),

  getSeminationSows: query => dispatch(Ws1Actions.getSeminationSowsRequest(query)),
  getSeminationSow: id => dispatch(Ws1Actions.getSeminationSowRequest(id)),
  getUltrasoundSows: query => dispatch(Ws1Actions.getUltrasoundSowsRequest(query)),
  getUltrasoundSow: id => dispatch(Ws1Actions.getUltrasoundSowRequest(id)),
  getUltrasoundV2Sows: query => dispatch(Ws1Actions.getUltrasoundV2SowsWs1Request(query)),
  getCullingSows: query => dispatch(Ws1Actions.getCullingSowsWs1Request(query)),
  getCullingSow: id => dispatch(Ws1Actions.getCullingSowWs1Request(id)),
  seminationSow: data => dispatch(Ws1Actions.seminationSowWs1Request(data)),
  ultrasoundSow: data => dispatch(Ws1Actions.ultrasoundSowWs1Request(data)),
  ultrasoundV2Sow: data => dispatch(Ws1Actions.ultrasoundV2SowWs1Request(data)),
  cullingSow: data => dispatch(Ws1Actions.cullingSowWs1Request(data)),
  getSowsByTours: data => dispatch(Ws1Actions.getSowsByToursRequest(data)),
  getSeminators: query => dispatch(Ws1Actions.getSeminatorsRequest(query)),
  createNewSow: data => dispatch(Ws1Actions.createNewSowWs1Request(data)),
  uploadFile: data => dispatch(Ws1Actions.importSeminationsFromFarmRequest(data)),
  // setSeminationSow: sow => dispatch(Ws1Actions.setSeminationSow(sow)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopOneContainer);
