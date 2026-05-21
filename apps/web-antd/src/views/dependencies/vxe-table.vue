<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';
import { VxeGrid } from 'vxe-table';

import 'vxe-table/styles/cssvar.scss';
import 'vxe-pc-ui/styles/cssvar.scss';

const gridRef = ref();
const columns = [
  { field: 'id', title: 'ID', width: 60, type: 'seq' },
  { field: 'deviceName', title: '设备名称', minWidth: 150, sortable: true },
  { field: 'location', title: '位置', width: 120 },
  { field: 'status', title: '状态', width: 100, slots: { default: 'status' } },
  { field: 'power', title: '功率(kW)', width: 120, sortable: true },
  { field: 'runtime', title: '运行时长(h)', width: 120 },
  {
    field: 'alarmCount',
    title: '告警次数',
    width: 100,
    sortable: true,
    slots: { default: 'alarm' },
  },
];
const data = ref([
  {
    id: 1,
    deviceName: '冷却泵-1号',
    location: '机房A',
    status: 'online',
    power: 45.2,
    runtime: 8234,
    alarmCount: 0,
  },
  {
    id: 2,
    deviceName: '冷却泵-2号',
    location: '机房A',
    status: 'online',
    power: 43.8,
    runtime: 8210,
    alarmCount: 1,
  },
  {
    id: 3,
    deviceName: '空调机组-1',
    location: '区域1',
    status: 'offline',
    power: 0,
    runtime: 0,
    alarmCount: 3,
  },
  {
    id: 4,
    deviceName: '空调机组-2',
    location: '区域1',
    status: 'online',
    power: 12.5,
    runtime: 6542,
    alarmCount: 0,
  },
  {
    id: 5,
    deviceName: '变压器-1号',
    location: '配电房',
    status: 'online',
    power: 280,
    runtime: 12_000,
    alarmCount: 2,
  },
  {
    id: 6,
    deviceName: '变压器-2号',
    location: '配电房',
    status: 'fault',
    power: 0,
    runtime: 11_980,
    alarmCount: 5,
  },
  {
    id: 7,
    deviceName: '冷水机组-1',
    location: '机房B',
    status: 'online',
    power: 180.5,
    runtime: 4500,
    alarmCount: 0,
  },
  {
    id: 8,
    deviceName: '冷水机组-2',
    location: '机房B',
    status: 'online',
    power: 175.3,
    runtime: 4480,
    alarmCount: 0,
  },
]);
const statusMap: Record<string, string> = {
  online: '在线',
  offline: '离线',
  fault: '故障',
};
</script>

<template>
  <Page>
    <Card class="m-6" title="VXE 表格">
      <p class="text-sm text-gray-500">
        依赖: <code>vxe-pc-ui</code> + <code>vxe-table</code> — 引用:
        <code>import { VxeGrid } from 'vxe-table'</code>
      </p>
      <div class="mt-4">
        <VxeGrid
          ref="gridRef"
          :data="data"
          :columns="columns"
          max-height="400"
          stripe
        >
          <template #status="{ row }">
            <span
              class="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
              :class="{
                'bg-green-100 text-green-700': row.status === 'online',
                'bg-gray-100 text-gray-500': row.status === 'offline',
                'bg-red-100 text-red-700': row.status === 'fault',
              }"
            >
              {{ statusMap[row.status] || row.status }}</span
            >
          </template>
          <template #alarm="{ row }">
            <span :class="row.alarmCount > 0 ? 'font-bold text-red-600' : ''">
              {{ row.alarmCount > 0 ? '⚡' : '' }} {{ row.alarmCount }}
            </span>
          </template>
        </VxeGrid>
      </div>
      <div class="mt-6">
        <h3 class="mb-2 font-semibold">基本用法</h3>
        <pre
          class="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto"
        ><code>import { VxeGrid } from 'vxe-table';
import 'vxe-table/styles/cssvar.scss';
import 'vxe-pc-ui/styles/cssvar.scss';

const columns = [{ field: 'name', title: '名称', sortable: true }];
&lt;VxeGrid :data="data" :columns="columns" max-height="400" stripe&gt;
  &lt;template #colSlot="{ row }"&gt;{{ row.value }}&lt;/template&gt;
&lt;/VxeGrid&gt;</code></pre>
      </div>
    </Card>
  </Page>
</template>
