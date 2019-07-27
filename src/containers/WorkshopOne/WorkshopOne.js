import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS1SeminationTab from '../../components/Workshop/WS1SeminationTab'
import WS1UltrasoundTab from '../../components/Workshop/WS1UltrasoundTab'
import WS1TransferToWS2Tab from '../../components/Workshop/WS1TransferToWS2Tab'

import SowsActions from '../../redux/redux-sauce/sows';
import AuthActions from '../../redux/redux-sauce/auth';

import Ws1Actions from '../../redux/redux-sauce/ws1';


const convertSowsByTours = (sowsByToursElemList) => {
  let outputDict = {};
  sowsByToursElemList.map((listElem) => {
    let columns = {};
    outputDict[listElem['tour']['id']] = columns;
    columns['count'] = listElem['count'];
    columns['checked'] = false;
    columns['rows'] = {};
    listElem['sows'].map(sowElem =>
      columns['rows'][sowElem['farm_id']] = false
    );
  });
  return outputDict
}

class WorkshopOneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        seminationTab: true,
        ultrasoundTab: false,
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
    const tabs = {
      seminationTab: false,
      ultrasoundTab: false,
      transferToWS2Tab: false,
      cullingTab: false,
      infoTab: false,
    }
    this.setState({
      tabs: {
        ...tabs,
        [tab]: true
      }
    })
    console.log(this.state.tabs)
  }

  showStateConsole = () => {
    const { state } = this.props
    console.log('Hi')
    console.log(state)
  }

  getSows = () => {
    // this.props.getSows({by_workshop_number: 3})
    this.props.getSows()
    const token = localStorage.getItem('token');
    console.log(token)
  }

  getSows2 = () => {
    this.props.getSows()
    const token = localStorage.getItem('token');
    console.log(token)
  }

  seminationSow = (sow) => {
    let data = {
      id: sow.id,
      week: '104',
      seminationEmployeeId: '5'
    }
    console.log('Semination')
    this.props.seminationSow(data)
  }

  ultrasoundSow = (data) => {
    // let data = {
    //   id: '1',
    //   week: '104',
    //   result: true
    // }
    this.props.ultrasoundSow(data)
  }

  cullingSow = () => {
    let data = {
      id: '1',
      culling_type: 'padej',
      reason: 'test reason'
    }
    this.props.cullingSow(data)
  }

  sowMoveTo = () => {
    let data = {
      id: '1',
      location: '1',
    }
    this.props.sowMoveTo(data)
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
            sows={this.props.state.ws1.seminationList}
            sow={this.props.state.ws1.seminationSow}
            seminationSow={this.props.seminationSow}
            seminationEmployes={[{name: 1},{name: 2},{name: 3},{name: 4},{name: 123}]}
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
            week={1}
          />}
        { this.state.tabs.transferToWS2Tab &&
          <WS1TransferToWS2Tab 
            query={null}
            getSowsByTours={this.props.getSowsByTours}
            sowsByTours={convertSowsByTours(this.props.state.ws1.sowsByTours)}
            tour={1}
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

  getSeminationSows: query => dispatch(Ws1Actions.getSeminationSowsRequest(query)),
  getSeminationSow: id => dispatch(Ws1Actions.getSeminationSowRequest(id)),
  getUltrasoundSows: query => dispatch(Ws1Actions.getUltrasoundSowsRequest(query)),
  getUltrasoundSow: id => dispatch(Ws1Actions.getUltrasoundSowRequest(id)),
  seminationSow: data => dispatch(Ws1Actions.seminationSowRequest(data)),
  ultrasoundSow: data => dispatch(Ws1Actions.ultrasoundSowRequest(data)),
  getSowsByTours: data => dispatch(Ws1Actions.getSowsByToursRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopOneContainer);
