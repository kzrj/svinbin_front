import React, { Component } from 'react';

//components
import { CullingPigletsForm } from '../PigletsTabs/PigletsForms';
import { PigletsCells, Sections } from '../Locations';
import {  PigletsGroupInline } from '../PigletsRepresentations';
import { FetchingErrorComponentMessage, ErrorOrMessage } from '../CommonComponents';
import { getToday } from '../utils';


class WSNomadCullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,
      activeSectionId: null,
      activeCellId: null,
      activeLocation: null,

      culling_type: null,
      culling_reason: 'без причины',
      is_it_gilt: false,
      date: null,
      quantity: 1,
      total_weight: 0,

      expand: false,

      needToRefresh: false,
    }
    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.setData = this.setData.bind(this);
    this.setIsGilt = this.setIsGilt.bind(this);
    this.cullingPiglets = this.cullingPiglets.bind(this);
  }

  componentDidMount() {
    this.props.pigletsResetErrorsAndMessages()
  }
  
  clickSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })
    this.props.getLocations({by_section: sectionId, cells_piglets: true})
  }

  clickLocation (location) {
    let { expand } = this.state
    if (location.is_piglets_empty) expand = false
    else expand = true

    this.setState({
      ...this.state,
      expand: expand,
      activeCellId: location.id,
      activeLocation: location,
      activePiglets: location.piglets.length > 0 ?
        location.piglets[0] : null
    })
    if (location.piglets.length > 0) this.props.cullingFormSetID(location.piglets[0].id)
    
    this.props.pigletsResetErrorsAndMessages()
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
    this.props.cullingPiglets(this.props.form.values)
    this.setState({
      ...this.state,

      expand: false,
      needToRefresh: true, 
      activeLocation: null,
      activePiglets: null,
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
      }, 300)
    }
  }

  render() {
    this.refreshSowsList()
    const { sections, locations, eventFetching, eventError, message, grid } = this.props
    const { activePiglets, expand, activeLocation } = this.state

    let today = getToday()

    return (
        <div className='pb-5 mb-5'>
          <FetchingErrorComponentMessage 
            fetching={this.props.sectionsFetching}
            error={this.props.sectionsListError}
            message={null}
            component={
              <Sections 
                sections={sections}
                activeSectionId={this.state.activeSectionId}
                clickSection={this.clickSection}
              />}
            />
          <FetchingErrorComponentMessage 
            fetching={this.props.locationsFetching}
            error={this.props.locationsErrorList}
            message={null}
            component={
              <PigletsCells
                isSection={this.state.activeSectionId}
                fetching={this.props.locationsFetching}
                locations={locations}
                activeCellIds={[this.state.activeCellId]}
                clickLocation={this.clickLocation}
                user={this.props.user}
                grid={grid}
                className='mb-5 pb-5'
              />}
          />
          <div className='card card-style fixed-bottom mx-1 my-1'>
            <div className='content'>
              <div className='' 
                onClick={() => this.setState({...this.state, expand: !this.state.expand})}>
                {expand 
                  ? <p className='my-0 text-center'>
                      <i className="fas fa-chevron-down "><span className='ml-1'>Скрыть</span></i> 
                    </p>
                  : [<p className='my-0 text-center'>
                      <i className="fas fa-chevron-up ">
                        <span className='ml-1'>Выберите клетку с поросятами</span>
                      </i>
                    </p>,
                    <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
                    className='mt-2 mb-0 mx-1 font-15 text-center' />]
                  }
              </div>
              {(activePiglets && expand) &&
                <div>
                  <p className='my-0 font-700 '>Клетка {activeLocation.cell}</p>
                  <PigletsGroupInline piglets={activePiglets} className='my-0 font-700'/>
                  <CullingPigletsForm 
                    initialValues={{
                      id: activePiglets.id,
                      // culling_type: 'padej',
                      quantity: 1,
                      total_weight: 0,
                      reason: 'без причины',
                      date: today,
                      is_it_gilt: false,
                    }}
                    eventFetching={eventFetching}
                    eventError={eventError}
                    message={message}
                    cullingTypes={this.props.cullingTypes}
                    parentSubmit={this.cullingPiglets}
                  />
                </div>
              }
        </div>
      </div>
    </div>
    )
  }
}

export default WSNomadCullingTab