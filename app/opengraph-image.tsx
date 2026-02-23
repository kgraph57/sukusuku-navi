import { ImageResponse } from "next/og";

export const runtime = "edge";
/** Required for static export (GitHub Pages) */
export const dynamic = "force-static";
export const alt = "すくすくナビ - 港区の子育て、もう迷わない";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #3D4859 0%, #2F3847 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAFAFA",
          borderRadius: 32,
          padding: "60px 80px",
          maxWidth: 1000,
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "#2F3847",
            marginBottom: 16,
            letterSpacing: "0.04em",
          }}
        >
          すくすくナビ
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#1A202C",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          港区の子育て、もう迷わない。
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            "医師監修の記事",
            "給付金シミュレーター",
            "受診判断ガイド",
            "予防接種管理",
          ].map((label) => (
            <div
              key={label}
              style={{
                background: "#F4F5F7",
                border: "1px solid #C5CAD4",
                borderRadius: 12,
                padding: "8px 20px",
                fontSize: 20,
                color: "#2F3847",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 18,
            color: "#5A6575",
          }}
        >
          愛育病院 小児科医おかもんが届ける子育て情報
        </div>
      </div>
    </div>,
    { ...size },
  );
}
