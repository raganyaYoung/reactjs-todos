/**
 *
 * It seems that require() only supports static loading of modules(name of the loaded module has to be static
 * string literals), therefore we have to exhaust all supported resource files
 *
 * @param locale
 * @returns {*}
 *
 */
export function loadLocaleResource(locale) {
    switch(locale) {
        case "en_US":
            return require("./resource.en_US");

        case "zh_CN":
            return require("./resource.zh_CN");

        // add more supported language resource file here
    }

    return null;
}
