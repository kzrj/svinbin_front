import React, { Component } from 'react';
import { toggleArray, toggleArrayLocations, lodashToggle } from '../utils';

//components
import { Cells, Sections } from '../WorkshopThree/Components'
import { NewBornGroupWeaningList } from '../WorkshopThree/PigletsComponents'


class WS3PigletsWeaningTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: null,
      activeLocationsIds: [], // cell multiple selection

      activeLocations: [], // for newborn list
    };

  }
  
  componentDidMount() {
    this.props.getSections({workshop: 3})
  }

  clickSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })

    this.props.getLocations({by_section: sectionId})
  }

  clickLocation = (location) => {
    let { activeLocationsIds, activeLocations } = this.state
    activeLocationsIds = toggleArray(activeLocationsIds, location.id)
    activeLocations = toggleArrayLocations(activeLocations, location)
    this.setState({
      ...this.state,
      activeLocationsIds: activeLocationsIds,
      activeLocations: activeLocations
    })
  }

  render() {
    const { sections, locations } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
          <Sections 
              sections={sections}
              activeSectionId={this.state.activeSectionId}
              clickSection={this.clickSection}
            />
            <Cells
              locations={locations}
              activeCellIds={this.state.activeLocationsIds}
              activeCellId={null}
              clickLocation={this.clickLocation}
            />
          </div>
          <div className='col-6'>
            <div className='newborns-to-merge'>
                <NewBornGroupWeaningList locations={this.state.activeLocations}/>
            </div>
          </div>
        </div>
    )
  }
}

export default WS3PigletsWeaningTab