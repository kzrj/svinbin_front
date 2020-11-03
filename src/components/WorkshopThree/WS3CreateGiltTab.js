import React, { Component } from 'react';

//components
import { SowSingle }  from '../../components/SowRepresentations'
import { ErrorMessage, ErrorOrMessage } from '../CommonComponents'
import { getDateTimeNow } from './WS3SowFarrowTab'


class WS3CreateGiltTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      mother_sow_farm_id: null,
      mother_sow_id: null,
      birth_id: '',
      date: null,
      query: {
        farm_id_starts: '',
        tour: null,
      },
    }
    
    this.setData = this.setData.bind(this);
    this.createGilt = this.createGilt.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.resetBirthId = this.resetBirthId.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        farm_id_starts: ''
      },
      date: getDateTimeNow()
    })
    this.props.getGiltJournal()
  }

  setQuery (e) {
    let { query } = this.state
    query[e.target.name] = e.target.value

    this.setState({
      ...this.state,
      query: query,
      needToRefresh: true
    })
    
    this.props.getSows({
      ...query
    })
  }

  resetBirthId () {
    this.setState({
      ...this.state,
      birth_id: ''
    })
    this.props.sowsResetErrorsAndMessages()
  }
  
  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  createGilt () {
    const { date, birth_id } = this.state
    const { sow } = this.props

    this.props.createGilt({
      id: sow.id,
      birth_id: birth_id,
      date: date,
    })
    this.setState({
      ...this.state,
      birth_id: '',
    })
    this.props.getGiltJournal()
  }

  render() {
    const { sow, giltJournal, eventError, message, eventFetching } = this.props
    let today = getDateTimeNow()

    return (
      <div className=''>
        <div className='card my-2 mx-1'>
          <div className='content my-2'>
            <h4 className='mt-2 mx-2 mb-1'>Введите номер свиноматки</h4>
            <input type="number" 
              className="font-20 mx-2 my-2 rounded-s input-custom-placeholder" 
              placeholder="Номер свиноматки"
              aria-label="Farmid" aria-describedby="basic-addon1" name='farm_id_starts'
              value={this.state.query.farm_id_starts}
              onChange={this.setQuery} />
          
            <input type='date'
              className='font-20 mx-2 rounded-s bg-color-white'
              value={this.state.date}
              defaultValue={today}
              name='date'
              onChange={this.setData}
              />

            <input type="text" 
              className="font-20 mx-2 rounded-s" 
              placeholder="Номер бирки"
              name='birth_id'
              value={this.state.birth_id}
              onClick={this.resetBirthId}
              onChange={this.setData} />

            <button onClick={this.createGilt}
              className="btn bg-mainDark-dark btn-l font-20 font-900 mx-2 pr-4" type="button" >
              Отметить ремонтку
            </button>
    
              {this.state.date > today 
                ? <ErrorMessage error={{message:'Нельзя выбрать дату в будущем'}}/>
                : <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
                     className='my-0 mx-2' />
              }
              {sow &&
                <SowSingle sow={sow} className='my-0 font-17 font-600 color-mainDark-dark'/>
              }
            </div>
          </div>
          <div className='clearfix'></div>
          {giltJournal.length > 0 &&
            <div className='card my-2 mx-1'>
              <div className='content'>
                <table className='table table-sm'>
                  <thead className='font-10'> 
                    <th className='font-15'>Дата</th>
                    <th className='font-15'>Номер свиноматки</th>
                    <th className='font-15'>Тур/неделя</th>
                    <th className='font-15'>Номер бирки</th>
                  </thead>
                  <tbody>
                    {giltJournal.map(record => 
                      <tr>
                        <td>{record.last_date_mark}</td>
                        <td>{record.farm_id}</td>
                        <td>{record.last_week_mark}</td>
                        <td style={{'line-height': '13px'}}>
                          <p className='my-0 font-700'>({record.gilt_list.length})</p>
                          {record.gilt_list.map(gilt =>
                            <p className='my-0'>
                              {gilt}
                            </p>
                            )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          }

      </div>
    )
  }
}

export default WS3CreateGiltTab