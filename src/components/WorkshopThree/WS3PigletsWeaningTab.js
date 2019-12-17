import React, { Component } from 'react';
import { toggleArray, toggleArrayLocations, getObjectbyId, toggleArrayDictById } from '../utils';

//components
import { PigletsWeaningSectionsTable, PigletsWeaningInput } from '../PigletsRepresentations'


class WS3PigletsWeaningTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: 6,
      activePigletsIds: [],
      activePiglets: [], 
      activePigletsInputList: [],
      totalInPart: null,
      needToRefresh: false
    };
    this.clickPiglets = this.clickPiglets.bind(this);
    this.createNomadPart = this.createNomadPart.bind(this);
    this.setData = this.setData.bind(this);
    this.moveNomad = this.moveNomad.bind(this);
    this.countTotal = this.countTotal.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }
  
  componentDidMount() {
    this.props.getLocations({sections_by_workshop_number: 3})
  }

  countTotal (activePigletsInputList) {
    let total = 0
    activePigletsInputList.map(record => {
      total += parseInt(record.quantity)
    })
    return total
  }

  clickPiglets (piglets, location) {
    let { activePigletsIds, activePiglets, activePigletsInputList } = this.state
    // here I can check is cell need to add to activeCells

    activePigletsIds = toggleArray(activePigletsIds, piglets.id)
    activePiglets = toggleArrayLocations(activePiglets, piglets)

    let weaningRecord = {
      id: piglets.id,
      piglets_id: piglets.id,
      quantity: piglets.quantity,
      metatour_repr: piglets.metatour_repr,
      location: location.section,
      changed: false
    }

    activePigletsInputList = toggleArrayDictById(activePigletsInputList, weaningRecord)
    
    this.setState({
      ...this.state,
      activePigletsIds: activePigletsIds,
      activePiglets: activePiglets,
      activePigletsInputList: activePigletsInputList,
      totalInPart: this.countTotal(activePigletsInputList)
    })
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

  createNomadPart () {
    const { activePigletsInputList } = this.state
    this.props.mergeFromListPiglets(activePigletsInputList)

    this.setState({
      ...this.state, 
      activePigletsIds: [],
      activePiglets: [], 
      activePigletsInputList: [], 
      needToRefresh: true,
    })
  }

  moveNomad () {
    let data = {
      id: this.state.activeNomadId,
      quantity: this.state.activeNomad.quantity,
      gilt_quantity: 0,
      to_location: 4
    }
    this.props.moveNomadPiglets(data)
    this.setState({
      ...this.state,
      activeNomadId: null,
      activeNomad: null,
      needToRefresh: true
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
        this.props.getLocations({sections_by_workshop_number: 3})
      }, 100)
    }
  }

  render() {
    this.refreshSowsList()
    const { locations } = this.props
    
    return (
        <div className='workshop-content'>
          <PigletsWeaningSectionsTable 
            locations={locations}
            activePigletsIds={this.state.activePigletsIds}
            clickPiglets={this.clickPiglets}/>
          <div className=''>
            <button className='btn btn-outline-dark' 
              disabled={this.state.activePigletsIds.length < 1}
              onClick={this.createNomadPart}>
              Создать партию
            </button>
            <p>{this.state.totalInPart && <span>Всего в партии {this.state.totalInPart}</span>}</p>
            <PigletsWeaningInput 
              piglets={this.state.activePigletsInputList} setQuantity={this.setQuantity} />
          </div>
        </div>
    )
  }
}

export default WS3PigletsWeaningTab