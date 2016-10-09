export function setCurrentItemAction(instanceKey, currentItemIndex) {
    return ({
        type: "Tab.SETCURRENT",
        instanceKey,
        currentItemIndex
    });
}
