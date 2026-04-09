import { getToolBySlug, getTools } from "@/lib/tools-db";

export default async function DebugToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    const results: string[] = [];
    
    try {
        results.push("1. Starting getToolBySlug...");
        const tool = await getToolBySlug(slug);
        results.push(`2. Tool found: ${tool ? tool.title : "NULL"}`);
        if (tool) {
            results.push(`3. Fields: ${Object.keys(tool).join(", ")}`);
            results.push(`4. bgGradient: ${tool.bgGradient}`);
            results.push(`5. icon type: ${typeof tool.icon}`);
            results.push(`6. review: ${JSON.stringify(tool.review)}`);
        }
    } catch (e: unknown) {
        const err = e as Error;
        results.push(`ERROR in getToolBySlug: ${err.message}`);
        results.push(`Stack: ${err.stack?.slice(0, 500)}`);
    }
    
    try {
        results.push("7. Starting getTools...");
        const tools = await getTools();
        results.push(`8. Tools count: ${tools.length}`);
    } catch (e: unknown) {
        const err = e as Error;
        results.push(`ERROR in getTools: ${err.message}`);
    }
    
    return (
        <div style={{ padding: "40px", fontFamily: "monospace", whiteSpace: "pre-wrap", color: "white", background: "#111" }}>
            <h1>Debug Tool Page: {slug}</h1>
            {results.map((r, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>{r}</div>
            ))}
        </div>
    );
}
