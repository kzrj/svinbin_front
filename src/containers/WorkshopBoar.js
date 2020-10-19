import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WSBoarTab from '../components/SowTabs/WSBoarTab'
import WSSemenBoarCreateTab from '../components/SowTabs/WSSemenBoarCreateTab'
import WSSemenBoarListTab from '../components/SowTabs/WSSemenBoarListTab'

import { TabMenu }  from '../components/CommonComponents'

// actions
import SowsActions from '../redux/redux-sauce/sows';


class WorkshopBoarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {name: 'boarTab',        active: false, title: 'Создание, выбытие, наличие'},
        {name: 'createSemenTab', active: false, title: 'Регистрация семени'},
        {name: 'listSemenTab',   active: true,  title: 'Лист семени'},
      ]
    }
    this.setTab = this.setTab.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
  }

  componentDidMount() {
    this.props.getBoars()
    this.props.getBoarBreed()
  }

  setTab (tab) {
    let { tabs } = this.state
    tabs.map((tb) => {
      tb.active = false
      if (tb.name === tab.name)
        tb.active= true
    })

    this.setState({
      tabs: tabs
    })
  }

  getActiveTab () {
    let { tabs } = this.state
    let activeTab = {}
    tabs.map(tb => {
      if (tb.active)
        activeTab = tb
    })

    return activeTab
  }  

  render() {
    const activeTab = this.getActiveTab()
    return (
      <div className="workshop container-fluid">
        <TabMenu 
          tabs={this.state.tabs} setTab={this.setTab} workshop={'Хрячник'} activeTab={activeTab}
          user={this.props.state.auth.user}
        />

        {activeTab.name === 'createSemenTab' &&
          <WSSemenBoarCreateTab 
            getBoars={this.props.getBoars}
            boars={this.props.state.sows.boars}
            listFetching={this.props.state.sows.fetching}

            semenBoar={this.props.semenBoar}
            eventError={this.props.state.sows.eventError}
            eventFetching={this.props.state.sows.eventFetching}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />
        }

        {activeTab.name === 'listSemenTab' &&
          <WSSemenBoarListTab 
            semenBoarList={this.props.state.sows.semenBoarList}
            getSemenBoarList={this.props.getSemenBoarList}
            listFetching={this.props.state.sows.fetching}
            message={this.props.state.sows.message}
          />
        }

        {activeTab.name === 'boarTab' &&
          <WSBoarTab 
            getBoars={this.props.getBoars}
            boars={this.props.state.sows.boars}
            breeds={this.props.state.sows.breeds}
            listFetching={this.props.state.sows.fetching}

            boar={this.props.state.sows.boar}

            cullingBoar={this.props.cullingBoar}
            createBoar={this.props.createBoar}
            eventError={this.props.state.sows.eventError}
            eventFetching={this.props.state.sows.eventFetching}
            message={this.props.state.sows.message}

            sowsResetErrorsAndMessages={this.props.sowsResetErrorsAndMessages}
          />
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notifications,
  state: state
})

const mapDispatchToProps = (dispatch) => ({
  getBoarBreed: query => dispatch(SowsActions.getBoarBreedRequest(query)),

  getBoars: query => dispatch(SowsActions.getBoarsRequest(query)),
  
  cullingBoar: data => dispatch(SowsActions.cullingBoarRequest(data)),
  createBoar: data => dispatch(SowsActions.createBoarRequest(data)),
  semenBoar: data => dispatch(SowsActions.semenBoarRequest(data)),
  getSemenBoarList: query => dispatch(SowsActions.getSemenBoarListRequest(query)),

  sowsResetErrorsAndMessages: () => dispatch(SowsActions.sowsResetErrorsAndMessages()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopBoarContainer);
