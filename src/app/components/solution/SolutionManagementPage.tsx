import React, { useEffect, useMemo, useRef, useState } from 'react';

interface SolutionRow {
  id: string;
  icon: 'flow' | 'doc';
  title: string;
  subtitle: string;
  status: 'Live' | 'Archive' | 'Offline' | 'Publish In Review' | 'Rejected' | 'Draft' | 'Publish';
  relatedIssue: string;
  updatedTime: string;
  isAfterEDD?: boolean;
}

type TabKey = 'all' | 'sop' | 'qa';

type StatusFilterValue = 'all' | 'Live' | 'Archive' | 'Offline' | 'Publish In Review' | 'Rejected' | 'Draft' | 'Publish';

const STATUS_FILTER_OPTIONS: { value: StatusFilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'Live', label: 'Live' },
  { value: 'Archive', label: 'Archive' },
  { value: 'Offline', label: 'Offline' },
  { value: 'Publish In Review', label: 'Publish In Review' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Draft', label: 'Draft' },
  { value: 'Publish', label: 'Publish' },
];

const ROWS: SolutionRow[] = [
  {
    id: '1',
    icon: 'flow',
    title: '2025 Feature Request Management SOP',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Live',
    relatedIssue: 'Status is deliver...',
    updatedTime: '2024-08-12 18:20',
  },
  {
    id: '2',
    icon: 'flow',
    title: 'L3 Return/Refund - Check On Refund Status',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Archive',
    relatedIssue: 'How to use deli...',
    updatedTime: '2024-08-12 18:20',
  },
  {
    id: 'after-edd',
    icon: 'flow',
    title: 'After EDD',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Offline',
    relatedIssue: 'After EDD',
    updatedTime: '2024-08-12 18:20',
    isAfterEDD: true,
  },
  {
    id: '4',
    icon: 'doc',
    title: 'Claim Lost RTS Parcel',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Publish In Review',
    relatedIssue: 'Claim Lost RTS P...',
    updatedTime: '2024-08-12 18:20',
  },
  {
    id: '5',
    icon: 'doc',
    title: 'Check Delivery Status',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Rejected',
    relatedIssue: '-',
    updatedTime: '2024-08-12 18:20',
  },
  {
    id: '6',
    icon: 'flow',
    title: 'Contact Delivery Rider',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Draft',
    relatedIssue: '-',
    updatedTime: '2024-08-12 18:20',
  },
  {
    id: '7',
    icon: 'flow',
    title: '2025 Feature Request Management SOP',
    subtitle: '2025 Shopee Marketplace Line of Business P...',
    status: 'Publish',
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

type LogisticsChild = { label: string; count?: number; isActive?: boolean };

const LOGISTICS_CHILDREN: LogisticsChild[] = [
  { label: 'Change Detail' },
  { label: 'Contact delivery rider' },
  { label: 'Status is delivered but not yet received' },
  { label: 'How to use delivery by Locker' },
  { label: 'Check delivery status' },
  { label: 'Order cancellation', count: 0 },
  { label: 'Order/Shop product Line', count: 0 },
];

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'sop', label: 'Smart SOP' },
  { key: 'qa', label: 'General QA' },
];

/** 列表模糊搜索：名称 / 描述 / 关联 Issue；不区分大小写；多词为 AND；单串额外支持子序列匹配 */
function matchesSolutionSearch(row: SolutionRow, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return true;

  const title = row.title.toLowerCase();
  const subtitle = row.subtitle.toLowerCase();
  const related = row.relatedIssue.toLowerCase();
  const blob = `${title} ${subtitle} ${related}`;

  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    return tokens.every((t) => blob.includes(t));
  }

  const single = tokens[0] ?? q;
  if (blob.includes(single)) return true;

  const merged = `${title}${subtitle}`.replace(/\s/g, '');
  const needle = single.replace(/\s/g, '');
  if (needle.length === 0) return true;
  let j = 0;
  for (let i = 0; i < merged.length && j < needle.length; i++) {
    if (merged[i] === needle[j]) j++;
  }
  return j === needle.length;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 检索词在文案中以主题色 #ee4d2d 高亮（连续子串；多词分别匹配） */
function highlightSearchTerms(text: string, raw: string): React.ReactNode {
  const q = raw.trim();
  if (!q) return text;

  const tokens = [...new Set(q.split(/\s+/).filter(Boolean))];
  if (tokens.length === 0) return text;

  const escaped = tokens.map(escapeRegExp).sort((a, b) => b.length - a.length);
  try {
    const re = new RegExp(`(${escaped.join('|')})`, 'gi');
    const parts = text.split(re);
    return (
      <>
        {parts.map((part, i) => {
          if (part === '') return null;
          const hit = tokens.some((t) => part.toLowerCase() === t.toLowerCase());
          return hit ? (
            <span key={i} className="font-medium text-[#ee4d2d]">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          );
        })}
      </>
    );
  } catch {
    return text;
  }
}

// 导航图标资源（本地）
import iconKbDefault  from '@/assets/icons/figma/kb-default.svg';
import iconKbActive   from '@/assets/icons/figma/kb-active.svg';
import iconApiBg      from '@/assets/icons/figma/api-bg.svg';
import iconApiVec     from '@/assets/icons/figma/api-vec.svg';
import iconAccess     from '@/assets/icons/figma/access.svg';
import iconApproval   from '@/assets/icons/figma/approval.svg';
import iconSettingBg  from '@/assets/icons/figma/setting-bg.svg';
import iconSettingOvl from '@/assets/icons/figma/setting-ovl.svg';
import iconExpKm          from '@/assets/icons/figma/exp-km.svg';
import iconExpApiBg       from '@/assets/icons/figma/exp-api-bg.svg';
import iconExpApiVec      from '@/assets/icons/figma/exp-api-vec.svg';
import iconExpAccessVec   from '@/assets/icons/figma/exp-access-vec.svg';
import iconExpApproval    from '@/assets/icons/figma/exp-approval.svg';
import iconExpSettingOvl  from '@/assets/icons/figma/exp-setting-ovl.svg';
import iconExpLac         from '@/assets/icons/figma/exp-lac.svg';
import iconExpChevron     from '@/assets/icons/figma/exp-chevron.svg';
import iconMenufoldVec    from '@/assets/icons/figma/menufold-vec.svg';
import iconHeaderLogo     from '@/assets/icons/figma/header-logo.svg';
import iconHeaderDots     from '@/assets/icons/figma/header-dots.svg';
import iconContentPlus        from '@/assets/icons/figma/content-plus.svg';
import iconContentArrowDown   from '@/assets/icons/figma/content-arrow-down.svg';
import iconContentSearch      from '@/assets/icons/figma/content-search.svg';
import iconContentFilter      from '@/assets/icons/figma/content-filter.svg';
import iconContentTable       from '@/assets/icons/figma/content-table.svg';
import iconContentSorterUp    from '@/assets/icons/figma/content-sorter-up.svg';
import iconContentSorterDown  from '@/assets/icons/figma/content-sorter-down.svg';
import iconContentMore        from '@/assets/icons/figma/content-more.svg';
import iconContentFlow        from '@/assets/icons/figma/content-flow.svg';
import iconContentFaq1        from '@/assets/icons/figma/content-faq1.svg';
import iconContentFaq2        from '@/assets/icons/figma/content-faq2.svg';
import iconContentFaq3        from '@/assets/icons/figma/content-faq3.svg';
import iconContentFaq4        from '@/assets/icons/figma/content-faq4.svg';
import iconPaginPrev          from '@/assets/icons/figma/pagin-prev.svg';
import iconPaginNext          from '@/assets/icons/figma/pagin-next.svg';
import iconPaginMore          from '@/assets/icons/figma/pagin-more.svg';
import iconPaginArrow         from '@/assets/icons/figma/pagin-arrow.svg';

const FIGMA_ICON_KB_DEFAULT  = iconKbDefault;
const FIGMA_ICON_KB_ACTIVE   = iconKbActive;
const FIGMA_ICON_API_BG      = iconApiBg;
const FIGMA_ICON_API_VEC     = iconApiVec;
const FIGMA_ICON_ACCESS      = iconAccess;
const FIGMA_ICON_APPROVAL    = iconApproval;
const FIGMA_ICON_SETTING_BG  = iconSettingBg;
const FIGMA_ICON_SETTING_OVL = iconSettingOvl;

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

// 展开态 / 内容区图标（本地）
const EXP_ICON_KM          = iconExpKm;
const EXP_ICON_API_BG      = iconExpApiBg;
const EXP_ICON_API_VEC     = iconExpApiVec;
const EXP_ICON_ACCESS_VEC  = iconExpAccessVec;
const EXP_ICON_APPROVAL    = iconExpApproval;
const EXP_ICON_SETTING_OVL = iconExpSettingOvl;
const EXP_ICON_LAC         = iconExpLac;
const EXP_CHEVRON          = iconExpChevron;
const FIGMA_MENUFOLD_VEC   = iconMenufoldVec;
const FIGMA_HEADER_LOGO    = iconHeaderLogo;
const FIGMA_HEADER_DOTS    = iconHeaderDots;

const CONTENT_PLUS_VEC    = iconContentPlus;
const CONTENT_ARROW_DOWN  = iconContentArrowDown;
const CONTENT_SEARCH_ICON = iconContentSearch;
const CONTENT_FILTER_ICON = iconContentFilter;
const CONTENT_TABLE_ICON  = iconContentTable;
const CONTENT_SORTER_UP   = iconContentSorterUp;
const CONTENT_SORTER_DOWN = iconContentSorterDown;
const CONTENT_MORE_VEC    = iconContentMore;
const CONTENT_FLOW_ICON   = iconContentFlow;
const CONTENT_FAQ_VEC1    = iconContentFaq1;
const CONTENT_FAQ_VEC2    = iconContentFaq2;
const CONTENT_FAQ_VEC3    = iconContentFaq3;
const CONTENT_FAQ_VEC4    = iconContentFaq4;
const CONTENT_PAGIN_PREV  = iconPaginPrev;
const CONTENT_PAGIN_NEXT  = iconPaginNext;
const CONTENT_PAGIN_MORE  = iconPaginMore;
const CONTENT_PAGIN_ARROW = iconPaginArrow;

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogisticsOpen, setIsLogisticsOpen] = useState(true);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [openNavSections, setOpenNavSections] = useState<Record<string, boolean>>({
    'Knowledge Management': true,
  });
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('all');
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const statusFilterRef = useRef<HTMLDivElement>(null);

  const filteredRows = useMemo(
    () =>
      ROWS.filter((row) => {
        if (!matchesSolutionSearch(row, searchQuery)) return false;
        if (statusFilter !== 'all' && row.status !== statusFilter) return false;
        if (activeTab === 'sop' && row.icon !== 'flow') return false;
        if (activeTab === 'qa' && row.icon !== 'doc') return false;
        return true;
      }),
    [searchQuery, statusFilter, activeTab],
  );

  useEffect(() => {
    if (!isStatusFilterOpen) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (statusFilterRef.current && !statusFilterRef.current.contains(e.target as Node)) {
        setIsStatusFilterOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsStatusFilterOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isStatusFilterOpen]);

  // handle 前缀事件处理器
  const handleTabChange = (key: TabKey) => setActiveTab(key);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleClearSearch = () => setSearchQuery('');
  const handleStatusFilterSelect = (value: StatusFilterValue) => {
    setStatusFilter(value);
    setIsStatusFilterOpen(false);
  };
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
                <div className="bg-white border border-[#e5e5e5] flex gap-[8px] h-[32px] items-center pl-[12px] pr-[8px] py-[7px] rounded-[6px] shrink-0 w-[320px] transition-colors focus-within:border-[#ee4d2d]">
                  <div className="relative shrink-0 size-[16px] pointer-events-none">
                    <div className="absolute inset-[6.21%_6.23%_6.27%_6.21%]">
                      <img alt="" className="absolute block max-w-none size-full" src={CONTENT_SEARCH_ICON} />
                    </div>
                  </div>
                  <input
                    type="text"
                    inputMode="search"
                    enterKeyHint="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search name or description"
                    aria-label="Search name or description"
                    autoComplete="off"
                    className="flex-1 min-w-0 bg-transparent border-0 outline-none font-normal text-[14px] text-[rgba(0,0,0,0.85)] placeholder:text-[rgba(0,0,0,0.45)] leading-[22px]"
                  />
                  {searchQuery.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="shrink-0 flex items-center justify-center size-[22px] rounded-[4px] text-[rgba(0,0,0,0.45)] hover:text-[rgba(0,0,0,0.65)] hover:bg-gray-100 transition-colors"
                      aria-label="Clear search"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path
                          d="M3.5 3.5l7 7M10.5 3.5l-7 7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  )}
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
              <div className="flex-1 min-h-0 rounded-[12px] overflow-auto">
                <div className="bg-white min-w-[970px]">
                {/* 表头 — h-[52px] bg-[#fafafa] border-b border-[#f5f5f5] */}
                <div className="bg-[#fafafa] border-b border-[#f5f5f5] h-[52px] flex items-stretch overflow-visible relative z-20">
                  <div className="flex items-center p-[12px] w-[320px] shrink-0">
                    <span className="font-normal text-[14px] text-[#595959] whitespace-nowrap">Data</span>
                  </div>
                  <div
                    ref={statusFilterRef}
                    className="relative flex h-full min-h-[52px] items-stretch w-[180px] shrink-0"
                  >
                    <button
                      type="button"
                      onClick={() => setIsStatusFilterOpen((v) => !v)}
                      className={`flex flex-1 gap-[6px] items-center justify-start min-w-0 px-[12px] py-0 rounded-[4px] transition-colors ${
                        isStatusFilterOpen ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'
                      } ${statusFilter !== 'all' ? 'text-[#ee4d2d]' : 'text-[#595959]'}`}
                      aria-expanded={isStatusFilterOpen}
                      aria-haspopup="listbox"
                      aria-label="Filter by status"
                    >
                      <span
                        className={`font-normal text-[14px] whitespace-nowrap truncate ${
                          statusFilter !== 'all' ? 'font-medium' : ''
                        }`}
                      >
                        Status
                      </span>
                      <div className="overflow-clip relative shrink-0 size-[14px]">
                        <div className="absolute inset-[15.04%_10.93%_15.04%_10.94%]">
                          <img alt="" className="absolute block max-w-none size-full" src={CONTENT_FILTER_ICON} />
                        </div>
                      </div>
                    </button>
                    {isStatusFilterOpen && (
                      <ul
                        role="listbox"
                        className="absolute left-[8px] top-[calc(100%-2px)] z-[60] min-w-[136px] list-none m-0 rounded-[6px] border border-[#e8e8e8] bg-white p-[8px] flex flex-col gap-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
                      >
                        {STATUS_FILTER_OPTIONS.map((opt) => {
                          const selected = statusFilter === opt.value;
                          return (
                            <li key={opt.value} role="option" aria-selected={selected} className="min-w-0">
                              <button
                                type="button"
                                onClick={() => handleStatusFilterSelect(opt.value)}
                                className={`w-full text-left px-[8px] py-[8px] font-normal text-[14px] leading-[22px] transition-colors rounded-[4px] ${
                                  selected
                                    ? 'bg-[#fff5f0] text-[#ee4d2d] font-medium'
                                    : 'text-[rgba(0,0,0,0.85)] hover:bg-[#fafafa]'
                                }`}
                              >
                                {opt.label}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                  <div className="flex gap-[10px] items-center p-[12px] w-[148px] shrink-0">
                    <span className="font-normal text-[14px] text-[#595959] whitespace-nowrap">Related Issue</span>
                    <div className="relative shrink-0 size-[14px]">
                      <img alt="" className="absolute block max-w-none size-full" src={CONTENT_TABLE_ICON} />
                    </div>
                  </div>
                  <div className="flex gap-[10px] items-center p-[12px] w-[148px] shrink-0">
                    <span className="font-normal text-[14px] text-[#595959] whitespace-nowrap">Updated Time</span>
                    <SorterIcon />
                  </div>
                  <div className="sticky right-0 z-30 flex items-center justify-start p-[12px] w-[174px] h-full shrink-0 bg-[#fafafa] border-l border-[#f5f5f5] shadow-[-6px_0_12px_-6px_rgba(0,0,0,0.06)]">
                    <span className="font-normal text-[14px] text-[#595959] whitespace-nowrap">Actions</span>
                  </div>
                </div>

                {/* 表格主体 */}
                <div>
                  {filteredRows.length === 0 ? (
                    <div className="flex items-center justify-center py-[48px] px-[16px] font-normal text-[14px] leading-[22px] text-[rgba(0,0,0,0.45)]">
                      No matching solutions
                    </div>
                  ) : (
                  filteredRows.map((row) => (
                    <div
                      key={row.id}
                      className={`group border-b border-[#f5f5f5] flex items-center transition-colors ${
                        row.isAfterEDD ? 'hover:bg-[#fff5f0] cursor-pointer' : 'hover:bg-[#fafafa]'
                      }`}
                      onClick={() => handleRowClick(row)}
                    >
                      {/* 数据列 — w-[320px] */}
                      <div className="flex gap-[8px] h-[84px] items-center px-[12px] w-[320px] shrink-0">
                        <KnowledgeIcon type={row.icon} />
                        <div className="flex flex-1 flex-col gap-[4px] min-w-0">
                          <p className="capitalize font-normal text-[14px] text-[rgba(0,0,0,0.85)] overflow-hidden text-ellipsis whitespace-nowrap leading-[16px]">
                            {highlightSearchTerms(row.title, searchQuery)}
                          </p>
                          <p className="font-normal text-[12px] text-[rgba(0,0,0,0.45)] overflow-hidden text-ellipsis whitespace-nowrap leading-[16px]">
                            {highlightSearchTerms(row.subtitle, searchQuery)}
                          </p>
                        </div>
                      </div>
                      {/* 状态列 — w-[180px] */}
                      <div className="flex h-[84px] items-center px-[12px] w-[180px] shrink-0">
                        <span className={`font-normal text-[12px] leading-[16px] px-[4px] py-px rounded-[2px] whitespace-nowrap ${
                          row.status === 'Live'             ? 'bg-[#e6f7ff] text-[#1890ff]' :
                          row.status === 'Archive'          ? 'bg-[#f9f0ff] text-[#722ed1]' :
                          row.status === 'Offline'          ? 'bg-[#f5f5f5] text-[rgba(0,0,0,0.85)]' :
                          row.status === 'Publish In Review'? 'bg-[#e6fffb] text-[#13c2c2]' :
                          row.status === 'Rejected'         ? 'bg-[#fff1f0] text-[#f5222d]' :
                          row.status === 'Publish'          ? 'bg-[#f6ffed] text-[#52c41a]' :
                                                              'bg-[#f5f5f5] text-[rgba(0,0,0,0.85)]'
                        }`}>
                          {row.status}
                        </span>
                      </div>
                      {/* 关联 Issue — w-[148px] */}
                      <div className="flex h-[84px] items-center px-[12px] w-[148px] shrink-0">
                        <p className="font-normal text-[14px] text-[rgba(0,0,0,0.85)] overflow-hidden text-ellipsis whitespace-nowrap">
                          {highlightSearchTerms(row.relatedIssue, searchQuery)}
                        </p>
                      </div>
                      {/* 更新时间 — w-[148px] */}
                      <div className="flex h-[84px] items-center px-[12px] w-[148px] shrink-0">
                        <p className="font-normal text-[14px] text-[#666] overflow-hidden text-ellipsis whitespace-nowrap leading-[16px]">
                          {row.updatedTime}
                        </p>
                      </div>
                      {/* 操作列 — sticky 贴齐滚动容器右缘 */}
                      <div
                        className={`sticky right-0 z-10 flex h-[84px] flex-row items-center w-[174px] shrink-0 border-l border-[#f5f5f5] bg-white shadow-[-6px_0_12px_-6px_rgba(0,0,0,0.06)] ${
                          row.isAfterEDD ? 'group-hover:bg-[#fff5f0]' : 'group-hover:bg-[#fafafa]'
                        }`}
                      >
                        <div className="flex gap-[12px] h-full items-center px-[12px]">
                          <button className="font-normal text-[14px] text-[#2673dd] leading-[16px] hover:opacity-80 transition-opacity">View</button>
                          <button
                            className="font-normal text-[14px] text-[#2673dd] leading-[16px] hover:opacity-80 transition-opacity"
                            onClick={(e) => handleEditClick(e, row)}
                          >
                            Edit
                          </button>
                          <button className="font-normal text-[14px] text-[#2673dd] leading-[16px] hover:opacity-80 transition-opacity">Versions</button>
                          <div className="flex items-center justify-center shrink-0 size-[16px]">
                            <div className="overflow-clip relative size-[16px]">
                              <div className="absolute inset-[17.09%_44.53%_17.29%_44.53%]">
                                <img alt="" className="absolute block max-w-none size-full" src={CONTENT_MORE_VEC} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  )}
                </div>
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
