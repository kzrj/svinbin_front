import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowTable }  from '../../components/SowRepresentations'
import { SowFarmIdFilter, SowTourFilter }  from '../../components/FiltersAndInputs'
import { ErrorMessage, Message } from '../CommonComponents'


class WSSowGlobalSearchTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        tour: null,
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
      }
    })
    this.props.getSows()
    this.props.sowsResetErrorsAndMessages()
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
    const { sows, tours, days, eventError, message } = this.props
    this.refreshSowsList()
    return (
      <div className='workshop-content'>
        <div>
          <div className='commonfilter row'>
            <label className='sow-event-label'>Фильтр</label>
            <SowFarmIdFilter farm_id_starts={this.state.query.farm_id_starts} setQuery={this.setQuery} />
          </div>
          
        </div>
        <div className='commonfilter-results'>
          {this.props.sowsListFetching ? 
            <p className='loading'>Загрузка</p> :
            <SowTable sows={sows} sowClick={this.sowClick} 
              choosedSows={this.state.choosedSows}/>}
        </div>
      </div>
    )
  }
}

export default WSSowGlobalSearchTab