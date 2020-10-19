import React, { Component } from 'react';


function PigletsWs3Population(props) {
  const { pigletsData } = props
  return(
    <table>
      <tbody>
        {pigletsData.count_piglets_0_7 && 
          <tr className='mb-0 font-12'>
            <td className='font-600 pr-3 border-0'>{pigletsData.count_piglets_0_7}</td>
            <td className='border-0'> 0-7 д </td>
          </tr>
        }
        {pigletsData.count_piglets_8_14 && 
          <tr className='mb-0 font-12'>
            <td className='font-600 pr-3 border-0'>{pigletsData.count_piglets_8_14}</td>
            <td className='border-0'>8-14 д</td>
          </tr>
        }
        {pigletsData.count_piglets_15_21 && 
          <tr className='mb-0 font-12'>
            <td className='font-600 pr-3 border-0'>{pigletsData.count_piglets_15_21}</td>
            <td className='border-0'>15-21 д</td>
          </tr>
        }
        {pigletsData.count_piglets_22_28 && 
          <tr className='mb-0 font-12'>
            <td className='font-600 pr-3 border-0'>{pigletsData.count_piglets_22_28}</td>
            <td className='border-0'>22-28 д</td>
          </tr>
        }
        {pigletsData.count_piglets_28_plus && 
          <tr className='mb-0 font-12'>
            <td className='font-600 pr-3 border-0'>{pigletsData.count_piglets_28_plus}</td>
            <td className='border-0'>29+ д</td>
          </tr>
        }
      </tbody>
    </table>
  )
}

class WSPopulationAndCellOpsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    }
    this.setData = this.setData.bind(this);
	}

  componentDidMount() {
    this.props.getWsPopulation()
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { populationData } = this.props
    return (
      <div className='mt-1'>
        {populationData && populationData['ws'] &&
          <div>
            <h4 className='text-center'>Всего голов в цехе: {populationData['ws'].sows_count + populationData['ws'].pigs_count}</h4>
            <div className='row mb-0'>
              <div className='col-6 px-0'>
                <div className='card card-style mb-2 rounded-0'>
                  <div className='content my-1'>
                    <p className='mb-0 font-20 text-center'>{populationData['ws'].sows_count} свиноматок</p>
                    <p className='mb-0 font-16 text-center'>{populationData['ws'].sows_sup_count} супоросных</p>
                    <p className='mb-0 font-16 text-center'>
                      {populationData['ws'].sows_count - populationData['ws'].sows_sup_count} кормящих
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-6 px-0'>
                <div className='card card-style mb-2 rounded-0'>
                  <div className='content my-1' style={{"line-height": '20px'}}>
                    <p className='mb-0 font-16 text-center'>
                      Поросят: {populationData['ws'].pigs_count}
                      
                      <span className='mb-0 font-13 text-center pl-3'>
                        Ремонтных: {populationData['ws'].gilts_count}
                      </span>
                    </p>
                    <div className='ml-4'>
                      <PigletsWs3Population pigletsData={populationData['ws']}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              {populationData['sections'].map(section => 
                <div className='col-2 border border-dark bg-white ' style={{"line-height": '18px'}}>
                  <p className='my-0 font-600 text-center'>Секция {section.section_number}</p>
                  <p className='my-0 font-11'>свиноматок 
                    <span className='font-600 ml-1'>{section.sows_count}</span>
                  </p>
                  <p className='my-0 font-10 float-left mr-2'>суп {section.sows_sup_count}</p>
                  <p className='my-0 font-10'>кор {section.sows_count - section.sows_sup_count}</p>
                  <div className='divider mb-1 bg-mainDark-light'></div>
                  <p className='my-0 font-11'>поросята 
                    <span className='font-600 ml-1'>{section.piglets_count ? section.piglets_count : '0'}</span>
                  </p>
                  {section.gilts_count > 0 &&
                    <p className='my-0 font-11'>рем {section.gilts_count}</p>
                  }
                  <PigletsWs3Population pigletsData={section}/>
                </div>
                )}
            </div>
          </div>
        }
      </div>
    );
  }
}


export default WSPopulationAndCellOpsComponent