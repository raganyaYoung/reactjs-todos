/**
 *
 * Localization utility helpers
 *
 * @Author  Kelven Yang
 *
 */

var loader = function (locale) {
    console.error('locale loader is not bound, you may call bindLocaleLoader() at a proper time(i.e., bootstrap)');
    return null;
}

export function bindLocaleLoader(concreteLoader) {
    loader = concreteLoader;
}

export function localeString(locale, key, ...args) {
    var {resource} = loader(locale);
    if(!resource)
        return key;

    var sbToken = [];
    var sb = [];
    var i = 0;
    var matchingInProgress = false;

    var source = resource[key];

    while(i < source.length) {
        if(matchingInProgress) {
            if(source.charAt(i) != '}') {
                sbToken.push(source.charAt(i));
            } else {
                var interpolated = args[parseInt(sbToken.toString().trim())];
                if(interpolated != null) {
                    for(let ch of interpolated.split('')) {
                        sb.push(ch);
                    }
                }

                matchingInProgress = false;
            }
        } else {
            if (source.charAt(i) == '$') {
                if(i < source.length - 1 && source.charAt(i+1) == '{') {
                    matchingInProgress = true;
                    sbToken = [];
                    i++;
                } else {
                    sb.push(source.charAt(i));
                }
            } else {
                sb.push(source.charAt(i));
            }
        }

        i++;
    }

    return sb.join("");
}
