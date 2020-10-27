import React, { Component } from 'react';
// components
import { LoadingMessage } from '../CommonComponents';

import { getDate } from '../utils';


class WSSemenBoarListTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      date_after: null,
      date_before: null,
    }
    this.setData = this.setData.bind(this);
    this.getRecords = this.getRecords.bind(this);
  }
  
  componentDidMount() {
    const { date_before, date_after } = getDate()
    this.setState({
      ...this.state,
      date_after: date_after,
      date_before: date_before,
    })
  }

  setData(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  getRecords() {
    const { date_after, date_before } = this.state
    this.props.getSemenBoarList({ date_after: date_after, date_before: date_before })
    this.setState({
      ...this.state,
    })
  }

  render() {
    const { semenBoarList, listFetching, message } = this.props
    return (
      <div className=''>
        <h4>Таблица</h4>
        <div className="form-group row">
          <div className='col-6'>
            <label for='start-date'>Дата с</label>
            <input type='date'
              id='date_after'
              className="form-control search-input"
              value={this.state.date_after}
              name='date_after'
              onChange={this.setData}
              />
          </div>
          <div className='col-6'>
            <label for='end-date'>Дата до</label>
            <input type='date'
              id='date_before'
              className="form-control search-input"
              value={this.state.date_before}
              name='date_before'
              onChange={this.setData}
              />
          </div>
        </div>
        <div className='row'>
          <div className="form-group col-6">
            <button className='btn btn-secondary' onClick={this.getRecords}>
              Показать записи
            </button>
          </div>
          {/* <div className="form-group col-6">
              <a href='' className={semenBoarList.length > 0 ? '': 'a-disabled'}>
                Скачать в EXCEL формате
              </a>
          </div> */}
        </div>
          { listFetching && < LoadingMessage />}
          {/* <div className='card-overlay card-style'>
            <div className='content'> */}
              <table className='table table-sm'>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Date</th>
                    <th>Breed</th>
                    <th>Tag no.</th>
                    <th>Ejaculate volume (ml)</th>
                    <th>Sperm Concentration (million / ml)</th>
                    <th>Total Sperms in Ejaculate (billion)</th>
                    <th>Motility Score (0-100%)</th>
                    <th>Total Viable Sperms in Ejaculate (billion)</th>
                    <th>Doses from this Collection</th>
                    <th>Actual Volume of Diluted Semen Required (ml)</th>
                    <th>Actual Volume of Diluent Required (ml)</th>
                    <th>Final Motility Score (0 - 100%)</th>
                  </tr>
                  <tr>
                    <th rowSpan='3'>№</th>
                    <th rowSpan='3'>Дата</th>
                    <th rowSpan='3'>Порода</th>
                    <th rowSpan='3'>Номер</th>
                    <th>Количество спермы (мл) <hr/>A</th>
                    <th>Оценка концентрации (млн)<hr/> B</th>
                    <th>Количество спермиев в эякуляте (млрд)<hr/>С<hr/>(A * B / 1000)</th>
                    <th>Оценка подвижности (%)<hr/>D</th>
                    <th>Живых спермиев в эякуляте (млрд)<hr/>E<hr/>(C * D / 100)</th>
                    <th>Количество спермодоз<hr/>F<hr/>(E / 2,0) или (E / 2,5)</th>
                    <th>Общии обьем спермы и разбавителя (мл) <hr/>G<hr/>(F * 90)</th>
                    <th>Обьем разбавителя (мл)<hr/> H<hr/>(G - A)</th>
                    <th>Оценка подвижности (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {semenBoarList.length > 0 && semenBoarList.map((record, index) => 
                    <tr>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        {record.date}
                      </td>
                      <td>
                        {record.boar.breed ? record.boar.breed : 'нет породы'}
                      </td>
                      <td>
                        {record.boar.farm_id}
                      </td>
                      <td>
                        {record.a}
                      </td>
                      <td>
                        {record.b}
                      </td>
                      <td>
                        {record.c}
                      </td>
                      <td>
                        {record.d}
                      </td>
                      <td>
                        {record.e}
                      </td>
                      <td>
                        {record.f}
                      </td>
                      <td>
                        {record.g}
                      </td>
                      <td>
                        {record.h}
                      </td>
                      <td>
                        {record.final_motility_score}
                      </td>
                    </tr>
                    )}
                </tbody>
              </table>
            {/* </div>
          </div> */}
      </div>
    )
  }
}

export default WSSemenBoarListTab