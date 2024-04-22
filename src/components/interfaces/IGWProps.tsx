import {IRow, IMutField, Specification, IThemeKey, IDarkMode, IUIThemeConfig} from "@kanaries/graphic-walker";
import {ToolbarItemProps} from "@kanaries/graphic-walker/dist/components/toolbar";

export interface IGWProps {
    data?: IRow[];
    fields?: IMutField[];
    spec?: Specification;
    i18nLang?: string;
    i18nResources?: { [lang: string]: Record<string, string | any> };
    keepAlive?: boolean | string;
    fieldKeyGuard?: boolean;
    vizThemeConfig?: IThemeKey;
    apperence?: IDarkMode;
    // storeRef?: React.MutableRefObject<IGlobalStore | null>;
    // computation?: IComputationConfig;
    toolbar?: {
        extra?: ToolbarItemProps[];
        exclude?: string[];
    };
    uiTheme?: IUIThemeConfig;
}