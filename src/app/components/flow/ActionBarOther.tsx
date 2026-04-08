import React, { useState, useEffect } from 'react';
import { cn } from './nodes/BaseNode';
import InteractionPopover from './InteractionPopover';
import AddNodePopup from './AddNodePopup';

interface ActionBarProps {
  onAddNode?: (nodeType: string, nodeData: Record<string, unknown>) => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitView?: () => void;
  zoomLevel?: number;
  onToggleInteractionMode?: () => void;
  isHandMode?: boolean;
  closeSignal?: number;
}

// Figma icons (inlined SVG paths from Smart-KB-demo node 7234:87742)
function IconAddNode() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.98177 0C7.25791 0 7.48177 0.223858 7.48177 0.5L7.481 6.497L13.5 6.49798C13.7761 6.49798 14 6.72183 14 6.99798C14 7.27412 13.7761 7.49798 13.5 7.49798L7.481 7.497L7.48177 13.5C7.48177 13.7761 7.25791 14 6.98177 14C6.70562 14 6.48177 13.7761 6.48177 13.5L6.481 7.497L0.5 7.49798C0.223858 7.49798 0 7.27412 0 6.99798C0 6.72183 0.223858 6.49798 0.5 6.49798L6.481 6.497L6.48177 0.5C6.48177 0.223858 6.70562 0 6.98177 0Z" fill="white" />
    </svg>
  );
}

function IconMouse() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4.66667V6.66667M6.66667 14H9.33333C11.1743 14 12.6667 12.5076 12.6667 10.6667V5.33333C12.6667 3.49238 11.1743 2 9.33333 2H6.66667C4.82572 2 3.33333 3.49238 3.33333 5.33333V10.6667C3.33333 12.5076 4.82572 14 6.66667 14Z" stroke="rgba(0,0,0,0.88)" strokeLinecap="square" />
    </svg>
  );
}

// Touchpad icon for selector (16x16), from node 7043:28402
function IconTouchpadSm() {
  return (
    <svg width="13" height="12" viewBox="0 0 13 11.6667" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.16667 8.5H9.83333M0.5 0.5H12.5V11.1667H0.5V0.5Z" stroke="rgba(0,0,0,0.88)" strokeLinecap="square" />
    </svg>
  );
}

function IconArrowDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 9.88562 5.60948" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.942809 0L4.94281 4L8.94281 0L9.88562 0.942809L5.41421 5.41421C5.15386 5.67456 4.73175 5.67456 4.4714 5.41421L0 0.942809L0.942809 0Z" fill="rgba(0,0,0,0.25)" />
    </svg>
  );
}

function IconMinus() {
  return (
    <svg width="14" height="2" viewBox="0 0 13.6667 1.33333" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="13.6667" height="1.33333" fill="rgba(0,0,0,0.88)" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="13" height="13" viewBox="0 0 13.3333 13.3333" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.33333 6V0H6V6H0V7.33333H6V13.3333H7.33333V7.33333H13.3333V6H7.33333Z" fill="rgba(0,0,0,0.88)" />
    </svg>
  );
}

function IconFitView() {
  return (
    <svg width="15" height="15" viewBox="0 0 14.6667 14.6667" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0L8.00067 2.04133C9.17548 2.18986 10.2675 2.72495 11.1048 3.56234C11.942 4.39973 12.477 5.49184 12.6253 6.66667H14.6667V8L12.6253 8.00067C12.4768 9.17538 11.9418 10.2673 11.1046 11.1046C10.2673 11.9418 9.17538 12.4768 8.00067 12.6253L8 14.6667H6.66667V12.6253C5.49184 12.477 4.39973 11.942 3.56234 11.1048C2.72495 10.2675 2.18986 9.17548 2.04133 8.00067L0 8V6.66667H2.04133C2.18972 5.49174 2.72476 4.39956 3.56216 3.56216C4.39956 2.72476 5.49174 2.18972 6.66667 2.04133V0H8ZM7.33333 3.33333C6.27247 3.33333 5.25505 3.75476 4.50491 4.50491C3.75476 5.25505 3.33333 6.27247 3.33333 7.33333C3.33333 8.3942 3.75476 9.41162 4.50491 10.1618C5.25505 10.9119 6.27247 11.3333 7.33333 11.3333C8.3942 11.3333 9.41162 10.9119 10.1618 10.1618C10.9119 9.41162 11.3333 8.3942 11.3333 7.33333C11.3333 6.27247 10.9119 5.25505 10.1618 4.50491C9.41162 3.75476 8.3942 3.33333 7.33333 3.33333ZM7.33333 6C7.68696 6 8.02609 6.14048 8.27614 6.39052C8.52619 6.64057 8.66667 6.97971 8.66667 7.33333C8.66667 7.68696 8.52619 8.02609 8.27614 8.27614C8.02609 8.52619 7.68696 8.66667 7.33333 8.66667C6.97971 8.66667 6.64057 8.52619 6.39052 8.27614C6.14048 8.02609 6 7.68696 6 7.33333C6 6.97971 6.14048 6.64057 6.39052 6.39052C6.64057 6.14048 6.97971 6 7.33333 6V6Z" fill="rgba(0,0,0,0.88)" />
    </svg>
  );
}

function Divider() {
  return (
    <div className="flex h-[16px] items-center px-[8px] relative shrink-0">
      <div className="h-full w-px bg-black/[0.06]" />
    </div>
  );
}

function AddNodeButton({
  open,
  onToggle,
  onSelect,
  onClose,
}: {
  open: boolean;
  onToggle: () => void;
  onSelect?: (nodeType: string, nodeData: Record<string, unknown>) => void;
  onClose: () => void;
}) {
  return (
    <div className="relative shrink-0">
      {open && (
        <AddNodePopup
          onSelect={(type, data) => { onSelect?.(type, data); }}
          onClose={onClose}
        />
      )}
      <div
        onClick={onToggle}
        className="bg-[#ee4d2d] content-stretch flex flex-col items-center px-[16px] py-[8px] relative rounded-[6px] shrink-0 cursor-pointer hover:bg-[#d63f20] transition-colors"
      >
        <div className="flex gap-[8px] items-center">
          <IconAddNode />
          <span className="font-medium leading-[16px] text-[14px] text-white whitespace-nowrap">Add Node</span>
        </div>
      </div>
    </div>
  );
}

function MouseFriendlySelector({ onClick, isActive }: { onClick?: () => void; isActive?: boolean }) {
  // isActive=true → mouse mode (hand mode); isActive=false → touchpad mode
  const isTouchpad = !isActive;
  return (
    <InteractionPopover isHandMode={isActive} onToggle={onClick}>
      <div className="content-stretch flex flex-col h-[32px] items-start relative shrink-0 cursor-pointer">
        <div
          onClick={onClick}
          className={cn(
            'bg-white content-stretch flex flex-1 gap-[8px] items-center px-[12px] relative rounded-[8px] cursor-pointer transition-colors h-[32px] min-w-px',
            isTouchpad ? 'border border-[#ee4d2d]' : 'border border-[#d9d9d9] hover:border-[#ee4d2d]'
          )}
        >
          {isTouchpad ? <IconTouchpadSm /> : <IconMouse />}
          <IconArrowDown />
        </div>
      </div>
    </InteractionPopover>
  );
}

function ZoomIconButton({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={onClick}
      className="content-stretch flex flex-col items-center justify-center relative rounded-[2px] shrink-0 size-[32px] cursor-pointer hover:bg-gray-100 transition-colors"
    >
      {children}
    </div>
  );
}

function ZoomControl({ onZoomIn, onZoomOut, zoomLevel = 100 }: { onZoomIn?: () => void; onZoomOut?: () => void; zoomLevel?: number }) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ZoomIconButton onClick={onZoomOut}>
        <IconMinus />
      </ZoomIconButton>
      <button
        type="button"
        className="flex flex-col gap-[4px] items-stretch relative shrink-0 min-w-[60px]"
      >
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] relative rounded-[8px] shrink-0 w-full">
          <p className="font-normal leading-[22px] text-[14px] text-[rgba(0,0,0,0.88)] whitespace-nowrap tabular-nums text-center">
            {zoomLevel}%
          </p>
        </div>
      </button>
      <ZoomIconButton onClick={onZoomIn}>
        <IconPlus />
      </ZoomIconButton>
    </div>
  );
}

function FitViewButton({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="content-stretch flex flex-col items-center justify-center relative rounded-[2px] shrink-0 size-[32px] cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <IconFitView />
    </div>
  );
}

export default function ActionBarOther(props: ActionBarProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Close popup when canvas pane is clicked
  useEffect(() => {
    if (props.closeSignal !== undefined) {
      setIsPopupOpen(false);
    }
  }, [props.closeSignal]);

  return (
    <div className="relative">
      <div className="bg-white border border-[#f0f0f0] content-stretch flex flex-col items-start p-[8px] rounded-[8px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.1),0px_8px_16px_0px_rgba(0,0,0,0.04)]">
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <AddNodeButton
            open={isPopupOpen}
            onToggle={() => setIsPopupOpen((v) => !v)}
            onSelect={props.onAddNode}
            onClose={() => setIsPopupOpen(false)}
          />
          <Divider />
          <MouseFriendlySelector onClick={props.onToggleInteractionMode} isActive={props.isHandMode} />
          <Divider />
          <ZoomControl onZoomIn={props.onZoomIn} onZoomOut={props.onZoomOut} zoomLevel={props.zoomLevel} />
          <Divider />
          <FitViewButton onClick={props.onFitView} />
        </div>
      </div>
    </div>
  );
}
