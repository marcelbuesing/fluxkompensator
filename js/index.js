import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {DbcFileInput} from './dbc-file-input.jsx';
import {DbcRenderingProgress} from './dbc-rendering-progress.jsx';
import {DbcMessage} from './dbc-message.jsx';
import {NavBar} from './navbar.jsx';

const e = React.createElement;

import("../crate/pkg").then(module => {
  module.run();

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