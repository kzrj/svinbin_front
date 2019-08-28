import React, { Component } from 'react';

// components
import SowToursData from '../../components/WorkshopOne/SowComponents'


class WS1SeminationTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      seminationEmployee: null,
      // query: {by_workshop_number: 1, not_in_tour: true, farm_id_isnull: false},
      query: {
          by_workshop_number: 1,
          status_title_not_contains: 'Супорос',
          farm_id_isnull: false,
        },
      farmId: null,
      week: null,
      boar: null
    }
  }
  
  componentDidMount() {
    this.props.getSows(this.state.query)
    this.props.getBoars()
    this.props.getSeminators({is_seminator: true})
  }

  getSowsById = (e) => {
    let { query } = this.state
    query.farm_id_starts = e.target.value
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  setSemitationEmployee = (e) => {
    this.setState({
      ...this.state,
      seminationEmployee: e.target.value
    })
  }

  seminationSow = () => {
    const data = {
      id: this.props.sow.sow.id,
      week: this.state.week,
      seminationEmployeeId: this.state.seminationEmployee,
      boar: this.state.boar
    }
    this.props.seminationSow(data)
    this.props.getSows(this.state.query)
  }

  setFarmId = (e) => {
    this.setState({
      ...this.state,
      farmId: e.target.value
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

  createSow = () => {
    console.log(this.state.farmId)
  }

  render() {
    const { sows, sow, seminationEmployes, boars } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3 workshop-left-column'>
            <div className='workshop-header-2 under-menu-line text-center'>
              <p >ПОИСК ПО ID</p>
            </div>
            <div className='workshop-content-column-1'>
              <input type='text' onChange={this.getSowsById} className="search-input"/>
              <ul className='list-unstyled'>
                {sows.length > 0 && sow &&
                  sows.map(sowInList => 
                    <li className={sowInList.id == sow.id ? 'sow-active sow-li text-center' : 'sow-li text-center'} 
                      key={sowInList.id} 
                      onClick={() => this.props.getSow(sowInList.id)}>
                      {sowInList.farm_id}
                    </li>)
                }
              </ul>
            </div>
          </div>
          <div className='col-9 workshop-right-column'>
            <div className='under-menu-line text-center workshop-header-2'>
              <p >ВЫБРАНА МАТКА</p>
            </div>
            <div className='workshop-content-column-2'>
              {sow && sow.sow &&
                <div>
                  <ul>
                    <li>{sow.sow.id}</li>
                    <li>{sow.sow.location}</li>
                    <li>{sow.sow.status}</li>
                    <li>{sow.sow.farm_id}</li>
                    {/* semenation info */}
                  </ul>
                  <SowToursData sow={sow} />
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
                        onClick={this.seminationSow}>
                        Осеменить
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
    )
  }
}

export default WS1SeminationTab