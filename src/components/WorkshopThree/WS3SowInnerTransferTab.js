import React, { Component } from 'react';

//components
import { SowCells, Sections } from '../Locations'
import { FetchingErrorComponentMessage } from '../CommonComponents';

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

  componentDidMount() {
  }
  
  clickFromSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeFromSectionId: sectionId,
      needToRefresh: false
    })
    this.props.getLocations1({by_section: sectionId, cells: true})
  }

  clickToSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeToSectionId: sectionId
    })
    this.props.getLocations2({by_section: sectionId, cells: true})
  }

  clickCellFromLocation = (location) => {
    this.setState({
      ...this.state,
      activeCellFromLocationId: location.id,
      activeSow: location.sow_set.length > 0 ?
       location.sow_set[0] : null
    })
    this.props.wsDataResetErrorsAndMessages()
  }

  clickCellToLocation = (location) => {
    this.setState({
      ...this.state,
      activeCellToLocationId: location.id,
    })
  }

  clickTransfer = () => {
    this.props.sowAndPiglets ?
      this.props.ws3TransferSowAndPiglets({
        from_location: this.state.activeCellFromLocationId,
        to_location: this.state.activeCellToLocationId,
      })
      :
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
          this.props.getLocations1({by_section: this.state.activeFromSectionId, cells: true})
          this.props.getLocations2({by_section: this.state.activeToSectionId, cells: true})}
        }, 500)
    }
  }

  render() {
    const { sections, locations1, locations2, eventError, message } = this.props
    this.refreshLocations()
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
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
  
                  clickSection={this.clickFromSection}
                />}
            />
            <FetchingErrorComponentMessage 
              fetching={this.props.locationsFetching}
              error={this.props.locationsListError}
              message={null}
              component={
                <SowCells 
                  isSection={this.state.activeFromSectionId}
                  locations={locations1}
                  fetching={this.props.locationsFetching}
                  activeCellIds={[this.state.activeCellFromLocationId]}
                  clickLocation={this.clickCellFromLocation}
                  error={this.props.locationsListError}
                />}
            />
          </div>
          <div className='col-6'>
            <FetchingErrorComponentMessage 
                fetching={this.props.sectionsFetching}
                error={this.props.sectionsListError}
                message={null}
                component={
                    <Sections
                  sections={sections}
                  fetching={this.props.sectionsFetching}
                  activeSectionId={this.state.activeToSectionId}
                  clickSection={this.clickToSection}
                  error={this.props.sectionsListError}
                />}
              />
              <FetchingErrorComponentMessage 
                fetching={this.props.locationsAddFetching}
                error={this.props.locationsList2Error}
                message={null}
                component={
                  <SowCells
                    isSection={this.state.activeToSectionId}
                    locations={locations2}
                    fetching={this.props.locationsAddFetching}
                    activeCellIds={[this.state.activeCellToLocationId]}
                    clickLocation={this.clickCellToLocation}
                    error={this.props.locationsList2Error}
                  />}
              />
          </div>
        <div className='row'>
          <div className='col'>
            {this.state.activeSow && 
              <ul>
                <li>Farm ID: {this.state.activeSow.farm_id}</li>
                <li>Статус: {this.state.activeSow.status}</li>
              </ul>  
            }
          </div>
            <FetchingErrorComponentMessage 
                fetching={this.props.eventFetching}
                error={this.props.eventError}
                message={this.props.message}
                component={
                      <div className='bottom-buttons-block col'>
                        <div className="input-group">
                          <button onClick={this.clickTransfer} className='btn btn-outline-secondary'>
                            Переместить
                          </button>
                        </div>
                      </div>
                  }
              />
        </div>
      </div>
    )
  }
}

export default WS3SowInnerTransferTab