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
      activeNomadId: null,
      activeNomad: null,
      partNumber: '',
      needToRefresh: false
    };
    this.clickPiglets = this.clickPiglets.bind(this);
    this.createNomadPart = this.createNomadPart.bind(this);
    this.setData = this.setData.bind(this);
    this.moveNomad = this.moveNomad.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }
  
  componentDidMount() {
    this.props.getLocations({sections_by_workshop_number: 3})
  }

  clickPiglets (piglets) {
    let { activePigletsIds, activePiglets, activePigletsInputList } = this.state
    // here I can check is cell need to add to activeCells

    activePigletsIds = toggleArray(activePigletsIds, piglets.id)
    activePiglets = toggleArrayLocations(activePiglets, piglets)

    let weaningRecord = {
      id: piglets.id,
      quantity: piglets.quantity,
      metatour_repr: piglets.metatour_repr,
      location: piglets.location,
      changed: false
    }
    activePigletsInputList = toggleArrayDictById(activePigletsInputList, weaningRecord)

    this.setState({
      ...this.state,
      activePigletsIds: activePigletsIds,
      activePiglets: activePiglets,
      activePigletsInputList: activePigletsInputList
    })
  }

  setQuantity (e) {
    const { pigletsId } = e.target.dataset
    let { activePigletsInputList } = this.state

    // find weaning record in activePigletsInputList with id == pigletsId
    let weaningRecord = getObjectbyId(activePigletsInputList, pigletsId)
    // replace weaningRecord.quantity with e.target.value
    if (weaningRecord.quantity >= e.target.value) {
      weaningRecord.changed = true
      weaningRecord.quantity = e.target.value
    }

    this.setState({
      ...this.state,
      activePigletsInputList: activePigletsInputList
    })
    
  }

  createNomadPart () {
    console.log(this.state)
    // const locations  = this.state.activeLocations
    // let newBornGroupsIds = []
    // locations.map(location => {
    //   if (location.newbornpigletsgroup_set.length > 0)
    //   newBornGroupsIds = toggleArray(newBornGroupsIds, location.newbornpigletsgroup_set[0].id)
    // })
    // this.props.mergeNewbornPiglets({piglets_groups: newBornGroupsIds,
    //    part_number: this.state.partNumber})
    // this.setState({
    //   ...this.state, partNumber: 0,
    //   activeLocationsIds: [],
    //   activeLocations: [],
    //   activeNomadId: null,
    //   activeNomad: null,
    //   needToRefresh: true
    // })
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
        if (this.state.activeSectionId) {
          this.props.getLocations({by_section: this.state.activeSectionId})}
        this.props.getNomadPiglets({by_workshop_number: 3})
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
          <div className='row'>
            <div className='col-5'>
              <button className='btn btn-outline-dark' onClick={this.createNomadPart}>
                Создать партию
              </button>
              <PigletsWeaningInput 
                piglets={this.state.activePigletsInputList} setQuantity={this.setQuantity} />
            </div>
            <div className='col-5'>
              Созданные партии
            </div>
          </div>
        </div>
    )
  }
}

export default WS3PigletsWeaningTab