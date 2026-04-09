import { getToolBySlug, getTools } from "@/lib/tools-db";

export default async function TestToolPage() {
    let tool;
    let allTools;
    let err = "";

    try {
        tool = await getToolBySlug("cursor");
    } catch (e) {
        err += `getToolBySlug error: ${e}\n`;
    }

    try {
        allTools = await getTools();
    } catch (e) {
        err += `getTools error: ${e}\n`;
    }

    return (
        <div style={{ padding: "50px", color: "white" }}>
            <h1>Test Details</h1>
            {err && <pre style={{ color: "red" }}>{err}</pre>}
            <p>Tool loaded: {tool ? tool.title : "No"}</p>
            <p>All tools count: {allTools ? allTools.length : "0"}</p>
        </div>
    );
}
