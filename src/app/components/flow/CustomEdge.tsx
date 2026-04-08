import React, { useState } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  MarkerType,
  useReactFlow,
} from '@xyflow/react';
import { X } from 'lucide-react';
import { SHOPEE_PRIMARY, useNodeHoverHighlight } from './NodeHoverHighlightContext';

const CustomEdge = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const { hoveredNodeId } = useNodeHoverHighlight();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isHovered, setIsHovered] = useState(false);

  const isNodeLinked =
    hoveredNodeId != null && (source === hoveredNodeId || target === hoveredNodeId);
  const isHot = isHovered || isNodeLinked;

  const markerEndResolved = isHot
    ? { type: MarkerType.ArrowClosed, color: SHOPEE_PRIMARY, width: 12.5, height: 12.5 }
    : markerEnd;

  const handleEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEndResolved}
        style={{
          ...style,
          stroke: isHot ? SHOPEE_PRIMARY : '#D9D9D9',
          strokeWidth: isHot ? 1.5 : 1,
          cursor: 'pointer',
          transition: 'stroke 0.2s, stroke-width 0.2s',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Interaction path (invisible, wider for easier hovering) */}
      <path
        d={edgePath}
        fill="none"
        strokeOpacity={0}
        strokeWidth={20}
        className="react-flow__edge-interaction"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: 'pointer' }}
      />

      {isHovered && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              onClick={handleEdgeClick}
              className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md transition-colors"
              aria-label="Delete connection"
            >
              <X size={12} />
            </button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default CustomEdge;
