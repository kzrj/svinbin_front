import React, { Component } from 'react';

//components
import { PigletsWeaningSectionsTable } from '../PigletsRepresentations'
import { CullingTypeInput, CullingReasonInput } from '../FiltersAndInputs'


class WS3PigletsCullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: 6,
      activePigletsIds: [],
      activePigletsId: null,
      
      culling_type: null,
      culling_reason: '',

      needToRefresh: false
    };

    this.clickPiglets = this.clickPiglets.bind(this);
    this.setData = this.setData.bind(this);
    this.cullingPiglets = this.cullingPiglets.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }

  componentDidMount() {
    this.props.getLocations({sections_by_workshop_number: 3})
  }

  setData (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  clickPiglets (piglets, location) {
    this.setState({
      ...this.state,
      activePigletsIds: [piglets.id],
      activePigletsId: piglets.id,
    })
  }

  cullingPiglets () {
    const { culling_type, culling_reason, activePigletsId } = this.state
    this.props.cullingPiglets({
      id: activePigletsId,
      culling_type: culling_type,
      reason: culling_reason
    })
    this.setState({
      ...this.state,
      culling_reason: '',
      culling_type: '',
      needToRefresh: true, 
      activePigletsId: null,
      activePigletsIds: [],
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({sections_by_workshop_number: 3})
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { locations, eventError, eventMessage } = this.props
    
    return (
        <div className='row workshop-content'>
          <PigletsWeaningSectionsTable 
            locations={locations}
            activePigletsIds={this.state.activePigletsIds}
            clickPiglets={this.clickPiglets}/>
          <div className='input-group'>
            <CullingTypeInput setData={this.setData} culling_type={this.state.culling_type}/>
            <CullingReasonInput setData={this.setData} culling_reason={this.state.culling_reason}/>
            <button className='btn btn-outline-dark' 
              onClick={this.cullingPiglets}>
              Выбраковка
            </button>
          </div>
          <div>
            {eventError && <p className='error-message'>{eventError.data.message}</p>}
            {eventMessage}
          </div>
        </div>
    )
  }
}

export default WS3PigletsCullingTab