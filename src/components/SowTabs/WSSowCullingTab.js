import React, { Component } from 'react';

// components
import { SowFindById, SowFindByIdWithoutGet } from '../FiltersAndInputs'
import { SowLightDetail, SowToursData } from '../SowRepresentations'
import { ErrorMessage, Message } from '../CommonComponents';


class WSSowCullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        all_in_workshop_number: null,
        farm_id_isnull: false
      },
      cullingReason: 'padej',
      cullingType: 'padej',
      needToRefresh: false,
    }
    this.getSowsById = this.getSowsById.bind(this);
    this.setData = this.setData.bind(this);
    this.cullingSow = this.cullingSow.bind(this);
    this.abortionSow = this.abortionSow.bind(this);
  }
  
  componentDidMount() {
    this.props.getSows({
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

  getSowsById (e) {
    let { query } = this.state
    query.farm_id_starts = e.target.value
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
      id: this.props.sow.id,
      culling_type: this.state.cullingType,
      reason: this.state.cullingReason,
    }
    this.props.cullingSow(data)
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
    if (this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows({
          all_in_workshop_number: this.props.workshopNumber,
          farm_id_isnull: false
        })  
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { sows, sow, tours_info, eventError, message } = this.props
    // console.log()
    return (
      <div className='row workshop-content'>
        <div className='col-3 workshop-left-column'>
          {/* <SowFindById 
              sows={sows} 
              sow={sow} 
              getSowsById={this.getSowsById} 
              getSow={this.props.getSow}
              fetching={this.props.listFetching}
              error={this.props.sowsListError}
              /> */}
          <SowFindByIdWithoutGet 
              sows={sows} 
              sow={sow} 
              getSowsById={this.getSowsById} 
              setSow={this.props.setSow}
              fetching={this.props.listFetching}
              error={this.props.sowsListError}
              />
        </div>
        <div className='col-9'>
          <div className='workshop-content-column-2'>
            {!this.props.sowsSingleError ?
              this.props.singleFetching ?
                <p className='loading'>Загрузка</p> :
                  sow &&
                    <div>
                      <SowLightDetail sow={sow}/>
                      {/* <SowToursData tours_info={tours_info} /> */}
                      <div className="input-group">
                          <select className="custom-select" onChange={this.setData}>
                            <option selected value='padej' >Падеж</option>
                            <option value='vinuzhd' >Вынужденный убой</option>
                            <option value='prirezka' >Прирезка</option>
                          </select>
                          <input type='text' onChange={this.setData} placeholder='Напишите причину'/>
                        <div className="input-group-append">
                          <button className="btn btn-outline-secondary" type="button"  
                          onClick={this.cullingSow}>
                            Забраковать
                          </button>
                        </div>
                      </div>
                      {/* <div className="input">
                        <label className='sow-event-label'>Пометить как аборт</label>
                        <div>
                          <button className="btn btn-outline-secondary" type="button"  
                          onClick={this.abortionSow}>
                            Аборт
                          </button>
                        </div>
                      </div> */}
                    </div>
              :
              <ErrorMessage error={this.props.sowsSingleError} />
            }
            <div className='col'>
              {eventError && <ErrorMessage error={eventError}/>}
              {message && <Message message={message}/>}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WSSowCullingTab