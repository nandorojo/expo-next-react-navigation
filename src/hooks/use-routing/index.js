import { useNavigation } from 'react-navigation-hooks';
import { useCallback } from 'react';
export default function useRouting() {
    var _a = useNavigation(), nav = _a.navigate, grabParam = _a.getParam, pushTo = _a.push, goBack = _a.goBack;
    var navigate = useCallback(function (route) {
        nav({
            routeName: route.routeName,
            params: route.params,
        });
    }, [nav]);
    var push = useCallback(function (route) {
        pushTo(route);
    }, [pushTo]);
    var getParam = function (param, fallback) {
        var value = grabParam(param, fallback);
        return value;
    };
    return { navigate: navigate, getParam: getParam, push: push, goBack: goBack };
}
