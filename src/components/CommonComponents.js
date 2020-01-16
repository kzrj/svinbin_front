import React, { Component }  from 'react';

export const WhoIs = (props) => (
    <span className='whois'>{props.user ? props.user.user : 'Не залогинен'}</span>)

export const Message = (props) => (
    <p className='message'>{props.message}</p>)

export const ErrorMessage = (props) => (
    <p className='error-message'>{props.error.data.message}</p>)

export const TabMenu = (props) => (
    <div className="pos-f-t">
        <div className="collapse" id="navbarToggleExternalContent">
            <div className='workshop-header-3'>
            </div>
            <div className='row workshop-menu'>
                {props.tabs.map((tab, key) =>
                <div 
                    key={key}
                    className={tab.active ? 'workshop-tab tab-active col-sm' : 'workshop-tab col-sm'}
                    onClick={() => props.setTab(tab)}
                >
                    {tab.title}
                </div>
                )}
            </div>
        </div>
        <nav className="navbar navbar-dark nav-workshop-header">
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" 
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {props.workshop} {props.activeTab.title}
            <WhoIs user={props.user}/>
        </nav>
    </div>
)