import React, { Component }  from 'react';

export const WhoIs = (props) => (
    <span className='whois'>{props.user ? props.user.user : 'Не залогинен'}</span>)