import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../Locations'
import { PigletsGroup } from '../PigletsRepresentations'
import { Message, FetchingErrorComponentMessage } from '../CommonComponents'


class WS3CreateGiltTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,
      activeSectionId: null,
      activeCellId: null,

      mother_sow_farm_id: 0,
      birth_id: '',

      needToRefresh: false,
    }
    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.setData = this.setData.bind(this);
    this.setIsGilt = this.setIsGilt.bind(this);
    this.createGilt = this.createGilt.bind(this);
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
    this.props.getLocations({by_section: sectionId, cells: true})
  }

  clickLocation (location) {
    this.setState({
      ...this.state,
      activeCellId: location.id,
      activePiglets: location.piglets.length > 0 ?
        location.piglets[0] : null,
      mother_sow_farm_id: location.sow_set.length > 0 ? 
      location.sow_set[0].farm_id : 0,
    })
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

  createGilt () {
    const { activePiglets, mother_sow_farm_id, birth_id } = this.state
    this.props.createGilt({
      id: activePiglets.id,
      mother_sow_farm_id: mother_sow_farm_id,
      birth_id: birth_id,
    })
    this.setState({
      ...this.state,
      
      birth_id: '',

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
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { sections, locations } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
            <FetchingErrorComponentMessage 
                fetching={this.props.sectionsFetching}
                error={this.props.sectionsListError}
                message={null}
                component={
                  <Sections 
                    sections={sections}
                    activeSectionId={this.state.activeSectionId}
                    fetching={this.props.sectionsFetching}
                    error={this.props.sectionsListError}
                    clickSection={this.clickSection}
                  />}
            />
            <FetchingErrorComponentMessage 
              fetching={this.props.locationsFetching}
              error={this.props.locationsListError}
              message={null}
              component={
                <PigletsCells
                  isSection={this.state.activeSectionId}
                  fetching={this.props.locationsFetching}
                  locations={locations}
                  activeCellIds={[this.state.activeCellId]}
                  clickLocation={this.clickLocation}
                />}
            />
          </div>
          <div className='col-6'>
            <FetchingErrorComponentMessage
              fetching={this.props.eventFetching} 
              error={this.props.eventError}
              message={this.props.message}
              component={
                <div>
                  {this.state.activePiglets && 
                    <div>
                    <PigletsGroup piglets={this.state.activePiglets}/>
                    <div className="input-group">
                      <label>Укажите ID свиноматки - родителя </label>
                      <input type='number' value={this.state.mother_sow_farm_id} 
                        onChange={this.setData} 
                        name='mother_sow_farm_id' className="form-control search-input"
                        placeholder="Укажите ID свиноматки  " />
                    </div>
                    <div className="input-group">
                      <label>Укажите номер бирки </label>
                      <input type='text' value={this.state.birth_id} 
                        onChange={this.setData} 
                        name='birth_id' className="form-control search-input"
                        placeholder="Укажите номер бирки  " />
                    </div>
                    <button className='btn btn-outline-secondary' type='button'
                      onClick={this.createGilt}
                      >
                        Создать ремонтную свинку.
                    </button>
                  </div>}
                </div>
              }
            />
            {!this.state.activePiglets && !this.props.message && <Message message={'Выберите клетку'} />}
        </div>
      </div>
    )
  }
}

export default WS3CreateGiltTab