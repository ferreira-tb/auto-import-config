export interface ConfigOptions {
  dts?: string;
  include?: RegExp[];
  injectAtEnd?: boolean;
  imports?: any[];
  manatsu?: boolean;
  vueImports?: string[];
}

function config(options: ConfigOptions = {}) {
  return {
    dts: options.dts ?? './types/auto-imports.d.ts',
    injectAtEnd: options.injectAtEnd ?? true,
    include: [/\.vue$/, ...(options.include ?? [])],
    imports: [
      {
        vue: [
          'computed',
          'customRef',
          'defineComponent',
          'effectScope',
          'h',
          'hasInjectionContext',
          'inject',
          'isRef',
          'markRaw',
          'nextTick',
          'onActivated',
          'onBeforeMount',
          'onBeforeUnmount',
          'onBeforeUpdate',
          'onDeactivated',
          'onMounted',
          'onScopeDispose',
          'onUnmounted',
          'provide',
          'readonly',
          'ref',
          'shallowReactive',
          'shallowRef',
          'reactive',
          'toRaw',
          'toRef',
          'toValue',
          'triggerRef',
          'unref',
          'watch',
          'watchEffect',
          'watchPostEffect',
          'watchSyncEffect',
          ...(options.vueImports ?? [])
        ],

        'vue-router': ['useRoute', 'useRouter'],
        pinia: ['getActivePinia', 'storeToRefs'],

        '@vueuse/core': [
          'computedAsync',
          'computedInject',
          'computedWithControl',
          'tryOnBeforeMount',
          'tryOnBeforeUnmount',
          'tryOnMounted',
          'tryOnScopeDispose',
          'tryOnUnmounted',
          'useAsyncState',
          'useIntersectionObserver',
          'useLocalStorage',
          'useMutationObserver',
          'useResizeObserver',
          'useSessionStorage',
          'useStorage',
          'watchAtMost',
          'watchDeep',
          'watchIgnorable',
          'watchImmediate',
          'watchOnce',
          'watchPausable',
          'watchTriggerable',
          'whenever',

          ...(options.manatsu ? [] : ['useElementSize'])
        ],

        manatsu: options.manatsu ? ['useElementSize'] : [],
        '@manatsu/style': options.manatsu ? ['css', 'tw'] : []
      },
      {
        from: 'vue',
        imports: [
          'CSSProperties',
          'Component',
          'ComponentInstance',
          'MaybeRefOrGetter',
          'Ref',
          'ShallowRef',
          'VNode'
        ],
        type: true
      },
      {
        from: '@tb-dev/utility-types',
        imports: ['MaybeArray', 'MaybePromise', 'Nullish', 'PartialNullish'],
        type: true
      },

      ...(options.imports ?? [])
    ]
  };
}

export default config;
