export function increaseAction(instanceKey) {
    return ({
        type: "Counter.INCREMENT",
        instanceKey
    });
}
