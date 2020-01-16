import React, { Component } from 'react';
import { toggleArray, toggleArrayLocations, getObjectbyId, toggleArrayDictById } from '../utils';

//components
import { PigletsCells, Sections } from '../Locations'
import { PigletsWeaningInput } from '../PigletsRepresentations'
import { ErrorMessage, Message } from '../CommonComponents'


class WS3PigletsWeaningTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: 6,
      activeLocationsId: [],

      activePigletsInputList: [],
      totalInPart: null,
      transfer_part_number: null,

      needToRefresh: false
    };
    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.createNomadPart = this.createNomadPart.bind(this);
    this.setData = this.setData.bind(this);
    this.countTotal = this.countTotal.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.setGiltsContain = this.setGiltsContain.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }
  
  componentDidMount() {
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
    let { activeLocationsId, activePigletsInputList } = this.state
    // if there are not piglets location is not active
    // else add to active locationsIds
    if (location.piglets.length > 0) {
      activeLocationsId = toggleArray(activeLocationsId, location.id)
      let piglets = location.piglets[0]

      // create weaningRecord 
      let weaningRecord = {
        id: piglets.id,
        piglets_id: piglets.id,
        quantity: piglets.quantity,
        metatour_repr: piglets.metatour_repr,
        location: location,
        gilts_quantity: piglets.gilts_quantity,
        gilts_contains: false,
        changed: false
      }

      // add piglets to activePigletsInputList
      activePigletsInputList = toggleArrayDictById(activePigletsInputList, weaningRecord)
      
      this.setState({
        ...this.state,
        activeLocationsId: activeLocationsId,
        activePigletsInputList: activePigletsInputList,
        totalInPart: this.countTotal(activePigletsInputList)
      })
    }
  }

  countTotal (activePigletsInputList) {
    let total = 0
    activePigletsInputList.map(record => {
      total += parseInt(record.quantity)
    })
    return total
  }

  setQuantity (e) {
    const { pigletsId } = e.target.dataset
    let { activePigletsInputList, totalInPart } = this.state

    // find weaning record in activePigletsInputList with id == pigletsId
    let weaningRecord = getObjectbyId(activePigletsInputList, pigletsId)
    // replace weaningRecord.quantity with e.target.value
    if (parseInt(weaningRecord.quantity) != parseInt(e.target.value)) {
      weaningRecord.changed = true
    }
    weaningRecord.quantity = parseInt(e.target.value)

    this.setState({
      ...this.state,
      activePigletsInputList: activePigletsInputList,
      totalInPart: this.countTotal(activePigletsInputList)
    })
  }

  setGiltsContain (e) {
    const { pigletsId } = e.target.dataset
    let { activePigletsInputList} = this.state

    // find weaning record in activePigletsInputList with id == pigletsId
    let weaningRecord = getObjectbyId(activePigletsInputList, pigletsId)
    if (weaningRecord.gilts_quantity > 0){
      weaningRecord.gilts_contains = !weaningRecord.gilts_contains
    } else {
      weaningRecord.gilts_contains = false
    }

    this.setState({
      ...this.state,
      activePigletsInputList: activePigletsInputList,
    })

  }

  createNomadPart () {
    const { activePigletsInputList, transfer_part_number } = this.state
    
    this.props.mergeFromListPiglets({
      records: activePigletsInputList,
      transfer_part_number: transfer_part_number
    })

    this.setState({
      ...this.state, 
      activeLocationsId: [],
      activePigletsInputList: [],
      totalInPart: null,
      needToRefresh: true,
    })
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
      }, 100)
    }
  }

  render() {
    this.refreshSowsList()
    const { locations, sections, eventMessage, eventError } = this.props
    return (
        <div className='workshop-content'>
          <div className='col-12'>
            <Sections 
                sections={sections}
                activeSectionId={this.state.activeSectionId}
                clickSection={this.clickSection}
                error={this.props.sectionsListError}
              />
            <PigletsCells
              isSection={this.state.activeSectionId}
              locations={locations}
              activeCellIds={this.state.activeLocationsId}
              clickLocation={this.clickLocation}
              error={this.props.locationsListError}
            />
          </div>
          <div className=''>
            <button className='btn btn-outline-dark' 
              disabled={this.state.activePigletsInputList.length < 1}
              onClick={this.createNomadPart}>
              Создать партию
            </button>
            <p>{this.state.totalInPart && <span>Всего в партии {this.state.totalInPart}</span>}</p>
            {this.state.activePigletsInputList.length > 0 && 
              <div> 
                <input type='number' onChange={this.setData} name='transfer_part_number' 
                  value={this.state.transfer_part_number}/>
                Номер партии 
               </div>
            }
            <p>{eventMessage}</p>
            {eventError && <ErrorMessage error={eventError}/>}
            {this.state.activePigletsInputList.length > 0 &&
              <PigletsWeaningInput 
                weaningRecords={this.state.activePigletsInputList} 
                setQuantity={this.setQuantity} 
                setGiltsContain={this.setGiltsContain}/>
            }
          </div>
        </div>
    )
  }
}

export default WS3PigletsWeaningTab