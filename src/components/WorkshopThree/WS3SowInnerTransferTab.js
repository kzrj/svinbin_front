import React, { Component } from 'react';

//components
import { Cells, Sections } from '../WorkshopThree/Components'

class WS3SowInnerTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSow: null,
      activeFromSectionId: null,
      activeCellFromLocationId: null,
      activeToSectionId: null,
      activeCellToLocationId: null,
    }
  }
  
  componentDidMount() {
    this.props.getSections({workshop: 3})    
  }

  clickFromSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeFromSectionId: sectionId
    })

    this.props.getLocations1({by_section: sectionId})
  }

  clickToSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeToSectionId: sectionId
    })
    this.props.getLocations2({by_section: sectionId})
  }

  clickCellFromLocation = (location) => {
    this.setState({
      ...this.state,
      activeCellFromLocationId: location.id,
      activeSow: location.sow_set.length > 0 ?
       location.sow_set[0] : null
    })
  }

  clickCellToLocation = (location) => {
    this.setState({
      ...this.state,
      activeCellToLocationId: location.id,
    })
  }

  clickTransfer = () => {
    this.props.sowMoveTo({
      id: this.state.activeSow.id,
      location: this.state.activeCellToLocationId
    })
    this.props.getLocations1({by_section: this.state.activeFromSectionId})
    this.props.getLocations2({by_section: this.state.activeToSectionId})
    this.setState({
      ...this.state,
      activeSow: null,
      activeFromSectionId: null,
      activeCellFromLocationId: null,
      activeToSectionId: null,
      activeCellToLocationId: null,
    })
  }

  render() {
    const { sections, locations1, locations2 } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
            <Sections 
              sections={sections}
              activeSectionId={this.state.activeFromSectionId}
              clickSection={this.clickFromSection}
            />
            <Cells 
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
              <Cells
                locations={locations2}
                activeCellIds={[this.state.activeCellToLocationId]}
                clickLocation={this.clickCellToLocation}
              />
          </div>
        <div>
          <div>
            {this.state.activeSow && 
              <ul>
                <li>{this.state.activeSow.id}</li>
                <li>{this.state.activeSow.farm_id}</li>
                <li>{this.state.activeSow.status}</li>
              </ul>  
            }
          </div>
          {this.state.activeSow && 
            <button onClick={this.clickTransfer}>
              Отправить в Цех8
            </button>
          }
        </div>
      </div>
    )
  }
}

export default WS3SowInnerTransferTab