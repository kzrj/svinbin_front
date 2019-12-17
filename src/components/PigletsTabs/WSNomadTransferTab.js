import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../Locations'
import { PigletsGroup } from '../PigletsRepresentations'


class WSNomadTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      piglets: props.piglets,
      activePiglets: null,
      activeSectionId: null,
      activeCellId: null,
      needToRefresh: false
    }
    this.clickSection = this.clickSection.bind(this);
    this.clickCell = this.clickCell.bind(this);
    this.clickTransfer = this.clickTransfer.bind(this);
  }
  
  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })
    this.props.getLocations({by_section: sectionId})
  }

  clickCell (location) {
    this.setState({
      ...this.state,
      activeCellId: location.id,
      activePiglets: location.piglets.length > 0 ?
       location.piglets[0] : null
    })
  }

  clickTransfer () {
    const { activePiglets, quantity } = this.state
    let data = {
      id: activePiglets.id,
      to_location: this.props.toLocation,
      merge: false
    }

    if (quantity > 0)
      data['new_amount'] = quantity

    this.props.movePiglets(data)
    this.setState({
      ...this.state,
      activePiglets: null,
      needToRefresh: true, 
    })
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
    this.refreshSowsList ()
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
              isSection={this.state.activeSectionId}
              fetching={this.props.locationsFetching}
              locations={locations}
              activeCellIds={[this.state.activeCellId]}
              clickLocation={this.clickCell}
            />
          </div>
          <div className='col-6'>
            {this.state.activePiglets && 
              <div>
                <PigletsGroup piglets={this.state.activePiglets}/>
                <button 
                  className='btn btn-outline-secondary' type='button'
                  onClick={this.clickTransfer}>
                    {this.props.buttonName}
                </button>
              </div>
            }
        </div>
      </div>
    )
  }
}

export default WSNomadTransferTab