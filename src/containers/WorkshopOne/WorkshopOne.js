import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS1SeminationTab from '../../components/WorkshopOne/WS1SeminationTab'
import WS1UltrasoundTab from '../../components/WorkshopOne/WS1UltrasoundTab'
import WS1UltrasoundV2Tab from '../../components/WorkshopOne/WS1UltrasoundV2Tab'
import WS1TransferToWS2Tab from '../../components/WorkshopOne/WS1TransferToWS2Tab'
import WS1CullingTab from '../../components/WorkshopOne/WS1CullingTab'

// actions
import SowsActions from '../../redux/redux-sauce/sows';
import AuthActions from '../../redux/redux-sauce/auth';
import Ws1Actions from '../../redux/redux-sauce/ws1';

import { convertSowsByTours } from '../../components/utils';


class WorkshopOneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        seminationTab: true,
        ultrasoundTab: false,
        ultrasoundV2Tab: false,
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
        <h1>WorkshopOne</h1>
        <div>
            <button onClick={this.showStateConsole}>
              Button show store
            </button>
          </div>
        <div className='row workshop-menu'>
            <div className={this.state.tabs.seminationTab ? 'tab-active col-sm' : 'col-sm'}
              onClick={() => this.setTab('seminationTab')}
            >
              Осеменение
            </div>
            <div className={this.state.tabs.ultrasoundTab ? 'tab-active col-sm' : 'col-sm'}
              onClick={() => this.setTab('ultrasoundTab')}
            >
              УЗИ
            </div>
            <div className={this.state.tabs.ultrasoundV2Tab ? 'tab-active col-sm' : 'col-sm'}
              onClick={() => this.setTab('ultrasoundV2Tab')}
            >
              УЗИ 2
            </div>
            <div className={this.state.tabs.transferToWS2Tab ? 'tab-active col-sm' : 'col-sm'}
              onClick={() => this.setTab('transferToWS2Tab')}
            >
              Перевод в ЦЕХ2
            </div>
            <div className={this.state.tabs.cullingTab ? 'tab-active col-sm' : 'col-sm'}
              onClick={() => this.setTab('cullingTab')}
            >
              Выбраковка
            </div>
            <div className={this.state.tabs.infoTab ? 'tab-active col-sm' : 'col-sm'}
              onClick={() => this.setTab('infoTab')}
            >
              ИНФО
            </div>
        </div>
        { this.state.tabs.seminationTab && 
          <WS1SeminationTab 
            query={null}
            getSows={this.props.getSeminationSows}
            getSow={this.props.getSeminationSow}
            getSeminators={this.props.getSeminators}
            sows={this.props.state.ws1.seminationList}
            sow={this.props.state.ws1.seminationSow}
            seminationSow={this.props.seminationSow}
            seminationEmployes={this.props.state.ws1.seminators}
            week={1}
          />}
        { this.state.tabs.ultrasoundTab &&
          <WS1UltrasoundTab 
            query={null}
            getSows={this.props.getUltrasoundSows}
            getSow={this.props.getUltrasoundSow} 
            sows={this.props.state.ws1.ultrasoundList}
            sow={this.props.state.ws1.ultrasoundSow}
            ultrasoundSow={this.props.ultrasoundSow}
          />}
        
        { this.state.tabs.ultrasoundV2Tab &&
          <WS1UltrasoundV2Tab 
            query={null}
            getSows={this.props.getUltrasoundV2Sows}
            getSow={this.props.getUltrasoundV2Sow} 
            sows={this.props.state.ws1.ultrasoundV2List}
            sow={this.props.state.ws1.ultrasoundV2Sow}
            ultrasoundV2Sow={this.props.ultrasoundV2Sow}
          />}
        { this.state.tabs.transferToWS2Tab &&
          <WS1TransferToWS2Tab 
            query={null}
            getSowsByTours={this.props.getSowsByTours}
            sowsByTours={this.props.state.ws1.sowsByTours}
            sowsMoveMany={this.props.sowsMoveMany}
            fetching={this.props.state.ws1.fetching}
            tour={1}
          />}
        { this.state.tabs.cullingTab &&
          <WS1CullingTab 
            query={null}
            getSows={this.props.getCullingSows}
            getSow={this.props.getCullingSow} 
            sows={this.props.state.ws1.cullingList}
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

  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  getSow: id => dispatch(SowsActions.getSowRequest(id)),
  // seminationSow: data => dispatch(SowsActions.seminationSowRequest(data)),
  // ultrasoundSow: data => dispatch(SowsActions.ultrasoundSowRequest(data)),
  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),

  getSeminationSows: query => dispatch(Ws1Actions.getSeminationSowsRequest(query)),
  getSeminationSow: id => dispatch(Ws1Actions.getSeminationSowRequest(id)),
  getUltrasoundSows: query => dispatch(Ws1Actions.getUltrasoundSowsRequest(query)),
  getUltrasoundSow: id => dispatch(Ws1Actions.getUltrasoundSowRequest(id)),
  getUltrasoundV2Sows: query => dispatch(Ws1Actions.getUltrasoundV2SowsWs1Request(query)),
  getUltrasoundV2Sow: id => dispatch(Ws1Actions.getUltrasoundV2SowWs1Request(id)),
  getCullingSows: query => dispatch(Ws1Actions.getCullingSowsWs1Request(query)),
  getCullingSow: id => dispatch(Ws1Actions.getCullingSowWs1Request(id)),
  seminationSow: data => dispatch(Ws1Actions.seminationSowWs1Request(data)),
  ultrasoundSow: data => dispatch(Ws1Actions.ultrasoundSowWs1Request(data)),
  ultrasoundV2Sow: data => dispatch(Ws1Actions.ultrasoundV2SowWs1Request(data)),
  cullingSow: data => dispatch(Ws1Actions.cullingSowWs1Request(data)),
  getSowsByTours: data => dispatch(Ws1Actions.getSowsByToursRequest(data)),
  getSeminators: query => dispatch(Ws1Actions.getSeminatorsRequest(query)),
  // setSeminationSow: sow => dispatch(Ws1Actions.setSeminationSow(sow)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopOneContainer);
