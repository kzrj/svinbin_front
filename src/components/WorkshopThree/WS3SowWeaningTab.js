import React, { Component } from 'react';
import { toggleArray, addItemToArray, removeItemFromArray,
  uniq} from '../utils';


class WS3SowWeaningTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSows: [],
      activeSectionId: null,
      activeLocationsIds: [],
    }
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
    console.log('ClickLoc')
    console.log(location.id)
    let { activeLocationsIds } = this.state
    // toggleArray(activeLocationsIds, location.id)

    if (activeLocationsIds.includes(location.id)){
      removeItemFromArray(activeLocationsIds, location.id)}
    else {
      addItemToArray(activeLocationsIds, location.id)}

    this.setState({
      ...this.state,
      activeLocationsIds: activeLocationsIds
    })
    console.log(location.id)
    console.log(activeLocationsIds)
    console.log(this.state.activeLocationsIds)
  }

  render() {
    const { sections, locations } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
            <div className='row'>
                {sections.map((section, key) => 
                    <div className={ this.state.activeSectionId == section.id ? 
                      'col-sm section-button section-active': 'col-sm section-button '
                      } onClick={this.clickSection}
                      data-section-id={section.id}
                      key={key}>
                      ID{section.id} {section.name}
                    </div>
                )}
            </div>
            <div className='row'>
              {locations.map(location =>
                  <div className={this.state.activeLocationsIds.includes(location.id) ? 
                    'col-md-5 cell cell-active' : 'col-md-5 cell'}
                    onClick={() => this.clickLocation(location)}
                    key={location.id}>
                    ID{location.id} 
                    {location.is_empty && 'Пустая'}
                  </div>
              )}
              {locations.length < 1 && 'Выберите секцию'}
            </div>
          </div>
          <div className='col-6'>
              Матки
          </div>
      </div>
    )
  }
}

export default WS3SowWeaningTab