<script lang="ts" setup>
import { Page, VbenCountToAnimator } from '@vben/common-ui';
import { Card } from 'ant-design-vue';
import { ref } from 'vue';

const count = ref(25467);
const percent = ref(98.56);
</script>

<template>
  <Page>
    <Card class="m-6" title="数字滚动 (VbenCountToAnimator)">
      <p class="text-sm text-gray-500">
        依赖: <code>vue3-count-to</code>（底层） — 引用:
        <code>import { VbenCountToAnimator } from '@vben/common-ui'</code>
      </p>
      <div class="mt-4 mb-8">
        <h3 class="mb-3 font-semibold">整数滚动（千分位分隔）</h3>
        <div
          class="mb-2 flex items-center gap-2 text-3xl font-bold text-blue-600"
        >
          <VbenCountToAnimator
            :start-val="0"
            :end-val="count"
            :duration="2000"
            separator=","
          /><span class="text-base text-gray-400">个</span>
        </div>
        <input
          v-model.number="count"
          type="number"
          class="mt-2 rounded border px-3 py-1"
        />
        <button
          class="ml-2 rounded bg-blue-500 px-3 py-1 text-white"
          @click="count = Math.floor(Math.random() * 99999)"
        >
          随机
        </button>
      </div>
      <div class="mb-8">
        <h3 class="mb-3 font-semibold">小数滚动（百分比）</h3>
        <div
          class="mb-2 flex items-center gap-2 text-3xl font-bold text-green-600"
        >
          <VbenCountToAnimator
            :start-val="0"
            :end-val="percent"
            :decimals="1"
            :duration="1500"
          /><span class="text-base text-gray-400">%</span>
        </div>
        <input
          v-model.number="percent"
          type="number"
          step="0.01"
          class="mt-2 rounded border px-3 py-1"
        />
      </div>
      <div class="mb-8">
        <h3 class="mb-3 font-semibold">带前缀/后缀</h3>
        <div class="text-2xl font-bold text-orange-600">
          <VbenCountToAnimator
            :start-val="0"
            :end-val="15280"
            :duration="2500"
            prefix="¥"
            suffix=" 元"
            separator=","
          />
        </div>
      </div>
      <div>
        <h3 class="mb-2 font-semibold">参数说明</h3>
        <pre
          class="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto"
        ><code>&lt;VbenCountToAnimator
  :start-val="0"        // 起始值
  :end-val="12345"      // 结束值
  :duration="2000"      // 动画时长(ms)，默认1500
  :decimals="0"         // 小数位数
  separator=","         // 千分位分隔符
  prefix="¥"           // 前缀
  suffix="元"          // 后缀
/&gt;</code></pre>
      </div>
    </Card>
  </Page>
</template>
