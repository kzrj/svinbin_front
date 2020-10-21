import React, { Component }  from 'react';

export const WhoIs = (props) => (
    <span className='whois'>{props.user ? props.user.user : 'Не залогинен'}</span>)

export const Message = (props) => (
    <p className='message my-0'>{props.message}</p>)

export const LoadingMessage = (props) => (
    <p className='loading'>Загрузка</p>)

export const ErrorMessage = (props) => (
    <p className='error-message'>ОШИБКА: 
        {props.error.data ? props.error.data.message : props.error.message ? 
            props.error.message :'Неизвестная ошибка.'}</p>)


export class TabMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showMenu: false,
        }
      this.showMenu = this.showMenu.bind(this);
    }

    showMenu () {

    }
    
    render () {
        let buttonClass = 'workshop-tab col-2 font-12 text-center'
        return (
        <div className="pos-f-t">
            {/* <div className="collapse" id="navbarToggleExternalContent"> */}
            <div className="collapse" id="menuNavBar">
                {/* <div className='workshop-header-3'>
                </div> */}
                <div className='bg-mainDark-dark pt-3 workshop-menu'>
                </div>
                <div className='row workshop-menu mb-0'>
                    {this.props.tabs.map((tab, key) =>
                    <div 
                        key={key}
                        className={tab.active ? buttonClass + ' tab-active' : buttonClass}
                        onClick={() => this.props.setTab(tab)}
                    >
                        {tab.title}
                    </div>
                    )}
                </div>
            </div>
            <nav className="nav-workshop-header">
                <a className="float-left font-11 font-600 color-white text-uppercase ml-3"
                    data-toggle="collapse" 
                    data-target="#menuNavBar" aria-expanded="false" aria-controls="menuNavBar"
                    onClick={() => this.setState({...this.state, showMenu: !this.state.showMenu})}
                    >
                    {this.state.showMenu ? 'скрыть меню' : 'показать меню'} 
                </a>
                {/* {this.props.online 
                    ? <span style={{"color": "green", "float": "left"}}>Online</span> 
                    : <span style={{"color": "red", "float": "left"}}>Offline</span>} */}
                {/* <div className='clearfix'></div> */}
                {this.props.workshop} {this.props.activeTab.title}
                <WhoIs user={this.props.user}/>
            </nav>
        </div>
        )
    }
}

export function FetchingErrorComponentMessage(props) {
    const { fetching, error, component, divClassName } = props
    let message = props.message ? props.message : null
    return(
        fetching 
            ? <LoadingMessage />
            : error 
              ? <ErrorMessage error={error} />
              : <div className={divClassName}>{component} {message && <Message message={message}/>}</div>
    )
}

export function FetchingErrorMessage(props) {
    const { fetching, error, message } = props
    return(
        fetching 
            ? <LoadingMessage />
            : error 
              ? <ErrorMessage error={error} />
              : message 
                ? <Message message={message}/> 
                : null
    )
}