import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS2TransferTab from '../../components/WorkshopTwo/WS2TransferTab'
import WS2CullingTab from '../../components/WorkshopTwo/WS2CullingTab'

// actions
import Ws2Actions from '../../redux/redux-sauce/ws2';


class WorkshopTwoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        transferTab: false,
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

  showState = () => {
    console.log(this.state)
  }

  render() {
    return (
      <div className="workshop container">
        <h1>WorkshopTwo</h1>
        <button onClick={this.showState}>state</button>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.transferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transferTab')}
          >
            Перемещение
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
            sowsByTours={this.props.state.ws1.sowsByTours}
            tour={1}
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

  getCullingSows: query => dispatch(Ws2Actions.getCullingSowsRequest(query)),
  getCullingSow: id => dispatch(Ws2Actions.getCullingSowRequest(id)),
  cullingSow: data => dispatch(Ws2Actions.cullingSowRequest(data)),
  
  
  // sowMoveTo: data => dispatch(SowsActions.sowMoveToRequest(data)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopTwoContainer);
