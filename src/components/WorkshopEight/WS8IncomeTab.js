import React, { Component } from 'react';


class WS8IncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePigletsId: 0,
      activePiglets: null,
      totalWeight: 0,
      weighingRecord: null
    }
  }
  
  componentDidMount() {
    // query
    this.props.getPiglets()
  }

  clickPiglets = (piglets) => {
    this.setState({
      ...this.state,
      activePigletsId: piglets.id,
      activePiglets: piglets,
      weighingRecord: null
    })

  }

  setWeight = (e) => {
    this.setState({
      ...this.state,
      totalWeight: e.target.value
    })
  }

  weighing = () => {
    // need initiator
    let data = {
      id: this.state.activePiglets.id,
      place: '4/8',
      total_weight: this.state.totalWeight,
      initiator: 1
    }
    this.props.weighingPiglets(data)
    this.setState({
      ...this.state,
      weighingRecord: this.props.weighingData.weighing_record
    })
  }
  
  render() {
    const { piglets } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            {piglets.map(group =>
              <div className={this.state.activePigletsId == group.id ? 
                'piglets-active': ''}
                onClick={() => this.clickPiglets(group)}
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

export default WS8IncomeTab