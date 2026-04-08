import React from 'react';
import { NodeProps, Position } from '@xyflow/react';
import BaseNode, { NodeBody } from './BaseNode';
import svgPaths from '../../../../imports/svg-iitfkiuxso';
import { ConnectionHandleVisual } from '../ConnectionHandleVisual';

type AnswerNodeData = {
  title?: string;
  text: string;
};

const AnswerNode = ({ data, selected }: NodeProps<AnswerNodeData>) => {
  return (
    <BaseNode selected={selected}>
      {/* Custom Header matching Figma design */}
      <div className="bg-[#faffea] flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-t-[8px] border-b border-[#f5f5f5] z-0">
        <div className="bg-[#a0d911] flex items-center justify-center p-[3px] rounded-[4px] shrink-0 size-[24px]">
          <div className="overflow-clip relative shrink-0 size-[18px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p12784000} fill="white" />
            </svg>
          </div>
        </div>
        <span className="font-medium text-[14px] leading-[22px] text-[rgba(0,0,0,0.87)]">
          {data.title || 'Answer node'}
        </span>
      </div>

      <NodeBody>
        <p className="mt-1 line-clamp-2 break-words text-xs text-gray-500 italic leading-relaxed">
          {data.text}
        </p>
      </NodeBody>

      {/* 呼吸点放在内容之后 + z-index，避免被 header/body 底色裁切 */}
      <ConnectionHandleVisual
        handleId="target"
        type="target"
        position={Position.Left}
        wrapperClassName="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2"
        dotClassName="group-hover:scale-[2] group-hover:drop-shadow-[0_0_6px_rgba(107,114,128,0.55)]"
      />
      <ConnectionHandleVisual
        handleId="source"
        type="source"
        position={Position.Right}
        wrapperClassName="absolute right-0 top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2"
        dotClassName="group-hover:scale-[2] group-hover:drop-shadow-[0_0_6px_rgba(107,114,128,0.55)]"
      />
    </BaseNode>
  );
};

export default AnswerNode;
