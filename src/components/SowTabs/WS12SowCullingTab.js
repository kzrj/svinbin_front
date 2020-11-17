import React, { Component } from 'react';

// components
import { toggleArray } from '../../components/utils'
import { SowTable }  from '../../components/SowRepresentations'
import { SowFarmIdFilter }  from './SowsComponent';
import { FetchingErrorMessage } from '../CommonComponents'

class WS12SowCullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        all_in_workshop_number: null,
        alive: true,
        farm_id_isnull: false,
        farm_id_starts: ''
      },
      cullingReason: 'без причины',
      cullingType: 'padej',
      weight: 0,
      needToRefresh: false,

      choosedSows: [],
      activeSowFarmId: null,
    }
    this.getGilts = this.getGilts.bind(this);
    this.setData = this.setData.bind(this);
    this.cullingSow = this.cullingSow.bind(this);
    this.massCulling = this.massCulling.bind(this);
    this.abortionSow = this.abortionSow.bind(this);

    this.sowClick = this.sowClick.bind(this);
    this.setQuery = this.setQuery.bind(this);
  }
  
  componentDidMount() {
    this.props.getSows({
      alive:true,
      all_in_workshop_number: this.props.workshopNumber,
      farm_id_isnull: false
    })
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        all_in_workshop_number: this.props.workshopNumber
      }
    })
    this.props.sowsResetErrorsAndMessages()
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

  getGilts () {
    let { query } = this.state
    query.farm_id_isnull = true
    query.farm_id_starts = null
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  setData(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  cullingSow() {
    let data = {
      id: this.state.choosedSows[0],
      culling_type: this.state.cullingType,
      reason: this.state.cullingReason,
      weight: this.state.weight,
    }
    this.props.cullingSow(data)
    this.setState({
      ...this.state,
      needToRefresh: true
    })
  }

  massCulling() {
    let data = {
      sows: this.state.choosedSows,
      culling_type: this.state.cullingType,
      reason: this.state.cullingReason,
      weight: this.state.weight,
    }
    this.props.massCulling(data)
    this.setState({
      ...this.state,
      needToRefresh: true
    })
  }

  abortionSow() {
    let data = {
      id: this.props.sow.id,
    }
    this.props.abortionSow(data)
    this.setState({
      ...this.state,
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows(this.state.query) 
      }, 50)
    }
  }

  render() {
    this.refreshSowsList()
    const { sows, eventError, eventFetching, message } = this.props
    return (
      <div className='workshop-content'>
        <SowFarmIdFilter 
          className="ml-1 font-20"
          farm_id_starts={this.state.query.farm_id_starts} setQuery={this.setQuery} />
        <button className="btn bg-mainDark-dark btn-s mx-3" type="button"  
            onClick={this.getGilts}>
              Показать только ремонтных
          </button>
        <div className="my-4">     
          <select className="ml-1 input input-style-1 font-20" name='cullingType' onChange={this.setData}>
            <option defaultValue='padej'>Падеж</option>
            <option value='vinuzhd' >Вынужденный убой</option>
          </select>
          <input type='text' onChange={this.setData} name='cullingReason'
            className="ml-1 input input-style-1"
            placeholder='Напишите причину' value={this.state.cullingReason}/>
          <input type='number' onChange={this.setData} name='weight' value={this.state.weight}
            className="ml-1 input input-style-1"
            placeholder='Укажите вес'/>
          
          {this.state.choosedSows.length > 1 
            ? <button type="button" className="btn bg-mainDark-dark btn-s ml-2" onClick={this.massCulling}>
                Забраковать несколько ({this.state.choosedSows.length})
              </button>
            : <button type="button" className="btn bg-mainDark-dark btn-s ml-2" onClick={this.cullingSow}>
                Забраковать одну
              </button>
          }
          {this.state.choosedSows.length < 2 &&
            <button className="btn btn-danger btn-s mx-3" type="button"  
              onClick={this.abortionSow}>
                Аборт
            </button>
          }
          
        </div>
        <FetchingErrorMessage error={eventError} fetching={eventFetching} message={message}/>
        <SowTable 
          sows={sows} 
          sowClick={this.sowClick} 
          choosedSows={this.state.choosedSows}/>
      </div>
    )
  }
}

export default WS12SowCullingTab