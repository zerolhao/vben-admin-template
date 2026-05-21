import {
  defineOverridesPreferences,
  definePreferencesExtension,
} from '@vben/preferences';

interface WebAntdPreferencesExtension {
  defaultTableSize: number;
  enableFormFullscreen: boolean;
  reportTitle: string;
  tenantMode: 'multi' | 'single';
}


const isDev = import.meta.env.DEV;

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
    // defaultHomePath: '/dataview',
    // enableRefreshToken: false, // 启用刷新token
    // enablePreferences: isDev, // 是否显示偏好设置
  },
  // logo: {
  //   enable: true,
  //   fit: 'cover',
  //   source: LogoImg,
  // },
  theme: {
    builtinType: 'violet',
    colorPrimary: 'hsl(245 82% 67%)',
    mode: 'light',
  },
  widget: {
    timezone: false,
    /** 是否启用语言切换部件 */
    languageToggle: false,
    /** 是否显示通知部件 */
    notification: isDev,
    /** 是否启用全局搜索部件 */
    globalSearch: isDev,
    /** 是否显示侧边栏显示/隐藏部件 */
    sidebarToggle: isDev,
    /** 是否显示主题切换部件 */
    themeToggle: false,
  },
  shortcutKeys: {
    /** 是否启用快捷键-全局 */
    enable: isDev,
    /** 是否启用全局搜索快捷键 */
    globalSearch: isDev,
  },
  sidebar: {
    /** 侧边栏折叠按钮是否可见 */
    collapsedButton: isDev,
    /** 侧边栏固定按钮是否可见 */
    fixedButton: false,
    /** 侧边栏宽度 */
    width: 232,
  },
  tabbar: {
    /** 是否开启多标签页 */
    enable: isDev,
  },
});

export const preferencesExtension =
  definePreferencesExtension<WebAntdPreferencesExtension>({
    tabLabel: 'preferences.antd.tabLabel',
    title: 'preferences.antd.title',
    fields: [
      {
        component: 'switch',
        defaultValue: true,
        key: 'enableFormFullscreen',
        label: 'preferences.antd.fields.enableFormFullscreen.label',
        tip: 'preferences.antd.fields.enableFormFullscreen.tip',
      },
      {
        component: 'select',
        defaultValue: 'single',
        key: 'tenantMode',
        label: 'preferences.antd.fields.tenantMode.label',
        options: [
          {
            label: 'preferences.antd.fields.tenantMode.options.single.label',
            value: 'single',
          },
          {
            label: 'preferences.antd.fields.tenantMode.options.multi.label',
            value: 'multi',
          },
        ],
      },
      {
        component: 'number',
        componentProps: {
          max: 200,
          min: 10,
          step: 10,
        },
        defaultValue: 20,
        key: 'defaultTableSize',
        label: 'preferences.antd.fields.defaultTableSize.label',
      },
      {
        component: 'input',
        defaultValue: '',
        key: 'reportTitle',
        label: 'preferences.antd.fields.reportTitle.label',
        placeholder: 'preferences.antd.fields.reportTitle.placeholder',
      },
    ],
  });
