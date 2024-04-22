import { GraphicWalker } from '@kanaries/graphic-walker';
import {IYourEmbeddingAppProps} from "../interfaces/IYourEmbeddingAppProps";
import {Specification} from "@kanaries/graphic-walker";
import {useState} from "react";

const YourEmbeddingApp: React.FC<IYourEmbeddingAppProps> = props => {
    const { data, fields } = props;

    const initialSpec : Specification = {
        position: ['x', 'y'],
        color : ['red', 'blue'],
        size : ['small', 'small'],
        shape : ['circle', 'square']
    }

    const [spec, setSpec] = useState<Specification>(initialSpec);

    const language = 'en';

    return <GraphicWalker
        data={data}
        fields={fields}
        i18nLang={language}
    />;
}

export default YourEmbeddingApp;