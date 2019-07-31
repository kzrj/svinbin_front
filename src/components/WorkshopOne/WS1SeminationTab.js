import React, { Component } from 'react';

//hello kzrj 
class WS1SeminationTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      seminationEmployee: null
    }
  }

  componentDidMount() {
    // query
    this.props.getSows()
  }

  getSowsById = () => {
    // value
    // query
    this.props.getSows()
  }

  setSemitationEmployee = (e) => {
    this.setState({
      ...this.state,
      seminationEmployee: e.target.value
    })
  }

  seminationSow = () => {
    // query

    const data = {
      id: this.props.sow.id,
      week: this.props.week,
      seminationEmployeeId: this.state.seminationEmployee
    }
    this.props.seminationSow(data)
    this.props.getSows()
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
                    <li className={sowInList.id == sow.id ? 'sow-active' : sowInList.id} key={sowInList.id} onClick={() => this.props.getSow(sowInList.id)}>
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
                    <select className="custom-select" id="inputGroupSelect04" onChange={this.setSemitationEmployee}>
                      <option selected>Выберите работника...</option>
                      {seminationEmployes.map(employee =>
                        <option value={employee.name} key={employee.name}>{employee.name}</option>
                        )}
                    </select>
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button" onClick={this.seminationSow}>
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
