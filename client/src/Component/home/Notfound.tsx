import React from "react";

const Notfound = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="not_found">
            <div style={{ fontSize: 100 }}>
              <b>404</b>{" "}
            </div>
            <div>
              <b>THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.</b>{" "}
            </div>
            <p className="PAGE">
              You may have mistyped the address or the page may have moved.
            </p>
            <a href="/">
              <button>GO TO HOME PAGE</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
