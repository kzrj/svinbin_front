import React, { Component } from 'react';

// components
import { SowToursData } from '../../components/SowRepresentations'

class WS2CullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      cullingReason: '',
      cullingType: null,
      query: {
        all_in_workshop_number: 3
      },
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
      id: this.props.sow.sow.id,
      culling_type: this.state.cullingType,
      reason: this.state.cullingReason
    }
    this.props.cullingSow(data)
  }

  abortionSow = () => {
    let data = {
      id: this.props.sow.sow.id,
    }
    this.props.abortionSow(data)
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
                  </ul>
                  <SowToursData sow={sow}/>
                  <div className="input-group">
                      <select className="custom-select" onChange={this.setType}>
                        <option selected>Выберите тип падежа...</option>
                        <option value='padej' >Падеж</option>
                        <option value='spec' >Спец. убой</option>
                        <option value='prirezka' >Прирезка</option>
                      </select>
                      <input type='text' onChange={this.setReason} />
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button"  
                      onClick={this.cullingSow}>
                        Забраковать
                      </button>
                    </div>
                  </div>
                  <div className="input-group">
                      <button className="btn btn-outline-secondary" type="button"  
                      onClick={this.abortionSow}>
                        Аборт
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

export default WS2CullingTab