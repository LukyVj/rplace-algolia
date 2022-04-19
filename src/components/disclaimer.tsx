import Button from "./button/button";

interface DisclaimerProps {
  hasDisclaimer: boolean;
  setHasDisclaimer: (e: any) => void;
}
const Disclaimer = ({ hasDisclaimer, setHasDisclaimer }: DisclaimerProps) => {
  return (
    <>
      {hasDisclaimer && (
        <>
          <div
            style={{
              background: "rgb(0 0 0 / 80%)",
              zIndex: 1,
              width: "100vw",
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
            }}
          />
          <div
            style={{
              background: "var(--nebula-500)",
              color: "white",
              fontWeight: "bold",
              padding: "2.15em",
              width: 500,
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 50px rgba(0,0,0,1)",
              zIndex: 2,
            }}
          >
            <h2 className="mt-0">DISCLAIMER</h2>
            <p>Keep this link private within the company ( for now ).</p>
            <p>Thank you :)</p>

            <div className="ta-center">
              <Button
                onClick={() => setHasDisclaimer(false)}
                style={{
                  color: "white",
                  backgroundColor: "#ff4500 !important",
                  fontWeight: "bold",
                }}
                className="mt-16 d-inline-block td-underline"
              >
                Close this disclaimer
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Disclaimer;
