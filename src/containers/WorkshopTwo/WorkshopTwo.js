import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS2TransferTab from '../../components/WorkshopTwo/WS2TransferTab'
import WS2CullingTab from '../../components/WorkshopTwo/WS2CullingTab'
import WS2UltrasoundV2Tab from '../../components/WorkshopTwo/WS2UltrasoundV2Tab'

// actions
import Ws2Actions from '../../redux/redux-sauce/ws2';
import SowsActions from '../../redux/redux-sauce/sows';


class WorkshopTwoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        transferTab: false,
        ultrasoundV2Tab: false,
        cullingTab: true,
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

  showState = () => {
    console.log(this.state)
  }

  render() {
    return (
      <div className="workshop container">
        <h1>WorkshopTwo</h1>
        <div>
            <button onClick={this.showStateConsole}>
              Button show store
            </button>
            <button onClick={this.showState}>state</button>
        </div>
        
        <div className='row workshop-menu'>
          <div className={this.state.tabs.transferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transferTab')}
          >
            Перемещение
          </div>
          <div className={this.state.tabs.ultrasoundV2Tab ? 'tab-active col-sm' : 'col-sm'}
              onClick={() => this.setTab('ultrasoundV2Tab')}
            >
              УЗИ 2
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
        { this.state.tabs.transferTab &&
          <WS2TransferTab 
            query={null}
            getSowsByTours={this.props.getSowsByTours}
            sowsByTours={this.props.state.ws2.sowsByTours}
            sowsMoveMany={this.props.sowsMoveMany}
          />}

        { this.state.tabs.ultrasoundV2Tab &&
          <WS2UltrasoundV2Tab 
            query={null}
            getSows={this.props.getUltrasoundV2Sows}
            getSow={this.props.getUltrasoundV2Sow} 
            sows={this.props.state.ws2.ultrasoundV2List}
            sow={this.props.state.ws2.ultrasoundV2Sow}
            ultrasoundV2Sow={this.props.ultrasoundV2Sow}
          />}

        { this.state.tabs.cullingTab &&
          <WS2CullingTab
            query={null}
            getSows={this.props.getCullingSows}
            getSow={this.props.getCullingSow} 
            sows={this.props.state.ws2.cullingList}
            sow={this.props.state.ws2.cullingSow}
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
  // login: (payload) => dispatch(AuthActions.loginRequest(payload)),

  getCullingSows: query => dispatch(Ws2Actions.getCullingSowsWs2Request(query)),
  getCullingSow: id => dispatch(Ws2Actions.getCullingSowWs2Request(id)),
  cullingSow: data => dispatch(Ws2Actions.cullingSowWs2Request(data)),

  getUltrasoundV2Sows: query => dispatch(Ws2Actions.getUltrasoundV2SowsWs2Request(query)),
  getUltrasoundV2Sow: id => dispatch(Ws2Actions.getUltrasoundV2SowWs2Request(id)),
  ultrasoundV2Sow: data => dispatch(Ws2Actions.ultrasoundV2SowWs2Request(data)),
  getSowsByTours: data => dispatch(Ws2Actions.getSowsByToursWs2Request(data)),

  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopTwoContainer);
