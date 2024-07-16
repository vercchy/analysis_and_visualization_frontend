import {IMutField} from "@kanaries/graphic-walker";


const determineSemanticType = (values : string[]): "nominal" | "ordinal" | "quantitative" | "temporal" => {
    if(!isNaN(parseFloat(values[0])) && isFinite(Number(values[0]))) {
        let uniqueOccurrences = values.reduce((acc : Map<string,number>, curr : string) => {
            if(!acc.has(curr)) {
                acc.set(curr, 0);
            }
            return acc;
        }, new Map<string, number>())

        if(uniqueOccurrences.size <=4) {
            return "nominal";
        } else {
            return "quantitative";
        }
    } else {
        if(!isNaN(Date.parse(values[0]))) {
            return "temporal";
        }
    }

    return "nominal";
}

const CreateYourChartProps = (param1:string) => {

    const content_array = param1.trim().split("\n").map(value => value.replace(/\r$/, ''));
    const line_one = content_array[0].split(",");


    const data = []
    const fields = []

    for (let i = 1; i < content_array.length; i++) {
        const array_of_entries = [];
        let entry =  '';
        let flag = false;
        for(let k = 0; k < content_array[i].length; k++) {
            const current_character = content_array[i].at(k);
            if(current_character === ',' && !flag) {
                array_of_entries.push(entry);
                entry = '';
                flag = false;

            } else if(current_character === '\"') {
                if(flag) {
                    flag = false;
                } else {
                    flag = true;}
            }
            else {
                entry += current_character;
            }
        }
        array_of_entries.push(entry);
        entry = '';

        const row_data: { [key: string]: any } = {};


        for (let j = 0; j < line_one.length; j++) {
            row_data[line_one[j]] = array_of_entries[j];
            const row_fields : {[key : string] : any} = {}
            //row_data['name'] = 'John'
            //row_data['age'] = 30
            if(i === content_array.length-1) {
                row_fields["fid"] = line_one[j];
                //taking all the values already pre-stored in data in the form of an array of strings to determine whether they are nominal or not
                let valuesToDetermineType = data.map(item => item[line_one[j]]).slice(0, 70);
                const semanticType = determineSemanticType(valuesToDetermineType);
                row_fields["semanticType"] = semanticType;
                row_fields["analyticType"] = "dimension";
                fields.push(row_fields);
            }


        }
        data.push(row_data)
    }


    return {
        data: data,
        fields: fields
    };
}

export default CreateYourChartProps;