import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, reset } from "redux-form";

import ReportsActions from '../redux/redux-sauce/reports';
import ToursActions from '../redux/redux-sauce/tours';

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
    this.props.getTours()
  }

  render() {
    const routeName = this.props.location.pathname.split('/')[2]
    
    return (
      <div className="">
        {!routeName &&
          <div className='card mb-2'>
            <div className='content'>
              <a className='d-block' href='/reports/tours/'>Отчет по турам</a>
              <a className='d-block' href='/reports/director/'>Отчет движение поголовья(директору)</a>
              <a className='d-block' href='/reports/operations/'>Операции по цехам</a>
              <a className='d-block' href='/reports/ws3report/'>Отчет движение поголовья цех3</a>
              <a className='d-block' href='/reports/tours_v2/'>Отчет по турам V2(взвешивания)</a>
            </div>
          </div>
        }
        {routeName == 'tours' && 
          <ToursReportsComponent 
            getTourReports={this.props.getTourReports} 
            reports={this.props.state.reports}

            tours={this.props.state.tours.list}
            form={this.props.state.form.tourFilterForm}

            toursFormSetID={this.props.toursFormSetID}
            />
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

  getTours: query => dispatch(ToursActions.getToursRequest(query)),

  toursFormSetID: ids => dispatch(change( "tourFilterForm", "ids", ids )),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsContainer);
