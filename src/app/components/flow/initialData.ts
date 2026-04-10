import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'start',
    position: { x: 50, y: 300 },
    data: {},
  },
  {
    id: 'condition-1',
    type: 'condition',
    position: { x: 50, y: 500 },
    data: {
      title: 'Days Since Delivery Done',
      options: [
        { id: 'gt-30', label: '>=30D' },
        { id: 'lt-30', label: '<30D' },
        { id: 'default', label: 'Default' },
      ],
    },
  },
  {
    id: 'check-integrated',
    type: 'agent',
    position: { x: 200, y: 250 },
    data: {
      title: 'Integrated/not integrated check',
      type: 'clarification',
      options: [
        { id: 'not-integrated', label: 'Not integrated channel' },
        { id: 'is-integrated', label: 'Is integrated channel' },
        { id: 'default', label: 'Default' },
      ],
    },
  },
  {
    id: 'answer-not-integrated',
    type: 'answer',
    position: { x: 550, y: 100 },
    data: {
      text: 'I understand that you want to know about...',
    },
  },
  {
    id: 'check-payment',
    type: 'agent',
    position: { x: 550, y: 300 },
    data: {
      title: 'Integrated Payment method',
      type: 'clarification',
      options: [
        { id: 'is-cod', label: 'Is COD' },
        { id: 'non-cod', label: 'Non-COD' },
        { id: 'default', label: 'Default' },
      ],
    },
  },
  {
    id: 'answer-payment-default',
    type: 'answer',
    position: { x: 550, y: 500 },
    data: {
      text: 'I understand that you want to know about...',
    },
  },
  // COD Path
  {
    id: 'check-cod-pod',
    type: 'agent',
    position: { x: 900, y: 200 },
    data: {
      title: 'Is COD - POD Check',
      type: 'clarification',
      options: [
        { id: 'pod-avail', label: 'POD available' },
        { id: 'pod-unavail', label: 'POD unavailable' },
        { id: 'default', label: 'Default' },
      ],
    },
  },
  {
    id: 'cod-pod-avail-msg',
    type: 'answer',
    position: { x: 1250, y: 150 },
    data: {
      title: 'POD Available',
      text: 'We apologize that your order was tagged...',
    },
  },
  {
    id: 'check-pod-correct',
    type: 'agent',
    position: { x: 1600, y: 150 },
    data: {
      title: 'Is: POD Correct ?',
      type: 'clarification',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' },
      ],
    },
  },
   {
    id: 'cod-pod-unavail-msg',
    type: 'answer',
    position: { x: 1250, y: 300 },
    data: {
      title: 'POD Unavailable',
      text: 'We are deeply sorry that your order was...',
    },
  },

  // Non-COD Path
  {
    id: 'check-noncod-pod',
    type: 'agent',
    position: { x: 900, y: 500 },
    data: {
      title: 'Non-COD - POD Check',
      type: 'clarification',
      options: [
        { id: 'pod-avail', label: 'POD available' },
        { id: 'pod-unavail', label: 'POD unavailable' },
        { id: 'default', label: 'Default' },
      ],
    },
  },
  {
    id: 'noncod-pod-avail-msg',
    type: 'answer',
    position: { x: 1250, y: 450 },
    data: {
      title: 'POD Available',
      text: 'We apologize that your order was tagged...',
    },
  },
  {
    id: 'days-since-delivery',
    type: 'agent',
    position: { x: 1250, y: 600 },
    data: {
      title: 'EDD Exceeded',
      type: 'agent',
      options: [
        { id: 'gt-30', label: '>=30', isEnd: true },
        { id: 'lt-30', label: '<30' },
        { id: 'default', label: 'Default' },
      ],
    },
  },
  {
    id: 'check-rr-eligibility',
    type: 'agent',
    position: { x: 1600, y: 600 },
    data: {
      title: 'Check R/R Eligibility?',
      type: 'clarification',
      options: [
        { id: 'ineligible', label: 'Ineligible for RR' },
        { id: 'eligible', label: 'Eligible for RR', isEnd: true },
        { id: 'default', label: 'Default' },
      ],
    },
  },
  {
    id: 'ineligible-rr-msg',
    type: 'answer',
    position: { x: 1950, y: 550 },
    data: {
      title: 'Ineligible for RR',
      text: 'I understand that you want a refund...',
    },
  }
];

export const initialEdges: Edge[] = [
  { id: 'e1', source: 'start', sourceHandle: 'source', target: 'check-integrated', targetHandle: 'target', type: 'custom' },
  { id: 'e2', source: 'check-integrated', sourceHandle: 'not-integrated', target: 'answer-not-integrated', targetHandle: 'target', type: 'custom' },
  { id: 'e3', source: 'check-integrated', sourceHandle: 'is-integrated', target: 'check-payment', targetHandle: 'target', type: 'custom' },
  { id: 'e4', source: 'check-integrated', sourceHandle: 'default', target: 'answer-payment-default', targetHandle: 'target', type: 'custom' },

  { id: 'e5', source: 'check-payment', sourceHandle: 'is-cod', target: 'check-cod-pod', targetHandle: 'target', type: 'custom' },
  { id: 'e6', source: 'check-payment', sourceHandle: 'non-cod', target: 'check-noncod-pod', targetHandle: 'target', type: 'custom' },

  { id: 'e7', source: 'check-cod-pod', sourceHandle: 'pod-avail', target: 'cod-pod-avail-msg', targetHandle: 'target', type: 'custom' },
  { id: 'e8', source: 'check-cod-pod', sourceHandle: 'pod-unavail', target: 'cod-pod-unavail-msg', targetHandle: 'target', type: 'custom' },

  { id: 'e9', source: 'cod-pod-avail-msg', sourceHandle: 'source', target: 'check-pod-correct', targetHandle: 'target', type: 'custom' },

  { id: 'e10', source: 'check-noncod-pod', sourceHandle: 'pod-avail', target: 'noncod-pod-avail-msg', targetHandle: 'target', type: 'custom' },
  { id: 'e11', source: 'check-noncod-pod', sourceHandle: 'pod-unavail', target: 'days-since-delivery', targetHandle: 'target', type: 'custom' },

  { id: 'e12', source: 'days-since-delivery', sourceHandle: 'lt-30', target: 'check-rr-eligibility', targetHandle: 'target', type: 'custom' },

  { id: 'e13', source: 'check-rr-eligibility', sourceHandle: 'ineligible', target: 'ineligible-rr-msg', targetHandle: 'target', type: 'custom' },
];
