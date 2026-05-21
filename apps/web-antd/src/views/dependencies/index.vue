<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { Card } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const demos = [
  {
    name: '高德地图',
    path: '/dependencies/gaode-map',
    desc: '@amap/amap-jsapi-loader — 地图加载、地点搜索、地理定位',
  },
  {
    name: 'CSS 动画',
    path: '/dependencies/animate-css',
    desc: 'animate.css — 进出场动画、配合 Vue transition',
  },
  {
    name: '大数计算',
    path: '/dependencies/bigjs',
    desc: 'big.js — 浮点精确计算，金额/统计无忧',
  },
  {
    name: '萤石云视频',
    path: '/dependencies/ezuikit',
    desc: 'ezuikit-js — 实时视频播放、录像回放',
  },
  {
    name: '数字滚动',
    path: '/dependencies/count-to',
    desc: 'vue3-count-to / VbenCountToAnimator — 数字动画',
  },
  {
    name: 'VXE 导出',
    path: '/dependencies/vxe-export',
    desc: '@vxe-ui/plugin-export-xlsx + exceljs — 表格导出 Excel',
  },
  {
    name: 'Lodash 工具',
    path: '/dependencies/lodash',
    desc: 'lodash — 防抖、深拷贝、节流、安全取值',
  },
  {
    name: 'Echarts 图表',
    path: '/dependencies/echarts',
    desc: 'echarts — 柱状图、折线图、饼图',
  },
  {
    name: 'Lucide 图标',
    path: '/dependencies/lucide-icons',
    desc: 'lucide-vue-next — 500+ 图标，按需引入',
  },
  {
    name: 'VXE 表格',
    path: '/dependencies/vxe-table',
    desc: 'vxe-pc-ui + vxe-table — 高性能表格',
  },
];
</script>

<template>
  <Page>
    <Card class="m-6" title="依赖示例总览">
      <p class="text-sm text-gray-500">
        本模板项目相对于 vue-vben-admin 原版框架新增的全部外部依赖及使用方式。
        详情见
        <code class="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700"
          >DEPENDENCY_NOTES.md</code
        >。
      </p>
      <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          v-for="demo in demos"
          :key="demo.path"
          class="cursor-pointer rounded-lg border p-5 transition-shadow hover:shadow-md"
          @click="router.push(demo.path)"
        >
          <div class="mb-2 text-lg font-semibold">{{ demo.name }}</div>
          <p class="text-sm text-gray-500">{{ demo.desc }}</p>
        </div>
      </div>
    </Card>
  </Page>
</template>
