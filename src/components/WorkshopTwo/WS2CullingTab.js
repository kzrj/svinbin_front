import React, { Component } from 'react';


class WS2CullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      sowsToMove: [],
      sowsByTours: props.sowsByTours,
      cullingReason: '',
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

  setReason = (e) => {
    console.log(e.target.value)
    console.log('reason')
    this.setState({
      ...this.state,
      cullingReason: e.target.value
    })
  }

  cullingSow = (e) => {
    const { cullingtype } = e.target.dataset
    console.log(cullingtype)
    console.log(e.target.dataset)
    let data = {
      id: this.props.sow.id,
      culling_type: cullingtype,
      reason: this.state.cullingReason
    }
    this.props.cullingSow(data)
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
              {sow &&
                <div>
                  <ul>
                    <li>{sow.id}</li>
                    <li>{sow.location}</li>
                    <li>{sow.status}</li>
                    <li>{sow.farm_id}</li>
                  </ul>
                  <div className="input-group">
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button" data-cullingType='padej'
                       onClick={this.cullingSow}>
                        Падеж
                      </button>
                    </div>
                  </div>
                  <div className="input-group">
                    <select className="custom-select" id="inputGroupSelect04" onChange={this.setReason}>
                      <option selected>Выберите причину...</option>
                      <option value='1' >1</option>
                      <option value='2' >2</option>
                      <option value='3' >4</option>
                    </select>
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button" data-cullingType='prirezka'
                      onClick={this.cullingSow}>
                        Прирезка
                      </button>
                    </div>
                  </div>
                  <div className="input-group">
                      <select className="custom-select" id="inputGroupSelect04" onChange={this.setReason}>
                        <option selected>Выберите причину...</option>
                        <option value='1' >1</option>
                        <option value='2' >2</option>
                        <option value='3' >4</option>
                      </select>
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button" data-cullingType='spec uboi' 
                      onClick={this.cullingSow}>
                        Убой
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

export default WS2CullingTab