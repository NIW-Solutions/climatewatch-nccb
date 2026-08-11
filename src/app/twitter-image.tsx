import {
  ImageResponse,
} from "next/og";

export const alt =
  "ClimateWatch — Climate Policy, Research and Development";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "#103a6d",
          color: "#ffffff",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position:
              "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background:
              "#cb1f0e",
          }}
        />

        <div
          style={{
            position:
              "absolute",
            right: -30,
            bottom: -80,
            fontSize: 330,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing:
              "-0.08em",
            color:
              "rgba(255,255,255,0.035)",
          }}
        >
          CW
        </div>

        <div
          style={{
            position:
              "relative",
            zIndex: 2,
            width: "100%",
            display:
              "flex",
            flexDirection:
              "column",
            justifyContent:
              "space-between",
            padding:
              "72px 78px 66px",
          }}
        >
          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 42,
                height: 3,
                background:
                  "#cb1f0e",
              }}
            />

            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                textTransform:
                  "uppercase",
                letterSpacing:
                  "0.14em",
                color:
                  "rgba(255,255,255,0.62)",
              }}
            >
              International
              climate policy
              & research
            </span>
          </div>

          <div
            style={{
              display:
                "flex",
              flexDirection:
                "column",
              maxWidth: 900,
            }}
          >
            <div
              style={{
                fontSize: 78,
                fontWeight: 650,
                lineHeight: 0.96,
                letterSpacing:
                  "-0.055em",
              }}
            >
              ClimateWatch
            </div>

            <div
              style={{
                marginTop: 28,
                maxWidth: 850,
                fontSize: 29,
                lineHeight: 1.42,
                color:
                  "rgba(255,255,255,0.7)",
              }}
            >
              Evidence where
              climate impacts
              land.
            </div>
          </div>

          <div
            style={{
              paddingTop: 26,
              borderTop:
                "1px solid rgba(255,255,255,0.2)",
              fontSize: 18,
              color:
                "rgba(255,255,255,0.62)",
            }}
          >
            climatewatch-nccb.org
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}