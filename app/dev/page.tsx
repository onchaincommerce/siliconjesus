import VibeProgress from "../components/VibeProgress";

export const metadata = {
  title: "Dev Console - Silicon Jesus",
  description: "Development console for monitoring agent progress",
};

export default function DevPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Dev Console</h1>
                <p className="text-xs text-white/50">Agent Progress Monitor</p>
              </div>
            </div>
            <a 
              href="/"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              ← Back to main site
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Vibe Progress Monitor
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Real-time streaming of AI agent activity. The progress panel will appear at the bottom 
            of the screen when an agent job starts.
          </p>
        </div>

        {/* Status cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-[#161b22] border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Real-time Streaming</h3>
            <p className="text-sm text-white/50">
              Watch agent tool calls, file edits, and terminal commands as they happen.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161b22] border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Code Visualization</h3>
            <p className="text-sm text-white/50">
              Syntax-highlighted code blocks and diff views for file changes.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161b22] border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Auto Updates</h3>
            <p className="text-sm text-white/50">
              Progress panel auto-shows when jobs start and closes when complete.
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 rounded-xl bg-[#161b22] border border-white/10">
          <h3 className="font-semibold mb-4">How it works</h3>
          <ol className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">1</span>
              <span>The receiver runs locally and listens for commands</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">2</span>
              <span>When a job starts, the receiver broadcasts events via SSE</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">3</span>
              <span>This page connects through Cloudflare and displays progress in real-time</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">4</span>
              <span>Look for the connection indicator in the bottom-right corner</span>
            </li>
          </ol>
        </div>
      </main>

      {/* The VibeProgress component - shows at bottom when jobs are running */}
      <VibeProgress />
    </div>
  );
}
