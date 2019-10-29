import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS2TransferTab from '../../components/WorkshopTwo/WS2TransferTab'
import WSSowCullingTab from '../../components/WorkshopTabs/WSSowCullingTab'
import WS2UltrasoundTab from '../../components/WorkshopTwo/WS2UltrasoundTab'
import WS2CreateTransferTab from '../../components/WorkshopTwo/WS2CreateTransferTab'

// actions
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
    this.setTab = this.setTab.bind(this);
	}

  setTab(tab) {
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
              УЗИ 35
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
            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massMove={this.props.sowsMoveMany}
            eventFetching={this.props.state.sows.eventFetching}
          />}

        { this.state.tabs.ultrasoundTab &&
          <WS2UltrasoundTab 
            getSows={this.props.getSows}
            sows={this.props.state.sows.list}
            sowsListFetching={this.props.state.sows.fetching}

            getTours={this.props.getTours}
            tours={this.props.state.tours.list}

            massUltrasound={this.props.massUltrasound}
            eventFetching={this.props.state.sows.eventFetching}
          />}

        { this.state.tabs.cullingTab &&
          <WSSowCullingTab
            workshopNumber={2}

            getSows={this.props.getSows}
            sows={this.props.state.sows.list}

            getSow={this.props.getSow}
            sow={this.props.state.sows.sow}
            tours_info={this.props.state.sows.tours_info}

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
  getTours: query => dispatch(ToursActions.getToursRequest(query)),
  
  getSows: query => dispatch(SowsActions.getSowsRequest(query)),
  getSow: id => dispatch(SowsActions.getSowRequest(id)),
  cullingSow: data => dispatch(SowsActions.cullingSowRequest(data)),  
  massUltrasound: data => dispatch(SowsActions.massUltrasoundRequest(data)),
  abortionSow: id => dispatch(SowsActions.abortionSowRequest(id)),
  massInitTransfer: data => dispatch(SowsActions.massInitTransferRequest(data)),
  sowsMoveMany: data => dispatch(SowsActions.sowsMoveManyRequest(data)),  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopTwoContainer);
