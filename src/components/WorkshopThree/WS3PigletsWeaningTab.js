import React, { Component } from 'react';
import { toggleArray, toggleArrayLocations, lodashToggle } from '../utils';

//components
import { PigletsCells, Sections } from '../Locations'
import { NewBornGroupWeaningList } from '../PigletsRepresentations'


class WS3PigletsWeaningTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: 6,
      activeLocationsIds: [], // cell multiple selection
      activeLocations: [], // for newborn list
      activeNomadId: null,
      activeNomad: null,
      partNumber: '',
      needToRefresh: false
    };
    this.clickLocation = this.clickLocation.bind(this);
    this.clickSection = this.clickSection.bind(this);
    this.createNomadPart = this.createNomadPart.bind(this);
    this.setData = this.setData.bind(this);
    this.moveNomad = this.moveNomad.bind(this);
    this.decreasePiglets = this.decreasePiglets.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }
  
  componentDidMount() {
    this.props.getNomadPiglets({by_workshop_number: 3})
  }

  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })

    this.props.getLocations({by_section: sectionId})
  }

  clickLocation (location) {
    let { activeLocationsIds, activeLocations } = this.state
    // here I can check is cell need to add to activeCells

    activeLocationsIds = toggleArray(activeLocationsIds, location.id)
    activeLocations = toggleArrayLocations(activeLocations, location)
    this.setState({
      ...this.state,
      activeLocationsIds: activeLocationsIds,
      activeLocations: activeLocations
    })
  }

  createNomadPart () {
    const locations  = this.state.activeLocations
    let newBornGroupsIds = []
    locations.map(location => {
      if (location.newbornpigletsgroup_set.length > 0)
      newBornGroupsIds = toggleArray(newBornGroupsIds, location.newbornpigletsgroup_set[0].id)
    })
    this.props.mergeNewbornPiglets({piglets_groups: newBornGroupsIds,
       part_number: this.state.partNumber})
    this.setState({
      ...this.state, partNumber: 0,
      activeLocationsIds: [],
      activeLocations: [],
      activeNomadId: null,
      activeNomad: null,
      needToRefresh: true
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

  decreasePiglets (location) {
    // find location in activeLocations
    // decrease activeLocations.location.newbornpiglets.quantity
    // let { activeLocations } = this.state
    // activeLocations.writable = true
    console.log(location)
    // console.log(activeLocations)
    // console.log(activeLocations.find(element => element.id === location.id))
    // let loc2 = activeLocations.find(element => element.id === location.id)
    // loc2.newbornpigletsgroup_set[0].quantity = 1000
    // console.log(loc2)
    // console.log(loc2.newbornpigletsgroup_set[0])
    // location.writable = true
    // location.newbornpigletsgroup_set[0].quantity = 1000
    // console.log(location)

    this.setState(prevState => ({
      ...prevState,
      activeLocations: prevState.activeLocations.map((loc) =>{
        if (loc.id !== location.id){
          return loc
        }
        return {
          ...loc,
          newbornpigletsgroup_set: [
              {
                ...loc.newbornpigletsgroup_set[0],
                quantity: loc.newbornpigletsgroup_set[0].quantity - 1
              }
            ]
        }
      })
    }))
    console.log(this.state)
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
    const { sections, locations, nomadPiglets } = this.props
    
    return (
        <div className='row workshop-content'>
          <button onClick={() => console.log(this.state)}>This state</button>
          <button onClick={() => this.props.getLocations({by_section: this.state.activeSectionId})}>
              get locations</button>
          <div className='col-8'>
          <Sections 
              sections={sections}
              activeSectionId={this.state.activeSectionId}
              clickSection={this.clickSection}
              error={this.props.sectionsListError}
            />
            <PigletsCells
              isSection={this.state.activeSectionId}
              locations={locations}
              activeCellIds={this.state.activeLocationsIds}
              activeCellId={null}
              clickLocation={this.clickLocation}
              error={this.props.locationsListError}
            />
          </div>
          <div className='col-4'>
            <div className='newborns-to-merge'>
                <NewBornGroupWeaningList 
                  locations={this.state.activeLocations}
                  createNomadPart={this.createNomadPart}
                  decreasePiglets={this.decreasePiglets}
                   />
                {locations.length > 0 && 
                  <div className="input-group-append">
                    <input type='number' value={this.state.partNumber}
                        onChange={this.setData} 
                        name='partNumber' className="form-control search-input"
                        placeholder="Номер партии" />
                    <button className='btn btn-outline-secondary' type='button'
                      onClick={this.createNomadPart}>
                        Создать партию
                    </button>
                  </div>}
            </div>
            <hr/>
            <div className='created-nomads'>
              {!this.props.nomadListError ? 
                nomadPiglets.length > 0 &&
                <table className='table table-sm created-nomads-table'>
                  <thead>
                    <th>№ Партии</th>
                    <th>Количество поросят</th>
                    <th>Номера клеток</th>
                  </thead>
                  <tbody>
                    {nomadPiglets.map(nomadGroup => 
                      <tr className={ this.state.activeNomadId == nomadGroup.id ? 
                          'created-nomad created-nomad-active': 'created-nomad'}
                        onClick={() => this.setState({
                          ...this.state, activeNomadId: nomadGroup.id,
                          activeNomad: nomadGroup
                      })}>
                        <td>
                          {nomadGroup.merger_part_number}
                        </td>
                        <td>
                          {nomadGroup.quantity}
                        </td>
                        <td>
                          {nomadGroup.cells_numbers_from_merger.map(cell => cell + ' ' )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                :
                <p className='error-message'>{this.props.nomadListError}</p>
              }
              {this.state.activeNomadId && 
                <div>
                  <button className='btn btn-outline-secondary' type='button'
                    onClick={this.moveNomad}>
                      Отправить партию
                  </button>
                </div>}
            </div>
          </div>
        </div>
    )
  }
}

export default WS3PigletsWeaningTab