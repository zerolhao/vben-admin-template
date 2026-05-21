<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { Card } from 'ant-design-vue';
import { ref, onMounted } from 'vue';

const errorMsg = ref('');

onMounted(async () => {
  try {
    const { default: AMapLoader } = await import('@amap/amap-jsapi-loader');
    const AMap = await AMapLoader.load({
      key: '4c1453323875e01904ee60798e81477a',
      version: '2.0',
      plugins: ['AMap.ToolBar', 'AMap.Geolocation', 'AMap.PlaceSearch'],
    });
    const map = new AMap.Map('map-container', {
      zoom: 14,
      center: [116.397428, 39.90923],
    });
    map.addControl(new AMap.ToolBar({ liteStyle: true }));
  } catch (e: any) {
    errorMsg.value = e.message;
  }
});
</script>

<template>
  <Page>
    <Card class="m-6" title="高德地图">
      <p class="text-sm text-gray-500">
        依赖: <code>@amap/amap-jsapi-loader</code> — 引用:
        <code>import AMapLoader from '@amap/amap-jsapi-loader'</code>
      </p>
      <div
        class="mt-4 mb-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300"
      >
        ⚠️ 需要在高德开放平台申请 Key（Key 已配置：<code
          class="rounded bg-amber-100 px-1 dark:bg-amber-900"
          >4c1453323875e01904ee60798e81477a</code
        >）
      </div>
      <div
        v-if="errorMsg"
        class="mb-4 rounded bg-red-50 p-3 text-red-600 dark:bg-red-950 dark:text-red-400"
      >
        {{ errorMsg }}
      </div>
      <div id="map-container" class="h-[500px] w-full rounded-lg border" />
      <div class="mt-6">
        <h3 class="mb-2 font-semibold">核心 API</h3>
        <pre
          class="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto"
        ><code>// 创建地图
const map = new AMap.Map('container', { zoom: 16, center: [lng, lat] });
// 工具条
map.addControl(new AMap.ToolBar({ liteStyle: true }));
// 地点搜索
new AMap.PlaceSearch({ city: '021' }).search('人民广场');
// 地理定位
new AMap.Geolocation().getCurrentPosition((s, r) => console.log(r.position));
// 行政区划
new AMap.DistrictSearch().search('朝阳区', (s, r) => console.log(r.districtList[0].boundaries));
// 点聚合
new AMap.MarkerCluster(map, markers, { gridSize: 80 });
</code></pre>
      </div>
    </Card>
  </Page>
</template>
