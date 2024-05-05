const CreateYourChartProps = (param1:string) => {
    //  yourChartProps: {
    //                 data: [
    //                     {id: 1, name: "Kiko"}, // Example IRow object
    //                     {id: 2, name: "Verche"},
    //                 ],
    //                 fields: [
    //                     {
    //                         fid: "id", key: "keyID", name: "id", basename: "id",
    //                         disable: false, semanticType: "ordinal", analyticType: "dimension"
    //                     }, // Example IMutField object
    //                     {
    //                         fid: "name", key: "keyName", name: "name", basename: "name",
    //                         disable: false, semanticType: "nominal", analyticType: "dimension"
    //                     },
    //
    //                     // Add more IMutField objects as needed
    //                 ],
    //             }


    const content_array = param1.trim().split("\n").map(value => value.replace(/\r$/, ''));
    const line_one = content_array[0].split(",");


    const data = []
    const fields = []
    let array_of_entries = [];

    for (let i = 1; i < content_array.length; i++) {
        array_of_entries = [];
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
                const isNumeric = isNaN(parseFloat(array_of_entries[j]));
                if(isNumeric) {
                    row_fields["semanticType"] = "nominal";
                } else {
                    row_fields["semanticType"] = "ordinal";
                }
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