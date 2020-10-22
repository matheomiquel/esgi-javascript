const type_check_v1 = function (arg, type) {
    return typeof arg === type
}

const type_check_v2 = function (arg, data) {
    if ((data.type && typeof arg !== data.type) || (data.value && arg != data.value) || (data.enum && !data.enum.includes(arg)))
        return false;
    return true
}


const type_check = function (arg, data) {
    if (!type_check_v2(arg, data)) {
        return false;
    }
    if (data.properties) {
        for (const property in data.properties) {
            if (data.properties[property].type && data.properties[property].type === "object" && data.properties[property].properties) {
                if (!type_check(arg[property], data.properties[property])) {
                    return false
                };
            } else if (!type_check_v2(arg[property], data.properties[property])) {
                return false
            }
        }
    }
    return true
}
const data = {
    properties: {
        prop1: {
            type: "object",
            properties: {
                prop1: {
                    type: "string",

                },
            }
        },
        prop2: {
            type: "string",

        },

    }
}
const test = {
    prop1: {
        prop1: "yt"
    },
    prop2: "test",

}
