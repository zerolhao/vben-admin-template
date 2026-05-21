<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { Card } from 'ant-design-vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const player = ref<any>(null);
const errorMsg = ref('');

onMounted(async () => {
  try {
    const { default: EZUIKit } = await import('ezuikit-js');
    player.value = new EZUIKit.EZUIKitPlayer({
      id: 'video-container',
      accessToken: 'at.xxxx',
      url: 'ezopen://open.ys7.com/序列号/1.live',
      template: 'simple',
      decoderType: 'v1',
      muted: false,
      width: 800,
      height: 450,
      handleSuccess: () => console.log('播放成功'),
      handleError: (err: any) => console.error('播放失败', err),
    });
  } catch (e: any) {
    errorMsg.value = e.message;
  }
});
onBeforeUnmount(() => {
  player.value?.destroy();
});
</script>

<template>
  <Page>
    <Card class="m-6" title="萤石云视频 (ezuikit-js)">
      <p class="text-sm text-gray-500">
        依赖: <code>ezuikit-js</code> — 引用:
        <code>import EZUIKit from 'ezuikit-js'</code>
      </p>
      <div
        class="mt-4 mb-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300"
      >
        ⚠️ 需要真实的萤石云设备序列号和 accessToken。Token 通过后端 API：<code
          >POST https://open.ys7.com/api/lapp/token/get</code
        >
      </div>
      <div
        v-if="errorMsg"
        class="mb-4 rounded bg-red-50 p-3 text-red-600 dark:bg-red-950 dark:text-red-400"
      >
        {{ errorMsg }}
      </div>
      <div
        id="video-container"
        class="mx-auto w-full max-w-[800px] rounded-lg border bg-black"
      />
      <div class="mt-6">
        <h3 class="mb-2 font-semibold">初始化流程</h3>
        <pre
          class="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto"
        ><code>// 1. 后端获取 token
POST https://open.ys7.com/api/lapp/token/get

// 2. 初始化播放器
import EZUIKit from 'ezuikit-js';
const player = new EZUIKit.EZUIKitPlayer({
  id: 'video-container', accessToken: 'at.xxxx',
  url: 'ezopen://open.ys7.com/设备序列号/1.live',
  template: 'simple', decoderType: 'v1',
});

// 3. 销毁
player.destroy();</code></pre>
      </div>
    </Card>
  </Page>
</template>
