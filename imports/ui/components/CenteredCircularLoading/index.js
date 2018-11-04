import React from 'react';

export default function CenteredCircularLoading() {
  return (
    <div className="col s4 offset-s4 center">
      <br />
      <br />
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
  );
}
