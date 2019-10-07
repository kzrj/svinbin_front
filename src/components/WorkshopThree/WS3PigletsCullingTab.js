import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../WorkshopThree/Components'
import { PigletsGroup } from '../WorkshopThree/PigletsComponents'
import { CullingTypeInput, CullingReasonInput } from '../WSComponents'


class WS3PigletsWeaningTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: 6,
      activeLocationsId: null,
      activeLocation: null,
      activeNewbornGroup: null,
      
      culling_type: null,
      culling_reason: '',
      is_it_gilt: false,
      needToRefresh: false
    };
    this.clickLocation = this.clickLocation.bind(this);
    this.clickSection = this.clickSection.bind(this);
    this.setData = this.setData.bind(this);
    this.cullingPiglets = this.cullingPiglets.bind(this);
    this.cullingGilt = this.cullingGilt.bind(this);
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

  cullingPiglets () {
    const { culling_type, culling_reason, activeNewbornGroup } = this.state
    this.props.cullingPiglets({
      id: activeNewbornGroup.id,
      culling_type: culling_type,
      culling_reason: culling_reason
    })
    this.setState({
      ...this.state,
      culling_reason: null,
      culling_type: null,
      needToRefresh: true, 
      activeLocation: null,
      activeNewbornGroup: null,
    })
  }

  cullingGilt () {
    const { culling_type, culling_reason, activeNewbornGroup } = this.state    
    this.props.cullingGilt({
      id: activeNewbornGroup.id,
      culling_type: culling_type,
      culling_reason: culling_reason
    })
    this.setState({
      ...this.state,
      culling_reason: null,
      culling_type: null,
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
                {this.state.activeNewbornGroup.gilts_quantity > 0 &&
                  <div className="input-group-append">
                    <label>ремонтная свинка</label>
                    <input type='checkbox' 
                        onChange={this.setData} 
                        name='is_it_gilt' value={!this.state.is_it_gilt}/>
                  </div>}
                <div className="input-group-append">
                  <CullingTypeInput setData={this.setData}/>
                  <CullingReasonInput setData={this.setData} 
                    culling_reason={this.state.culling_reason}/>
                  <button className='btn btn-outline-secondary' type='button'
                    onClick={this.state.is_it_gilt ? this.cullingGilt : this.cullingPiglets}
                    >
                      Выбраковка
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

export default WS3PigletsWeaningTab