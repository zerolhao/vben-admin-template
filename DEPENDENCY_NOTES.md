# vben-admin-template 依赖记录

> 基于 vue-vben-admin v5.7.0，对比 groupAdmin 项目新增的依赖、配置参数、调用方式及简单示例。

---

## 1. 高德地图

| 依赖                      | 版本    | 层级               |
| ------------------------- | ------- | ------------------ |
| `@amap/amap-jsapi-loader` | ^1.0.1  | catalog + web-antd |
| `@amap/amap-jsapi-types`  | ^0.0.15 | catalog + web-antd |

### 引用方式

```ts
import AMapLoader from '@amap/amap-jsapi-loader';
```

### 关键配置参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | 高德 Web 端开发者 Key，在[高德开放平台](https://lbs.amap.com/)申请 |
| `version` | `string` | JSAPI 版本，推荐 `'2.0'` |
| `plugins` | `string[]` | 按需加载的插件列表 |

### 常用插件

```
AMap.ToolBar        - 地图工具条
AMap.Geolocation     - 浏览器地理定位
AMap.PlaceSearch     - 地点搜索（POI 检索）
AMap.AutoComplete    - 输入提示自动补全
AMap.MouseTool       - 鼠标工具（画点/线/面）
AMap.DistrictSearch  - 行政区划搜索（获取区域边界）
AMap.MarkerCluster   - 点聚合（大量标记聚合显示）
```

### 简单示例

```ts
import AMapLoader from '@amap/amap-jsapi-loader';

// 1. 加载 SDK
AMapLoader.load({
  key: '你的高德Key',
  version: '2.0',
  plugins: ['AMap.ToolBar', 'AMap.Geolocation', 'AMap.PlaceSearch'],
}).then((AMap) => {
  // 2. 创建地图实例
  const map = new AMap.Map('container', {
    zoom: 16,
    center: [121.5, 31.2], // [经度, 纬度]
  });

  // 3. 添加工具条
  map.addControl(new AMap.ToolBar({ liteStyle: true }));

  // 4. 地点搜索
  const placeSearch = new AMap.PlaceSearch({ city: '021' });
  placeSearch.search('人民广场');
});
```

```html
<div id="container" style="width:100%;height:400px;"></div>
```

### 使用场景

- `src/components/SelectAddress/select-address.vue` - 地址选择（地图选点、地点搜索）
- `src/views/dataview/map/map.ts` - 数据大屏地图核心（`DistrictSearch` 区域边界、`MarkerCluster` 点聚合）

---

## 2. CSS 动画 (animate.css)

| 依赖          | 版本   | 层级               |
| ------------- | ------ | ------------------ |
| `animate.css` | ^4.1.1 | catalog + web-antd |

### 引用方式

```ts
// main.ts 中全局引入一次
import 'animate.css';
```

### 使用方式

**方式一：直接使用 CSS 类名**

```html
<div class="animate__animated animate__fadeInDown">淡入向下</div>
<div class="animate__animated animate__zoomIn">缩放进入</div>
```

**方式二：配合 Vue transition**

```html
<transition
  enter-active-class="animate__animated animate__zoomIn"
  leave-active-class="animate__animated animate__zoomOut"
>
  <div v-show="visible">内容</div>
</transition>
```

### 常用动画名

| 进入 | 退出 | 强调 |
| --- | --- | --- |
| `fadeIn` / `fadeInDown` / `fadeInUp` | `fadeOut` / `fadeOutDown` / `fadeOutUp` | `bounce` |
| `zoomIn` / `zoomInDown` / `zoomInUp` | `zoomOut` / `zoomOutDown` / `zoomOutUp` | `pulse` |
| `slideInLeft` / `slideInRight` | `slideOutLeft` / `slideOutRight` | `shakeX` |

> 完整列表见 [animate.style](https://animate.style/)

---

## 3. 大数计算 (big.js)

| 依赖            | 版本   | 层级               |
| --------------- | ------ | ------------------ |
| `big.js`        | ^7.0.1 | catalog + web-antd |
| `@types/big.js` | ^6.2.2 | catalog + web-antd |

### 引用方式

```ts
import Big from 'big.js';
```

### 简单示例

```ts
// 普通 JS 浮点数问题
0.1 + 0.2; // -> 0.30000000000000004

// big.js 精确计算
Big(0.1).plus(0.2); // -> Big(0.3)
```

### 常用方法

```ts
const a = Big(123.456);
const b = Big('0.001');

// 四则运算
a.plus(b); // +
a.minus(b); // -
a.times(b); // x
a.div(b); // /
a.mod(b); // %

// 取整
a.round(2); // 四舍五入保留2位 -> Big(123.46)
a.round(2, 0); // 向下取整保留2位 -> Big(123.45)

// 比较
a.eq(b); // 等于
a.gt(b); // 大于

// 转换
a.toNumber(); // -> 123.456
a.toString(); // -> "123.456"
a.toFixed(2); // -> "123.46"
```

### 适用场景

- 金额计算（避免浮点误差）
- 精确百分比、统计数据
- 坐标换算

---

## 4. 萤石云视频 (ezuikit-js)

| 依赖         | 版本   | 层级               |
| ------------ | ------ | ------------------ |
| `ezuikit-js` | ^8.2.6 | catalog + web-antd |

### 引用方式

```ts
import EZUIKit from 'ezuikit-js';
```

### 关键配置参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `string` | 是 | 视频容器 DOM 元素 ID |
| `accessToken` | `string` | 是 | 萤石云 accessToken，通过 API 获取 |
| `url` | `string` | 是 | 播放地址：`ezopen://open.ys7.com/{设备序列号}/{通道号}.live` |
| `template` | `string` | 否 | 播放模板：`'simple'` 简洁模式 或自定义模板 ID |
| `decoderType` | `string` | 否 | 解码模式：`'v1'` 兼容优先，`'v3'` 性能优先 |
| `muted` | `boolean` | 否 | 是否静音 |
| `handleSuccess` | `function` | 否 | 播放成功回调 |
| `handleError` | `function` | 否 | 播放失败回调 |

### 简单示例

```vue
<template>
  <div id="video-container" style="width:100%;height:100%;"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import EZUIKit from 'ezuikit-js';

const player = ref<any>(null);

const initVideo = async () => {
  // 1. 获取 token（调用后端接口）
  const res = await fetch('/api/ys7/token');
  const { accessToken } = await res.json();

  // 2. 初始化播放器
  player.value = new EZUIKit.EZUIKitPlayer({
    id: 'video-container',
    accessToken,
    url: 'ezopen://open.ys7.com/J45980713/1.live',
    template: 'simple',
    decoderType: 'v1',
    muted: false,
    handleSuccess: () => console.log('播放成功'),
    handleError: (err: any) => console.error('播放失败', err),
  });
};

const stop = () => {
  player.value?.destroy();
  player.value = null;
};

onMounted(initVideo);
</script>
```

### 使用场景

- `src/components/YSYPlayer/index.vue` - 萤石云实时视频播放
- `src/components/YSYRePlayer/index.vue` - 萤石云录像回放

---

## 5. 数字滚动 (vue3-count-to / VbenCountToAnimator)

| 依赖            | 版本   | 层级               |
| --------------- | ------ | ------------------ |
| `vue3-count-to` | ^1.1.2 | catalog + web-antd |

> 本项目不直接使用 `vue3-count-to`，而是通过 `@vben/common-ui` 的 **`VbenCountToAnimator`** 组件。

### 引用方式

```ts
import { VbenCountToAnimator } from '@vben/common-ui';
```

### 关键配置参数

| 参数        | 类型      | 默认值 | 说明             |
| ----------- | --------- | ------ | ---------------- |
| `startVal`  | `number`  | `0`    | 起始值           |
| `endVal`    | `number`  | 必填   | 结束值           |
| `duration`  | `number`  | `1500` | 动画时长（毫秒） |
| `decimals`  | `number`  | `0`    | 保留小数位       |
| `separator` | `string`  | `','`  | 千分位分隔符     |
| `prefix`    | `string`  | `''`   | 前缀             |
| `suffix`    | `string`  | `''`   | 后缀             |
| `autoplay`  | `boolean` | `true` | 自动播放         |

### 简单示例

```vue
<template>
  <!-- 整数 -->
  <VbenCountToAnimator
    :start-val="0"
    :end-val="12345"
    :duration="2000"
    separator=","
  />
  <!-- 小数 -->
  <VbenCountToAnimator
    :start-val="0"
    :end-val="98.56"
    :decimals="1"
    :duration="1500"
  />
</template>

<script lang="ts" setup>
import { VbenCountToAnimator } from '@vben/common-ui';
</script>
```

### 使用场景

- `src/views/dataview/map/top/index.vue` - 数据大屏顶部统计
- `src/views/dataview/map/bottom/index.vue` - 数据大屏底部统计

---

## 6. VXE 表格导出 Excel

| 依赖                         | 版本   | 层级               |
| ---------------------------- | ------ | ------------------ |
| `@vxe-ui/plugin-export-xlsx` | ^4.3.2 | catalog + web-antd |
| `exceljs`                    | ^4.4.0 | catalog + web-antd |

### 引用方式

```ts
import VxeUIPluginExportXLSX from '@vxe-ui/plugin-export-xlsx';
import ExcelJS from 'exceljs';
```

### 注册到 VXE

```ts
import { VxeUI } from 'vxe-pc-ui';

VxeUI.use(VxeUIPluginExportXLSX, { ExcelJS });
```

### 简单示例

```vue
<template>
  <VxeGrid
    ref="gridRef"
    :columns="columns"
    :data="tableData"
    :toolbar-config="{ export: true }"
  />
</template>

<script lang="ts" setup>
import { VxeGrid, VxeUI } from 'vxe-table';
import VxeUIPluginExportXLSX from '@vxe-ui/plugin-export-xlsx';
import ExcelJS from 'exceljs';

VxeUI.use(VxeUIPluginExportXLSX, { ExcelJS });

const columns = [
  { field: 'name', title: '名称' },
  { field: 'status', title: '状态' },
];
const tableData = [{ name: '设备A', status: '在线' }];
</script>
```

### 使用场景

- `packages/effects/plugins/src/vxe-table/init.ts` - VXE 初始化时注册导出插件

---

## 7. Lodash 工具库

| 依赖            | 版本     | 层级               |
| --------------- | -------- | ------------------ |
| `lodash`        | ^4.17.23 | catalog + web-antd |
| `@types/lodash` | ^4.17.24 | catalog + web-antd |

> 框架自带 `lodash.clonedeep`，但不包含完整 `lodash`。

### 引用方式

```ts
// 按需引入（Tree Shaking 友好）
import { debounce, cloneDeep } from 'lodash';
```

### 常用方法示例

```ts
import { debounce, cloneDeep, throttle, get, set, isEqual } from 'lodash';

// 防抖 - 搜索输入
const search = debounce((kw: string) => {
  /* ... */
}, 300);

// 深拷贝
const copy = cloneDeep(originalObject);

// 节流 - 滚动事件
const onScroll = throttle(() => {
  /* ... */
}, 200);

// 安全取值
get(obj, 'a.b.c', '默认值');

// 安全设值
set(obj, 'a.b.c', 'newValue');

// 深度比较
isEqual(obj1, obj2);
```

### 使用场景

- `src/components/YSYPlayer/index.vue` - `debounce` 防抖
- `src/views/dataview/map/map.ts` - `cloneDeep` 深拷贝

---

## 修改文件清单

| 文件                         | 修改内容                       |
| ---------------------------- | ------------------------------ |
| `pnpm-workspace.yaml`        | catalog 中新增 11 个包名及版本 |
| `apps/web-antd/package.json` | dependencies 中新增 15 个引用  |

---

## 已添加（框架 catalog 已有，补充到 web-antd 直接引用）

| 依赖 | 引用方式 | 说明 |
| --- | --- | --- |
| `echarts` | `import * as echarts from 'echarts'` | 图表库，用于数据大屏 |
| `lucide-vue-next` | `import { Plus, Search } from 'lucide-vue-next'` | 图标组件，模板中 `<Plus />` 直接使用 |
| `vxe-pc-ui` | VXE 表格 UI 组件库 | 与 vxe-table 配套使用 |
| `vxe-table` | VXE 表格核心 | 高性能表格组件 |

> 这些在框架 catalog 中已存在，只需在 `apps/web-antd/package.json` 的 `dependencies` 中添加了 `"xxx": "catalog:"`。
