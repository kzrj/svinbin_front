import React, { Component } from 'react';

//components
import { SowCells, Sections } from '../Locations'
import { SowFindByIdWithoutGet } from '../SowRepresentations'
import { FetchingErrorComponentMessage } from '../CommonComponents';


class WS3SowIncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        alive: true,
        by_workshop_number: 3,
        farm_id_starts: '',
        ordering: 'tour'
      },
      activeSectionId: null,
      activeLocationId: null,
      activeCellId: null,
      activeSowId: null,

      needToRefresh: false
    }
    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.getSowsById = this.getSowsById.bind(this);
    this.clickSetlle = this.clickSetlle.bind(this);
    this.clickSow = this.clickSow.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }
  
  componentDidMount() {
    this.props.getSows(this.state.query)
  }

  clickSow (e) {
    const { id } = e.target.dataset
    this.setState({
      ...this.state,
      activeSowId: id
    })
    this.props.sowsResetErrorsAndMessages()
  }

  getSowsById (e) {
    let { query } = this.state
    query.farm_id_starts = e.target.value
    this.setState({
      ...this.state,
      query: query,
      activeSowId: null,
    })
    this.props.getSows(query)
  }

  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.props.getLocations({by_section: sectionId, cells: true})
    this.setState({
      ...this.state,
      activeSectionId: sectionId,
    })
  }

  clickLocation (location) {
    this.setState({
      ...this.state,
      activeCellId: location.id,
    })
  }

  clickSearch () {
    this.setState({
      ...this.state,
      query: {...this.state.query, farm_id_starts: ''},
      activeSowId: null,
    })
  }

  clickSetlle () {
    const { activeCellId, activeSowId } = this.state
    this.props.sowMoveTo({id: activeSowId, location: activeCellId})
    this.setState({
      ...this.state,
      activeCellId: null,
      // activeSectionId: null,
      query: {...this.state.query, farm_id_starts: ''},
      activeSowId: null,
      needToRefresh: true
    })
  }

  refreshData () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows(this.state.query)
        this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
      }, 500)
    }
  }

  render() {
    this.refreshData()
    const { sows, sections, sectionsFetching, sectionsListError, locationsFetching, sowsListError,
       listFetching, locationsListError, eventFetching, eventError, message } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3 workshop-left-column'>

            <SowFindByIdWithoutGet 
              sows={sows}
              activeSowId={this.state.activeSowId}
              clickSow={this.clickSow}
              clickSearch={this.clickSearch}

              sowIdValue={this.state.query.farm_id_starts}
              getSowsById={this.getSowsById} 
              
              fetching={listFetching}
              error={sowsListError}
              />
            
          </div>
          <div className='col-9 workshop-right-column'>
            <FetchingErrorComponentMessage 
              fetching={sectionsFetching}
              error={sectionsListError}
              message={null}
              component={
                <Sections 
                  sections={sections}
                  activeSectionId={this.state.activeSectionId}
                  fetching={sectionsFetching}
                  error={sectionsListError}
  
                  clickSection={this.clickSection}
                />}
            />
            <FetchingErrorComponentMessage 
              fetching={locationsFetching}
              error={locationsListError}
              message={null}
              component={
                <SowCells 
                  locations={this.props.locations}
                  activeCellIds={[this.state.activeCellId]}
                  fetching={locationsFetching}
                  error={locationsListError}
                  isSection={this.state.activeSectionId}
                  clickLocation={this.clickLocation}
                />}
            />
            <FetchingErrorComponentMessage 
              fetching={eventFetching}
              error={eventError}
              message={message}
              component={
                <div className='bottom-buttons-block row'>
                  <div className="input-group col">
                    {this.state.activeCellId && this.state.activeSowId &&
                      <button onClick={this.clickSetlle} className='btn btn-outline-secondary'>
                        Разместить свиноматку
                      </button>
                    }
                  </div>
                </div>
              }
            />
          </div>
        </div>
    )
  }
}

export default WS3SowIncomeTab