const users = [
    { name: "a", age: 14 },
    { name: "b", age: 31 },
    { name: "c", age: 30 },
    { name: "d", age: 35 },
    { name: "e", age: 38 },
    { name: "f", age: 40 },
    { name: "g", age: 39 },
    { name: "h", age: 41 },
    { name: "i", age: 58 },
    { name: "j", age: 48 },
    { name: "k", age: 49 }
];

const _ = {};
_.each = (list, func) => {
    for (var i = 0, len = list.length; i < len; i++) {
        func(list[i], i);
    }
};
_.each(users, function (item, index) {
    console.log(item, index, arguments);
});
