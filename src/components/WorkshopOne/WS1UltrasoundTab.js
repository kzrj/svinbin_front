import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowTable }  from '../../components/WorkshopOne/SowComponents'
import { SowFarmIdFilter, SowTourFilter, SowUsound30Filter }  from '../../components/WorkshopOne/SowComponents'


class WS1Ultrasound60Tab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        by_workshop_number: 1,
        status_title: 'Осеменена 2',
        tour: null,
      },
      choosedSows: [],
      farmId: null,
      days: 30,
      result: true,
      needToRefresh: false
    };
    this.setQuery = this.setQuery.bind(this);
    this.sowClick = this.sowClick.bind(this);
    this.setData = this.setData.bind(this);
    this.massUltrasound = this.massUltrasound.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }

  componentDidMount() {
    // query
    this.props.getSows(this.state.query)
    this.props.getTours()
  }

  showState = () => {
    console.log(this.state)
    // <button onClick={this.showState}>
    //   State
    // </button>
  }

  setQuery (e) {
    let { query } = this.state
    query[e.target.name] = e.target.value

    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        query: query
      },
      choosedSows: [],
      needToRefresh: true
    })
    // this.props.getSows(query)
  }
  
  sowClick (e) {
    let { choosedSows } = this.state
    const { id } = e.target.dataset
    choosedSows = toggleArray(choosedSows, id)
    this.setState({
      ...this.state,
      choosedSows: choosedSows
    })
  }

  // Usound data
  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  massUltrasound () {
    const data = {
      sows: this.state.choosedSows,
      days: this.state.days,
      result: this.state.result
    }
    this.props.massUltrasound(data)
    this.setState({
      ...this.state,
      choosedSows: [],
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (this.state.needToRefresh) {
      this.setState({...this.state, needToRefresh: false})
      this.props.getSows(this.state.query)
    }
  }

  render() {
    const { sows, tours } = this.props
    this.refreshSowsList()
    return (
      <div className='workshop-content'>
        <div>
          <div className='commonfilter row'>
            <SowFarmIdFilter setQuery={this.setQuery} />
            <SowTourFilter tours={tours} setQuery={this.setQuery}/>
            <SowUsound30Filter setQuery={this.setQuery}/>
          </div>
          <div>
            <div>
              УЗИ
              <div className="input-group">
                
                <select className="custom-select" id="inputGroupSelect04" 
                  onChange={this.setData} name='days'>
                  <option selected value='30'>30 дней</option>
                  <option value='60' >60 дней</option>
                </select>
                <select className="custom-select" id="inputGroupSelect04" 
                  onChange={this.setData} name='result'>
                  <option selected value={true}>Супорос</option>
                  <option value={false}>Прохолост</option>
                </select>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" 
                    onClick={this.massUltrasound}>
                    Провести УЗИ
                  </button>
                </div>
                </div>
            </div>
          </div>
        </div>
        <div className='commonfilter-results'>
          <div className='count row'>
              <div className='col-6'>
                Выбрано {this.state.choosedSows.length} из {sows.length}
              </div>
              {/* <div className='col-6'>
                <button onClick={this.chooseAll}>Выбрать всех</button>
              </div> */}
            </div>
          <SowTable sows={sows} sowClick={this.sowClick} choosedSows={this.state.choosedSows}/>
        </div>
      </div>
    )
  }
}

export default WS1Ultrasound60Tab