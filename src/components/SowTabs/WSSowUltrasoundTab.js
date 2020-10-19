import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowTable }  from '../../components/SowRepresentations'
import { SowFarmIdFilter, SowTourFilter }  from '../../components/FiltersAndInputs'
import { FetchingErrorComponentMessage } from '../CommonComponents'

function UsoundButtons (props) {
  return (
    <div>
      <div className='row'>
        <div className='col-4'>
          <button className='btn btn-success' data-result={true} onClick={props.clickButton}>
            Супорос
          </button>
        </div>
        <div className='col-4'>
          <button className='btn btn-danger'data-result={false} onClick={props.clickButton}>
            Прохолост
          </button>
        </div>
        <div className='col-4'>
          <button className='btn btn-info' onClick={props.clickAbort}>
            Аборт
          </button>
        </div>
      </div>
    </div>
  )
}


class WSSowUltrasoundTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        tour: null,
        alive:true,
        farm_id_starts: ''
      },
      choosedSows: [],
      farmId: '',
      result: true,
      needToRefresh: false
    };
    this.setQuery = this.setQuery.bind(this);
    this.sowClick = this.sowClick.bind(this);
    this.chooseAll = this.chooseAll.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.setData = this.setData.bind(this);
    this.clickButton = this.clickButton.bind(this);
    this.clickAbort = this.clickAbort.bind(this);
    this.massUltrasound = this.massUltrasound.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        alive:true,
        by_workshop_number: this.props.workshopNumber,
        status_title: this.props.statusTitleFilter
      }
    })
    this.props.getSows({
      alive:true,
      by_workshop_number: this.props.workshopNumber,
      status_title: this.props.statusTitleFilter})
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

  chooseAll () {
    const { sows } = this.props
    let choosedSows = []
    sows.map(sow => choosedSows = toggleArray(choosedSows, sow.id.toString()))
    this.setState({
      ...this.state,
      choosedSows: choosedSows
    })
  }

  resetAll () {
    this.setState({
      ...this.state,
      choosedSows: []
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
      query: {...this.state.query, farm_id_starts: ''}, 
      choosedSows: [],
      needToRefresh: true
    })
  }

  clickButton (e) {
    const data = {
      sows: this.state.choosedSows,
      days: this.props.daysValue,
      result: e.target.dataset.result
    }
    this.props.massUltrasound(data)
    this.setState({
      ...this.state,
      query: {...this.state.query, farm_id_starts: ''}, 
      choosedSows: [],
      needToRefresh: true
    })
  }

  clickAbort () {
    this.props.abortionSow({id: this.state.choosedSows[0]})
    this.setState({
      ...this.state,
      query: {...this.state.query, farm_id_starts: ''}, 
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
    const { sows, tours, days, eventError, message, errorList } = this.props
    this.refreshSowsList()
    
    return (
      <div className='workshop-content'>
        <div>
          <div className='commonfilter row'>
            <label className='sow-event-label'>Фильтр</label>
            <SowFarmIdFilter farm_id_starts={this.state.query.farm_id_starts} setQuery={this.setQuery} />
            <SowTourFilter tours={tours} setQuery={this.setQuery}/>
          </div>
          <div>
          <FetchingErrorComponentMessage 
            fetching={this.props.eventFetching}
            error={eventError}
            message={message}
            component={
              <UsoundButtons clickButton={this.clickButton} clickAbort={this.clickAbort}/>
            }
          />
          </div>
        </div>
        <div className='commonfilter-results'>
          <div className='count row'>
              <div className='col-4'>
                Выбрано {this.state.choosedSows.length} из {sows.length}
              </div>
              <div className='col-4'>
                <button className='btn btn-outline-secondary' onClick={this.chooseAll}>Выбрать всех</button>
              </div>
              <div className='col-4'>
                <button className='btn btn-outline-secondary' onClick={this.resetAll}>Сбросить выбор</button>
              </div>
            </div>
          <FetchingErrorComponentMessage 
            fetching={this.props.sowsListFetching}
            error={errorList}
            component={
              <SowTable sows={sows} sowClick={this.sowClick}  choosedSows={this.state.choosedSows}/>
            }
          />
        </div>
      </div>
    )
  }
}

export default WSSowUltrasoundTab