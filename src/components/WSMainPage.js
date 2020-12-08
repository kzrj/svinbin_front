import React, { Component } from 'react';

import WSPopulationAndCellOpsComponent from '../components/Reports/WSPopulationAndCellOps'


const Button = ({tab, setTab}) => (
  <button className='btn bg-mainDark-dark mx-1 my-1 font-12 text-wrap' onClick={() => setTab(tab)}>
    {tab.title}
  </button>
)

class WSMainPage extends Component {
   constructor(props) {
    super(props);
  }
  
  render() {
    const { ws_number, setTab, tabs } = this.props

    return (
        <div className='container-fluid'>
          {/* <h1>Цех {ws_number}</h1> */}
          <p className='my-0 font-15'>Свиноматки</p>
          <div className='d-flex justify-content-around table-responsive'>
            <Button tab={{name: 'searchSowTab', title: 'Поиск по всем цехам'}} setTab={setTab}/>
            <Button tab={{name: 'comingSowsTab', title: 'Поступление матки'}} setTab={setTab}/>
            <Button tab={{name: 'farrowTab', title: 'Опорос'}} setTab={setTab}/>
            <Button tab={{name: 'nurseSowTab', title: 'Кормилица'}} setTab={setTab}/>
            <Button tab={{name: 'sowCullingTab', title: 'Выбытие' }} setTab={setTab}/>
            <Button tab={{name: 'sowInnerTransferTab', title: 'Перемещение из клетки в клетку'}} 
              setTab={setTab}/>
            <Button tab={{name: 'sowTransferToWsTab', title: 'Перегон в цех1, цех3'}} setTab={setTab}/>
            <Button tab={{name: 'sowAndPigletsTransferTab',
              title: 'Перемещение вместе с поросятами из клетки в клетку'}} setTab={setTab}/>
          </div>

          <p className='my-0 font-15'>Поросята</p>
          <div className='d-flex justify-content-start'>
            <Button tab={{name: 'returnPigletsTab', title: 'Возврат поросята'}} setTab={setTab}/>
            <Button tab={{name: 'weaningPigletsTab', title: 'Отъем '}} setTab={setTab}/>
            <Button tab={{name: 'createGiltTab', title: 'Биркование'}} setTab={setTab}/>
            <Button tab={{name: 'pigletsCullingTab', title: 'Выбытие '}} setTab={setTab}/>
            <Button tab={{name: 'pigletsInnerTransferTab', title: 'Перемещение из клетки в клетку'}} 
              setTab={setTab}/>
            <Button tab={{name: 'pigletsRecountTab', title: 'Пересчет'}} setTab={setTab}/>
          </div>

          <p className='my-0 font-15'>Информация</p>
          <div className=''>
            <Button tab={{name: 'operationsTab', title: 'Операции'}} setTab={setTab}/>
            <Button tab={{name: 'reportsTab', title: 'Отчет'}} setTab={setTab}/>
          </div>

          <WSPopulationAndCellOpsComponent 
              getWsPopulation={this.props.getWsPopulation}
              populationData={this.props.populationData}
            />

          {/* {tabs.map(tab =>
            <button className='btn bg-mainDark-dark mx-2 my-2 font-20' onClick={() => setTab(tab)}>
              {tab.title}
            </button>
            )} */}
        </div>
    )
  }
}

export default WSMainPage