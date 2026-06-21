import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { motion, AnimatePresence } from "motion/react";
import { 
  GitBranch, 
  Play, 
  CheckCircle2, 
  HelpCircle, 
  Maximize2, 
  Minimize2, 
  RotateCcw,
  Zap,
  Info,
  Sliders,
  Flag,
  ChevronRight
} from "lucide-react";
interface DecisionVisualizerProps {
  optionsText: string;
  actionPlanText: string;
  situationText: string;
  recommendationText: string;
  title: string;
}

interface ProcessNode {
  id: string;
  label: string;
  description: string;
  type: "root" | "option" | "action";
  x: number;
  y: number;
  isRecommended?: boolean;
  orderIndex?: number;
}

interface ProcessLink {
  source: string;
  target: string;
  isRecommendedPath?: boolean;
}

export default function DecisionVisualizer({
  optionsText,
  actionPlanText,
  situationText,
  recommendationText,
  title
}: DecisionVisualizerProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Interaction States
  const [selectedNode, setSelectedNode] = useState<ProcessNode | null>(null);
  const [activeHoverNode, setActiveHoverNode] = useState<ProcessNode | null>(null);
  const [activeOptionId, setActiveOptionId] = useState<string | null>(null);

  // Parse raw text to extract structural Options
  const parsedOptions = useMemo(() => {
    if (!optionsText) return [];
    
    const lines = optionsText.split("\n").map(l => l.trim()).filter(Boolean);
    const optionsList: Array<{ title: string; desc: string }> = [];
    
    for (const line of lines) {
      // Find list bullets: -, *, ●, or numbers
      const bulletMatch = line.match(/^[-*●+]\s+(.*)/);
      if (bulletMatch) {
        const payload = bulletMatch[1];
        // Match bold sections like **Option A: High Scale** description
        const boldMatch = payload.match(/^\*\*(.*?)\*\*(.*)/);
        if (boldMatch) {
          optionsList.push({
            title: boldMatch[1].replace(/[:\-]/g, "").trim(),
            desc: boldMatch[2].replace(/^[:\-]/, "").trim() || boldMatch[1]
          });
        } else {
          const colonParts = payload.split(/[:\-](.+)/);
          if (colonParts.length >= 2) {
            optionsList.push({
              title: colonParts[0].trim(),
              desc: colonParts[1].trim()
            });
          } else {
            optionsList.push({
              title: payload.length > 30 ? payload.substring(0, 27) + "..." : payload,
              desc: payload
            });
          }
        }
      }
    }

    if (optionsList.length === 0 && optionsText.trim()) {
      // General parsed blocks fallback if no generic bullet items matched
      return [
        { title: "Strategic Path Alpha", desc: optionsText.substring(0, 160) },
        { title: "Tactical Path Beta", desc: "Secondary baseline implementation model." }
      ];
    }
    return optionsList;
  }, [optionsText]);

  // Parse Action Plan
  const parsedActions = useMemo(() => {
    if (!actionPlanText) return [];
    const lines = actionPlanText.split("\n").map(l => l.trim()).filter(Boolean);
    const actionsList: string[] = [];
    
    for (const line of lines) {
      const match = line.match(/^[-*●+]\s+(.*)/) || line.match(/^\d+[\.\)]\s+(.*)/);
      if (match) {
        actionsList.push(match[1].replace(/\*\*/g, "").trim());
      }
    }
    
    if (actionsList.length === 0 && actionPlanText.trim()) {
      return [
        "Deploy strategic system diagnostics",
        "Coordinate mitigation infrastructure",
        "Activate high-bandwidth communication streams",
        "Perform tactical audit checkpoints"
      ];
    }
    return actionsList;
  }, [actionPlanText]);

  // Generate Graph Structures (Nodes and Links)
  const graphData = useMemo(() => {
    const nodes: ProcessNode[] = [];
    const links: ProcessLink[] = [];

    // Height and Width baselines
    const width = 850;
    const height = 450;

    // 1. Root Node (Situation / Strategic Goal)
    const rootNode: ProcessNode = {
      id: "root-node",
      label: title ? (title.length > 25 ? title.substring(0, 22) + "..." : title) : "Strategic Target",
      description: situationText || "Primary mission parameters and situation analysis context.",
      type: "root",
      x: 80,
      y: height / 2
    };
    nodes.push(rootNode);

    // 2. Option Nodes
    const optionsCount = parsedOptions.length || 1;
    const opSpacingY = Math.min(110, height / (optionsCount + 1));
    const opStartY = (height - (optionsCount - 1) * opSpacingY) / 2;

    const optionNodesList: ProcessNode[] = [];
    parsedOptions.forEach((op, index) => {
      const isRecommended = recommendationText.toLowerCase().includes(op.title.toLowerCase()) || index === 0;
      const opNode: ProcessNode = {
        id: `option-${index}`,
        label: op.title,
        description: op.desc,
        type: "option",
        x: 320,
        y: opStartY + index * opSpacingY,
        isRecommended
      };
      nodes.push(opNode);
      optionNodesList.push(opNode);

      // Link from Root to Option
      links.push({
        source: "root-node",
        target: opNode.id,
        isRecommendedPath: isRecommended
      });
    });

    // 3. Action Nodes (Sequential cascade timeline)
    const actionsCount = parsedActions.length || 1;
    const actionSpacingY = Math.min(85, height / (actionsCount + 1));
    const actionStartY = (height - (actionsCount - 1) * actionSpacingY) / 2;

    const firstRecommendedOpId = optionNodesList.find(op => op.isRecommended)?.id || "option-0";
    const selectedActiveOption = activeOptionId || firstRecommendedOpId;

    parsedActions.forEach((act, index) => {
      const actNode: ProcessNode = {
        id: `action-${index}`,
        label: `Step ${index + 1}`,
        description: act,
        type: "action",
        x: 680,
        y: actionStartY + index * actionSpacingY,
        orderIndex: index
      };
      nodes.push(actNode);

      // Links: 
      // First action connects to the currently active option node path
      if (index === 0) {
        links.push({
          source: selectedActiveOption,
          target: actNode.id,
          isRecommendedPath: true
        });
      } else {
        // Sequential action links Action N-1 -> Action N
        links.push({
          source: `action-${index - 1}`,
          target: actNode.id,
          isRecommendedPath: true
        });
      }
    });

    return { nodes, links };
  }, [parsedOptions, parsedActions, situationText, recommendationText, title, activeOptionId]);

  // Set initial selected item when template is loaded
  useEffect(() => {
    const root = graphData.nodes.find(n => n.type === "root");
    if (root) {
      setSelectedNode(root);
    }
  }, [graphData]);

  // Draw flowchart using D3 SVG engine
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    // Suppress previous renderings
    svg.selectAll("*").remove();

    const width = 850;
    const height = 450;

    // Set viewbox for beautiful scale fluid reactivity
    svg.attr("viewBox", `0 0 ${width} ${height}`)
       .attr("width", "100%")
       .attr("height", "100%");

    // Setup global visual grid patterns & marker arrows
    const defs = svg.append("defs");
    
    // Glowing gradient lines for connections
    const linkGradient = defs.append("linearGradient")
      .attr("id", "link-grad")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "100%").attr("y2", "0%");
    linkGradient.append("stop").attr("offset", "0%").attr("stop-color", "#6366f1");
    linkGradient.append("stop").attr("offset", "100%").attr("stop-color", "#c084fc");

    const recommendedGradient = defs.append("linearGradient")
      .attr("id", "rec-grad")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "100%").attr("y2", "0%");
    recommendedGradient.append("stop").attr("offset", "0%").attr("stop-color", "#4f46e5");
    recommendedGradient.append("stop").attr("offset", "100%").attr("stop-color", "#10b981");

    // Standard Link Marker Arrow
    defs.append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 26) // Compensate node size
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M 0 1 L 10 5 L 0 9 z")
      .attr("fill", "#cbd5e1");

    // Glowing Recommended Link Marker Arrow
    defs.append("marker")
      .attr("id", "arrow-recommended")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 26)
      .attr("refY", 5)
      .attr("markerWidth", 7)
      .attr("markerHeight", 7)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M 0 1 L 10 5 L 0 9 z")
      .attr("fill", "#6366f1");

    // Base Group with zoomable structure
    const mainGroup = svg.append("g").attr("class", "zoomable-content");

    // Establish ZOOM parameters
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.65, 2.2])
      .on("zoom", (event) => {
        mainGroup.attr("transform", event.transform);
      });

    svg.call(zoomBehavior);

    // Initial positioning to look elegant
    svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(0, 5).scale(0.96));

    const { nodes, links } = graphData;

    // Draw connecting paths (Bezier Curves)
    const drawBezierPath = (d: ProcessLink) => {
      const sourceNode = nodes.find(n => n.id === d.source);
      const targetNode = nodes.find(n => n.id === d.target);
      if (!sourceNode || !targetNode) return "";
      
      const x1 = sourceNode.x;
      const y1 = sourceNode.y;
      const x2 = targetNode.x;
      const y2 = targetNode.y;
      
      // Control points for smooth horizontal S-curves
      const cpX = (x1 + x2) / 2;
      return `M ${x1} ${y1} C ${cpX} ${y1}, ${cpX} ${y2}, ${x2} ${y2}`;
    };

    // Draw links
    const linkElements = mainGroup.selectAll(".connection-link")
      .data(links)
      .enter()
      .append("path")
      .attr("d", drawBezierPath)
      .attr("fill", "none")
      .attr("stroke", d => d.isRecommendedPath ? "url(#rec-grad)" : "#e2e8f0")
      .attr("stroke-width", d => d.isRecommendedPath ? 3.5 : 2)
      .attr("marker-end", d => d.isRecommendedPath ? "url(#arrow-recommended)" : "url(#arrow)")
      .attr("class", d => d.isRecommendedPath ? "connection-link flowing-line transition-all duration-300" : "connection-link transition-all duration-300")
      .attr("opacity", d => d.isRecommendedPath ? 1 : 0.45);

    // Add flowing dynamic node animation style to recommended paths
    svg.append("style").text(`
      @keyframes flowDash {
        to {
          stroke-dashoffset: -20;
        }
      }
      .flowing-line {
        stroke-dasharray: 6, 4;
        animation: flowDash 1s linear infinite;
      }
    `);

    // Draw individual Interactive Node Blocks
    const nodeContainers = mainGroup.selectAll(".node-group")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node-group pointer-events-all cursor-pointer")
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .on("click", (event, d) => {
        setSelectedNode(d);
        if (d.type === "option") {
          setActiveOptionId(d.id);
        }
      })
      .on("mouseover", (event, d) => {
        setActiveHoverNode(d);
      })
      .on("mouseleave", () => {
        setActiveHoverNode(null);
      });

    // Node outer stylized shields
    nodeContainers.append("circle")
      .attr("r", d => d.type === "root" ? 22 : d.type === "option" ? 18 : 15)
      .attr("fill", d => {
        if (d.type === "root") return "#1e1b4b"; // Indigo-950
        if (d.type === "option") {
          return d.isRecommended ? "#ecfdf5" : "#f1f5f9"; // Soft emerald or soft slate
        }
        return "#faf5ff"; // Soft purple
      })
      .attr("stroke", d => {
        if (d.type === "root") return "#4f46e5"; // Indigo-600
        if (d.type === "option") {
          return d.isRecommended ? "#10b981" : "#94a3b8";
        }
        return "#a855f7"; // Purple-500
      })
      .attr("stroke-width", d => d.type === "root" ? 3 : 2)
      .attr("class", "transition-all duration-200")
      .attr("filter", d => {
        if (d.type === "root" || (d.type === "option" && d.isRecommended)) {
          return "drop-shadow(0 0 6px rgba(99, 102, 241, 0.4))";
        }
        return null;
      });

    // Inner stylized icons / glyph dots
    nodeContainers.append("circle")
      .attr("r", d => d.type === "root" ? 8 : 4)
      .attr("fill", d => {
        if (d.type === "root") return "#ffffff";
        if (d.type === "option") return d.isRecommended ? "#10b981" : "#64748b";
        return "#a855f7";
      });

    // Text labels
    nodeContainers.append("text")
      .text(d => d.label)
      .attr("y", d => d.type === "root" ? -30 : -25)
      .attr("text-anchor", "middle")
      .attr("fill", "#1e293b")
      .attr("font-family", "ui-sans-serif, system-ui, sans-serif")
      .attr("font-size", "11px")
      .attr("font-weight", "800")
      .attr("class", "select-none tracking-tight");

    // Secondary indicators (badge indices) for actions
    nodeContainers.filter(d => d.type === "action")
       .append("rect")
       .attr("x", -12)
       .attr("y", 22)
       .attr("width", 24)
       .attr("height", 14)
       .attr("rx", 3)
       .attr("fill", "#f3e8ff")
       .attr("stroke", "#d8b4fe")
       .attr("stroke-width", 1);

    nodeContainers.filter(d => d.type === "action")
       .append("text")
       .text(d => `S${(d.orderIndex ?? 0) + 1}`)
       .attr("y", 32)
       .attr("text-anchor", "middle")
       .attr("fill", "#6b21a8")
       .attr("font-size", "8px")
       .attr("font-weight", "bold")
       .attr("font-family", "monospace");

    // Interactive helper: highlight link on active option hovering
    if (activeHoverNode) {
      linkElements.attr("opacity", d => {
        if (d.source === activeHoverNode.id || d.target === activeHoverNode.id) {
          return 1.0;
        }
        return 0.25;
      }).attr("stroke-width", d => {
        if (d.source === activeHoverNode.id || d.target === activeHoverNode.id) {
          return d.isRecommendedPath ? 5.5 : 3.5;
        }
        return d.isRecommendedPath ? 3.5 : 2;
      });
    }

    // Zoom controller utilities inside effect
    const handleZoomIn = () => svg.transition().duration(250).call(zoomBehavior.scaleBy, 1.25);
    const handleZoomOut = () => svg.transition().duration(250).call(zoomBehavior.scaleBy, 0.8);
    const handleZoomReset = () => svg.transition().duration(400).call(zoomBehavior.transform, d3.zoomIdentity.translate(0, 5).scale(0.96));

    // Expose these methods to window for clean button binders
    (window as any)._iah_visualizer_zoom_in = handleZoomIn;
    (window as any)._iah_visualizer_zoom_out = handleZoomOut;
    (window as any)._iah_visualizer_zoom_reset = handleZoomReset;

    return () => {
      delete (window as any)._iah_visualizer_zoom_in;
      delete (window as any)._iah_visualizer_zoom_out;
      delete (window as any)._iah_visualizer_zoom_reset;
    };

  }, [graphData, activeHoverNode]);

  // Bind local controls to globally exposed callback handlers safely
  const triggerZoomIn = () => (window as any)._iah_visualizer_zoom_in?.();
  const triggerZoomOut = () => (window as any)._iah_visualizer_zoom_out?.();
  const triggerZoomReset = () => (window as any)._iah_visualizer_zoom_reset?.();

  // Highlight styling classes helper for matching side-panel item preview card
  const getPanelIcon = (type: "root" | "option" | "action") => {
    switch(type) {
      case "root":
        return <Zap className="w-5 h-5 text-indigo-500 fill-indigo-500/10" />;
      case "option":
        return <GitBranch className="w-5 h-5 text-emerald-500" />;
      case "action":
        return <CheckCircle2 className="w-5 h-5 text-purple-500 fill-purple-500/10" />;
    }
  };

  const getPanelTitle = (type: "root" | "option" | "action") => {
    switch(type) {
      case "root": return "Strategic Decision Mission Center";
      case "option": return "Alternative Branch Evaluator";
      case "action": return "Tactical Operational Milestone";
    }
  };

  return (
    <div className="flex-grow flex flex-col lg:flex-row gap-6 animate-fadeIn items-stretch text-left">
      
      {/* Visual Canvas Card */}
      <div className="flex-grow lg:w-3/5 bg-slate-50/50 border border-slate-200 rounded-xl relative flex flex-col p-4 shadow-xs select-none min-h-[460px]">
        
        {/* Header HUD panel */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-3 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
              Interactive Decision D3 Flow Map
            </span>
          </div>
          
          {/* HUD zoom toolbar */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md p-1 shadow-xs">
            <button 
              onClick={triggerZoomIn}
              className="p-1 px-2 rounded hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer text-xs"
              title="Zoom In"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={triggerZoomOut}
              className="p-1 px-2 rounded hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer text-xs"
              title="Zoom Out"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={triggerZoomReset}
              className="p-1 px-2.5 rounded hover:bg-slate-100 text-slate-600 font-mono text-[10px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1"
              title="Reset view bounds"
            >
              <RotateCcw className="w-3 h-3" />
              Fit
            </button>
          </div>
        </div>

        {/* SVG Wrapper */}
        <div ref={containerRef} className="flex-grow relative overflow-hidden bg-white border border-slate-200/60 rounded-lg shadow-inner flex items-center justify-center cursor-move">
          <svg 
            ref={svgRef} 
            className="w-full h-full max-h-[440px] transform-gpu"
          />
          
          {/* Subtitle labels */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none text-[9px] font-mono uppercase font-black tracking-widest text-slate-400">
            <span>🥅 1. Goal Horizon</span>
            <span>⚖️ 2. Structural Options</span>
            <span>🛣 3. Execution Cascade</span>
          </div>
        </div>
      </div>

      {/* Details Inspector Sidebar Drawer */}
      <div className="lg:w-2/5 shrink-0 flex flex-col items-stretch justify-start">
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4 shadow-xs h-full min-h-[380px] justify-between">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-4 h-4 text-slate-500" />
              <h3 className="text-xs uppercase font-mono font-black tracking-widest text-slate-500">
                Strategic Node Inspector
              </h3>
            </div>

            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                      {getPanelIcon(selectedNode.type)}
                    </div>
                    <div className="min-w-0 flex-grow">
                      <span className="text-[9px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                        {getPanelTitle(selectedNode.type)}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight font-display pr-1 truncate">
                        {selectedNode.label}
                      </h4>
                    </div>
                  </div>

                  {/* Node Status Indicator */}
                  <div className="p-3.5 rounded-xl border leading-relaxed text-xs overflow-y-auto max-h-[220px] scrollbar-thin shadow-xs bg-slate-50/70 border-slate-200">
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {selectedNode.description}
                    </p>
                  </div>

                  {selectedNode.type === "option" && (
                    <div className="flex flex-col gap-2 p-3 bg-emerald-50/40 border border-emerald-100 rounded-lg text-xs leading-relaxed">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <Flag className="w-3.5 h-3.5" />
                        <span>
                          {selectedNode.isRecommended ? "⭐ Primary Recommended Path Choice" : "Alternative Option Evaluated"}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-700">
                        {selectedNode.isRecommended 
                          ? "This alternative is identified by our intelligence core as the highest impact setup matching the constraints."
                          : "Examine this pathway in the flow center to evaluate timeline shifts or implementation tradeoffs."}
                      </p>
                      {selectedNode.id && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveOptionId(selectedNode.id);
                            setSelectedNode({
                              ...selectedNode,
                              isRecommended: true // highlight temporarily
                            });
                          }}
                          className={`mt-1.5 font-mono text-[10px] uppercase font-bold p-1 px-3.5 rounded cursor-pointer max-w-fit transition duration-150 relative ${
                            activeOptionId === selectedNode.id 
                              ? "bg-emerald-600 text-white" 
                              : "bg-white border border-emerald-250 text-emerald-800 hover:bg-emerald-50"
                          }`}
                        >
                          {activeOptionId === selectedNode.id ? "Connected Stream Anchor" : "Anchor Action Cascade Here"}
                        </button>
                      )}
                    </div>
                  )}

                  {selectedNode.type === "root" && (
                    <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-lg text-xs leading-relaxed flex items-center gap-2">
                      <Info className="w-5 h-5 text-indigo-500 shrink-0" />
                      <span className="text-[11px] text-indigo-700 font-sans">
                        Click alternative options in the middle column of the visualization graph to shift the dynamic connections stream.
                      </span>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <p className="text-xs text-slate-400 italic">Select any flowchart node block to inspect its parameter details.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Prompt to return to memo tab optionally */}
          <div className="border-t border-slate-100 pt-4 mt-auto">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-sans">Strategic flow matched properly.</span>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                <span>DECISION GRAPH VIEW</span>
                <ChevronRight className="w-3 h-3 text-slate-300" />
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
