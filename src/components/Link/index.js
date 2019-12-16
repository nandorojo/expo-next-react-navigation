var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import useRouting from '../../hooks/use-routing';
export default function Link(props) {
    var navigate = useRouting().navigate;
    var children = props.children, navigation = __rest(props, ["children"]);
    var nav = useCallback(function () { return navigate(navigation); }, [navigate, navigation]);
    return <TouchableOpacity onPress={nav}>{children}</TouchableOpacity>;
}
