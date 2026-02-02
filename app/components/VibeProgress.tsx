"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

type Status = "idle" | "connecting" | "running" | "done";

interface LogLine {
  id: number;
  text: string;
  type?: string;
  tool?: string;
}

interface ParsedToolCall {
  id: number;
  tool: string;
  input: string;
  status: "running" | "complete" | "error";
  parsedInput?: Record<string, unknown>;
}

const MAX_LINES = 200;
const DEBUG = false;

// File extension to language mapping
const EXT_TO_LANG: Record<string, string> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  py: "python",
  rb: "ruby",
  go: "go",
  rs: "rust",
  java: "java",
  kt: "kotlin",
  swift: "swift",
  css: "css",
  scss: "scss",
  html: "html",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  md: "markdown",
  sql: "sql",
  sh: "bash",
  bash: "bash",
  zsh: "bash",
};

// Tool icons (SVG paths)
const TOOL_ICONS: Record<string, React.ReactNode> = {
  Read: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Write: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  StrReplace: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  Shell: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Grep: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Glob: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  LS: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  default: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

// Syntax highlighting for code blocks
function CodeBlock({ code, language, filename }: { code: string; language?: string; filename?: string }) {
  const lines = code.split('\n');
  const lang = language || (filename ? EXT_TO_LANG[filename.split('.').pop() || ''] : undefined) || 'text';
  
  return (
    <div className="rounded-lg overflow-hidden bg-[#0d1117] border border-white/10 my-2">
      {filename && (
        <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22] border-b border-white/10 text-xs">
          <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-white/60 font-mono">{filename}</span>
          <span className="ml-auto text-white/30 uppercase text-[10px] tracking-wider">{lang}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <pre className="p-3 text-[13px] leading-[1.6]">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="select-none w-10 text-right pr-4 text-white/20 font-mono text-xs">
                {i + 1}
              </span>
              <code className="flex-1 font-mono text-white/80">{line}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

// Terminal-style command display
function TerminalCommand({ command, description }: { command: string; description?: string }) {
  return (
    <div className="rounded-lg overflow-hidden bg-[#0d1117] border border-white/10 my-2">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22] border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-white/40 text-xs font-mono ml-2">terminal</span>
        {description && (
          <span className="ml-auto text-white/30 text-xs">{description}</span>
        )}
      </div>
      <div className="p-3 font-mono text-sm">
        <span className="text-green-400">$</span>
        <span className="text-white/90 ml-2">{command}</span>
        <span className="animate-pulse text-white/60">▊</span>
      </div>
    </div>
  );
}

// Diff-style display for file edits
function DiffBlock({ oldText, newText, filename }: { oldText: string; newText: string; filename?: string }) {
  return (
    <div className="rounded-lg overflow-hidden bg-[#0d1117] border border-white/10 my-2">
      {filename && (
        <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22] border-b border-white/10 text-xs">
          <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span className="text-white/60 font-mono">{filename}</span>
          <span className="ml-auto text-yellow-400/60 uppercase text-[10px] tracking-wider">modified</span>
        </div>
      )}
      <div className="p-3 font-mono text-[13px] leading-[1.6]">
        {oldText.split('\n').map((line, i) => (
          <div key={`old-${i}`} className="flex bg-red-500/10">
            <span className="select-none w-6 text-center text-red-400/60">-</span>
            <span className="flex-1 text-red-300/80">{line || ' '}</span>
          </div>
        ))}
        {newText.split('\n').map((line, i) => (
          <div key={`new-${i}`} className="flex bg-green-500/10">
            <span className="select-none w-6 text-center text-green-400/60">+</span>
            <span className="flex-1 text-green-300/80">{line || ' '}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// File path display with icon
function FilePath({ path }: { path: string }) {
  const ext = path.split('.').pop() || '';
  const isDir = !ext || path.endsWith('/');
  
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 text-cyan-400 font-mono text-sm">
      {isDir ? (
        <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )}
      {path}
    </span>
  );
}

// Tool call card component
function ToolCard({ tool, input, status, parsedInput }: ParsedToolCall) {
  const [expanded, setExpanded] = useState(true);
  const icon = TOOL_ICONS[tool] || TOOL_ICONS.default;
  
  const renderToolContent = useMemo(() => {
    if (!parsedInput) {
      try {
        const parsed = JSON.parse(input);
        return renderParsedInput(tool, parsed);
      } catch {
        return <pre className="text-white/60 text-sm font-mono whitespace-pre-wrap">{input}</pre>;
      }
    }
    return renderParsedInput(tool, parsedInput);
  }, [tool, input, parsedInput]);

  function renderParsedInput(toolName: string, params: Record<string, unknown>) {
    switch (toolName) {
      case 'Read':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/50">Reading</span>
              <FilePath path={String(params.path || params.file || '')} />
            </div>
            {params.offset !== undefined && (
              <span className="text-white/40 text-xs">
                Lines {String(params.offset)}-{Number(params.offset) + Number(params.limit || 100)}
              </span>
            )}
          </div>
        );
      
      case 'Write':
        const content = String(params.contents || params.content || '');
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/50">Writing to</span>
              <FilePath path={String(params.path || params.file || '')} />
            </div>
            {content && (
              <CodeBlock 
                code={content.slice(0, 500) + (content.length > 500 ? '\n// ... truncated' : '')} 
                filename={String(params.path || '')} 
              />
            )}
          </div>
        );
      
      case 'StrReplace':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/50">Editing</span>
              <FilePath path={String(params.path || params.file || '')} />
            </div>
            <DiffBlock 
              oldText={String(params.old_string || params.old || '').slice(0, 300)} 
              newText={String(params.new_string || params.new || '').slice(0, 300)}
              filename={String(params.path || '')}
            />
          </div>
        );
      
      case 'Shell':
        return (
          <TerminalCommand 
            command={String(params.command || '')} 
            description={String(params.description || '')}
          />
        );
      
      case 'Grep':
      case 'Glob':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <span className="text-white/50">
                {toolName === 'Grep' ? 'Searching for' : 'Finding files matching'}
              </span>
              <code className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-sm">
                {String(params.pattern || params.glob_pattern || '')}
              </code>
            </div>
            {params.path !== undefined && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white/40">in</span>
                <FilePath path={String(params.path)} />
              </div>
            )}
          </div>
        );
      
      case 'LS':
        return (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/50">Listing</span>
            <FilePath path={String(params.target_directory || params.path || '')} />
          </div>
        );
      
      default:
        return (
          <pre className="text-white/60 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(params, null, 2)}
          </pre>
        );
    }
  }

  return (
    <div className={`rounded-lg border overflow-hidden my-3 transition-all ${
      status === 'running' ? 'border-cyan-500/50 bg-cyan-500/5' : 
      status === 'error' ? 'border-red-500/50 bg-red-500/5' :
      'border-green-500/30 bg-green-500/5'
    }`}>
      <div 
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {status === 'running' ? (
            <>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-500 opacity-50" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500" />
            </>
          ) : status === 'error' ? (
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
          ) : (
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          )}
        </div>
        
        <span className="text-white/60">{icon}</span>
        <span className="font-mono text-sm font-medium text-white/90">{tool}</span>
        
        <svg 
          className={`w-4 h-4 text-white/40 ml-auto transition-transform ${expanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-white/5">
          {renderToolContent}
        </div>
      )}
    </div>
  );
}

// Streaming text with typing effect
function StreamingText({ text }: { text: string }) {
  return (
    <div className="text-white/80 leading-relaxed whitespace-pre-wrap">
      {text}
    </div>
  );
}

export default function VibeProgress() {
  const [status, setStatus] = useState<Status>("idle");
  const [connected, setConnected] = useState(false);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [toolCalls, setToolCalls] = useState<ParsedToolCall[]>([]);
  const [, setCurrentToolInput] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [lastEvent, setLastEvent] = useState<string>("none");
  const [eventCount, setEventCount] = useState(0);
  const [streamingText, setStreamingText] = useState<string>("");
  const logIdRef = useRef(0);
  const toolIdRef = useRef(0);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom when content updates
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, toolCalls, streamingText]);

  // Connect to SSE via local API proxy (handles Cloudflare auth server-side)
  useEffect(() => {
    const url = "/api/events";

    async function connect() {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      setStatus("connecting");
      console.log("[VibeProgress] Connecting to SSE via API proxy");

      try {
        await fetchEventSource(url, {
          method: "GET",
          signal: controller.signal,
          openWhenHidden: true,

          onopen: async (response) => {
            if (response.ok) {
              console.log("[VibeProgress] SSE connection opened");
              setStatus("idle");
              setConnected(true);
            } else if (response.status === 401) {
              console.error("[VibeProgress] SSE auth failed");
              throw new Error("Unauthorized");
            } else {
              console.error("[VibeProgress] SSE connection failed:", response.status);
              throw new Error(`HTTP ${response.status}`);
            }
          },

          onmessage: (event) => {
            const eventType = event.event;
            const data = event.data;

            if (!eventType || eventType.startsWith(":") || !data) {
              return;
            }

            switch (eventType) {
              case "ready":
                console.log("[VibeProgress] SSE ready");
                setLastEvent("ready");
                setEventCount((c) => c + 1);
                setStatus("idle");
                setConnected(true);
                break;

              case "job_started":
                console.log("[VibeProgress] job_started:", data);
                setLastEvent("job_started");
                setEventCount((c) => c + 1);
                try {
                  const parsed = JSON.parse(data);
                  setPrompt(parsed.prompt || "");
                  setLogs([]);
                  setToolCalls([]);
                  setStreamingText("");
                  setCurrentToolInput("");
                  setStatus("running");
                  setVisible(true);
                  logIdRef.current = 0;
                  toolIdRef.current = 0;
                } catch (err) {
                  console.error("[VibeProgress] Failed to parse job_started:", err);
                }
                break;

              case "log":
                setLastEvent("log");
                setEventCount((c) => c + 1);
                try {
                  const parsed = JSON.parse(data);
                  const logType = parsed.type;
                  const logText = parsed.line || "";
                  
                  switch (logType) {
                    case "tool_start":
                      setStreamingText("");
                      const toolName = parsed.tool || logText.replace(/^▶\s*/, '');
                      const newTool: ParsedToolCall = {
                        id: ++toolIdRef.current,
                        tool: toolName,
                        input: "",
                        status: "running",
                      };
                      setToolCalls(prev => [...prev, newTool]);
                      setCurrentToolInput("");
                      break;
                      
                    case "tool_input":
                      setCurrentToolInput(prev => prev + logText);
                      setToolCalls(prev => {
                        if (prev.length === 0) return prev;
                        const updated = [...prev];
                        const last = { ...updated[updated.length - 1] };
                        last.input += logText;
                        try {
                          last.parsedInput = JSON.parse(last.input);
                        } catch {
                          // Not complete JSON yet
                        }
                        updated[updated.length - 1] = last;
                        return updated;
                      });
                      break;
                      
                    case "tool_result":
                      setToolCalls(prev => {
                        if (prev.length === 0) return prev;
                        const updated = [...prev];
                        const last = { ...updated[updated.length - 1] };
                        last.status = logText.startsWith("✓") ? "complete" : "error";
                        updated[updated.length - 1] = last;
                        return updated;
                      });
                      setCurrentToolInput("");
                      break;
                      
                    case "text":
                      setStreamingText(prev => prev + logText);
                      break;
                      
                    case "separator":
                      setStreamingText("");
                      break;
                      
                    default:
                      const newLine: LogLine = {
                        id: ++logIdRef.current,
                        text: logText,
                        type: logType,
                        tool: parsed.tool,
                      };
                      setLogs(prev => {
                        const updated = [...prev, newLine];
                        return updated.length > MAX_LINES ? updated.slice(-MAX_LINES) : updated;
                      });
                  }
                } catch (err) {
                  console.error("[VibeProgress] Failed to parse log:", err);
                }
                break;

              case "job_finished":
                setLastEvent("job_finished");
                setEventCount((c) => c + 1);
                try {
                  const parsed = JSON.parse(data);
                  console.log("[VibeProgress] job_finished:", parsed);
                  setStatus("done");
                  setTimeout(() => {
                    setVisible(false);
                    setStatus("idle");
                  }, 4000);
                } catch (err) {
                  console.error("[VibeProgress] Failed to parse job_finished:", err);
                }
                break;

              default:
                console.log("[VibeProgress] Unknown event:", eventType, data);
            }
          },

          onerror: (err) => {
            console.error("[VibeProgress] SSE error:", err);
            setConnected(false);
            setStatus("idle");
            if (controller.signal.aborted) {
              return;
            }
            throw err;
          },

          onclose: () => {
            console.log("[VibeProgress] SSE connection closed");
            setConnected(false);
            if (!controller.signal.aborted) {
              console.log("[VibeProgress] Reconnecting in 5s...");
              setTimeout(connect, 5000);
            }
          },
        });
      } catch (err) {
        if (controller.signal.aborted) {
          console.log("[VibeProgress] SSE connection aborted");
          return;
        }
        console.error("[VibeProgress] SSE connection error:", err);
        setConnected(false);
        setStatus("idle");
        setTimeout(connect, 5000);
      }
    }

    connect();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  // Connection indicator when not visible
  if (!visible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        {DEBUG ? (
          <div className="bg-black/90 border border-white/20 rounded px-3 py-2 text-xs font-mono text-white/80">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500 animate-pulse"}`} />
              <span>{connected ? "SSE OK" : "SSE..."}</span>
            </div>
            <div className="text-white/50">
              status: {status}<br />
              events: {eventCount}<br />
              last: {lastEvent}
            </div>
          </div>
        ) : (
          <div 
            className={`w-3 h-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500 animate-pulse"}`}
            title={connected ? "SSE Connected" : "SSE Disconnected"}
          />
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-5xl bg-[#0d1117]/98 backdrop-blur-xl border border-white/10 rounded-t-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.5)]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#161b22]/50 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-400" onClick={handleClose} />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-4 h-4">
                {status === "running" ? (
                  <>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-500 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500" />
                  </>
                ) : status === "done" ? (
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                ) : (
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow-500" />
                )}
              </div>
              <span className="text-white/70 text-sm font-medium">
                {status === "running" ? "Agent Working..." : status === "done" ? "Complete" : "Connecting..."}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReload}
              className="px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Reload
            </button>
            <button
              onClick={handleClose}
              className="px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Prompt display */}
        {prompt && (
          <div className="px-5 py-3 border-b border-white/5 bg-gradient-to-r from-purple-500/10 to-transparent">
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-medium uppercase tracking-wider">
                Prompt
              </span>
              <p className="text-white/70 text-sm font-mono leading-relaxed flex-1">
                {prompt}
              </p>
            </div>
          </div>
        )}

        {/* Main content area */}
        <div
          ref={logContainerRef}
          className="h-80 overflow-y-auto px-5 py-4 scroll-smooth"
        >
          {toolCalls.length === 0 && !streamingText && logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-white/40 text-sm">Waiting for agent output...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {toolCalls.map((tc) => (
                <ToolCard key={tc.id} {...tc} />
              ))}
              
              {streamingText && (
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <StreamingText text={streamingText} />
                </div>
              )}
              
              {logs.filter(l => l.type === 'raw').map((line) => (
                <div key={line.id} className="text-white/40 text-xs font-mono">
                  {line.text}
                </div>
              ))}
            </div>
          )}

          {status === "done" && (
            <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              <span className="text-green-400 font-medium">Task completed successfully</span>
              <span className="text-white/40 text-sm ml-auto">Closing automatically...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
