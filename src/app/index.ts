import './styles/index.css';


// This is entry point
(() => {
  enum ModuleType {
    Widgets = 'widgets',
    Features = 'features',
  }

  interface GetModuleOptions {
    moduleType: ModuleType;
    moduleName: string;
  }

  const projectName = import.meta.env.VITE_PROJECT_NAME;
  const baseSourceUrl = import.meta.env.VITE_BASE_SOURCE_URL;
  const isLocalMode = Boolean(window.location.port);

  const getUrl = (segments: string[]) => {
    return new URL(segments.join('/')).toString();
  };

  const getModuleUrl = ({ moduleType, moduleName }: GetModuleOptions) => {
    const isProdMode = !window.location.hostname.endsWith('webflow.io') && !isLocalMode && process.env.NODE_ENV !== 'development';
    const modeFolder = isProdMode ? 'prod' : 'dev';
    const origin = window.location.origin;

    const segmentsLocal = [...new Set([origin, 'src', moduleType, moduleName, 'index.ts'])];
    const segmentsRemote = [baseSourceUrl, projectName, modeFolder, `${moduleName}.js`];
    const sourceUrl = isLocalMode ? segmentsLocal : segmentsRemote;

    return getUrl(sourceUrl);
  };

  /* Widgets */
  const initWidgets = () => {
    const loadWidget = async (widgetName: string) => {
      // Чтобы Vite не добавлял к урлу динамические пути типа `../` нужно привести урл к строке в таком виде
      const moduleUrl = getModuleUrl({ moduleType: ModuleType.Widgets, moduleName: widgetName });

      try {
        await import(/* @vite-ignore */ moduleUrl);
      } catch (error) {
        console.error(`Error load widget "${widgetName}":`, error);
      }
    };

    // Find all elements with attribute `data-widget="widget-name"`
    document.querySelectorAll('[data-widget]').forEach((widgetEl) => {
      const widgetName = widgetEl.getAttribute('data-widget');
      widgetName && loadWidget(widgetName);
    });
  };

  /* Features */
  const initFeatures = async () => {
    const moduleUrl = getModuleUrl({ moduleType: ModuleType.Features, moduleName: ModuleType.Features });

    try {
      await import(/* @vite-ignore */ moduleUrl);
    } catch (error) {
      console.error(`Error features load:`, error);
    }
  };

  initWidgets();
  initFeatures();
})();
