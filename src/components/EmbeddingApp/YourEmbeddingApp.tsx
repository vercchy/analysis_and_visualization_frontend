import { GraphicWalker } from '@kanaries/graphic-walker';
import {IYourEmbeddingAppProps} from "../interfaces/IYourEmbeddingAppProps";
import {Specification} from "@kanaries/graphic-walker";

const YourEmbeddingApp: React.FC<IYourEmbeddingAppProps> = props => {
    const { data, fields } = props;

    const language = 'en';

    return <GraphicWalker
        data={data}
        fields={fields}
        i18nLang={language}
    />;
}

export default YourEmbeddingApp;