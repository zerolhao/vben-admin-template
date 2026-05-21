<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { Card } from 'ant-design-vue';
import { ref } from 'vue';
import { debounce, cloneDeep, throttle, get, set, isEqual } from 'lodash';

const searchInput = ref('');
const searchResult = ref('');
const handleSearch = debounce((kw: string) => {
  searchResult.value = kw ? `搜索结果: "${  kw  }" (模拟)` : '';
}, 500);

const original = { user: { name: '张三', roles: ['admin'] } };
const copy = ref(cloneDeep(original) as any);
const modifyCopy = () => {
  copy.value.user.name = '李四（已修改）';
  copy.value.user.roles.push('editor');
};

const scrollCount = ref(0);
const handleScroll = throttle(() => {
  scrollCount.value++;
}, 200);

const deepObj = ref({ a: { b: { c: 42 } } });
const safeVal = ref(get(deepObj.value, 'a.b.c', '无'));
const setVal = () => {
  set(deepObj.value, 'a.b.newKey', 100);
  deepObj.value = { ...deepObj.value };
};

const obj1 = ref({ name: 'A', value: 1 });
const obj2 = ref({ name: 'A', value: 1 });
</script>

<template>
  <Page>
    <Card class="m-6" title="Lodash 工具库">
      <p class="text-sm text-gray-500">
        依赖: <code>lodash</code> + <code>@types/lodash</code> — 引用:
        <code>import { debounce, cloneDeep } from 'lodash'</code>
      </p>
      <div class="mt-4">
        <div class="mb-6 rounded-lg border p-4">
          <h3 class="font-semibold">1. debounce 防抖</h3>
          <input
            v-model="searchInput"
            @input="handleSearch(searchInput)"
            placeholder="输入搜索关键词..."
            class="mt-2 w-80 rounded border px-3 py-2"
          />
          <p class="mt-1 text-sm text-gray-500">
            {{ searchResult || '输入后 500ms 触发搜索' }}
          </p>
        </div>
        <div class="mb-6 rounded-lg border p-4">
          <h3 class="font-semibold">2. cloneDeep 深拷贝</h3>
          <div class="mt-2 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500">原始:</span>
              <pre class="mt-1 rounded bg-gray-100 p-2">{{
                JSON.stringify(original, null, 2)
              }}</pre>
            </div>
            <div>
              <span class="text-gray-500">拷贝:</span>
              <pre class="mt-1 rounded bg-gray-100 p-2">{{
                JSON.stringify(copy, null, 2)
              }}</pre>
            </div>
          </div>
          <button
            class="mt-3 rounded bg-blue-500 px-3 py-1 text-white"
            @click="modifyCopy"
          >
            修改拷贝（原始不受影响）
          </button>
        </div>
        <div class="mb-6 rounded-lg border p-4">
          <h3 class="font-semibold">3. throttle 节流</h3>
          <div
            class="mt-2 h-32 overflow-auto rounded border bg-gray-50 p-2"
            @scroll="handleScroll"
          >
            <p v-for="i in 20" :key="i" class="py-1">
              {{ '滚动测试行 '.repeat(5) }} {{ i }}
            </p>
          </div>
          <p class="mt-1 text-sm">
            节流触发次数: <strong>{{ scrollCount }}</strong>
          </p>
        </div>
        <div class="mb-6 rounded-lg border p-4">
          <h3 class="font-semibold">4. get / set 安全取值</h3>
          <p class="text-sm">对象: {{ JSON.stringify(deepObj) }}</p>
          <p class="text-sm">
            get('a.b.c') = <strong>{{ safeVal }}</strong>
          </p>
          <button
            class="mt-2 rounded bg-blue-500 px-3 py-1 text-white"
            @click="setVal"
          >
            set('a.b.newKey', 100)
          </button>
          <p
            v-if="deepObj.a.b.newKey !== undefined"
            class="mt-1 text-sm text-green-600"
          >
            ✓ 已设置 a.b.newKey = {{ deepObj.a.b.newKey }}
          </p>
        </div>
        <div class="rounded-lg border p-4">
          <h3 class="font-semibold">5. isEqual 深度比较</h3>
          <p class="text-sm">
            obj1 = {{ JSON.stringify(obj1) }}, obj2 = {{ JSON.stringify(obj2) }}
          </p>
          <p class="text-sm text-green-600 font-semibold">
            isEqual(obj1, obj2) = {{ isEqual(obj1, obj2) }}
          </p>
        </div>
      </div>
    </Card>
  </Page>
</template>
