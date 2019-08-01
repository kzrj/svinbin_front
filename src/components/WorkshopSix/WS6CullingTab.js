import React, { Component } from 'react';


class WS6TransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,
      activeSectionId: null,
      activeCellId: null,
      cullingType: null,
      cullingReason: null
    }
  }
  
  componentDidMount() {
    // query
    this.props.getSections({workshop: 7})
  }
  setCullingType = (e) => {
    this.setState({
      ...this.state,
      cullingType: e.target.value
    })
  }

  clickSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })
    this.props.getLocations({by_section: sectionId})
  }

  clickCell = (location) => {
    this.setState({
      ...this.state,
      activeCellId: location.id,
      activePiglets: location.nomadpigletsgroup_set.length > 0 ?
        location.nomadpigletsgroup_set[0] : null
    })
  }

  clickCulling = () => {
    let data = {
      id: this.state.activePiglets.id,
      quantity: 1,
      gilt_quantity: 0,
      culling_type: this.state.cullingType,
      reason: this.state.cullingReason,
      initiator: 1 // hardcode
    }
    this.props.cullingPiglets(data)
    this.props.getLocations({by_section: this.state.activeSectionId})
    this.setState({
      ...this.state,
      activePiglets:null
    })
  }

  render() {
    const { sections, locations } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
            <div className='row'>
                {sections.map((section, key) => 
                    <div className={ this.state.activeSectionId == section.id ? 
                      'col-sm section-button section-active': 'col-sm section-button '
                      } onClick={this.clickSection}
                      data-section-id={section.id}
                      key={key}>
                      ID{section.id} {section.name}
                    </div>
                )}
            </div>
            <div className='row'>
              {locations.map(location =>
                  <div className={this.state.activeCellId == location.id ? 
                    'col-md-5 cell cell-active' : 'col-md-5 cell'}
                    onClick={() => this.clickCell(location)}
                    key={location.id}>
                    ID{location.id} 
                    {location.is_empty && 'Пустая'}
                    
                  </div>
              )}
              {locations.length < 1 && 'Выберите секцию'}
            </div>
          </div>
          <div className='col-6'>
            <div>
              {this.state.activePiglets ? 
                <div>
                  <p>id {this.state.activePiglets.id}</p>
                  <p>количество {this.state.activePiglets.quantity}</p>
                  <p>количество ремонтных {this.state.activePiglets.gilts_quantity}</p>
                  <p>{this.state.activePiglets.status}</p>
                </div>
                : 'Пустая клетка'}
            </div>
            <div>
              <div className="input-group">
                <select className="custom-select" id="inputGroupSelect04" onChange={this.setCullingType}>
                  <option selected>Выберите причину...</option>
                  <option value='padej' >padej</option>
                  <option value='prirezka' >prirezka</option>
                  <option value='spec uboi' >spec uboi</option>
                </select>
                <input type='text' value={this.state.cullingReason} />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" 
                  onClick={this.clickCulling}>
                    Брак
                  </button>
                </div>
              </div>
            </div>  
        </div>
      </div>
    )
  }
}

export default WS6TransferTab