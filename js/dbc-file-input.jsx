
import * as React from 'react';

export class DbcFileInput extends React.Component {

  dragOverHandler(ev) {
    ev.preventDefault();
  }

  dropHandler(ev) {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      const files = ev.dataTransfer.items
        .filter((item) => item.kind === 'file')
        .map((item) => item.getAsFile());

      this.props.handleDBCFiles(Array.from(files));
    } else {
      this.props.handleDBCFiles(Array.from(e.dataTransfer.files));
    }
  }

  render() {

    return (
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="dbcInput">Choose a file or drag it here</label>
              <input type="file" className="form-control-file" id="dbcInput" accept=".dbc" name="dbcInput" id="dbcInput" onChange={(e) => { this.props.handleDBCFiles(Array.from(e.target.files)) }} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}