/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#eab308",
          backgroundSize: "150px 150px",
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <img
            alt="ChiliFinder Logo"
            width="256"
            height="256"
            src="https://chilifinder.vercel.app/favicon.png"
          />
        </div>
        <div
          style={{
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            color: "white",
            marginTop: 30,
            padding: "0 120px",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          ChiliFinder
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
