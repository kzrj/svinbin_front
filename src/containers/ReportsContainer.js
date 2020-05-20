import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReportsActions from '../redux/redux-sauce/reports';

// components
import ToursReportsComponent from '../components/Reports/TourReports'
import DirReportComponent from '../components/Reports/DirReport'
import PigsCount from '../components/Reports/PigsCount'
import Operations from '../components/Reports/Operations'


class ReportsContainer extends Component {
  constructor(props) {
		super(props);  
	}

  componentDidMount() {
    // this.props.getTourReports()
    // console.log(this.props.route.name)
  }

  render() {
    // console.log(this.props)
    // console.log(this.props.route.name)
    // console.log(this.props.route)
    const routeName = this.props.route.name
    return (
      <div className="container-fluid report-block">
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
          </div>}

        {routeName == 'Отчёты по турам' && 
          <ToursReportsComponent getTourReports={this.props.getTourReports} reports={this.props.state.reports}/>
        }

        {routeName == 'Отчёт директору' && 
          <DirReportComponent getDirReport={this.props.getDirReport} reports={this.props.state.reports}/>
        }

        {routeName == 'Операции' && 
          <Operations getDirReport={this.props.getDirReport} reports={this.props.state.reports} />
        }

        {routeName == 'Отчёты' && 
          <PigsCount getPigsCountReport={this.props.getPigsCountReport} pigsCount={this.props.state.reports.pigsCount}/>
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
  getTourReports: (token) => dispatch(ReportsActions.getTourReportsRequest(token)),
  getDirReport: (token) => dispatch(ReportsActions.getDirReportRequest(token)),
  getPigsCountReport: (token) => dispatch(ReportsActions.getPigsCountReportRequest(token))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsContainer);
