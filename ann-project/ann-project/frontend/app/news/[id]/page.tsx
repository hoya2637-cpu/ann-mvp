export default function NewsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section style={{ padding: "40px" }}>
      <h1>News Detail Page</h1>
      <p>Article ID: {params.id}</p>

      <hr />

      <h2>Discussion</h2>
      <p>This is where credibility discussion will appear.</p>

      <textarea
        placeholder="Join the discussion..."
        style={{ width: "100%", height: "120px" }}
      />

      <br />
      <br />

      <button>Post Comment</button>
    </section>
  );
}
