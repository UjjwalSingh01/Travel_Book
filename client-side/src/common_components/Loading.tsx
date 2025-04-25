import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" className="shape-rendering: auto display: block background: rgb(255, 255, 255);" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle r="20" fill="#96ed3c" cy="50" cx="30">
        <animate begin="-0.5s" values="30;70;30" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
        </circle>
        <circle r="20" fill="#f4a251" cy="50" cx="70">
          <animate begin="0s" values="30;70;30" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
        </circle>
        <circle r="20" fill="#96ed3c" cy="50" cx="30">
          <animate begin="-0.5s" values="30;70;30" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
          <animate repeatCount="indefinite" dur="1s" keyTimes="0;0.499;0.5;1" calcMode="discrete" values="0;0;1;1" attributeName="fill-opacity"></animate>
        </circle><g></g></g></svg>
    </div>
  )
}

export default Loading