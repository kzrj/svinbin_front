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
      is_it_gilts_part: false,
      needToRefresh: false
    };
    this.clickPiglets = this.clickPiglets.bind(this);
    this.createNomadPart = this.createNomadPart.bind(this);
    this.setData = this.setData.bind(this);
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
    const { activePigletsInputList, is_it_gilts_part } = this.state
    
    this.props.mergeFromListPiglets({
      records: activePigletsInputList,
      is_it_gilts_part: is_it_gilts_part
    })

    this.setState({
      ...this.state, 
      activePigletsIds: [],
      activePiglets: [], 
      activePigletsInputList: [],
      is_it_gilts_part: false,
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
            <div className='input-group'>
              <label>Эта партия ремонтных свинок?</label>
              <input type='checkbox' checked={this.state.is_it_gilts_part} 
                onChange={() => this.setState({...this.state, is_it_gilts_part: !this.state.is_it_gilts_part})}/>
            </div>
            <PigletsWeaningInput 
              piglets={this.state.activePigletsInputList} setQuantity={this.setQuantity} />
          </div>
        </div>
    )
  }
}

export default WS3PigletsWeaningTab