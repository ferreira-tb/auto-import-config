export interface ConfigOptions {
  dts?: string;
  include?: RegExp[];
  injectAtEnd?: boolean;
  imports?: any[];
  excludeImports?: (string | RegExp)[];
  presets?: {
    /** @default false */
    manatsu?: boolean;
    /** @default false */
    manatsuStyle?: boolean;
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
    manatsuStyle = false,
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
      'invokeOnKeyPressed',
      'invokeOnKeyStroke',
      'invokeOnKeyUp',
      'navigateOnKeyDown',
      'navigateOnKeyPressed',
      'navigateOnKeyStroke',
      'navigateOnKeyUp',
      'onKeyDown',
      'onKeyPressed',
      'onKeyStroke',
      'onKeyUp',
      'symbols',
      'useDialog',
      'useElementSize',
      'useInvoke'
    ];
  }

  if (manatsuStyle) {
    imports['@manatsu/style'] = ['css', 'tw'];
  }

  if (pinia) {
    imports.pinia = ['getActivePinia', 'storeToRefs'];
  }

  if (router) {
    imports['vue-router'] = [
      'isNavigationFailure',
      'NavigationFailureType',
      'onBeforeRouteLeave',
      'onBeforeRouteUpdate',
      'useRoute',
      'useRouter'
    ];
  }

  if (tauri) {
    imports['@tauri-apps/api/core'] = ['convertFileSrc', 'invoke'];
  }

  if (utils) {
    imports['@tb-dev/utils'] = ['isNullish'];
  }

  if (vue) {
    imports.vue = [
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
      'watchSyncEffect'
    ];
  }

  if (vueuse) {
    imports['@vueuse/core'] = [
      'computedAsync',
      'computedInject',
      'computedWithControl',
      'extendRef',
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
      'useCycleList',
      'useCurrentElement',
      'useDraggable',
      'useElementBounding',
      'useElementHover',
      'useElementVisibility',
      'useEventListener',
      'useFetch',
      'useFocus',
      'useFocusWithin',
      'useIntersectionObserver',
      'useLocalStorage',
      'useMounted',
      'useMouse',
      'useMouseInElement',
      'useMutationObserver',
      'useObjectUrl',
      'useOnline',
      'usePageLeave',
      'useParentElement',
      'useResizeObserver',
      'useSessionStorage',
      'useStorage',
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
      imports['@vueuse/core'].push(
        'onKeyDown',
        'onKeyPressed',
        'onKeyStroke',
        'onKeyUp',
        'useElementSize'
      );
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
        'MaybeRefOrGetter',
        'Ref',
        'ShallowRef',
        'VNode'
      ],
      type: true
    });
  }

  return {
    dts: options.dts ?? './types/auto-imports.d.ts',
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
