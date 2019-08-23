import React, { Component } from 'react';

// components
import SowToursData from '../../components/WorkshopOne/SowComponents'


class WS1UltrasoundTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {by_workshop_number: 1, status_title: 'Осеменена'},
    };
    this.ultrasoundSow = this.ultrasoundSow.bind(this);
  }
  
  componentDidMount() {
    // query
    this.props.getSows(this.state.query)
    
  }

  getSowsById = (e) => {
    let { query } = this.state
    query.farm_id_starts = e.target.value
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  ultrasoundSow (result) {
    let data = {
      id: this.props.sow.sow.id,
      result: result
    }
    this.props.ultrasoundSow(data)
    this.props.getSows(this.state.query)
  }

  render() {
    const { sows, sow } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            <div className='under-menu-line text-center'>
              <p className="workshop-header-2">ПОИСК ПО ID</p>
            </div>
            <div className='workshop-content-column-1'>
              <input type='text' onChange={this.getSowsById} />
              <ul className='list-unstyled'>
                {sows.length > 0 && sow &&
                  sows.map(sowInList => 
                    <li className={sowInList.id == sow.id ? 'sow-active' : sowInList.id} 
                      key={sowInList.id} onClick={() => this.props.getSow(sowInList.id)}>
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
              {sow && sow.sow &&
                <div>
                  <ul>
                    <li>{sow.sow.id}</li>
                    <li>{sow.sow.location}</li>
                    <li>{sow.sow.status}</li>
                    <li>{sow.sow.farm_id}</li>
                    {/* ultrasound info */}
                  </ul>
                  
                  <SowToursData sow={sow} />
                  
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