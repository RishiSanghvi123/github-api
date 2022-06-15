import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import RepoDetails from "./repoDetails";
import List from "./list";

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    setRepos([]);
    setDetails({});
    setError(false);
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRepos();
  };

  const searchRepos = () => {
    setLoading(true);

    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((res) => {
        setLoading(false);
        setRepos(res.data);
        console.log(repos);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  const getDetails = (repoName) => {
    setDetailsLoading(true);
    axios
      .get(`https://api.github.com/repos/${username}/${repoName}`)
      .then((res) => {
        setDetailsLoading(false);
        setDetails(res.data);
      });
  };

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
