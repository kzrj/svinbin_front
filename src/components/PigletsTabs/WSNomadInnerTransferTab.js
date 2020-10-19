import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../Locations'
import { PigletsGroup } from '../PigletsRepresentations'
import { SplitPigletsInput } from '../FiltersAndInputs'
import { FetchingErrorComponentMessage } from '../CommonComponents'


class WSNomadInnerTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,

      activeFromSectionId: null,
      activeCellFromLocationId: null,
      activeToSectionId: null,
      activeCellToLocationId: null,

      changeQuantity: false,
      quantity: 0,
      gilts_contains: false,

      needToRefresh: false
    }
    this.clickFromSection = this.clickFromSection.bind(this);
    this.clickToSection = this.clickToSection.bind(this);
    this.clickCellToLocation = this.clickCellToLocation.bind(this);
    this.clickCellFromLocation = this.clickCellFromLocation.bind(this);
    this.setData = this.setData.bind(this);
    this.checked = this.checked.bind(this);
    this.clickTransfer = this.clickTransfer.bind(this);
  }

  componentDidMount() {
    this.props.pigletsResetErrorsAndMessages()
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  checked (e) {
    this.setState({
      ...this.state,
      [e.target.name]: !this.state[e.target.name]
    })
  }
  
  clickFromSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeFromSectionId: sectionId
    })
    this.props.getLocations1({by_section: sectionId, cells: true})
  }

  clickToSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeToSectionId: sectionId
    })
    this.props.getLocations2({by_section: sectionId, cells: true})
  }

  clickCellFromLocation (location) {
    this.props.pigletsResetErrorsAndMessages()
    this.setState({
      ...this.state,
      activeCellFromLocationId: location.id,
      activePiglets: location.piglets.length > 0 ?
       location.piglets[0] : null
    })
  }

  clickCellToLocation (location) {
    this.setState({
      ...this.state,
      activeCellToLocationId: location.id
    })
  }

  clickTransfer () {
    const { activePiglets, activeCellToLocationId, quantity, gilts_contains } = this.state
    let data = {
      id: activePiglets.id,
      to_location: activeCellToLocationId,
      merge: true,
      gilts_contains: gilts_contains
    }

    if (quantity > 0)
      data['new_amount'] = quantity
    this.props.movePiglets(data)
    this.setState({
      ...this.state,
      activePiglets: null,

      quantity: null,
      gilts_contains: false,

      needToRefresh: true, 

      activeCellFromLocationId: null,
      activeCellToLocationId: null,
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations1({by_section: this.state.activeFromSectionId, cells: true})
        this.props.getLocations2({by_section: this.state.activeToSectionId, cells: true})
      }, 500)
    }
  }

  render() {
    const { sections, locations1, locations2, eventError } = this.props
    this.refreshSowsList()
    
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
                    activeSectionId={this.state.activeFromSectionId}
                    clickSection={this.clickFromSection}
                  />}
              />
            <FetchingErrorComponentMessage 
                fetching={this.props.listFetching}
                error={this.props.locationsErrorList}
                message={null}
                component={
                  <PigletsCells
                    isSection={this.state.activeFromSectionId}
                    fetching={this.props.listFetching}
                    locations={locations1}
                    activeCellIds={[this.state.activeCellFromLocationId]}
                    clickLocation={this.clickCellFromLocation}
                    user={this.props.user}
                  />}
            />
          </div>
          <div className='col-6'>
            <FetchingErrorComponentMessage 
                  fetching={this.props.sectionsFetching}
                  error={this.props.sectionsListError}
                  message={null}
                  component={
                    <Sections 
                      sections={sections}
                      activeSectionId={this.state.activeToSectionId}
                      clickSection={this.clickToSection}
                    />}
                />
              <FetchingErrorComponentMessage 
                  fetching={this.props.list2Fetching}
                  error={this.props.locations2ErrorList}
                  message={null}
                  component={
                    <PigletsCells
                      isSection={this.state.activeToSectionId}
                      fetching={this.props.list2Fetching}
                      locations={locations2}
                      activeCellIds={[this.state.activeCellToLocationId]}
                      clickLocation={this.clickCellToLocation}
                    />}
              />
          </div>
        <div className='row'>
          <div className='col-6'>
            {this.state.activePiglets && 
                <PigletsGroup piglets={this.state.activePiglets}/>
            }
          </div>
          <div className='col-6'>
            <FetchingErrorComponentMessage
              fetching={this.props.eventFetching}
              error={this.props.eventError}
              message={this.props.message}
              component={
                  this.state.activePiglets && 
                    <div>
                      <SplitPigletsInput 
                        checked={this.checked}
                        changeQuantity={this.state.changeQuantity}
                        quantity={this.state.quantity}
                        helpMessage={'Укажите количество'}
                        setData={this.setData}
                        gilts_contains={this.state.gilts_contains}
                      />
                      <br />
                      <button 
                        className='btn btn-outline-secondary' type='button'
                        onClick={this.clickTransfer}>
                          Переместить
                      </button>
                    </div>
                  }
              />
          </div>
        </div>
      </div>
    )
  }
}

export default WSNomadInnerTransferTab