import React from "react";

export function sobre(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeDasharray="28"
        strokeDashoffset="28"
        strokeLinecap="round"
        strokeWidth="2">
        <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.4s"
            values="28;0"></animate>
        </path>
        <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.5s"
            dur="0.4s"
            values="28;0"></animate>
        </path>
      </g>
    </svg>
  );
}

export function Telegram(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2">
        <path
          strokeDasharray="16"
          strokeDashoffset="16"
          d="M21 5L18.5 20M21 5L9 13.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.4s"
            values="16;0"></animate>
        </path>
        <path strokeDasharray="22" strokeDashoffset="22" d="M21 5L2 12.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.4s"
            values="22;0"></animate>
        </path>
        <path strokeDasharray="12" strokeDashoffset="12" d="M18.5 20L9 13.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.4s"
            dur="0.3s"
            values="12;0"></animate>
        </path>
        <path strokeDasharray="8" strokeDashoffset="8" d="M2 12.5L9 13.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.4s"
            dur="0.3s"
            values="8;0"></animate>
        </path>
        <path
          strokeDasharray="6"
          strokeDashoffset="6"
          d="M12 16L9 19M9 13.5L9 19">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.3s"
            values="6;0"></animate>
        </path>
      </g>
    </svg>
  );
}

export function list(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <path fill="currentColor" fillOpacity="0" d="M6 4H10V6H14V4H18V20H6V4Z">
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="1.6s"
          dur="0.15s"
          values="0;0.3"></animate>
      </path>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round">
        <g strokeWidth="2">
          <path
            strokeDasharray="66"
            strokeDashoffset="66"
            d="M12 3H19V21H5V3H12Z">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.6s"
              values="66;0"></animate>
          </path>
          <path strokeDasharray="5" strokeDashoffset="5" d="M9 10H12">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1s"
              dur="0.2s"
              values="5;0"></animate>
          </path>
          <path strokeDasharray="6" strokeDashoffset="6" d="M9 13H14">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1.2s"
              dur="0.2s"
              values="6;0"></animate>
          </path>
          <path strokeDasharray="7" strokeDashoffset="7" d="M9 16H15">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1.4s"
              dur="0.2s"
              values="7;0"></animate>
          </path>
        </g>
        <path
          strokeDasharray="12"
          strokeDashoffset="12"
          d="M14.5 3.5V6.5H9.5V3.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.2s"
            values="12;0"></animate>
        </path>
      </g>
    </svg>
  );
}
