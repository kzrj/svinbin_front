import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS1SeminationTab from '../../components/Workshop/WS1SeminationTab'
import WS1UltrasoundTab from '../../components/Workshop/WS1UltrasoundTab'

import SowsActions from '../../redux/redux-sauce/sows';
import AuthActions from '../../redux/redux-sauce/auth';


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

  // componentDidMount() {
  //   $('body').addClass('loaded');
  //   this.props.startup();

  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     this.props.checkToken(token);
  //   }
  // }

  showStateConsole = () => {
    const { state } = this.props
    console.log('Hi')
    console.log(state)
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
            getSows={this.props.getSows}
            getSow={this.props.getSow}
            sows={this.props.state.sows.list}
            sowsData={this.props.state.sows}
            sow={this.props.state.sows.sow}
            // seminationSow={this.seminationSow}
            seminationSow={this.props.seminationSow}
            seminationEmployes={[{name: 1},{name: 2},{name: 3},{name: 4},{name: 123}]}
            week={1}
          />}
        { this.state.tabs.ultrasoundTab &&
          <WS1UltrasoundTab 
            query={null}
            getSows={this.props.getSows}
            getSow={this.props.getSow} 
            sows={this.props.state.sows.list}
            sow={this.props.state.sows.sow}
            sowsData={this.props.state.sows}
            ultrasoundSow={this.props.ultrasoundSow}
            week={1}
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
  seminationSow: data => dispatch(SowsActions.seminationSowRequest(data)),
  ultrasoundSow: data => dispatch(SowsActions.ultrasoundSowRequest(data)),
  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),
  sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopOneContainer);
