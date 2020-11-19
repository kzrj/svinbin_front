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
        <h4 className='mt-2 mx-2'>Таблица</h4>
        <div className='card card-style mx-0 mt-2'>
          <div className='content mb-0'>
            <div className='float-left mr-3'>
              <label for='start-date'>Дата с</label>
              <input type='date'
                id='date_after'
                className="form-control search-input"
                value={this.state.date_after}
                name='date_after'
                onChange={this.setData}
                />
              </div>
            
            <div className=''>
              <label for='end-date'>Дата до</label>
              <input type='date'
                id='date_before'
                className="form-control search-input"
                value={this.state.date_before}
                name='date_before'
                onChange={this.setData}
                />
            </div>
            
            <button className='btn btn-m mt-2 font-900 shadow-s bg-mainDark-dark text-wrap'
               onClick={this.getRecords}>
              Показать записи
            </button>
          </div>
          <div className='content mx-1'>
            { listFetching && < LoadingMessage />}
            <table className='table table-sm text-center table-responsive'>
              <thead style={{'line-height': '10px'}} className='font-13 font-300 bg-mainDark-dark'>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Breed</th>
                  <th>Tag no.</th>
                  <th>Week</th>
                  <th>Ejaculate volume (ml)  А</th>
                  <th>Sperm Concentration (million / ml) В</th>
                  <th>Total Sperms in Ejaculate (billion) С = (A * B / 1000)</th>
                  <th>Motility Score (0-100%) D</th>
                  <th>Total Viable Sperms in Ejaculate (billion) E = (C * D / 100)</th>
                  <th>Doses from this Collection F</th>
                  <th>Actual Volume of Diluted Semen Required (ml) G</th>
                  <th>Actual Volume of Diluent Required (ml) H = (G - A)</th>
                  <th>Final Motility Score (0 - 100%)</th>
                </tr>
              </thead>
              <tbody>
                {semenBoarList.length > 0 && semenBoarList.map((record, index) => 
                  <tr>
                    <td>
                      {index + 1}
                    </td>
                    <td className='text-nowrap'>
                      {record.date}
                    </td>
                    <td className='text-nowrap'>
                      {record.boar.breed ? record.boar.breed : 'нет породы'}
                    </td>
                    <td>
                      {record.boar.farm_id}
                    </td>
                    <td className='text-nowrap'>
                      {record.week_number}
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
          </div>
        </div>
      </div>
    )
  }
}

export default WSSemenBoarListTab