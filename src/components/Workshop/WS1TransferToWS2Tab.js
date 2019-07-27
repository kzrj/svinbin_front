import React, { Component } from 'react';


class WS1TransferToWS2Tab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      sowToMove: [],
      columns: {
        t123: {
          count: 3,
          checked: false,
          rows: {
            123: false,
            124: false,
            125: false
          }
        },
      },
      sowsByTours: props.sowsByTours
    }
  }
  
  componentDidMount() {
    // query
    // this.props.getSowsByTours()
    // console.log('componentDidMount')
    // console.log(this.state.sowsByTours)
  }

  checkColumn = (e) => {
    console.log(e.target.dataset)
    const tour = e.target.dataset.tour
    console.log(this.state.sowsByTours[tour].rows)
    let rows = this.state.sowsByTours[tour].rows
    Object.keys(rows).forEach(key => 
      rows[key] = !this.state.sowsByTours[tour].checked
    )
    this.setState({
      sowsByTours: {
        ...this.state.sowsByTours,
        [tour]: {
          ...this.state.sowsByTours[tour],
          checked: !this.state.sowsByTours[tour].checked,
        }
      }
    })
    console.log(rows)
    console.log(this.state.sowsByTours[tour].rows)
  }

  checkItem = (e) => {
    const { tour, sowfarmid } = e.target.dataset
    console.log(sowfarmid)
    console.log(e.target.dataset)
    this.setState({
      sowsByTours: {
        ...this.state.sowsByTours,
        [tour]: {
          ...this.state.sowsByTours[tour],
          rows: {
            ...this.state.sowsByTours[tour].rows,
           [sowfarmid]: !this.state.sowsByTours[tour].rows[sowfarmid]
          }
        }
      }
    })
    console.log(this.state.sowsByTours[tour].rows)
  }


  render() {
    const { sowsByTours } = this.state
    console.log(sowsByTours)
    // let sowsByTours = Object.keys(this.state.sowsByTours).map(key => {
    //   <div className='col-2 tour-list'>
    //     {key}
    //     <p><input type="checkbox" data-tour={key} onChange={this.checkColumn}/> 
    //     {this.state.sowsByTours[key].count}</p>
    //       {Object.keys(this.state.sowsByTours[key].rows).map(sowFarmId =>
    //         <div key={sowFarmId}>
    //           <input type="checkbox"  data-tour={key} data-sowFarmId={sowFarmId} 
    //             checked={this.state.sowsByTours[key].rows[sowFarmId]}
    //             onChange={this.checkItem}/>
    //             {sowFarmId}
    //         </div>
    //       )}
    //   </div>
    // })
    return (
        <div className='row workshop-content'>
          <div className='col-9'>
            
            <div className='row'>
                {Object.keys(this.state.sowsByTours).map((key) => 
                  <div className='col-2 tour-list' key={key}>
                    {key}
                    <p><input type="checkbox" data-tour={key} onChange={this.checkColumn}/> 
                    {this.state.sowsByTours[key].count}</p>
                      {Object.keys(this.state.sowsByTours[key].rows).map(sowFarmId =>
                        <div>
                          <input type="checkbox"  data-tour={key} data-sowFarmId={sowFarmId} 
                            checked={this.state.sowsByTours[key].rows[sowFarmId]}
                            onChange={this.checkItem} key={sowFarmId}/>
                            {sowFarmId}
                        </div>
                      )}
                  </div>
                )}
                
                {/* <div className='col-2 tour-list'>
                  <p><input type="checkbox" data-tour='t123' onChange={this.checkColumn}/> 
                    {this.state.columns.t123.count}</p>
                      <div>
                        <input type="checkbox"  data-tour='t123' data-sowFarmId='123' 
                          checked={this.state.columns.t123.rows['123']}
                          onChange={this.checkItem}/>
                          123
                      </div>
                      <div>
                        <input type="checkbox" data-tour='t123' data-sowFarmId='124' 
                          checked={this.state.columns.t123.rows['124']}
                          onChange={this.checkItem} />
                          124
                      </div>
                      <div>
                        <input type="checkbox" data-tour='t123' data-sowFarmId='125' 
                          checked={this.state.columns.t123.rows['125']} 
                          onChange={this.checkItem}/>
                          125
                      </div>
                    
                </div> */}
            </div>
          </div>
          <div className='col-3'>
            hui
            
          </div>
        </div>
    )
  }
}

export default WS1TransferToWS2Tab