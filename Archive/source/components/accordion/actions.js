export function setCurrentSectionAction(instanceKey, currentSectionIndex) {
    return ({
        type: "Accordion.SETCURRENT_SECTION",
        instanceKey,
        currentSectionIndex
    });
}
