/**
 *
 * Actions for ContextMenu component
 *
 * @Author Kelven Yang
 *
 */

/**
 *
 * Show context menu at specified position with specified items
 *
 * @param position display position {x, y}, in pixel unit
 * @param items array of menu items [{discription:string, action:*}]
 *
 * @returns {{type: string, position: *, items: *}}
 *
 */
export function showAction(position, items) {
    return ({
        type: "ContextMenu.SHOW",
        position,
        items
    });
}

export function hideAction() {
    return ({
        type: "ContextMenu.HIDE"
    });
}

/**
 *
 * @param an event action object, if event happens outside the context menu, we will dismiss the context menu
 *
 * @returns {{type: string, testEvent: *}}
 */
export function dismissAction(e) {
    return ({
        type: "ContextMenu.DISMISS",
        testEvent: e
    });
}
