import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReportsActions from '../redux/redux-sauce/reports';

// components
import ToursReportsComponent from '../components/Reports/TourReports'
import ToursV2ReportComponent from '../components/Reports/TourV2Report'
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
    console.log(this.props)
    const routeName = this.props.location.pathname.split('/')[2]
    console.log(routeName)
    return (
      <div className="container-fluid">
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
          <div className='col-3'>
            <a href='/reports/tours_v2/'>Отчет по турам V2(взвешивания)</a>
          </div>
        </div>

        {routeName == 'tours' && 
          <ToursReportsComponent getTourReports={this.props.getTourReports} reports={this.props.state.reports}/>
        }

        {routeName == 'tours_v2' && 
          <ToursV2ReportComponent 
            getToursV2Report={this.props.getToursV2Report}
            getTourV2Report={this.props.getTourV2Report}
            reportsFetching={this.props.state.reports.reportsFetching}
            tours={this.props.state.reports.toursV2Reportlist}
            tourData={this.props.state.reports.tourV2Detail}
          />
        }

        {routeName == 'director' && 
          <DirReportComponent getDirReport={this.props.getDirReport} reports={this.props.state.reports}/>
        }

        {routeName == 'ws3report' && 
          <WS3ReportComponent getWs3Report={this.props.getWs3Report} reports={this.props.state.reports}/>
        }

        {routeName == 'operations' && 
          <Operations getOperationsReport={this.props.getOperationsReport} 
            operationsResultList={this.props.state.reports.operations}
            operationsAdditionalData={this.props.state.reports.operations_add_data} />
        }
        
        {!routeName && 
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

  getToursV2Report: (token) => dispatch(ReportsActions.getToursV2ReportRequest(token)),
  getTourV2Report: (token) => dispatch(ReportsActions.getTourV2ReportRequest(token)),

  getWs3Report: (token) => dispatch(ReportsActions.getWs3ReportRequest(token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsContainer);
