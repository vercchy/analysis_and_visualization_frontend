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

    const content_array = param1.split("\\n").map(value => value.replace(/\r$/, ''));
    const line_one = content_array[0].split(",");






    const data = []
    const fields = []
    for (let i = 1; i < content_array.length; i++) {
        const current_line = content_array[i].split(",");
        const row_data: { [key: string]: any } = {};


        for (let j = 0; j < line_one.length; j++) {
            row_data[line_one[j]] = current_line[j];
            const row_fields : {[key : string] : any} = {}
            //row_data['name'] = 'John'
            //row_data['age'] = 30
            if(i === content_array.length-1) {
                row_fields["fid"] = line_one[j];
                const isNumeric = isNaN(parseFloat(current_line[j]));
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