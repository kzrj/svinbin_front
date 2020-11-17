import React, { Component } from 'react';

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
    let dateReps = this.props.reports.dirReport.results ? this.props.reports.dirReport.results : []
    let total_info = this.props.reports.dirReport.total_info ? this.props.reports.dirReport.total_info : null
    let pigs_count = this.props.reports.dirReport.pigs_count ? this.props.reports.dirReport.pigs_count : null

    return (
      <div className="card">
        <div className='content'>
          <h3 className='mt-1 mb-3'>Отчет движение поголовья</h3>
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

            <button className='btn bg-mainDark-dark ' onClick={this.genRep}>
              Сформировать
            </button>
          </div>

          <table className='table-responsive-sm table table-sm'>
            <thead className='bg-mainDark-dark align-baseline' style={{'line-height': '13px'}}>
              <th >Дата</th>
              <th >Наличие на начало дня</th>
              <th >Перевод из других групп</th>
              <th >Приплод</th>
              <th >Перевод в другую группу</th>
              <th >Падеж</th>
              <th >Забой</th>
              <th >Вынужд забой</th>
              <th >прочие (продажа)</th>
              <th >Прирезка</th>
              <th >Наличие на конец дня</th>
              <th >Оприх свиноматок</th>
              <th >Получено приплода на 1 свиноматку</th>
              <th >Спец. забой поросят с откорма</th>
              <th >Общий вес спец. забоя</th>
            </thead>
            <tbody>
              {dateReps.length > 0 && dateReps.map(dateRep => 
                <tr key={dateRep['id']}>
                  <td className='text-nowrap'>{dateRep['date']}</td>
                  <td className="">{dateRep['sow_qnty_at_date_start'] + dateRep['piglets_qnty_start_date']}</td>
                  <td className="">{dateRep['piglets_transfered']}</td>
                  <td className="">{dateRep['born_alive']}</td>
                  <td className="">{dateRep['piglets_transfered']}</td>
                  <td className="">{dateRep['sow_padej_qnty'] + dateRep['piglets_padej_qnty']}</td>
                  <td className="">{dateRep['piglets_spec_qnty']}</td>
                  <td className="">{dateRep['sow_vinuzhd_qnty'] + dateRep['piglets_vinuzhd_qnty']}</td>
                  <td className="">0</td>
                  <td className="">{dateRep['piglets_prirezka_qnty']}</td>
                  <td className="">{dateRep['sows_quantity_at_date_end'] + dateRep['piglets_qnty_start_end']}</td>
                  <td className="">0</td>
                  <td className="">{dateRep['priplod_by_sow']}</td>
                  <td className="">{dateRep['piglets_spec_qnty']}</td>
                  <td className="">{dateRep['piglets_spec_total_weight']}</td>
                </tr>
                )}
              {dateReps.length > 0 && 
                <tr className='report-dir-total-tr'>
                  <td className=" ">Итого</td>
                  <td className="">-</td>
                  <td className="">-</td>
                  <td className="">{total_info['total_priplod']}</td>
                  <td className="">-</td>
                  <td className="">{total_info['total_sows_padej'] + total_info['total_piglets_padej']}</td>
                  <td className="">{total_info['total_spec']}</td>
                  <td className="">{total_info['total_sows_vinuzhd'] + total_info['total_piglets_vinuzhd']}</td>
                  <td className="">0</td>
                  <td className="">{total_info['total_prirezka']}</td>
                  <td className="">{pigs_count}</td>
                  <td className="">0</td>
                  <td className="">-</td>
                  <td className="">{total_info['total_spec']}</td>
                  <td className="">{total_info['total_spec_weight']}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


export default DirReportComponent