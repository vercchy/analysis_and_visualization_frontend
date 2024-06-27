import { TableWalker } from '@kanaries/graphic-walker';
import {IYourChartProps} from "../interfaces/IYourChartProps";

const YourChart: React.FC<IYourChartProps> = props => {
    const { data, fields } = props;
    return <TableWalker
        data={data}
        fields={fields}
        pageSize={50}
    />;
}

export default YourChart;