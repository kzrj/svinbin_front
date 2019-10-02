import React, { Component } from 'react';
import { toggleArray, toggleArrayLocations, lodashToggle } from '../utils';

//components
import { PigletsCells, Sections } from '../WorkshopThree/Components'


class WS3PigletsWeaningTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: 6,
      activeLocationsId: null, // cell multiple selection
      activeLocation: null, // for newborn list
      
      birth_id: 0,
      needToRefresh: false
    };
    this.clickLocation = this.clickLocation.bind(this);
    this.clickSection = this.clickSection.bind(this);
    this.setData = this.setData.bind(this);
    this.createGilt = this.createGilt.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }
  
  componentDidMount() {
    this.props.getSections({workshop: 3})
  }

  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })

    this.props.getLocations({by_section: sectionId})
  }

  // clickLocation (location) {
  //   let { activeLocationsIds, activeLocations } = this.state
  //   // here I can check is cell need to add to activeCells

  //   activeLocationsIds = toggleArray(activeLocationsIds, location.id)
  //   activeLocations = toggleArrayLocations(activeLocations, location)
  //   this.setState({
  //     ...this.state,
  //     activeLocationsIds: activeLocationsIds,
  //     activeLocations: activeLocations
  //   })
  // }

  clickLocation (location) {    
    this.setState({
      ...this.state,
      activeLocationsId: location.id,
      activeLocation: location
    })
  }
  
  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  createGilt () {
    console.log('create gilt')
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId})
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { sections, locations } = this.props
    
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
              activeCellIds={[this.state.activeLocationsId]}
              clickLocation={this.clickLocation}
            />
          </div>
          <div className='col-6'>
            <div className="input-group-append">
              <input type='text' value={this.state.partNumber} 
                  onChange={this.setData} 
                  name='partNumber' className="form-control search-input"
                  placeholder="Номер партии" />
              <button className='btn btn-outline-secondary' type='button'
                onClick={this.createNomadPart}>
                  Создать партию
              </button>
            </div>
            
          </div>
        </div>
    )
  }
}

export default WS3PigletsWeaningTab