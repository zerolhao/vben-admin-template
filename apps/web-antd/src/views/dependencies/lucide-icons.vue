<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { Card } from 'ant-design-vue';
import { ref, computed } from 'vue';
import {
  Search,
  Plus,
  SquarePen,
  Trash2,
  Home,
  Settings,
  User,
  Bell,
  Mail,
  MapPin,
  Camera,
  Video,
  Music,
  FileText,
  Download,
  Upload,
  Cloud,
  Sun,
  Moon,
  Star,
  Heart,
  ThumbsUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-vue-next';

const icons = [
  { name: 'Search', component: Search },
  { name: 'Plus', component: Plus },
  { name: 'SquarePen', component: SquarePen },
  { name: 'Trash2', component: Trash2 },
  { name: 'Home', component: Home },
  { name: 'Settings', component: Settings },
  { name: 'User', component: User },
  { name: 'Bell', component: Bell },
  { name: 'Mail', component: Mail },
  { name: 'MapPin', component: MapPin },
  { name: 'Camera', component: Camera },
  { name: 'Video', component: Video },
  { name: 'Music', component: Music },
  { name: 'FileText', component: FileText },
  { name: 'Download', component: Download },
  { name: 'Upload', component: Upload },
  { name: 'Cloud', component: Cloud },
  { name: 'Sun', component: Sun },
  { name: 'Moon', component: Moon },
  { name: 'Star', component: Star },
  { name: 'Heart', component: Heart },
  { name: 'ThumbsUp', component: ThumbsUp },
  { name: 'AlertTriangle', component: AlertTriangle },
  { name: 'CheckCircle', component: CheckCircle },
  { name: 'XCircle', component: XCircle },
];
const search = ref('');
const filtered = computed(() =>
  icons.filter((i) =>
    i.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
);
const selectedName = ref('');
const selected = computed(() =>
  icons.find((i) => i.name === selectedName.value),
);
</script>

<template>
  <Page>
    <Card class="m-6" title="Lucide 图标">
      <p class="text-sm text-gray-500">
        依赖: <code>lucide-vue-next</code> — 引用:
        <code>import { Search, Plus } from 'lucide-vue-next'</code>
      </p>
      <div class="mt-4 mb-4 flex items-center gap-3">
        <input
          v-model="search"
          placeholder="搜索图标名称..."
          class="w-64 rounded border px-3 py-2"
        />
        <span class="text-sm text-gray-500"
          >共 {{ icons.length }} 个（示例）</span
        >
      </div>
      <div
        v-if="selected"
        class="mb-4 rounded-lg border bg-blue-50 p-4 dark:bg-blue-950"
      >
        <div class="flex items-center gap-3">
          <component
            :is="selected.component"
            class="text-blue-600"
            :size="32"
          />
          <div>
            <code class="text-lg font-bold">{{ selected.name }}</code>
            <p class="text-sm text-gray-500">
              import { {{ selected.name }} } from 'lucide-vue-next';
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-5 gap-3 md:grid-cols-8 lg:grid-cols-10">
        <div
          v-for="icon in filtered"
          :key="icon.name"
          class="flex cursor-pointer flex-col items-center rounded-lg border p-3 transition-all hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
          :class="{
            'border-blue-500 bg-blue-50 dark:bg-blue-950':
              selectedName === icon.name,
          }"
          @click="selectedName = icon.name"
        >
          <component :is="icon.component" :size="24" />
          <span class="mt-1 truncate text-xs text-gray-500">{{
            icon.name
          }}</span>
        </div>
      </div>
      <div class="mt-6">
        <h3 class="mb-2 font-semibold">使用方式</h3>
        <pre
          class="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto"
        ><code>// 按需引入
import { Search, Plus, Trash2 } from 'lucide-vue-next';
// 模板中直接使用
&lt;Search :size="20" /&gt;
&lt;Trash2 :size="16" color="red" /&gt;</code></pre>
      </div>
    </Card>
  </Page>
</template>
