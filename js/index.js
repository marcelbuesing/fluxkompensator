import * as React from 'react';
import * as ReactDOM from 'react-dom';

const e = React.createElement;

import("../crate/pkg").then(module => {
  module.run();

    class DbcFileInput extends React.Component {
      render() {
        const dbc_input_wrapper = e('div', {},
          e('label', { htmlFor: 'dbc_input'}, 'DBC File Input: '),
          e('input', { type: 'file', accept: '.dbc', name: 'dbc_input', onChange: (e) => { this.props.handleDBCFiles(Array.from(e.target.files)) } })
        );
        return dbc_input_wrapper;
      }
    }

    class DbcMessage extends React.Component {
      render() {
        const signals = this.props.signals.map((signal) => {

          return e(DbcSignal, {
            key: signal.name,
            ...signal
          });
        });

        return e('div', { className: 'z-depth-2' },
          e('h2', {key: 'h2' }, '' + this.props.name,
            e('span', {key: 'id', className: 'indigo new badge'}, 'Message ID: ' + this.props.id)
          ),
          e('div', {key: 'size'}, 'Size: ' + this.props.size + " bytes"),
          e('div', { key: 'transmitter' }, 'Transmitter: ' + this.props.transmitter),
          e('h4', {key: 'title_signals' }, 'Signals'),
          e('table', {},
            e('thead', {},
              e('tr', {},
              [
                  e('th', { key: this.props.id + 1 }, 'Name'),
                  e('th', { key: this.props.id + 2 }, 'ByteOrder'),
                  e('th', { key: this.props.id + 3}, 'Factor'),
                  e('th', { key: this.props.id + 4 }, 'Min'),
                  e('th', { key: this.props.id + 5 }, 'Max'),
                  e('th', { key: this.props.id + 6 }, 'MultiplexIndicator'),
                  e('th', { key: this.props.id + 7 }, 'Offset'),
                  e('th', { key: this.props.id + 8 }, 'Size (bits)'),
                  e('th', { key: this.props.id + 9 }, 'Start Bit'),
                  e('th', { key: this.props.id + 10 }, 'Unit'),
                  e('th', { key: this.props.id + 11 }, 'Value Type'),
              ]
            )
          ),
          signals,
          e('br', {})
          ),
        );
      }
    }

    class DbcSignal extends React.Component {

      render() {
        return e('tbody', {},
            e('tr', {},
            [
              e('td', { key: 'name' }, '' + this.props.name),
              e('td', { key: 'byte_order' }, '' + this.props.byte_order),
              e('td', { key: 'factor' }, '' + this.props.factor),
              e('td', { key: 'min' }, '' + this.props.min),
              e('td', { key: 'max' }, '' + this.props.max),
              e('td', { key: 'multiplex_indicator' }, '' + this.props.multiplexer_indicator),
              e('td', { key: 'offset' }, '' + this.props.offset),
              e('td', { key: 'signal_size' }, '' + this.props.signal_size),
              e('td', { key: 'start_bit' }, '' + this.props.start_bit),
              e('td', { key: 'unit' }, '' + this.props.unit),
              e('td', { key: 'value_type' }, '' + this.props.value_type)
            ]
          )
        );
      }
    }

    class App extends React.Component {

      constructor(props) {
        super(props);

        this.state = {
          messages: []
        };

        this.handleDBCFiles = this.handleDBCFiles.bind(this)
      }

      handleDBCFiles(dbcFiles)
      {
          console.log(dbcFiles);
          const as_dbcs = dbcFiles.map((dbc_file) => {
              const reader = new FileReader();
              reader.onload = () => {
                const dbc_out = module.from_dbc(reader.result);
                this.setState({
                  messages: dbc_out.messages
                });
              };
              reader.readAsText(dbc_file);
          });
      }

      render() {
        const messages = this.state.messages.map((msg) => {
          return e(DbcMessage, { key: msg.id, id: msg.message_id, name: msg.message_name, size: msg.message_size, signals: msg.signals, transmitter: msg.transmitter });
        });

        return e('div', {},
          e(DbcFileInput, { handleDBCFiles: this.handleDBCFiles }),
          messages
        );
      }
    }

    ReactDOM.render(
      React.createElement(App, {}, null),
      document.getElementById('app')
    );

});