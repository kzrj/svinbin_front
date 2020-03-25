import React, { Component } from 'react';

import { toggleArray, toggleArrayDictById } from '../utils';

//components
import { SowCells, Sections } from '../Locations'
import { ErrorMessage, Message } from '../CommonComponents';


class WS3SowTransferToWsTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: 6,
      activeLocationsId: [],

      activeSows: [],

      needToRefresh: false
    }

    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.clickTransfer = this.clickTransfer.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
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
    let { activeLocationsId, activeSows } = this.state

    if (location.sow_set.length > 0) {
      activeLocationsId = toggleArray(activeLocationsId, location.id)
      activeSows = toggleArrayDictById(activeSows, location.sow_set[0])
      
      this.setState({
        ...this.state,
        activeLocationsId: activeLocationsId,
        activeSows: activeSows,
      })
    }
  }

  clickTransfer (e) {
    const { activeSows } = this.state
    const { to_location } =e.target.dataset
    let sows = []
    activeSows.map(activeSow => sows = toggleArray(sows, activeSow.id))

    console.log(sows, to_location)

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
       sectionsFetching, sectionsListError, eventError, message  } = this.props
    this.refresh()
    
    return (
        <div className='row workshop-content'>
          <div className='col-9'>
            <Sections 
              sections={sections}
              fetching={sectionsFetching}
              activeSectionId={this.state.activeSectionId}
              clickSection={this.clickSection}
              error={sectionsListError}
            />
            <SowCells 
              isSection={this.state.activeSectionId}
              locations={locations}
              fetching={locationsFetching}
              activeCellIds={this.state.activeLocationsId}
              clickLocation={this.clickLocation}
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
            {this.state.activeSows.length > 0 && 
              <div>
                <div>
                  <p>Выбрано {this.state.activeSows.length}</p>
                  {this.state.activeSows.map(activeSow => <p>{activeSow.farm_id}</p>)}
                </div>
                <div className='bottom-buttons-block'>
                  <div className="input-group">
                    <button onClick={this.clickTransfer} data-to_location={3}
                      className='btn btn-outline-secondary'>
                      Переместить в цех 3
                    </button>
                  </div>
                  <br />
                  <div className="input-group">
                    <button onClick={this.clickTransfer} data-to_location={1}
                      className='btn btn-outline-secondary'>
                      Переместить в цех 1
                    </button>
                  </div>
                </div>
              </div>
            }
          <div>
            {eventError && <ErrorMessage error={eventError}/>}
            {message && <Message message={message}/>}
          </div>
          </div>
      </div>
    )
  }
}

export default WS3SowTransferToWsTab