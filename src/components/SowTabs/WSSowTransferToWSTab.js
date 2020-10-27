
import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowTable }  from '../../components/SowRepresentations'
import { SowFarmIdFilter, SowTourFilter, SowSemUsoundFilter }  from '../../components/FiltersAndInputs'
import { FetchingErrorComponentMessage } from '../CommonComponents'

function TransferButtons(props){
  return (
    <div className='row'>
      {props.to_locations.length > 0 && props.to_locations.map(ws =>
        <div className='col'>
          <label className='sow-event-label'>Перевести в ЦЕХ {ws.number}</label>
          <div className="input-group">
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" 
                onClick={() => props.massMove(ws.id)}>
                Перевести в ЦЕХ {ws.number}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


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
    // this.props.sowsResetErrorsAndMessages()
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
      }, 500)
    }
  }

  render() {
    const { sows, tours, eventError, message, errorList, eventFetching, queryCount } = this.props
    this.refreshSowsList()
    return (
      <div className='workshop-content'>
        <div>
          <div className=''>
            
            <SowFarmIdFilter setQuery={this.setQuery} />
            <SowTourFilter tours={tours} setQuery={this.setQuery}/>
            <SowSemUsoundFilter setSeminatedSuporosStatus={this.setSeminatedSuporosStatus}/>
          </div>
          <div>
            <FetchingErrorComponentMessage 
              fetching={eventFetching}
              error={eventError}
              message={message}
              component={
                <TransferButtons to_locations={this.props.to_locations} massMove={this.massMove}/>
              }
            />
          </div>
        </div>
        <div className='commonfilter-results'>
          <div className='count row'>
            <div className='col-4'>
              Выбрано {this.state.choosedSows.length} из {queryCount}
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

export default WSSowTransferToWSTab