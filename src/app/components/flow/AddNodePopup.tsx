import React, { useEffect, useRef } from 'react';
import svgPaths from '../../../imports/svg-y4yd4vpj7d';

// Bulb icon (Clarification Node) - yellow bg
function BulbIcon() {
  return (
    <div className="bg-[#faad14] content-stretch flex items-center justify-center p-[3px] relative rounded-[4px] shrink-0 size-[24px]">
      <svg width="12" height="16" viewBox="0 0 11.53 15.75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.875 14.4844H3.65625C3.57891 14.4844 3.51563 14.5477 3.51563 14.625V15.1875C3.51563 15.4986 3.76699 15.75 4.07813 15.75H7.45313C7.76426 15.75 8.01563 15.4986 8.01563 15.1875V14.625C8.01563 14.5477 7.95234 14.4844 7.875 14.4844ZM5.76563 0C2.58223 0 0 2.58223 0 5.76563C0 7.89961 1.16016 9.76289 2.88281 10.7596V12.7969C2.88281 13.108 3.13418 13.3594 3.44531 13.3594H8.08594C8.39707 13.3594 8.64844 13.108 8.64844 12.7969V10.7596C10.3711 9.76289 11.5313 7.89961 11.5313 5.76563C11.5313 2.58223 8.94902 0 5.76563 0ZM8.01387 9.66445L7.38281 10.0301V12.0938H4.14844V10.0301L3.51738 9.66445C2.13398 8.86465 1.26563 7.3916 1.26563 5.76563C1.26563 3.28008 3.28008 1.26563 5.76563 1.26563C8.25117 1.26563 10.2656 3.28008 10.2656 5.76563C10.2656 7.3916 9.39727 8.86465 8.01387 9.66445Z" fill="white" />
      </svg>
    </div>
  );
}

// Fork icon (Condition Node / Agent) - blue bg
function ForkIcon() {
  return (
    <div className="bg-[#1890ff] content-stretch flex items-center p-[3px] relative rounded-[4px] shrink-0 size-[24px]">
      <div className="-scale-y-100 flex items-center justify-center size-full">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={svgPaths.p26da3b00} fill="white" />
        </svg>
      </div>
    </div>
  );
}

// Chat read icon (Answer Node) - lime bg
function ChatReadIcon() {
  return (
    <div className="bg-[#a0d911] content-stretch flex items-center justify-center p-[3px] relative rounded-[4px] shrink-0 size-[24px]">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 13.5H4.5L1.5 16.5V3C1.5 2.175 2.175 1.5 3 1.5H15C15.825 1.5 16.5 2.175 16.5 3V8.25H15V3H3V12H9V13.5ZM17.25 10.755L16.1925 9.6975L13.0125 12.8775L11.4225 11.2875L10.365 12.345L13.005 15L17.25 10.755Z" fill="white" />
      </svg>
    </div>
  );
}

export type NodeTypeOption = {
  label: string;
  nodeType: string;
  nodeData: Record<string, unknown>;
  icon: React.ReactNode;
};

const NODE_CATEGORIES: { category: string; nodes: NodeTypeOption[] }[] = [
  {
    category: 'Clarification Node',
    nodes: [
      {
        label: 'Clarification Node',
        nodeType: 'agent',
        icon: <BulbIcon />,
        nodeData: {
          title: 'Clarification Node',
          type: 'clarification',
          options: [{ id: 'opt-1', label: 'Option 1' }],
        },
      },
    ],
  },
  {
    category: 'Condition Node',
    nodes: [
      {
        label: 'Condition Node',
        nodeType: 'agent',
        icon: <ForkIcon />,
        nodeData: {
          title: 'Condition Node',
          type: 'agent',
          options: [{ id: 'opt-1', label: 'Option 1' }],
        },
      },
      {
        label: 'Agent or Chatbot',
        nodeType: 'agent',
        icon: <ForkIcon />,
        nodeData: {
          title: 'Agent or Chatbot',
          type: 'agent',
          options: [{ id: 'opt-1', label: 'Option 1' }],
        },
      },
    ],
  },
  {
    category: 'Answer Node',
    nodes: [
      {
        label: 'Answer Node',
        nodeType: 'answer',
        icon: <ChatReadIcon />,
        nodeData: { text: 'New answer node...' },
      },
    ],
  },
];

interface AddNodePopupProps {
  onSelect: (nodeType: string, nodeData: Record<string, unknown>) => void;
  onClose: () => void;
}

export default function AddNodePopup({ onSelect, onClose }: AddNodePopupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Use capture mode so event fires even if ReactFlow stops propagation
    document.addEventListener('mousedown', handleClick, true);
    return () => document.removeEventListener('mousedown', handleClick, true);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute bottom-full mb-[8px] left-0 bg-white border border-[#f5f5f5] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] py-[16px] w-[252px] z-50 overflow-clip"
    >
      <div className="flex flex-col gap-[24px]">
        {NODE_CATEGORIES.map((cat) => (
          <div key={cat.category} className="flex flex-col gap-[8px] px-[16px]">
            <p className="font-medium text-[16px] text-[rgba(0,0,0,0.85)] leading-normal">{cat.category}</p>
            {cat.nodes.map((node) => (
              <button
                key={node.label}
                onClick={() => { onSelect(node.nodeType, node.nodeData); onClose(); }}
                className="bg-white border border-[#e8e8e8] content-stretch flex flex-col gap-[6px] items-start p-[8px] relative rounded-[6px] w-full text-left hover:border-[#1890ff] hover:bg-[#f0f7ff] transition-colors cursor-pointer"
              >
                <div className="flex gap-[6px] items-center w-full">
                  {node.icon}
                  <span className="font-medium text-[14px] text-[rgba(0,0,0,0.87)] leading-[22px]">{node.label}</span>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
