import React from 'react';
import { Handle, Position, useConnection, useNodeId, type HandleType } from '@xyflow/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dotImage from '@/assets/dot.png';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

/** 与 React Flow 内部一致：无 id 的 handle 用 null / undefined / '' 表示 */
function normHandleId(id: string | null | undefined) {
  if (id === undefined || id === null || id === '') return null;
  return id;
}
function sameHandleId(a: string | null | undefined, b: string | null | undefined) {
  return normHandleId(a) === normHandleId(b);
}

type Props = {
  /** 不传或与 Handle 的 id 一致；Start 等无 id 的 source 不要传 */
  handleId?: string | null;
  type: HandleType;
  position: Position;
  /** 外层容器 class，用于 absolute 定位到节点边缘 */
  wrapperClassName?: string;
  /** Handle 上额外 className */
  handleClassName?: string;
  /** 圆点 img 额外 className */
  dotClassName?: string;
};

/**
 * 连接拖拽视觉：source 拖拽时显示橙底白 +；target 被有效吸附时显示光晕 + 放大圆点
 */
export function ConnectionHandleVisual({
  handleId: handleIdProp,
  type,
  position,
  wrapperClassName,
  handleClassName,
  dotClassName,
}: Props) {
  const nodeId = useNodeId();
  const connection = useConnection();
  const handleId = normHandleId(handleIdProp);

  const inProgress = connection?.inProgress === true;

  const isFromThisHandle =
    inProgress &&
    connection.fromHandle?.nodeId === nodeId &&
    sameHandleId(connection.fromHandle?.id, handleId) &&
    connection.fromHandle?.type === type;

  const isValidTargetHover =
    inProgress &&
    connection.isValid === true &&
    connection.toHandle != null &&
    connection.toHandle.nodeId === nodeId &&
    sameHandleId(connection.toHandle.id, handleId) &&
    connection.toHandle.type === type;

  return (
    <div
      className={cn(
        /* 必须在卡片内容之上，否则左右圆点会被 header/body 底色盖住一半 */
        'relative z-[30] nodrag nopan',
        wrapperClassName
      )}
    >
      {/* target 吸附时的光晕 */}
      {isValidTargetHover && (
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(238, 77, 45, 0.45) 0%, rgba(255, 180, 120, 0.2) 40%, transparent 72%)',
            animation: 'handle-halo-pulse 1.2s ease-in-out infinite',
          }}
          aria-hidden
        />
      )}
      <img
        src={dotImage}
        alt=""
        className={cn(
          'custom-handle-dot pointer-events-none relative z-[1] h-4 w-4 rounded-full transition-all duration-200',
          isFromThisHandle && 'opacity-0 scale-0',
          isValidTargetHover && 'scale-[2] drop-shadow-[0_0_10px_rgba(238,77,45,0.85)]',
          dotClassName
        )}
      />
      {/* source 正在从此点拖出时显示 + */}
      {type === 'source' && (
        <span
          className={cn(
            'pointer-events-none absolute left-1/2 top-1/2 z-[2] flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EE4D2D] text-xs font-bold text-white transition-all duration-200',
            isFromThisHandle ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          )}
          aria-hidden
        >
          +
        </span>
      )}
      <Handle
        type={type}
        position={position}
        id={handleIdProp ? String(handleIdProp) : undefined}
        className={cn(
          '!absolute !inset-0 !z-[3] !h-4 !w-4 !border-none !bg-transparent !opacity-0',
          handleClassName
        )}
      />
    </div>
  );
}
