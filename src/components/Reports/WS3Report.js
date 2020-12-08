import React, { Component } from 'react';
import endpoints from '../../redux/api/endpoints';

import TextField from '@material-ui/core/TextField';


export const getDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  let month_ago = (mm - 1) > 0 ? (mm-1).toString() : (12).toString();
  month_ago = month_ago < 10 ? '0' + month_ago : month_ago
  let month_ago_day = yyyy + '-' + month_ago + '-' + dd;
  return {date_after: month_ago_day, date_before: today}
}

class WS3ReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,

      needToRefresh: false
    }
    this.setData = this.setData.bind(this);
    this.genRep = this.genRep.bind(this);
    this.getDate = getDate.bind(this);
    this.exportAsExcel = this.exportAsExcel.bind(this);
	}

  componentDidMount() {
    this.props.getWs3Report(this.getDate())
    const { date_before, date_after } = this.getDate()
    this.setState({
      ...this.state,
      startDate: date_after,
      endDate: date_before,
    })
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  genRep () {
    const { startDate, endDate } = this.state
    this.props.getWs3Report({date_after: startDate, date_before: endDate})
  }

  exportAsExcel () {
    // this.props.getWs3ReportAsExcel()
    // return axios.get(endpoints.GET_WS3_REPORT_AS_EXCEL, { })
  }

  render() {
    let dateReps = this.props.reports.ws3Report.results ? this.props.reports.ws3Report.results : []
    let total_info = this.props.reports.ws3Report.total_info ? this.props.reports.ws3Report.total_info : null

    return (
      <div className="card">
        <div className='content'>
          <h3 className='mt-1 mb-3'>Отчет движение поголовья Цех3</h3>
          <div className="mt-2 mb-3 mx-2">
            <TextField
                label={'Дата с'}
                type="date"
                name='startDate'
                className='mr-2'
                value={this.state.startDate}
                onChange={this.setData}
                InputLabelProps={{
                  className: '',
                  shrink: true 
                }}
              />
              <TextField
                label={'Дата до'}
                type="date"
                name='endDate'
                className='mr-2'
                value={this.state.endDate}
                onChange={this.setData}
                InputLabelProps={{
                  className: '',
                  shrink: true 
                }}
              />
              <button className='btn bg-mainDark-dark mr-2 ' onClick={this.genRep}>
                Сформировать
              </button>
              <a className='ml-2 float-right' href={endpoints.GET_WS3_REPORT_AS_EXCEL} className={dateReps.length > 0 ? '': 'a-disabled'}>
                Скачать в EXCEL формате
              </a>
            
          </div>

          <table className='table table-responsive table-sm'>
            <thead className='bg-mainDark-dark'>
              <th >Дата</th>
              <th >начало дня подсос</th>
              <th >начало дня супорос</th>
              <th >поросята сосуны</th>
              <th >всего</th>
              <th >приход подсос</th>
              <th >приход супорос из ц1</th>
              <th >приход супорос из ц2</th>
              <th >опоросилось</th>
              <th >оприходовано</th>
              <th >расход подсос</th>
              <th >расход супорос</th>
              <th >падеж подсос гол</th>
              <th >падеж подсос вес</th>
              <th >падеж супорос гол</th>
              <th >падеж супорос вес</th>
              <th >забой подсос гол</th>
              <th >забой подсос вес</th>
              <th >забой супорос гол</th>
              <th >забой супорос вес</th>
              <th >поросята перевод гол</th>
              <th >поросята перевод вес</th>
              <th >поросята перевод вес средний</th>
              <th >поросята падеж гол</th>
              <th >поросята падеж вес</th>
              <th >поросята забой гол</th>
              <th >поросята забой вес</th>
              <th >поросята ревизия гол</th>
              <th >поросята ревизия вес</th>
              <th >конец дня подсос</th>
              <th >конец дня супорос</th>
              <th >поросята сосуны</th>
              <th >всего</th>
            </thead>
            <tbody>
              {dateReps.length > 0 && dateReps.map((dateRep, index) => 
                <tr key={dateRep['id']}>
                  <td className='text-nowrap'>{dateRep['date']}</td>
                  <td >
                    {dateRep['count_sows_ws3_start_date']['podsos']}
                  </td>
                  <td >
                    {dateRep['count_sows_ws3_start_date']['suporos']}
                  </td>
                  <td >
                    {dateRep['count_piglets_at_start']}
                  </td>
                  <td >
                    {dateRep['count_sows_ws3_start_date']['podsos'] +
                    dateRep['count_sows_ws3_start_date']['suporos'] + dateRep['count_piglets_at_start']}
                  </td>
                  <td >
                    {dateRep['tr_in_podsos_count']}
                  </td>
                  <td >
                    {dateRep['tr_in_from_1_sup_count']}
                  </td>
                  <td >
                    {dateRep['tr_in_from_2_sup_count']}
                  </td>
                  <td >
                    {dateRep['count_oporos']}
                  </td>
                  <td >
                    {dateRep['count_alive']}
                  </td>
                  <td >
                    {dateRep['tr_out_podsos_count']}
                  </td>
                  <td >
                    {dateRep['tr_out_sup_count']}
                  </td>
                  <td >
                    {dateRep['padej_podsos_count']}
                  </td>
                  <td >
                    {dateRep['padej_podsos_weight']}
                  </td>
                  <td >
                    {dateRep['padej_sup_count']}
                  </td>
                  <td >
                    {dateRep['padej_sup_weight']}
                  </td>
                  <td >
                    {dateRep['vinuzhd_podsos_count']}
                  </td>
                  <td >
                    {dateRep['vinuzhd_podsos_weight']}
                  </td>
                  <td >
                    {dateRep['vinuzhd_sup_count']}
                  </td>
                  <td >
                    {dateRep['vinuzhd_sup_weight']}
                  </td>
                  <td >
                    {dateRep['tr_out_aka_weight_qnty']}
                  </td>
                  <td >
                    {dateRep['tr_out_aka_weight_total']}
                  </td>
                  <td >
                    {dateRep['tr_out_aka_weight_avg']}
                  </td>
                  <td >
                    {dateRep['piglets_padej_qnty']}
                  </td>
                  <td >
                    {dateRep['piglets_padej_weight']}
                  </td>
                  <td >
                    {dateRep['piglets_vinuzhd_qnty']}
                  </td>
                  <td >
                    {dateRep['piglets_vinuzhd_weight']}
                  </td>
                  <td >
                  </td>
                  <td >
                  </td>
                  <td >
                    {dateReps[index + 1] && 
                      dateReps[index + 1]['count_sows_ws3_start_date']['podsos']}
                  </td>
                  <td >
                    {dateReps[index + 1] && 
                      dateReps[index + 1]['count_sows_ws3_start_date']['suporos']}
                  </td>
                  <td >
                    {dateReps[index + 1] && 
                      dateReps[index + 1]['count_piglets_at_start']}
                  </td>
                  <td >
                    {dateReps[index + 1] && 
                      dateReps[index + 1]['count_sows_ws3_start_date']['podsos'] +
                      dateReps[index + 1]['count_sows_ws3_start_date']['suporos'] + 
                      dateReps[index + 1]['count_piglets_at_start']}
                  </td>
                </tr>
                )}
              {dateReps.length > 0 && 
                <tr className='report-dir-total-tr'>
                  <td >Итого</td>
                  <td >-</td>
                  <td >-</td>
                  <td >-</td>
                  <td >-</td>
                  <td >{total_info['total_tr_in_podsos_count']}</td>
                  <td >{total_info['total_tr_in_from_1_sup_count']}</td>
                  <td >{total_info['total_tr_in_from_2_sup_count']}</td>
                  <td >{total_info['total_count_oporos']}</td>
                  <td >{total_info['total_count_alive']}</td>
                  <td >{total_info['total_tr_out_podsos_count']}</td>
                  <td >{total_info['total_tr_out_sup_count']}</td>
                  <td >{total_info['total_padej_podsos_count']}</td>
                  <td >{total_info['total_padej_podsos_weight']}</td>
                  <td >{total_info['total_padej_sup_count']}</td>
                  <td >{total_info['total_padej_sup_weight']}</td>
                  <td >{total_info['total_vinuzhd_podsos_count']}</td>
                  <td >{total_info['total_vinuzhd_podsos_weight']}</td>
                  <td >{total_info['total_vinuzhd_sup_count']}</td>
                  <td >{total_info['total_vinuzhd_sup_weight']}</td>
                  <td >{total_info['total_tr_out_aka_weight_qnty']}</td>
                  <td >{total_info['total_tr_out_aka_weight_total']}</td>
                  <td >{total_info['avg_tr_out_weight']}</td>
                  <td >{total_info['total_piglets_padej_qnty']}</td>
                  <td >{total_info['total_piglets_padej_weight']}</td>
                  <td >{total_info['total_piglets_vinuzhd_qnty']}</td>
                  <td >{total_info['total_piglets_vinuzhd_weight']}</td>
                  <td >-</td>
                  <td >-</td>
                  <td >-</td>
                  <td >-</td>
                  <td >-</td>
                  <td >-</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


export default WS3ReportComponent