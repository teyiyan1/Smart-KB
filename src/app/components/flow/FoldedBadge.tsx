import React from "react";

function BadgeNode({ count }: { count: number }) {
  return (
    <div className="bg-[#fff5f0] flex items-center justify-center rounded-full size-[18px] border-[0.5px] border-[#ee4d2d] box-border relative z-10 shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col font-medium justify-center items-center leading-none overflow-hidden relative shrink-0 text-[#ee4d2d] text-[10px]">
        {count}
      </div>
    </div>
  );
}

export default function FoldedBadge({
  count,
  onClick,
}: {
  count: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      onClick={onClick}
      className="relative flex items-center cursor-pointer hover:opacity-80 active:scale-95 transition-all px-[8px] py-[0px] mx-[0px] my-[8px]"
    >
      <div className="w-[12px] h-[1px] bg-[#EE4D2D]" />
      <BadgeNode count={count} />
    </div>
  );
}
