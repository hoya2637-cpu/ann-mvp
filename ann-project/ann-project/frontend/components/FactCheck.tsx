const [status, setStatus] = useState<"idle"|"loading"|"done">("idle");

<button onClick={() => setStatus("loading")}>
  Analyze
</button>

{status === "loading" && <LoadingSteps />}
