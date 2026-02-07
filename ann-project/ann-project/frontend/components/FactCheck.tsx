const [checkStatus, setCheckStatus] = useState<"idle" | "loading" | "done">("idle");

<button 
  onClick={() => setCheckStatus("loading")}
  disabled={checkStatus === "loading"}
>
  Analyze
</button>

{checkStatus === "loading" && <LoadingSteps />}
