import React, { Component } from 'react';
import { toggleArray } from '../../components/utils'

// components
import { SowTable }  from '../../components/SowRepresentations'
import { SowFarmIdFilter, SowTourFilter, SowSectionFilter }  from '../../components/FiltersAndInputs'
import { ErrorMessage, Message, FetchingErrorComponentMessage } from '../CommonComponents';


class WS3NurseSowTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        tour: null,
        alive:true,
      },
      needToRefresh: false,
      choosedSows: [],
      farmId: null,
    };

    this.sowClick = this.sowClick.bind(this);
    this.setData = this.setData.bind(this);
    this.markAsNurse = this.markAsNurse.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }

  componentDidMount(){
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        alive:true,
        by_section_in_cell: this.props.sectionId,
        status_title_in: this.props.statusTitleFilters
      }
    })
    this.props.getSows({
      alive:true,
      by_section_in_cell: this.props.sectionId,
      status_title_in: this.props.statusTitleFilters
      })
    this.props.getTours()
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

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  sowClick (e) {
    let { choosedSows } = this.state
    const { id } = e.target.dataset
    choosedSows = toggleArray(choosedSows, id)
    this.props.sowsResetErrorsAndMessages()
    this.setState({
      ...this.state,
      choosedSows: choosedSows
    })
  }
  
  markAsNurse () {
    this.props.markAsNurse({
      id: this.state.choosedSows[0],
    })
    this.setState({
      choosedSows: [],
      needToRefresh: true,
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
          this.props.getSows(this.state.query)
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { sows, tours, sections, eventError, message } = this.props
    const { choosedSows } = this.state
    
    return (
      <div className='workshop-content'>
        <div>
          <div className='commonfilter row'>
            <label className='sow-event-label'>Фильтр</label>
            <SowFarmIdFilter setQuery={this.setQuery} />
            <SowTourFilter tours={tours} setQuery={this.setQuery}/>
            <SowSectionFilter setQuery={this.setQuery} sections={sections}/>
          </div>
          <FetchingErrorComponentMessage
            fetching={this.props.eventFetching}
            error={this.props.eventError}
            message={this.props.message}
            component={
              <div className='row'>
                <div className='col-6'>
                  <button className='btn btn-dark' disabled={choosedSows.length !=1}
                    onClick={this.markAsNurse}>Отметить как кормилицу</button>
                  {this.props.eventError && !this.props.eventFetching &&
                    <p className='error-message'>{this.props.eventError}</p>
                  }
                </div>
              </div>
            }
          />
        </div>
        <div className='commonfilter-results'>
          <div className='count row'>
            <div className='col-6'>
              Выбрано {choosedSows.length} из {sows.length}
            </div>
          </div>
          <FetchingErrorComponentMessage
            fetching={this.props.listFetching}
            error={this.props.sowsListError}
            message={null}
            component={
              <SowTable sows={sows} sowClick={this.sowClick} 
                choosedSows={choosedSows}/>}
          />
        </div>
      </div>
    )
  }
}

export default WS3NurseSowTab