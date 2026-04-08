import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import Body from './Body';
import svgPaths from './svg-1zkk3tyv9w';

function IconPlayCircle() {
  return (
    <div className="overflow-clip relative shrink-0 size-[8.4px]">
      <div className="absolute inset-[4.17%_4.17%_4.16%_4.17%]">
        <div className="absolute inset-[0_-4.55%_-4.54%_-4.55%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.4 8.05039">
            <path clipRule="evenodd" d={svgPaths.p159fea00} fill="#EE4D2D" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p1a3fa400} fill="#EE4D2D" fillRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PlayButton({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="content-stretch flex items-center p-[1.4px] relative shrink-0 cursor-pointer hover:opacity-60 transition-opacity"
    >
      <IconPlayCircle />
    </div>
  );
}

function EllipsisOutlined() {
  return (
    <div className="absolute inset-[42.7%_13.54%_42.71%_13.54%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16665 1.63333">
        <path d={svgPaths.peb8db80} fill="#EE4D2D" />
        <path d={svgPaths.p19021100} fill="#EE4D2D" />
        <path d={svgPaths.p30319ec0} fill="#EE4D2D" />
      </svg>
    </div>
  );
}

const IconEllipsis = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className="overflow-clip relative shrink-0 size-[11.2px] cursor-pointer hover:opacity-60 transition-opacity"
    >
      <EllipsisOutlined />
    </div>
  );
});
IconEllipsis.displayName = 'IconEllipsis';

interface ActionsBarProps {
  /** 受控：与节点上的菜单开关同步，折叠时必须 false 才能关掉 Popover */
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onFold?: () => void;
  /** 无下游节点时 Fold 置灰 */
  foldDisabled?: boolean;
}

export default function ActionsBar({ open, onOpenChange, onFold, foldDisabled }: ActionsBarProps) {
  return (
    <div className="bg-white content-stretch flex gap-[4.2px] items-center justify-center px-[5.6px] py-[2.8px] relative rounded-[4.2px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.1)]">
      <PlayButton />

      <Popover.Root open={open} onOpenChange={onOpenChange}>
        <Popover.Trigger asChild>
          <IconEllipsis />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="start"
            sideOffset={4}
            className="z-50 rounded-[3px] outline-none ring-0 focus:outline-none data-[state=open]:outline-none"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <Body onFold={onFold} foldDisabled={foldDisabled} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
