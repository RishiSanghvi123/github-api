import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
// import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
// import RepoDetails from "./repoDetails";
import List from "./list";

function App() {
  delete axios.defaults.headers.common["OAuth-Token"];
  //const { Octokit } = require("@octokit/rest");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  // const [details, setDetails] = useState({});
  // const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [checked, setChecked] = useState(true);

  function compare(a, b) {
    if (a.forks >= b.forks) {
      return -1;
    }
    return 1;
  }

  useEffect(() => {
    setRepos([]);
    // setDetails({});
    setError(false);
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //setUsername(e);
    searchRepos();
  };

  // const octokit = new Octokit({
  //   auth: "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",
  // });

  // const x = octokit.request("GET /search/users", {});
  // console.log(x);

  const searchRepos = () => {
    setLoading(true);

    axios
      .get(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setRepos(res.data.sort(compare));
        console.log(repos);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  // const getDetails = (repoName) => {
  //   setDetailsLoading(true);
  //   axios
  //     .get(`https://api.github.com/repos/${username}/${repoName}`)
  //     .then((res) => {
  //       setDetailsLoading(false);
  //       setDetails(res.data);
  //     });
  // };

  return (
    <div className="App">
      <div className="landing-page">
        <div className="left-side">
          <form className="form">
            <input
              className="input"
              value={username}
              placeholder="Github user"
              onChange={(e) => setUsername(e.target.value)}
            />

            <button className="submit" onClick={handleSubmit}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
          <div className="results-container">
            {error && <h1>This username doesn't exist :(</h1>}
            {repos.map((repo) => {
              return (
                // <div
                //   className="row"
                //   key={repo.id}
                //   onClick={() => getDetails(repo.name)}
                // >
                //   <h2 className="repo-name">{repo.name}</h2>
                //   <input
                //     type="checkbox"
                //     key={repo.id}
                //     checked={checked}
                //     onChange={(e) => setChecked(!checked)}
                //   />
                // </div>
                <List repo={repo} username={username} key={repo.id} />
              );
            })}
          </div>
        </div>
        {/* <RepoDetails details={details} loading={detailsLoading} /> */}
      </div>
    </div>
  );
}

export default App;
