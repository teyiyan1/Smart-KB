import React from 'react';
import { NodeProps, Position } from '@xyflow/react';
import BaseNode, { NodeHeader, NodeBody, NodeField } from './BaseNode';
import { ConnectionHandleVisual } from '../ConnectionHandleVisual';
import NodeIcon from '../../../../imports/NodeIcon';

type ConditionNodeData = {
  title?: string;
  options?: { id: string; label: string; isEnd?: boolean }[];
};

const ConditionNode = ({ data, selected }: NodeProps<ConditionNodeData>) => {
  // 与 AgentNode（EDD / days-since-delivery）一致：w-6 h-6 + NodeIcon
  const icon = (
    <div className="h-6 w-6 shrink-0">
      <NodeIcon />
    </div>
  );

  const options = data.options ?? [{ id: 'default', label: 'Default' }];

  return (
    <BaseNode selected={selected}>
      <NodeHeader
        icon={icon}
        title={data.title ?? 'condition node'}
        colorClass="bg-[#EFF6FF] border-b border-[#DBEAFE] pb-2 pt-3 px-3"
      />
      <NodeBody>
        <div className="flex flex-col gap-0 pt-2">
          {options.map((option) => (
            <NodeField key={option.id} handleId={option.id} label={option.label} />
          ))}
        </div>
      </NodeBody>
      <ConnectionHandleVisual
        handleId="target"
        type="target"
        position={Position.Left}
        wrapperClassName="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2"
        dotClassName="group-hover:scale-[2] group-hover:drop-shadow-[0_0_6px_rgba(107,114,128,0.55)]"
      />
    </BaseNode>
  );
};

export default ConditionNode;
