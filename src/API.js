const octokit = new Octokit({
  auth: "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",
});

await octokit.request("GET /search/users", {});
