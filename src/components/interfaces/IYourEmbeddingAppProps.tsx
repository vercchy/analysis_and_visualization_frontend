import {IMutField, IRow, Specification} from "@kanaries/graphic-walker";

export interface IYourEmbeddingAppProps {
    data?: IRow[];
    fields?: IMutField[];
    spec?: Specification;
    i18nLang?: string;
}