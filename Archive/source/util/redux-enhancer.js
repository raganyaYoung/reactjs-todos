/**
 *
 * Redux emhancement to help decouple single state tree dependency for
 * stateful UI component development
 *
 * @Author  Kelven Yang
 *
 */

import {combineReducers, createStore as _createStore} from 'redux';
import isObject from 'lodash/isObject';

var store = null;
var initState = {};
var reducers = {};

export function createStore(reducer, initialState, enhancer) {
    store = _createStore(reducer, initialState, enhancer);
    return store;
}

export function getInitState() {
    return initState;
}

export function getReducers() {
    let node = {...reducers};
    return mapToReducers(node);
}

export function getStore() {
    return store;
}

export function dispatch(...args) {
    store.dispatch(...args);
}

function mapToReducers(obj) {
    if(typeof(obj) == "function")
        return obj;

    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            if(isObject(obj[key])) {
                obj[key] = mapToReducers(obj[key]);
            }
        }
    }

    return combineReducers({...obj});
}

export function registerComponent(path, componentReducer, componentInitState) {
    if(!(typeof(path) == "function" || typeof(path) == "string")) {
        console.error("Invalid parameter in registerComponent()");
        return;
    }

    if(typeof(path) == "function") {
        path = path.statePath || path.name;
    }

    let tokenArray = path.split('.');
    if(componentInitState) {
        initState = assignAtPath(initState, tokenArray, componentInitState);
    }

    tokenArray = path.split('.');
    if(componentReducer) {
        reducers = assignAtPath(reducers, tokenArray, componentReducer);

        if(store)
            store.replaceReducer(getReducers);
    }
}

/**
 *
 * @param state if null then it will be store.getState(), otherwise, the passed in root state object
 *          if reducerLevelState is false or the passed in reducer-level state object if reducerLevelState is true
 * @param path Component class name or path of the reducer in state tree
 * @param instanceKey instance key of the component if it is not singleton component
 * @param reducerLevelState whether or not the state parameter is at reducer-level(true) or at root level(false)
 * @returns {*} the component state object
 *
 */
export function getComponentState(state, path, instanceKey, reducerLevelState) {

    if(!(typeof(path) == "function" || typeof(path) == "string")) {
        console.error("Invalid parameter in getComponentState()");
        return;
    }

    let defaultInstanceState = null;
    if(typeof(path) == "function") {
        defaultInstanceState = path.defaultInstanceState;

        path = path.statePath || path.name;
    }

    let result = state;
    if(!result) {
        if (!store)
            return null;

        result = store.getState();
    }

    if(!reducerLevelState) {
        let tokenArray = path.split('.');
        for (let token of tokenArray) {
            if (result[token]) {
                result = result[token];
            } else {
                result = null;
                break;
            }
        }
    }

    if(instanceKey && result)
        result = result.instances[instanceKey];

    if(result)
        return result;

    if(defaultInstanceState)
        return defaultInstanceState();

    return null;
}

/**
 *
 * @param state reducer-level state object
 * @param componentState new component state, if instanceKey is defined, it is the state object at instance-level
 * @param instanceKey instancek ey of the component if it is not singleton component
 *
 * @returns {*} reduced reducer-level state object
 */
export function reduceComponentState(state, componentState, instanceKey) {
    if(instanceKey) {
        let mergedState = {...state};
        return assignAtPath(mergedState, ["instances", instanceKey], componentState);
    } else {
        return Object.assign({}, state, componentState);
    }
}

export function getBlankReducerState(isSingleton, singletonDefault) {
    if(isSingleton) {
        if(singletonDefault != undefined)
            return singletonDefault;

        return ({});
    }

    return ({instances: {}});
}

export function assignAtPath(initObject, tokenArray, valueObject) {
    let node = initObject;

    if(tokenArray.length > 1) {
        let name = tokenArray[0];

        tokenArray.shift();
        let subNode = {};
        if(node[name])
            subNode = node[name];

        node = {...node, [name]: assignAtPath(subNode, tokenArray, valueObject)};
    } else if (tokenArray.length == 1) {
        let name = tokenArray[0];

        node = {...node, [name]: valueObject }
    } else {
        console.error("tokenArray needs to have at least one entry");
    }

    return node;
}
