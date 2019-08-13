import React, { Component } from 'react';


class WS4IncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePigletsId: 0,
      activePiglets: null,
      totalWeight: 0,
      weighingRecord: null
    }
    // this.getPiglets = this.getPiglets.bind(this);
    this.setWeight = this.setWeight.bind(this);
    this.weighing = this.weighing.bind(this);
  }
  
  // getPiglets() {
  //   this.props.getPiglets({status_title: "Взвешены, готовы к заселению"})
  // }

  componentWillMount(){
    console.log('First this called');
    // this.getPiglets()
    // this.props.getPiglets({status_title: "Взвешены, готовы к заселению"})
  }

  componentDidMount() {
    // query
    console.log('Did mount')
    // this.getPiglets()
    // this.props.getPiglets({status_title: "Готовы ко взвешиванию"})
  }

  clickPiglets (piglets) {
    this.setState({
      ...this.state,
      activePigletsId: piglets.id,
      activePiglets: piglets,
      weighingRecord: null
    })

  }

  setWeight (e) {
    this.setState({
      ...this.state,
      totalWeight: e.target.value
    })
  }

  weighing () {
    // need initiator
    let data = {
      id: this.state.activePiglets.id,
      place: '3/4',
      total_weight: this.state.totalWeight,
      initiator: 1
    }
    this.props.weighingPiglets(data)
    this.setState({
      ...this.state,
      weighingRecord: this.props.weighingData.weighing_record
    })
    // this.props.getPiglets({status_title: "Готовы ко взвешиванию"})
  }
  
  render() {
    const { piglets } = this.props
    // console.log('OPAOPAOA')
    // console.log(piglets)
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            {piglets.map(group =>
              <div className={this.state.activePigletsId == group.id ? 
                'piglets-active': ''}
                onClick={() => this.clickPiglets(group)}
                key={group.id}
                >
                ID{group.id} Количество{group.quantity}
              </div>
            )}
            
          </div>
          <div className='col-9'>
            {this.state.activePiglets && !this.state.weighingRecord &&
              <div>
                <ul>
                  <li>{this.state.activePiglets.id}</li>
                  <li>{this.state.activePiglets.quantity}</li>
                  <li>{this.state.activePiglets.status}</li>
                </ul>
                <div>
                  <input type='text' value={this.state.totalWeight} onChange={this.setWeight}/>
                  <button onClick={this.weighing}>
                    Взвесить
                  </button>
                </div>
              </div>
            }
            {this.state.weighingRecord &&
              <div>
                <p>{this.state.weighingRecord.average_weight}</p>
                <p>{this.state.weighingRecord.total_weight}</p>
              </div>
            }
            
        </div>
      </div>
    )
  }
}

export default WS4IncomeTab