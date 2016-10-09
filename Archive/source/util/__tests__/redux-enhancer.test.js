import {assignAtPath} from '../redux-enhancer'
import {getInitState, getReducers, registerComponent} from '../redux-enhancer'
import actionInterceptor from '../action-interceptor'

jest.disableAutomock();

describe('redux-enhancer test suite', function () {
    it("Test assignAtPath", function() {
        var obj = assignAtPath({}, ["a", "b", "c"], "hello, world");
        expect(obj).toEqual({a: {b: {c: "hello, world"}}});

        obj = assignAtPath(obj, ["a", "b", "d"], "welcome");
        expect(obj).toEqual({a: {b: {c: "hello, world", d: "welcome"}}});

        obj = assignAtPath(obj, ["a", "b", "d"], "welcome, react");
        expect(obj).toEqual({a: {b: {c: "hello, world", d: "welcome, react"}}});
    });

    it("Test registerComponent", function() {
        registerComponent("counter", null, 100);
        registerComponent("routing", null, {});

        expect(getInitState()).toEqual({counter: 100, routing: {}});
    });

    it("Test object merging", function() {

        let a = {p1: "property1", p2: "property2"};
        let b = {...a, p2: {q1: "another object"}};

        expect(b).toEqual({p1: "property1", p2: {q1: "another object"}});
    });

    it("Test actionInterceptor", function() {

        let middleware = actionInterceptor.getMiddleware();
        expect(typeof(middleware)).toEqual("function");
    });
});

