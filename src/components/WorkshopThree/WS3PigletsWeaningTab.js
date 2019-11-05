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
      partNumber: 0,
      needToRefresh: false
    };
    this.clickLocation = this.clickLocation.bind(this);
    this.clickSection = this.clickSection.bind(this);
    this.createNomadPart = this.createNomadPart.bind(this);
    this.setData = this.setData.bind(this);
    this.moveNomad = this.moveNomad.bind(this);
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

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId})
        this.props.getNomadPiglets({by_workshop_number: 3})
      }, 100)
    }
  }

  render() {
    this.refreshSowsList()
    const { sections, locations, nomadPiglets } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
          <Sections 
              sections={sections}
              activeSectionId={this.state.activeSectionId}
              clickSection={this.clickSection}
            />
            <PigletsCells
              locations={locations}
              activeCellIds={this.state.activeLocationsIds}
              activeCellId={null}
              clickLocation={this.clickLocation}
            />
          </div>
          <div className='col-6'>
            <div className='newborns-to-merge'>
                <NewBornGroupWeaningList 
                  locations={this.state.activeLocations}
                  createNomadPart={this.createNomadPart}
                   />
                {locations.length > 0 && 
                  <div className="input-group-append">
                    <input type='text' value={this.state.partNumber} 
                        onChange={this.setData} 
                        name='partNumber' className="form-control search-input"
                        placeholder="Номер партии" />
                    <button className='btn btn-outline-secondary' type='button'
                      onClick={this.createNomadPart}>
                        Создать партию
                    </button>
                  </div>}
            </div>
            <div className='created-nomads'>
              <p>Партии</p>
              <div className='row'>
                <div className='col-4'>
                  № Партии
                </div>
                <div className='col-4'>
                  Количество поросят
                </div>
                <div className='col-4'>
                  Номера клеток
                </div>
              </div>
              {nomadPiglets.map(nomadGroup => 
                <div className={ this.state.activeNomadId == nomadGroup.id ? 
                    'created-nomad created-nomad-active row': 'created-nomad row'}
                  onClick={() => this.setState({
                    ...this.state, activeNomadId: nomadGroup.id,
                    activeNomad: nomadGroup
                  })}
                >
                  <div className='col-4'>
                    {nomadGroup.merger_part_number}
                  </div>
                  <div className='col-4'>
                    {nomadGroup.quantity}
                  </div>
                  <div className='col-4'>
                    {nomadGroup.cells_numbers_from_merger.map(cell => cell + ' ' )}
                  </div>
                </div>)}
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