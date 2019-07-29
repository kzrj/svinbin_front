import React, { Component } from 'react';
import { toggleArray, addItemToArray, removeItemFromArray, uniq } from '../utils';


class WS2TransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      sowsToMove: [],
      sowsByTours: props.sowsByTours
    }
  }
  
  componentDidMount() {
    // query
    // this.props.getSowsByTours()
  }

  checkColumn = (e) => {
    const tour = e.target.dataset.tour
    let rows = this.state.sowsByTours[tour].rows
    let sowsToMove = this.state.sowsToMove
    if (!this.state.sowsByTours[tour].checked){
      Object.keys(rows).forEach((key) => {
        rows[key] = true
        sowsToMove = addItemToArray(sowsToMove, key)
      })
    } else {
      Object.keys(rows).forEach((key) => {
        rows[key] = false
        sowsToMove = removeItemFromArray(sowsToMove, key)
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
    const { tour, sowfarmid } = e.target.dataset
    this.setState({
      sowsByTours: {
        ...this.state.sowsByTours,
        [tour]: {
          ...this.state.sowsByTours[tour],
          rows: {
            ...this.state.sowsByTours[tour].rows,
           [sowfarmid]: !this.state.sowsByTours[tour].rows[sowfarmid]
          }
        },
      },
      sowsToMove: toggleArray(this.state.sowsToMove, sowfarmid)
    })
  }

  showState = () => {
    console.log(this.state)
  }

  moveManyTo2 = () => {
    console.log('movemanyTo2')
    console.log(this.state.sowsToMove)
  }

  render() {
    const { sowsByTours, sowsToMove } = this.state
    return (
        <div className='row workshop-content'>
          <div className='col-9'>
            <div className='row'>
                {Object.keys(sowsByTours).map((key) => 
                  <div className='col-2 tour-list' key={key}>
                    {key}
                    <p><input type="checkbox" data-tour={key} onChange={this.checkColumn}/> 
                    {sowsByTours[key].count}</p>
                      {Object.keys(sowsByTours[key].rows).map((sowFarmId) =>
                        <div key={sowFarmId}>
                          <input type="checkbox"  
                            data-tour={key} 
                            data-sowFarmId={sowFarmId} 
                            checked={sowsByTours[key].rows[sowFarmId]}
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
              <button onClick={this.moveManyTo2}>
                Перевести в ЦЕХ2
              </button>
            </div>
            
          </div>
        </div>
    )
  }
}

export default WS2TransferTab