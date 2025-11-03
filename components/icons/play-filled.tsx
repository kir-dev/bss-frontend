const PlayFilled = ({ color = "#023E8A", size = 14, ...props }) => (
  <svg
    width={size}
    height={size * (15 / 14)} // maintain original aspect ratio
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.625 14.9997C0.279822 14.9997 0 14.7199 0 14.3747V0.624721C9.98967e-05 0.40135 0.1194 0.195014 0.312934 0.0834839C0.506467 -0.0280461 0.74481 -0.0278129 0.938125 0.0840955L12.8131 6.9591C13.0059 7.07091 13.1245 7.27689 13.1245 7.49972C13.1245 7.72255 13.0059 7.92853 12.8131 8.04035L0.938125 14.9153C0.843015 14.9706 0.734989 14.9997 0.625 14.9997Z"
      fill={color}
    />
  </svg>
);

export default PlayFilled;
