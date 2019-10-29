import React, { Component } from 'react';

// components
import SowToursData from '../../components/WorkshopOne/SowComponents'
import { SowFindById, SowLightDetail } from '../WorkshopThree/Components'


class WSSowCullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      cullingReason: 'padej',
      cullingType: 'padej',
      // query: { by_workshop_number: 1, farm_id_isnull: false },
    }
    this.getSowsById = this.getSowsById.bind(this);
    this.setData = this.setData.bind(this);
    this.cullingSow = this.cullingSow.bind(this);
    this.abortionSow = this.abortionSow.bind(this);
  }
  
  componentDidMount() {
    this.props.getSows({
      by_workshop_number: this.props.workshopNumber,
      farm_id_isnull: false
    })
  }

  getSowsById (e) {
    let { query } = this.state
    query.farm_id_starts = e.target.value
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  setData(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  cullingSow() {
    let data = {
      id: this.props.sow.id,
      culling_type: this.state.cullingType,
      reason: this.state.cullingReason
    }
    
    this.props.cullingSow(data)
    this.props.getSows({
      by_workshop_number: this.props.workshopNumber,
      farm_id_isnull: false
    })
  }

  abortionSow() {
    let data = {
      id: this.props.sow.id,
    }
    
    this.props.abortionSow(data)
    this.props.getSows({
      by_workshop_number: this.props.workshopNumber,
      farm_id_isnull: false
    })
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
                      <select className="custom-select" onChange={this.setData}>
                        <option selected value='padej' >Падеж</option>
                        <option value='spec' >Спец. убой</option>
                        <option value='prirezka' >Прирезка</option>
                      </select>
                      <input type='text' onChange={this.setData} placeholder='Напишите причину'/>
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

export default WSSowCullingTab