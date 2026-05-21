<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { Card } from 'ant-design-vue';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;
const chartType = ref<'bar' | 'line' | 'pie'>('bar');
const types: Array<'bar' | 'line' | 'pie'> = ['bar', 'line', 'pie'];

const optionMap: Record<string, any> = {
  bar: {
    title: { text: '各区域设备数量' },
    tooltip: {},
    xAxis: { data: ['华北', '华东', '华南', '西南', '西北'] },
    yAxis: {},
    series: [{ name: '设备数', type: 'bar', data: [182, 234, 290, 121, 98] }],
  },
  line: {
    title: { text: '7 天温度趋势' },
    tooltip: { trigger: 'axis' },
    xAxis: { data: ['5/15', '5/16', '5/17', '5/18', '5/19', '5/20', '5/21'] },
    yAxis: {},
    series: [
      {
        name: '室内',
        type: 'line',
        data: [26.1, 26.5, 27, 26.8, 26.3, 26, 25.8],
        smooth: true,
      },
      {
        name: '室外',
        type: 'line',
        data: [32, 33.2, 34.1, 31.5, 30, 29.5, 30.2],
        smooth: true,
      },
    ],
  },
  pie: {
    title: { text: '设备状态分布' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: '60%',
        data: [
          { value: 895, name: '在线' },
          { value: 12, name: '离线' },
          { value: 8, name: '故障' },
          { value: 5, name: '维护' },
        ],
      },
    ],
  },
};

const initChart = () => {
  if (!chartRef.value) return;
  chart?.dispose();
  chart = echarts.init(chartRef.value);
  chart.setOption(optionMap[chartType.value]);
};
onMounted(initChart);
watch(chartType, initChart);
onBeforeUnmount(() => chart?.dispose());
</script>

<template>
  <Page>
    <Card class="m-6" title="Echarts 图表">
      <p class="text-sm text-gray-500">
        依赖: <code>echarts</code> — 引用:
        <code>import * as echarts from 'echarts'</code>
      </p>
      <div class="mt-4 mb-4 flex gap-2">
        <button
          v-for="t in types"
          :key="t"
          @click="chartType = t"
          :class="[
            'rounded px-4 py-1',
            chartType === t
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
          ]"
        >
          {{ t === 'bar' ? '柱状图' : t === 'line' ? '折线图' : '饼图' }}
        </button>
      </div>
      <div ref="chartRef" class="h-[400px] w-full rounded-lg border" />
      <div class="mt-6">
        <h3 class="mb-2 font-semibold">基础用法</h3>
        <pre
          class="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto"
        ><code>import * as echarts from 'echarts';
const chart = echarts.init(el);
chart.setOption({ title:{text:'示例'}, xAxis:{data:['A','B']}, yAxis:{}, series:[{type:'bar',data:[10,20]}] });
window.addEventListener('resize', () => chart.resize());
chart.dispose();</code></pre>
      </div>
    </Card>
  </Page>
</template>
