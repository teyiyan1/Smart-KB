import React, { ReactNode, useState, useCallback, useMemo } from 'react';
import { Position, useNodeId, useReactFlow, useNodes, useEdges } from '@xyflow/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ActionsBar from '../../../../imports/ActionsBar';
import FoldedBadge from '../FoldedBadge';
import { ConnectionHandleVisual } from '../ConnectionHandleVisual';
import { getDescendants } from '../graphDescendants';
import { useNodeHoverHighlight } from '../NodeHoverHighlightContext';

interface BaseNodeProps {
  children: ReactNode;
  selected?: boolean;
  className?: string;
  headerColor?: string;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const BaseNode = ({ children, selected, className, headerColor = 'bg-blue-500' }: BaseNodeProps) => {
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
      className={cn('relative', isMenuOpen ? 'z-[60]' : '')}
      onMouseEnter={() => nodeId && setHoveredNodeId(nodeId)}
      onMouseLeave={() => setHoveredNodeId(null)}
    >
      <div
        className={cn(
          'rounded-[8px] bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] w-[260px] group hover:[&_.group>img]:scale-[2] relative overflow-visible border-[1.5px] border-solid outline-none ring-0',
          'transition-[box-shadow,border-color]',
          isHoverHot
            ? 'border-[#EE4D2D] shadow-[0_8px_28px_rgba(0,0,0,0.08)]'
            : selected
              ? 'border-transparent shadow-[0_8px_28px_rgba(0,0,0,0.08)]'
              : 'border-transparent',
          className
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
        {children}
      </div>
      {isFolded && (
        <div
          className="nodrag nopan absolute -translate-y-1/2 z-[80] pointer-events-auto"
          style={{ left: 'calc(100% - 4px)', top: 'calc(50% + 11px)' }}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="translate-y-[10px]">
            <FoldedBadge
              count={hiddenCount}
              onClick={(e) => {
                e.stopPropagation();
                handleFold();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseNode;

export const NodeHeader = ({
  icon,
  title,
  colorClass = 'bg-blue-100 text-blue-600'
}: {
  icon: ReactNode;
  title: string;
  colorClass?: string;
}) => (
  <div className={cn('px-3 py-2 border-b border-gray-100 flex items-center gap-2 rounded-t-[8px]', colorClass)}>
    {icon}
    <span className="text-[14px] font-medium leading-[22px] text-gray-700">{title}</span>
  </div>
);


export const NodeBody = ({ children }: { children: ReactNode }) => (
  <div className="p-3 text-xs text-gray-600 px-[8px] py-[8px]">
    {children}
  </div>
);

// 右侧 source 连接点：拖拽时 + 号、行 hover 呼吸灯
const CustomHandle = ({ id, type = 'source', position = Position.Right }: { id: string; type?: 'source' | 'target'; position?: Position }) => (
    <div className="group relative flex h-full w-full items-center justify-center">
        <ConnectionHandleVisual
            handleId={id}
            type={type}
            position={position}
            dotClassName="group-hover:scale-[2] group-hover:drop-shadow-[0_0_6px_rgba(107,114,128,0.55)]"
        />
    </div>
);

export const NodeField = ({
  label,
  handleId,
}: {
  label: string;
  handleId: string;
}) => (
  <div className="relative flex items-center justify-between py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-md mb-2 transition-colors group">
    <span className="text-gray-700 truncate pr-4 text-[11px] font-medium group-hover:text-gray-900">{label}</span>

    {/* 与卡片主右侧连接点对齐：抵消 NodeBody px-8，圆心落在卡片竖边上 */}
    <div className="absolute right-[-8px] top-1/2 z-[25] -translate-y-1/2 w-4 h-4 translate-x-1/2 nodrag nopan">
      <CustomHandle id={handleId} />
    </div>
  </div>
);
