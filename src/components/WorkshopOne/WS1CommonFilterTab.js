import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'

// components
import { SowRow }  from '../../components/WorkshopOne/SowComponents'


class WS1CommonFilterTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        by_workshop_number: 1
      },
      choosedSows: [],
      week: null,
      boar: null,
      seminationEmployee: null,
    };
  }
  
  componentDidMount() {
    // query
    this.props.getSows(this.state.query)
    this.props.getBoars()
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

  setStatus = (e) => {
    let { query } = this.state
    const filter = e.target.value.split('=')[0]
    const value = e.target.value.split('=')[1]
    const finalQuery = {...query, ...{[filter]:value}}
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
    const { sows, seminationEmployes, boars } = this.props
    return (
        <div className='workshop-content'>
          <button onClick={this.showState}>
            show state
          </button>
          <div>
            <div className='commonfilter row'>
              <div className="input-group mb-3 col-4">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">ID</span>
                </div>
                <input type="text" className="form-control" placeholder="Farm ID"
                  aria-label="Farmid" aria-describedby="basic-addon1"
                  onChange={this.setSowFarmId} />
              </div>
              <div className="input-group mb-3 col-4">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">Тур</label>
                </div>
                <select className="custom-select" id="inputGroupSelect01"
                  onChange={this.setTour} >
                  <option selected value="">Выбрать...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="input-group mb-3 col-4">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">Статус</label>
                </div>
                <select className="custom-select" id="inputGroupSelect01"
                  onChange={this.setStatus}>
                  <option selected value="">Выбрать...</option>
                  <option value='seminated=1'>Осеменена 1</option>
                  <option value='seminated=2'>Осеменена 2</option>
                  <option value="suporos=30">Супорос 30</option>
                  <option value="suporos=60">Супорос 60</option>
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
            <table className="table table-light table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Статус</th>
                  <th scope="col">Осеменения</th>
                  <th scope="col">УЗИ 30</th>
                  <th scope="col">УЗИ 60</th>
                  <th scope="col">Выбрать</th>
                </tr>
              </thead>
              <tbody>
                {sows.length > 0 && sows.map(sow => 
                  <SowRow sow={sow} sowClick={this.sowClick} choosedSows={this.state.choosedSows}/>
                  )}
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}



export default WS1CommonFilterTab