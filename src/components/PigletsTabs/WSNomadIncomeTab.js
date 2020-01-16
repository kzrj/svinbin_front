import React, { Component } from 'react';

//components
import { PigletsGroup, WeighingDetail, PigletsListElem } from '../PigletsRepresentations'
import { WeighingPigletsInput } from '../FiltersAndInputs'
import { Message, ErrorMessage } from '../CommonComponents'

class WSNomadIncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePigletsId: 0,
      activePiglets: null,
      totalWeight: '',
      weighingRecord: null,
      checkNewAmount: false,
      newAmount: 0,
      needToRefresh: false
    }
    this.setData = this.setData.bind(this);
    this.weighing = this.weighing.bind(this);
    this.turnOnNewAmount = this.turnOnNewAmount.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }
  
  componentDidMount() {
    this.props.getPiglets({
      // status_title: "Готовы ко взвешиванию",
      piglets_without_weighing_record: this.props.weighingPlace,
      by_workshop_number: this.props.workshopNumber
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
      activePiglets: null,
      newAmount: 0,
      checkNewAmount: false,
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getPiglets({
          piglets_without_weighing_record: this.props.weighingPlace,
          by_workshop_number: this.props.workshopNumber})
      }, 500)
    }
  }
  
  render() {
    this.refreshSowsList()
    const { piglets, eventError } = this.props

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
        </div>
        <div className='col-9'>
          {this.state.activePiglets ?
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
            :
            this.props.message ? 
              <div>
                <Message message={this.props.message}/>
                {this.props.weighingData && 
                  <WeighingDetail weighingData={this.props.weighingData} />
                }
              </div>
              :
                <Message message={'Выберите партию для взвешивания'}/>
          }
          {eventError && <ErrorMessage error={eventError} />}
        </div>
      </div>
    )
  }
}

export default WSNomadIncomeTab