
import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowTable }  from '../../components/SowRepresentations'
import { SowFarmIdFilter, SowTourFilter, SowSemUsoundFilter }  from './SowsComponent';
import { FetchingErrorComponentMessage, ErrorOrMessage } from '../CommonComponents'


class WSSowTransferToWSTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        tour: null,
        status_title: "Супорос 35",
        alive: true,
        to_seminate: null,
        farm_id_isnull: false
      },
      choosedSows: [],
      needToRefresh: false
    };
    this.setQuery = this.setQuery.bind(this);
    this.chooseAll = this.chooseAll.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.setSeminatedSuporosStatus = this.setSeminatedSuporosStatus.bind(this);
    this.sowClick = this.sowClick.bind(this);
    this.massMove = this.massMove.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        by_workshop_number: this.props.workshopNumber,
      }
    })
    this.props.getSows(this.state.query)
    this.props.sowsResetErrorsAndMessages()
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
  
  setSeminatedSuporosStatus (e) {
    let { query } = this.state
    let finalQuery = {}
    const filter = e.target.value.split('=')[0]
    const value = e.target.value.split('=')[1]
    if (filter == 'to_seminate')
      finalQuery = {...query, [filter]:value, farm_id_isnull: false,
         status_title: null}
    if (filter == 'status_title')
      finalQuery = {...query, [filter]:value, to_seminate: null, farm_id_isnull: false}
    if (filter == 'farm_id_isnull')
      finalQuery = {...query, farm_id_isnull: true,
         to_seminate: null, status_title: null}
    this.setState({
      ...this.state,
      query: finalQuery,
      choosedSows: []
    })
    this.props.getSows(finalQuery)
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
  
  massMove (to_location) {
    const data = {
      sows: this.state.choosedSows,
      to_location: to_location
    }
    this.props.massMove(data)
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
      }, 300)
    }
  }

  render() {
    const { sows, tours, eventError, message, errorList, eventFetching, queryCount, to_locations } = this.props
    this.refreshSowsList()
    return (
      <div className='workshop-content'>
        
        <div className='mb-3'>
          <SowFarmIdFilter farm_id_starts={this.state.query.farm_id_starts} setQuery={this.setQuery}
            className='mx-2' />

          <SowTourFilter formClass='mx-2' options={tours} setQuery={this.setQuery} 
            label={'Тур'} labelClass='font-13'/>

          <SowSemUsoundFilter setSeminatedSuporosStatus={this.setSeminatedSuporosStatus} formClass='mx-2'/>
      
          {to_locations.length > 0 && to_locations.map(ws =>
              <button className="btn btn-l mx-2 bg-mainDark-dark" 
                onClick={() => this.massMove(ws.id)}>
                Перевести в ЦЕХ {ws.number}
              </button>
          )}
            
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

export default WSSowTransferToWSTab