import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const e = React.createElement;

const hashStringToColor = str => {
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }
  var r = (hash & 0xFF0000) >> 16;
  var g = (hash & 0x00FF00) >> 8;
  var b = hash & 0x0000FF;
  return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
};

import("../crate/pkg").then(module => {
  module.run();

    class NavBar extends React.Component {

      render() {
          return e('nav', {
              className: 'navbar navbar-expand-md navbar-dark bg-dark'
            },
            e('a', { className: 'navbar-brand bg-dark text-light' }, 'ECU-Web'),
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
    class DbcFileInput extends React.Component {

      dragOverHandler(ev) {
        ev.preventDefault();
      }

      dropHandler(ev) {
        ev.preventDefault();

        if (ev.dataTransfer.items) {
          const files = ev.dataTransfer.items
            .filter((item) =>  item.kind === 'file')
            .map((item) => item.getAsFile());

          this.props.handleDBCFiles(Array.from(files));
        } else {
          this.props.handleDBCFiles(Array.from(e.dataTransfer.files));
        }
      }

      render() {
        const dbc_input_wrapper =
          e('form', {},
            e('div', { className: 'form-group' },
              e('label', { htmlFor: 'dbcInput'}, 'Choose a file or drag it here '),
              e('input', { className:'form-control-file', type: 'file', accept: '.dbc', name: 'dbcInput', id: 'dbcInput', onChange: (e) => { this.props.handleDBCFiles(Array.from(e.target.files)) } })
            )
          );
        return dbc_input_wrapper;
      }
    }

    class FormGroupRow extends React.Component {

      render() {
        return e('div' , { className: 'form-group col-md-4' },
            e('label', { htmlFor: 'messageId' }, this.props.label ),
            e('input', { type: 'text', readOnly: 'true', className: 'form-control', id: 'messageId', value: this.props.value })
          );
      }
    }

    class SignalBytes extends React.Component {

      render() {
        const PAYLOAD_BITS = [...Array(8*8).keys()];

        const bit_color_map = this.props.signals.reduce((acc, signal) => {
          const signalHash = signal.name + signal.offset + signal.signal_size + signal.start_bit;
          const color = hashStringToColor(signalHash);
          for (var i=signal.start_bit; i < (signal.start_bit + signal.signal_size); i++) {
            acc[i] = color;
          }
          return acc;
        }, []);



        const bits = PAYLOAD_BITS.reduce((acc, bitIndex) => {
          const color = bit_color_map[bitIndex];
          if (color == null) {
            const col =  e('th', { key: 'th' + this.props.id + bitIndex }, '' + bitIndex);
            acc.currentRow.push(col);
          } else {
            const col = e('th', { key: 'th' + this.props.id + bitIndex, style: { backgroundColor: color } }, '' + bitIndex);
            acc.currentRow.push(col);
          }

          if (bitIndex % 8 == 7) {
            const newRow = e('tr', { key: 'tr' + this.props.id + bitIndex }, acc.currentRow);
            acc.rows.push(newRow);
            acc.currentRow = [];
          }

          return acc;
        }, { rows: [], currentRow: [] });

        return e('table', { key: this.props.id, className: 'table table-bordered signal-bytes' },
          e('tbody', { key: this.props.id },
            bits.rows
          )
        )
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

        return e('div', { className: 'dbc-message' },
          e('h2', {key: 'h2' }, '' + this.props.name),
          e('form', {},
            e('div', { className: 'form-row' },
              e(FormGroupRow, { label: 'CAN-ID', value: this.props.id }),
              e(FormGroupRow, { label: 'Size', value: this.props.size }),
              e(FormGroupRow, { label: 'Transmitter', value: this.props.transmitter }),
            )
          ),
          e('h4', { key: this.props.id + 'title_signals' }, 'Signals'),
          e('table', { className: 'table table-hover table-light' },
            e('thead', { className: 'thead-dark' },
              e('tr', {},
              [
                e('th', { key: this.props.id + 0 }, ''),
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
          ),
          e('h4', { key: this.props.id + 'title_payload' }, 'Message Payload'),
          e(SignalBytes, { signals: this.props.signals })
        );
      }
    }

    class DbcSignal extends React.Component {

      render() {
        const signalHash = this.props.name + this.props.offset + this.props.signal_size + this.props.start_bit;
        const headerStyle = { backgroundColor: hashStringToColor(signalHash) };
        return e('tbody', {},
            e('tr', {},
            [
              e('th', { style: headerStyle }),
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
          [
            e(NavBar, {}),
            e(DbcFileInput, { handleDBCFiles: this.handleDBCFiles }),
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