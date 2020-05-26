import React, { Component } from 'react';


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

class DirReportComponent extends Component {
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
	}

  componentDidMount() {
    this.props.getDirReport(this.getDate())
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
    this.props.getDirReport({date_after: startDate, date_before: endDate})
  }

  render() {
    // const { date_before, date_after } = this.getDate()
    let dateReps = this.props.reports.dirReport.results ? this.props.reports.dirReport.results : []
    let total_info = this.props.reports.dirReport.total_info ? this.props.reports.dirReport.total_info : null
    let pigs_count = this.props.reports.dirReport.pigs_count ? this.props.reports.dirReport.pigs_count : null

    return (
      <div className="container-fluid report-block">
        <h3>Отчет движение поголовья</h3>
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
        <div className="form-group">
          <button className='btn btn-secondary' onClick={this.genRep}>
            Сформировать
          </button>
        </div>

        <table className='report-table'>
          <thead>
            <th ><span className='report-dir-th'>Дата</span></th>
            <th ><span className='report-dir-th'>Наличие на начало дня</span></th>
            <th ><span className='report-dir-th'>Перевод из других групп</span></th>
            <th ><span className='report-dir-th'>Приплод</span></th>
            <th ><span className='report-dir-th'>Перевод в другую группу</span></th>
            <th ><span className='report-dir-th'>Падеж</span></th>
            <th ><span className='report-dir-th'>Забой</span></th>
            <th ><span className='report-dir-th'>Вынужд забой</span></th>
            <th ><span className='report-dir-th'>прочие (продажа)</span></th>
            <th ><span className='report-dir-th'>Прирезка</span></th>
            <th ><span className='report-dir-th'>Наличие на конец дня</span></th>
            <th ><span className='report-dir-th'>Оприх свиноматок</span></th>
            <th ><span className='report-dir-th'>Получено приплода на 1 свиноматку</span></th>
            <th ><span className='report-dir-th'>Спец. забой поросят с откорма</span></th>
            <th ><span className='report-dir-th'>Общий вес спец. забоя</span></th>
          </thead>
          <tbody>
            {dateReps.length > 0 && dateReps.map(dateRep => 
              <tr key={dateRep['id']}>
                <td className="report-cell-td report-cell-value report-dir-date">{dateRep['date']}</td>
                <td className="report-cell-td report-cell-value">{dateRep['sow_qnty_at_date_start'] + dateRep['piglets_qnty_start_date']}</td>
                <td className="report-cell-td report-cell-value">{dateRep['piglets_transfered']}</td>
                <td className="report-cell-td report-cell-value">{dateRep['born_alive']}</td>
                <td className="report-cell-td report-cell-value">{dateRep['piglets_transfered']}</td>
                <td className="report-cell-td report-cell-value">{dateRep['sow_padej_qnty'] + dateRep['piglets_padej_qnty']}</td>
                <td className="report-cell-td report-cell-value">{dateRep['piglets_spec_qnty']}</td>
                <td className="report-cell-td report-cell-value">{dateRep['sow_vinuzhd_qnty'] + dateRep['piglets_vinuzhd_qnty']}</td>
                <td className="report-cell-td report-cell-value">0</td>
                <td className="report-cell-td report-cell-value">{dateRep['piglets_prirezka_qnty']}</td>
                <td className="report-cell-td report-cell-value">{dateRep['sows_quantity_at_date_end'] + dateRep['piglets_qnty_start_end']}</td>
                <td className="report-cell-td report-cell-value">0</td>
                <td className="report-cell-td report-cell-value">{dateRep['priplod_by_sow']}</td>
                <td className="report-cell-td report-cell-value">{dateRep['piglets_spec_qnty']}</td>
                <td className="report-cell-td report-cell-value">{dateRep['piglets_spec_total_weight']}</td>
              </tr>
              )}
            {dateReps.length > 0 && 
              <tr className='report-dir-total-tr'>
                <td className="report-cell-td report-cell-value ">Итого</td>
                <td className="report-cell-td report-cell-value">-</td>
                <td className="report-cell-td report-cell-value">-</td>
                <td className="report-cell-td report-cell-value">{total_info['total_priplod']}</td>
                <td className="report-cell-td report-cell-value">-</td>
                <td className="report-cell-td report-cell-value">{total_info['total_sows_padej'] + total_info['total_piglets_padej']}</td>
                <td className="report-cell-td report-cell-value">{total_info['total_spec']}</td>
                <td className="report-cell-td report-cell-value">{total_info['total_sows_vinuzhd'] + total_info['total_piglets_vinuzhd']}</td>
                <td className="report-cell-td report-cell-value">0</td>
                <td className="report-cell-td report-cell-value">{total_info['total_prirezka']}</td>
                <td className="report-cell-td report-cell-value">{pigs_count}</td>
                <td className="report-cell-td report-cell-value">0</td>
                <td className="report-cell-td report-cell-value">-</td>
                <td className="report-cell-td report-cell-value">{total_info['total_spec']}</td>
                <td className="report-cell-td report-cell-value">{total_info['total_spec_weight']}</td>
              </tr>
            }
          </tbody>
        </table>

      </div>
    );
  }
}


export default DirReportComponent