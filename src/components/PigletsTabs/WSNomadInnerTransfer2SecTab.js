import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

//components
import { PigletsCells, Sections } from '../Locations'
import { FetchingErrorComponentMessage } from '../CommonComponents'
import { PigletsGroupInlineMin } from './PigletsComponent'


class WSNomadInnerTransfer2SecTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,

      activeFromSectionId: null,
      activeToSectionId: null,
      fromLocation: null,
      toLocation: null,

      quantity: 0,
      gilts_contains: false,

      expand: false,
      needToRefresh: false
    }
    this.clickFromSection = this.clickFromSection.bind(this);
    this.clickToSection = this.clickToSection.bind(this);
    this.clickFromLocation = this.clickFromLocation.bind(this);
    this.clickToLocation = this.clickToLocation.bind(this);
    this.setData = this.setData.bind(this);
    this.clickTransfer = this.clickTransfer.bind(this);
  }

  componentDidMount() {
    this.props.pigletsResetErrorsAndMessages()
  }

  clickFromLocation (location) {
      this.setState({
        ...this.state,
        fromLocation: location,
        activePiglets: location.piglets.length > 0 ?
         location.piglets[0] : null,
        quantity: location.piglets.length > 0 ?
          location.piglets[0].quantity : 0
      })
    this.props.pigletsResetErrorsAndMessages()
  }

  clickToLocation (location) {
    this.setState({
      ...this.state,
      toLocation: location,
    })
  this.props.pigletsResetErrorsAndMessages()
}

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  clickFromSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeFromSectionId: sectionId
    })
    this.props.getFromLocations({by_section: sectionId, cells_piglets: true})
  }

  clickToSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeToSectionId: sectionId
    })
    this.props.getToLocations({by_section: sectionId, cells_piglets: true})
  }
  
  clickTransfer () {
    const { activePiglets, toLocation, quantity, gilts_contains } = this.state
    let data = {
      id: activePiglets.id,
      to_location: toLocation.id,
      merge: true,
      gilts_contains: gilts_contains
    }

    if (quantity > 0 && quantity < activePiglets.quantity)
      data['new_amount'] = quantity

    this.props.movePiglets(data)
    this.setState({
      ...this.state,
      activePiglets: null,

      quantity: null,
      gilts_contains: false,

      needToRefresh: true, 

      fromLocation: null,
      toLocation: null,
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getFromLocations({by_section: this.state.activeFromSectionId, cells: true})
        this.props.getToLocations({by_section: this.state.activeToSectionId, cells: true})
      }, 300)
    }
  }

  render() {
    const { sections, toLocations, fromLocations, eventFetching, eventError, message, grid } = this.props
    const { toLocation, fromLocation, activeFromSectionId, activeToSectionId, activePiglets,
       quantity } = this.state
    this.refreshSowsList()

    return (
        <div className=''>
          <div className='row my-0'>
            <div className='col-6'>
              <FetchingErrorComponentMessage 
                fetching={this.props.sectionsFetching}
                error={this.props.sectionsListError}
                message={null}
                component={
                  <Sections 
                    sections={sections}
                    activeSectionId={activeFromSectionId}
                    clickSection={this.clickFromSection}
                  />}
                />
              <FetchingErrorComponentMessage 
                fetching={this.props.fromListFetching}
                error={this.props.fromLocationsErrorList}
                message={null}
                component={
                  <PigletsCells
                    isSection={activeFromSectionId}
                    fetching={this.props.fromListFetching}
                    locations={fromLocations}
                    activeCellIds={[
                      fromLocation ? fromLocation.id : null,
                    ]}
                    fromCellId={fromLocation ? fromLocation.id : null}
                    clickLocation={this.clickFromLocation}
                    user={this.props.user}
                    grid={grid}
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
                      activeSectionId={activeToSectionId}
                      clickSection={this.clickToSection}
                    />}
                  />
                <FetchingErrorComponentMessage 
                  fetching={this.props.toListFetching}
                  error={this.props.toLocationsErrorList}
                  message={null}
                  component={
                    <PigletsCells
                      isSection={activeToSectionId}
                      fetching={this.props.toListFetching}
                      locations={toLocations}
                      activeCellIds={[
                        toLocation ? toLocation.id : null,
                      ]}
                      toCellId={toLocation ? toLocation.id : null}
                      clickLocation={this.clickToLocation}
                      user={this.props.user}
                      grid={grid}
                    />}
                  />
                </div>
            </div>
            <div className='card card-style'>
              <div className='content'>
                <div className='row d-flex justify-content-around mb-2'>
                  {fromLocation 
                    ? <div className='col-5 text-center'>
                        <p className='my-0 font-15'>
                          Из клетки {fromLocation.cell}<i className="fas fa-circle color-teal-dark pl-1"></i>
                        </p>
                        {/* {fromCell} */}
                      </div>
                    : <p className='my-0'>Выберите клетку</p>}

                  {toLocation 
                    ? <div className='col-5 text-center'>
                        <p className='my-0 font-15'>
                          В клетку {toLocation && toLocation.cell}<i className="fas fa-circle color-brown1-dark pl-1"></i>
                        </p>
                        {/* {toCell} */}
                      </div>
                    : <p className='my-0'>Выберите клетку</p>}
                </div>
                {activePiglets
                  ? <PigletsGroupInlineMin piglets={activePiglets} className='text-center font-13 my-0'/>
                  : fromLocation && <p className='color-red1-light my-0 text-center'>Клетка пустая</p>}
                <div className='divider my-1 py-0'></div>

                <FetchingErrorComponentMessage 
                  fetching={eventFetching}
                  error={eventError}
                  message={message}
                  divClassName='text-center'
                  component={
                    (activePiglets && toLocation) &&
                      [<TextField
                        fullWidth={true}
                        type='number'
                        defaultValue={quantity}
                        label={'Кол-во для перемещения'}
                        placeholder={'Кол-во для перемещения'}
                        margin='dense'
                        onChange={this.setData}
                        name='quantity'
                        value={this.state.quantity}
                        />,
                      <button 
                        className='btn bg-mainDark-dark mt-2' 
                        onClick={this.clickTransfer}>
                          Переместить
                      </button>]}
                  />
              </div>
            </div>
      </div>
    )
  }
}

export default WSNomadInnerTransfer2SecTab