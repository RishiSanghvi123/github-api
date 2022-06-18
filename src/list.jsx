import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const List = ({ repo, username }) => {
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({});
  //const [detailsLoading, setDetailsLoading] = useState(false);

  //   const handleChange = () => {
  //     setChecked(!checked);
  //   };
  useEffect(() => {
    //setDetailsLoading(true);
    axios
      .get(`https://api.github.com/repos/${username}/${repo.name}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
        },
      })
      .then((res) => {
        // setDetailsLoading(false);
        setDetails(res.data);
      });
  }, [username, repo.name]);

  // if (detailsLoading) {
  //   return <h1 className="loader">Loading...</h1>;
  // }

  return (
    <div className="list-container">
      <div className="row" key={repo.id} onClick={() => setShow(!show)}>
        <h2 className="repo-name">{repo.name}</h2>
        {/* <input
        type="checkbox"
        key={repo.id}
        checked={checked}
        onChange={handleChange}
      /> */}
      </div>
      <div>
        {show && (
          <>
            <div className="details-row">
              <label className="label">Forks Count:</label>
              <span className="value">{details.forks}</span>
            </div>
            <div className="details-row">
              <label className="label">Stars:</label>
              <span className="value">{details.stargazers_count}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default List;
