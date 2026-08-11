import {
  ImageResponse,
} from "next/og";

import { siteConfig } from "@/config/site";

export const alt =
  "ClimateWatch — Climate Policy, Research and Development";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "image/png";

export default function OpenGraphImage() {
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
            "#082a50",
          color: "#ffffff",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position:
              "absolute",
            inset: 0,
            display:
              "flex",
          }}
        >
          <div
            style={{
              position:
                "absolute",
              left: "58%",
              top: 0,
              bottom: 0,
              width: 1,
              background:
                "rgba(255,255,255,0.08)",
            }}
          />

          <div
            style={{
              position:
                "absolute",
              left: "72%",
              top: 0,
              bottom: 0,
              width: 1,
              background:
                "rgba(255,255,255,0.08)",
            }}
          />

          <div
            style={{
              position:
                "absolute",
              left: "86%",
              top: 0,
              bottom: 0,
              width: 1,
              background:
                "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        <div
          style={{
            position:
              "absolute",
            top: 0,
            left: 0,
            width: "100%",
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
            bottom: -65,
            fontSize: 320,
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

            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                textTransform:
                  "uppercase",
                letterSpacing:
                  "0.14em",
                color:
                  "rgba(255,255,255,0.65)",
              }}
            >
              Climate policy
              · Research ·
              Development
            </div>
          </div>

          <div
            style={{
              display:
                "flex",
              flexDirection:
                "column",
            }}
          >
            <div
              style={{
                maxWidth: 850,
                fontSize: 76,
                fontWeight: 650,
                lineHeight: 0.98,
                letterSpacing:
                  "-0.055em",
              }}
            >
              ClimateWatch
            </div>

            <div
              style={{
                maxWidth: 870,
                marginTop: 25,
                fontSize: 28,
                lineHeight: 1.4,
                color:
                  "rgba(255,255,255,0.7)",
              }}
            >
              Evidence-based
              climate policy,
              research,
              education and
              applied
              innovation
              across Pakistan.
            </div>
          </div>

          <div
            style={{
              display:
                "flex",
              justifyContent:
                "space-between",
              alignItems:
                "flex-end",
              paddingTop: 26,
              borderTop:
                "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <div
              style={{
                fontSize: 18,
                color:
                  "rgba(255,255,255,0.62)",
              }}
            >
              {
                siteConfig
                  .parentOrganisation
                  .abbreviation
              }
            </div>

            <div
              style={{
                fontSize: 18,
                color:
                  "rgba(255,255,255,0.62)",
              }}
            >
              climatewatch-nccb.org
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}