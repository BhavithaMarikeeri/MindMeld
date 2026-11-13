"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
  BackgroundVariant
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { StudentProfile } from "@/types";
import {
  Network,
  Sparkles,
  Users,
  Compass,
  Filter,
  X,
  ExternalLink,
  Layers,
  ZoomIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";

// Domain color map
const DOMAIN_COLOR_MAP: Record<string, string> = {
  "Artificial Intelligence": "#8B5CF6", // Violet
  "FinTech": "#06B6D4", // Cyan
  "Healthcare": "#EC4899", // Magenta
  "Cybersecurity": "#F59E0B", // Amber
  "Education": "#10B981", // Emerald
  "Social Impact": "#3B82F6", // Blue
  "Developer Tools": "#A855F7"
};

export default function UniversePage() {
  const { allStudents, connections, currentUser, sendConnectionRequest } = useDemoStore();

  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  // Filter students based on domain
  const visibleStudents = useMemo(() => {
    if (selectedDomain === "all") return allStudents;
    return allStudents.filter((s) => s.preferredDomain === selectedDomain);
  }, [allStudents, selectedDomain]);

  // Construct React Flow Nodes with circular coordinates
  const initialNodes: Node[] = useMemo(() => {
    const centerRadius = 240;
    const count = visibleStudents.length;

    return visibleStudents.map((student, i) => {
      const angle = (i / count) * 2 * Math.PI;
      const x = 400 + centerRadius * Math.cos(angle);
      const y = 300 + centerRadius * Math.sin(angle);
      const isCurrentUser = student.id === currentUser.id;
      const domainColor = DOMAIN_COLOR_MAP[student.preferredDomain] || "#8B5CF6";

      return {
        id: student.id,
        position: isCurrentUser ? { x: 400, y: 300 } : { x, y },
        data: {
          label: (
            <div
              className={`p-2.5 rounded-2xl flex items-center gap-2.5 border transition-transform duration-200 cursor-pointer shadow-lg backdrop-blur-xl ${
                isCurrentUser
                  ? "bg-violet-950/80 border-violet-400 shadow-glow-violet scale-110"
                  : "bg-slate-900/90 border-slate-700 hover:scale-105"
              }`}
              style={{
                borderColor: isCurrentUser ? "#A855F7" : domainColor,
                boxShadow: `0 0 15px ${domainColor}33`
              }}
            >
              <img
                src={student.avatarUrl}
                alt={student.fullName}
                className="h-8 w-8 rounded-full object-cover border border-slate-700 shrink-0"
              />
              <div className="text-left min-w-0 pr-1">
                <div className="text-[11px] font-bold text-white truncate max-w-[100px]">
                  {student.fullName}
                </div>
                <div className="text-[9px] text-slate-400 truncate max-w-[100px]">
                  {student.preferredRole}
                </div>
              </div>
            </div>
          )
        }
      };
    });
  }, [visibleStudents, currentUser]);

  // Construct React Flow Edges from verified connections
  const initialEdges: Edge[] = useMemo(() => {
    return connections
      .filter((c) => {
        return (
          visibleStudents.some((s) => s.id === c.userId1) &&
          visibleStudents.some((s) => s.id === c.userId2)
        );
      })
      .map((conn) => ({
        id: conn.id,
        source: conn.userId1,
        target: conn.userId2,
        animated: true,
        style: { stroke: "#8B5CF6", strokeWidth: 1.5, opacity: 0.7 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#8B5CF6" }
      }));
  }, [connections, visibleStudents]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when filter changes
  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const handleNodeClick = useCallback(
    (_: any, node: Node) => {
      const student = allStudents.find((s) => s.id === node.id);
      if (student) setSelectedStudent(student);
    },
    [allStudents]
  );

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Network className="h-7 w-7 text-cyan-400" />
            Connection Universe
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Interactive constellation graph of students, collaborative affinities, and verified edges.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedDomain("all")}
            className={`px-3 py-1 rounded-xl transition-all font-medium ${
              selectedDomain === "all"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Constellations
          </button>
          {Object.keys(DOMAIN_COLOR_MAP).slice(0, 4).map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1 rounded-xl transition-all font-medium ${
                selectedDomain === dom
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Canvas Container */}
      <div className="glass-panel rounded-3xl border-violet-500/30 h-[680px] relative overflow-hidden">
        {/* Subtle Ambient Legend Overlay */}
        <div className="absolute top-4 left-4 z-10 glass-panel p-3 rounded-2xl border-slate-800 text-xs text-slate-300 space-y-1.5 pointer-events-none">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Constellation Map
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            <span>AI & Machine Learning</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span>FinTech & Web3</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-pink-400" />
            <span>Healthcare & Bio</span>
          </div>
        </div>

        {/* React Flow Viewport */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          fitView
          className="bg-cyber-dark"
        >
          <Background color="#1e293b" gap={24} size={1} variant={BackgroundVariant.Dots} />
          <Controls className="glass-panel border-slate-800 text-white" />
          <MiniMap
            nodeColor={(n) => {
              if (n.id === currentUser.id) return "#8B5CF6";
              return "#06B6D4";
            }}
            maskColor="rgba(6, 8, 15, 0.7)"
            className="glass-panel border-slate-800 rounded-xl"
          />
        </ReactFlow>
      </div>

      {/* Student Profile Quick View Modal */}
      {selectedStudent && (
        <Dialog
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={selectedStudent.fullName}
          description={`${selectedStudent.department} • ${selectedStudent.college}`}
        >
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <img
                src={selectedStudent.avatarUrl}
                alt={selectedStudent.fullName}
                className="h-16 w-16 rounded-2xl object-cover border-2 border-violet-400"
              />
              <div>
                <div className="text-xs font-semibold text-cyan-300">{selectedStudent.preferredRole}</div>
                <div className="text-xs text-slate-400">Level {selectedStudent.level} ({selectedStudent.xp} XP)</div>
                <div className="text-xs text-slate-400">{selectedStudent.availableHoursPerWeek} hrs/week available</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {selectedStudent.bio}
            </p>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-1.5">Technical Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.skills.map((sk) => (
                  <Badge key={sk} variant="violet" className="text-xs">
                    {sk}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  try {
                    sendConnectionRequest(selectedStudent.id);
                  } catch {}
                  setSelectedStudent(null);
                }}
              >
                Send Connection Request
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

