import React, { Component } from 'react';

import { toggleArray, getObjectbyId } from '../../components/utils'
// components
import { SowTable }  from '../../components/WorkshopOne/SowComponents'
import { SowFilter, SowFarmIdFilter, SowTourFilter, SowSeminatedFilter }  
  from '../../components/WorkshopOne/SowComponents'


class WS1SeminationTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
          by_workshop_number: 1,
          status_title: 'Осеменена 1',
          tour: null,
        },
      choosedSows: [],
      farmId: null,
      week: null,
      boar: null,
      seminationEmployee: null,
      needToRefresh: false,
    }
    this.setQuery = this.setQuery.bind(this);
    this.setSeminatedSuporosStatus = this.setSeminatedSuporosStatus.bind(this);
    this.setStatusTitleInFilter = this.setStatusTitleInFilter.bind(this);
    this.sowClick = this.sowClick.bind(this);
    this.setData = this.setData.bind(this);
    this.massSemination = this.massSemination.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }
  
  componentDidMount() {
    // query
    this.props.getSows(this.state.query)
    this.props.getBoars()
    this.props.getTours()
    this.props.getSeminators({is_seminator: true})
  }

  setQuery (e) {
    let { query } = this.state
    query[e.target.name] = e.target.value

    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        query: query
      },
      choosedSows: [],
      needToRefresh: true
    })
    // this.props.getSows(query)
  }

  setStatusTitleInFilter (statusTitle) {
    let { status_title_in } = this.state.query
    status_title_in = toggleArray(status_title_in, statusTitle)
    return status_title_in
  }

  setSeminatedSuporosStatus (e) {
    let { query } = this.state
    let finalQuery = {}
    const filter = e.target.value.split('=')[0]
    const value = e.target.value.split('=')[1]
    if (filter == 'to_seminate')
      finalQuery = {...query, [filter]:value, status_title_in: []}
    if (filter == 'status_title_in')
      finalQuery = {...query, [filter]:value,
         status_title_in: this.setStatusTitleInFilter(value), to_seminate: false}
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

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  massSemination () {
    const { tours } =this.props
    const tour = getObjectbyId(tours, this.state.query.tour)
    const data = {
      sows: this.state.choosedSows,
      week: tour.week_number,
      seminationEmployee: this.state.seminationEmployee,
      boar: this.state.boar
    }
    this.props.massSemination(data)
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        // tour: null
      },
      choosedSows: [],
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows(this.state.query)  
      }, 500)
    }
  }

  render() {
    const { sows, seminationEmployes, boars, tours } = this.props
    this.refreshSowsList()
    return (
      <div className='workshop-content'>
        <div>
          <div className='commonfilter row'>
            <label className='sow-event-label'>Фильтр</label>
            <SowTourFilter tours={tours} setQuery={this.setQuery}/>
            <SowFarmIdFilter setQuery={this.setQuery} />
          </div>
          <div className={this.state.query.tour ? '' : 'block-inactive'}>
            <div>
              <label className='sow-event-label'>Осеменение</label>
              <div className="input-group">
                <select className="custom-select" id="inputGroupSelect04" 
                  onChange={this.setData} name='seminationEmployee'>
                  <option selected>Выберите работника...</option>
                  {seminationEmployes.map(employee =>
                    <option value={employee.id} key={employee.id}>
                      {employee.username}
                    </option>
                    )}
                </select>
                <select className="custom-select" id="inputGroupSelect04" 
                  onChange={this.setData} name='boar'>
                  <option selected>Выберите хряка...</option>
                  {boars.map(boar =>
                    <option value={boar.id} key={boar.id}>
                      {boar.birth_id}
                    </option>
                    )}
                </select>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" 
                    onClick={this.massSemination}>
                    Осеменить
                  </button>
                </div>
                </div>
            </div>
          </div>
        </div>
        <div className={this.state.query.tour ? 'commonfilter-results' 
          : 'commonfilter-results block-inactive'}>
          <div className='count row'>
              <div className='col-6'>
                Выбрано {this.state.choosedSows.length} из {sows.length}
              </div>
            </div>
            {this.state.needToRefresh && this.props.sowsListFetching  ? 'Loading' :
            <SowTable sows={sows} sowClick={this.sowClick} choosedSows={this.state.choosedSows}/>}
        </div>
      </div>
    )
  }
}

export default WS1SeminationTab