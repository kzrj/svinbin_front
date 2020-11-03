import React, { Component } from 'react';

//components
import { SowCells, Sections } from '../Locations'
import { SowSingle } from '../SowRepresentations'
import { FetchingErrorComponentMessage, ErrorOrMessage } from '../CommonComponents';


class WS3SowInnerTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: null, 

      fromLocation: null,
      toLocation: null,

      activeSow: null,

      buttonDisabled: true,

      needToRefresh: false
    }

    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.clickTransfer = this.clickTransfer.bind(this);
    this.resetLocations = this.resetLocations.bind(this);
    this.refreshLocations = this.refreshLocations.bind(this);
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
    const { fromLocation, toLocation } = this.state
    let btnDisabled = this.state.buttonDisabled

    if (!fromLocation && !toLocation) {
      if (location.is_sow_empty) btnDisabled = true

      this.setState({
        ...this.state,
        fromLocation: location,
        toLocation: null,
        buttonDisabled: btnDisabled,
        activeSow: location.sow_set.length > 0 ?
         location.sow_set[0] : null
      })
    }

    if (fromLocation && !toLocation) {
      if (location.is_sow_empty && !fromLocation.is_sow_empty) btnDisabled = false

      this.setState({
        ...this.state,
        toLocation: location,
        buttonDisabled: btnDisabled,
      })
    }

    this.props.sowsResetErrorsAndMessages()
  }

  resetLocations () {
    this.setState({
      ...this.state,
      fromLocation: null,
      toLocation: null,
      activeSow: null,
      buttonDisabled: true
    })
  }

  clickTransfer () {
    this.props.sowAndPiglets ?
      this.props.ws3TransferSowAndPiglets({
        from_location: this.state.activeCellFromLocationId,
        to_location: this.state.activeCellToLocationId,
      })
      :
      this.props.sowMoveTo({
        id: this.state.activeSow.id,
        location: this.state.toLocation.id
      })
    this.setState({
      ...this.state,
      fromLocation: null,
      toLocation: null,
      activeSow: null,
      buttonDisabled: true,
      needToRefresh: true,
    })
  }

  refreshLocations () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
        }, 300)
    }
  }

  render() {
    const { sections, locations, eventError, message, eventFetching } = this.props
    const { fromLocation, toLocation, activeSow } = this.state

    this.refreshLocations()
    
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
                  fetching={this.props.locationsFetching}
                  activeCellIds={[
                    this.state.fromLocation ? this.state.fromLocation.id : null,
                    this.state.toLocation ? this.state.toLocation.id : null,
                  ]}
                  fromCellId={this.state.fromLocation ? this.state.fromLocation.id : null}
                  toCellId={this.state.toLocation ? this.state.toLocation.id : null}
                  clickLocation={this.clickLocation}
                  error={this.props.locationsListError}
                />}
            />
        <div className='card card-style fixed-bottom mx-1 my-1'>
          <div className='content'>
            {activeSow && 
              <SowSingle sow={activeSow} className='text-center my-0 font-13 font-600 color-mainDark-dark'/>
            }
            <div className='row d-flex justify-content-center mb-2'>
              <div className='col-5 text-center'>
                <p className='my-0 font-16'>
                  Из клетки <i className="fas fa-circle color-teal-dark"></i>
                </p>
                {fromLocation 
                  ? <p className='my-0 font-16'>
                      {fromLocation.is_sow_empty 
                        ? <span className='color-red1-light'>Пустая {fromLocation.cell}</span>
                        : fromLocation.cell
                      }
                    </p>
                  : <p className='my-0 font-16'>выберите клетку</p>
                }
                <button onClick={this.resetLocations} className='btn bg-mainDark-dark mt-1'>
                  Сбросить
                </button>
              </div>
              <div className='col-5 text-center'>
                <p className='my-0 font-16'>
                  В клетку <i className="fas fa-circle color-brown1-dark"></i>
                </p>
                {toLocation 
                  ? <p className='my-0 font-16'>
                      {toLocation.is_sow_empty
                        ? toLocation.cell
                        : <span className='color-red1-light'>Занято {fromLocation.cell}</span>
                      }
                    </p>
                  : <p className='my-0 font-16'>выберите клетку</p>
                }
                <button onClick={this.clickTransfer} 
                  disabled={this.state.buttonDisabled}
                  className='btn bg-mainDark-dark mt-1'>
                  Переместить
                </button>
              </div>
              <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
                className='mt-2 mb-0 mx-1 font-15' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WS3SowInnerTransferTab