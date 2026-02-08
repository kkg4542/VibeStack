export function BackgroundGlows() {
    return (
        <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[60vh] w-full max-w-[1200px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[80px] rounded-full will-change-transform" />
            <div className="absolute top-[30%] left-[15%] z-0 h-[25vh] w-[25vh] bg-purple-500/5 blur-[60px] rounded-full" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808025_1px,transparent_1px),linear-gradient(to_bottom,#80808025_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
        </>
    );
}
