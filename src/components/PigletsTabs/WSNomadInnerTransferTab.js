import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../Locations'
import { PigletsGroup } from '../PigletsRepresentations'


class WSNomadInnerTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,
      activeFromSectionId: null,
      activeCellFromLocationId: null,
      activeToSectionId: null,
      activeCellToLocationId: null,
      needToRefresh: false
    }
    this.clickFromSection = this.clickFromSection.bind(this);
    this.clickToSection = this.clickToSection.bind(this);
    this.clickCellToLocation = this.clickCellToLocation.bind(this);
    this.clickCellFromLocation = this.clickCellFromLocation.bind(this);
    this.clickTransfer = this.clickTransfer.bind(this);
  }
  
  componentDidMount() {
    this.props.getSections({workshop: this.props.workshopNumber})
  }

  clickFromSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeFromSectionId: sectionId
    })

    this.props.getLocations1({by_section: sectionId})
  }

  clickToSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeToSectionId: sectionId
    })
    this.props.getLocations2({by_section: sectionId})
  }

  clickCellFromLocation (location) {
    this.setState({
      ...this.state,
      activeCellFromLocationId: location.id,
      activePiglets: location.nomadpigletsgroup_set.length > 0 ?
       location.nomadpigletsgroup_set[0] : null
    })
  }

  clickCellToLocation (location) {
    this.setState({
      ...this.state,
      activeCellToLocationId: location.id
    })
  }

  clickTransfer () {
    let data = {
      id: this.state.activePiglets.id,
      quantity: this.state.activePiglets.quantity,
      gilt_quantity: 0,
      to_location: this.state.activeCellToLocationId
    }
    this.props.movePiglets(data)
    this.setState({
      ...this.state,
      activePiglets: null,
      quantity: null,
      needToRefresh: true, 
      activeCellFromLocationId: null,
      activeCellToLocationId: null,
    })
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations1({by_section: this.state.activeFromSectionId})
        this.props.getLocations2({by_section: this.state.activeToSectionId})
      }, 500)
    }
  }

  render() {
    const { sections, locations1, locations2 } = this.props
    this.refreshSowsList()
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
            <Sections 
              sections={sections}
              activeSectionId={this.state.activeFromSectionId}
              clickSection={this.clickFromSection}
            />
            <PigletsCells
              locations={locations1}
              activeCellIds={[this.state.activeCellFromLocationId]}
              clickLocation={this.clickCellFromLocation}
            />
          </div>
          <div className='col-6'>
            <Sections 
              sections={sections}
              activeSectionId={this.state.activeToSectionId}
              clickSection={this.clickToSection}
            />
            <PigletsCells
              locations={locations2}
              activeCellIds={[this.state.activeCellToLocationId]}
              clickLocation={this.clickCellToLocation}
            />
          </div>
        <div>
          <div>
            {this.state.activePiglets && 
              <div>
                <PigletsGroup piglets={this.state.activePiglets}/>
                <button 
                  className='btn btn-outline-secondary' type='button'
                  onClick={this.clickTransfer}>
                  Переместить
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default WSNomadInnerTransferTab