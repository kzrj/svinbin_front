import React, { Component } from 'react';


class WS1UltrasoundTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      sow: null
    }
  }
  
  componentDidMount() {
    // query
    this.props.getSows()
  }

  getSowsById = () => {
    // value
    // query
    this.props.getSows()
  }

  ultrasoundSow = (result) => {
    let data = {
      id: this.props.sow.id,
      week: this.props.week,
      result: result
    }
    this.props.ultrasoundSow(data)
    // query
    this.props.getSows()
  }

  render() {
    const { sows, sowsData, sow, week } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            <div className='under-menu-line text-center'>
              <p className="workshop-header-2">ПОИСК ПО ID</p>
            </div>
            <div className='workshop-content-column-1'>
              <input type='text' onChange={this.getSowsById} />
              <ul className='list-unstyled'>
                {sowsData.fetching && 'Fetching'}
                {!sowsData.fetching && 'Not Fetching'}
                
                {sows.length > 0 && sow &&
                  sows.map(sowInList => 
                    <li className={sowInList.id == sow.id ? 'sow-active' : sowInList.id} key={sowInList.id} onClick={() => this.props.getSow(sowInList.id)}>
                      {sowInList.farm_id}
                    </li>)
                }
              </ul>
            </div>
          </div>
          <div className='col-9'>
            <div className='under-menu-line text-center'>
              <p className="workshop-header-2">ВЫБРАНА МАТКА</p>
            </div>
            <div className='workshop-content-column-2'>
              {sow &&
                <div>
                  <ul>
                    <li>{sow.id}</li>
                    <li>{sow.location}</li>
                    <li>{sow.status}</li>
                    <li>{sow.farm_id}</li>
                    {/* semenation info */}
                  </ul>
                  <div>
                    <button onClick={() => this.ultrasoundSow(false)}>
                      Отметить как прохолост
                    </button>
                    <button onClick={() => this.ultrasoundSow(true)}>
                      Отметить как супорос
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
    )
  }
}

export default WS1UltrasoundTab