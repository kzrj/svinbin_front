import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowTable }  from '../../components/SowRepresentations'
import { SowFarmIdFilter, SowTourFilter }  from './SowsComponent';
import { FetchingErrorComponentMessage, ErrorOrMessage } from '../CommonComponents';


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
    this.props.sowsResetErrorsAndMessages()
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
    this.props.sowsResetErrorsAndMessages()
  }

  resetAll () {
    this.setState({
      ...this.state,
      choosedSows: []
    })
    this.props.sowsResetErrorsAndMessages()
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
    const { sows, tours, days, eventError, message, errorList, queryCount, eventFetching } = this.props
    this.refreshSowsList()
    
    return (
      <div className='workshop-content'>
        
        <div className=' mb-3'>
          <SowFarmIdFilter farm_id_starts={this.state.query.farm_id_starts} setQuery={this.setQuery}
            className='mx-2' />

          <SowTourFilter formClass='mx-2' options={tours} setQuery={this.setQuery} 
            label={'Тур'} labelClass='font-13'/>
        
          <button className='btn btn-l mx-2 bg-green2-light' data-result={true} onClick={this.clickButton}>
            Супорос
          </button>
      
          <button className='btn btn-l mx-2 bg-red2-light'data-result={false} onClick={this.clickButton}>
            Прохолост
          </button>
      
          <button className='btn btn-l mx-2 bg-mainDark-dark' onClick={this.clickAbort}>
            Аборт
          </button>

          <ErrorOrMessage error={eventError} message={message} fetching={eventFetching} className='mx-2'/>
        </div>
        
        <div className='commonfilter-results'>
          <div className='mb-3'>
            <p className='mx-2 my-0 color-mainDark-dark font-17 d-inline'>
              Выбрано {this.state.choosedSows.length} из {queryCount}
            </p>
            <button className='btn mx-2 bg-mainDark-dark' onClick={this.chooseAll}>Выбрать всех</button>
            <button className='btn mx-2 bg-mainDark-dark' onClick={this.resetAll}>Сбросить выбор</button>
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