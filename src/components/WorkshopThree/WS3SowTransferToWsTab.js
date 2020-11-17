import React, { Component } from 'react';

import { toggleArray, toggleArrayDictById } from '../utils';

//components
import { SowCells, Sections } from '../Locations'
import { FetchingErrorComponentMessage, ErrorOrMessage } from '../CommonComponents';


class WS3SowTransferToWsTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: 6,
      activeLocationsId: [],
      reprList: [],

      activeSows: [],

      needToRefresh: false
    }

    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.clickTransfer = this.clickTransfer.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.props.resetLocations()
    this.props.sowsResetErrorsAndMessages()
  }
  
  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId,
      needToRefresh: false
    })
    this.props.getLocations({by_section: sectionId, cells: true})
  }

  clickLocation (location) {
    this.props.sowsResetErrorsAndMessages()
    let { activeLocationsId, activeSows, reprList } = this.state

    if (location.sow_set.length > 0) {
      activeLocationsId = toggleArray(activeLocationsId, location.id)
      reprList = toggleArray(reprList, {sow:location.sow_set[0].farm_id, cell: location.cell})
      activeSows = toggleArrayDictById(activeSows, location.sow_set[0])
      
      this.setState({
        ...this.state,
        activeLocationsId: activeLocationsId,
        activeSows: activeSows,
        reprList: reprList
      })
    }
  }

  clickTransfer (e) {
    const { activeSows } = this.state
    const { to_location } = e.target.dataset
    let sows = []
    activeSows.map(activeSow => sows = toggleArray(sows, activeSow.id))

    this.props.sowsMoveMany({
      sows: sows,
      to_location: to_location
    })

    this.setState({
      ...this.state,
      activeSows: [],
      activeLocationsId: [],
      needToRefresh: true,
    })
  }

  // reprSows () {
  //   let { activeLocationsId, activeLocationsCell, activeSows } = this.state
  //   s = riskNamesArr.map(function(x, i){
  //     return {name: x, state: riskWorkflowStateArr[i]}
  //   })
  // }

  refresh () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        if (this.state.activeSectionId) {
          this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
          }
        }, 500)
    }
  }

  render() {
    const { sections, locations, locationsFetching, locationsListError,
       eventError, message, eventFetching  } = this.props
    this.refresh()
    
    return (
        <div className=''>
          <FetchingErrorComponentMessage 
              fetching={this.props.sectionsFetching}
              error={this.props.sectionsListError}
              message={null}
              component={
                <Sections 
                  sections={sections}
                  activeSectionId={this.state.activeSectionId}
                  fetching={this.props.sectionsFetching}
                  error={this.props.sectionsListError}
  
                  clickSection={this.clickSection}
                />}
            />
            <FetchingErrorComponentMessage 
              fetching={this.props.locationsFetching}
              error={this.props.locationsListError}
              message={null}
              component={
                <SowCells 
                  isSection={this.state.activeSectionId}
                  locations={locations}
                  fetching={locationsFetching}
                  activeCellIds={this.state.activeLocationsId}
                  clickLocation={this.clickLocation}
                  error={locationsListError}
                />}
            />
          
          <div className='card card-style fixed-bottom mx-1 my-1'>
            <div className='content pl-3'>
              <p className='my-0 font-17'>Выбрано {this.state.activeSows.length}</p>
              {this.state.activeSows.length > 0 &&
                <p className='mt-0 mb-1'>{this.state.reprList.map(reprSow =>
                   `${reprSow.sow}(${reprSow.cell}), `)}</p>}
              <button onClick={this.clickTransfer} data-to_location={3}
                className='btn bg-mainDark-dark btn-sm mr-3'>
                Переместить в цех 3
              </button>
              <button onClick={this.clickTransfer} data-to_location={1}
                className='btn bg-mainDark-dark btn-sm'>
                Переместить в цех 1
              </button>
              <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
                  className='mt-2 mb-0 mx-1 font-15' />
            </div>
          </div>
      </div>
    )
  }
}

export default WS3SowTransferToWsTab