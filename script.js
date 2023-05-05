// //HTML tree

const table = {
    tagName: "table",
    attrs: {
        border: "1",
    },
    children: [
        {
            tagName: "tr",
            children: [
                {
                    tagName: "td",
                    children: ["1x1"],
                },
                {
                    tagName: "td",
                    children: ["1x2"],
                    attrs: {
                        border: "1",
                    },
                },
            ],
        },
        {
            tagName: "tr",
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"],
                },
            ],
        },
    ],
};


const htmlTree = (node) => {
    let html = '<' + node.tagName;

    if (node.attrs) {
        for (const attr in node.attrs) {
            html += ` ${attr}='${node.attrs[attr]}'`;
        }
    }

    if (!node.children || node.children.length === 0) {
        html += '/>';
        return html;
    }

    html += '>';
    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (typeof child === 'string') {
            html += child;
        } else {
            html += htmlTree(child);
        }
    }

    html += '</' + node.tagName + '>';

    return html;
}

// console.log(htmlTree(table))
// document.write(htmlTree(table));



// Рекурсія: DOM tree

const domTree = (parent, node) => {
    const element = document.createElement(node.tagName);

    if (node.attrs) {
        for (const attr in node.attrs) {
            element.setAttribute(attr, node.attrs[attr]);
        }
    }

    if (node.children && node.children.length > 0) {
        for (const child of node.children) {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                domTree(element, child);
            }
        }
    }

    parent.appendChild(element);
}

// domTree(document.body, table);



//Рекурсія: Deep Copy

function deepCopy(copied) {
    if (copied === null || typeof copied !== "object") {
        return copied;
    }

    let copy = Array.isArray(copied) ? [] : {};

    for (let key in copied) {
        copy[key] = deepCopy(copied[key]);
    }

    return copy;
}

const arr  = [1,"string", null, undefined, {a: 15, b: 10, c: [1,2,3,4],d: undefined, e: true }, true, false];
// const arr2 = deepCopy(arr);
// const table2 = deepCopy(table);
//
// console.log(arr);
// console.log(arr2);



//Рекурсия: My Stringify

const stringify = (obj) => {
    if (obj === null || obj === undefined) {
        return "null";

    } else if (typeof obj === "number" || typeof obj === "boolean") {
        return obj.toString();

    } else if (typeof obj === "string") {
        return '"' + obj + '"';

    } else if (Array.isArray(obj)) {
        const arr = obj.map((element) => stringify(element));
        return "[" + arr.join(",") + "]";

    } else if (typeof obj === "object") {
        const keys = Object.keys(obj);
        const arr = keys.map((key) => {
            const value = stringify(obj[key]);
            if (value === undefined) {
                return "";
            } else {
                return '"' + key + '":' + value;
            }
        });
        return "{" + arr.join(",") + "}";
    }
}

// const jsonString = stringify(arr);
// const jsonString2 = stringify(table);
// console.log(JSON.parse(jsonString));
// console.log(JSON.parse(jsonString2));



////Рекурсія: getElementById throw
const getElementById = (idToFind) => {
    function walker(parent) {
        if (parent.id === idToFind) {
            throw parent;
        }

        if (parent.children) {
            for (let i = 0; i < parent.children.length; i++) {
                walker(parent.children[i]);
            }
        }
    }

    try {
        walker(document.body);
    } catch (element) {
        return element;
    }

    return null;
}

// const div = document.createElement('div')
// document.body.append(div);
// div.id = 'test';
// div.innerText = 'Hello world!';
//
// console.log(getElementById('test'))





