import React, { Component }  from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const WhoIs = (props) => (
    <span className='whois'>{props.user ? props.user.user : 'Не залогинен'}</span>)

export const Message = (props) => (
    <p className={props.className ? 'message ' + props.className : 'message'}>
        {props.message}</p>)

export const LoadingMessage = (props) => (
    <div className='text-center my-5 mx-5'><CircularProgress className='color-mainDark-dark'/></div>)

export const ErrorMessage = (props) => (
    <p className={props.className ? 'error-message ' + props.className : 'error-message'}>ОШИБКА: 
        {props.error.data ? props.error.data.message : props.error.message ? 
            props.error.message :'Неизвестная ошибка.'}</p>)

export function ErrorOrMessage (props) {
    return (
        props.fetching 
            ? <LoadingMessage />
            : props.error 
                ? <ErrorMessage error={props.error} className={props.className}/>
                : <Message message={props.message} className={props.className}/>
    )
}

export class TabMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showMenu: false,
        }
    }

    render () {
        let buttonClass = 'workshop-tab col-2 font-12 text-center'
        return (
        <div className="">
            <div className="collapse" id="menuNavBar">
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
                <p className="float-left font-11 font-600 color-white ml-3 mb-0"
                    data-toggle="collapse" 
                    data-target="#menuNavBar" aria-expanded="false" aria-controls="menuNavBar"
                    onClick={() => this.setState({...this.state, showMenu: !this.state.showMenu})}
                    >
                    <span className='text-uppercase'>
                        {this.state.showMenu ? 'скрыть меню' : 'показать меню'} 
                    </span>
                {/* {this.props.online 
                    ? <span style={{"color": "green", "float": "left"}}>Online</span> 
                    : <span style={{"color": "red", "float": "left"}}>Offline</span>} */}
                {/* <div className='clearfix'></div> */}
                </p>
                <span className='d-inline'>{this.props.workshop} {this.props.activeTab.title}</span>
                <span className='d-inline ml-3'>{this.props.user ? this.props.user.user : 'Не залогинен'}</span>
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