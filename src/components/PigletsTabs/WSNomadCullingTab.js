import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../Locations'
import { PigletsGroup } from '../PigletsRepresentations'
import { CullingTypeInput, CullingReasonInput } from '../FiltersAndInputs'
import { Message, FetchingErrorComponentMessage } from '../CommonComponents'


class WSNomadCullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,
      activeSectionId: null,
      activeCellId: null,

      culling_type: null,
      culling_reason: null,
      is_it_gilt: false,
      date: null,
      quantity: null,
      total_weight: 0,

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
    this.props.getLocations({by_section: sectionId, cells: true})
  }

  clickLocation (location) {
    this.setState({
      ...this.state,
      activeCellId: location.id,
      activePiglets: location.piglets.length > 0 ?
        location.piglets[0] : null
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

  cullingPiglets () {
    const { culling_type, culling_reason, activePiglets, is_it_gilt, date, quantity, total_weight } = this.state
    this.props.cullingPiglets({
      id: activePiglets.id,
      culling_type: culling_type,
      reason: culling_reason,
      is_it_gilt: is_it_gilt,
      date: date,
      quantity: quantity,
      total_weight: total_weight,
    })
    this.setState({
      ...this.state,
      cullingType: null,
      cullingReason: null,
      is_it_gilt: false,
      date: null,
      quantity: null,
      total_weight: 0,

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
    const uboi = this.state.culling_type === 'spec' || this.state.culling_type === 'vinuzhd'
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
                  />}
            />
          </div>
          <div className='col-6'>
            <div>
              <FetchingErrorComponentMessage
                fetching={this.props.eventFetching}
                error={this.props.eventError}
                message={this.props.message}
                component={
                  this.state.activePiglets &&
                  <div>
                    <PigletsGroup piglets={this.state.activePiglets}/>
                    {this.state.activePiglets.gilts_quantity > 0 && 
                      <div>
                        <label>Ремонтная свинка?</label>
                        <input type='checkbox' onChange={this.setIsGilt} value={this.state.is_it_gilt} />
                      </div>
                    }
                    
                    <div className="input-group">
                      <CullingTypeInput setData={this.setData} cullingTypes={this.props.cullingTypes}/>
                      {this.state.culling_type !== 'spec' &&
                        <div className="input-group">
                          <CullingReasonInput 
                            setData={this.setData} 
                            culling_reason={this.state.culling_reason}
                          />
                        </div>
                      }
                      <div className="input-group">
                        <input type='number' value={this.state.quantity} 
                          onChange={this.setData} 
                          name='quantity' className="form-control search-input"
                          placeholder="Количество" />
                      </div>
                      <div className="input-group">
                        <input type='date' value={this.state.date} 
                          onChange={this.setData} 
                          name='date' className="form-control search-input"
                          placeholder="Дата, формат 02-02-2020" />
                      </div>
                        <div className="input-group">
                          <label>Укажите вес</label>
                          <input type='number' value={this.state.total_weight} 
                            onChange={this.setData} 
                            name='total_weight' className="form-control search-input"
                            placeholder="Укажите вес" />
                        </div>
                      <br />
                      <br />
                      <button className='btn btn-outline-secondary' type='button'
                        onClick={this.cullingPiglets}
                        >
                          Выбраковка/Убой
                      </button>
                    </div>
                  </div>
                }
                />
            {!this.props.message &&
              <Message message={'Выберите клетку'} />}
        </div>
      </div>
    </div>
    )
  }
}

export default WSNomadCullingTab