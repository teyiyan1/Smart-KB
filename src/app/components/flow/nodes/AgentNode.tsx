import React from 'react';
import { NodeProps, Position } from '@xyflow/react';
import BaseNode, { NodeHeader, NodeBody, NodeField } from './BaseNode';
import { BulbIcon, ForkIcon } from '../Icons';
import NodeIcon from '../../../../imports/NodeIcon';
import { ConnectionHandleVisual } from '../ConnectionHandleVisual';

type AgentNodeData = {
  title: string;
  type?: 'agent' | 'clarification';
  options: { id: string; label: string; isEnd?: boolean }[];
};

const AgentNode = ({ data, selected, id }: NodeProps<AgentNodeData>) => {
  const isEDDNode = id === 'days-since-delivery';
  const isClarification = data.type === 'clarification';

  let icon;
  if (isEDDNode) {
     icon = <div className="w-6 h-6"><NodeIcon /></div>;
  } else {
     icon = isClarification ? <BulbIcon /> : <ForkIcon />;
  }

  let headerClass;
  if (isEDDNode) {
    headerClass = 'bg-[#EFFAFF] border-b border-gray-100 pb-2 pt-3 px-3';
  } else if (isClarification) {
    headerClass = 'bg-[#FFFDF2] border-b border-[#FFFDF2] pb-2 pt-3 px-3';
  } else {
    headerClass = 'bg-white border-b-0 pb-0 pt-3 px-3';
  }

  return (
    <BaseNode selected={selected} className={isEDDNode && !selected ? 'shadow-sm' : ''}>
      <NodeHeader icon={icon} title={data.title} colorClass={headerClass} />
      <NodeBody>
        <div className="flex flex-col gap-0 pt-2">
          {data.options.map((option) => (
            <NodeField key={option.id} handleId={option.id} label={option.label} />
          ))}
        </div>
      </NodeBody>

      {/* 左侧 target 放在内容之后，避免被卡片底色盖住 */}
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

export default AgentNode;
