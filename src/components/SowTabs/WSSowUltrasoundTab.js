import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowTable }  from '../../components/SowRepresentations'
import { SowFarmIdFilter, SowTourFilter }  from '../../components/FiltersAndInputs'


class WSSowUltrasoundTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        tour: null,
      },
      choosedSows: [],
      farmId: null,
      result: true,
      needToRefresh: false
    };
    this.setQuery = this.setQuery.bind(this);
    this.sowClick = this.sowClick.bind(this);
    this.setData = this.setData.bind(this);
    this.massUltrasound = this.massUltrasound.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        by_workshop_number: this.props.workshopNumber,
        status_title: this.props.statusTitleFilter
      }
    })
    this.props.getSows({
      by_workshop_number: this.props.workshopNumber,
      status_title: this.props.statusTitleFilter})
    this.props.getTours()
  }

  setQuery (e) {
    let { query } = this.state
    query[e.target.name] = e.target.value
    this.setState({
      ...this.state,
      query: query,
      choosedSows: [],
      needToRefresh: true
    })
  }
  
  sowClick (e) {
    let { choosedSows } = this.state
    const { id } = e.target.dataset
    choosedSows = toggleArray(choosedSows, id)
    this.setState({
      ...this.state,
      choosedSows: choosedSows
    })
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  massUltrasound () {
    const data = {
      sows: this.state.choosedSows,
      days: this.props.daysValue,
      result: this.state.result
    }
    this.props.massUltrasound(data)
    this.setState({
      ...this.state,
      choosedSows: [],
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows(this.state.query)  
      }, 500)
    }
  }

  render() {
    const { sows, tours, days } = this.props
    this.refreshSowsList()
    return (
      <div className='workshop-content'>
        <div>
          <div className='commonfilter row'>
            <label className='sow-event-label'>Фильтр</label>
            <SowFarmIdFilter setQuery={this.setQuery} />
            <SowTourFilter tours={tours} setQuery={this.setQuery}/>
          </div>
          <div>
            <div>
              <div className="input-group">
                <label className='sow-event-label'>УЗИ {days} дней</label>
                <select className="custom-select" id="inputGroupSelect04" 
                  onChange={this.setData} name='result'>
                  <option selected value={true}>Супорос</option>
                  <option value={false}>Прохолост</option>
                </select>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" 
                    onClick={this.massUltrasound}>
                    Провести УЗИ
                  </button>
                </div>
                </div>
            </div>
          </div>
        </div>
        <div className='commonfilter-results'>
          <div className='count row'>
              <div className='col-6'>
                Выбрано {this.state.choosedSows.length} из {sows.length}
              </div>
            </div>
          {this.props.sowsListFetching ? 
            <p className='loading'>Загрузка</p> :
            <SowTable sows={sows} sowClick={this.sowClick} 
              choosedSows={this.state.choosedSows}/>}
        </div>
      </div>
    )
  }
}

export default WSSowUltrasoundTab