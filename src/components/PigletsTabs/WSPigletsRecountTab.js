import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../Locations'
import { PigletsGroup } from '../PigletsRepresentations'
import { Message } from '../CommonComponents'

class WSPigletsRecountTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,
      activeSectionId: null,
      activeCellId: null,

      new_quantity: null,
      comment: null,

      needToRefresh: false,
    }
    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.setData = this.setData.bind(this);
    this.setIsGilt = this.setIsGilt.bind(this);
    this.recountPiglets = this.recountPiglets.bind(this);
  }

  componentDidMount() {
    this.props.pigletsResetErrorsAndMessages()
    this.props.getRecountBalance()
  }
  
  clickSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })
    this.props.getLocations({by_section: sectionId, cells_piglets: true})
  }

  clickLocation (location) {
    this.setState({
      ...this.state,
      activeCellId: location.id,
      activePiglets: location.piglets.length > 0 ?
        location.piglets[0] : null
    })
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  setIsGilt () {
    this.setState({
      ...this.state,
      is_it_gilt: !this.state.is_it_gilt
    })
  }

  recountPiglets () {
    const { new_quantity, comment, activePiglets } = this.state
    this.props.recountPiglets({
      id: activePiglets.id,
      new_quantity: new_quantity,
      comment: comment,
    })
    this.setState({
      ...this.state,
      new_quantity: null,
      comment: 0,

      needToRefresh: true, 
      activeLocation: null,
      activePiglets: null,
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
        this.props.getRecountBalance()
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { sections, locations, recountData, grid} = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
            <Sections 
              sections={sections}
              activeSectionId={this.state.activeSectionId}
              clickSection={this.clickSection}
            />
            <PigletsCells
              isSection={this.state.activeSectionId}
              fetching={this.props.locationsFetching}
              locations={locations}
              activeCellIds={[this.state.activeCellId]}
              clickLocation={this.clickLocation}
              grid={grid}
            />
          </div>
          <div className='col-6'>
            {recountData && 
              <div className=''>
                <p className=''>Общий баланс по цеху: 
                  <span className='pl-3 font-weight-bold'>
                    {recountData.ws_balance >= 0 
                      ? (recountData.ws_balance === 0 || recountData.ws_balance === null)
                        ? '0'
                        : <span className='text-primary'>{'+' + recountData.ws_balance}</span> 
                      : <span className='text-danger'>{recountData.ws_balance}</span>
                    }
                  </span>
                </p>
                {recountData.sections && recountData.sections.map(section =>
                  <p className='mb-0'>по секции {section.number}: 
                    <span className='pl-3 font-weight-bold'>
                      {section.balance 
                        ? section.balance && section.balance > 0 
                              ? <span className='text-primary'>{'+' + section.balance}</span>
                              : <span className='text-danger'>{section.balance}</span>
                        : '0'
                        }
                      </span>
                  </p>
                  )}
              </div>
            }
            <hr />
            {this.state.activePiglets && 
              <div>
                <p>Пересчет</p>
                {this.state.activePiglets ?
                  <div>
                    <PigletsGroup piglets={this.state.activePiglets}/>
                    <div className="input-group-append">
                      <input type='text' value={this.state.quantity} 
                        onChange={this.setData} 
                        name='new_quantity' className="form-control search-input"
                        placeholder="Новое количество" />

                      <input type='text' value={this.state.quantity} 
                        onChange={this.setData} 
                        name='comment' className="form-control search-input"
                        placeholder="Комментарий" />
                      
                      <button className='btn btn-outline-secondary' type='button'
                        onClick={this.recountPiglets}
                        >
                          Пересчитать
                      </button>
                    </div>
                    
                  </div>
                  :
                  this.props.message ? <Message message={this.props.message} /> :
                    <Message message={'Выберите клетку'} />
                }
              </div>
            }
        </div>
      </div>
    )
  }
}

export default WSPigletsRecountTab