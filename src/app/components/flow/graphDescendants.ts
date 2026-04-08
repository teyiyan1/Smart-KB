import { getOutgoers, type Edge, type Node } from '@xyflow/react';

/** 从当前节点沿出边能到达的所有下游节点（不含自身） */
export function getDescendants(node: Node, nodes: Node[], edges: Edge[]): Node[] {
  const descendants = new Set<string>();
  const stack = [node.id];

  while (stack.length > 0) {
    const currentId = stack.pop()!;
    const outgoers = getOutgoers({ id: currentId } as Node, nodes, edges);

    for (const outgoer of outgoers) {
      if (!descendants.has(outgoer.id)) {
        descendants.add(outgoer.id);
        stack.push(outgoer.id);
      }
    }
  }

  return nodes.filter((n) => descendants.has(n.id));
}
