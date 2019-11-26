import React, { Component } from 'react';

//components
import { SowCells, Sections } from '../Locations'

class WS3SowTransferCellToWsTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSow: null,
      activeFromSectionId: null,
      activeCellFromLocationId: null,
      activeToSectionId: null,
      activeCellToLocationId: null,
    }
  }
  
  clickFromSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeFromSectionId: sectionId,
      needToRefresh: false
    })
    this.props.getLocations1({by_section: sectionId})
  }

  clickToSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeToSectionId: sectionId
    })
    this.props.getLocations2({by_section: sectionId})
  }

  clickCellFromLocation = (location) => {
    this.setState({
      ...this.state,
      activeCellFromLocationId: location.id,
      activeSow: location.sow_set.length > 0 ?
       location.sow_set[0] : null
    })
  }

  clickCellToLocation = (location) => {
    this.setState({
      ...this.state,
      activeCellToLocationId: location.id,
    })
  }

  clickTransfer = () => {
    this.props.sowMoveTo({
      id: this.state.activeSow.id,
      location: 3
    })
    this.setState({
      ...this.state,
      activeSow: null,
      activeCellFromLocationId: null,
      activeCellToLocationId: null,
      needToRefresh: true,
    })
  }

  refreshLocations () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        if (this.state.activeFromSectionId) {
          this.props.getLocations1({by_section: this.state.activeFromSectionId})
          }
        }, 500)
    }
  }

  render() {
    const { sections, locations1 } = this.props
    this.refreshLocations()
    
    return (
        <div className='row workshop-content'>
          <div className='col-9'>
            <Sections 
              sections={sections}
              fetching={this.props.sectionsFetching}
              activeSectionId={this.state.activeFromSectionId}
              clickSection={this.clickFromSection}
              error={this.props.sectionsListError}
            />
            <SowCells 
              isSection={this.state.activeFromSectionId}
              locations={locations1}
              fetching={this.props.locationsFetching}
              activeCellIds={[this.state.activeCellFromLocationId]}
              clickLocation={this.clickCellFromLocation}
              error={this.props.locationsListError}
            />
          </div>
          <div className='col-3'>
            <div>
              {this.state.activeSow && 
                <ul>
                  <li>{this.state.activeSow.id}</li>
                  <li>{this.state.activeSow.farm_id}</li>
                  <li>{this.state.activeSow.status}</li>
                </ul>  
              }
            </div>
            {this.state.activeSow && 
              <div className='bottom-buttons-block'>
                <div className="input-group">
                  <button onClick={this.clickTransfer} className='btn btn-outline-secondary'>
                    Переместить в цех
                  </button>
                </div>
              </div>
            } 
          </div>
      </div>
    )
  }
}

export default WS3SowTransferCellToWsTab