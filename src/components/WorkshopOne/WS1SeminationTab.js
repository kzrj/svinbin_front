import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowTable }  from '../../components/WorkshopOne/SowComponents'
import { SowFilter, SowFarmIdFilter, SowTourFilter, SowSeminatedFilter }  from '../../components/WorkshopOne/SowComponents'


class WS1SeminationTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
          by_workshop_number: 1,
          to_seminate: true,
          tour: null,
          farm_id_isnull: false,
          status_title_in: []
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
    console.log('Did mount')
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
    const data = {
      sows: this.state.choosedSows,
      week: this.state.week,
      seminationEmployee: this.state.seminationEmployee,
      boar: this.state.boar
    }
    this.props.massSemination(data)
    this.setState({
      ...this.state,
      choosedSows: [],
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (this.state.needToRefresh) {
      this.props.getSows(this.state.query)
      this.props.getTours()
      this.setState({...this.state, needToRefresh: false})
    }
  }

  render() {
    const { sows, seminationEmployes, boars, tours } = this.props
    this.refreshSowsList()
    return (
      <div className='workshop-content'>
        <div>
          <div className='commonfilter row'>
            <SowFarmIdFilter setQuery={this.setQuery} />
            <SowTourFilter tours={tours} setQuery={this.setQuery}/>
            <SowSeminatedFilter setSeminatedSuporosStatus={this.setSeminatedSuporosStatus}/>
          </div>
          <div>
            <div>
              Осеменение
              <div className="input-group">
                <input type='text' value={this.state.week} onChange={this.setData} name='week'/> неделя
                < br/>
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
        <div className='commonfilter-results'>
          <div className='count row'>
              <div className='col-6'>
                Выбрано {this.state.choosedSows.length} из {sows.length}
              </div>
              {/* <div className='col-6'>
                <button onClick={this.chooseAll}>Выбрать всех</button>
              </div> */}
            </div>
          <SowTable sows={sows} sowClick={this.sowClick} choosedSows={this.state.choosedSows}/>
        </div>
      </div>
    )
  }
}

export default WS1SeminationTab