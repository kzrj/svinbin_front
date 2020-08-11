import React, { Component } from 'react';
import { Link } from 'react-router';


const MainMenuLink = (props) => (
    <div className="col-3 ws-home">
      {/* <Link to={props.url}>{props.title}</Link> */}
      <a href={props.url}>{props.title}</a>
    </div>
)

class MainPage extends Component {
   constructor(props) {
    super(props);
  }
  
  render() {
    
    return (
        <div className='main-page container-fluid'>
          <h1>Свинокомплекс Николаевский</h1>
          <div className="row">
            <MainMenuLink url={'/workshop1/'} title={'Цех1 Осеменение'}/>
            <MainMenuLink url={'/workshop2/'} title={'Цех2 Ожидание родов'}/>
            <MainMenuLink url={'/workshop3/'} title={'Цех3 Маточник'}/>
            <MainMenuLink url={'/workshop4/'} title={'Цех4 Доращивание'}/>
            <MainMenuLink url={'/workshop8/'} title={'Цех8 Доращивание'}/>
            <MainMenuLink url={'/workshop5/'} title={'Цех5 Откорм'}/>
            <MainMenuLink url={'/workshop6/'} title={'Цех6 Откорм'}/>
            <MainMenuLink url={'/workshop7/'} title={'Цех7 Откорм'}/>
            <MainMenuLink url={'/workshop_boar/'} title={'Хрячник'}/>
            <MainMenuLink url={'/reports/'} title={'Отчеты'}/>
          </div>
        </div>
    )
  }
}

export default MainPage