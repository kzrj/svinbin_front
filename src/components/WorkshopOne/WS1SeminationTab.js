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
          seminated: 0,
          tour: null,
        },
      choosedSows: [],
      farmId: null,
      week: null,
      boar: null,
      seminationEmployee: null,
    }
    this.setQuery = this.setQuery.bind(this);
    this.setSeminatedSuporosStatus = this.setSeminatedSuporosStatus.bind(this);
    this.sowClick = this.sowClick.bind(this);
    this.setData = this.setData.bind(this);
    this.massSemination = this.massSemination.bind(this);
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
      }
    })
    this.props.getSows(query)
  }

  setSeminatedSuporosStatus (e) {
    let { query } = this.state
    let finalQuery = {}
    const filter = e.target.value.split('=')[0]
    const value = e.target.value.split('=')[1]
    if (filter == 'seminated')
      finalQuery = {...query, [filter]:value, suporos: null}
    if (filter == 'suporos')
      finalQuery = {...query, [filter]:value, seminated: null}
    this.setState({
      ...this.state,
      query: finalQuery
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
    this.props.getSows(this.state.query)
    this.setState({
      ...this.state,
      choosedSows: []
    })
  }

  render() {
    const { sows, seminationEmployes, boars, tours } = this.props
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