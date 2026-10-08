import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #141414, #050505)",
          borderRadius: "7px",
          border: "1.5px solid #B6D94C",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
          position: "relative",
        }}
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top termination facets */}
          <polygon points="10,1 4,6 10,8" fill="#EDF8DE" />
          <polygon points="10,1 10,8 16,6" fill="#B6D94C" />
          <polygon points="10,1 4,6 10,4" fill="#FFFFFF" opacity="0.7" />

          {/* Body columns */}
          <polygon points="4,6 10,8 10,23 4,21" fill="#6F9D3B" />
          <polygon points="10,8 13,7.5 13,22.5 10,23" fill="#B6D94C" />
          <polygon points="13,7.5 16,6 16,21 13,22.5" fill="#2E5A26" />

          {/* Prismatic striations */}
          <line
            x1="7"
            y1="7"
            x2="7"
            y2="22"
            stroke="#B6D94C"
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />
          <line
            x1="10"
            y1="8"
            x2="10"
            y2="23"
            stroke="#FFFFFF"
            strokeWidth="0.9"
            strokeOpacity="0.75"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
