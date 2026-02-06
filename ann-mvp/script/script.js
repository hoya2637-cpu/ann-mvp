function analyze() {
  const query = document.getElementById("query").value;
  const result = document.getElementById("result");

  if (!query) {
    result.innerHTML = "Please enter a claim or news headline.";
    return;
  }

  result.innerHTML = `
    <h3>Verdict: Uncertain</h3>
    <p>This claim requires further verification.</p>
    <p><strong>ANN Credibility Index:</strong> 62</p>
  `;
}
