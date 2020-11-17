import React, { Component } from 'react';

//components
import { SowCells, Sections } from '../Locations'
import { SowSingle } from '../SowRepresentations'
import { FetchingErrorComponentMessage, ErrorOrMessage } from '../CommonComponents';


function BottomSowAndPiglets (props) {
  const { sowAndPiglets, activeSow, fromLocation, resetLocations, toLocation, clickTransfer, buttonDisabled, 
    eventError, eventFetching, message, activePiglets } = props
  
  let fromCell = sowAndPiglets
    ? fromLocation 
      ? <p className='my-0 font-16'>
          {(fromLocation.is_sow_empty || fromLocation.is_piglets_empty) 
            ? fromLocation.is_sow_empty
              ? <span className='color-red1-light'>нет свиноматки {fromLocation.cell}</span>
              : <span className='color-red1-light'>нет поросят {fromLocation.cell}</span>
            : fromLocation.cell
          }
        </p>
      : <p className='my-0 font-16'>выберите клетку</p>
    : fromLocation 
      ? <p className='my-0 font-16'>
          {fromLocation.is_sow_empty 
            ? <span className='color-red1-light'>Пустая {fromLocation.cell}</span>
            : fromLocation.cell
          }
        </p>
      : <p className='my-0 font-16'>выберите клетку</p>

  let toCell = sowAndPiglets
    ?  toLocation 
      ? <p className='my-0 font-16'>
          {(!toLocation.is_sow_empty || !toLocation.is_piglets_empty)
            ? <span className='color-red1-light'>Занято {toLocation.cell}</span>
            : toLocation.cell
          }
        </p>
      : <p className='my-0 font-16'>выберите клетку</p>
    : toLocation
      ? <p className='my-0 font-16'>
          {toLocation.is_sow_empty
            ? toLocation.cell
            : <span className='color-red1-light'>Занято {fromLocation.cell}</span>
          }
        </p>
      : <p className='my-0 font-16'>выберите клетку</p>
  
  return (
    <div className='card card-style fixed-bottom mx-1 my-1'>
      <div className='content'>
        {(activeSow) &&
          [<SowSingle sow={activeSow} className='text-center my-0 font-13 font-600 color-mainDark-dark'/>,
            activePiglets && 
              <p className='my-0 text-center font-600 color-mainDark-dark'>Поросят {activePiglets}</p>]
        }
        <div className='row d-flex justify-content-center mb-2'>
          <div className='col-5 text-center'>
            <p className='my-0 font-16'>
              Из клетки <i className="fas fa-circle color-teal-dark"></i>
            </p>
            {fromCell}
            <button onClick={resetLocations} className='btn bg-mainDark-dark mt-1'>
              Сбросить
            </button>
          </div>
          <div className='col-5 text-center'>
            <p className='my-0 font-16'>
              В клетку <i className="fas fa-circle color-brown1-dark"></i>
            </p>
            {toCell}
            <button onClick={clickTransfer} 
              disabled={buttonDisabled}
              className='btn bg-mainDark-dark mt-1'>
              Переместить
            </button>
          </div>
          <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
            className='mt-2 mb-0 mx-1 font-15' />
        </div>
      </div>
    </div>
  )
}

class WS3SowInnerTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: null, 

      fromLocation: null,
      toLocation: null,

      activeSow: null,
      activePiglets: null,

      buttonDisabled: true,

      needToRefresh: false
    }

    this.clickSection = this.clickSection.bind(this);
    this.clickLocationSow = this.clickLocationSow.bind(this);
    this.clickLocationSowAndPiglets = this.clickLocationSowAndPiglets.bind(this);
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
    this.props.initLocations()
    this.props.getLocations({by_section: sectionId, cells: true})
  }

  clickLocationSow (location) {
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
      if (location.is_sow_empty && (fromLocation && !fromLocation.is_sow_empty)) btnDisabled = false

      this.setState({
        ...this.state,
        toLocation: location,
        buttonDisabled: btnDisabled,
      })
    }

    this.props.sowsResetErrorsAndMessages()
  }

  clickLocationSowAndPiglets (location) {
    const { fromLocation, toLocation } = this.state
    let btnDisabled = this.state.buttonDisabled

    if (!fromLocation && !toLocation) {
      if (!location.is_sow_empty && !location.is_piglets_empty) btnDisabled = false

      this.setState({
        ...this.state,
        fromLocation: location,
        toLocation: null,
        buttonDisabled: btnDisabled,
        activeSow: location.sow_set.length > 0 ?
         location.sow_set[0] : null,
        activePiglets: location.piglets.length > 0 ?
         location.piglets[0].quantity : null
      })
    }

    if (fromLocation && !toLocation) {
      if (!btnDisabled)
        if (!location.is_sow_empty || !location.is_piglets_empty) btnDisabled = true
        else btnDisabled = false

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
      activePiglets: null,
      buttonDisabled: true
    })
  }

  clickTransfer () {
    this.props.sowAndPiglets ?
      this.props.ws3TransferSowAndPiglets({
        from_location: this.state.fromLocation.id,
        to_location: this.state.toLocation.id,
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
      activePiglets: null,
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
    const { sections, locations, eventError, message, eventFetching, sowAndPiglets } = this.props
    const { fromLocation, toLocation, activeSow, buttonDisabled, activePiglets } = this.state

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
                clickLocation={this.props.sowAndPiglets 
                  ? this.clickLocationSowAndPiglets 
                  : this.clickLocationSow}
                error={this.props.locationsListError}
              />}
          />
          <BottomSowAndPiglets
            sowAndPiglets={sowAndPiglets}
            activeSow={activeSow}
            activePiglets={activePiglets}
            fromLocation={fromLocation}
            resetLocations={this.resetLocations}
            toLocation={toLocation}
            clickTransfer={this.clickTransfer}
            buttonDisabled={buttonDisabled}
            eventError={eventError}
            eventFetching={eventFetching}
            message={message}
            />
        </div>
    )
  }
}

export default WS3SowInnerTransferTab