import React, { Component } from 'react';

// components
import { SowFindById } from '../FiltersAndInputs'
import { SowLightDetail, SowToursData } from '../SowRepresentations'
import { ErrorMessage, Message } from '../CommonComponents'


class WS1Semination12Tab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: { 
        by_workshop_number: 1,
        to_seminate: true,
        farm_id_isnull: false,
      },
      week: null,
      boar1: null,
      boar2: null,
      seminationEmployee: null,
      needToRefresh: false,
    }
    this.getSowsById = this.getSowsById.bind(this);
    this.doubleSeminate = this.doubleSeminate.bind(this);
    this.setData = this.setData.bind(this);
  }
  
  componentDidMount() {
    this.props.getSows(this.state.query)
    this.props.getBoars()
    this.props.getSeminators({is_seminator: true})
    this.props.sowsResetErrorsAndMessages()
  }

  getSowsById (e) {
    let { query } = this.state
    query.farm_id_starts = e.target.value
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  doubleSeminate () {
    let data = {
      id: this.props.sow.id,
      week: this.state.week,
      boar1: this.state.boar1,
      boar2: this.state.boar2,
      seminationEmployee: this.state.seminationEmployee,
    }
    this.props.seminateSow(data)
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
    const { sows, sow, tours_info, seminationEmployes, boars, eventError, message } = this.props
    this.refreshSowsList()
    return (
      <div className='row workshop-content'>
          <div className='col-3 workshop-left-column'>
            <SowFindById 
                sows={sows} 
                sow={sow} 
                getSowsById={this.getSowsById} 
                getSow={this.props.getSow}/>
          </div>

          <div className='col-9'>
            <div className='workshop-content-column-2'>
              {sow && 
                <div>
                  <SowLightDetail sow={sow}/>
                  <div className="input-group">
                    <input type='text' value={this.state.week} onChange={this.setData} 
                      name='week' className="form-control search-input"
                      placeholder="Номер недели" />
                    < br/>
                    <select className="custom-select" id="inputGroupSelect04" 
                      onChange={this.setData} name='seminationEmployee'>
                      <option selected>осеменатор</option>
                      {seminationEmployes.map(employee =>
                        <option value={employee.id} key={employee.id}>
                          {employee.last_name}
                        </option>
                        )}
                    </select>
                    <select className="custom-select" id="inputGroupSelect04" 
                      onChange={this.setData} name='boar1'>
                      <option selected>хряк 1</option>
                      {boars.map(boar =>
                        <option value={boar.id} key={boar.id}>
                          {boar.birth_id}
                        </option>
                        )}
                    </select>
                    <select className="custom-select" id="inputGroupSelect04" 
                      onChange={this.setData} name='boar2'>
                      <option selected>хряк 2</option>
                      {boars.map(boar =>
                        <option value={boar.id} key={boar.id}>
                          {boar.birth_id}
                        </option>
                        )}
                    </select>
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button" 
                        onClick={this.doubleSeminate}>
                        Осеменить два раза
                      </button>
                    </div>
                  </div>
                  {eventError && <ErrorMessage error={eventError}/>}
                  {message && <Message message={eventError}/>}
                  <SowToursData tours_info={tours_info} />
                </div>
              }
            </div>
        </div>
    </div>
    )
  }
}

export default WS1Semination12Tab