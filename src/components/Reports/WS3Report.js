import React, { Component } from 'react';
import endpoints from '../../redux/api/endpoints';


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
    // const { date_before, date_after } = this.getDate()
    let dateReps = this.props.reports.ws3Report.results ? this.props.reports.ws3Report.results : []
    let total_info = this.props.reports.ws3Report.total_info ? this.props.reports.ws3Report.total_info : null

    return (
      <div className="container-fluid report-block">
        <h3>Отчет движение поголовья Цех3</h3>
        <div className="form-group row">
          <div className='col-6'>
            <label for='start-date'>Дата с</label>
            <input type='date'
              id='startDate'
              className="form-control search-input"
              value={this.state.startDate}
              name='startDate'
              placeholder="Дата опороса"
              onChange={this.setData}
              />
          </div>
          <div className='col-6'>
            <label for='end-date'>Дата до</label>
            <input type='date'
              id='endDate'
              className="form-control search-input"
              value={this.state.endDate}
              name='endDate'
              placeholder="Дата опороса"
              onChange={this.setData}
              />
          </div>
        </div>
        <div className='row'>
          <div className="form-group col-6">
            <button className='btn btn-secondary' onClick={this.genRep}>
              Сформировать
            </button>
          </div>
          <div className="form-group col-6">
              <a href={endpoints.GET_WS3_REPORT_AS_EXCEL} className={dateReps.length > 0 ? '': 'a-disabled'}>
                Скачать в EXCEL формате
              </a>
          </div>
        </div>

        <table className='report-table'>
          <thead>
            <th ><span className='report-ws-th'>Дата</span></th>
            <th ><span className='report-ws-th'>начало дня подсос</span></th>
            <th ><span className='report-ws-th'>начало дня супорос</span></th>
            <th ><span className='report-ws-th'>поросята сосуны</span></th>
            <th ><span className='report-ws-th'>всего</span></th>
            <th ><span className='report-ws-th'>приход подсос</span></th>
            <th ><span className='report-ws-th'>приход супорос из ц1</span></th>
            <th ><span className='report-ws-th'>приход супорос из ц2</span></th>
            <th ><span className='report-ws-th report-ws-th-vert'>опоросилось</span></th>
            <th ><span className='report-ws-th report-ws-th-vert'>оприходовано</span></th>
            <th ><span className='report-ws-th'>расход подсос</span></th>
            <th ><span className='report-ws-th'>расход супорос</span></th>
            <th ><span className='report-ws-th'>падеж подсос гол</span></th>
            <th ><span className='report-ws-th'>падеж подсос вес</span></th>
            <th ><span className='report-ws-th'>падеж супорос гол</span></th>
            <th ><span className='report-ws-th'>падеж супорос вес</span></th>
            <th ><span className='report-ws-th'>забой подсос гол</span></th>
            <th ><span className='report-ws-th'>забой подсос вес</span></th>
            <th ><span className='report-ws-th'>забой супорос гол</span></th>
            <th ><span className='report-ws-th'>забой супорос вес</span></th>
            <th ><span className='report-ws-th'>поросята перевод гол</span></th>
            <th ><span className='report-ws-th'>поросята перевод вес</span></th>
            <th ><span className='report-ws-th'>поросята перевод вес средний</span></th>
            <th ><span className='report-ws-th'>поросята падеж гол</span></th>
            <th ><span className='report-ws-th'>поросята падеж вес</span></th>
            <th ><span className='report-ws-th'>поросята забой гол</span></th>
            <th ><span className='report-ws-th'>поросята забой вес</span></th>
            <th ><span className='report-ws-th'>поросята ревизия гол</span></th>
            <th ><span className='report-ws-th'>поросята ревизия вес</span></th>
            <th ><span className='report-ws-th'>конец дня подсос</span></th>
            <th ><span className='report-ws-th'>конец дня супорос</span></th>
            <th ><span className='report-ws-th'>поросята сосуны</span></th>
            <th ><span className='report-ws-th'>всего</span></th>
          </thead>
          <tbody>
            {dateReps.length > 0 && dateReps.map((dateRep, index) => 
              <tr key={dateRep['id']}>
                <td className="report-cell-td report-cell-value-ws report-dir-date">{dateRep['date']}</td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['count_sows_ws3_start_date']['podsos']}
                </td>
                <td className="report-cell-td report-cell-value-ws">
                  {dateRep['count_sows_ws3_start_date']['suporos']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['count_piglets_at_start']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['count_sows_ws3_start_date']['podsos'] +
                   dateRep['count_sows_ws3_start_date']['suporos'] + dateRep['count_piglets_at_start']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['tr_in_podsos_count']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['tr_in_from_1_sup_count']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['tr_in_from_2_sup_count']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['count_oporos']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['count_alive']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['tr_out_podsos_count']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['tr_out_sup_count']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['padej_podsos_count']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['padej_podsos_weight']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['padej_sup_count']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['padej_sup_weight']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['vinuzhd_podsos_count']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['vinuzhd_podsos_weight']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['vinuzhd_sup_count']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['vinuzhd_sup_weight']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['tr_out_aka_weight_qnty']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['tr_out_aka_weight_total']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['tr_out_aka_weight_avg']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['piglets_padej_qnty']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['piglets_padej_weight']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['piglets_vinuzhd_qnty']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['piglets_vinuzhd_weight']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateReps[index + 1] && 
                    dateReps[index + 1]['count_sows_ws3_start_date']['podsos']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateReps[index + 1] && 
                    dateReps[index + 1]['count_sows_ws3_start_date']['suporos']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateReps[index + 1] && 
                    dateReps[index + 1]['count_piglets_at_start']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateReps[index + 1] && 
                    dateReps[index + 1]['count_sows_ws3_start_date']['podsos'] +
                    dateReps[index + 1]['count_sows_ws3_start_date']['suporos'] + 
                    dateReps[index + 1]['count_piglets_at_start']}
                </td>
              </tr>
              )}
            {dateReps.length > 0 && 
              <tr className='report-dir-total-tr'>
                <td className="report-cell-td report-cell-value-ws ">Итого</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_tr_in_podsos_count']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_tr_in_from_1_sup_count']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_tr_in_from_2_sup_count']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_count_oporos']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_count_alive']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_tr_out_podsos_count']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_tr_out_sup_count']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_padej_podsos_count']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_padej_podsos_weight']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_padej_sup_count']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_padej_sup_weight']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_vinuzhd_podsos_count']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_vinuzhd_podsos_weight']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_vinuzhd_sup_count']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_vinuzhd_sup_weight']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_tr_out_aka_weight_qnty']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_tr_out_aka_weight_total']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['avg_tr_out_weight']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_piglets_padej_qnty']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_piglets_padej_weight']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_piglets_vinuzhd_qnty']}</td>
                <td className="report-cell-td report-cell-value-ws">{total_info['total_piglets_vinuzhd_weight']}</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
              </tr>
            }
          </tbody>
        </table>

      </div>
    );
  }
}


export default WS3ReportComponent