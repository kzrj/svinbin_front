import React, { Component } from 'react';


class WS1SeminationTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      sow: this.props.sow
    }
  }
  
  componentDidMount() {
    this.props.getSows()
    this.setState({
      sow: this.props.sow
    })
    this.props.sows.length > 0 &&
      this.setState({
        sow: this.props.sows[1]
      })
  }

  getSowsById = () => {
    this.props.sows.length > 0 &&
      this.setState({
        sow: this.props.sows[1]
      })
    this.props.getSows()
    const token = localStorage.getItem('token');
    console.log(token)
    console.log('OOPA')
    console.log(Array.isArray(this.props.sows))
    // this.props.sows.length > 0 &&
    //   this.setState({
    //     sow: this.props.sows[1]
    //   })
    console.log(this.props.sows)
    console.log(this.props.sows[1])
    console.log(this.state.sow)
    
  }

  showSowData = (sow) => {
    console.log(sow)
    this.setState({
      sow: sow
    })
  }

  seminationSow = () => {
    this.props.seminationSow(this.state.sow)
    this.props.getSows()
    console.log('Semination2')
  }

  render() {
    const { sows, sowsData } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            <div className='under-menu-line text-center'>
              <p className="workshop-header-2">ПОИСК ПО ID</p>
            </div>
            <div className='workshop-content-column-1'>
              <input type='text' onChange={this.getSowsById} />
              <ul className='list-unstyled'>
                {sows.length > 0 && this.state.sow &&
                  sows.map(sow => 
                    <li className={sow.id === this.state.sow.id ? 'sow-active' : ''} key={sow.id} onClick={() => this.showSowData(sow)}>
                      {sow.farm_id}
                    </li>)
                }
                {sowsData.fetching && 'Fetching'}
                {!sowsData.fetching && 'Not Fetching'}
                {sows.length > 0 &&
                  sows.map(sow => 
                    <li className={sow.id == sowsData.sow.id ? 'sow-active' : ''} key={sow.id} onClick={() => this.showSowData(sow)}>
                      {sow.farm_id}
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
              {this.state.sow &&
                <div>
                  <ul>
                    <li>{this.state.sow.id}</li>
                    <li>{this.state.sow.location}</li>
                    <li>{this.state.sow.status}</li>
                    <li>{this.state.sow.farm_id}</li>
                  </ul>
                  <ul>
                    <li>{sowsData.sow.id}</li>
                    <li>{sowsData.sow.location}</li>
                    <li>{sowsData.sow.status}</li>
                    <li>{sowsData.sow.farm_id}</li>
                  </ul>
                  <div>
                    <select>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                    </select>
                    <button onClick={this.seminationSow}>
                      Осеменить  
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

export default WS1SeminationTab