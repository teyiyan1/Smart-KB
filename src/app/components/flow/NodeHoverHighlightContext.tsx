import React, { createContext, useContext, useMemo, useState } from 'react';

/** 虾皮主色：节点 hover 高亮、关联连线、连接点 */
export const SHOPEE_PRIMARY = '#EE4D2D';

type NodeHoverHighlightContextValue = {
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;
};

const NodeHoverHighlightContext = createContext<NodeHoverHighlightContextValue | null>(null);

export function NodeHoverHighlightProvider({ children }: { children: React.ReactNode }) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const value = useMemo(
    () => ({ hoveredNodeId, setHoveredNodeId }),
    [hoveredNodeId]
  );
  return (
    <NodeHoverHighlightContext.Provider value={value}>{children}</NodeHoverHighlightContext.Provider>
  );
}

export function useNodeHoverHighlight(): NodeHoverHighlightContextValue {
  const ctx = useContext(NodeHoverHighlightContext);
  if (!ctx) {
    return { hoveredNodeId: null, setHoveredNodeId: () => {} };
  }
  return ctx;
}
