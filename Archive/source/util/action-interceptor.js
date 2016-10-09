/**
 *
 * Redux component action interceptor
 *
 * @Author Kelven Yang
 *
 */
class ActionInterceptor {
    constructor() {
        this.components = [];
    }

    getMiddleware() {
        return (store=>next=>action=> {
            for(let component of this.components) {
                if(component.onEventAction && typeof(component.onEventAction) == "function") {
                    if(component.onEventAction(action)) {
                        return null;
                    }
                }
            }

            return next(action);
        });
    }

    subscribe(component) {
        if(!component) {
            console.error("ActionInterceptor.subscribe() requires a valid component object");
            return;
        }

        if(component.onEventAction && typeof(component.onEventAction) == "function") {
            if(this.components.indexOf(component) < 0)
                this.components.push(component);
        } else {
            console.error("onEventAction() should be defined in order to subscribe");
        }
    }

    unsubscribe(component) {
        let index = this.components.indexOf(component);
        if(index >= 0)
            this.components.splice(index, 1);
    }
}

const actionInterceptor = new ActionInterceptor();
export default actionInterceptor;
