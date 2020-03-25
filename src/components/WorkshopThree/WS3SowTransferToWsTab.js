import React, { Component } from 'react';

//components
import { SowCells, Sections } from '../Locations'
import { ErrorMessage, Message } from '../CommonComponents';


class WS3SowTransferToWsTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSow: null,
      activeFromSectionId: null,
      activeCellFromLocationId: null,
      activeToSectionId: null,
      activeCellToLocationId: null,
    }

    this.clickSection = this.clickSection.bind(this);
    this.clickCell = this.clickCell.bind(this);
    this.clickTransfer = this.clickTransfer.bind(this);
  }

  componentDidMount() {
    this.props.sowsResetErrorsAndMessages()
  }
  
  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeFromSectionId: sectionId,
      needToRefresh: false
    })
    this.props.getLocations({by_section: sectionId, cells: true})
  }

  clickCell (location) {
    this.setState({
      ...this.state,
      activeCellFromLocationId: location.id,
      activeSow: location.sow_set.length > 0 ?
       location.sow_set[0] : null
    })
  }

  clickTransfer (e) {
    const { tows } = e.target.dataset

    this.props.sowMoveTo({
      id: this.state.activeSow.id,
      location: tows
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
          this.props.getLocations({by_section: this.state.activeFromSectionId, cells: true})
          }
        }, 500)
    }
  }

  render() {
    const { sections, locations, locationsFetching, locationsListError,
       sectionsFetching, sectionsListError, eventError, message  } = this.props
    this.refreshLocations()
    
    return (
        <div className='row workshop-content'>
          <div className='col-9'>
            <Sections 
              sections={sections}
              fetching={sectionsFetching}
              activeSectionId={this.state.activeFromSectionId}
              clickSection={this.clickSection}
              error={sectionsListError}
            />
            <SowCells 
              isSection={this.state.activeFromSectionId}
              locations={locations}
              fetching={locationsFetching}
              activeCellIds={[this.state.activeCellFromLocationId]}
              clickLocation={this.clickCell}
              error={locationsListError}
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
                  <button onClick={this.clickTransfer} data-tows={3}
                    className='btn btn-outline-secondary'>
                    Переместить в цех 3
                  </button>
                </div>
                <br />
                <div className="input-group">
                  <button onClick={this.clickTransfer} data-tows={1}
                    className='btn btn-outline-secondary'>
                    Переместить в цех 1
                  </button>
                </div>
              </div>
            }
            <div>
              {eventError && <ErrorMessage error={eventError}/>}
              {message && <Message message={eventError}/>}
            </div>
          </div>
      </div>
    )
  }
}

export default WS3SowTransferToWsTab