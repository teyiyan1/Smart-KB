import React from 'react';
import svgPaths from '../../../imports/svg-bv3ai8993u';

function ArrowBack24Px() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p390123a0} fill="rgba(0,0,0,0.54)" />
      </svg>
    </div>
  );
}

function Button({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white content-stretch flex gap-[8px] items-center justify-center px-[2px] py-[7px] relative rounded-[2px] shrink-0 size-[24px] cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.02)]" />
      <ArrowBack24Px />
    </div>
  );
}

function TitleSection() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <span className="font-medium text-[14px] leading-[22px] text-[rgba(0,0,0,0.85)]">Taskbot Title</span>
      <span className="text-[#D9D9D9]">|</span>
      <span className="font-medium text-[14px] leading-[22px] text-[rgba(0,0,0,0.85)]">V2</span>
    </div>
  );
}

function TagSection() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="bg-[#fff1f0] px-[4px] py-px rounded-[2px]">
        <p className="font-normal leading-[14px] text-[#f5222d] text-[12px]">DRAFT</p>
      </div>
      <div className="bg-[rgba(0,0,0,0.03)] px-[2px] py-px rounded-[2px]">
        <p className="font-normal leading-[16px] text-[#666] text-[12px]">Tete</p>
      </div>
      <div className="bg-[rgba(0,0,0,0.03)] px-[2px] py-px rounded-[2px]">
        <p className="font-normal leading-[16px] text-[#666] text-[12px]">Mar 17, 6:14 PM</p>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="content-stretch flex items-start relative rounded-[4px] shrink-0 w-[250px]">
      {/* Fixed module */}
      <div className="bg-white content-stretch flex gap-[8px] h-[32px] items-center pl-[12px] pr-[8px] py-[7px] relative rounded-bl-[6px] rounded-tl-[6px] shrink-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-bl-[6px] rounded-tl-[6px] border-solid border-[#e5e5e5] border-b border-l border-r border-t"
        />
        <span className="font-normal leading-[16px] text-[#333] text-[14px]">Node Text</span>
        <div className="relative shrink-0 size-[16px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path clipRule="evenodd" d={svgPaths.p1417fa00} fill="#999999" fillRule="evenodd" />
          </svg>
        </div>
      </div>
      {/* Search input */}
      <div className="bg-white content-stretch flex gap-[8px] h-[32px] items-center pr-[8px] relative rounded-br-[6px] rounded-tr-[6px] shrink-0 w-[142px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-br-[6px] rounded-tr-[6px] border-solid border-[#e5e5e5] border-b border-r border-t"
        />
        <div className="relative shrink-0 size-[16px] ml-2">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path clipRule="evenodd" d={svgPaths.p1e91cf80} fill="#333333" fillRule="evenodd" />
          </svg>
        </div>
        <span className="font-normal leading-[18px] text-[#b7b7b7] text-[14px]">Search</span>
      </div>
    </div>
  );
}

export default function TopBar({ onBack }: { onBack?: () => void }) {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center px-[16px] py-[7px] relative w-full border-b border-[rgba(0,0,0,0.1)] z-10">
      {/* Left section */}
      <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
        <Button onClick={onBack} />
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0">
          <TitleSection />
          <TagSection />
        </div>
      </div>
      <SearchBar />
      {/* Test & Preview button */}
      <div className="h-[32px] relative rounded-[6px] shrink-0 cursor-pointer">
        <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-[6px] relative rounded-[inherit]">
          <span className="font-normal text-[#ee4d2d] text-[14px]">Test &amp; Preview</span>
        </div>
        <div aria-hidden="true" className="absolute border border-[#ee4d2d] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
      {/* Publish button */}
      <div className="bg-[#ee4d2d] content-stretch flex h-[32px] items-center overflow-clip px-[16px] py-[6px] relative rounded-[6px] shrink-0 cursor-pointer">
        <span className="capitalize font-normal text-[14px] text-white">Publish</span>
      </div>
    </div>
  );
}
