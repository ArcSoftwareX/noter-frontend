import { HTMLAttributes, forwardRef } from "react";

export const WatchIcon = forwardRef<
  SVGSVGElement,
  HTMLAttributes<SVGSVGElement>
>(({ ...props }, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id="lineMdWatchLoop0">
          <rect width="24" height="12"></rect>
        </clipPath>
        <symbol id="lineMdWatchLoop1">
          <path
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z"
            clipPath="url(#lineMdWatchLoop0)"
          >
            <animate
              attributeName="d"
              dur="6s"
              keyTimes="0;0.07;0.93;1"
              repeatCount="indefinite"
              values="M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z"
            ></animate>
          </path>
        </symbol>
        <mask id="lineMdWatchLoop2">
          <use href="#lineMdWatchLoop1"></use>
          <use href="#lineMdWatchLoop1" transform="rotate(180 12 12)"></use>
          <circle cx="12" cy="12" r="0" fill="#fff">
            <animate
              attributeName="r"
              dur="6s"
              keyTimes="0;0.03;0.97;1"
              repeatCount="indefinite"
              values="0;3;3;0"
            ></animate>
          </circle>
        </mask>
      </defs>
      <rect
        width="24"
        height="24"
        fill="#888888"
        mask="url(#lineMdWatchLoop2)"
      ></rect>
    </svg>
  );
});

export const UploadIcon = forwardRef<
  SVGSVGElement,
  HTMLAttributes<SVGSVGElement>
>(({ ...props }, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      ref={ref}
      {...props}
    >
      <g fill="none" stroke="#888888" strokeLinecap="round" strokeWidth="2">
        <path
          strokeDasharray="2 4"
          strokeDashoffset="6"
          d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            dur="0.6s"
            repeatCount="indefinite"
            values="6;0"
          ></animate>
        </path>
        <path
          strokeDasharray="30"
          strokeDashoffset="30"
          d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.1s"
            dur="0.3s"
            values="30;0"
          ></animate>
        </path>
        <path strokeDasharray="10" strokeDashoffset="10" d="M12 16v-7.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.5s"
            dur="0.2s"
            values="10;0"
          ></animate>
        </path>
        <path
          strokeDasharray="6"
          strokeDashoffset="6"
          d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.2s"
            values="6;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
});
