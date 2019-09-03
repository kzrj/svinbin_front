import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowRow }  from '../../components/WorkshopOne/SowComponents'
import { SowTable }  from '../../components/WorkshopOne/SowComponents'


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
  }
  
  componentDidMount() {
    // query
    this.props.getSows(this.state.query)
    this.props.getBoars()
    this.props.getTours()
    this.props.getSeminators({is_seminator: true})
  }

  setSowFarmId = (e) => {
    let { query } = this.state
    query.farm_id_starts = e.target.value
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  setTour = (e) => {
    let { query } = this.state
    query.tour = e.target.value
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  setSeminatedStatus = (e) => {
    let { query } = this.state
    const filter = e.target.value.split('=')[0]
    const value = e.target.value.split('=')[1]
    const finalQuery = {...query, [filter]:value}
    this.setState({
      ...this.state,
      query: finalQuery
    })
    this.props.getSows(finalQuery)
  }

  sowClick = (e) => {
    let { choosedSows } = this.state
    const { id } = e.target.dataset
    choosedSows = toggleArray(choosedSows, id)
    this.setState({
      ...this.state,
      choosedSows: choosedSows
    })
  }

  setSemitationEmployee = (e) => {
    this.setState({
      ...this.state,
      seminationEmployee: e.target.value
    })
  }

  setWeek = (e) => {
    this.setState({
      ...this.state,
      week: e.target.value
    })
  }

  setBoar = (e) => {
    this.setState({
      ...this.state,
      boar: e.target.value
    })
  }

  massSemination = () => {
    const data = {
      sows: this.state.choosedSows,
      week: this.state.week,
      seminationEmployee: this.state.seminationEmployee,
      boar: this.state.boar
    }
    this.props.massSemination(data)
    this.props.getSows(this.state.query)
  }

  showState = () => {
    console.log(this.state)
  }

  render() {
    const { sows, seminationEmployes, boars, tours } = this.props
    return (
      <div className='workshop-content'>
        <div>
          <div className='commonfilter row'>
            <div className="input-group mb-3 col-3">
              <input type="text" className="form-control" placeholder="Farm ID"
                aria-label="Farmid" aria-describedby="basic-addon1"
                onChange={this.setSowFarmId} />
            </div>
            <div className="input-group mb-3 col-3">
              <select className="custom-select" id="inputGroupSelect01" 
                  onChange={this.setTour}>
                  <option selected value=''>Выбрать тур</option>
                  {tours.map(tour =>
                    <option value={tour.id} key={tour.id}>
                      Неделя{tour.week_number}
                    </option>
                    )}
                </select>
            </div>
            <div className="input-group mb-3 col-3">
              <select className="custom-select" id="inputGroupSelect01"
                onChange={this.setSeminatedStatus}>
                <option selected value='seminated=0'>Ожидает осеменения</option>
                <option value='seminated=1'>Осеменена 1</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              Осеменение
              <div className="input-group">
                <input type='text' value={this.state.week} onChange={this.setWeek}/> неделя
                < br/>
                <select className="custom-select" id="inputGroupSelect04" 
                  onChange={this.setSemitationEmployee}>
                  <option selected>Выберите работника...</option>
                  {seminationEmployes.map(employee =>
                    <option value={employee.id} key={employee.id}>
                      {employee.username}
                    </option>
                    )}
                </select>
                <select className="custom-select" id="inputGroupSelect04" 
                  onChange={this.setBoar}>
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
          <SowTable sows={sows} sowClick={this.sowClick} choosedSows={this.state.choosedSows}/>
        </div>
      </div>
    )
  }
}

export default WS1SeminationTab