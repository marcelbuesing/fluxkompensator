import * as React from 'react';

import logo from '../logo.jpg'

export class NavBar extends React.Component {

    render() {
        return (
            <nav className='navbar navbar-expand-md navbar-default'>
                <a className='navbar-brand text-light' href='/'><img src={logo} className="logo" />Fluxkompensator</a>
                <button
                    aria-expanded='false'
                    data-target='#navbar'
                    className='navbar-toggler'
                    type='button'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className='navbar-nav mr-auto'>
                        <li>
                            <a>About</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

}