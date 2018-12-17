import React from 'react';
import { Spin } from 'antd'; 
import './style.css';

const Progress = ({ loading, loadingMessage }) => {
  if (loading) {
    return (
       <div className="lightbox">
        <div className="progress-container-container">
          <div className="progress-container">
            <Spin tip={loadingMessage} size="large" spinning={true} />
          </div>
        </div>
       </div>
    );  
  } else {
      return (<div></div>);
  }  
};

export default Progress;