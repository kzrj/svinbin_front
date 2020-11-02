import React, { Component } from 'react';

// components
import { PigletsCells, Sections } from '../Locations'
import { PigletsListElem } from '../PigletsRepresentations'
import { Message, FetchingErrorComponentMessage } from '../CommonComponents'
import { SplitPigletsInput } from '../FiltersAndInputs'


class WSNomadResettelmentTab extends Component {
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
    this.setData = this.setData.bind(this);
    this.checked = this.checked.bind(this);
    this.clickSection = this.clickSection.bind(this);
    this.clickCell = this.clickCell.bind(this);
    this.clickPiglets = this.clickPiglets.bind(this);
    this.clickSetlle = this.clickSetlle.bind(this);
  }
  
  componentDidMount() {
    this.props.getPiglets({
      // piglets_with_weighing_record: this.props.weighingPlace,
      status_title: (this.props.ignorePigletsStatus ) 
        ? '' : "Взвешены, готовы к заселению",
      by_workshop_number: this.props.workshopNumber
    })
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
      activeCellId: location.id
    })
  }

  clickPiglets (piglets) {
    this.setState({
      ...this.state,
      activePigletsId: piglets.id,
      activePiglets: piglets,
      weighingRecord: null
    })
  }

  clickSetlle () {
    const { activePiglets, activeCellId, quantity, gilts_contains } = this.state
    let data = {
      id: activePiglets.id,
      to_location: activeCellId,
      merge: true,
      gilts_contains: gilts_contains
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
      activeCellId: null,
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
        this.props.getPiglets({
          status_title: "Взвешены, готовы к заселению",
          // piglets_with_weighing_record: this.props.weighingPlace,
          by_workshop_number: this.props.workshopNumber
        })
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { piglets, sections, locations, eventError } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            {piglets.map(group =>
              <div className={this.state.activePigletsId == group.id ? 
                'nomad-piglets-row piglets-active': 'nomad-piglets-row'}
                onClick={() => this.clickPiglets(group)}
                key={group.id}
                >
                <PigletsListElem piglets={group} />
              </div>
            )}
            {/* <FetchingErrorComponentMessage
              fetching={this.props.listFetching}
              error={this.props.errorList}
              message={null}
              component={
                <div >
                  {piglets.map(group =>
                    <div className={this.state.activePigletsId == group.id ? 
                      'nomad-piglets-row piglets-active': 'nomad-piglets-row'}
                      onClick={() => this.clickPiglets(group)}
                      key={group.id}
                      >
                      <PigletsListElem piglets={group} />
                    </div>
                  )}
                </div>}
            /> */}
          </div>
          <div className='col-9'>
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
            <FetchingErrorComponentMessage 
              fetching={this.props.eventFetching}
              error={this.props.eventError}
              message={this.props.message}
              component={
                <div>
                  {this.state.activePiglets ?
                    <div>
                      <SplitPigletsInput 
                        checked={this.checked}
                        changeQuantity={this.state.changeQuantity}
                        quantity={this.state.quantity}
                        helpMessage={'Укажите количество'}
                        setData={this.setData}
                        gilts_contains={this.state.gilts_contains}
                      />
                        <button className='btn btn-outline-secondary' type='button'
                          onClick={this.clickSetlle}
                          >
                            Разместить группу
                        </button>
                    </div>
                    :
                    !this.props.message && <Message message={'Выберите группу поросят'}/>
                  }
                </div>
              }
              />
          </div>
      </div>
    )
  }
}

export default WSNomadResettelmentTab