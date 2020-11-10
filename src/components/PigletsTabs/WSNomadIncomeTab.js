import React, { Component } from 'react';

//components
import { PigletsGroup, WeighingDetail } from '../PigletsRepresentations'
import { WeighingPigletsInput } from '../FiltersAndInputs'
import { PigletsListElem } from './PigletsComponent'
import { Message, FetchingErrorComponentMessage } from '../CommonComponents'

class WSNomadIncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePigletsId: 0,
      activePiglets: null,
      totalWeight: '',
      weighingRecord: null,
      checkNewAmount: false,
      newAmount: null,

      farrow_date: '',
      quantity: null,
      gilts_quantity: 0,
      transaction_date: '',

      needToRefresh: false
    }
    this.setData = this.setData.bind(this);
    this.weighing = this.weighing.bind(this);
    this.initPiglets = this.initPiglets.bind(this);
    this.turnOnNewAmount = this.turnOnNewAmount.bind(this);
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
    this.props.pigletsResetErrorsAndMessages()
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  turnOnNewAmount () {
    this.setState({
      ...this.state,
      checkNewAmount: !this.state.checkNewAmount
    })
  }

  weighing () {
    let data = {
      id: this.state.activePiglets.id,
      place: this.props.weighingPlace,
      total_weight: this.state.totalWeight,
      new_amount: this.state.newAmount,
      to_location: this.props.returnLocation
    }
    this.props.weighingPiglets(data)
    this.setState({
      ...this.state,
      weighingRecord: this.props.weighingData,
      totalWeight: '',
      activePiglets: null,
      newAmount: 0,
      checkNewAmount: false,
      needToRefresh: true
    })
  }

  initPiglets () {
    this.props.initPiglets({
      location: this.props.workshopNumber,
      from_location: this.props.returnLocation,
      farrow_date: this.state.farrow_date,
      quantity: this.state.quantity,
      gilts_quantity: this.state.gilts_quantity,
      transaction_date: this.state.transaction_date
    })
    this.setState({
      ...this.state,
      totalWeight: '',
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
      }, 500)
    }
  }
  
  render() {
    this.refreshSowsList()
    const { piglets, user } = this.props

    return (
      <div className='row workshop-content'>
        <div className='col-3'>
          <FetchingErrorComponentMessage 
            fetching={this.props.listFetching}
            error={this.props.listError}
            message={null}
            component={
              <div>
                {piglets.map(group =>
                  <div className={this.state.activePigletsId == group.id ? 
                    'nomad-piglets-row piglets-active': 'nomad-piglets-row'}
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
        <div className='col-9'>
          <FetchingErrorComponentMessage
            fetching={this.props.eventFetching}
            error={this.props.eventError}
            message={this.props.message}
            component={
              this.state.activePiglets &&
              <div>
                <PigletsGroup piglets={this.state.activePiglets}/>
                <WeighingPigletsInput 
                  totalWeight={this.state.totalWeight}
                  setData={this.setData}
                  weighing={this.weighing}
                  turnOnNewAmount={this.turnOnNewAmount}
                  checkNewAmount={this.state.checkNewAmount}
                  newAmount={this.state.newAmount}
                />
              </div>
            }
            />
            {this.props.message 
              ? this.props.weighingData && 
                  <WeighingDetail weighingData={this.props.weighingData} />
              : <Message message={'Выберите партию для взвешивания'}/>
            }
        </div>
      </div>
    )
  }
}

export default WSNomadIncomeTab