import type { Plugin } from 'vite';
import autoImport from 'unplugin-auto-import/vite';

export interface ConfigOptions {
  dts?: string;
  excludeImports?: (string | RegExp)[];
  imports?: any[];
  include?: RegExp[];
  /** @default true */
  injectAtEnd?: boolean;
  /** @default true */
  viteOptimizeDeps?: boolean;

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

export default function plugin(options: ConfigOptions = {}): Plugin {
  const {
    manatsu = false,
    pinia = true,
    router = true,
    tauri = false,
    utils = true,
    vue = true,
    vueuse = true,
    vueuseMath = false,
    vueuseRouter = false
  } = options.presets ?? {};

  const imports: Record<string, string[]> = {};

  if (manatsu) {
    imports.manatsu = [
      'computedAsync',
      'getCurrentApp',
      'handleError',
      'onAltKeyDown',
      'onCtrlKeyDown',
      'onCtrlShiftKeyDown',
      'onKeyDown',
      'onKeyStroke',
      'onShiftKeyDown',
      'useElementSize',
      'useHeight',
      'useWidth',
      'useWindowHeight',
      'useWindowWidth'
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
    imports['@tauri-apps/api/webview'] = ['getCurrentWebview'];
    imports['@tauri-apps/api/window'] = ['getCurrentWindow'];

    imports['@tauri-apps/api/webviewWindow'] = [
      'getAllWebviewWindows',
      'getCurrentWebviewWindow',
      'WebviewWindow'
    ];
  }

  if (utils) {
    imports['@tb-dev/utils'] = ['flushPromises', 'panic', 'todo', 'unimplemented', 'unreachable'];
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
      'computedInject',
      'computedWithControl',
      'createEventHook',
      'createGlobalState',
      'createReusableTemplate',
      'createTemplatePromise',
      'createUnrefFn',
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
      'unrefElement',
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
      'useCloned',
      'useColorMode',
      'useCounter',
      'useCycleList',
      'useCurrentElement',
      'useDark',
      'useDebounceFn',
      'useDraggable',
      'useDropZone',
      'useDocumentVisibility',
      'useElementBounding',
      'useElementByPoint',
      'useElementHover',
      'useElementVisibility',
      'useEventBus',
      'useEventListener',
      'useFetch',
      'useFocus',
      'useFocusWithin',
      'useFullscreen',
      'useImage',
      'useIntersectionObserver',
      'useInterval',
      'useIntervalFn',
      'useLocalStorage',
      'useMediaControls',
      'useMediaQuery',
      'useMemory',
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
      'usePerformanceObserver',
      'usePointerSwipe',
      'usePreferredColorScheme',
      'usePreferredDark',
      'usePreferredLanguages',
      'usePrevious',
      'useResizeObserver',
      'useScreenOrientation',
      'useScriptTag',
      'useScroll',
      'useScrollLock',
      'useSessionStorage',
      'useSorted',
      'useSpeechRecognition',
      'useSpeechSynthesis',
      'useStorage',
      'useStorageAsync',
      'useStyleTag',
      'useSwipe',
      'useTemplateRefsList',
      'useTextareaAutosize',
      'useThrottleFn',
      'useTimeout',
      'useTimeoutFn',
      'useTitle',
      'useToggle',
      'useToNumber',
      'useToString',
      'useUrlSearchParams',
      'useWebSocket',
      'useWindowFocus',
      'useWindowScroll',
      'useWindowSize',
      'watchArray',
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
      imports['@vueuse/core'].push('computedAsync', 'onKeyDown', 'onKeyStroke', 'useElementSize');
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

  if (utils) {
    typeImports.push({
      from: '@tb-dev/utils',
      imports: ['Fn', 'MaybeArray', 'MaybePromise', 'Nullish', 'PartialNull', 'PartialNullish'],
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
        'ComponentPublicInstance',
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

  return autoImport({
    dts: options.dts ?? './types/autogenerated/auto-imports.d.ts',
    viteOptimizeDeps: options.viteOptimizeDeps ?? true,
    injectAtEnd: options.injectAtEnd ?? true,
    include: [/\.[cm]?[jt]s$/, /\.vue$/, ...(options.include ?? [])],
    imports: [
      filterImports(imports, options.excludeImports ?? []),
      ...typeImports,
      ...(options.imports ?? [])
    ]
  });
}

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
