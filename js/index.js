import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../logo.jpg'

import {DbcFileInput} from './dbc-file-input.jsx';
import {DbcRenderingProgress} from './dbc-rendering-progress.jsx';
import {DbcMessage} from './dbc-message.jsx';

const e = React.createElement;

import("../crate/pkg").then(module => {
  module.run();
    class NavBar extends React.Component {

      render() {
          return e('nav', {
              className: 'navbar navbar-expand-md navbar-default'
            },
            e('a', { className: 'navbar-brand text-light' },
              e('img', { src: logo, className: 'logo' }),
              'Fluxkompensator'
            ),
            e('button', {
                className: 'navbar-toggler',
                type: 'button',
                'data-toggle': 'collapse',
                'data-target': '#navbar',
                'aria-controls': 'navbar',
                'aria-expanded': false,
                'aria-label': 'Toggle navigation'
              },
              e('span', { className: 'navbar-toggler-icon' })
            ),
            e('div', {
                className: 'collapse navbar-collapse',
                id: 'navbar'
              },
              e('ul', { className: 'navbar-nav mr-auto' },
                e('li', { className: 'nav-item active'},
                  e('a', {
                      key: 'dbc',
                      className: 'nav-link',
                    }, 'DBC'
                  )
                ),
                e('li', { className: 'nav-item'},
                  e('a', {
                      key: '...',
                      className: 'nav-link',
                    }, '...'
                  )
                )
              )
            )
          )
      }

    }


    class App extends React.Component {

      constructor(props) {
        super(props);

        this.state = {
          messages: [],
          progress: 0,
        };

        this.handleDBCFiles = this.handleDBCFiles.bind(this)
      }

      handleDBCFiles(dbcFiles)
      {
        const dbc_file = dbcFiles[0];
          this.setState({
            messages: [],
            progress: 1,
          });

          const reader = new FileReader();
          reader.onload = () => {

            const dbc_out = module.from_dbc(reader.result);
            this.setState({
              messages: dbc_out.messages,
              progress: 2,
            });
          };
          reader.readAsText(dbc_file);
     }

      render() {
        const messages = this.state.messages.map((msg) => {
          return e(DbcMessage, { key: msg.id, id: msg.message_id, name: msg.message_name, size: msg.message_size, signals: msg.signals, transmitter: msg.transmitter });
        });

        return e('div', {},
          [
            e(NavBar, {}),
            e(DbcFileInput, { handleDBCFiles: this.handleDBCFiles }),
            e(DbcRenderingProgress, { progress: this.state.progress }),
            messages
          ]
        );
      }
    }

    ReactDOM.render(
      React.createElement(App, {}, null),
      document.getElementById('app')
    );

});