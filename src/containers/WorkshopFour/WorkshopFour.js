import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WS4IncomeTab from '../../components/WorkshopFour/WS4IncomeTab'
import WS4ResettelmentTab from '../../components/WorkshopFour/WS4ResettelmentTab'
import WS4TransferTab from '../../components/WorkshopFour/WS4TransferTab'
import WS4InnerTransferTab from '../../components/WorkshopFour/WS4InnerTransferTab'
import WS4CullingTab from '../../components/WorkshopFour/WS4CullingTab'

// actions
import Ws4Actions from '../../redux/redux-sauce/ws4';
import NomadPigletsActions from '../../redux/redux-sauce/nomadPiglets';


class WorkshopFourContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        incomeTab: true,
        resettlementTab: false,
        innerTransferTab: false,
        transferTab: false,
        cullingTab: false,
        // infoTab: false,
      }
    };
    // this.setTab = this.setTab.bind(this);
    // this.getPiglets = this.getPiglets.bind(this);
  }

  // getPiglets () {
  //   this.props.getPiglets({status_title: "Готовы ко взвешиванию"})
  // }

  componentDidMount() {
    // query
    console.log('Did mount WS4')
    // this.getPiglets()
    this.props.getPiglets({status_title: "Готовы ко взвешиванию"})
    // this.props.dispatch(Ws4Actions.getNomadPigletsRequest())
  }
  
  setTab (tab) {
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
    console.log('WS4 render')
    return (
      <div className="workshop container">
        <h1>WorkshopFour</h1>
        <button onClick={this.showStateConsole}>store</button>
        <button onClick={this.showProps}>props</button>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.incomeTab ? 'tab-active col-sm' : 'col-sm'}
              onClick={() => this.setTab('incomeTab')}
            >
              Поступление и взвешивание
            </div>
          <div className={this.state.tabs.resettlementTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('resettlementTab')}
          >
            Расселение поступивших
          </div>
          <div className={this.state.tabs.innerTransferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('innerTransferTab')}
          >
            Перемещение
          </div>
          <div className={this.state.tabs.transferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transferTab')}
          >
            Перегон
          </div>
          <div className={this.state.tabs.cullingTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('cullingTab')}
          >
            Выбраковка
          </div>
          <div className={this.state.tabs.infoTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('infoTab')}
          >
            Инфо
          </div>
        </div>
        { this.state.tabs.incomeTab &&
          <WS4IncomeTab 
            query={null}
            getPiglets={this.props.getPiglets}
            piglets={this.props.state.ws4.incomingPigletsList}
            weighingPiglets={this.props.weighingPiglets}
            weighingData={this.props.state.ws4.weighingData}
          />}
        { this.state.tabs.resettlementTab &&
          <WS4ResettelmentTab 
          query={null}
          getPiglets={this.props.getPiglets}
          piglets={this.props.state.ws4.incomingPigletsList}
          getSections={this.props.getSections}
          sections={this.props.state.ws4.sections}
          getLocations={this.props.getIncomeTabLocations}
          locations={this.props.state.ws4.incomeTabLocations}
          setllePiglets={this.props.setllePiglets}
        />}

      { this.state.tabs.innerTransferTab &&
          <WS4InnerTransferTab 
          query={null}
          getSections={this.props.getSections}
          sections={this.props.state.ws4.sections}
          getLocations1={this.props.getInnerTransferTabLocations1}
          getLocations2={this.props.getInnerTransferTabLocations2}
          locations1={this.props.state.ws4.innerTransferLocations1}
          locations2={this.props.state.ws4.innerTransferLocations2}
          movePiglets={this.props.movePiglets}
        />}

        { this.state.tabs.transferTab &&
          <WS4TransferTab 
          query={null}
          getPiglets={this.props.getTransferPiglets}
          piglets={this.props.state.ws4.transferPiglets}
          getSections={this.props.getSections}
          sections={this.props.state.ws4.sections}
          getLocations={this.props.getIncomeTabLocations}
          locations={this.props.state.ws4.incomeTabLocations}
          setllePiglets={this.props.setllePiglets}
          movePiglets={this.props.movePiglets}
        />}

        { this.state.tabs.cullingTab &&
          <WS4CullingTab 
          query={null}
          getSections={this.props.getSections}
          sections={this.props.state.ws4.sections}
          getLocations={this.props.getIncomeTabLocations}
          locations={this.props.state.ws4.incomeTabLocations}
          cullingPiglets={this.props.cullingPiglets}
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
  dispatch: dispatch,
  getPiglets: query => dispatch(Ws4Actions.getNomadPigletsWs4Request(query)),
  getSections: query => dispatch(Ws4Actions.getSectionsWs4Request(query)),
  getIncomeTabLocations: query => dispatch(Ws4Actions.getIncomeTabLocationsWs4Request(query)),
  setllePiglets: data => dispatch(Ws4Actions.setllePigletsWs4Request(data)),
  getTransferPiglets: query => dispatch(Ws4Actions.getTransferPigletsWs4Request(query)),
  movePiglets: data => dispatch(NomadPigletsActions.moveToPigletsRequest(data)),
  getInnerTransferTabLocations1: query => dispatch(Ws4Actions.getInnerTransferTabLocations1Ws4Request(query)),
  getInnerTransferTabLocations2: query => dispatch(Ws4Actions.getInnerTransferTabLocations2Ws4Request(query)),
  weighingPiglets: data => dispatch(Ws4Actions.weighingPigletsWs4Request(data)),
  cullingPiglets: data => dispatch(NomadPigletsActions.cullingPigletsRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopFourContainer);
