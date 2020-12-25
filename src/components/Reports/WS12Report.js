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

class WS12ReportComponent extends Component {
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
    let data = this.getDate()
    const { date_before, date_after } = data
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
    this.props.getWsReport({date_after: startDate, date_before: endDate, ws_number: this.props.ws_number})
  }


  render() {
    let dateReps = this.props.wsReport.results ? this.props.wsReport.results : []
    let total_info = this.props.wsReport.total_info ? this.props.wsReport.total_info : null
    
    return (
      <div className="card ">
        <div className='content'>
          <h3>Отчет движение поголовья Цех {this.props.ws_number}</h3>
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
          </div>

          <table className='table table-sm table-responsive'>
            <thead className='bg-mainDark-dark'>
              <tr>
                <th>Дата</th>
                <th>Поголовье на начало дня</th>
                <th>перевод из 2го цеха</th>
                <th>перевод из 3го цеха</th>
                <th>привезли</th>
                <th>забой осн. гол</th>
                <th>забой осн. вес</th>
                <th>забой рем. гол</th>
                <th>забой рем. вес</th>
                <th>забой хряки гол</th>
                <th>забой хряки вес</th>
                <th>падеж осн. гол</th>
                <th>падеж осн. вес</th>
                <th>падеж рем. гол</th>
                <th>падеж рем. вес</th>
                <th>падеж хряки гол</th>
                <th>падеж хряки вес</th>
                <th>перевод в 2 цех</th>
                <th>перевод в 3 цех</th>
                <th>перевод откорм</th>
                <th>продажа, прочие</th>
                <th>кг</th>
                <th>Поголовье на конец дня</th>
              </tr>
              
            </thead>
            <tbody>
              {dateReps.length > 0 && dateReps.map((dateRep, index) => 
                <tr key={dateRep['id']}>
                  <td className='text-nowrap'>
                    {dateRep['date']}
                  </td>
                  <td>
                    {dateRep['ws1_count_sows'] + dateRep['count_boars']}
                  </td>

                  <td>
                    {dateRep['trs_from_2_to_1']}
                  </td>
                  <td>
                    {dateRep['trs_from_3_to_1']}
                  </td>
                  <td></td>

                  <td>
                    {dateRep['ws1_vinuzhd_osn_count']}
                  </td>
                  <td>
                    {dateRep['ws1_vinuzhd_osn_weight']}
                  </td>
                  <td>
                    {dateRep['ws1_vinuzhd_rem_count']}
                  </td>
                  <td>
                    {dateRep['ws1_vinuzhd_rem_weight']}
                  </td>
                  <td>
                    {dateRep['vinuzhd_boar_count']}
                  </td>
                  <td>
                    {dateRep['vinuzhd_boar_weight']}
                  </td>

                  <td>
                    {dateRep['ws1_padej_osn_count']}
                  </td>
                  <td>
                    {dateRep['ws1_padej_osn_weight']}
                  </td>
                  <td>
                    {dateRep['ws1_padej_rem_count']}
                  </td>
                  <td>
                    {dateRep['ws1_padej_rem_weight']}
                  </td>
                  <td>
                    {dateRep['padej_boar_count']}
                  </td>
                  <td>
                    {dateRep['padej_boar_weight']}
                  </td>

                  <td>
                    {dateRep['trs_from_1_to_2']}
                  </td>
                  <td>
                    {dateRep['trs_from_1_to_3']}
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>
                    {dateReps[index + 1] && 
                        (dateReps[index + 1]['ws1_count_sows'] + dateReps[index + 1]['count_boars'])}
                  </td>

                </tr>
              )}
              {dateReps.length > 0 && 
                <tr className='report-dir-total-tr'>
                  <td >Итого</td>
                  <td >-</td>

                  <td >{total_info['total_trs_from_2_to_1']}</td>
                  <td >{total_info['total_trs_from_3_to_1']}</td>

                  <td >-</td>
                  
                  <td >{total_info['total_vinuzhd_osn_count']}</td>
                  <td >{total_info['total_vinuzhd_osn_weight']}</td>
                  <td >{total_info['total_vinuzhd_rem_count']}</td>
                  <td >{total_info['total_vinuzhd_rem_weight']}</td>
                  <td >{total_info['total_vinuzhd_boar_count']}</td>
                  <td >{total_info['total_vinuzhd_boar_weight']}</td>

                  <td >{total_info['total_padej_osn_count']}</td>
                  <td >{total_info['total_padej_osn_weight']}</td>
                  <td >{total_info['total_padej_rem_count']}</td>
                  <td >{total_info['total_padej_rem_weight']}</td>
                  <td >{total_info['total_padej_boar_count']}</td>
                  <td >{total_info['total_padej_boar_weight']}</td>

                  <td >{total_info['total_trs_from_1_to_2']}</td>
                  <td >{total_info['total_trs_from_1_to_3']}</td>

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


export default WS12ReportComponent