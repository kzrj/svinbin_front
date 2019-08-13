import React, { Component } from 'react';


class WS1SeminationTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      seminationEmployee: null,
      query: {by_workshop_number: 1, not_in_tour: true},
    }
  }
  
  componentDidMount() {
    this.props.getSows(this.state.query)
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
      id: this.props.sow.id,
      week: this.props.week,
      seminationEmployeeId: this.state.seminationEmployee
    }
    this.props.seminationSow(data)
    this.props.getSows(this.state.query)
  }

  render() {
    const { sows, sow, seminationEmployes, week } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            <div className='under-menu-line text-center'>
              <p className="workshop-header-2">ПОИСК ПО ID</p>
            </div>
            <div className='workshop-content-column-1'>
              <input type='text' onChange={this.getSowsById} />
              <ul className='list-unstyled'>
                {sows.length > 0 && sow &&
                  sows.map(sowInList => 
                    <li className={sowInList.id == sow.id ? 'sow-active' : sowInList.id} 
                      key={sowInList.id} 
                      onClick={() => this.props.getSow(sowInList.id)}>
                      {sowInList.farm_id}
                    </li>)
                }
              </ul>
            </div>
          </div>
          <div className='col-9'>
            <div className='under-menu-line text-center'>
              <p className="workshop-header-2">ВЫБРАНА МАТКА</p>
            </div>
            <div className='workshop-content-column-2'>
              {sow &&
                <div>
                  <ul>
                    <li>{sow.id}</li>
                    <li>{sow.location}</li>
                    <li>{sow.status}</li>
                    <li>{sow.farm_id}</li>
                    {/* semenation info */}
                  </ul>
                  <div className="input-group">
                    <label>{week} неделя</label>
                    <select className="custom-select" id="inputGroupSelect04" 
                      onChange={this.setSemitationEmployee}>
                      <option selected>Выберите работника...</option>
                      {seminationEmployes.map(employee =>
                        <option value={employee.id} key={employee.id}>
                          {employee.username}
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