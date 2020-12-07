import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
//components
import { PigletsCells, Sections } from '../Locations'
import { FetchingErrorComponentMessage } from '../CommonComponents'
import { BottomExpand, PigletsGroupInline } from './PigletsComponent'


class WSNomadTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,

      activeSectionId: null,
      activeCell: null,

      quantity: 0,
      total_weight: 0,
      gilts_contains: false,

      expand: false,

      needToRefresh: false
    }
    this.clickSection = this.clickSection.bind(this);
    this.clickCell = this.clickCell.bind(this);
    this.clickTransfer = this.clickTransfer.bind(this);
    this.setData = this.setData.bind(this);
    this.clickExpand = this.clickExpand.bind(this);
  }
  
  componentDidMount() {
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
    this.props.getLocations({by_section: sectionId, cells_piglets: true})
  }

  clickCell (location) {
    this.setState({
      ...this.state,
      activeCell: location,
      activePiglets: location.piglets.length > 0 ?
       location.piglets[0] : null,
      expand: true,
      quantity: location.piglets.length > 0 ?
        location.piglets[0].quantity : 0,
    })
    this.props.pigletsResetErrorsAndMessages()
  }

  clickTransfer (e) {
    const { activePiglets, quantity, total_weight } = this.state
    let data = {
      id: activePiglets.id,
      to_location: e.target.dataset.tolocation,
      gilts_contains: false,
      total_weight: total_weight,
      merge: false,
    }

    if (quantity > 0 && quantity < activePiglets.quantity)
      data['new_amount'] = quantity

    this.setState({
      ...this.state,
      activePiglets: null,
      activeCell: null,
      expand: false,

      quantity: 0,
      total_weight: 0,

      needToRefresh: true, 
    })
    this.props.movePiglets(data)
  }

  clickExpand () {
    this.setState({
      ...this.state,
      expand: !this.state.expand,
    })
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
      }, 300)
    }
  }

  render() {
    this.refreshSowsList ()
    const { sections, locations, message, eventError, grid, eventFetching } = this.props
    const { expand, activePiglets, activeCell, quantity, total_weight} = this.state

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
                  clickSection={this.clickSection}
                />}
            />
          <FetchingErrorComponentMessage 
              fetching={this.props.locationsFetching}
              error={this.props.locationsErrorList}
              message={null}
              component={
                <PigletsCells
                  isSection={this.state.activeSectionId}
                  fetching={this.props.locationsFetching}
                  locations={locations}
                  activeCellIds={[activeCell && activeCell.id]}
                  clickLocation={this.clickCell}
                  user={this.props.user}
                  grid={grid}
                />}
          />
          <BottomExpand 
              clickExpand={this.clickExpand}
              expand={this.state.expand} eventError={eventError} message={message} eventFetching={eventFetching}
              label={'Выберите клетку'}
            >
              {(activeCell && expand) &&
                <div>
                  {activePiglets
                    ? [ <p className='my-0 font-600'>Клетка {activeCell.cell}</p>,
                        <PigletsGroupInline piglets={activePiglets} className='my-0 font-700'/>,
                        <TextField
                          fullWidth={true}
                          type='number'
                          defaultValue={quantity}
                          label={'Кол-во для перегона'}
                          placeholder={'Кол-во для перегона'}
                          margin='dense'
                          onChange={this.setData}
                          name='quantity'
                          value={this.state.quantity}
                          />,
                          this.props.toLocation === 2
                          ? <TextField
                            fullWidth={true}
                            type='number'
                            defaultValue={total_weight}
                            label={'Общий вес'}
                            placeholder={'Общий вес'}
                            margin='dense'
                            onChange={this.setData}
                            name='total_weight'
                            value={this.state.total_weight}
                            />
                          : null,
                        this.props.toLocations 
                          ? this.props.toLocations.map((toLocation, key) => 
                            <button key={key}
                              className='btn btn-sm bg-mainDark-dark mt-2 ml-2' type='button'
                              data-toLocation={toLocation}
                              onClick={this.clickTransfer}>
                                {this.props.buttonName} {toLocation}
                            </button>,
                          ) 
                          :<button 
                              className='btn bg-mainDark-dark mt-2' type='button'
                              data-toLocation={this.props.toLocation}
                              onClick={this.clickTransfer}>
                                {this.props.buttonName}
                            </button>,
                      ]
                    : <p className='my-0 text-center font-600'>Пустая клетка {activeCell.cell}</p>
                  }
                </div>
              }
            </ BottomExpand>
      </div>
    )
  }
}

export default WSNomadTransferTab