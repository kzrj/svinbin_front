import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../Locations'
import { PigletsGroup } from '../PigletsRepresentations'


class WS3PigletsRecountTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSectionId: 6,
      activeLocationsId: null,
      activeLocation: null,
      activeNewbornGroup: null,
      
      quantity: null,
      needToRefresh: false
    };
    this.clickLocation = this.clickLocation.bind(this);
    this.clickSection = this.clickSection.bind(this);
    this.setData = this.setData.bind(this);
    this.recountPiglets = this.recountPiglets.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }

  componentDidMount(){
    this.props.getBalancesbyTours()
  }
  
  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })

    this.props.getLocations({by_section: sectionId})
  }

  clickLocation (location) {
    let activeNewbornGroup = null
    if (location.newbornpigletsgroup_set.length > 0){
      activeNewbornGroup = location.newbornpigletsgroup_set[0]
    }
    this.setState({
      ...this.state,
      activeLocationsId: location.id,
      activeLocation: location,
      activeNewbornGroup: activeNewbornGroup
    })
  }
  
  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  recountPiglets () {
    const { quantity, activeNewbornGroup } = this.state
    this.props.recountPiglets({
      id: activeNewbornGroup.id,
      quantity: quantity
    })
    this.setState({
      ...this.state,
      quantity: null,
      needToRefresh: true, 
      activeLocation: null,
      activeNewbornGroup: null,
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        if (this.state.activeSectionId) {
          this.props.getLocations({by_section: this.state.activeSectionId})
          this.props.getBalancesbyTours()
        }
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { sections, locations, balancesData } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-8'>
          <Sections 
              sections={sections}
              activeSectionId={this.state.activeSectionId}
              clickSection={this.clickSection}
              error={this.props.sectionsListError}
            />
            <PigletsCells
              isSection={this.state.activeSectionId}
              locations={locations}
              activeCellIds={[this.state.activeLocationsId]}
              clickLocation={this.clickLocation}
              error={this.props.locationsListError}
            />
          </div>
          <div className='col-4'>
            {balancesData &&
              <table className='table table-sm table-balances'>
                <thead className='thead-dark'>
                  <th>Тур(неделя)</th>
                  <th>Отняли</th>
                  <th>Прибавили</th>
                  <th>Баланс</th>
                  <th>Всего поросят</th>
                </thead>
                <tbody>
                  {balancesData.map(tourData => 
                    <tr>
                      <th scope='row'>{tourData.title}</th>
                      <td>{tourData.negative}</td>
                      <td>+{tourData.positive}</td>
                      <td>{tourData.balance}</td>
                      <td>{tourData.count_newborn_piglets}</td>
                    </tr>)}
                </tbody>
              </table>
              }
            {this.state.activeNewbornGroup ?
              <div>
                <PigletsGroup piglets={this.state.activeNewbornGroup}/>
                <div className="input-group-append">
                  <label>Новое количество</label>
                  <input type='text' 
                      onChange={this.setData} 
                      name='quantity' value={this.state.quantity}/>
                  <button className='btn btn-outline-secondary' type='button'
                    onClick={this.recountPiglets}
                    >
                      Изменить количество
                  </button>
                </div>
              </div>
              :
              this.props.message ? <p>{this.props.message}</p> : <p>Выберите клетку</p>
            }
          </div>
        </div>
    )
  }
}

export default WS3PigletsRecountTab