import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowTable }  from '../../components/WorkshopOne/SowComponents'
import { SowFilter, SowFarmIdFilter, SowTourFilter, SowUsound30Filter }  from '../../components/WorkshopOne/SowComponents'


class WS1UltrasoundTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        by_workshop_number: 1,
        farm_id_isnull: false,
        not_in_tour: false,
        suporos: null,
        seminated: 2,
        tour: null,
      },
      choosedSows: [],
      farmId: null,
      days: 30,
      result: true,
    };
    this.setQuery = this.setQuery.bind(this);
    this.setSeminatedSuporosStatus = this.setSeminatedSuporosStatus.bind(this);
    this.sowClick = this.sowClick.bind(this);
    this.setData = this.setData.bind(this);
    this.massUltrasound = this.massUltrasound.bind(this);
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
      }
    })
    this.props.getSows(query)
  }
  
  setSeminatedSuporosStatus (e) {
    let { query } = this.state
    let finalQuery = {}
    const filter = e.target.value.split('=')[0]
    const value = e.target.value.split('=')[1]
    if (filter == 'seminated')
      finalQuery = {...query, [filter]:value, suporos: null}
    if (filter == 'suporos')
      finalQuery = {...query, [filter]:value, seminated: null}
    this.setState({
      ...this.state,
      query: finalQuery
    })
    this.props.getSows(finalQuery)
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
    this.props.getSows(this.state.query)
  }

  render() {
    const { sows, tours } = this.props
    return (
      <div className='workshop-content'>
         <button onClick={this.showState}>
           State
         </button>
        <div>
          <div className='commonfilter row'>
            <SowFarmIdFilter setQuery={this.setQuery} />
            <SowTourFilter tours={tours} setQuery={this.setQuery}/>
            <SowUsound30Filter setSeminatedSuporosStatus={this.setSeminatedSuporosStatus}/>
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
          <SowTable sows={sows} sowClick={this.sowClick} choosedSows={this.state.choosedSows}/>
        </div>
      </div>
    )
  }
}

export default WS1UltrasoundTab