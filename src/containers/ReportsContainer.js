import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReportsActions from '../redux/redux-sauce/reports';

// components
import ToursReportsComponent from '../components/Reports/TourReports'
import DirReportComponent from '../components/Reports/DirReport'
import WS3ReportComponent from '../components/Reports/WS3Report'
import PigsCount from '../components/Reports/PigsCount'
import Operations from '../components/Reports/Operations'


class ReportsContainer extends Component {
  constructor(props) {
		super(props);  
	}

  componentDidMount() {
  }

  render() {
    const routeName = this.props.route.name
    return (
      <div className="container-fluid">
        {routeName == 'Отчёты' && 
          <div className='row'>
            <div className='col-3 ws-home'>
              <a href='/reports/tours/'>Отчет по турам</a>
            </div>
            <div className='col-3 ws-home'>
              <a href='/reports/director/'>Отчет движение поголовья(директору)</a>
            </div>
            <div className='col-3 ws-home'>
              <a href='/reports/operations/'>Операции по цехам</a>
            </div>
            <div className='col-3 ws-home'>
              <a href='/reports/ws3report/'>Отчет движение поголовья цех3</a>
            </div>
          </div>}

        {routeName == 'Отчёты по турам' && 
          <ToursReportsComponent getTourReports={this.props.getTourReports} reports={this.props.state.reports}/>
        }

        {routeName == 'Отчёт директору' && 
          <DirReportComponent getDirReport={this.props.getDirReport} reports={this.props.state.reports}/>
        }

        {routeName == 'Отчёт Цех3' && 
          <WS3ReportComponent getWs3Report={this.props.getWs3Report} reports={this.props.state.reports}/>
        }

        {routeName == 'Операции' && 
          <Operations getOperationsReport={this.props.getOperationsReport} 
            operationsResultList={this.props.state.reports.operations}
            operationsAdditionalData={this.props.state.reports.operations_add_data} />
        }
        
        {routeName == 'Отчёты' && 
          <div className='report-block'>
            <PigsCount getPigsCountReport={this.props.getPigsCountReport} 
              pigsCount={this.props.state.reports.pigsCount}/>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notifications,
  state: state,
})

const mapDispatchToProps = (dispatch) => ({
  getTourReports: (token) => dispatch(ReportsActions.getTourReportsRequest(token)),
  getDirReport: (token) => dispatch(ReportsActions.getDirReportRequest(token)),
  getPigsCountReport: (token) => dispatch(ReportsActions.getPigsCountReportRequest(token)),
  getOperationsReport: (token) => dispatch(ReportsActions.getOperationsReportRequest(token)),

  getWs3Report: (token) => dispatch(ReportsActions.getWs3ReportRequest(token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsContainer);
