import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  useReactFlow,
  ReactFlowProvider,
  Panel,
  EdgeChange,
  NodeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Plus,
  Minus,
  Maximize,
  MousePointer2,
  Hand,
  Undo2,
  Redo2,
  Moon,
  Sun,
  PlusCircle
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'motion/react';

import StartNode from './nodes/StartNode';
import AgentNode from './nodes/AgentNode';
import AnswerNode from './nodes/AnswerNode';
import CustomEdge from './CustomEdge';
import { initialNodes, initialEdges } from './initialData';
import NodePannel from './NodePanel';
import TopBar from './TopBar';
import ActionBarOther from './ActionBarOther';
import { NodeHoverHighlightProvider, useNodeHoverHighlight } from './NodeHoverHighlightContext';

const nodeTypes = {
  start: StartNode,
  agent: AgentNode,
  answer: AnswerNode,
  clarification: AgentNode, // Reuse same component
};

const connectionLineStyle = {
  strokeWidth: 1,
  stroke: '#D9D9D9',
};

const edgeTypes = {
  custom: CustomEdge,
};

const defaultEdgeOptions = {
  type: 'custom',
};

/** 侧栏默认宽度（与设计稿 400 一致） */
const DRAWER_WIDTH_DEFAULT = 400;
/** 最小宽度：表单区可读下限；极窄视口时再收缩 */
const DRAWER_WIDTH_MIN = 320;
/** 最大宽度：超宽屏下单侧栏不宜再放大，避免版面失衡 */
const DRAWER_WIDTH_MAX = 720;
/** 画布至少保留的可视宽度（视口足够时生效） */
const DRAWER_CANVAS_MIN_VISIBLE = 220;
/** 侧栏不超过视口比例（与 max 取较小） */
const DRAWER_MAX_VIEWPORT_RATIO = 0.88;

function getDrawerWidthBounds(): { min: number; max: number } {
  const vw = window.innerWidth;
  const min = Math.min(DRAWER_WIDTH_MIN, Math.max(260, vw - 24));
  const maxByCanvas = vw - DRAWER_CANVAS_MIN_VISIBLE;
  const maxByRatio = Math.floor(vw * DRAWER_MAX_VIEWPORT_RATIO);
  const maxRaw = Math.min(DRAWER_WIDTH_MAX, maxByCanvas, maxByRatio);
  const max = Math.max(min, maxRaw);
  return { min: Math.round(min), max: Math.round(max) };
}

function clampDrawerWidth(px: number): number {
  const { min, max } = getDrawerWidthBounds();
  return Math.min(max, Math.max(min, Math.round(px)));
}

// History Management Hook
function useHistory(initialNodes: Node[], initialEdges: Edge[]) {
  const [history, setHistory] = useState<{nodes: Node[], edges: Edge[]}[]>([{ nodes: initialNodes, edges: initialEdges }]);
  const [index, setIndex] = useState(0);

  const takeSnapshot = useCallback((nodes: Node[], edges: Edge[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, index + 1);
      newHistory.push({ nodes, edges });
      return newHistory;
    });
    setIndex(prev => prev + 1);
  }, [index]);

  const undo = useCallback(() => {
    if (index > 0) {
      setIndex(prev => prev - 1);
      return history[index - 1];
    }
    return null;
  }, [index, history]);

  const redo = useCallback(() => {
    if (index < history.length - 1) {
      setIndex(prev => prev + 1);
      return history[index + 1];
    }
    return null;
  }, [index, history]);

  return { takeSnapshot, undo, redo, canUndo: index > 0, canRedo: index < history.length - 1 };
}

const FlowCanvasInner = ({ onBack }: { onBack?: () => void }) => {
  const { setHoveredNodeId } = useNodeHoverHighlight();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { setViewport, getZoom, zoomIn, zoomOut, fitView } = useReactFlow();
  const { theme, setTheme } = useTheme();

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(() => clampDrawerWidth(DRAWER_WIDTH_DEFAULT));
  const [isResizingDrawer, setIsResizingDrawer] = useState(false);
  const [drawerBounds, setDrawerBounds] = useState(() => getDrawerWidthBounds());
  const drawerResizePointerId = useRef<number | null>(null);

  const handleDrawerResizePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || e.detail > 1) return;
    e.preventDefault();
    e.stopPropagation();
    drawerResizePointerId.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    setIsResizingDrawer(true);
    const next = window.innerWidth - e.clientX;
    setDrawerWidth(clampDrawerWidth(next));
  }, []);

  const handleDrawerResizePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (drawerResizePointerId.current !== e.pointerId) return;
    const next = window.innerWidth - e.clientX;
    setDrawerWidth(clampDrawerWidth(next));
  }, []);

  const endDrawerResize = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (drawerResizePointerId.current !== e.pointerId) return;
    drawerResizePointerId.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* released */
    }
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    setIsResizingDrawer(false);
  }, []);

  const handleDrawerResizeDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDrawerWidth(clampDrawerWidth(DRAWER_WIDTH_DEFAULT));
  }, []);

  useEffect(() => {
    const onResize = () => {
      setDrawerBounds(getDrawerWidthBounds());
      setDrawerWidth((w) => clampDrawerWidth(w));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) return;
    setDrawerBounds(getDrawerWidthBounds());
    setDrawerWidth((w) => clampDrawerWidth(w));
  }, [isDrawerOpen]);

  // Signal to close popups when pane is clicked
  const [paneClickSignal, setPaneClickSignal] = useState(0);

  // Interaction Mode State (Default: Mouse-friendly = true)
  const [isHandMode, setIsHandMode] = useState(true);

  // History
  const { takeSnapshot, undo, redo, canUndo, canRedo } = useHistory(initialNodes, initialEdges);
  // Debounce snapshot taking
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdges = addEdge({ ...params, type: 'custom' }, edges);
      setEdges(newEdges);
      takeSnapshot(nodes, newEdges);
    },
    [edges, nodes, setEdges, takeSnapshot]
  );

  // Wrap onNodesChange to take snapshots
  const onNodesChangeWrapped = useCallback((changes: NodeChange[]) => {
    onNodesChange(changes);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {}, 500);
  }, [onNodesChange]);

  useEffect(() => {
    const handler = setTimeout(() => {}, 1000);
    return () => clearTimeout(handler);
  }, [nodes, edges]);

  const handleUndo = useCallback(() => {
    const state = undo();
    if (state) {
      setNodes(state.nodes);
      setEdges(state.edges);
    }
  }, [undo, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    const state = redo();
    if (state) {
      setNodes(state.nodes);
      setEdges(state.edges);
    }
  }, [redo, setNodes, setEdges]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
        e.preventDefault();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        handleRedo();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  const addNode = (nodeType: string, nodeData: Record<string, unknown>) => {
    const id = `${nodeType}-${Date.now()}`;
    const newNode: Node = {
      id,
      type: nodeType,
      position: { x: 200 + Math.random() * 300, y: 100 + Math.random() * 300 },
      data: nodeData,
    };
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    takeSnapshot(newNodes, edges);
  };

  const [zoomPercent, setZoomPercent] = useState(100);
  useEffect(() => {
     const interval = setInterval(() => {
        setZoomPercent(Math.round(getZoom() * 100));
     }, 100);
     return () => clearInterval(interval);
  }, [getZoom]);

  // Handle Node Click
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.id === 'days-since-delivery') {
      setIsDrawerOpen(true);
    }
  }, []);

  // connectionDragThreshold=0：按下即进入连线，拖拽视觉（橙圆/+、目标光晕）立即生效
  return (
    <div className="flex flex-col w-full h-full relative bg-gray-50 dark:bg-gray-900 transition-colors overflow-hidden">
      <TopBar onBack={onBack} />
      <div className="flex-1 w-full h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          className="bg-dot-pattern"
          minZoom={0.1}
          maxZoom={2}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineStyle={connectionLineStyle}
          connectionDragThreshold={0}
          panOnScroll={!isHandMode}
          zoomOnScroll={isHandMode}
          panOnDrag={isHandMode}
          selectionOnDrag={!isHandMode}
          zoomOnPinch={!isHandMode}
          onPaneClick={() => {
            setPaneClickSignal((c) => c + 1);
            setHoveredNodeId(null);
          }}
        >
          <Background gap={16} size={1} color={theme === 'dark' ? '#333' : '#ddd'} />

          {/* Bottom Bar Overlay */}
          <Panel position="bottom-center" className="mb-8">
            <ActionBarOther
                onAddNode={addNode}
                onZoomIn={() => zoomIn()}
                onZoomOut={() => zoomOut()}
                onFitView={() => {
                    setNodes(initialNodes.map((n) => ({ ...n })));
                    setEdges(initialEdges.map((e) => ({ ...e })));
                    setTimeout(() => fitView({ duration: 400 }), 50);
                }}
                zoomLevel={zoomPercent}
                isHandMode={isHandMode}
                closeSignal={paneClickSignal}
                onToggleInteractionMode={() => setIsHandMode(!isHandMode)}
            />
          </Panel>
        </ReactFlow>

        {/* Side Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                width: drawerWidth,
                minWidth: drawerBounds.min,
                maxWidth: drawerBounds.max,
              }}
              className="absolute top-0 right-0 z-50 flex h-full min-w-0 flex-col overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            >
              <div
                role="separator"
                aria-orientation="vertical"
                aria-label="拖拽调整面板宽度，双击恢复默认"
                aria-valuemin={drawerBounds.min}
                aria-valuemax={drawerBounds.max}
                aria-valuenow={drawerWidth}
                className="group absolute left-0 top-0 z-[60] h-full w-4 -translate-x-1/2 cursor-col-resize select-none touch-none outline-none"
                style={{ touchAction: 'none' }}
                onPointerDown={handleDrawerResizePointerDown}
                onPointerMove={handleDrawerResizePointerMove}
                onPointerUp={endDrawerResize}
                onPointerCancel={endDrawerResize}
                onDoubleClick={handleDrawerResizeDoubleClick}
              >
                {/* 居中白色胶囊：拖拽把手 */}
                <span
                  className={[
                    'pointer-events-none absolute left-1/2 top-1/2 z-[1] h-9 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-0 bg-white',
                    'shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-[box-shadow,transform] duration-200',
                    'dark:bg-gray-800 dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)]',
                    'group-hover:shadow-[0_2px_12px_rgba(0,0,0,0.14)] dark:group-hover:shadow-[0_2px_14px_rgba(0,0,0,0.45)]',
                    isResizingDrawer
                      ? 'scale-[1.06] shadow-[0_2px_14px_rgba(0,0,0,0.16)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.5)]'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-hidden
                />
              </div>
              <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
                <NodePannel onCancel={() => setIsDrawerOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FlowCanvas = ({ onBack }: { onBack?: () => void }) => (
  <ReactFlowProvider>
    <NodeHoverHighlightProvider>
      <FlowCanvasInner onBack={onBack} />
    </NodeHoverHighlightProvider>
  </ReactFlowProvider>
);

export default FlowCanvas;
