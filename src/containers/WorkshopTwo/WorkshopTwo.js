import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS2TransferTab from '../../components/WorkshopTwo/WS2TransferTab'
import WS2CullingTab from '../../components/WorkshopTwo/WS2CullingTab'
import WS2UltrasoundTab from '../../components/WorkshopTwo/WS2UltrasoundTab'
import WS2CreateTransferTab from '../../components/WorkshopTwo/WS2CreateTransferTab'

// actions
import Ws2Actions from '../../redux/redux-sauce/ws2';
import SowsActions from '../../redux/redux-sauce/sows';
import ToursActions from '../../redux/redux-sauce/tours';


class WorkshopTwoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        transferTab: false,
        ultrasoundTab: false,
        cullingTab: false,
        infoTab: false,
        initAndTransferTab: true,
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
        <div className='workshop-header'>
          Цех №2
        </div>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.transferTab ? 'workshop-tab tab-active col-sm' : 'workshop-tab col-sm'}
            onClick={() => this.setTab('transferTab')}
          >
            Перемещение
          </div>
          <div className={this.state.tabs.ultrasoundTab ? 'workshop-tab tab-active col-sm' : 'workshop-tab col-sm'}
              onClick={() => this.setTab('ultrasoundTab')}
            >
              УЗИ 60
            </div>
          <div className={this.state.tabs.cullingTab ? 'workshop-tab tab-active col-sm' : 'workshop-tab col-sm'}
            onClick={() => this.setTab('cullingTab')}
          >
            Выбраковка/Аборт
          </div>
          <div className={this.state.tabs.infoTab ? 'workshop-tab tab-active col-sm' : 'workshop-tab col-sm'}
            onClick={() => this.setTab('infoTab')}
          >
            ИНФО
          </div>

          <div className={this.state.tabs.initAndTransferTab ? 'workshop-tab tab-active col-sm' 
            : 'workshop-tab col-sm'}
            onClick={() => this.setTab('initAndTransferTab')}
          >
            Создание и перевод в ЦЕХ 3
            (Инициализация)
          </div>
        </div>
        <div className='workshop-header-3'>
        </div>

        { this.state.tabs.transferTab &&
          <WS2TransferTab 
          getSows={this.props.getCullingSows}
          sows={this.props.state.ws2.cullingList}

          getTours={this.props.getTours}
          tours={this.props.state.tours.list}

          massMove={this.props.sowsMoveMany}

          eventFetching={this.props.state.sows.fetching}
          sowsListFetching={this.props.state.ws2.fetching}
          />}

        { this.state.tabs.ultrasoundTab &&
          <WS2UltrasoundTab 
            getSows={this.props.getUltrasoundV2Sows}
            sows={this.props.state.ws2.ultrasoundV2List}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massUltrasound={this.props.massUltrasound}

            eventFetching={this.props.state.sows.fetching}
            sowsListFetching={this.props.state.ws2.fetching}
          />}

        { this.state.tabs.cullingTab &&
          <WS2CullingTab
            getSows={this.props.getCullingSows}
            getSow={this.props.getCullingSow} 

            sows={this.props.state.ws2.cullingList}
            sow={this.props.state.ws2.cullingSow}
            
            cullingSow={this.props.cullingSow}
            abortionSow={this.props.abortionSow}
          />}

        { this.state.tabs.initAndTransferTab &&
          <WS2CreateTransferTab
            massInitTransfer={this.props.massInitTransfer}
            message={this.props.state.sows.message}
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
  getTours: query => dispatch(ToursActions.getToursRequest(query)),
  
  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  getCullingSows: query => dispatch(Ws2Actions.getCullingSowsWs2Request(query)),
  getCullingSow: id => dispatch(Ws2Actions.getCullingSowWs2Request(id)),
  cullingSow: data => dispatch(Ws2Actions.cullingSowWs2Request(data)),
  massUltrasound: data => dispatch(SowsActions.massUltrasoundRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowRequest(id)),
  massInitTransfer: data => dispatch(SowsActions.massInitTransferRequest(data)),

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
