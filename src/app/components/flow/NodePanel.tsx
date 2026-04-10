import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Reorder, useDragControls } from 'motion/react';
import svgPaths from '../../../imports/svg-y4yd4vpj7d';
import iconInfoCircle from '@/assets/icons/icon-info-circle.png';
import iconPlayNode from '@/assets/icons/icon-play-node.png';

function NodeIconBlue() {
  return (
    <div className="bg-[#1890ff] content-stretch flex items-center p-[3px] relative rounded-[4px] shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[18px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p26da3b00} fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconDragHandle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.1877 11.5756C10.1877 11.3303 10.2851 11.0951 10.4584 10.9217C10.6318 10.7482 10.8669 10.6507 11.1121 10.6505C11.2336 10.6505 11.3539 10.6744 11.4661 10.7209C11.5783 10.7674 11.6802 10.8356 11.766 10.9215C11.8519 11.0074 11.92 11.1094 11.9664 11.2216C12.0128 11.3338 12.0367 11.4541 12.0366 11.5756C12.0366 11.8203 11.9395 12.055 11.7667 12.2283C11.5939 12.4016 11.3594 12.4993 11.1147 12.5C10.9931 12.5003 10.8727 12.4765 10.7603 12.4302C10.6479 12.3839 10.5457 12.3158 10.4596 12.23C10.3735 12.1441 10.3052 12.0421 10.2585 11.9298C10.2119 11.8175 10.1878 11.6972 10.1877 11.5756ZM5.96094 11.5756C5.96085 11.4541 5.9847 11.3338 6.03112 11.2216C6.07754 11.1094 6.14562 11.0074 6.23147 10.9215C6.31732 10.8356 6.41926 10.7674 6.53145 10.7209C6.64365 10.6744 6.76391 10.6505 6.88537 10.6505C7.1306 10.6507 7.36573 10.7482 7.53907 10.9217C7.71242 11.0951 7.80979 11.3303 7.80979 11.5756C7.80962 11.8207 7.71217 12.0557 7.53885 12.2291C7.36552 12.4024 7.13049 12.4998 6.88537 12.5C6.64019 12.5 6.40506 12.4026 6.2317 12.2292C6.05833 12.0559 5.96094 11.8207 5.96094 11.5756ZM10.1877 8C10.1877 7.75483 10.2851 7.51969 10.4585 7.34633C10.6318 7.17297 10.867 7.07557 11.1121 7.07557C11.2336 7.07549 11.3539 7.09934 11.4661 7.14576C11.5783 7.19217 11.6803 7.26025 11.7662 7.3461C11.8521 7.43195 11.9203 7.53389 11.9668 7.64609C12.0133 7.75829 12.0372 7.87855 12.0372 8C12.0372 8.24517 11.9398 8.48031 11.7665 8.65367C11.5931 8.82703 11.358 8.92443 11.1128 8.92443C10.8676 8.92443 10.6324 8.82705 10.4589 8.65371C10.2854 8.48036 10.1879 8.24523 10.1877 8ZM5.96094 8C5.96094 7.75483 6.05833 7.51969 6.2317 7.34633C6.40506 7.17297 6.64019 7.07557 6.88537 7.07557C7.00682 7.07549 7.1271 7.09934 7.23933 7.14576C7.35156 7.19217 7.45354 7.26025 7.53945 7.3461C7.62536 7.43195 7.69351 7.53389 7.74001 7.64609C7.7865 7.75829 7.81044 7.87855 7.81044 8C7.81027 8.24512 7.71282 8.48015 7.53949 8.65348C7.36616 8.82681 7.13113 8.92426 6.88601 8.92443C6.76456 8.92451 6.64428 8.90066 6.53205 8.85425C6.41982 8.80783 6.31783 8.73975 6.23192 8.6539C6.14601 8.56805 6.07786 8.46611 6.03137 8.35391C5.98487 8.24171 5.96094 8.12145 5.96094 8ZM10.1877 4.42443C10.1878 4.30284 10.2119 4.18246 10.2585 4.07017C10.3052 3.95789 10.3735 3.8559 10.4596 3.77004C10.5457 3.68418 10.6479 3.61614 10.7603 3.5698C10.8727 3.52347 10.9931 3.49975 11.1147 3.5C11.3599 3.5 11.595 3.5974 11.7684 3.77076C11.9418 3.94412 12.0391 4.17926 12.0391 4.42443C12.0391 4.6696 11.9418 4.90474 11.7684 5.0781C11.595 5.25146 11.3599 5.34886 11.1147 5.34886C10.9931 5.3492 10.8726 5.32554 10.7602 5.27923C10.6477 5.23292 10.5455 5.16489 10.4594 5.07901C10.3733 4.99314 10.305 4.89111 10.2583 4.77879C10.2117 4.66646 10.1877 4.54604 10.1877 4.42443ZM5.96094 4.42443C5.96094 4.17926 6.05833 3.94412 6.2317 3.77076C6.40506 3.5974 6.64019 3.5 6.88537 3.5C7.13049 3.50017 7.36552 3.59762 7.53885 3.77095C7.71217 3.94428 7.80962 4.17931 7.80979 4.42443C7.80979 4.6696 7.7124 4.90474 7.53904 5.0781C7.36567 5.25146 7.13054 5.34886 6.88537 5.34886C6.64019 5.34886 6.40506 5.25146 6.2317 5.0781C6.05833 4.90474 5.96094 4.6696 5.96094 4.42443Z" fill="#C0C0C0" />
    </svg>
  );
}

/**
 * 禁用时 hover：cursor-not-allowed + 气泡提示
 * 设计对照 Figma（node 1052-126150）:
 * https://www.figma.com/design/ty5HfWwz3gHgLdaC7ZmicQ/Smart-KB%E6%9C%80%E7%BB%88%E4%BA%A4%E4%BB%98?node-id=1052-126150&m=dev
 */
function IconPlus({
  disabled,
  title: tooltipText,
}: {
  disabled?: boolean;
  /** 禁用时 hover 气泡文案（与设计稿一致） */
  title?: string;
}) {
  const tipId = useId();

  const inner = (
    <div
      className={`bg-gray-100 content-stretch flex items-center p-[3px] relative rounded-[4px] shrink-0 transition-colors ${
        disabled ? 'opacity-75' : 'cursor-pointer hover:bg-gray-200'
      }`}
    >
      <div className="relative shrink-0 size-[16px]">
        <svg className="block size-full text-gray-700" fill="none" viewBox="0 0 16 16" aria-hidden>
          <path d={svgPaths.p395dab00} fill="currentColor" />
        </svg>
      </div>
    </div>
  );

  if (disabled && tooltipText) {
    return (
      <span
        className="group/plus relative inline-flex cursor-not-allowed select-none"
        aria-describedby={tipId}
      >
        {inner}
        <span
          id={tipId}
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-[100] mt-[6px] w-max max-w-[min(280px,calc(100vw-24px))] -translate-x-1/2 whitespace-normal rounded-[4px] bg-[rgba(0,0,0,0.85)] px-[10px] py-[8px] text-center font-normal text-[12px] leading-[16px] text-white opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-opacity duration-150 group-hover/plus:opacity-100"
        >
          {tooltipText}
        </span>
      </span>
    );
  }

  return inner;
}

/** 设计稿为圆环 +「i」点 + 竖条；Figma 导出 SVG 常缺竖条，改用切图保证 1:1 */
function CsIconInfoCircle() {
  return (
    <div className="relative shrink-0 size-[16px]" aria-hidden>
      <img src={iconInfoCircle} alt="" width={16} height={16} className="block size-full object-contain" draggable={false} />
    </div>
  );
}

function NodeTitle() {
  return (
    <div className="bg-[#fafafa] border-[#d9d9d9] border-b border-solid content-stretch flex min-w-0 w-full flex-col gap-[4px] h-[86px] items-start justify-center p-[16px] relative shrink-0">
      <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
        <NodeIconBlue />
        <div className="content-stretch flex flex-1 gap-[6px] items-center min-w-0">
          <span className="capitalize font-normal text-[16px] text-[rgba(0,0,0,0.87)] whitespace-nowrap">condition node</span>
          <div className="content-stretch flex items-center p-[3px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <path d={svgPaths.p2a3a4700} fill="rgba(0,0,0,0.45)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          {/* Play：与 CsIconInfoCircle 同为 16×16 */}
          <div
            className="relative flex shrink-0 items-center justify-center overflow-clip size-[16px] cursor-pointer rounded-[4px] transition-colors hover:bg-gray-100"
            aria-hidden
          >
            <img
              src={iconPlayNode}
              alt=""
              width={16}
              height={16}
              className="block size-full object-contain"
              draggable={false}
            />
          </div>
          {/* Ellipsis (20px) */}
          <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px] cursor-pointer hover:bg-gray-100 rounded-[4px] transition-colors">
            <svg width="9.5" height="1.5" viewBox="0 0 9.5 1.5" fill="none">
              <path d={svgPaths.p1f689400} fill="rgba(0,0,0,0.88)" />
              <path d={svgPaths.p2185f780} fill="rgba(0,0,0,0.88)" />
              <path d={svgPaths.p2b103280} fill="rgba(0,0,0,0.88)" />
            </svg>
          </div>
        </div>
      </div>
      <span className="font-normal text-[#666] text-[12px]">Node ID：SOP3_F5_NODE21</span>
    </div>
  );
}

// ─── Edit Function Modal assets (Figma node 3316-115437) ──────────────────────
const EF_QUESTION_ICON = 'https://www.figma.com/api/mcp/asset/c6b22975-5d7d-4942-be1e-f66f95707d25';
const EF_CLOSE_ICON    = 'https://www.figma.com/api/mcp/asset/5ce15efe-104b-4dd7-a829-9aeeefb3f49d';
const EF_COPY_ICON     = 'https://www.figma.com/api/mcp/asset/c50be622-5f6c-4e34-82ed-62027f7247eb';
const EF_DELETE_ICON   = 'https://www.figma.com/api/mcp/asset/c4cf9d36-8b40-45c0-96df-35b87274b349';
const EF_ARROW_DOWN    = 'https://www.figma.com/api/mcp/asset/c233789b-a460-4423-b90c-bf683a6599d5';
const EF_PLUS_ICON     = 'https://www.figma.com/api/mcp/asset/b7f73d1d-6465-445f-b84e-52aeb8fa4028';
const EF_WARNING_ICON  = 'https://www.figma.com/api/mcp/asset/0aa7916c-37b5-441c-91c8-ce393911c8e8';

function EfRadio({ selected }: { selected?: boolean }) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className={`absolute bg-white border-solid inset-0 rounded-[10px] ${selected ? 'border-[5px] border-[#ee4d2d]' : 'border border-[#e8e8e8]'}`} />
    </div>
  );
}

function EfDropdown({ value, width }: { value: string; width?: string }) {
  return (
    <div
      className={`bg-white border border-solid border-[#e8e8e8] flex gap-[12px] items-center px-[12px] py-[7px] rounded-[6px] shrink-0 transition-colors hover:border-[#d9d9d9] ${width ?? 'flex-1'}`}
    >
      <p className="font-normal text-[#333] text-[14px] leading-[18px] overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0">{value}</p>
      <div className="relative shrink-0 size-[16px]">
        <div className="absolute inset-[31.25%_15.63%_31.25%_18.75%]">
          <img alt="" className="absolute block max-w-none size-full" src={EF_ARROW_DOWN} />
        </div>
      </div>
    </div>
  );
}

function EfConditionGroup({ name, operator }: { name: string; operator: string }) {
  return (
    <div className="border border-solid border-[#e8e8e8] flex flex-col gap-[12px] items-start p-[16px] rounded-[8px] shrink-0 w-full">
      {/* Group name header */}
      <div className="flex gap-[16px] items-center w-full">
        <div className="flex flex-1 gap-[16px] items-center min-w-0">
          <div className="flex gap-[4px] h-[32px] items-center shrink-0 whitespace-nowrap">
            <p className="font-medium text-[rgba(0,0,0,0.85)] text-[14px] leading-[16px]">Condition Group Name</p>
            <p className="font-normal text-[#ee4d2d] text-[14px]">{' *'}</p>
          </div>
          <div className="bg-white border border-solid border-[#e8e8e8] flex flex-1 h-[32px] items-center min-w-0 px-[12px] py-[7px] rounded-[4px] transition-colors">
            <p className="flex-1 font-normal text-[#333] text-[14px] leading-[18px] min-w-0">{name}</p>
          </div>
        </div>
        <div className="flex gap-[8px] items-center shrink-0">
          <div className="overflow-clip relative shrink-0 size-[18px] cursor-pointer hover:opacity-60 transition-opacity">
            <div className="absolute inset-[6.25%_15.63%]">
              <img alt="" className="absolute block max-w-none size-full" src={EF_COPY_ICON} />
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[18px] cursor-pointer hover:opacity-60 transition-opacity">
            <div className="absolute inset-[10.94%_12.5%]">
              <img alt="" className="absolute block max-w-none size-full" src={EF_DELETE_ICON} />
            </div>
          </div>
        </div>
      </div>
      {/* Condition body */}
      <div className="bg-[#fafafa] flex flex-col gap-[12px] items-start justify-center p-[16px] rounded-[4px] w-full">
        <div className="flex gap-[8px] items-center w-full">
          <p className="flex-1 font-medium text-[rgba(0,0,0,0.87)] text-[14px] leading-[18px] capitalize min-w-0">Condition 1</p>
          <div className="flex gap-[8px] items-center shrink-0">
            <div className="overflow-clip relative shrink-0 size-[18px] cursor-pointer hover:opacity-60 transition-opacity">
              <div className="absolute inset-[6.25%_15.63%]">
                <img alt="" className="absolute block max-w-none size-full" src={EF_COPY_ICON} />
              </div>
            </div>
            <div className="overflow-clip relative shrink-0 size-[18px] cursor-pointer hover:opacity-60 transition-opacity">
              <div className="absolute inset-[10.94%_12.5%]">
                <img alt="" className="absolute block max-w-none size-full" src={EF_DELETE_ICON} />
              </div>
            </div>
          </div>
        </div>
        {/* Row 1: left – operator – right */}
        <div className="flex gap-[8px] items-start w-full">
          <EfDropdown value="Current Time" />
          <EfDropdown value="–" width="w-[100px]" />
          <EfDropdown value="Order Delivered Time" />
        </div>
        {/* Row 2: comparison + value + unit */}
        <div className="flex gap-[8px] items-start w-full">
          <EfDropdown value={operator} width="w-[140px]" />
          <div className="bg-white border border-solid border-[#e8e8e8] flex flex-1 h-[32px] items-center min-w-0 overflow-clip rounded-[6px] transition-colors hover:border-[#d9d9d9]">
            <div className="flex flex-1 h-full items-center overflow-clip px-[12px] py-[4px] relative">
              <div aria-hidden className="absolute bg-white inset-0 pointer-events-none" />
              <p className="font-normal text-[#333] text-[14px] leading-[18px] whitespace-nowrap relative z-[1]">30D</p>
            </div>
            <div className="flex h-full items-center overflow-clip border-l border-solid border-[#e8e8e8] px-[12px] py-[5px] relative rounded-br-[2px] rounded-tr-[2px] shrink-0 w-[80px]">
              <div aria-hidden className="absolute bg-[#fafafa] inset-0 pointer-events-none rounded-br-[2px] rounded-tr-[2px]" />
              <div className="flex flex-1 gap-[8px] items-center min-w-0 overflow-clip relative z-[1]">
                <p className="flex-1 font-normal text-[rgba(0,0,0,0.85)] text-[14px] text-center leading-[22px]">Day</p>
                <div className="relative shrink-0 size-[16px]">
                  <div className="absolute inset-[31.25%_15.63%_31.25%_18.75%]">
                    <img alt="" className="absolute block max-w-none size-full" src={EF_ARROW_DOWN} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="button" className="border border-solid border-[#e8e8e8] flex items-center px-[8px] py-[5px] rounded-[4px] shrink-0 bg-transparent cursor-pointer hover:border-[#ee4d2d] transition-colors">
          <p className="font-medium text-[#333] text-[12px] text-center leading-[14px] whitespace-nowrap">+ Sub Condition</p>
        </button>
      </div>
      <button type="button" className="border border-[#ee4d2d] flex flex-col items-center px-[16px] py-[8px] rounded-[6px] shrink-0 bg-transparent cursor-pointer hover:bg-[#fff5f0] transition-colors">
        <p className="font-medium text-[#ee4d2d] text-[14px] leading-[16px] whitespace-nowrap">+ Condition</p>
      </button>
    </div>
  );
}

function EditFunctionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-[16px]">
      <div role="presentation" className="absolute inset-0 bg-black/45" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ef-dialog-title"
        className="relative z-[1] flex max-h-[calc(100vh-48px)] w-[760px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[8px] bg-white shadow-[0px_0px_16px_0px_rgba(0,0,0,0.1),0px_8px_16px_0px_rgba(0,0,0,0.04)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-[24px] overflow-y-auto overscroll-contain p-[24px]">
        {/* Title */}
        <div className="flex items-start shrink-0 w-full">
          <div className="flex flex-1 gap-[4px] items-center min-w-0">
            <p id="ef-dialog-title" className="font-medium text-[#333] text-[20px] leading-[normal] whitespace-nowrap shrink-0">Edit Function</p>
            <div className="relative shrink-0 size-[16px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[14px] top-1/2">
                <img alt="" className="absolute block max-w-none size-full" src={EF_QUESTION_ICON} />
              </div>
            </div>
          </div>
          <button type="button" onClick={onClose} className="relative shrink-0 size-[16px] cursor-pointer border-0 bg-transparent p-0 ml-[16px]" aria-label="Close">
            <div className="absolute inset-[12.5%_7.41%_10.54%_13.66%]">
              <img alt="" className="absolute block max-w-none size-full" src={EF_CLOSE_ICON} />
            </div>
          </button>
        </div>

        {/* Steps */}
        <div className="flex gap-[16px] items-center justify-center shrink-0 w-full">
          <div className="flex flex-col items-start shrink-0">
            <div className="flex gap-[8px] items-center shrink-0">
              <div className="bg-[#ee4d2d] border border-[#d9d9d9] flex flex-col items-center justify-center p-[5px] rounded-[32px] shrink-0 w-[32px]">
                <p className="font-normal text-[#bfbfbf] text-[14px] leading-[22px] text-center w-full">1</p>
              </div>
              <p className="capitalize font-normal text-[rgba(0,0,0,0.85)] text-[14px] leading-[22px] whitespace-nowrap">Function Basic Info</p>
            </div>
          </div>
          <div className="bg-[#ee4d2d] h-px rounded-[4px] shrink-0 w-[120px]" />
          <div className="flex flex-col items-start shrink-0">
            <div className="flex gap-[8px] items-center shrink-0">
              <div className="bg-[#ee4d2d] flex flex-col items-center justify-center p-[5px] rounded-[32px] shrink-0 w-[32px]">
                <p className="font-normal text-white text-[14px] leading-[22px] text-center w-full">2</p>
              </div>
              <p className="capitalize font-normal text-[#262626] text-[14px] leading-[22px] whitespace-nowrap">Conditions Settings</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[24px] items-start shrink-0 w-full">
          {/* Function Type radio */}
          <div className="flex gap-[16px] items-center w-full">
            <div className="flex gap-[4px] h-[32px] items-center shrink-0 w-[128px] whitespace-nowrap">
              <p className="font-normal text-[rgba(0,0,0,0.85)] text-[14px] leading-[16px]">Function Type</p>
              <p className="font-normal text-[#ee4d2d] text-[14px] text-center leading-[16px]">{' *'}</p>
            </div>
            <div className="flex gap-[24px] items-start shrink-0">
              <div className="flex gap-[8px] items-start shrink-0">
                <EfRadio />
                <p className="font-normal text-[#333] text-[14px] leading-[16px] whitespace-nowrap">Variable</p>
              </div>
              <div className="flex gap-[8px] items-start shrink-0">
                <EfRadio selected />
                <p className="font-normal text-[#333] text-[14px] leading-[16px] whitespace-nowrap">Formula</p>
              </div>
            </div>
          </div>

          {/* Condition groups */}
          <EfConditionGroup name=">=30D" operator=">=" />
          <EfConditionGroup name="<30D" operator="<" />

          {/* + Condition Group dashed */}
          <div className="flex items-start w-full">
            <div className="border border-[#d8d8d8] border-dashed flex flex-1 gap-[4px] items-center justify-center overflow-clip p-[8px] rounded-[4px] cursor-pointer hover:border-[#ee4d2d] hover:bg-[#fff5f0] transition-colors">
              <div className="overflow-clip relative shrink-0 size-[16px]">
                <div className="absolute inset-[14.84%_16.41%]">
                  <img alt="" className="absolute block max-w-none size-full" src={EF_PLUS_ICON} />
                </div>
              </div>
              <p className="font-normal text-[#333] text-[14px] text-center leading-[22px] whitespace-nowrap">Condition Group</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-[12px] items-start shrink-0 w-full">
          <div className="bg-[#fff6e1] border border-[#ffce3d] flex gap-[8px] items-start pl-[16px] pr-[12px] py-[12px] rounded-[4px] w-full">
            <div className="relative shrink-0 size-[16px]">
              <div className="absolute inset-[6.25%_5.43%_6.25%_7.07%]">
                <img alt="" className="absolute block max-w-none size-full" src={EF_WARNING_ICON} />
              </div>
            </div>
            <p className="flex-1 font-normal text-[#666] text-[14px] leading-[16px] min-w-0">
              Changes here will overwrite the original function settings and apply to all Smart SOPs, QAs, and Issues using it.
            </p>
          </div>
          <div className="flex items-center justify-end w-full">
            <div className="flex gap-[16px] items-center shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="border border-[#e5e5e5] flex flex-col items-center px-[16px] py-[8px] rounded-[6px] shrink-0 bg-transparent cursor-pointer hover:border-[#ccc] transition-colors"
              >
                <p className="font-medium text-[#333] text-[14px] leading-[16px] whitespace-nowrap">Back</p>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#ee4d2d] flex flex-col items-center px-[16px] py-[8px] rounded-[6px] shrink-0 border-0 cursor-pointer hover:bg-[#d63f20] transition-colors"
              >
                <p className="font-medium text-white text-[14px] leading-[16px] whitespace-nowrap">Save</p>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

const TEXT_AL_POPUP_MAX_W = 400;

function computeTextAlPopupPos(anchor: DOMRectReadOnly, popupH: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const margin = 16;
  const gap = 8;
  const popupW = Math.min(TEXT_AL_POPUP_MAX_W, vw - 32);
  const estH = popupH > 0 ? popupH : 280;

  let right = vw - anchor.right;
  const left = vw - right - popupW;
  if (left < margin) {
    right = Math.max(margin, vw - margin - popupW);
  }

  let top = anchor.bottom + gap;
  if (top + estH > vh - margin) {
    top = Math.max(margin, anchor.top - estH - gap);
  }
  return { top, right };
}

function useTextAlPopupPosition(
  open: boolean,
  anchorRef: React.RefObject<HTMLElement | null>,
  popupRef: React.RefObject<HTMLDivElement | null>,
) {
  const [pos, setPos] = useState({ top: 0, right: 0 });

  const recalc = useCallback(() => {
    const a = anchorRef.current;
    if (!open || !a) return;
    const ph = popupRef.current?.offsetHeight ?? 0;
    setPos(computeTextAlPopupPos(a.getBoundingClientRect(), ph));
  }, [open, anchorRef]);

  useLayoutEffect(() => {
    if (!open) return;
    recalc();
    let nestedRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      nestedRaf = requestAnimationFrame(recalc);
    });
    window.addEventListener('scroll', recalc, true);
    window.addEventListener('resize', recalc);
    return () => {
      cancelAnimationFrame(outerRaf);
      cancelAnimationFrame(nestedRaf);
      window.removeEventListener('scroll', recalc, true);
      window.removeEventListener('resize', recalc);
    };
  }, [open, recalc]);

  return pos;
}

function SelectFunction({
  hasFunction,
  selectedFnName,
  onRemoveFunction,
  onSelectFunction,
}: {
  hasFunction: boolean;
  selectedFnName?: string;
  onRemoveFunction: () => void;
  onSelectFunction: (fn: FlFn) => void;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const infoIconRef = useRef<HTMLDivElement>(null);
  const infoPopupRef = useRef<HTMLDivElement>(null);
  const infoPopupPos = useTextAlPopupPosition(showInfoPopup, infoIconRef, infoPopupRef);
  const infoHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInfoEnter = () => {
    if (infoHideTimer.current) clearTimeout(infoHideTimer.current);
    setShowInfoPopup(true);
  };
  const handleInfoLeave = () => {
    infoHideTimer.current = setTimeout(() => setShowInfoPopup(false), 120);
  };
  const handleInfoPopupEnter = () => {
    if (infoHideTimer.current) clearTimeout(infoHideTimer.current);
  };
  const handleInfoPopupLeave = () => {
    infoHideTimer.current = setTimeout(() => setShowInfoPopup(false), 120);
  };

  return (
    <div className="bg-white border-[#f5f5f5] border-b border-solid content-stretch flex flex-col gap-[8px] items-start p-[16px] relative shrink-0 w-full">
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <span className="font-medium text-[14px] text-[rgba(0,0,0,0.87)]">Select Function</span>
        {hasFunction ? (
          <IconPlus disabled title="Only one function can be added." />
        ) : (
          <div
            className="bg-[#fff5f0] flex items-center p-[3px] rounded-[4px] shrink-0 cursor-pointer hover:bg-[#ffe5d9] transition-colors"
            onClick={() => setShowLibraryModal(true)}
          >
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" viewBox="0 0 16 16" aria-hidden>
                <path d={svgPaths.p395dab00} fill="#ee4d2d" />
              </svg>
            </div>
          </div>
        )}
      </div>
      {hasFunction && (
        <div className="group bg-[#fafafa] border border-[#e5e5e5] border-solid content-stretch flex gap-[12px] h-[46px] items-center px-[8px] py-[2px] relative rounded-[6px] shrink-0 w-full hover:bg-gray-100 transition-colors cursor-pointer">
          <span className="flex-1 font-normal text-[#333] text-[14px] group-hover:text-gray-900">{selectedFnName ?? 'Days Since Delivery Done'}</span>
          <div
            ref={infoIconRef}
            className="flex shrink-0 items-center"
            onMouseEnter={handleInfoEnter}
            onMouseLeave={handleInfoLeave}
          >
            <CsIconInfoCircle />
          </div>
          <button
            type="button"
            aria-label="编辑功能"
            className="relative shrink-0 size-[16px] flex items-center justify-center rounded-[4px] border-0 bg-transparent p-0 cursor-pointer hover:bg-gray-200/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setEditOpen(true);
            }}
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" aria-hidden>
              <path d={svgPaths.p2a3a4700} fill="rgba(0,0,0,0.6)" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="移除功能"
            className="relative shrink-0 size-[16px] flex items-center justify-center rounded-[4px] border-0 bg-transparent p-0 cursor-pointer hover:bg-gray-200/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFunction();
            }}
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" aria-hidden>
              <path d={svgPaths.p8918ef0} fill="#666666" />
            </svg>
          </button>
        </div>
      )}
      {showInfoPopup && (
        <TextALPopup
          ref={infoPopupRef}
          top={infoPopupPos.top}
          right={infoPopupPos.right}
          onMouseEnter={handleInfoPopupEnter}
          onMouseLeave={handleInfoPopupLeave}
        />
      )}
      {showLibraryModal && <FunctionLibraryModal onClose={() => setShowLibraryModal(false)} onAdd={(fn) => { setShowLibraryModal(false); onSelectFunction(fn); }} />}
      <EditFunctionModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}

const TextALPopup = React.forwardRef<
  HTMLDivElement,
  {
    top: number;
    right: number;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  }
>(function TextALPopup({ top, right, onMouseEnter, onMouseLeave }, ref) {
  return createPortal(
    <div
      ref={ref}
      className="fixed z-[999] bg-white rounded-[4px] border border-[#f0f0f0] shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex flex-col gap-[12px] items-start px-[16px] py-[12px] w-[min(400px,calc(100vw-32px))]"
      style={{ top, right }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col gap-[4px] items-start w-full text-[#333]">
        <p className="font-medium leading-[20px] text-[16px] w-full">Days Since Delivery Done</p>
        <p className="font-normal leading-[18px] text-[14px] w-full">
          Description：This logic calculates the number of days that have passed since an order was marked as delivered.
        </p>
      </div>
      <div className="bg-[#fafafa] flex flex-col gap-[10px] items-start justify-center p-[12px] rounded-[6px] w-full">
        <p className="font-medium leading-[20px] text-[#262626] text-[14px]">{'>=30D'}</p>
        <div className="bg-white border border-[#f0f0f0] flex items-center px-[8px] py-[4px] rounded-[2px] w-full min-w-0">
          <p className="font-normal leading-[20px] text-[#262626] text-[14px] break-words">
            {'Current Time \u2013 Order Delivered Time  >= [Customize] 30D'}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
});

function ConditionRow({ id, label, onDelete, onDragHandlePointerDown }: { id: string; label: string; onDelete: (id: string) => void; onDragHandlePointerDown?: React.PointerEventHandler }) {
  const [showPopup, setShowPopup] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const popupPos = useTextAlPopupPosition(showPopup, iconRef, popupRef);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIconEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setShowPopup(true);
  };

  const handleIconLeave = () => {
    hideTimer.current = setTimeout(() => setShowPopup(false), 120);
  };

  const handlePopupEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const handlePopupLeave = () => {
    hideTimer.current = setTimeout(() => setShowPopup(false), 120);
  };

  return (
    <div className="group bg-[#fafafa] border border-[#e5e5e5] border-solid content-stretch flex min-h-px min-w-0 w-full flex-1 items-center relative rounded-[8px] h-[46px] hover:bg-gray-100 transition-colors cursor-pointer">
      <div className="content-stretch flex flex-1 flex-col h-[46px] items-start justify-center overflow-clip p-[12px]">
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
          <div
            className="relative shrink-0 size-[18px] cursor-grab active:cursor-grabbing touch-none select-none"
            onPointerDown={onDragHandlePointerDown}
          ><IconDragHandle /></div>
          <div className="content-stretch flex flex-1 items-center justify-between min-w-0">
            <span className="font-normal text-[12px] text-[rgba(0,0,0,0.85)] whitespace-nowrap group-hover:text-gray-900">{label}</span>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <div
                ref={iconRef}
                onMouseEnter={handleIconEnter}
                onMouseLeave={handleIconLeave}
                className="flex items-center"
              >
                <CsIconInfoCircle />
              </div>
              <div className="relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" viewBox="0 0 16 16" aria-hidden>
                  <path d={svgPaths.p254ef480} fill="#666666" />
                </svg>
              </div>
              <button
                type="button"
                aria-label="Delete condition"
                className="relative shrink-0 size-[16px] flex items-center justify-center rounded-[4px] cursor-pointer hover:bg-gray-200/80 transition-colors border-0 bg-transparent p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
              >
                <svg className="block size-full" fill="none" viewBox="0 0 16 16" aria-hidden>
                  <path d={svgPaths.p8918ef0} fill="#666666" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <TextALPopup
          ref={popupRef}
          top={popupPos.top}
          right={popupPos.right}
          onMouseEnter={handlePopupEnter}
          onMouseLeave={handlePopupLeave}
        />
      )}
    </div>
  );
}

function SortableConditionRow({ condition, onDelete }: { condition: { id: string; label: string }; onDelete: (id: string) => void }) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      as="div"
      value={condition}
      dragListener={false}
      dragControls={controls}
      className="list-none"
    >
      <ConditionRow
        id={condition.id}
        label={condition.label}
        onDelete={onDelete}
        onDragHandlePointerDown={(e) => { e.preventDefault(); controls.start(e); }}
      />
    </Reorder.Item>
  );
}

// Figma 资源 — Function Library Modal（node 3045-57917，有效期 7 天）
const FL_CLOSE_ICON  = 'https://www.figma.com/api/mcp/asset/a8e7615e-3d4c-4abd-a6c0-456aaa4e2298';
const FL_SEARCH_ICON = 'https://www.figma.com/api/mcp/asset/02eea5df-fb15-477d-bb69-a1de16387137';
const FL_FX_ICON     = 'https://www.figma.com/api/mcp/asset/9e09b414-1c9e-4350-a8a3-d40fc21139cb';

const FL_CATEGORIES = [
  { key: 'all',          label: 'All  function',      count: 225 },
  { key: 'order',        label: 'order',              count: 15  },
  { key: 'account',      label: 'Account & Fraud',    count: 19  },
  { key: 'digital',      label: 'Digital Product',    count: 9   },
  { key: 'logistics',    label: 'Logistics',          count: 12  },
  { key: 'cancellation', label: 'Order cancellation', count: 3   },
  { key: 'buyer',        label: 'Buyer',              count: 6   },
  { key: 'seller',       label: 'Seller',             count: 6   },
  { key: 'user',         label: 'User',               count: 6   },
];

const FL_FUNCTIONS = [
  { id: '1',  name: 'Days Since Delivery Done',      desc: "Answer the user's question about the picture representing the URL.",              tags: ['>=30D', '<30D'] },
  { id: '2',  name: 'Payment method',                desc: 'Payment channel, usually used to check if an order is COD，the rest enum is needed to confirmed', tags: ['COD', 'Bank Transfer', 'Indomaret', 'Klarna', 'Completed', 'ShopeePay', 'AirPay', '+3'] },
  { id: '3',  name: 'Is cancel pending',             desc: 'cancel order is pending seller approval or not',                                  tags: ['Yes', 'No'] },
  { id: '4',  name: 'Is integrated channel',         desc: 'Is integrated channel or not',                                                   tags: ['Yes', 'No'] },
  { id: '5',  name: 'Refund destination channel ID', desc: 'The destination the refund will return to',                                      tags: ['Credit or debit card', 'Shopee Pay', 'Shopee wallet', 'Bank account', 'Kredivo', 'JKO Pay', '+8'] },
  { id: '6',  name: 'order logistics status',        desc: 'Current logistic status of this order, usually check if status is delivered',    tags: ['Not started', 'Pickup done', 'Pickup retry', 'Shipped', 'Completed', 'Delivery done', 'Pickup failed', '+8'] },
  { id: '7',  name: 'Currency',                      desc: 'Currency Unit',                                                                  tags: ['THB', 'VND', 'BRL', 'IRR', 'MMK', 'SGD', 'IDR', 'MYR'] },
  { id: '8',  name: 'Is cancellable',                desc: 'Check if an order can be canceled or not',                                       tags: ['>=30D', '<30D'] },
  { id: '9',  name: 'Is order completed by user',    desc: 'When change to complete status, is completed by user or system',                tags: ['Yes', 'No'] },
  { id: '10', name: 'Order status',                  desc: '_',                                                                              tags: ['Delete', 'Unpaid', 'Paid', 'Shipped', 'Completed', 'Invalid', 'Cancel Processing', '+8'] },
];

type FlFn = typeof FL_FUNCTIONS[number];

function FunctionLibraryModal({ onClose, onAdd }: { onClose: () => void; onAdd?: (fn: FlFn) => void }) {
  const [activeCategory, setActiveCategory] = useState('order');
  const [search, setSearch] = useState('');

  const filtered = FL_FUNCTIONS.filter(
    (fn) => !search || fn.name.toLowerCase().includes(search.toLowerCase()) || fn.desc.toLowerCase().includes(search.toLowerCase()),
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-[12px] shadow-[0_0_16px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.04)] w-[900px] max-w-[calc(100vw-48px)] flex flex-col gap-[16px] p-[24px] h-[800px] max-h-[calc(100vh-48px)] overflow-hidden">
        {/* Header */}
        <div className="flex gap-[16px] items-center shrink-0">
          <p className="flex-1 font-medium text-[20px] leading-[normal] text-[#333]">Function Library</p>
          <button type="button" onClick={onClose} className="relative shrink-0 size-[16px] cursor-pointer border-0 bg-transparent p-0" aria-label="Close">
            <div className="absolute inset-[12.5%_7.41%_10.54%_13.66%]">
              <img alt="" className="absolute block max-w-none size-full" src={FL_CLOSE_ICON} />
            </div>
          </button>
        </div>
        {/* Search */}
        <div className="border border-[#d9d9d9] rounded-[6px] flex items-center h-[32px] px-[12px] gap-[8px] shrink-0 focus-within:border-[#ee4d2d] transition-colors">
          <div className="relative shrink-0 size-[14px]">
            <img alt="" className="absolute block max-w-none size-full" src={FL_SEARCH_ICON} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or description"
            className="flex-1 min-w-0 border-0 outline-none font-normal text-[14px] text-[rgba(0,0,0,0.85)] placeholder:text-[rgba(0,0,0,0.25)] leading-[22px] bg-transparent"
          />
        </div>
        {/* Body */}
        <div className="flex gap-[12px] flex-1 min-h-0 overflow-hidden">
          {/* Left category menu */}
          <div className="bg-[#fafafa] flex flex-col shrink-0 w-[220px] rounded-bl-[12px] rounded-tl-[12px] pt-[8px] overflow-y-auto">
            {FL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex gap-[4px] h-[42px] items-center px-[16px] w-full text-left border-0 transition-colors ${
                    isActive ? 'bg-[#fff5f0] text-[#ee4d2d] rounded-[6px]' : 'bg-transparent text-[rgba(0,0,0,0.85)] hover:bg-[#f0f0f0]'
                  }`}
                >
                  <span className="font-normal text-[14px] leading-[16px] capitalize whitespace-nowrap">{cat.label}</span>
                  <span className="font-normal text-[14px] leading-[16px]">({cat.count})</span>
                </button>
              );
            })}
          </div>
          {/* Right function list */}
          <div className="flex-1 flex flex-col gap-[12px] overflow-y-auto min-w-0 pr-[2px]">
            {filtered.map((fn) => (
              <div key={fn.id} className="bg-white border border-[#e5e5e5] flex gap-[16px] items-center p-[16px] rounded-[12px] shrink-0">
                <div className="bg-[rgba(255,131,29,0.1)] flex items-center justify-center rounded-[9px] shrink-0 size-[36px]">
                  <div className="overflow-clip relative shrink-0 size-[20px]">
                    <div className="absolute inset-[15.63%_17.67%_15.6%_17.75%]">
                      <img alt="" className="absolute block max-w-none size-full" src={FL_FX_ICON} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-[4px] min-w-0">
                  <p className="font-medium text-[14px] text-[rgba(0,0,0,0.85)] capitalize leading-[normal] whitespace-nowrap overflow-hidden text-ellipsis">{fn.name}</p>
                  <p className="font-normal text-[12px] text-[#595959] leading-[14px] overflow-hidden text-ellipsis whitespace-nowrap">{fn.desc}</p>
                  <div className="flex gap-[4px] items-center overflow-hidden" style={{ maxHeight: 16 }}>
                    {fn.tags.map((tag, i) => (
                      <div key={i} className="bg-[#f5f5f5] flex items-center justify-center px-[4px] py-px rounded-[2px] shrink-0">
                        <span className="font-normal text-[#595959] text-[10px] leading-[14px] whitespace-nowrap">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-white border border-[#d9d9d9] flex items-center justify-center px-[12px] py-[5px] rounded-[6px] shrink-0 w-[75px] cursor-pointer hover:border-[#ee4d2d] transition-colors group"
                  onClick={() => { onAdd?.(fn); onClose(); }}
                >
                  <span className="font-normal text-[14px] leading-[22px] text-[rgba(0,0,0,0.85)] group-hover:text-[#ee4d2d] transition-colors">Add</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="flex gap-[8px] items-center shrink-0">
          <span className="font-normal text-[14px] text-[rgba(0,0,0,0.65)] leading-[22px]">Can't find the function you want ?</span>
          <span className="font-normal text-[14px] text-[#2673dd] cursor-pointer leading-[22px] hover:opacity-80 transition-opacity">Create Function</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function SelectConditionModal({
  onClose,
  currentConditionLabels,
  selectedFn,
  onAddCondition,
}: {
  onClose: () => void;
  currentConditionLabels: string[];
  selectedFn: FlFn | null;
  onAddCondition: (label: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState('order');
  const [search, setSearch] = useState('');
  const defaultExpandId = selectedFn?.id ?? FL_FUNCTIONS[0].id;
  const [expandedId, setExpandedId] = useState<string | null>(defaultExpandId);

  const filtered = FL_FUNCTIONS.filter(
    (fn) => !search || fn.name.toLowerCase().includes(search.toLowerCase()) || fn.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-[12px] shadow-[0_0_16px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.04)] w-[900px] max-w-[calc(100vw-48px)] flex flex-col gap-[16px] p-[24px] h-[800px] max-h-[calc(100vh-48px)] overflow-hidden">
        {/* Header */}
        <div className="flex gap-[16px] items-center shrink-0">
          <p className="flex-1 font-medium text-[20px] leading-[normal] text-[#333]">Select Condition</p>
          <button type="button" onClick={onClose} className="relative shrink-0 size-[16px] cursor-pointer border-0 bg-transparent p-0" aria-label="Close">
            <div className="absolute inset-[12.5%_7.41%_10.54%_13.66%]">
              <img alt="" className="absolute block max-w-none size-full" src={FL_CLOSE_ICON} />
            </div>
          </button>
        </div>
        {/* Search */}
        <div className="border border-[#d9d9d9] rounded-[6px] flex items-center h-[32px] px-[12px] gap-[8px] shrink-0 focus-within:border-[#ee4d2d] transition-colors">
          <div className="relative shrink-0 size-[14px]">
            <img alt="" className="absolute block max-w-none size-full" src={FL_SEARCH_ICON} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or description"
            className="flex-1 min-w-0 border-0 outline-none font-normal text-[14px] text-[rgba(0,0,0,0.85)] placeholder:text-[rgba(0,0,0,0.25)] leading-[22px] bg-transparent"
          />
        </div>
        {/* Body */}
        <div className="flex gap-[12px] flex-1 min-h-0 overflow-hidden">
          {/* Left category menu */}
          <div className="bg-[#fafafa] flex flex-col shrink-0 w-[220px] rounded-bl-[12px] rounded-tl-[12px] pt-[8px] overflow-y-auto">
            {FL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex gap-[4px] h-[42px] items-center px-[16px] w-full text-left border-0 transition-colors ${
                    isActive ? 'bg-[#fff5f0] text-[#ee4d2d] rounded-[6px]' : 'bg-transparent text-[rgba(0,0,0,0.85)] hover:bg-[#f0f0f0]'
                  }`}
                >
                  <span className="font-normal text-[14px] leading-[16px] capitalize whitespace-nowrap">{cat.label}</span>
                  <span className="font-normal text-[14px] leading-[16px]">({cat.count})</span>
                </button>
              );
            })}
          </div>
          {/* Right function list with expandable conditions */}
          <div className="flex-1 flex flex-col gap-[12px] overflow-y-auto min-w-0 pr-[2px]">
            {filtered.map((fn) => {
              const isExpanded = expandedId === fn.id;
              return (
                <div key={fn.id} className="bg-white border border-[#e5e5e5] flex flex-col rounded-[12px] shrink-0 overflow-hidden">
                  {/* Card header */}
                  <div
                    className="flex gap-[16px] items-center p-[16px] cursor-pointer hover:bg-[#fafafa] transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : fn.id)}
                  >
                    <div className="bg-[rgba(255,131,29,0.1)] flex items-center justify-center rounded-[9px] shrink-0 size-[36px]">
                      <div className="overflow-clip relative shrink-0 size-[20px]">
                        <div className="absolute inset-[15.63%_17.67%_15.6%_17.75%]">
                          <img alt="" className="absolute block max-w-none size-full" src={FL_FX_ICON} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-[4px] min-w-0">
                      <p className="font-medium text-[14px] text-[rgba(0,0,0,0.85)] capitalize leading-[normal] whitespace-nowrap overflow-hidden text-ellipsis">{fn.name}</p>
                      <p className="font-normal text-[12px] text-[#595959] leading-[14px] overflow-hidden text-ellipsis whitespace-nowrap">{fn.desc}</p>
                    </div>
                    <svg
                      className={`shrink-0 size-[16px] text-[rgba(0,0,0,0.45)] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 16 16"
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {/* Expanded: condition rows */}
                  {isExpanded && (
                    <div className="border-t border-[#f0f0f0] flex flex-col">
                      {fn.tags.map((tag) => {
                        const isAdded = currentConditionLabels.includes(tag);
                        return (
                          <div key={tag} className="flex items-center gap-[16px] px-[16px] py-[10px] border-b border-[#f5f5f5] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                            <div className="bg-[#f5f5f5] flex items-center justify-center px-[8px] py-[2px] rounded-[4px] shrink-0">
                              <span className="font-normal text-[#595959] text-[12px] leading-[20px] whitespace-nowrap">{tag}</span>
                            </div>
                            <div className="flex-1" />
                            <button
                              type="button"
                              disabled={isAdded}
                              onClick={() => { if (!isAdded) onAddCondition(tag); }}
                              className={`flex items-center justify-center px-[12px] py-[5px] rounded-[6px] shrink-0 w-[75px] border transition-colors ${
                                isAdded
                                  ? 'bg-[#f5f5f5] border-[#e8e8e8] cursor-not-allowed'
                                  : 'bg-white border-[#d9d9d9] cursor-pointer hover:border-[#ee4d2d] group/add'
                              }`}
                            >
                              <span className={`font-normal text-[14px] leading-[22px] transition-colors ${isAdded ? 'text-[rgba(0,0,0,0.25)]' : 'text-[rgba(0,0,0,0.85)] group-hover/add:text-[#ee4d2d]'}`}>
                                {isAdded ? 'Added' : 'Add'}
                              </span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Footer */}
        <div className="flex gap-[8px] items-center shrink-0">
          <span className="font-normal text-[14px] text-[rgba(0,0,0,0.65)] leading-[22px]">Can't find the function you want ?</span>
          <span className="font-normal text-[14px] text-[#2673dd] cursor-pointer leading-[22px] hover:opacity-80 transition-opacity">Create Function</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ConditionSetting({
  initialConditions,
  onConditionsChange,
  selectedFn,
}: {
  initialConditions?: string[];
  onConditionsChange?: (rows: { id: string; label: string }[]) => void;
  selectedFn?: FlFn;
}) {
  const [conditions, setConditions] = useState<{ id: string; label: string }[]>(
    () => (initialConditions && initialConditions.length > 0
      ? initialConditions.map((label, i) => ({ id: `c${i + 1}`, label }))
      : [{ id: 'c1', label: '>=30D' }, { id: 'c2', label: '<30D' }]
    )
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    onConditionsChange?.(conditions);
  }, [conditions, onConditionsChange]);

  const handleDeleteCondition = (id: string) => {
    setConditions((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddCondition = (label: string) => {
    setConditions((prev) => {
      if (prev.some((c) => c.label === label)) return prev;
      return [...prev, { id: `c${Date.now()}`, label }];
    });
  };

  return (
    <div className="bg-white content-stretch flex min-w-0 w-full flex-col gap-[12px] items-stretch p-[16px] relative shrink-0">
      {showModal && (
        <SelectConditionModal
          onClose={() => setShowModal(false)}
          currentConditionLabels={conditions.map((c) => c.label)}
          selectedFn={selectedFn ?? null}
          onAddCondition={(label) => { handleAddCondition(label); setShowModal(false); }}
        />
      )}
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <div className="flex flex-col gap-[4px] flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[14px] text-[rgba(0,0,0,0.87)]">Condition Setting</span>
            {conditions.length <= 1 ? (
              <span className="inline-flex cursor-pointer" onClick={() => setShowModal(true)}>
                <IconPlus />
              </span>
            ) : (
              <IconPlus
                disabled
                title="Only one function can be added."
              />
            )}
          </div>
          <span className="font-normal text-[#999] text-[12px]">Condition configuration is arranged by priority.</span>
        </div>
      </div>
      <Reorder.Group
        as="div"
        axis="y"
        values={conditions}
        onReorder={setConditions}
        className="flex flex-col gap-[12px]"
      >
        {conditions.map((c) => (
          <SortableConditionRow key={c.id} condition={c} onDelete={handleDeleteCondition} />
        ))}
      </Reorder.Group>
      {/* Default row */}
      <div className="group bg-[#fafafa] border border-[#e5e5e5] border-solid content-stretch flex min-h-px min-w-0 w-full flex-1 flex-col items-start pr-[12px] py-[12px] relative rounded-[8px] hover:bg-gray-100 transition-colors cursor-pointer">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] relative shrink-0 w-full">
          <span className="flex-1 font-normal text-[12px] text-[rgba(0,0,0,0.87)] group-hover:text-gray-900">Default</span>
          <div className="relative shrink-0 size-[16px]">
            <svg className="block size-full" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths.p254ef480} fill="#666666" />
            </svg>
          </div>
          <div className="relative shrink-0 size-[16px]">
            <svg className="block size-full" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths.p2a3a4700} fill="rgba(0,0,0,0.6)" />
            </svg>
          </div>
        </div>
        <div className="pl-[12px] pt-[4px] w-full">
          <span className="font-normal text-[#666] text-[12px] group-hover:text-gray-800">When the if condition is not met, execute this command</span>
        </div>
      </div>
    </div>
  );
}

function Assignment() {
  return (
    <div className="bg-white border-[#f5f5f5] border-solid border-t content-stretch flex flex-col h-[57px] items-start p-[16px] relative shrink-0 w-full">
      <div className="flex items-center justify-between w-full">
        <span className="font-medium text-[14px] text-[rgba(0,0,0,0.87)]">Assignment</span>
        <IconPlus />
      </div>
    </div>
  );
}

export type NodePanelSavePayload = {
  title: string;
  conditionLabels: string[];
  /** 已移除函数：画布恢复为新建 Condition 占位节点 */
  clearedFunction?: boolean;
};

export default function NodePannel({
  onCancel,
  onSave,
  seed,
}: {
  onCancel?: () => void;
  onSave?: (payload: NodePanelSavePayload) => void;
  seed?: { title: string; conditionLabels: string[] } | null;
}) {
  const [selectedFn, setSelectedFn] = useState<FlFn | null>(null);
  const [conditionRows, setConditionRows] = useState<{ id: string; label: string }[]>([]);
  const [conditionsSynced, setConditionsSynced] = useState(false);

  useEffect(() => {
    if (!seed) {
      setSelectedFn(null);
      return;
    }
    const matched = FL_FUNCTIONS.find((f) => f.name === seed.title);
    if (matched) {
      setSelectedFn(matched);
      return;
    }
    // 画布卡片标题常为「EDD Exceeded」等展示文案，与函数库名称「Days Since Delivery Done」不一致，仍需带出已绑定的函数与条件
    const edd =
      FL_FUNCTIONS.find((f) => f.name === 'Days Since Delivery Done') ?? FL_FUNCTIONS[0];
    setSelectedFn(edd);
  }, [seed]);

  const conditionKey = seed && seed.conditionLabels.length > 0
    ? `seed:${seed.conditionLabels.join('|')}`
    : `fn:${selectedFn?.id ?? 'none'}`;

  const initialConditionLabels =
    seed && seed.conditionLabels.length > 0 ? seed.conditionLabels : selectedFn?.tags;

  useEffect(() => {
    setConditionsSynced(false);
    setConditionRows([]);
  }, [conditionKey]);

  const handleConditionsChange = useCallback((rows: { id: string; label: string }[]) => {
    setConditionRows(rows);
    setConditionsSynced(true);
  }, []);

  const handleSave = () => {
    if (!onSave) return;
    const title = selectedFn?.name ?? seed?.title ?? '';
    const labels =
      selectedFn != null
        ? conditionsSynced
          ? conditionRows.map((r) => r.label)
          : (initialConditionLabels ?? [])
        : (seed?.conditionLabels ?? []);
    onSave({
      title,
      conditionLabels: labels,
      clearedFunction: selectedFn === null,
    });
  };

  return (
    <div className="bg-[#fafafa] content-stretch flex min-h-0 min-w-0 w-full flex-col items-stretch relative shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] h-full">
      <NodeTitle />
      <div className="min-h-0 flex-1 w-full overflow-y-auto pb-[72px]">
        <SelectFunction
          hasFunction={selectedFn !== null}
          selectedFnName={selectedFn?.name}
          onRemoveFunction={() => setSelectedFn(null)}
          onSelectFunction={(fn) => setSelectedFn(fn)}
        />
        {selectedFn !== null && (
          <ConditionSetting
            key={conditionKey}
            initialConditions={initialConditionLabels}
            onConditionsChange={handleConditionsChange}
            selectedFn={selectedFn}
          />
        )}
        {selectedFn !== null && <Assignment />}
      </div>
      {/* Footer */}
      <div className="absolute bg-white content-stretch flex flex-col items-start justify-end left-0 p-[16px] bottom-0 w-full z-20">
        <div className="flex gap-[8px] items-center justify-end w-full">
          <button
            type="button"
            onClick={onCancel}
            className="bg-white cursor-pointer flex items-center px-[16px] py-[5px] relative rounded-[8px] shrink-0 border border-[#d9d9d9] hover:border-[#ee4d2d] transition-colors"
          >
            <span className="font-normal text-[14px] text-[rgba(0,0,0,0.85)]">Cancel</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!onSave}
            className="content-stretch flex h-[32px] items-center overflow-clip px-[16px] py-[6px] relative rounded-[8px] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.02)] shrink-0 cursor-pointer bg-[#ee4d2d] text-white hover:bg-[#d63f20] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="font-normal text-[14px] text-white">Save</span>
          </button>
        </div>
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_0px_0px_rgba(0,0,0,0.09)]" />
      </div>
    </div>
  );
}
