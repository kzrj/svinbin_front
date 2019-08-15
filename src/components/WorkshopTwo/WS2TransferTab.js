import React, { Component } from 'react';
import { toggleArray, addItemToArray, removeItemFromArray,
   uniq, convertSowsByTours } from '../utils';


class WS2TransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      sowsToMove: [],
      sowsByTours: [],
    }
  }
  
  componentDidMount() {
    // query
    this.props.getSowsByTours()
    this.setState({
      ...this.state,
      sowsByTours: convertSowsByTours(this.props.sowsByTours)
    })
  }

  checkColumn = (e) => {
    const tour = e.target.dataset.tour
    let rows = this.state.sowsByTours[tour].rows
    let sowsToMove = this.state.sowsToMove
    if (!this.state.sowsByTours[tour].checked){
      Object.keys(rows).forEach((key) => {
        rows[key].active = true
        sowsToMove = addItemToArray(sowsToMove, rows[key].id)
      })
    } else {
      Object.keys(rows).forEach((key) => {
        rows[key].active = false
        sowsToMove = removeItemFromArray(sowsToMove, rows[key].id)
      })
    }
    sowsToMove = uniq(sowsToMove)
    
    this.setState({
      sowsByTours: {
        ...this.state.sowsByTours,
        [tour]: {
          ...this.state.sowsByTours[tour],
          checked: !this.state.sowsByTours[tour].checked,
        }
      },
      sowsToMove: sowsToMove
    })
  }

  checkItem = (e) => {
    const { tour, sowfarmid, id} = e.target.dataset
    let sowsToMove = toggleArray(this.state.sowsToMove, id)
    this.setState({
      sowsByTours: {
        ...this.state.sowsByTours,
        [tour]: {
          ...this.state.sowsByTours[tour],
          rows: {
            ...this.state.sowsByTours[tour].rows,
           [sowfarmid]: {
              ...this.state.sowsByTours[tour].rows[sowfarmid],
              active: !this.state.sowsByTours[tour].rows[sowfarmid].active
           },
          }
        },
      },
      sowsToMove: sowsToMove
    })
  }

  showState = () => {
    console.log(this.state)
  }

  moveManyTo = (workshopNumber) => {
    console.log(this.state.sowsToMove)
    this.props.sowsMoveMany({
      sows: this.state.sowsToMove,
      to_location: workshopNumber
    })
    this.props.getSowsByTours()
    this.setState({
      ...this.state,
      sowsByTours: convertSowsByTours(this.props.sowsByTours),
      sowsToMove: []
    })
  }

  render() {
    const { sowsToMove, sowsByTours } = this.state
    return (
        <div className='row workshop-content'>
          <div className='col-9'>
            <div className='row'>

                {!this.props.fetching && Object.keys(sowsByTours).map((key) => 
                  <div className='col-2 tour-list' key={key}>
                    {key}
                    <p><input type="checkbox" data-tour={key} onChange={this.checkColumn}/> 
                    {sowsByTours[key].count}</p>
                      {Object.keys(sowsByTours[key].rows).map((sowFarmId) =>
                        <div key={sowFarmId}>
                          <input type="checkbox"  
                            data-tour={key} 
                            data-sowFarmId={sowFarmId} 
                            data-id={sowsByTours[key].rows[sowFarmId].id} 
                            checked={sowsByTours[key].rows[sowFarmId].active}
                            onChange={this.checkItem} 
                            />
                            {sowFarmId}
                        </div>
                      )}
                  </div>
                )}
            </div>
          </div>
          <div className='col-3'>
            <button onClick={this.showState}>state</button>
            <div>
              <ul>
                {sowsToMove.map(sow =>
                  <li>{sow}</li>)}
              </ul>
              <button onClick={() => this.moveManyTo(1)}>
                Перевести в ЦЕХ1
              </button>
              <button onClick={() => this.moveManyTo(3)}>
                Перевести в ЦЕХ3
              </button>
            </div>
            
          </div>
        </div>
    )
  }
}

export default WS2TransferTab