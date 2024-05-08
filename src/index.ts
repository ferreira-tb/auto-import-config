export interface ConfigOptions {
  dts?: string;
  excludeImports?: (string | RegExp)[];
  imports?: any[];
  include?: RegExp[];
  injectAtEnd?: boolean;
  presets?: {
    /** @default false */
    manatsu?: boolean;
    /** @default true */
    pinia?: boolean;
    /** @default true */
    router?: boolean;
    /** @default false */
    tauri?: boolean;
    /** @default true */
    utilityTypes?: boolean;
    /** @default true */
    utils?: boolean;
    /** @default true */
    vue?: boolean;
    /** @default true */
    vueuse?: boolean;
    /** @default false */
    vueuseMath?: boolean;
    /** @default false */
    vueuseRouter?: boolean;
  };
}

interface TypeImport {
  from: string;
  imports: string[];
  type: true;
}

function config(options: ConfigOptions = {}) {
  const {
    manatsu = false,
    pinia = true,
    router = true,
    tauri = false,
    utilityTypes = true,
    utils = true,
    vue = true,
    vueuse = true,
    vueuseMath = false,
    vueuseRouter = false
  } = options.presets ?? {};

  const imports: Record<string, string[]> = {};

  if (manatsu) {
    imports.manatsu = [
      'getCurrentApp',
      'getRouter',
      'handleError',
      'injectStrict',
      'invokeOnKeyDown',
      'invokeOnKeyStroke',
      'isDev',
      'navigateOnKeyDown',
      'navigateOnKeyStroke',
      'onAltKeyDown',
      'onAltKeyStroke',
      'onContextMenu',
      'onCtrlKeyDown',
      'onCtrlKeyStroke',
      'onCtrlShiftKeyDown',
      'onCtrlShiftKeyStroke',
      'onKeyDown',
      'onKeyStroke',
      'onShiftKeyDown',
      'onShiftKeyStroke',
      'preventContextMenu',
      'preventKeyDown',
      'preventKeyStroke',
      'useElementSize',
      'useInvoke',
      'useListen'
    ];
  }

  if (pinia) {
    imports.pinia = ['getActivePinia', 'storeToRefs'];
  }

  if (router) {
    imports['vue-router'] = [
      'isNavigationFailure',
      'onBeforeRouteLeave',
      'onBeforeRouteUpdate',
      'useRoute',
      'useRouter'
    ];
  }

  if (tauri) {
    imports['@tauri-apps/api/core'] = ['convertFileSrc', 'invoke'];
    imports['@tauri-apps/api/event'] = ['listen'];
  }

  if (utils) {
    imports['@tb-dev/utils'] = [
      'isNullish',
      'noop',
      'panic',
      'toArray',
      'todo',
      'toPixel',
      'unimplemented',
      'unreachable'
    ];
  }

  if (vue) {
    imports.vue = [
      'computed',
      'customRef',
      'defineAsyncComponent',
      'defineComponent',
      'defineCustomElement',
      'effectScope',
      'getCurrentScope',
      'h',
      'hasInjectionContext',
      'inject',
      'isProxy',
      'isReactive',
      'isReadonly',
      'isRef',
      'markRaw',
      'nextTick',
      'onActivated',
      'onBeforeMount',
      'onBeforeUnmount',
      'onBeforeUpdate',
      'onDeactivated',
      'onErrorCaptured',
      'onMounted',
      'onScopeDispose',
      'onUnmounted',
      'provide',
      'reactive',
      'readonly',
      'ref',
      'shallowReactive',
      'shallowReadonly',
      'shallowRef',
      'toRaw',
      'toRef',
      'toRefs',
      'toValue',
      'triggerRef',
      'unref',
      'useAttrs',
      'useSlots',
      'watch',
      'watchEffect',
      'watchPostEffect',
      'watchSyncEffect'
    ];
  }

  if (vueuse) {
    imports['@vueuse/core'] = [
      'computedAsync',
      'computedInject',
      'computedWithControl',
      'extendRef',
      'reactify',
      'reactifyObject',
      'reactiveComputed',
      'reactiveOmit',
      'reactivePick',
      'refAutoReset',
      'refDebounced',
      'refDefault',
      'refThrottled',
      'refWithControl',
      'syncRef',
      'onClickOutside',
      'tryOnBeforeMount',
      'tryOnBeforeUnmount',
      'tryOnMounted',
      'tryOnScopeDispose',
      'tryOnUnmounted',
      'until',
      'useActiveElement',
      'useArrayDifference',
      'useArrayEvery',
      'useArrayFilter',
      'useArrayFind',
      'useArrayFindIndex',
      'useArrayFindLast',
      'useArrayIncludes',
      'useArrayJoin',
      'useArrayMap',
      'useArrayReduce',
      'useArraySome',
      'useArrayUnique',
      'useAsyncState',
      'useBreakpoints',
      'useBrowserLocation',
      'useCycleList',
      'useCurrentElement',
      'useDraggable',
      'useDocumentVisibility',
      'useElementBounding',
      'useElementHover',
      'useElementVisibility',
      'useEventListener',
      'useFetch',
      'useFocus',
      'useFocusWithin',
      'useImage',
      'useIntersectionObserver',
      'useInterval',
      'useIntervalFn',
      'useLocalStorage',
      'useMediaQuery',
      'useMounted',
      'useMouse',
      'useMouseInElement',
      'useMousePressed',
      'useMutationObserver',
      'useNavigatorLanguage',
      'useNetwork',
      'useObjectUrl',
      'useOnline',
      'usePageLeave',
      'useParentElement',
      'usePointerSwipe',
      'useResizeObserver',
      'useScroll',
      'useScrollLock',
      'useSessionStorage',
      'useSpeechRecognition',
      'useSpeechSynthesis',
      'useStorage',
      'useStyleTag',
      'useSwipe',
      'useTimeout',
      'useTimeoutFn',
      'useWebSocket',
      'useWindowFocus',
      'useWindowScroll',
      'useWindowSize',
      'watchAtMost',
      'watchDebounced',
      'watchDeep',
      'watchIgnorable',
      'watchImmediate',
      'watchOnce',
      'watchPausable',
      'watchThrottled',
      'watchTriggerable',
      'watchWithFilter',
      'whenever'
    ];

    if (!manatsu) {
      imports['@vueuse/core'].push('onKeyDown', 'onKeyStroke', 'useElementSize');
    }
  }

  if (vueuseRouter) {
    imports['@vueuse/router'] = ['useRouteHash', 'useRouteParams', 'useRouteQuery'];
  }

  if (vueuseMath) {
    imports['@vueuse/math'] = [
      'logicAnd',
      'logicNot',
      'logicOr',
      'useAbs',
      'useAverage',
      'useCeil',
      'useFloor',
      'useMax',
      'useMin',
      'useRound',
      'useTrunc'
    ];
  }

  const typeImports: TypeImport[] = [];

  if (manatsu) {
    typeImports.push({
      from: 'manatsu',
      imports: [
        'ComputedSymbol',
        'MaybeNullishRef',
        'RefSymbol',
        'ShallowRefSymbol',
        'WritableRefSymbol',
        'WritableShallowRefSymbol'
      ],
      type: true
    });
  }

  if (utilityTypes) {
    typeImports.push({
      from: '@tb-dev/utility-types',
      imports: ['MaybeArray', 'MaybePromise', 'Nullish', 'PartialNullish'],
      type: true
    });
  }

  if (vue) {
    typeImports.push({
      from: 'vue',
      imports: [
        'CSSProperties',
        'Component',
        'ComponentInstance',
        'ComputedRef',
        'InjectionKey',
        'MaybeRefOrGetter',
        'Ref',
        'ShallowRef',
        'VNode'
      ],
      type: true
    });
  }

  return {
    dts: options.dts ?? './types/autogenerated/auto-imports.d.ts',
    injectAtEnd: options.injectAtEnd ?? true,
    include: [/\.[cm]?[jt]s$/, /\.vue$/, ...(options.include ?? [])],
    imports: [
      filterImports(imports, options.excludeImports ?? []),
      ...typeImports,
      ...(options.imports ?? [])
    ]
  };
}

export default config;

function filterImports(
  imports: Record<string, string[]>,
  exclude: (string | RegExp)[]
): Record<string, string[]> {
  const predicate = (value: string): boolean => {
    return !exclude.some((pattern) => {
      if (typeof pattern === 'string') return value === pattern;
      return pattern.test(value);
    });
  };

  return Object.fromEntries(
    Object.entries(imports).map(([key, values]) => [key, values.filter(predicate)])
  );
}
