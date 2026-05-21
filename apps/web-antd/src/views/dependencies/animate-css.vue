<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';

const visible = ref(true);
const selectedIn = ref('fadeInDown');
const selectedOut = ref('fadeOutUp');
const animIn = [
  'fadeIn',
  'fadeInDown',
  'fadeInUp',
  'fadeInLeft',
  'fadeInRight',
  'zoomIn',
  'zoomInDown',
  'zoomInUp',
  'slideInLeft',
  'slideInRight',
  'bounceIn',
  'bounceInDown',
  'backInDown',
];
const animOut = [
  'fadeOut',
  'fadeOutDown',
  'fadeOutUp',
  'fadeOutLeft',
  'fadeOutRight',
  'zoomOut',
  'zoomOutDown',
  'zoomOutUp',
  'slideOutLeft',
  'slideOutRight',
  'bounceOut',
  'bounceOutDown',
  'backOutDown',
];
</script>

<template>
  <Page>
    <Card class="m-6" title="CSS 动画 (animate.css)">
      <p class="text-sm text-gray-500">
        依赖: <code>animate.css</code> — 引用:
        <code>import 'animate.css'</code>（main.ts 全局引入一次）
      </p>
      <div class="mt-4 mb-8">
        <h3 class="mb-3 font-semibold">方式一：CSS 类名</h3>
        <p class="mb-3 text-sm text-gray-500">
          格式: <code>animate__animated animate__[动画名]</code>
        </p>
        <div class="grid grid-cols-4 gap-3">
          <div
            v-for="n in [
              'fadeInDown',
              'zoomIn',
              'bounce',
              'pulse',
              'shakeX',
              'slideInLeft',
              'flipInX',
              'jackInTheBox',
            ]"
            :key="n"
            class="animate__animated animate__infinite rounded bg-blue-50 p-3 text-center text-sm"
            :class="`animate__${n}`"
          >
            {{ n }}
          </div>
        </div>
      </div>
      <div class="mb-8">
        <h3 class="mb-3 font-semibold">方式二：配合 Vue &lt;transition&gt;</h3>
        <div class="mb-3 flex flex-wrap items-center gap-4">
          <label>
            进入:
            <select v-model="selectedIn" class="ml-1 rounded border px-2 py-1">
              <option v-for="a in animIn" :key="a" :value="a">{{ a }}</option>
            </select>
          </label>
          <label>
            退出:
            <select v-model="selectedOut" class="ml-1 rounded border px-2 py-1">
              <option v-for="a in animOut" :key="a" :value="a">{{ a }}</option>
            </select>
          </label>
          <button
            class="rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
            @click="visible = !visible"
          >
            切换
          </button>
        </div>
        <div class="relative h-32 bg-gray-300">
          <transition
            :enter-active-class="`animate__animated animate__${selectedIn}`"
            :leave-active-class="`animate__animated animate__${selectedOut}`"
          >
            <div
              v-if="visible"
              class="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-xl font-bold text-white"
            >
              动画演示区域
            </div>
          </transition>
        </div>
      </div>
      <div>
        <h3 class="mb-2 font-semibold">代码示例</h3>
        <pre
          class="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto"
        ><code>&lt;!-- CSS类名 --&gt;
&lt;div class="animate__animated animate__fadeInDown"&gt;内容&lt;/div&gt;

&lt;!-- Vue transition --&gt;
&lt;transition
  enter-active-class="animate__animated animate__zoomIn"
  leave-active-class="animate__animated animate__zoomOut"&gt;
  &lt;div v-show="visible"&gt;内容&lt;/div&gt;
&lt;/transition&gt;</code></pre>
      </div>
    </Card>
  </Page>
</template>
