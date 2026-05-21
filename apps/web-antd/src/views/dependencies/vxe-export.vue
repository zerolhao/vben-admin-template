<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import VxeUIPluginExportXLSX from '@vxe-ui/plugin-export-xlsx';
import { Card } from 'ant-design-vue';
import ExcelJS from 'exceljs';
import { VxeGrid, VxeUI } from 'vxe-table';

import 'vxe-table/styles/cssvar.scss';
import 'vxe-pc-ui/styles/cssvar.scss';

VxeUI.use(VxeUIPluginExportXLSX, { ExcelJS });

const gridRef = ref();
const columns = [
  { field: 'name', title: '设备名称', width: 180 },
  { field: 'sn', title: '序列号', width: 200 },
  { field: 'status', title: '状态', width: 100 },
  { field: 'temperature', title: '温度(℃)', width: 120, sortable: true },
  { field: 'updateTime', title: '更新时间', width: 180 },
];
const data = ref([
  {
    name: '空调机组-A1',
    sn: 'AC-2025-001',
    status: '在线',
    temperature: 26.5,
    updateTime: '2026-05-21 10:30:00',
  },
  {
    name: '空调机组-A2',
    sn: 'AC-2025-002',
    status: '在线',
    temperature: 27.1,
    updateTime: '2026-05-21 10:30:00',
  },
  {
    name: '空调机组-A3',
    sn: 'AC-2025-003',
    status: '离线',
    temperature: 0,
    updateTime: '2026-05-20 18:00:00',
  },
  {
    name: '冷水机组-B1',
    sn: 'CH-2025-101',
    status: '在线',
    temperature: 7.2,
    updateTime: '2026-05-21 10:32:00',
  },
  {
    name: '冷水机组-B2',
    sn: 'CH-2025-102',
    status: '在线',
    temperature: 7.5,
    updateTime: '2026-05-21 10:32:00',
  },
]);
const exportData = () => {
  gridRef.value?.exportData({ type: 'xlsx' });
};
</script>

<template>
  <Page>
    <Card class="m-6" title="VXE 表格导出 Excel">
      <p class="text-sm text-gray-500">
        依赖: <code>@vxe-ui/plugin-export-xlsx</code> + <code>exceljs</code>
      </p>
      <div class="mt-4">
        <VxeGrid ref="gridRef" :columns="columns" :data="data" />
        <div class="mt-4 flex gap-3">
          <button
            class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            @click="exportData"
          >
            导出 Excel
          </button>
        </div>
      </div>
      <div class="mt-6">
        <h3 class="mb-2 font-semibold">注册与使用</h3>
        <pre
          class="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto"
        ><code>// 1. 注册插件（全局一次）
import { VxeUI } from 'vxe-table';
import VxeUIPluginExportXLSX from '@vxe-ui/plugin-export-xlsx';
import ExcelJS from 'exceljs';
VxeUI.use(VxeUIPluginExportXLSX, { ExcelJS });

// 2. 工具栏配置
&lt;VxeGrid :toolbar-config="{ export: true }" ... /&gt;

// 3. 编程式导出
gridRef.value.exportData({ type: 'xlsx' });</code></pre>
      </div>
    </Card>
  </Page>
</template>
