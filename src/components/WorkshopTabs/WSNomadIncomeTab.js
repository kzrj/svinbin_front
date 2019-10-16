import React, { Component } from 'react';

//components
import { NomadGroupDetail, WeighingPigletsInput, WeighingDetail } from '../WSComponents'

class WSNomadIncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePigletsId: 0,
      activePiglets: null,
      totalWeight: 0,
      weighingRecord: null,
      needToRefresh: false
    }
    this.setData = this.setData.bind(this);
    this.weighing = this.weighing.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }
  
  componentDidMount() {
    this.props.getPiglets({
      // status_title: "Готовы ко взвешиванию",
      filter_by_weighing_place_reverse: this.props.weighingPlace,
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

  weighing () {
    let data = {
      id: this.state.activePiglets.id,
      place: this.props.weighingPlace,
      total_weight: this.state.totalWeight,
    }
    this.props.weighingPiglets(data)
    this.setState({
      ...this.state,
      weighingRecord: this.props.weighingData,
      activePiglets: null,
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getPiglets({status_title: "Готовы ко взвешиванию",
          by_workshop_number: this.props.workshopNumber})
      }, 500)
    }
  }
  
  render() {
    this.refreshSowsList()
    const { piglets } = this.props
    return (
      <div className='row workshop-content'>
        <div className='col-3'>
          {piglets.map(group =>
            <div className={this.state.activePigletsId == group.id ? 
              'nomad-piglets-row piglets-active': 'nomad-piglets-row'}
              onClick={() => this.clickPiglets(group)}
              key={group.id}
              >
              Партия №{group.merger_part_number} {group.quantity} голов
            </div>
          )}
        </div>
        <div className='col-9'>
          {this.state.activePiglets ?
            <div>
              <NomadGroupDetail piglets={this.state.activePiglets}/>
              <WeighingPigletsInput 
                totalWeight={this.state.totalWeight}
                setData={this.setData}
                weighing={this.weighing}
              />
            </div>
            :
            this.props.message ? 
              <div>
                <p>{this.props.message}</p> 
                {this.props.weighingData && 
                  <WeighingDetail weighingData={this.props.weighingData} />
                }
              </div>
              :
                <p>Выберите партию для взвешивания</p>
          }
        </div>
      </div>
    )
  }
}

export default WSNomadIncomeTab