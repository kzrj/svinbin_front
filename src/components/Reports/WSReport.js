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

class WSReportComponent extends Component {
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
    data['ws_number'] = this.props.ws_number
    // this.props.getWsReport(data)
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
    let ws_type =  ['4','8'].includes(this.props.ws_number) ? 'doros' : 'otkorm'
    let percentBrak = total_info ? 
      100*(total_info['total_padej_qnty'] + total_info['total_prirezka_qnty'] + total_info['total_vinuzhd_qnty']) 
      / total_info['total_tr_in_qnty'] : 0
    
    return (
      <div className="container-fluid report-block">
        <h3>Отчет движение поголовья Цех {this.props.ws_number}</h3>
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
              <a href={endpoints.get_ws_report_as_excel(this.props.ws_number)} className={dateReps.length > 0 ? '': 'a-disabled'}>
                Скачать в EXCEL формате
              </a>
          </div>
        </div>

        <table className='report-table'>
          <thead>
            <tr >
              <th><span className='report-ws-th'></span></th>
              <th colSpan='3'><span className='report-ws-th'>Наличие на начало дня</span></th>
              <th colSpan='6'><span className='report-ws-th'>Приход</span></th>
              <th colSpan='5'><span className='report-ws-th'>Перевод в другую группу</span></th>
              <th colSpan='5'><span className='report-ws-th'>Падеж</span></th>
              <th colSpan='5'><span className='report-ws-th'>
                  {ws_type == 'doros' ? 'Продажа' : 'Спец. убой'}
                </span>
              </th>
              <th colSpan='4'><span className='report-ws-th'>Вынужденный забой</span></th>
              <th colSpan='2'><span className='report-ws-th'>Прирезка</span></th>
              <th colSpan='3'><span className='report-ws-th'>Наличие на конец дня</span></th>
            </tr>
            <tr>
              <th><span className='report-ws-th'>Дата</span></th>
              <th ><span className='report-ws-th'>поросята</span></th>
              <th ><span className='report-ws-th'>прочие группы</span></th>
              <th ><span className='report-ws-th'>всего</span></th>
            
              <th ><span className='report-ws-th'>из секции</span></th>
              <th ><span className='report-ws-th'>поросята</span></th>
              <th ><span className='report-ws-th'>кг</span></th>
              <th ><span className='report-ws-th'>прочие группы</span></th>
              <th ><span className='report-ws-th'>кг</span></th>
              <th ><span className='report-ws-th'>в секцию</span></th>
              <th ><span className='report-ws-th'>из секции</span></th>
              <th ><span className='report-ws-th'>поросята</span></th>
              <th ><span className='report-ws-th'>в секцию</span></th>
              <th ><span className='report-ws-th'>прочие</span></th>
              <th ><span className='report-ws-th'>в цех</span></th>

              {/* падеж */}
              <th ><span className='report-ws-th'>поросята</span></th>
              <th ><span className='report-ws-th'>живая масса</span></th>
              <th ><span className='report-ws-th'>прочие группы</span></th>
              <th ><span className='report-ws-th'>живая масса</span></th>
              <th ><span className='report-ws-th'>из секции</span></th>

              {/* продажа или спец забой */}
              <th ><span className='report-ws-th'>поросята</span></th>
              <th ><span className='report-ws-th'>живая масса</span></th>
              <th ><span className='report-ws-th'>прочие группы</span></th>
              <th ><span className='report-ws-th'>живая масса</span></th>
              <th ><span className='report-ws-th'>из секции</span></th>

              {/* вынужденный убой */}
              <th ><span className='report-ws-th'>поросята</span></th>
              <th ><span className='report-ws-th'>живая масса</span></th>
              <th ><span className='report-ws-th'>прочие группы</span></th>
              <th ><span className='report-ws-th'>живая масса</span></th>

              {/* прирезка */}
              <th ><span className='report-ws-th'>поросята</span></th>
              <th ><span className='report-ws-th'>живая масса</span></th>

              <th ><span className='report-ws-th'>поросята</span></th>
              <th ><span className='report-ws-th'>прочие группы</span></th>
              <th ><span className='report-ws-th'>всего</span></th>
            </tr>
          </thead>
          <tbody>
            {dateReps.length > 0 && dateReps.map((dateRep, index) => 
              <tr key={dateRep['id']}>
                <td className="report-cell-td report-cell-value-ws report-dir-date">{dateRep['date']}</td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['count_piglets_at_start']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">0</td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['count_piglets_at_start']}
                </td>

                {/* Приход */}
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['tr_in_qnty']} 
                  {dateRep['tr_in_aka_weight_in_qnty'] && '('+dateRep['tr_in_aka_weight_in_qnty']+')'}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['tr_in_aka_weight_in_total']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>

                {/* Перевод в другую группу */}
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['tr_out_qnty']} 
                  { dateRep['tr_out_aka_weight_in_qnty'] > 0 &&
                   '('+dateRep['tr_out_aka_weight_in_qnty']+')'}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>

                {/* Падеж */}
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['padej_qnty']}</td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['padej_total_weight']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>

                {/* продажа или спец */}
                {ws_type == 'doros' ? [
                    <td className="report-cell-td report-cell-value-ws report-dir-date"></td>,
                    <td className="report-cell-td report-cell-value-ws report-dir-date"></td>,
                    <td className="report-cell-td report-cell-value-ws report-dir-date"></td>,
                    <td className="report-cell-td report-cell-value-ws report-dir-date"></td>,
                    <td className="report-cell-td report-cell-value-ws report-dir-date"></td>,
                  ] 
                  :
                  [
                    <td className="report-cell-td report-cell-value-ws report-dir-date">
                      {dateRep['spec_qnty']}
                    </td>,
                    <td className="report-cell-td report-cell-value-ws report-dir-date">
                      {dateRep['spec_total_weight']}
                    </td>,
                    <td className="report-cell-td report-cell-value-ws report-dir-date"></td>,
                    <td className="report-cell-td report-cell-value-ws report-dir-date"></td>,
                    <td className="report-cell-td report-cell-value-ws report-dir-date"></td>,
                  ]
                }
                
                {/* вынужденный */}
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['vinuzhd_qnty']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['vinuzhd_total_weight']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>
                <td className="report-cell-td report-cell-value-ws report-dir-date"></td>

                {/* прирезка */}
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['prirezka_qnty']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateRep['prirezka_total_weight']}
                </td>

                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateReps[index +1] && dateReps[index + 1]['count_piglets_at_start']}
                </td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">0</td>
                <td className="report-cell-td report-cell-value-ws report-dir-date">
                  {dateReps[index +1] && dateReps[index + 1]['count_piglets_at_start']}
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

                <td className="report-cell-td report-cell-value-ws">
                  {total_info['total_tr_in_qnty']} 
                  {total_info['total_tr_in_aka_weight_in_qnty'] > 0 && 
                    '('+total_info['total_tr_in_aka_weight_in_qnty']+')'}
                </td>
                <td className="report-cell-td report-cell-value-ws">
                  {total_info['total_tr_in_aka_weight_in_total']} 
                </td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">
                  {total_info['total_tr_out_qnty']} 
                  {total_info['total_tr_out_aka_weight_in_qnty'] > 0 && 
                    '('+total_info['total_tr_out_aka_weight_in_qnty']+')'}
                </td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">
                  {total_info['total_padej_qnty']} 
                </td>
                <td className="report-cell-td report-cell-value-ws">
                  {total_info['total_padej_total_weight']} 
                </td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                {ws_type == 'doros' ? [
                  <td className="report-cell-td report-cell-value-ws">-</td>,
                  <td className="report-cell-td report-cell-value-ws">-</td>
                  ]
                  :
                  [
                    <td className="report-cell-td report-cell-value-ws">
                      {total_info['total_spec_qnty']} 
                    </td>,
                    <td className="report-cell-td report-cell-value-ws">
                      {total_info['total_spec_total_weight']} 
                    </td>
                  ]
                }
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">
                  {total_info['total_vinuzhd_qnty']} 
                </td>
                <td className="report-cell-td report-cell-value-ws">
                  {total_info['total_vinuzhd_total_weight']} 
                </td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">-</td>
                <td className="report-cell-td report-cell-value-ws">
                  {total_info['total_prirezka_qnty']} 
                </td>
                <td className="report-cell-td report-cell-value-ws">
                  {total_info['total_prirezka_total_weight']} 
                </td>
              </tr>
            }
          </tbody>
        </table>
        {dateReps.length > 0 && ws_type == 'doros' &&
          <div>
            <p>Процент брака(падеж, прирезка, вынужденный убой) от прихода - {percentBrak ? percentBrak.toFixed(2) : 0}%</p>
            <p>Средний вес головы: </p>
            <p>Падеж - {total_info['total_padej_avg_weight'] 
                ? total_info['total_padej_avg_weight'].toFixed(2) : 0} кг</p>
            <p>Прирезка - {total_info['total_prirezka_avg_weight'] ? 
                total_info['total_prirezka_avg_weight'].toFixed(2) : 0} кг</p>
            <p>Вынужденный убой - {total_info['total_vinuzhd_avg_weight'] ? 
                total_info['total_vinuzhd_avg_weight'].toFixed(2) : 0} кг</p>
          </div>
        }
      </div>
    );
  }
}


export default WSReportComponent