import React, { Component } from 'react';


class WS3SowFarrowTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSow: null,
      activeSectionId: null,
      activeCellLocationId: null,
      total_piglets: 0,
      mummy_piglets: 0,
      dead_piglets: 0,
      alive_piglets: 0,
      date: null,
    }
  }
  
  componentDidMount() {
    this.props.getSections({workshop: 3})    
  }

  clickSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })

    this.props.getLocations({by_section: sectionId})
  }

  clickCellLocation = (location) => {
    this.setState({
      ...this.state,
      activeCellLocationId: location.id,
      activeSow: location.sow_set.length > 0 ?
       location.sow_set[0] : null
    })
  }

  decreasePiglets = (e) => {
    const { label } = e.target.dataset
    this.setState({
      ...this.state,
      [label]: this.state[label] - 1,
      total_piglets: this.state.total_piglets - 1
    })
  }

  increasePiglets = (e) => {
    const { label } = e.target.dataset
    this.setState({
      ...this.state,
      [label]: this.state[label] + 1,
      total_piglets: this.state.total_piglets + 1
    })
  }

  clickFarrow = () => {
    this.props.sowFarrow({
      id: this.state.activeSow.id,
      dead_quantity: this.state.dead_piglets,
      mummy_quantity: this.state.mummy_piglets,
      alive_quantity: this.state.alive_piglets,
    })
    this.setState({
      activeSow: null,
      activeSectionId: null,
      activeCellLocationId: null,
      total_piglets: 0,
      mummy_piglets: 0,
      dead_piglets: 0,
      alive_piglets: 0,
      date: null,
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
                  <div className={this.state.activeCellLocationId == location.id ? 
                    'col-md-5 cell cell-active' : 'col-md-5 cell'}
                    onClick={() => this.clickCellLocation(location)}
                    key={location.id}>
                    ID{location.id} 
                    {location.is_empty && 'Пустая'}
                  </div>
              )}
              {locations.length < 1 && 'Выберите секцию'}
            </div>
          </div>
          <div className='col-6'>
              {this.state.activeSow && 
                <div>
                  <h3>Свиноматка {this.state.activeSow.farm_id}</h3>
                  <ul>
                    <li>{this.state.activeSow.id}</li>
                    <li>{this.state.activeSow.farm_id}</li>
                    <li>{this.state.activeSow.status}</li>
                  </ul>
                  <ul>
                    <li>
                        Общее число поросят {this.state.total_piglets}
                    </li>
                    <li>Дата начала опороса {this.state.date}</li>
                    <li>
                      Мертворожденные {this.state.dead_piglets}
                      <button onClick={this.decreasePiglets} data-label='dead_piglets'>
                        -
                      </button>
                      <button onClick={this.increasePiglets} data-label='dead_piglets'>
                        +
                      </button>
                    </li>
                    <li>
                      Муммии {this.state.mummy_piglets}
                      <button onClick={this.decreasePiglets} data-label='mummy_piglets'>
                        -
                      </button>
                      <button onClick={this.increasePiglets} data-label='mummy_piglets'>
                        +
                      </button>
                    </li>
                    <li>
                      Живые {this.state.alive_piglets}
                      <button onClick={this.decreasePiglets} data-label='alive_piglets'>
                        -
                      </button>
                      <button onClick={this.increasePiglets} data-label='alive_piglets'>
                        +
                      </button>
                    </li>
                  </ul>
                  <button onClick={this.clickFarrow}>
                    Записать данные
                  </button>
                </div>
              }
          </div>
      </div>
    )
  }
}

export default WS3SowFarrowTab