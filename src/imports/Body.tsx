import React from "react";

function MenuItem({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      role="menuitem"
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      className={
        disabled
          ? "content-stretch flex flex-col items-start justify-center relative rounded-[3px] shrink-0 cursor-not-allowed opacity-45 pointer-events-none transition-colors"
          : "content-stretch flex flex-col items-start justify-center relative rounded-[3px] shrink-0 cursor-pointer hover:bg-[#F5F5F5] transition-colors"
      }
    >
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-between p-[6px] relative w-full">
            <div className="absolute inset-0 rounded-[3px]" />
            <p
              className={
                disabled
                  ? "font-normal leading-[14px] relative shrink-0 text-[rgba(0,0,0,0.25)] text-[10px] w-full whitespace-nowrap"
                  : "font-normal leading-[14px] relative shrink-0 text-[#333] text-[10px] w-full whitespace-nowrap"
              }
            >
              {label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Body({
  onFold,
  foldDisabled,
}: {
  onFold?: () => void;
  /** true = 无下游可藏，Fold 置灰 */
  foldDisabled?: boolean;
}) {
  return (
    <div className="bg-white content-stretch flex flex-col items-stretch p-[4px] relative rounded-[3px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1),0px_4px_8px_0px_rgba(0,0,0,0.04)] w-fit">
      <MenuItem label="Create copy" />
      <MenuItem label="Delete" />
      <MenuItem label="Fold" onClick={onFold} disabled={foldDisabled} />
      <MenuItem label="Change node" />
      <MenuItem label="Focus node" />
    </div>
  );
}
