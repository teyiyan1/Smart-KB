import React, { useState, useCallback, useMemo } from 'react';
import { Position, useNodeId, useReactFlow, useNodes, useEdges } from '@xyflow/react';
import { cn } from './BaseNode';
import ActionsBar from '../../../../imports/ActionsBar';
import FoldedBadge from '../FoldedBadge';
import { ConnectionHandleVisual } from '../ConnectionHandleVisual';
import { getDescendants } from '../graphDescendants';
import { useNodeHoverHighlight } from '../NodeHoverHighlightContext';
import svgPaths from '../../../../imports/svg-7t1rmd3je8';

function IconPlayCircle() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / PlayCircle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_30_162)" id="Icon / PlayCircle">
          <path clipRule="evenodd" d={svgPaths.p23b4cf80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_30_162">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StartIcon() {
  return (
    <div className="bg-[#52c41a] content-stretch flex items-center justify-center relative rounded-[2px] size-[24px]">
      <IconPlayCircle />
    </div>
  );
}

const StartNode = ({ selected }: { selected?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFolded, setIsFolded] = useState(false);
  const [hiddenCount, setHiddenCount] = useState(0);

  const nodeId = useNodeId();
  const nodes = useNodes();
  const edges = useEdges();
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const { hoveredNodeId, setHoveredNodeId } = useNodeHoverHighlight();
  const isHoverHot = nodeId != null && hoveredNodeId === nodeId;

  const foldDisabled = useMemo(() => {
    if (!nodeId) return true;
    const current = nodes.find((n) => n.id === nodeId);
    if (!current) return true;
    return getDescendants(current, nodes, edges).length === 0;
  }, [nodeId, nodes, edges]);

  const handleFold = useCallback(() => {
    if (!nodeId) return;

    const nodes = getNodes();
    const edges = getEdges();
    const currentNode = nodes.find((n) => n.id === nodeId);

    if (!currentNode) return;

    if (isFolded) {
        const descendants = getDescendants(currentNode, nodes, edges);
        const descendantIds = new Set(descendants.map(n => n.id));

        setNodes((ns) =>
            ns.map((n) => {
                if (descendantIds.has(n.id)) {
                    return { ...n, hidden: false };
                }
                return n;
            })
        );

        setEdges((es) =>
            es.map((e) => {
                if (descendantIds.has(e.target)) {
                    return { ...e, hidden: false };
                }
                return e;
            })
        );

        setIsFolded(false);
        setHiddenCount(0);
    } else {
        const descendants = getDescendants(currentNode, nodes, edges);
        const descendantIds = new Set(descendants.map(n => n.id));

        if (descendants.length === 0) return;

        setNodes((ns) =>
            ns.map((n) => {
                if (descendantIds.has(n.id)) {
                    return { ...n, hidden: true };
                }
                return n;
            })
        );

        setEdges((es) =>
            es.map((e) => {
                if (descendantIds.has(e.target)) {
                    return { ...e, hidden: true };
                }
                return e;
            })
        );

        setHiddenCount(descendants.length);
        setIsFolded(true);
    }

    setIsMenuOpen(false);
  }, [nodeId, isFolded, getNodes, getEdges, setNodes, setEdges]);

  return (
    <div
      onMouseEnter={() => nodeId && setHoveredNodeId(nodeId)}
      onMouseLeave={() => setHoveredNodeId(null)}
      className={cn(
        'rounded-[8px] bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] flex items-center border-[1.5px] border-solid outline-none pr-4 pl-1 py-1 gap-2 group min-w-[120px] relative overflow-visible',
        'transition-[box-shadow,border-color]',
        isHoverHot
          ? 'border-[#EE4D2D] shadow-[0_8px_28px_rgba(0,0,0,0.08)]'
          : selected
            ? 'border-green-500 shadow-[0_8px_28px_rgba(0,0,0,0.1)]'
            : 'border-transparent',
        isMenuOpen ? 'z-[60]' : ''
      )}
    >
      <div
        className={cn(
          'absolute bottom-full right-0 pb-[8px] z-50',
          isFolded ? 'hidden' : isMenuOpen ? 'flex' : 'hidden group-hover:flex'
        )}
      >
        <ActionsBar
          open={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          onFold={handleFold}
          foldDisabled={foldDisabled}
        />
      </div>
      <div className="w-8 h-8 flex items-center justify-center">
        <StartIcon />
      </div>
      <span className="text-sm font-medium text-gray-700">Start</span>

      <ConnectionHandleVisual
        handleId="source"
        type="source"
        position={Position.Right}
        wrapperClassName="absolute right-0 top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2"
        dotClassName="group-hover:scale-[2] group-hover:drop-shadow-[0_0_6px_rgba(107,114,128,0.55)]"
      />
      {isFolded && (
        <div
          className="nodrag nopan absolute top-1/2 z-[80] -translate-y-1/2 pointer-events-auto"
          style={{ left: '100%' }}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <FoldedBadge
            count={hiddenCount}
            onClick={(e) => {
              e.stopPropagation();
              handleFold();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StartNode;
