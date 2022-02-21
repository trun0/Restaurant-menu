import React from 'react';
import "./LoadingSpinner.css"

function LoadingSpinner() {
    return (
        <div className="loadingSpinner spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default LoadingSpinner;