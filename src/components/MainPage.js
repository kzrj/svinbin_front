import React, { Component } from 'react';
import { Link } from 'react-router';


const MainMenuLink = (props) => (
    <button type="button" class="btn btn-secondary">
      <Link to={props.url}>{props.title}</Link>
    </button>
)

class MainPage extends Component {
   constructor(props) {
    super(props);
  }
  
  render() {
    
    return (
        <div className='main-page container-fluid'>
          <h1>Свинокомплекс Николаевский</h1>
          <div className="btn-group-vertical">
            <MainMenuLink url={'/workshop1/'} title={'Цех1 Осеменение'}/>
            <MainMenuLink url={'/workshop2/'} title={'Цех2 Ожидание родов'}/>
            <MainMenuLink url={'/workshop3/'} title={'Цех3 Маточник'}/>
            <MainMenuLink url={'/workshop4/'} title={'Цех4 Доращивание'}/>
            <MainMenuLink url={'/workshop8/'} title={'Цех8 Доращивание'}/>
            <MainMenuLink url={'/workshop5/'} title={'Цех5 Откорм'}/>
            <MainMenuLink url={'/workshop6/'} title={'Цех6 Откорм'}/>
            <MainMenuLink url={'/workshop7/'} title={'Цех7 Откорм'}/>
            <MainMenuLink url={'/workshop75/'} title={'Цех7-5 Секция ремонтных свинок'}/>
            <MainMenuLink url={'/workshop9/'} title={'Убойный Цех'}/>
          </div>
        </div>
    )
  }
}

export default MainPage