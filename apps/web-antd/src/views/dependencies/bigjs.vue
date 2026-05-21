<script lang="ts" setup>
import { computed, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';
import Big from 'big.js';

const a = ref('123.456');
const b = ref('0.001');

const results = computed(() => {
  try {
    const x = Big(a.value || '0');
    const y = Big(b.value || '0');
    return {
      plus: x.plus(y).toString(),
      minus: x.minus(y).toString(),
      times: x.times(y).toString(),
      div: y.eq(0) ? '除数不能为 0' : x.div(y).toString(),
      round2: x.round(2).toString(),
      round2Down: x.round(2, 0).toString(),
      toFixed: x.toFixed(4),
      eq: x.eq(y),
      gt: x.gt(y),
      lt: x.lt(y),
    };
  } catch (error) {
    return { error: error.message };
  }
});
</script>

<template>
  <Page>
    <Card class="m-6" title="大数计算 (big.js)">
      <p class="text-sm text-gray-500">
        依赖: <code>big.js</code> + <code>@types/big.js</code> — 引用:
        <code>import Big from 'big.js'</code>
      </p>
      <div class="mt-4 mb-4 rounded-lg bg-red-50 p-3 text-sm dark:bg-red-950">
        <strong>为什么需要它？</strong>
        <code class="ml-2"> 0.1 + 0.2 = {{ 0.1 + 0.2 }} </code>（JS 浮点误差）
        <code class="ml-2">
          Big(0.1).plus(0.2) = {{ Big(0.1).plus(0.2).toString() }}
        </code>
        （精确）
      </div>
      <div class="mb-6 grid grid-cols-2 gap-4">
        <label class="block">
          <span class="text-sm text-gray-600">数值 A</span>
          <input
            v-model="a"
            class="mt-1 w-full rounded border px-3 py-2 font-mono"
        /></label>
        <label class="block">
          <span class="text-sm text-gray-600">数值 B</span>
          <input
            v-model="b"
            class="mt-1 w-full rounded border px-3 py-2 font-mono"
        /></label>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b bg-gray-50">
              <th class="p-2">操作</th>
              <th class="p-2">方法</th>
              <th class="p-2">结果</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="p-2">加法</td>
              <td class="p-2 font-mono">a.plus(b)</td>
              <td class="p-2 font-mono">{{ results.plus }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">减法</td>
              <td class="p-2 font-mono">a.minus(b)</td>
              <td class="p-2 font-mono">{{ results.minus }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">乘法</td>
              <td class="p-2 font-mono">a.times(b)</td>
              <td class="p-2 font-mono">{{ results.times }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">除法</td>
              <td class="p-2 font-mono">a.div(b)</td>
              <td class="p-2 font-mono">{{ results.div }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">四舍五入(2位)</td>
              <td class="p-2 font-mono">a.round(2)</td>
              <td class="p-2 font-mono">{{ results.round2 }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">向下取整(2位)</td>
              <td class="p-2 font-mono">a.round(2,0)</td>
              <td class="p-2 font-mono">{{ results.round2Down }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">格式化(4位)</td>
              <td class="p-2 font-mono">a.toFixed(4)</td>
              <td class="p-2 font-mono">{{ results.toFixed }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">等于</td>
              <td class="p-2 font-mono">a.eq(b)</td>
              <td class="p-2">{{ results.eq }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">大于</td>
              <td class="p-2 font-mono">a.gt(b)</td>
              <td class="p-2">{{ results.gt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6">
        <h3 class="mb-2 font-semibold">代码示例</h3>
        <pre
          class="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto"
        ><code>
          import Big from 'big.js';
          const total = Big('19.99').times(Big(1).plus('0.13')).round(2); // "22.59"
          Big(123.456).round(2);       // Big(123.46)
          Big(100).div(3).toFixed(4); // "33.3333"
          Big('0.1').plus('0.2').eq('0.3'); // true
        </code></pre>
      </div>
    </Card>
  </Page>
</template>
