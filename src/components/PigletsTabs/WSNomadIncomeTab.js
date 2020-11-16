import React, { Component } from 'react';

//components
import { WeighingPigletsForm } from './PigletsForms'
import { PigletsListElem, WeighingDetail, PigletsGroupInline } from './PigletsComponent'
import { FetchingErrorComponentMessage, ErrorOrMessage } from '../CommonComponents'

class WSNomadIncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePigletsId: 0,
      activePiglets: null,
      weighingRecord: null,

      quantity: null,

      needToRefresh: false
    }
    this.setData = this.setData.bind(this);
    this.weighing = this.weighing.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }
  
  componentDidMount() {
    this.props.getPiglets({
      not_status_title: "Взвешены, готовы к заселению",
      piglets_without_weighing_record: this.props.weighingPlace,
      by_workshop_number: this.props.workshopNumber
    })
    this.props.pigletsResetErrorsAndMessages()
  }

  clickPiglets (piglets) {
    this.setState({
      ...this.state,
      activePigletsId: piglets.id,
      activePiglets: piglets,
      weighingRecord: null
    })
    this.props.weightFormSetID(piglets.id)
    this.props.weightFormSetQnty(piglets.quantity)
    this.props.pigletsResetErrorsAndMessages()
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  weighing () {
    this.props.weighingPiglets(this.props.form.values)
    this.setState({
      ...this.state,
      weighingRecord: this.props.weighingData,
      activePigletsId: null,
      activePiglets: null,
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getPiglets({
          not_status_title: "Взвешены, готовы к заселению",
          piglets_without_weighing_record: this.props.weighingPlace,
          by_workshop_number: this.props.workshopNumber
        })
      }, 300)
    }
  }
  
  render() {
    this.refreshSowsList()
    const { piglets, weighingPlace, eventError, eventFetching, message, returnLocation, weighingData } = this.props
    const { activePiglets, activePigletsId, weighingRecord } = this.state

    return (
      <div className='row'>
        <div className='col-4'>
          <FetchingErrorComponentMessage 
            fetching={this.props.listFetching}
            error={this.props.listError}
            message={null}
            component={
              <div>
                {piglets.length === 0 && <p className='my-1 mx-1'>На поступлении никого нет</p>}
                {piglets.map(group =>
                  <div className={activePigletsId == group.id 
                    ? 'nomad-piglets-row piglets-active my-1'
                    : 'nomad-piglets-row my-1 bg-white-dark'}
                    onClick={() => this.clickPiglets(group)}
                    key={group.id}
                    >
                    <PigletsListElem piglets={group} />
                  </div>
                )}
              </div>
            }
          />
        </div>
        <div className='col-8'>
          {activePiglets &&
            <div className='card card-style ml-0 my-1'>
              <div className='content'>
                <PigletsGroupInline piglets={activePiglets} className='font-16'/>
                <WeighingPigletsForm 
                  parentSubmit={this.weighing}
                  initialValues={{
                    id: activePiglets.id,
                    new_amount: activePiglets.quantity,
                    place: weighingPlace,
                    to_location: returnLocation
                  }}
                />
              </div>
            </div>
          }
          {weighingData 
              ? <WeighingDetail weighingData={weighingData} />
              : !this.state.activePiglets && 
                <p className='my-3 text-center font-17 font-700'>Выберите партию для взвешивания</p>
          }
          <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
            className='mt-2 mb-0 mx-1 font-15' />
        </div>
      </div>
    )
  }
}

export default WSNomadIncomeTab