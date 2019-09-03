import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS1SeminationTab from '../../components/WorkshopOne/WS1SeminationTab'
import WS1CreateTab from '../../components/WorkshopOne/WS1CreateTab'
import WS1UltrasoundTab from '../../components/WorkshopOne/WS1UltrasoundTab'
import WS1TransferToWS2Tab from '../../components/WorkshopOne/WS1TransferToWS2Tab'
import WS1CullingTab from '../../components/WorkshopOne/WS1CullingTab'

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
        createTab: false,
        ultrasoundTab: false,
        transferToWS2Tab: true,
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
    console.log('Did mount WS1')
    this.props.getSowsByTours()
  }

  showStateConsole = () => {
    const { state } = this.props
    console.log('Hi')
    console.log(state)
    console.log(this.props.state.sowsByTours)
    console.log('JHIU')
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
    console.log('Hi')
    console.log(state)
  }

  login = () => {
    this.props.login({username: 'test_seminator', password: 'qwerty123'})
  }

  render() {
    return (
      <div className="workshop container">
        <div className='workshop-header'>
          <button onClick={this.showStateConsole}>
            show store
          </button>  
        </div>
        <div className='row workshop-menu'>
            <div className={this.state.tabs.createTab ? 'workshop-tab tab-active col-sm' : 'col-sm workshop-tab'}
              onClick={() => this.setTab('createTab')}
            >
              Создание
            </div>
            <div className={this.state.tabs.seminationTab ? 'workshop-tab tab-active col-sm' : 'col-sm workshop-tab'}
              onClick={() => this.setTab('seminationTab')}
            >
              Осеменение
            </div>
            <div className={this.state.tabs.ultrasoundTab ? 'workshop-tab tab-active col-sm' : 'col-sm workshop-tab'}
              onClick={() => this.setTab('ultrasoundTab')}
            >
              УЗИ
            </div>

            <div className={this.state.tabs.transferToWS2Tab ? 'workshop-tab tab-active col-sm' : 'col-sm workshop-tab'}
              onClick={() => this.setTab('transferToWS2Tab')}
            >
              Перевод в ЦЕХ2
            </div>
            <div className={this.state.tabs.cullingTab ? 'workshop-tab tab-active col-sm' : 'col-sm workshop-tab'}
              onClick={() => this.setTab('cullingTab')}
            >
              Выбраковка
            </div>
            <div className={this.state.tabs.infoTab ? 'workshop-tab tab-active col-sm' : 'col-sm workshop-tab'}
              onClick={() => this.setTab('infoTab')}
            >
              ИНФО
            </div>
        </div>
        { this.state.tabs.createTab && 
          <WS1CreateTab 
            sow={this.props.state.ws1.createdSow}
            nonameSow={this.props.state.sows.createdNonameSow}
            nonameSowsCount={this.props.state.sows.nonameSowsCount}
            createNewSow={this.props.createNewSow}
            createNewNonameSow={this.props.createNewNonameSow}
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
          />}

        { this.state.tabs.ultrasoundTab &&
          <WS1UltrasoundTab 
            getSows={this.props.getUltrasoundSows}
            sows={this.props.state.ws1.ultrasoundList}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massUltrasound={this.props.massUltrasound}
          />}

        { this.state.tabs.transferToWS2Tab &&
          <WS1TransferToWS2Tab 
            getSows={this.props.getUltrasoundSows}
            sows={this.props.state.ws1.ultrasoundList}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massMove={this.props.sowsMoveMany}
          />}

        { this.state.tabs.cullingTab &&
          <WS1CullingTab 
            getSows={this.props.getCullingSows}
            sows={this.props.state.ws1.cullingList}

            getSow={this.props.getCullingSow}
            sow={this.props.state.ws1.cullingSow}

            cullingSow={this.props.cullingSow}
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
  // seminationSow: data => dispatch(SowsActions.seminationSowRequest(data)),
  // ultrasoundSow: data => dispatch(SowsActions.ultrasoundSowRequest(data)),
  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),
  // createNewSow: data => dispatch(Ws1Actions.createNewSowWs1Request(data)),
  createNewNonameSow: data => dispatch(SowsActions.createNewNonameSowRequest(data)),
  massSemination: data => dispatch(SowsActions.massSeminationRequest(data)),
  massUltrasound: data => dispatch(SowsActions.massUltrasoundRequest(data)),

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
  // setSeminationSow: sow => dispatch(Ws1Actions.setSeminationSow(sow)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopOneContainer);
