import React, { Component } from 'react';

// components
import SowToursData from '../../components/WorkshopOne/SowComponents'
import { SowFindById, SowLightDetail } from '../WorkshopThree/Components'


class WS1CullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      cullingReason: 'padej',
      cullingType: 'padej',
      query: { by_workshop_number: 1, farm_id_isnull: false },
    }
  }
  
  componentDidMount() {
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

  setReason = (e) => {
    this.setState({
      ...this.state,
      cullingReason: e.target.value
    })
  }

  setType = (e) => {
    this.setState({
      ...this.state,
      cullingType: e.target.value
    })
  }

  cullingSow = () => {
    let data = {
      id: this.props.sow.id,
      culling_type: this.state.cullingType,
      reason: this.state.cullingReason
    }
    
    this.props.cullingSow(data)
    this.props.getSows(this.state.query)
  }

  abortionSow = () => {
    let data = {
      id: this.props.sow.id,
    }
    
    this.props.abortionSow(data)
    this.props.getSows(this.state.query)
  }

  render() {
    const { sows, sow, tours_info } = this.props
    return (
      <div className='row workshop-content'>
          <div className='col-3 workshop-left-column'>
            <SowFindById 
                sows={sows} 
                sow={sow} 
                getSowsById={this.getSowsById} 
                getSow={this.props.getSow}/>
          </div>
          <div className='col-9'>
            <div className='workshop-content-column-2'>
              {sow &&
                <div>
                  <SowLightDetail sow={sow}/>
                  <SowToursData tours_info={tours_info} />
                  <div className="input-group">
                      <select className="custom-select" onChange={this.setType}>
                        <option selected value='padej' >Падеж</option>
                        <option value='spec' >Спец. убой</option>
                        <option value='prirezka' >Прирезка</option>
                      </select>
                      <input type='text' onChange={this.setReason} placeholder='Напишите причину'/>
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button"  
                      onClick={this.cullingSow}>
                        Забраковать
                      </button>
                    </div>
                  </div>
                  <div className="input">
                    <label className='sow-event-label'>Пометить как аборт</label>
                    <div>
                      <button className="btn btn-outline-secondary" type="button"  
                      onClick={this.abortionSow}>
                        Аборт
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
        </div>
    </div>
    )
  }
}

export default WS1CullingTab