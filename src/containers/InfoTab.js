import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperationsWs from '../components/Reports/OperationsWs'
import { WsOpInputs4 } from '../components/Reports/OperationsWs'
import WSReportComponent from '../components/Reports/WSReport'
import WS3ReportComponent from '../components/Reports/WS3Report'
import WSPopulationAndCellOpsComponent from '../components/Reports/WSPopulationAndCellOps'

import ReportsActions from '../redux/redux-sauce/reports';
import InputsActions from '../redux/redux-sauce/inputs';


class InfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {name: 'populationTab',  active: true, title: 'Текущее количество и операции по клеткам'},
        {name: 'operationsTab',  active: false, title: 'Операции'},
        {name: 'reportsTab',     active: false,  title: 'Отчет'},
      ],
    };
    this.setTab = this.setTab.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
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
      <div className="mx-2">
        <div className='my-2'>
          <button className='btn btn-xs bg-mainDark-light mr-2' onClick={() => this.setTab({name: 'populationTab'})}>Текущее количество и операции по клеткам</button>
          <button className='btn btn-xs bg-mainDark-light mr-2' onClick={() => this.setTab({name: 'operationsTab'})}>Операции</button>
          <button className='btn btn-xs bg-mainDark-light mr-2' onClick={() => this.setTab({name: 'reportsTab'})}>Отчет</button>
        </div>
        <div>
          {activeTab.name === 'populationTab' && this.props.ws_number && this.props.ws_number == '3' &&
            <WSPopulationAndCellOpsComponent 
              getWsPopulation={this.props.getWsPopulation}
              populationData={this.props.state.reports.wsAndSectionsPopulation}
            />
          }
          {activeTab.name === 'operationsTab' && this.props.ws_number && this.props.ws_number == '3' &&
            <OperationsWs 
              getOperationsReport={this.props.getOperationsReport} 
              operationsResultList={this.props.state.reports.operations}
              operationsAddData={this.props.state.reports.operations_add_data}
              operationsInputs={this.props.state.inputs.operationsInputs}
              getWsReportPigsCount={this.props.getWsReportPigsCount}
              pigsCount={this.props.state.reports.wsReportPigsCount}
              farmId={true}
              // workshopNumber={3}
            >
              <div>
                <label>Свиноматки</label>
                <WsOpInputs4 
                  operationsInputs={this.props.state.inputs.operationsInputs} 
                  ws_number={'3s'} 
                  changeOperationsInputs={this.props.changeOperationsInputs} 
                  type={'sow'}
                  />
              </div>
              <div>
                <label>Поросята</label>
                <WsOpInputs4 
                  operationsInputs={this.props.state.inputs.operationsInputs} 
                  ws_number={'3p'} 
                  changeOperationsInputs={this.props.changeOperationsInputs} 
                  type={'piglets'}/>
              </div>
            </OperationsWs>
          }
          {activeTab.name === 'operationsTab' && this.props.ws_number && this.props.ws_number != '3' &&
            <OperationsWs 
                getOperationsReport={this.props.getOperationsReport} 
                operationsResultList={this.props.state.reports.operations}
                operationsInputs={this.props.state.inputs.operationsInputs}
                getWsReportPigsCount={this.props.getWsReportPigsCount}
                // pigsCount={this.props.state.reports.ws3ReportPigsCount}
                farmId={false}
              >
                <div>
                  <WsOpInputs4 
                    operationsInputs={this.props.state.inputs.operationsInputs} 
                    ws_number={this.props.ws_number} 
                    changeOperationsInputs={this.props.changeOperationsInputs} 
                    type={'piglets'}
                    />
                </div>
            </OperationsWs>
          }
          {activeTab.name === 'reportsTab' && this.props.ws_number && this.props.ws_number == '3' &&
            <WS3ReportComponent getWs3Report={this.props.getWs3Report} reports={this.props.state.reports}/>
          }
          {activeTab.name === 'reportsTab' && this.props.ws_number && this.props.ws_number != '3' &&
            <WSReportComponent 
                ws_number={this.props.ws_number} 
                getWsReport={this.props.getWsReport}
                wsReport={this.props.state.reports.wsReport}
              />
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  notifications: state.notifications,
  state: state
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
  // info
  getOperationsReport: (token) => dispatch(ReportsActions.getOperationsReportRequest(token)),
  getWsReport: (filters) => dispatch(ReportsActions.getWsReportRequest(filters)),
  getWsReportPigsCount: (filters) => dispatch(ReportsActions.getWsReportPigsCountRequest(filters)),
  getWs3Report: (token) => dispatch(ReportsActions.getWs3ReportRequest(token)),
  getWsPopulation: (token) => dispatch(ReportsActions.getWsPopulationRequest(token)),

  // inputs
  changeOperationsInputs: data => dispatch(InputsActions.changeOperationsInputs(data)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoTab);