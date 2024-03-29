import React from 'react'

export default function IconFeedback(props) {
    return (
        <svg
          viewBox="0 0 24 24"
          fill="#103f5eb3"
          height={props.height}
          width={props.width}
          {...props}
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M6.455 19L2 22.5V4a1 1 0 011-1h18a1 1 0 011 1v14a1 1 0 01-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM11 13h2v2h-2v-2zm0-6h2v5h-2V7z" />
        </svg>
      );
}
