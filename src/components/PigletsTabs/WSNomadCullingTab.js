import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../Locations'
import { PigletsGroup } from '../PigletsRepresentations'
import { CullingTypeInput, CullingReasonInput } from '../FiltersAndInputs'
import { Message } from '../CommonComponents'


class WSNomadCullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,
      activeSectionId: null,
      activeCellId: null,

      cullingType: null,
      cullingReason: null,
      needToRefresh: false,
      is_it_gilt: false,
    }
    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.setData = this.setData.bind(this);
    this.setIsGilt = this.setIsGilt.bind(this);
    this.cullingPiglets = this.cullingPiglets.bind(this);
  }
  
  clickSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })
    this.props.getLocations({by_section: sectionId, cells: true})
  }

  clickLocation (location) {
    this.setState({
      ...this.state,
      activeCellId: location.id,
      activePiglets: location.piglets.length > 0 ?
        location.piglets[0] : null
    })
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  setIsGilt () {
    this.setState({
      ...this.state,
      is_it_gilt: !this.state.is_it_gilt
    })
  }

  cullingPiglets () {
    const { culling_type, culling_reason, activePiglets, is_it_gilt } = this.state
    this.props.cullingPiglets({
      id: activePiglets.id,
      culling_type: culling_type,
      reason: culling_reason,
      is_it_gilt: is_it_gilt
    })
    this.setState({
      ...this.state,
      culling_reason: null,
      culling_type: null,
      needToRefresh: true, 
      activeLocation: null,
      activePiglets: null,
      is_it_gilt: false,
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
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
              isSection={this.state.activeSectionId}
              fetching={this.props.locationsFetching}
              locations={locations}
              activeCellIds={[this.state.activeCellId]}
              clickLocation={this.clickLocation}
            />
          </div>
          <div className='col-6'>
            {this.state.activePiglets ?
              <div>
                <PigletsGroup piglets={this.state.activePiglets}/>
                {this.state.activePiglets.gilts_quantity > 0 && 
                  <div>
                    <label>Ремонтная свинка?</label>
                    <input type='checkbox' onChange={this.setIsGilt} value={this.state.is_it_gilt} />
                  </div>
                }
                <div className="input-group-append">
                  <CullingTypeInput setData={this.setData}/>
                  <CullingReasonInput setData={this.setData} 
                    culling_reason={this.state.culling_reason}/>
                  <button className='btn btn-outline-secondary' type='button'
                    onClick={this.cullingPiglets}
                    >
                      Выбраковка
                  </button>
                </div>
              </div>
              :
              this.props.message ? <Message message={this.props.message} /> :
                <Message message={'Выберите клетку'} />
            }
        </div>
      </div>
    )
  }
}

export default WSNomadCullingTab