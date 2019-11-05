import React, { Component } from 'react';

//components
import { SowCells, Sections } from '../Locations'

class WS3SowInnerTransferTab extends Component {
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
      location: this.state.activeCellToLocationId
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
        if (this.state.activeFromSectionId && this.state.activeToSectionId) {
          this.props.getLocations1({by_section: this.state.activeFromSectionId})
          this.props.getLocations2({by_section: this.state.activeToSectionId})}
        }, 500)
    }
  }

  render() {
    const { sections, locations1, locations2 } = this.props
    this.refreshLocations()
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
            <Sections 
              sections={sections}
              fetching={this.props.sectionsFetching}
              activeSectionId={this.state.activeFromSectionId}
              clickSection={this.clickFromSection}
            />
            <SowCells 
              isSection={this.state.activeFromSectionId}
              locations={locations1}
              fetching={this.props.locationsFetching}
              activeCellIds={[this.state.activeCellFromLocationId]}
              clickLocation={this.clickCellFromLocation}
            />
          </div>
          <div className='col-6'>
              <Sections
                sections={sections}
                fetching={this.props.sectionsFetching}
                activeSectionId={this.state.activeToSectionId}
                clickSection={this.clickToSection}
              />
              <SowCells
                isSection={this.state.activeToSectionId}
                locations={locations2}
                fetching={this.props.locationsAddFetching}
                activeCellIds={[this.state.activeCellToLocationId]}
                clickLocation={this.clickCellToLocation}
              />
          </div>
        <div>
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
                  Переместить
                </button>
              </div>
            </div>
          } 
        </div>
      </div>
    )
  }
}

export default WS3SowInnerTransferTab