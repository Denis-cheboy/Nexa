export const SkeletonLoader = () => (
  <div className="thinking-dots">
    <svg width="120" height="30">
      <circle cx="60" cy="15" r="5" fill="#6366f1">
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="75" cy="15" r="5" fill="#6366f1">
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </circle>
      <circle cx="90" cy="15" r="5" fill="#6366f1">
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="1.5s"
          repeatCount="indefinite"
          begin="1s"
        />
      </circle>
    </svg>
  </div>
);
