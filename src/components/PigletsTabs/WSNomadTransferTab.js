import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../Locations'
import { PigletsGroup } from '../PigletsRepresentations'
import { FetchingErrorComponentMessage } from '../CommonComponents'
import { SplitPigletsInput } from '../FiltersAndInputs'


class WSNomadTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,

      activeSectionId: null,
      activeCellId: null,

      changeQuantity: false,
      quantity: 0,
      gilts_contains: false,

      needToRefresh: false
    }
    this.clickSection = this.clickSection.bind(this);
    this.clickCell = this.clickCell.bind(this);
    this.clickTransfer = this.clickTransfer.bind(this);
    this.setData = this.setData.bind(this);
    this.checked = this.checked.bind(this);
    this.moveGilts = this.moveGilts.bind(this);
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
  
  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })
    this.props.getLocations({by_section: sectionId, cells: true})
  }

  clickCell (location) {
    this.setState({
      ...this.state,
      activeCellId: location.id,
      activePiglets: location.piglets.length > 0 ?
       location.piglets[0] : null
    })
    this.props.pigletsResetErrorsAndMessages()
  }

  clickTransfer (e) {
    const { activePiglets, quantity, gilts_contains } = this.state
    let data = {
      id: activePiglets.id,
      to_location: e.target.dataset.tolocation,
      merge: false,
      gilts_contains: gilts_contains,
    }

    if (quantity > 0)
      data['new_amount'] = quantity

    this.props.movePiglets(data)
    this.setState({
      ...this.state,
      activePiglets: null,

      changeQuantity: false,
      quantity: 0,
      gilts_contains: false,

      needToRefresh: true, 
    })
  }

  moveGilts () {
    const { activePiglets, quantity, gilts_contains } = this.state
    let data = {
      id: activePiglets.id,
    }
    if (quantity > 0)
      data['gilts_amount'] = quantity

    this.props.movePiglets(data)
    this.setState({
      ...this.state,
      activePiglets: null,

      changeQuantity: false,
      quantity: 0,
      gilts_contains: false,

      needToRefresh: true, 
    })
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
      }, 500)
    }
  }

  render() {
    this.refreshSowsList ()
    const { sections, locations, message, eventError } = this.props
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
                    clickLocation={this.clickCell}
                    user={this.props.user}
                  />}
            />
          </div>
          <div className='col-6'>
            <FetchingErrorComponentMessage
              fetching={this.props.eventFetching}
              error={this.props.eventError}
              message={this.props.message}
              component={
                this.state.activePiglets && 
                <div>
                  <PigletsGroup piglets={this.state.activePiglets}/>
                  <SplitPigletsInput 
                    checked={this.checked}
                    changeQuantity={this.state.changeQuantity}
                    quantity={this.state.quantity}
                    helpMessage={'Укажите количество'}
                    setData={this.setData}
                    gilts_contains={this.state.gilts_contains}
                  />
                  <br/>

                  {this.props.toLocations ? this.props.toLocations.map((toLocation, key) => 
                    <button key={key}
                      className='btn btn-outline-secondary' type='button'
                      data-toLocation={toLocation}
                      onClick={this.clickTransfer}>
                        {this.props.buttonName} {toLocation}
                    </button>
                    ) :
                    <button 
                      className='btn btn-outline-secondary' type='button'
                      data-toLocation={this.props.toLocation}
                      onClick={this.props.toLocation == 11 ? this.moveGilts : this.clickTransfer}>
                        {this.props.buttonName}
                    </button>
                  }
                </div>
              }
            />
        </div>
      </div>
    )
  }
}

export default WSNomadTransferTab