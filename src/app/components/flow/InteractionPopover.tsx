import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import svgPaths from '../../../imports/svg-iqzynn8eb9';
import { cn } from './nodes/BaseNode';

function MouseLineIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="mouse-line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="mouse-line">
          <path
            d={svgPaths.pf5c0a00}
            id="Vector"
            stroke={isActive ? "#EE4D2D" : "black"}
            strokeOpacity={isActive ? 1 : 0.88}
            strokeLinecap="square"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function TouchpadIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Touchpad">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Touchpad">
          <path
            d={svgPaths.p2aa1d900}
            id="Vector"
            stroke={isActive ? "#EE4D2D" : "black"}
            strokeOpacity={isActive ? 1 : 0.88}
            strokeLinecap="square"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

interface InteractionOptionProps {
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

function InteractionOption({ title, description, isActive, onClick, icon }: InteractionOptionProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "content-stretch flex flex-col gap-[16px] h-[174px] items-center p-[16px] relative rounded-[6px] shrink-0 w-[200px] cursor-pointer transition-all",
        isActive ? "bg-[#fff5f0]" : "bg-white hover:bg-gray-50"
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute border border-solid inset-0 pointer-events-none rounded-[6px] transition-colors",
          isActive ? "border-[#ee4d2d]" : "border-[#d9d9d9]"
        )}
      />
      {icon}

      <div className={cn("content-stretch flex flex-col font-normal gap-[4px] items-center relative shrink-0 w-full", isActive ? "text-[#ee4d2d]" : "text-[#000000e0]")}>
        <p className="leading-[22px] relative shrink-0 text-[14px] font-medium">{title}</p>
        <p className={cn("leading-[20px] min-w-full relative shrink-0 text-[12px] text-center w-[min-content] whitespace-pre-wrap", isActive ? "" : "text-[rgba(0,0,0,0.45)]")}>
          {description}
        </p>
      </div>
    </div>
  );
}

interface PopoverBodyProps {
  isHandMode: boolean;
  onToggle: () => void;
}

function PopoverBody({ isHandMode, onToggle }: PopoverBodyProps) {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <p className="font-semibold leading-[22px] min-w-[177px] relative shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] w-[241px] whitespace-pre-wrap">
            Interactive
          </p>

          <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
            <InteractionOption
              title="Mouse-friendly"
              description="Left-click to drag the canvas and zoom with the scroll wheel"
              isActive={isHandMode}
              onClick={() => !isHandMode && onToggle()}
              icon={<MouseLineIcon isActive={isHandMode} />}
            />
            <InteractionOption
              title="Touchpad-friendly"
              description="Drag with fingers in the same direction, and zoom with a pinch or spread gesture"
              isActive={!isHandMode}
              onClick={() => isHandMode && onToggle()}
              icon={<TouchpadIcon isActive={!isHandMode} />}
            />
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="-translate-x-1/2 absolute bottom-[-8px] h-[8px] left-[calc(50%-0.5px)] w-[16px]" data-name="Arrow">
        <div className="absolute inset-[0_0_10.36%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 7.17157">
            <path d={svgPaths.p28bb9100} fill="white" id="Arrow" />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface InteractionPopoverProps {
  children: React.ReactNode;
  isHandMode?: boolean;
  onToggle?: () => void;
}

export default function InteractionPopover({ children, isHandMode = false, onToggle }: InteractionPopoverProps) {
  return (
    <HoverCard.Root openDelay={0} closeDelay={200}>
      <HoverCard.Trigger asChild>
        {children}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
            className="z-50 outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            side="top"
            sideOffset={10}
        >
          <PopoverBody isHandMode={isHandMode} onToggle={onToggle || (() => {})} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
