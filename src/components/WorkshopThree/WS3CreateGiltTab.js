import React, { Component } from 'react';

//components
import { getDateTimeNow } from './WS3SowFarrowTab'
import { CreateGiltForm } from '../SowTabs/SowForms'


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

    this.findSow = this.findSow.bind(this);
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
    this.props.setSow(null)
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

  findSow (e) {
    this.props.getByFarmIdSow({'farm_id': e.target.value, simple: true})
  }

  createGilt () {
    this.props.createGilt(this.props.form.values) 
    this.props.getGiltJournal()
  }

  render() {
    const { sow, giltJournal, eventError, message, eventFetching } = this.props
    let today = getDateTimeNow()
    
    return (
      <div className=''>
        <div className='card my-2 mx-1'>
          <div className='content my-2'>
            <CreateGiltForm 
              sow={sow}
              parentSubmit={this.createGilt}
              initialValues={{
                date: today
              }}
              eventError={eventError}
              eventFetching={eventFetching}
              message={message}
            />
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