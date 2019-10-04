import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../WorkshopThree/Components'
import { PigletsGroup } from '../WorkshopThree/PigletsComponents'


class WS3PigletsRecountTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: 6,
      activeLocationsId: null,
      activeLocation: null,
      activeNewbornGroup: null,
      
      quantity: null,
      needToRefresh: false
    };
    this.clickLocation = this.clickLocation.bind(this);
    this.clickSection = this.clickSection.bind(this);
    this.setData = this.setData.bind(this);
    this.recountPiglets = this.recountPiglets.bind(this);
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

  recountPiglets () {
    const { quantity, activeNewbornGroup } = this.state
    this.props.recountPiglets({
      id: activeNewbornGroup.id,
      quantity: quantity
    })
    this.setState({
      ...this.state,
      quantity: null,
      needToRefresh: true, 
      activeLocation: null,
      activeNewbornGroup: null,
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
              <div>
                <PigletsGroup piglets={this.state.activeNewbornGroup}/>
                <div className="input-group-append">
                  <label>Новое количество</label>
                  <input type='text' 
                      onChange={this.setData} 
                      name='quantity' value={this.state.quantity}/>
                  <button className='btn btn-outline-secondary' type='button'
                    onClick={this.recountPiglets}
                    >
                      Изменить количество
                  </button>
                </div>
              </div>
              :
              this.props.message ? <p>{this.props.message}</p> : <p>Выберите клетку</p>
            }
          </div>
        </div>
    )
  }
}

export default WS3PigletsRecountTab