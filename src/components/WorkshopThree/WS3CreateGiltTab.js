import React, { Component } from 'react';

//components
import { SowTable }  from '../../components/SowRepresentations'
import { SowFarmIdFilter, SowTourFilter, SowSectionFilter }  from '../../components/FiltersAndInputs'
import { ErrorMessage, Message } from '../CommonComponents'


class WS3PigletsWeaningTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giltBirthId: '',
      choosedSows: [],
      query: {
        tour: null,
      },
      activeSowId: ''
    }
    this.setQuery = this.setQuery.bind(this);
    this.setData = this.setData.bind(this);
    this.sowClick = this.sowClick.bind(this);
    this.createGilt = this.createGilt.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        by_workshop: this.props.workshopNumber,
        status_title: this.props.statusTitleFilter,
        all_in_workshop_number: this.props.workshopNumber,
      }
    })
    this.props.getSows({
      by_workshop: this.props.workshopNumber,
      status_title: this.props.statusTitleFilter,
      all_in_workshop_number: this.props.workshopNumber,
    })
    this.props.sowsResetErrorsAndMessages()
  }

  setQuery (e) {
    let { query } = this.state
    query[e.target.name] = e.target.value

    this.setState({
      ...this.state,
      query: query,
      choosedSows: [],
      needToRefresh: true
    })
  }

  sowClick (e) {
    this.setState({
      ...this.state,
      choosedSows: [e.target.dataset.id,],
      activeSowId: e.target.dataset.id,
    })
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  createGilt () {
    this.props.createGilt({
      birthId: this.state.giltBirthId,
      id: this.state.activeSowId
    })
    this.setState({
      giltBirthId: ''
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows(this.state.query)  
      }, 500)
    }
  }

  render() {
    const { sows, tours, sections, eventError, message } = this.props
    this.refreshSowsList()
    
    return (
      <div className='workshop-content'>
        <div>
          <div className='commonfilter row'>
            <label className='sow-event-label'>Фильтр</label>
            <SowFarmIdFilter setQuery={this.setQuery} />
            <SowTourFilter tours={tours} setQuery={this.setQuery}/>
            {/* <SowSectionFilter sections={sections} setQuery={this.setQuery} /> */}
          </div>
          <div>
            <div className="input-group">
              <input type='text' name='giltBirthId' onChange={this.setData} value={this.state.giltBirthId}/>
              <button onClick={this.createGilt}
                  className="btn btn-outline-secondary" type="button" >
                  Создать ремонтную свинку
              </button>
              {eventError && <ErrorMessage error={eventError} />}
              {message && <Message message={message} />}
            </div>
          </div>
            
        </div>
        <div className='commonfilter-results'>
          <div className='count row'>
              <div className='col-6'>
                Выбрано {this.state.choosedSows.length} из {sows.length}
              </div>
            </div>
          {this.props.sowsListFetching ? 
            <p className='loading'>Загрузка</p> :
            <SowTable sows={sows} sowClick={this.sowClick} 
              choosedSows={this.state.choosedSows}/>}
        </div>
      </div>
    )
  }
}

export default WS3PigletsWeaningTab