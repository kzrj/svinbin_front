import React, { Component } from 'react';
import { toggleArray, addItemToArray, removeItemFromArray,
   uniq, convertSowsByTours } from '../utils';


class WS1TransferToWS2Tab extends Component {
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
    const { tour, sowid, id} = e.target.dataset
    let sowsToMove = toggleArray(this.state.sowsToMove, id)
    this.setState({
      sowsByTours: {
        ...this.state.sowsByTours,
        [tour]: {
          ...this.state.sowsByTours[tour],
          rows: {
            ...this.state.sowsByTours[tour].rows,
           [sowid]: {
              ...this.state.sowsByTours[tour].rows[sowid],
              active: !this.state.sowsByTours[tour].rows[sowid].active
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

  moveManyTo2 = () => {
    console.log(this.state.sowsToMove)
    this.props.sowsMoveMany({
      sows: this.state.sowsToMove,
      to_location: 2
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
                      {Object.keys(sowsByTours[key].rows).map((sowId) =>
                        <div key={sowsByTours[key].rows[sowId].id}>
                          <input type="checkbox"  
                            data-tour={key} 
                            data-sowId={sowId} 
                            data-id={sowsByTours[key].rows[sowId].id} 
                            checked={sowsByTours[key].rows[sowId].active}
                            onChange={this.checkItem} 
                            />
                            {sowsByTours[key].rows[sowId].farm_id ? 
                              sowsByTours[key].rows[sowId].farm_id : 'Нет Id'}
                            {sowsByTours[key].rows[sowId].status ? 
                              sowsByTours[key].rows[sowId].status : 'Нет статуса'}
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

export default WS1TransferToWS2Tab