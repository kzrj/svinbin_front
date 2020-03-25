import React, { Component } from 'react';

//components
import { SowTable }  from '../../components/SowRepresentations'
import { SowFarmIdFilter, SowTourFilter, SowSectionFilter }  from '../../components/FiltersAndInputs'
import { ErrorMessage, Message, LoadingMessage } from '../CommonComponents'


class WS3SowFarrowTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      current_total_piglets: null,
      total_piglets: 0,
      mummy_piglets: 0,
      dead_piglets: 0,
      alive_piglets: 0,
      date: null,

      choosedSows: [],
      query: {
        farm_id_starts: '',
        tour: null,
      },
      activeSowFarmId: ''
    }
    this.setQuery = this.setQuery.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
    this.sowClick = this.sowClick.bind(this);
    this.decreasePiglets = this.decreasePiglets.bind(this);
    this.increasePiglets = this.increasePiglets.bind(this);
    this.clickFarrow = this.clickFarrow.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        by_section_in_cell: '',
        all_in_workshop_number: this.props.workshopNumber,
        status_title: this.props.statusTitleFilter
      }
    })
    this.props.getSows({
      by_section_in_cell: '',
      all_in_workshop_number: this.props.workshopNumber,
      status_title: this.props.statusTitleFilter
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

  resetQuery (e) {
    let { query } = this.state
    query[e.target.name] = ''

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
      activeSowFarmId: e.target.dataset.farm_id,
    })
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  decreasePiglets (e) {
    const { label } = e.target.dataset
    this.setState({
      ...this.state,
      [label]: this.state[label] - 1,
      total_piglets: this.state.total_piglets - 1
    })
  }

  increasePiglets (e) {
    const { label } = e.target.dataset
    this.setState({
      ...this.state,
      [label]: this.state[label] + 1,
      total_piglets: this.state.total_piglets + 1
    })
  }

  clickFarrow () {
    this.props.sowFarrow({
      id: this.state.choosedSows[0],
      dead_quantity: this.state.dead_piglets,
      mummy_quantity: this.state.mummy_piglets,
      alive_quantity: this.state.alive_piglets,
    })
    this.setState({
      activeSow: null,
      needToRefresh: true,
      activeCellLocationId: null,
      total_piglets: 0,
      mummy_piglets: 0,
      dead_piglets: 0,
      alive_piglets: 0,
      date: null,
      query: {
        ...this.state.query,
        farm_id_starts: '',
      }
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
            <SowFarmIdFilter setQuery={this.setQuery} resetQuery={this.resetQuery}
              farm_id_starts={this.state.query.farm_id_starts}/>
            <SowTourFilter tours={tours} setQuery={this.setQuery}/>
            <SowSectionFilter sections={sections} setQuery={this.setQuery} />
          </div>
          <div>
            <div className="input-group row">
              <div className='col-3'>
                <h4>Свиноматка {this.state.activeSowFarmId}</h4>
                <p>Поросят  {this.state.total_piglets}</p>
                <button onClick={this.clickFarrow}
                  className="btn btn-outline-secondary btn-sm" type="button" >
                  Записать данные
                </button>
                {eventError && <ErrorMessage error={eventError}/>}
                {message && <Message message={message}/>}
              </div>
              
              <div className='farrow-button-block col-3'>
                <label>Живые {this.state.alive_piglets}</label>
                <div>
                  <div className='col-5 btn btn-dark btn-inc-dec'
                    onClick={this.increasePiglets}
                    data-label='alive_piglets'
                  >
                    +
                  </div>
                  <div className='col-5 btn btn-dark btn-inc-dec'
                    onClick={this.decreasePiglets}
                    data-label='alive_piglets'
                  >
                    -
                  </div>
                </div>
              </div>

              <div className='farrow-button-block col-3'>
                <label>Мертвые {this.state.dead_piglets}</label>
                <div >
                  <div className='col-5 btn btn-dark btn-inc-dec'
                    onClick={this.increasePiglets}
                    data-label='dead_piglets'
                  >
                    +
                  </div>
                  <div className='col-5 btn btn-dark btn-inc-dec'
                    onClick={this.decreasePiglets}
                    data-label='dead_piglets'
                  >
                    -
                  </div>
                </div>
              </div>
              
              <div className='farrow-button-block col-3'>
                <label>Муммии {this.state.mummy_piglets}</label>
                <div>
                  <div className='col-5 btn btn-dark btn-inc-dec'
                    onClick={this.increasePiglets}
                    data-label='mummy_piglets'
                  >
                    +
                  </div>
                  <div className='col-5 btn btn-dark btn-inc-dec'
                    onClick={this.decreasePiglets}
                    data-label='mummy_piglets'
                  >
                    -
                  </div>
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
            </div>
          {this.props.sowsListFetching ? 
            <LoadingMessage /> :
            <SowTable sows={sows} sowClick={this.sowClick} 
              choosedSows={this.state.choosedSows}/>}
        </div>
      </div>
    )
  }
}

export default WS3SowFarrowTab