
import React from 'react'
import Dropzone from 'react-dropzone';

export class DbcFileInput extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <Dropzone onDrop={this.props.handleDBCFiles}>
            {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive && !isDragReject ? (
                  <p>File incoming ...</p>
                ) :
                  (<div>
                    <p>Drop a dbc file here ...</p>
                    <button type="button" className="btn btn-primary">
                      Open File Dialog
                  </button>
                  </div>)
                }
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }
}