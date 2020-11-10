import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

//components
import { PigletsCells, Sections } from '../Locations'
import { FetchingErrorComponentMessage } from '../CommonComponents'
import { BottomExpand, PigletsGroupInlineMin } from './PigletsComponent'


class WSNomadInnerTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,

      activeSectionId: null,
      fromLocation: null,
      toLocation: null,

      quantity: 0,
      gilts_contains: false,

      expand: false,
      needToRefresh: false
    }
    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.setData = this.setData.bind(this);
    this.clickTransfer = this.clickTransfer.bind(this);
    this.resetLocations = this.resetLocations.bind(this);
    this.clickExpand = this.clickExpand.bind(this);
  }

  componentDidMount() {
    this.props.pigletsResetErrorsAndMessages()
  }

  clickLocation (location) {
    const { fromLocation, toLocation } = this.state
    let btnDisabled = this.state.buttonDisabled

    if (!fromLocation && !toLocation) {
      if (!location.is_piglets_empty) btnDisabled = false

      this.setState({
        ...this.state,
        expand: true,
        fromLocation: location,
        toLocation: null,
        buttonDisabled: btnDisabled,
        activePiglets: location.piglets.length > 0 ?
         location.piglets[0] : null,
        quantity: location.piglets.length > 0 ?
          location.piglets[0].quantity : 0
      })
    }

    if (fromLocation && !toLocation) {
      this.setState({
        ...this.state,
        toLocation: location,
        buttonDisabled: btnDisabled,
      })
    }
    this.props.pigletsResetErrorsAndMessages()
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })
    this.props.getLocations({by_section: sectionId, cells: true})
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
      expand: false,
    })
  }

  resetLocations () {
    this.setState({
      ...this.state,
      expand: false,
      quantity: 0,
      fromLocation: null,
      toLocation: null,
      activePiglets: null,
      buttonDisabled: true
    })
  }

  clickExpand () {
    this.setState({
      ...this.state,
      expand: !this.state.expand,
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
      }, 300)
    }
  }

  render() {
    const { sections, locations, eventFetching, eventError, message, grid } = this.props
    const { expand, toLocation, fromLocation, activeSectionId, activePiglets, quantity } = this.state
    this.refreshSowsList()

    let fromCell = activePiglets
      ? fromLocation 
        ? <p className='my-0 font-16'>
            {(fromLocation.is_piglets_empty) 
              ? <span className='color-red1-light'>нет поросят {fromLocation.cell}</span>
              : <PigletsGroupInlineMin piglets={activePiglets} className='font-13'/>
            }
          </p>
        : <p className='my-0 font-16'>выберите клетку</p>
      : fromLocation 
        ? <p className='my-0 font-16'>
            {fromLocation.is_piglets_empty 
              ? <span className='color-red1-light'>Пустая {fromLocation.cell}</span>
              : fromLocation.cell
            }
          </p>
        : <p className='my-0 font-16'>выберите клетку</p>

  let toCell = activePiglets
    ?  toLocation 
      ? <p className='my-0 font-16'>
          {(toLocation.is_piglets_empty)
            ? <span className=''>Пустая {toLocation.cell}</span>
            : <PigletsGroupInlineMin piglets={toLocation.piglets[0]} className='font-13'/>
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
        <div className='pb-5 mb-5'>
          <FetchingErrorComponentMessage 
            fetching={this.props.sectionsFetching}
            error={this.props.sectionsListError}
            message={null}
            component={
              <Sections 
                sections={sections}
                activeSectionId={this.state.activeSectionId}
                clickSection={this.clickSection}
              />}
            />
          <FetchingErrorComponentMessage 
            fetching={this.props.listFetching}
            error={this.props.locationsErrorList}
            message={null}
            component={
              <PigletsCells
                isSection={activeSectionId}
                fetching={this.props.listFetching}
                locations={locations}
                activeCellIds={[
                  fromLocation ? fromLocation.id : null,
                  toLocation ? toLocation.id : null,
                ]}
                fromCellId={fromLocation ? fromLocation.id : null}
                toCellId={toLocation ? toLocation.id : null}
                clickLocation={this.clickLocation}
                user={this.props.user}
                grid={grid}
                className='mb-5 pb-5'
              />}
          />
        <BottomExpand 
          clickExpand={this.clickExpand}
          expand={this.state.expand} error={eventError} message={message} fetching={eventFetching}
          label={'Выберите клетки'}
        >
          {(expand) &&
            <div className=''>
              <div className='row d-flex justify-content-center mb-2'>
                <div className='col-5 text-center'>
                  <p className='my-0 font-15'>
                    Из клетки {fromLocation.cell}<i className="fas fa-circle color-teal-dark pl-1"></i>
                  </p>
                  {fromCell}
                </div>
                <div className='col-5 text-center'>
                  <p className='my-0 font-15'>
                    В клетку {toLocation && toLocation.cell}<i className="fas fa-circle color-brown1-dark pl-1"></i>
                  </p>
                  {toCell}
                </div>
                <button onClick={this.resetLocations} className='btn bg-mainDark-dark mt-1'>
                  Сбросить
                </button>
              </div>
              <div className='divider my-1 py-0'></div>
                {(activePiglets && toLocation) &&
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
                  </button>]
                }
            </div>
          }
        </BottomExpand>
      </div>
    )
  }
}

export default WSNomadInnerTransferTab