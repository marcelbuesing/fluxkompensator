import React from 'react'
import Dropzone from 'react-dropzone';

export class DbcRenderingProgress extends React.Component {
    render() {
        const {progress} = this.props;
        const progressMaxSteps = 3;
        const widthProgress = progress * (100 / progressMaxSteps) + '%';
        return (
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ width: widthProgress }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax={progressMaxSteps}></div>
            </div>
        );
    }
}