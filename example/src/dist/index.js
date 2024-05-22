'use strict';

var react = require('react');

function useCredoScript(src) {
    if (src === void 0) { src = 'https://pay.credocentral.com/inline.js'; }
    var _a = react.useState({ loaded: false, error: false }), state = _a[0], setState = _a[1];
    react.useEffect(function () {
        if (document.getElementById('credo-inline')) {
            setState({ loaded: true, error: false });
            return;
        }
        var script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.id = 'credo-inline';
        var onScriptLoad = function () { return setState({ loaded: true, error: false }); };
        var onScriptError = function () {
            script.remove();
            setState({ loaded: true, error: true });
        };
        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);
        document.body.appendChild(script);
        return function () {
            script.removeEventListener('load', onScriptLoad);
            script.removeEventListener('error', onScriptError);
        };
    }, [src]);
    return [state.loaded, state.error];
}

function useCredoPayment(config) {
    var _a = useCredoScript(), scriptLoaded = _a[0], scriptError = _a[1];
    var initializePayment = react.useCallback(function () {
        if (scriptError) {
            throw new Error('Unable to load credo inline script');
        }
        if (scriptLoaded) {
            var CredoWidget = window.CredoWidget;
            if (CredoWidget) {
                var setup = CredoWidget.setup;
                var handler = setup(config);
                if (handler) {
                    var openIframe = handler.openIframe;
                    openIframe();
                }
            }
        }
    }, [scriptLoaded, scriptError, config]);
    react.useEffect(function () {
        if (scriptError) {
            throw new Error('Unable to load credo inline script');
        }
    }, [scriptError]);
    return initializePayment;
}

exports.useCredoPayment = useCredoPayment;
//# sourceMappingURL=index.js.map
