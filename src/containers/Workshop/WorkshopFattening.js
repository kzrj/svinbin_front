import React, { Component } from 'react';
import { connect } from 'react-redux';

import Workshop from './Workshop'


class WorkshopFattening extends Workshop {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        incomeTab: true,
        resettlementTab: false,
        innerTransferTab: false,
        transferTab: false,
        transfer75Tab: false,
        cullingTab: false,
        infoTab: false,
      }
    }
	}

  render() {
    return (
      <div className="workshop container">
        <button onClick={this.showState}>state</button>
        <div className='row workshop-menu'>
          <div className={this.state.tabs.incomeTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('incomeTab')}>
            Поступление и взвешивание
          </div>
          <div className={this.state.tabs.resettlementTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('resettlementTab')}>
            Расселение поступивших
          </div>
          <div className={this.state.tabs.innerTransferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('innerTransferTab')}>
            Перемещение
          </div>
          <div className={this.state.tabs.transferTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transferTab')}>
            Перегон УЦ
          </div>
          <div className={this.state.tabs.transfer75Tab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('transfer75Tab')}>
            Перегон 7-5
          </div>
          <div className={this.state.tabs.cullingTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('cullingTab')}>
            Выбраковка
          </div>
          <div className={this.state.tabs.infoTab ? 'tab-active col-sm' : 'col-sm'}
            onClick={() => this.setTab('infoTab')}>
            Инфо
          </div>

        </div>
        
      </div>
    );
  }
}

export default WorkshopFattening;