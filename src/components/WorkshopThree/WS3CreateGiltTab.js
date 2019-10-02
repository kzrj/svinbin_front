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
      activeNewbornGroup: null,
      
      birth_id: null,
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

  clickLocation (location) {
    let activeNewbornGroup = null
    if (location.newbornpigletsgroup_set.length > 0){
      activeNewbornGroup = location.newbornpigletsgroup_set[0]
    }
    this.setState({
      ...this.state,
      activeLocationsId: location.id,
      activeLocation: location,
      activeNewbornGroup: activeNewbornGroup
    })
  }
  
  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  createGilt () {
    const { birth_id, activeNewbornGroup } = this.state
    this.props.createGilt({id: activeNewbornGroup.id, birth_id: birth_id})
    this.setState({...this.state, needToRefresh: true, 
      activeLocation: null, activeNewbornGroup: null})
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
            {this.state.activeNewbornGroup ?
            <div className="input-group-append">
              <input type='text' value={this.state.birth_id} 
                  onChange={this.setData} 
                  name='birth_id' className="form-control search-input"
                  placeholder="Уникальный номер" />
              <button className='btn btn-outline-secondary' type='button'
                onClick={this.createGilt}>
                  Создать ремонтную свинку
              </button>
            </div>
            :
            this.props.message ? <p>{this.props.message}</p> : <p>Выберите клетку</p>
            }
          </div>
        </div>
    )
  }
}

export default WS3PigletsWeaningTab