import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:package-open',
      order: 2000,
      title: '依赖示例',
    },
    name: 'DependenciesDemo',
    path: '/dependencies',
    children: [
      {
        name: 'DependenciesIndex',
        path: '/dependencies/index',
        component: () => import('#/views/dependencies/index.vue'),
        meta: {
          icon: 'lucide:list',
          title: '依赖总览',
        },
      },
      {
        name: 'GaodeMap',
        path: '/dependencies/gaode-map',
        component: () => import('#/views/dependencies/gaode-map.vue'),
        meta: {
          icon: 'lucide:map-pin',
          title: '高德地图',
        },
      },
      {
        name: 'AnimateCss',
        path: '/dependencies/animate-css',
        component: () => import('#/views/dependencies/animate-css.vue'),
        meta: {
          icon: 'lucide:sparkles',
          title: 'CSS 动画',
        },
      },
      {
        name: 'BigJs',
        path: '/dependencies/bigjs',
        component: () => import('#/views/dependencies/bigjs.vue'),
        meta: {
          icon: 'lucide:calculator',
          title: '大数计算',
        },
      },
      {
        name: 'Ezuikit',
        path: '/dependencies/ezuikit',
        component: () => import('#/views/dependencies/ezuikit.vue'),
        meta: {
          icon: 'lucide:video',
          title: '萤石云视频',
        },
      },
      {
        name: 'CountTo',
        path: '/dependencies/count-to',
        component: () => import('#/views/dependencies/count-to.vue'),
        meta: {
          icon: 'lucide:arrow-up-0-1',
          title: '数字滚动',
        },
      },
      {
        name: 'VxeExport',
        path: '/dependencies/vxe-export',
        component: () => import('#/views/dependencies/vxe-export.vue'),
        meta: {
          icon: 'lucide:file-spreadsheet',
          title: 'VXE 导出',
        },
      },
      {
        name: 'LodashDemo',
        path: '/dependencies/lodash',
        component: () => import('#/views/dependencies/lodash.vue'),
        meta: {
          icon: 'lucide:wrench',
          title: 'Lodash 工具',
        },
      },
      {
        name: 'EchartsDemo',
        path: '/dependencies/echarts',
        component: () => import('#/views/dependencies/echarts.vue'),
        meta: {
          icon: 'lucide:bar-chart-3',
          title: 'Echarts 图表',
        },
      },
      {
        name: 'LucideIcons',
        path: '/dependencies/lucide-icons',
        component: () => import('#/views/dependencies/lucide-icons.vue'),
        meta: {
          icon: 'lucide:smile',
          title: 'Lucide 图标',
        },
      },
      {
        name: 'VxeTable',
        path: '/dependencies/vxe-table',
        component: () => import('#/views/dependencies/vxe-table.vue'),
        meta: {
          icon: 'lucide:table',
          title: 'VXE 表格',
        },
      },
    ],
  },
];

export default routes;
