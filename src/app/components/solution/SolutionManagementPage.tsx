import React, { useState } from 'react';

interface SolutionRow {
  id: string;
  icon: 'flow' | 'doc';
  title: string;
  subtitle: string;
  status: 'Live' | 'Draft';
  relatedIssue: string;
  updatedTime: string;
  isAfterEDD?: boolean;
}

type TabKey = 'all' | 'sop' | 'qa';

const ROWS: SolutionRow[] = [
  {
    id: '1',
    icon: 'flow',
    title: '2025 Feature Request Management S...',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Live',
    relatedIssue: 'Status is deliver...',
    updatedTime: '2024-08-12 18:20',
  },
  {
    id: '2',
    icon: 'flow',
    title: 'L3 Return/Refund - Check On Refund...',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Live',
    relatedIssue: 'How to use deli...',
    updatedTime: '2024-08-12 18:20',
  },
  {
    id: 'after-edd',
    icon: 'flow',
    title: 'After EDD',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Live',
    relatedIssue: 'After EDD',
    updatedTime: '2024-08-12 18:20',
    isAfterEDD: true,
  },
  {
    id: '4',
    icon: 'doc',
    title: 'Claim Lost RTS Parcel',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Draft',
    relatedIssue: 'Claim Lost RTS P...',
    updatedTime: '2024-08-12 18:20',
  },
  {
    id: '5',
    icon: 'flow',
    title: 'Claim Lost RTS Parcel',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Live',
    relatedIssue: '-',
    updatedTime: '2024-08-12 18:20',
  },
  {
    id: '6',
    icon: 'flow',
    title: '2025 Feature Request Management S...',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Live',
    relatedIssue: '-',
    updatedTime: '2024-08-12 18:20',
  },
];

const SIDEBAR_NAV = [
  { label: 'Knowledge Management', children: ['Issue', 'Solution', 'Template', 'Form'] },
  { label: 'API & Function', children: ['Fucntion', 'API Store', 'RPA'] },
  { label: 'Access Management', children: ['Account', 'Role', 'Operation Log'] },
  { label: 'Approval', children: [] },
  { label: 'Basic Setting', children: ['Hot Question', 'Shortcut', 'Announcement'] },
  { label: 'Live Agent Control', children: [] },
];

const LEFT_CATEGORIES = [
  { name: 'All', count: 235, isActive: true },
  { name: 'My data', count: 164 },
  { name: 'Mitra Shopee', count: 164 },
  { name: 'Account & Fraud', count: 0 },
  { name: 'Digital Product', count: 29 },
  { name: 'Logistics', count: 45, hasChildren: true },
];

const LOGISTICS_CHILDREN = [
  { label: 'Change Detail' },
  { label: 'Contact delivery rider' },
  { label: 'Status is delivered but not yet received' },
  { label: 'How to use delivery by Locker' },
  { label: 'Check delivery status' },
  { label: 'Order cancellation', count: 0 },
  { label: 'Order/Shop product Line', count: 0, isActive: true },
];

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'sop', label: 'Smart SOP' },
  { key: 'qa', label: 'General QA' },
];

// Figma 导航图标资源（有效期 7 天）
const FIGMA_ICON_KB_DEFAULT  = 'https://www.figma.com/api/mcp/asset/6dd0d78e-d05f-4de4-a5f0-5ebf7a24f523';
const FIGMA_ICON_KB_ACTIVE   = 'https://www.figma.com/api/mcp/asset/c27fdb74-20b1-47b5-9ecb-be1c01c06001';
const FIGMA_ICON_API_BG      = 'https://www.figma.com/api/mcp/asset/13d8b0ca-9b66-4ebd-8e5c-881e6a20046f';
const FIGMA_ICON_API_VEC     = 'https://www.figma.com/api/mcp/asset/0c8adc3f-6956-418a-99ac-a24eb0ca9c00';
const FIGMA_ICON_ACCESS      = 'https://www.figma.com/api/mcp/asset/04b70340-cd77-4e32-96a4-879ff4b27ec9';
const FIGMA_ICON_APPROVAL    = 'https://www.figma.com/api/mcp/asset/90b5b416-96e7-49dc-be46-3a01aa18c05a';
const FIGMA_ICON_SETTING_BG  = 'https://www.figma.com/api/mcp/asset/758f31db-176f-46ff-bd61-93039b2c5009';
const FIGMA_ICON_SETTING_OVL = 'https://www.figma.com/api/mcp/asset/7accff08-f6a0-4e9f-8a8e-038df867ebed';

function NavSectionIcon({ label, isActive }: { label: string; isActive: boolean }) {
  switch (label) {
    case 'Knowledge Management':
      return (
        <div className="relative overflow-hidden size-4">
          <img alt="" className="absolute block max-w-none size-full" src={isActive ? FIGMA_ICON_KB_ACTIVE : FIGMA_ICON_KB_DEFAULT} />
        </div>
      );
    case 'API & Function':
      return (
        <div className="relative size-4">
          <img alt="" className="absolute block max-w-none size-full" src={FIGMA_ICON_API_BG} />
          <div className="absolute inset-[8.33%_12.5%]">
            <img alt="" className="absolute block max-w-none size-full" src={FIGMA_ICON_API_VEC} />
          </div>
        </div>
      );
    case 'Access Management':
      return (
        <div className="relative overflow-hidden size-4">
          <div className="absolute inset-[10.94%]">
            <div className="absolute inset-[-0.8%]">
              <img alt="" className="block max-w-none size-full" src={FIGMA_ICON_ACCESS} />
            </div>
          </div>
        </div>
      );
    case 'Approval':
      return (
        <div className="relative overflow-hidden size-4">
          <div className="absolute inset-[7.42%_13.28%]">
            <div className="absolute inset-[-0.73%_-0.85%]">
              <img alt="" className="block max-w-none size-full" src={FIGMA_ICON_APPROVAL} />
            </div>
          </div>
        </div>
      );
    case 'Basic Setting':
      return (
        <div className="relative size-4">
          <img alt="" className="absolute block max-w-none size-full" src={FIGMA_ICON_SETTING_BG} />
          <div className="absolute inset-0 overflow-hidden p-[2px] flex flex-col items-center justify-center">
            <div className="absolute h-[11.117px] left-[2px] top-[2px] w-[12.5px]">
              <div className="absolute inset-[-1.8%_-1.6%]">
                <img alt="" className="block max-w-none size-full" src={FIGMA_ICON_SETTING_OVL} />
              </div>
            </div>
          </div>
        </div>
      );
    default:
      /* Live Agent Control — fallback SVG */
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M2 9V7C2 4.239 4.686 2 8 2s6 2.239 6 5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <rect x="2" y="8" width="2.5" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="11.5" y="8" width="2.5" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      );
  }
}

// 展开态导航 section header 图标资源（有效期 7 天）
const EXP_ICON_KM          = 'https://www.figma.com/api/mcp/asset/40988f64-d24c-4e87-9256-6acccc9355e9';
const EXP_ICON_API_BG      = 'https://www.figma.com/api/mcp/asset/584f60dd-57fb-4ee7-9d5e-14d23d404bcb';
const EXP_ICON_API_VEC     = 'https://www.figma.com/api/mcp/asset/3e284942-2451-4b50-8157-59371c5d3037';
const EXP_ICON_ACCESS_VEC  = 'https://www.figma.com/api/mcp/asset/b0bf2f20-2dc2-4a92-b88f-2ee3c358a327';
const EXP_ICON_APPROVAL    = 'https://www.figma.com/api/mcp/asset/6f6e6c5e-5d10-4659-9925-fa945ba2f12d';
const EXP_ICON_SETTING_OVL = 'https://www.figma.com/api/mcp/asset/e6feaefd-07cf-48a5-bb75-fc84a0e6963c';
const EXP_ICON_LAC         = 'https://www.figma.com/api/mcp/asset/4378f05b-2197-4e05-a36f-88af8e547265';
const EXP_CHEVRON          = 'https://www.figma.com/api/mcp/asset/df93c9d6-f134-43d8-9a95-a5c49a7b865b';
const FIGMA_MENUFOLD_VEC   = 'https://www.figma.com/api/mcp/asset/3b1479ec-5032-4c6c-9a2e-2e1647ac4608';
const FIGMA_HEADER_LOGO    = 'https://www.figma.com/api/mcp/asset/eba7610b-f45c-45d0-87fc-894ffd930875';
const FIGMA_HEADER_DOTS    = 'https://www.figma.com/api/mcp/asset/7d98f650-2d29-49df-9d9a-b227a31d27ae';

// 主内容区 Figma 资源 — node 12984-44526（有效期 7 天）
const CONTENT_PLUS_VEC    = 'https://www.figma.com/api/mcp/asset/87712a36-a81b-4bcd-9c50-9550dc21e7ad';
const CONTENT_ARROW_DOWN  = 'https://www.figma.com/api/mcp/asset/4e7a2057-f1df-4124-bc1d-de7a04be554d';
const CONTENT_SEARCH_ICON = 'https://www.figma.com/api/mcp/asset/036436d5-498c-4448-85d2-b2abefd45726';
const CONTENT_FILTER_ICON = 'https://www.figma.com/api/mcp/asset/65f8360a-0e29-4df8-a59d-e1f111352091';
const CONTENT_TABLE_ICON  = 'https://www.figma.com/api/mcp/asset/db675947-ea90-4b14-a152-c361e158f114';
const CONTENT_SORTER_UP   = 'https://www.figma.com/api/mcp/asset/7b2fc693-16f2-4230-bf16-979a35f6cd02';
const CONTENT_SORTER_DOWN = 'https://www.figma.com/api/mcp/asset/7b2bded6-a3e8-4669-bac6-a5c075533557';
const CONTENT_MORE_VEC    = 'https://www.figma.com/api/mcp/asset/6634a6f2-d906-4849-bd0b-be58e81abeb9';
const CONTENT_FLOW_ICON   = 'https://www.figma.com/api/mcp/asset/72d1a0d2-99f1-4470-a387-a8bffdca6650';
const CONTENT_FAQ_VEC1    = 'https://www.figma.com/api/mcp/asset/387819a0-e34f-4bec-af71-d7140e8d35ab';
const CONTENT_FAQ_VEC2    = 'https://www.figma.com/api/mcp/asset/1a26be56-4618-40f5-9d27-d97a23b75d12';
const CONTENT_FAQ_VEC3    = 'https://www.figma.com/api/mcp/asset/0e75de1c-3ff8-4afd-bddb-9a763a0305f8';
const CONTENT_FAQ_VEC4    = 'https://www.figma.com/api/mcp/asset/342dc47d-50c5-4ecf-8986-c28603bd4039';
const CONTENT_PAGIN_PREV  = 'https://www.figma.com/api/mcp/asset/802d439b-49ac-4621-b014-91f2422a9398';
const CONTENT_PAGIN_NEXT  = 'https://www.figma.com/api/mcp/asset/739413e3-163d-45a2-8836-7fa82cbf2168';
const CONTENT_PAGIN_MORE  = 'https://www.figma.com/api/mcp/asset/deb9a8fd-424c-4162-af93-d18d3e1b652f';
const CONTENT_PAGIN_ARROW = 'https://www.figma.com/api/mcp/asset/31fa5bd5-97be-446b-9de2-0be2d4fcccb4';

function NavSectionHeaderIcon({ label }: { label: string }) {
  switch (label) {
    case 'Knowledge Management':
      return (
        <div className="overflow-hidden relative shrink-0 size-4">
          <img alt="" className="absolute block max-w-none size-full" src={EXP_ICON_KM} />
        </div>
      );
    case 'API & Function':
      return (
        <div className="relative shrink-0 size-4">
          <img alt="" className="absolute block max-w-none size-full" src={EXP_ICON_API_BG} />
          <div className="absolute inset-[8.33%_12.5%]">
            <img alt="" className="absolute block max-w-none size-full" src={EXP_ICON_API_VEC} />
          </div>
        </div>
      );
    case 'Access Management':
      return (
        <div className="overflow-hidden relative shrink-0 size-4">
          <div className="absolute inset-[10.94%]">
            <div className="absolute inset-[-0.8%]">
              <img alt="" className="block max-w-none size-full" src={EXP_ICON_ACCESS_VEC} />
            </div>
          </div>
        </div>
      );
    case 'Approval':
      return (
        <div className="overflow-hidden relative shrink-0 size-4">
          <div className="absolute inset-[7.42%_13.28%]">
            <div className="absolute inset-[-0.73%_-0.85%]">
              <img alt="" className="block max-w-none size-full" src={EXP_ICON_APPROVAL} />
            </div>
          </div>
        </div>
      );
    case 'Basic Setting':
      return (
        <div className="relative shrink-0 size-4">
          <img alt="" className="absolute block max-w-none size-full" src={EXP_ICON_API_BG} />
          <div className="absolute inset-0 overflow-hidden p-[2px] flex flex-col items-center justify-center">
            <div className="absolute h-[11.117px] left-[2px] top-[2px] w-[12.5px]">
              <div className="absolute inset-[-1.8%_-1.6%]">
                <img alt="" className="block max-w-none size-full" src={EXP_ICON_SETTING_OVL} />
              </div>
            </div>
          </div>
        </div>
      );
    case 'Live Agent Control':
      return (
        <div className="overflow-hidden relative shrink-0 size-4">
          <div className="absolute inset-[12.5%]">
            <img alt="" className="absolute block max-w-none size-full" src={EXP_ICON_LAC} />
          </div>
        </div>
      );
    default:
      return <div className="shrink-0 size-4" />;
  }
}

function KnowledgeIcon({ type }: { type: 'flow' | 'doc' }) {
  if (type === 'flow') {
    return (
      <div className="bg-[#f1eafa] flex items-center justify-center relative rounded-[9px] shrink-0 size-[40px]">
        <div className="relative shrink-0 size-[18px]">
          <img alt="" className="absolute block max-w-none size-full" src={CONTENT_FLOW_ICON} />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#e8f7f5] flex items-center justify-center relative rounded-[10px] shrink-0 size-[40px]">
      <div className="overflow-clip relative shrink-0 size-[22px]">
        <div className="absolute inset-[43.75%_8.33%_4.17%_22.92%]">
          <img alt="" className="absolute block max-w-none size-full" src={CONTENT_FAQ_VEC1} />
        </div>
        <div className="absolute inset-[51.88%_34.16%_27.29%_46.47%]">
          <img alt="" className="absolute block max-w-none size-full" src={CONTENT_FAQ_VEC2} />
        </div>
        <div className="absolute inset-[8.33%_22.92%_35.42%_8.33%]">
          <img alt="" className="absolute block max-w-none size-full" src={CONTENT_FAQ_VEC3} />
        </div>
        <div className="absolute inset-[18.54%_47.08%_56.46%_34.59%]">
          <img alt="" className="absolute block max-w-none size-full" src={CONTENT_FAQ_VEC4} />
        </div>
      </div>
    </div>
  );
}

function SorterIcon() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <div className="absolute inset-[37.5%_6.25%_-6.25%_6.25%] overflow-clip">
        <div className="absolute inset-[26.71%_11.33%]">
          <img alt="" className="absolute block max-w-none size-full" src={CONTENT_SORTER_DOWN} />
        </div>
      </div>
      <div className="absolute inset-[-6.25%_6.25%_37.5%_6.25%] overflow-clip">
        <div className="absolute inset-[26.71%_11.33%]">
          <img alt="" className="absolute block max-w-none size-full" src={CONTENT_SORTER_UP} />
        </div>
      </div>
    </div>
  );
}

interface Props {
  onEnterCanvas: () => void;
}

export default function SolutionManagementPage({ onEnterCanvas }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [isLogisticsOpen, setIsLogisticsOpen] = useState(true);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [openNavSections, setOpenNavSections] = useState<Record<string, boolean>>({
    'Knowledge Management': true,
  });

  // handle 前缀事件处理器
  const handleTabChange = (key: TabKey) => setActiveTab(key);
  const handleLogisticsToggle = () => setIsLogisticsOpen((v) => !v);
  const handleNavToggle = () => setIsNavCollapsed((v) => !v);
  const handleNavSectionToggle = (label: string) =>
    setOpenNavSections((prev) => ({ ...prev, [label]: !prev[label] }));

  const handleRowClick = (row: SolutionRow) => {
    if (row.isAfterEDD) onEnterCanvas();
  };

  const handleEditClick = (e: React.MouseEvent, row: SolutionRow) => {
    e.stopPropagation();
    if (row.isAfterEDD) onEnterCanvas();
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-[#f7f7f7]">
      {/* 全局顶栏 — Figma node 12984-44515 */}
      <header className="h-[56px] shrink-0 bg-white border-b border-solid border-[#e8e8e8] pl-[16px] pr-[24px] py-[13px] flex items-center justify-between shadow-[0px_1px_2px_0px_rgba(0,0,0,0.09)]">
        {/* Left: logo + product name */}
        <div className="flex flex-1 gap-[24px] items-center min-w-0">
          <div className="flex gap-[16px] items-center shrink-0 text-[14px]">
            <div className="relative shrink-0 size-[24px]">
              <img alt="" className="absolute block max-w-none size-full" src={FIGMA_HEADER_LOGO} />
            </div>
            <span className="font-medium leading-[24px] text-[18px] text-[rgba(0,0,0,0.87)] whitespace-nowrap">
              Smart Knowledge Base
            </span>
          </div>
        </div>
        {/* Right: welcome text + 3-dot icon */}
        <div className="flex gap-[10px] items-center shrink-0">
          <span className="font-normal text-[14px] text-[rgba(0,0,0,0.45)] whitespace-nowrap">
            Welcome, tete.liu@shopee.com
          </span>
          <div className="flex items-center justify-center size-[30px]">
            <div className="rotate-90 relative size-[30px]">
              <img alt="" className="absolute block max-w-none size-full" src={FIGMA_HEADER_DOTS} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
      {/* 左侧导航栏 — 展开: 280px / 收起: 52px */}
      <div
        className={`${isNavCollapsed ? 'w-[52px]' : 'w-[240px]'} shrink-0 bg-white border-r border-solid border-[#f5f5f5] flex flex-col overflow-hidden transition-[width] duration-200`}
      >
        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto">
          {isNavCollapsed ? (
            /* 收起态：仅显示图标，每个 section 一行 */
            SIDEBAR_NAV.map((section) => {
              const isActiveSec = section.label === 'Knowledge Management';
              return (
                <div
                  key={section.label}
                  title={section.label}
                  className={`flex h-[42px] items-center justify-center cursor-pointer transition-colors ${
                    isActiveSec ? 'bg-[#fff5f0] text-[#ee4d2d]' : 'text-[rgba(0,0,0,0.65)] hover:bg-[#F5F5F5]'
                  }`}
                >
                  <NavSectionIcon label={section.label} isActive={isActiveSec} />
                </div>
              );
            })
          ) : (
            /* 展开态：图标 + 手风琴，严格按 Figma node 12984-44517 */
            <div className="flex flex-col py-[8px]">
              {SIDEBAR_NAV.map((section, idx) => {
                const hasChildren = section.children.length > 0;
                const isOpen = openNavSections[section.label] ?? false;
                const isLAC = section.label === 'Live Agent Control';
                return (
                  <div key={section.label} className={isLAC ? 'mt-[8px]' : ''}>
                    {/* Section header — navu--click */}
                    <div
                      className="flex h-[42px] gap-[8px] items-center px-[16px] bg-white cursor-pointer hover:bg-[#F5F5F5] transition-colors w-full"
                      onClick={() => hasChildren && handleNavSectionToggle(section.label)}
                    >
                      <NavSectionHeaderIcon label={section.label} />
                      <span className="flex-1 min-w-0 text-[14px] font-medium text-[#333] capitalize leading-[40px]">
                        {section.label}
                      </span>
                      {hasChildren && (
                        <div
                          className={`relative h-[9px] w-[10px] shrink-0 transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}
                        >
                          <img alt="" className="absolute block max-w-none size-full" src={EXP_CHEVRON} />
                        </div>
                      )}
                    </div>
                    {/* Sub-items — 1st nav */}
                    {hasChildren && isOpen && section.children.map((child) => {
                      const isActive = section.label === 'Knowledge Management' && child === 'Solution';
                      return (
                        <div
                          key={child}
                          className={`flex h-[42px] gap-[8px] items-center pl-[40px] pr-[16px] cursor-pointer transition-colors ${
                            isActive
                              ? 'bg-[#fff5f0] text-[#ee4d2d]'
                              : 'bg-white text-[rgba(0,0,0,0.87)] hover:bg-[#F5F5F5]'
                          }`}
                        >
                          <span className="flex-1 min-w-0 text-[14px] font-normal capitalize leading-[40px]">
                            {child}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </nav>

        {/* 底部收起/展开按钮 — CsIconMenuFold（同设计稿） */}
        <div
          onClick={handleNavToggle}
          className="h-[42px] flex items-center justify-center shrink-0 border-t border-[#f5f5f5] cursor-pointer hover:bg-[#F5F5F5] transition-colors"
        >
          {/* 收起态：-scale-y-100 rotate-180；展开态：正常 */}
          <div className={isNavCollapsed ? '-scale-y-100 rotate-180' : ''}>
            <div className="overflow-hidden relative shrink-0 size-[20px]">
              <div className="absolute inset-[15.63%_10.94%]">
                <img alt="" className="absolute block max-w-none size-full" src={FIGMA_MENUFOLD_VEC} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 业务顶栏：示意图 — 仅标题 + 主按钮 */}
        <div className="h-[56px] bg-white border-b border-[#e8e8e8] px-[24px] flex items-center justify-between shrink-0">
          <h1 className="text-[16px] font-medium leading-[24px] text-[rgba(0,0,0,0.85)] capitalize">Solution Management</h1>
          <button
            type="button"
            className="bg-[#ee4d2d] text-white text-[14px] font-medium px-[16px] py-[6px] rounded-[6px] hover:bg-[#d63f20] transition-colors flex items-center gap-[8px]"
          >
            <span>+</span>
            <span>Add Knowledge</span>
          </button>
        </div>

        {/* 内容区 — Figma node 12984-44526: pb-[24px] px-[24px] 外层 + rounded-[16px] 白卡 */}
        <div className="flex-1 overflow-hidden pb-[24px] px-[24px] pt-[24px]">
          <div className="bg-white rounded-[16px] flex h-full overflow-hidden">

            {/* 左侧分类面板 — w-[240px] border-r */}
            <div className="w-[240px] shrink-0 border-r border-[#e8e8e8] flex flex-col px-[16px] py-[12px] overflow-y-auto">
              {/* Solution Group button */}
              <div className="flex gap-[8px] h-[40px] items-center px-[12px] cursor-pointer hover:bg-[#F5F5F5] rounded-[6px] transition-colors">
                <div className="overflow-clip relative shrink-0 size-[16px]">
                  <div className="absolute inset-[14.84%_16.41%]">
                    <img alt="" className="absolute block max-w-none size-full" src={CONTENT_PLUS_VEC} />
                  </div>
                </div>
                <span className="font-normal text-[14px] text-[rgba(0,0,0,0.85)] capitalize leading-[22px]">Solution Group</span>
              </div>
              {/* Divider */}
              <div className="py-[12px]">
                <div className="bg-[#e8e8e8] h-px w-full" />
              </div>
              {/* Category list */}
              {LEFT_CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <div
                    className={`flex gap-[8px] h-[42px] items-center overflow-clip px-[12px] py-[8px] rounded-[6px] cursor-pointer font-normal text-[14px] whitespace-nowrap transition-colors ${
                      cat.isActive
                        ? 'bg-[#fff5f0] text-[#ee4d2d]'
                        : 'bg-white text-[rgba(0,0,0,0.85)] hover:bg-[#F5F5F5]'
                    } ${cat.hasChildren ? 'justify-between' : ''}`}
                    onClick={cat.hasChildren ? handleLogisticsToggle : undefined}
                  >
                    <div className="flex gap-[8px] items-center shrink-0 min-w-0">
                      <span className="overflow-hidden text-ellipsis leading-[22px]">{cat.name}</span>
                      <span className={`leading-[22px] ${cat.isActive ? 'text-[#ee4d2d]' : 'text-[rgba(0,0,0,0.45)]'}`}>
                        ({cat.count})
                      </span>
                    </div>
                    {cat.hasChildren && (
                      <div className="overflow-clip relative shrink-0 size-[16px]">
                        <div className={`absolute bottom-1/4 left-[12.89%] right-[12.89%] top-1/4 transition-transform duration-200 ${isLogisticsOpen ? 'rotate-180' : ''}`}>
                          <img alt="" className="absolute block max-w-none size-full" src={CONTENT_ARROW_DOWN} />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Logistics sub-items */}
                  {cat.hasChildren && isLogisticsOpen && LOGISTICS_CHILDREN.map((child, i) => (
                    <div
                      key={i}
                      className={`flex gap-[8px] h-[42px] items-center pl-[20px] pr-[16px] py-[9px] cursor-pointer transition-colors ${
                        child.isActive ? 'text-[#ee4d2d]' : 'text-[rgba(0,0,0,0.85)] hover:bg-[#F5F5F5]'
                      }`}
                    >
                      <span className="flex-1 font-normal text-[14px] overflow-hidden text-ellipsis whitespace-nowrap leading-[normal]">
                        {child.label}
                      </span>
                      {child.count !== undefined && (
                        <span className={`font-normal text-[14px] leading-[22px] ${child.isActive ? 'text-[#ee4d2d]' : 'text-[rgba(0,0,0,0.45)]'}`}>
                          ({child.count})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* 右侧内容区 — p-[16px] gap-[16px] */}
            <div className="flex-1 flex flex-col gap-[16px] p-[16px] min-w-0 overflow-hidden">

              {/* 标题行 + 搜索框 */}
              <div className="flex gap-[4px] items-center px-[4px] shrink-0">
                <p className="flex-1 font-medium text-[18px] text-[#333] leading-[22px]">All Solution</p>
                <div className="bg-white border border-[#e5e5e5] flex gap-[8px] h-[32px] items-center px-[12px] py-[7px] rounded-[6px] shrink-0 w-[320px]">
                  <div className="relative shrink-0 size-[16px]">
                    <div className="absolute inset-[6.21%_6.23%_6.27%_6.21%]">
                      <img alt="" className="absolute block max-w-none size-full" src={CONTENT_SEARCH_ICON} />
                    </div>
                  </div>
                  <span className="flex-1 font-normal text-[14px] text-[#b7b7b7] leading-[18px]">Search name or description</span>
                </div>
              </div>

              {/* Segment Tab bar — 无外层灰底 */}
              <div className="flex gap-0 items-center rounded-[5px] shrink-0">
                {TABS.map((tab, idx) => {
                  const isActive = activeTab === tab.key;
                  const isFirst = idx === 0;
                  const isLast = idx === TABS.length - 1;
                  const cornerClass =
                    isFirst && isLast
                      ? 'rounded-[4px]'
                      : isFirst
                        ? 'rounded-tl-[4px] rounded-bl-[4px]'
                        : isLast
                          ? 'rounded-tr-[4px] rounded-br-[4px]'
                          : '';
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => handleTabChange(tab.key)}
                      className={`relative ${cornerClass} flex flex-col items-start px-[16px] py-[7px] transition-colors ${
                        idx > 0 ? '-ml-px' : ''
                      } ${isActive ? 'z-10' : ''} ${
                        isActive
                          ? 'bg-white border border-[#ee4d2d] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]'
                          : 'bg-white border border-[#e5e5e5]'
                      }`}
                    >
                      <span className={`text-[14px] leading-[18px] whitespace-nowrap ${
                        isActive ? 'font-medium text-[#ee4d2d]' : 'font-normal text-[#333]'
                      }`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 表格卡片 — rounded-[12px] */}
              <div className="flex-1 min-h-0 bg-white rounded-[12px] overflow-clip flex flex-col">
                {/* 表头 — h-[52px] bg-[#fafafa] border-b border-[#f5f5f5] */}
                <div className="bg-[#fafafa] border-b border-[#f5f5f5] h-[52px] flex items-center shrink-0">
                  <div className="flex items-center p-[12px] w-[400px] shrink-0">
                    <span className="font-normal text-[14px] text-[#595959] whitespace-nowrap">Data</span>
                  </div>
                  <div className="flex gap-[10px] items-center p-[12px] w-[90px] shrink-0">
                    <span className="font-normal text-[14px] text-[#595959] whitespace-nowrap">Status</span>
                    <div className="overflow-clip relative shrink-0 size-[14px]">
                      <div className="absolute inset-[15.04%_10.93%_15.04%_10.94%]">
                        <img alt="" className="absolute block max-w-none size-full" src={CONTENT_FILTER_ICON} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[10px] items-center p-[12px] w-[220px] shrink-0">
                    <span className="font-normal text-[14px] text-[#595959] whitespace-nowrap">Related Issue</span>
                    <div className="relative shrink-0 size-[14px]">
                      <img alt="" className="absolute block max-w-none size-full" src={CONTENT_TABLE_ICON} />
                    </div>
                  </div>
                  <div className="flex gap-[10px] items-center p-[12px] w-[148px] shrink-0">
                    <span className="font-normal text-[14px] text-[#595959] whitespace-nowrap">Updated Time</span>
                    <SorterIcon />
                  </div>
                  <div className="flex items-center p-[12px] w-[128px] shrink-0">
                    <span className="font-normal text-[14px] text-[#595959] whitespace-nowrap">Actions</span>
                  </div>
                </div>

                {/* 表格主体 */}
                <div className="flex-1 overflow-y-auto">
                  {ROWS.map((row) => (
                    <div
                      key={row.id}
                      className={`border-b border-[#f5f5f5] flex items-center py-[16px] transition-colors ${
                        row.isAfterEDD ? 'hover:bg-[#fff5f0] cursor-pointer' : 'hover:bg-[#fafafa]'
                      }`}
                      onClick={() => handleRowClick(row)}
                    >
                      {/* 数据列 — w-[400px] */}
                      <div className="flex gap-[8px] h-[52px] items-center px-[12px] w-[400px] shrink-0">
                        <KnowledgeIcon type={row.icon} />
                        <div className="flex flex-1 flex-col gap-[4px] min-w-0">
                          <p className="capitalize font-normal text-[14px] text-[#333] overflow-hidden text-ellipsis whitespace-nowrap leading-[16px]">
                            {row.title}
                          </p>
                          <p className="font-normal text-[12px] text-[rgba(0,0,0,0.45)] overflow-hidden text-ellipsis whitespace-nowrap leading-[16px]">
                            {row.subtitle}
                          </p>
                        </div>
                      </div>
                      {/* 状态列 — w-[90px] */}
                      <div className="flex h-[52px] items-center px-[12px] w-[90px] shrink-0">
                        <span className={`font-normal text-[12px] leading-[16px] px-[4px] py-px rounded-[2px] ${
                          row.status === 'Live'
                            ? 'bg-[#e6f7ff] text-[#1890ff]'
                            : 'bg-[#f5f5f5] text-[rgba(0,0,0,0.85)]'
                        }`}>
                          {row.status}
                        </span>
                      </div>
                      {/* 关联 Issue — w-[220px] */}
                      <div className="flex h-[52px] items-center px-[12px] w-[220px] shrink-0">
                        <p className="font-normal text-[14px] text-[rgba(0,0,0,0.85)] overflow-hidden text-ellipsis whitespace-nowrap">
                          {row.relatedIssue}
                        </p>
                      </div>
                      {/* 更新时间 — w-[148px] */}
                      <div className="flex h-[52px] items-center px-[12px] w-[148px] shrink-0">
                        <p className="font-normal text-[14px] text-[#666] overflow-hidden text-ellipsis whitespace-nowrap leading-[16px]">
                          {row.updatedTime}
                        </p>
                      </div>
                      {/* 操作列 */}
                      <div className="flex gap-[12px] h-[52px] items-center px-[12px] shrink-0">
                        <button className="font-normal text-[14px] text-[#2673dd] leading-[16px] hover:opacity-80 transition-opacity">View</button>
                        <button
                          className="font-normal text-[14px] text-[#2673dd] leading-[16px] hover:opacity-80 transition-opacity"
                          onClick={(e) => handleEditClick(e, row)}
                        >
                          Edit
                        </button>
                        <button className="font-normal text-[14px] text-[#2673dd] leading-[16px] hover:opacity-80 transition-opacity">Versions</button>
                        <div className="flex items-center justify-center shrink-0 size-[16px]">
                          <div className="-rotate-90 flex-none">
                            <div className="overflow-clip relative size-[16px]">
                              <div className="absolute inset-[17.09%_44.53%_17.29%_44.53%]">
                                <img alt="" className="absolute block max-w-none size-full" src={CONTENT_MORE_VEC} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 分页 — Figma node 294:59497 */}
              <div className="flex items-center justify-end shrink-0">
                <div className="flex gap-[8px] items-center">
                  {/* Prev arrow */}
                  <div className="flex flex-col items-center justify-center px-[6px] py-[9px] rounded-[2px] w-[32px] cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                    <div className="overflow-clip relative shrink-0 size-[14px]">
                      <div className="absolute inset-[12.98%_29.29%_13%_24.22%]">
                        <img alt="" className="absolute block max-w-none size-full" src={CONTENT_PAGIN_PREV} />
                      </div>
                    </div>
                  </div>
                  {/* Page 1 — active */}
                  <div className="border border-[#ee4d2d] flex flex-col items-center justify-center px-[6px] py-[5px] rounded-[6px] w-[32px] cursor-pointer">
                    <span className="font-medium text-[14px] text-[#ee4d2d] leading-[22px] text-center w-full">1</span>
                  </div>
                  {/* Pages 2-5 */}
                  {[2, 3, 4, 5].map((p) => (
                    <div key={p} className="flex flex-col items-center justify-center px-[6px] py-[5px] rounded-[2px] w-[32px] cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                      <span className="font-normal text-[14px] text-[#262626] leading-[22px] text-center w-full">{p}</span>
                    </div>
                  ))}
                  {/* Ellipsis + 50 */}
                  <div className="flex gap-[8px] items-start">
                    <div className="flex items-start p-[4px]">
                      <div className="relative shrink-0 size-[24px]">
                        <img alt="" className="absolute block max-w-none size-full" src={CONTENT_PAGIN_MORE} />
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center px-[6px] py-[5px] rounded-[2px] w-[32px] cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                      <span className="font-normal text-[14px] text-[#262626] leading-[22px] text-center w-full">50</span>
                    </div>
                  </div>
                  {/* Next arrow */}
                  <div className="flex flex-col items-center justify-center px-[6px] py-[9px] rounded-[2px] w-[32px] cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                    <div className="overflow-clip relative shrink-0 size-[14px]">
                      <div className="absolute inset-[12.99%_24.02%_12.99%_29.49%]">
                        <img alt="" className="absolute block max-w-none size-full" src={CONTENT_PAGIN_NEXT} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* 10 / page selector */}
                <div className="flex flex-col items-start pl-[16px]">
                  <div className="bg-white border border-[#d9d9d9] flex gap-[4px] items-center px-[12px] py-[5px] rounded-[6px] cursor-pointer hover:border-[#ee4d2d] transition-colors">
                    <span className="font-normal text-[14px] text-[#262626] leading-[22px] whitespace-nowrap">10 / page</span>
                    <div className="overflow-clip relative shrink-0 size-[14px]">
                      <div className="absolute bottom-1/4 left-[12.89%] right-[12.89%] top-1/4">
                        <img alt="" className="absolute block max-w-none size-full" src={CONTENT_PAGIN_ARROW} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
