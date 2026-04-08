import React from 'react';
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

function IconPlus() {
  return (
    <div className="bg-gray-100 content-stretch flex items-center p-[3px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-gray-200 transition-colors">
      <div className="relative shrink-0 size-[16px]">
        <svg className="block size-full text-gray-700" fill="none" viewBox="0 0 16 16">
          <path d={svgPaths.p395dab00} fill="currentColor" />
        </svg>
      </div>
    </div>
  );
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

function SelectFunction() {
  return (
    <div className="bg-white border-[#f5f5f5] border-b border-solid content-stretch flex flex-col gap-[8px] items-start p-[16px] relative shrink-0 w-full">
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <span className="font-medium text-[14px] text-[rgba(0,0,0,0.87)]">Select Function</span>
        <IconPlus />
      </div>
      <div className="group bg-[#fafafa] border border-[#e5e5e5] border-solid content-stretch flex gap-[12px] h-[46px] items-center px-[8px] py-[2px] relative rounded-[6px] shrink-0 w-full hover:bg-gray-100 transition-colors cursor-pointer">
        <span className="flex-1 font-normal text-[#333] text-[14px] group-hover:text-gray-900">Days Since Delivery Done</span>
        <CsIconInfoCircle />
        <div className="relative shrink-0 size-[16px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p2a3a4700} fill="rgba(0,0,0,0.6)" />
          </svg>
        </div>
        <div className="relative shrink-0 size-[16px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p8918ef0} fill="#666666" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ConditionRow({ label }: { label: string }) {
  return (
    <div className="group bg-[#fafafa] border border-[#e5e5e5] border-solid content-stretch flex min-h-px min-w-0 w-full flex-1 items-center relative rounded-[8px] h-[46px] hover:bg-gray-100 transition-colors cursor-pointer">
      <div className="content-stretch flex flex-1 flex-col h-[46px] items-start justify-center overflow-clip p-[12px]">
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
          <div className="relative shrink-0 size-[18px]"><IconDragHandle /></div>
          <div className="content-stretch flex flex-1 items-center justify-between min-w-0">
            <span className="font-normal text-[12px] text-[rgba(0,0,0,0.85)] whitespace-nowrap group-hover:text-gray-900">{label}</span>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <CsIconInfoCircle />
              <div className="relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p254ef480} fill="#666666" />
                </svg>
              </div>
              <div className="relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p8918ef0} fill="#666666" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConditionSetting() {
  return (
    <div className="bg-white content-stretch flex min-w-0 w-full flex-col gap-[12px] items-stretch p-[16px] relative shrink-0">
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <div className="flex flex-col gap-[4px] flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[14px] text-[rgba(0,0,0,0.87)]">Condition Setting</span>
            <IconPlus />
          </div>
          <span className="font-normal text-[#999] text-[12px]">Condition configuration is arranged by priority.</span>
        </div>
      </div>
      <ConditionRow label=">=30D" />
      <ConditionRow label="<30D" />
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

export default function NodePannel({ onCancel }: { onCancel?: () => void }) {
  return (
    <div className="bg-[#fafafa] content-stretch flex min-h-0 min-w-0 w-full flex-col items-stretch relative shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] h-full">
      <NodeTitle />
      <div className="min-h-0 flex-1 w-full overflow-y-auto pb-[72px]">
        <SelectFunction />
        <ConditionSetting />
        <Assignment />
      </div>
      {/* Footer */}
      <div className="absolute bg-white content-stretch flex flex-col items-start justify-end left-0 p-[16px] bottom-0 w-full z-20">
        <div className="flex gap-[8px] items-center justify-end w-full">
          <button
            onClick={onCancel}
            className="bg-white cursor-pointer flex items-center px-[16px] py-[5px] relative rounded-[8px] shrink-0 border border-[#d9d9d9] hover:border-[#ee4d2d] transition-colors"
          >
            <span className="font-normal text-[14px] text-[rgba(0,0,0,0.85)]">Cancel</span>
          </button>
          <div className="bg-[#ee4d2d] content-stretch flex h-[32px] items-center overflow-clip px-[16px] py-[6px] relative rounded-[8px] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.02)] shrink-0 cursor-pointer hover:bg-[#d63f20] transition-colors">
            <span className="font-normal text-[14px] text-white">Save</span>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_0px_0px_rgba(0,0,0,0.09)]" />
      </div>
    </div>
  );
}
