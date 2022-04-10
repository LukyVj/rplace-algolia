import Link from "next/link";

interface HeaderProps {
  userCount: number;
  currentHit: {
    id: number;
    bg_color: string;
  } | null;
  COOLDOWN_SECONDS: number;
  cooldownTime: number;
}

const Header = ({
  userCount,
  currentHit,
  cooldownTime,
  COOLDOWN_SECONDS,
}: HeaderProps) => {
  return (
    <header
      style={{
        textAlign: "center",
        width: "calc(var(--canvas-size)/1.25)",
        margin: "auto",
      }}
    >
      <h1>
        <Link href="/">
          <a style={{ color: "black" }}>
            r/<s>place</s>
            <span style={{ color: "var(--algolia-brand)" }}>algolia</span>
          </a>
        </Link>
      </h1>

      <div style={{ textAlign: "left", margin: ".5em auto" }}>
        <div>
          <b>Connected users:</b>{" "}
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "100px",
              background: "linear-gradient(to top, #02BE01, #94E044)",
              marginRight: 5,
            }}
          />
          {userCount}
        </div>
        <div>
          <b>Cooldown:</b>{" "}
          {COOLDOWN_SECONDS === 0 ? (
            <>
              <s>0s</s> No cooldown for cool kids
            </>
          ) : (
            <span>{cooldownTime}s</span>
          )}
        </div>
        <div>
          <b>Current cell</b>:
          {currentHit !== null && (
            <>
              <span> {currentHit.id}</span> -{" "}
              <span
                style={{
                  background: currentHit.bg_color,
                  display: "inline-block",
                  padding: 5,
                }}
              ></span>
              {currentHit.bg_color}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
