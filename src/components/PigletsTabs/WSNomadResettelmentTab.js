import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

// components
import { PigletsCells, Sections } from '../Locations'
import { FetchingErrorComponentMessage } from '../CommonComponents'
import { BottomExpand, PigletsGroupInlineMin, PigletsListElem } from './PigletsComponent'


class WSNomadResettelmentTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,
      activeSectionId: null,
      activeCell: null,
      pigletsInCell: null,

      quantity: 0,
      gilts_contains: false,

      needToRefresh: false
    }
    this.setData = this.setData.bind(this);
    this.clickSection = this.clickSection.bind(this);
    this.clickCell = this.clickCell.bind(this);
    this.clickPiglets = this.clickPiglets.bind(this);
    this.clickSetlle = this.clickSetlle.bind(this);

    this.clickExpand = this.clickExpand.bind(this);
  }
  
  componentDidMount() {
    this.props.getPiglets({
      status_title: (this.props.ignorePigletsStatus ) 
        ? '' : "Взвешены, готовы к заселению",
      by_workshop_number: this.props.workshopNumber
    })
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

  clickCell (location) {
    this.setState({
      ...this.state,
      activeCell: location,
      pigletsInCell: location.piglets.lenght > 0 ? location.piglets[0] : null,
      expand: true,
    })
    this.props.pigletsResetErrorsAndMessages()
  }

  clickPiglets (piglets) {
    this.setState({
      ...this.state,
      expand: true,
      activePiglets: piglets,
      quantity: piglets.quantity
    })
  }

  clickSetlle () {
    const { activePiglets, activeCell, quantity, gilts_contains } = this.state
    let data = {
      id: activePiglets.id,
      to_location: activeCell.id,
      merge: true,
      gilts_contains: gilts_contains
    }

    if (quantity > 0 && quantity < activePiglets.quantity)
      data['new_amount'] = quantity

    this.props.movePiglets(data)
    this.setState({
      ...this.state,
      activePiglets: null,
      expand: false,

      quantity: 0,
      gilts_contains: false,
      
      needToRefresh: true, 
      activeCell: null,
      pigletsInCell: null
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
        this.props.getPiglets({
          status_title: "Взвешены, готовы к заселению",
          by_workshop_number: this.props.workshopNumber
        })
      }, 300)
    }
  }

  render() {
    this.refreshSowsList()
    const { piglets, sections, locations, eventError, grid, message, eventFetching } = this.props
    const { quantity, expand, activeCell, activePiglets, activeSectionId } = this.state

    let disabled = true
    if (activePiglets && activeCell) disabled = false

    return (
      <div className='pb-5 mb-5'>
        <div className='row'>
          <div className='col-3 pl-3'>
            {piglets.map(group =>
              <div className={(activePiglets) && activePiglets.id == group.id 
                  ? 'nomad-piglets-row piglets-active my-1'
                  : 'nomad-piglets-row my-1 bg-white-dark'}
                onClick={() => this.clickPiglets(group)}
                key={group.id}
                >
                <PigletsListElem piglets={group} />
              </div>
            )}
          </div>
          <div className='col-9 pl-3'>
            <FetchingErrorComponentMessage 
                fetching={this.props.sectionsFetching}
                error={this.props.sectionsListError}
                message={null}
                component={
                  <Sections 
                    sections={sections}
                    activeSectionId={activeSectionId}
                    clickSection={this.clickSection}
                  />}
              />
            <FetchingErrorComponentMessage 
              fetching={this.props.locationsFetching}
              error={this.props.locationsErrorList}
              message={null}
              component={
                <PigletsCells
                  isSection={activeSectionId}
                  fetching={this.props.locationsFetching}
                  locations={locations}
                  activeCellIds={[activeCell && activeCell.id]}
                  clickLocation={this.clickCell}
                  user={this.props.user}
                  grid={grid}
                />}
            />
          </div>
        </div>
        <BottomExpand 
          clickExpand={this.clickExpand}
          expand={expand} eventError={eventError} message={message} eventFetching={eventFetching}
          label={'Выберите поросят и клетку'}
        >
          {(expand) &&
            <div>
              <div className='row d-flex justify-content-center mb-2'>
                <div className='col-6 text-center'>
                  {activePiglets 
                    ? <p className='my-0'>
                        <PigletsGroupInlineMin piglets={activePiglets} className='font-13 my-0'/>
                      </p>
                    : <p className='my-0 font-600'>Выберите поросят</p>
                  }
                </div>
                <div className='col-6 text-center'>
                  {activeCell 
                    ? <p className='my-0'>
                        <span className='font-600'>Клетка {activeCell.cell}</span>
                        {activeCell.piglets.length > 0 && 
                          <PigletsGroupInlineMin piglets={activeCell.piglets[0]} 
                            className='d-inline ml-1 font-13 my-0'/>
                        }
                      </p>
                    : <p className='my-0 font-600'>Выберите клетку</p>
                  }
                </div>
              </div>
              {activePiglets && 
                [<div className='divider my-1 py-0'></div>,
                <TextField
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
                <button className='btn bg-mainDark-dark mt-2'
                  onClick={this.clickSetlle} disabled={disabled}
                  >
                    Разместить группу
                </button>]
              }
            </div>
          }
        </BottomExpand>
    </div>
    )
  }
}

export default WSNomadResettelmentTab