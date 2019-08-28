import React, { Component } from 'react';
import { Link } from 'react-router';


class MainPage extends Component {
   constructor(props) {
    super(props);
  }
  
  render() {
    
    return (
        <div className='main-page'>
          <div><h1>Main page</h1></div>
          <div>
            <ul>
              <li><Link to={'/workshop1/'}>Цех1 Осеменение</Link></li>
              <li><Link to={'/workshop2/'}>Цех2 Ожидание родов</Link></li>
              <li><Link to={'/workshop3/'}>Цех3 Маточник</Link></li>
              <li><Link to={'/workshop4/'}>Цех4 Доращивание</Link></li>
              <li><Link to={'/workshop8/'}>Цех8 Доращивание</Link></li>
              <li><Link to={'/workshop5/'}>Цех5 Откорм</Link></li>
              <li><Link to={'/workshop6/'}>Цех6 Откорм</Link></li>
              <li><Link to={'/workshop7/'}>Цех7 Откорм</Link></li>
              <li><Link to={'/workshop75/'}>Цех7-5 Секция ремонтных свинок</Link></li>
              <li><Link to={'/workshop9/'}>Убойный Цех</Link></li>
              <li><Link to={'/init_sows/'}>Инициализация маток</Link></li>
            </ul>
          </div>
        </div>
    )
  }
}

export default MainPage