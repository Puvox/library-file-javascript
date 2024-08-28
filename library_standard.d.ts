export = PuvoxLibrary;
/**
 *
 *  ############################################################################
 *  #############################  Our JS Library   ############################
 *  ### Here we collect frequently used methods across our JS applications.  ###
 *  ### (Some of them are generic javascript functions, some are for NodeJS) ###
 *  ############################################################################
 *
 *  ########## Example usage: ##########
 *  const helpers = new PuvoxLibrary();
 *         console.log ( helpers.get_last_child_of_array(array) );
 *         console.log ( helpers.get_visitor_ip() );
 *         console.log ( helpers.telegram_send("hello world", "1234567890", "BOTKEY123:456789") );
 *       ... etc
 *
*/
declare class PuvoxLibrary {
    constructor(appName: any);
    selfMain: this;
    arrayValue(obj_arr: any, key: any, default_: any): any;
    arrayValueLower(obj_arr: any, key: any, default_: any): any;
    arrayValueUpper(obj_arr: any, key: any, default_: any): any;
    stringToArray(str: any, splitChar: any): any;
    arrayColumn(array: any, columnName: any): any;
    arrayColumn(array: any, col: any): any;
    arrayUnique(array: any, removeEmpties: any): any;
    arrayMerge(ar1: any, ar2: any): any;
    objectsArrayTill(arrayBlocks: any, key: any, value: any): {};
    arrayRemoveEmpty(array: any): any;
    arrayLastMember(arr: any): any;
    arrayLastItem(arr: any): any;
    removeKeys(obj: any, keysArr: any): {};
    removeKeysExcept(obj: any, keysArr: any): {};
    arrayDiff(source: any, comparedTo: any): any;
    arrayIntersect(source: any, comparedTo: any): any;
    arrayDiffFull(o1: any, o2: any): any[];
    sortKeys(x: any, out?: {}): {};
    sortByValuesIntoArray(obj: any, ascending?: boolean): any;
    stringArrayToNumeric(arr: any): number[];
    stringToArrayToNumeric(arr: any): number[];
    objectCopy(obj: any): any;
    cloneObjectDestructuve(orig: any): any;
    cloneObjectWithPrototype(orig: any): any;
    getKeyByValue(object: any, value: any): string | undefined;
    hasChildWithKeyValue(obj: any, targetKey: any, targetValue: any): boolean;
    trigger_on_load(callerr: any, onInteractionInsteadComplete: any): void;
    imagesLazyLoad(el_tag: any): void;
    move_to_top_in_parent(el_tag: any): void;
    Append_To_Head2(elemntType: any, content: any): void;
    Append_To_Head(elemntType: any, content: any): void;
    appendScript(url: any, callback: any, defer?: boolean): void;
    appendScript2(url: any): void;
    blackground2(): void;
    getFileExtension(filename: any): any;
    forEach(collection: any, callback: any, scope: any): void;
    sanitize(str: any): any;
    sanitize_key(str: any, use_dash: any): any;
    sanitize_key_dashed(str: any): any;
    sanitize_variable_name(str: any): any;
    sanitize_text(str: any, use_dash?: boolean): any;
    strip_non_word(str: any): any;
    removeAllWhitespaces(content: any): any;
    replaceAllOccurences(input: any, search: any, replacement: any): any;
    getVariableType(x: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "integer" | "float" | "array";
    isInteger: (x: any) => boolean;
    isNumeric(x: any): boolean;
    isDecimal(x: any): boolean;
    isBoolean(x: any): boolean;
    isBooleanReal(x: any): boolean;
    isString(x: any): boolean;
    isString(s: any): s is string;
    isObject(x: any): boolean;
    isObject(o: any): boolean;
    isJsonObject(data: any): boolean;
    isArray: (x: any) => x is any[];
    isSimpleVariableType(obj: any): boolean;
    isSimpleVariableTypeName(typeName_: any): boolean;
    isNumericVariableType(obj: any): boolean;
    isNumericVariableTypeName(typeName_: any): boolean;
    stringToBoolean(string: any): boolean;
    isException(e: any): any;
    IsJsonString(str: any): boolean;
    is_object(variable: any): boolean;
    formItemsToJson(FormElement: any): {};
    renameKey(obj: any, keyFrom: any, keyTo: any): any;
    renameSubKey(obj: any, keyFrom: any, keyTo: any, strict?: boolean): any;
    hasEmptyChild(obj: any): boolean;
    filterObject(obj: any, callback: any): any;
    isBetween(a: any, b: any, c: any): boolean;
    isBetweenEq(a: any, b: any, c: any): boolean;
    startsWithWhiteSpace(content: any): boolean;
    trimOnlyFromEnd(content: any): any;
    startsWith(content: any, what: any): any;
    startsWithArray(content: any, array: any): boolean;
    endsWith(content: any, what: any): any;
    endsWithArray(content: any, array: any): boolean;
    startLetters(str: any, amountOfLetters: any): any;
    endLetters(str: any, amountOfLetters: any): any;
    ConvertNumbToRoman(num: any): any;
    when_element_is_loaded(Id_or_class: any, functionname: any): void;
    SetTitlee(title: any): void;
    setUrl(urlPath: any, title: any): void;
    requestUri(url: any): any;
    ArrayKeyExistss(keyname: any, array: any): boolean;
    hashtageChangeOnClick(e: any): void;
    capitalizeFirstLetter(string: any): any;
    addQueryArg(name: any, value: any, url: any): string;
    buildQueryString(params: any): any;
    wpHomeUrl(): void;
    LoadYoutubeApi(callback: any): void;
    argvsString(): any;
    argvsArray(): any;
    argvs(): {};
    argv(which: any, def?: undefined): any;
    argvIsSet(which: any): boolean;
    parseQuery(queryString: any): {};
    invertDictionary(obj: any): {};
    isElementInViewport(el: any): boolean;
    MakeIframeFullHeight(iframeElement: any, cycling: any, overwrite_margin: any): void;
    MakeIframeFullHeight(iframeElement: any, cycling: any, overwrite_margin: any): void;
    getYtIdFromURL(URLL: any): any;
    getYtIdFromURL(URL_or_ID: any): any;
    autoSizeTextareas(className: any): void;
    getAllMethods(obj: any, inherited_too: any): string[];
    hasMethod(obj: any, funcName: any, inherited_too: any): boolean | null;
    ConvertToHourMinSec(time: any): string;
    getWindowSize(): {
        x: number;
        y: number;
    };
    removeItem(arr: any, value: any): any;
    removeItemOnce(arr: any, value: any): any;
    toggleItemInArray(array: any, value: any, condition: any): any;
    mergeDeep(target: any, source: any): any;
    getScrollbarWidth(): number;
    animationClick(element: any, animation: any, removeOrNot: any): void;
    animationClickTarget(element: any, target: any, animation: any, removeOrNot: any): void;
    datetime: {
        parentClass: null;
        mainClass(): null;
        isBetweenHMS(target: any, start: any, end: any, equality: any): void;
        equalDays(d1: any, d2: any): boolean;
        IsTodayStart(dt: any): void;
        GetWeekOfMonth(dt: any): void;
        GetWeekOfYear(dt: any): void;
        GetQuarter(dt: any): void;
        NumberToHMSstring(hhmmss: any): void;
        addNumberToHMS(hhmmss: any, added_or_subtracted: any): void;
        DatetimeToStringUtc(dt: any, withMS?: boolean, withTZ?: boolean): string;
        DatetimeToStringLocal(dt: any, withMS?: boolean, withT?: boolean): any;
        StringToDatetimeUtc(str: any, format?: null, culture?: null): number;
        StringToDatetimeLocal(str: any, format?: null, culture?: null): Date;
        StringToTimestampUtc(str: any, format?: null, culture?: null): number;
        DatetimeUtc(): Date;
        UtcDatetime(): Date;
        TimestampUtc(): number;
        UtcTimestamp(): number;
        DatetimeToTimestampUtc(dt: any): number;
        UtcTimestampFrom(dt: any): number;
        TimestampUtcToDatetimeUtc(ts: any): Date;
        UtcTimestampToUtcDatetime(ts: any): Date;
        MaxDate(d1: any, d2: any, d3?: null): void;
        MinDate(d1: any, d2: any, d3?: null): void;
        localDatetimeToUtcString(dt: any): void;
        areSameDays(d1: any, d2: any): void;
        GetDayOfYear(dt: any): any;
        StringToUtcString(str: any): any;
        UtcTimestampToLocalDatetime(ts: any): Date;
        UtcTimestampToUtcDatetimeString_OLD_CORRECT(epochtime: any, withTZ: any): string;
        UtcTimestampToUtcDatetimeString(epochtime: any, withTZ: any): string;
        getOffsetFromUtc(): number;
        stringToDate(str: any): Date;
        msGoneAfter(date: any): number;
        getYMDHISFfromDate(dt: any, utc?: boolean): any[];
        getYMDHISFfromDateWithZeros(dt: any, utc?: boolean): {
            y: any;
            M: string;
            d: string;
            h: string;
            m: string;
            s: string;
            f: string;
        };
        prefixWithZero(num: any, digits: any): any;
        currentDatetimeIs(targetDate: any): boolean;
        dateCompare(date1: any, date2: any): 1 | -1 | 0;
        dateTill(date1: any, date2: any): Date;
        secondsTill(date1: any, date2: any): number;
        /**
        * Adds time to a date. Modelled after MySQL DATE_ADD function.
        * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
        * https://stackoverflow.com/a/1214753/18511
        *
        * @param date  Date to start with
        * @param interval  One of: year, quarter, month, week, day, hour, minute, second
        * @param units  Number of units of the given interval to add.
        */
        add(date: any, interval: any, units: any): Date | undefined;
        addSeconds(date: any, seconds: any): Date;
        addDays(date: any, days: any): Date;
        daysBetween(a: any, b: any, utc?: boolean): number;
    };
    spinner(action: any): void;
    contains(string: any, pattern: any): boolean;
    hide_show_transprent(el: any, hide: any): void;
    get_extension_from_url(url: any): any;
    occurences_amount(string: any, subString: any, allowOverlapping: any): any;
    readLineByLine(filePath: any, callback: any, linesSize?: number, delimiterN?: boolean): Promise<any>;
    linesAmountInFile(filePath: any, delimiterN?: boolean): Promise<any>;
    oneSpace(cc: any): any;
    removeFirstAndLastChar(cc: any): any;
    getWithin_X(cc: any, x: any): any;
    getWithin_XY(cc: any, x: any, y: any): any;
    removeIfOutsideQuotes(content: any, replaceWhat: any, replaceWith: any): any;
    splitBy_X_NotInside_Y(str: any, x: any, y: any): any;
    splitBy_X_NotInside_YZ(str: any, by: any, y: any, z: any): any;
    splitOnlyFirstOccurence(str: any, what: any): any;
    splitByEqualNotInsideDoubleQuotes(str: any): any;
    splitByEqualNotInsideDoubleQuotesAndDoubleEquals(str: any): any;
    splitByNotInside2(str: any, splitChar: any, notInsideCharStart: any, notInsideCharEnd: any): void;
    getFromX_tillY_ExcudingQuotes(content: any, from: any, till: any, regex_index: any): string;
    preg_quote(str: any, delimiter?: null): string;
    escapeRegex(string: any): any;
    escapeRegExp2(string: any): any;
    splitStringIntoChars(str: any): any;
    empty(MyVar: any): boolean;
    is_empty_or_undefined(MyVar: any): boolean;
    isEmptyValue(input: any): boolean;
    removeEmptyValue(obj: any): any;
    isIterable(obj: any): boolean;
    insertRedErrorLine(array_: any): void;
    stripTags(input: any, allowed: any): any;
    br2nl(content: any): any;
    popup(content: any): void;
    loaderImage(circleColor: any): string;
    Loader(ShowOrHide: any, style: any, content_To_show: any): void;
    jquery_popup(element: any, isModal: any, params: any): any;
    jquery_popup_once(cookiename: any, key: any, text: any, duration: any, onComplete: any): void;
    jquery_popup_one_time_checkbox(cookiename: any, key: any, text: any, callable_func: any, defaultCheckboxTxt: any): void;
    dialog_dont_show_again(event: any, key: any, cookiename: any): void;
    dialogClose(): void;
    injectButton(text: any, onClickCallback: any, style: any): void;
    mergeObjects(obj1: any, obj2: any): any;
    objectMap(obj: any, fn: any): any;
    fancyTimeFormat(time: any): string;
    jsonToArray(json_data: any): any[][];
    fixEntitiedJson(json_data: any): any;
    setSelectByOptionName(selectEl: any, optName: any): void;
    ScrollTo(el: any, func: any, offset_distance: any): void;
    sleep(ms: any): Promise<any>;
    setTimeout_safe(done: any, ms: any): () => void;
    scrollToBottom2(el: any): void;
    scrollToBottom(el_or_id: any): void;
    scrollToBottom3(el_or_id: any): void;
    smooth_scroll_to(selector: any): void;
    addLine(selector: any, text: any, first_or_last: any): void;
    removeLine(selector: any, first_or_last: any, ifMoreThanXlines: any): void;
    removeElementIfMoreThan(el: any, amount: any, first_or_last: any): void;
    removeElementIfMoreThanNEW(el: any, amount: any, first_or_last: any): any;
    removeLine_old(selector: any, first_or_last: any, ifMoreThanXlines: any): void;
    removeLineFromTextarea(selector: any, first_or_last: any, ifMoreThanXlines: any): void;
    removeLineFromText(text: any, first_or_last: any, ifMoreThanXlines: any): any;
    arrayPart(array_: any, amount_: any, from: any): any;
    arrayInsertAt(array: any, index: any, value: any): any;
    executeAfterTry(el: any, func: any, num: any): void;
    waitExecute(el: any, func: any): void;
    consoleLogColor(text: any, backgroundColor?: null, foregroundColor?: null): void;
    suspressMessagesExecution(func: any): void;
    in_array(needle: any, haystack: any): boolean;
    CreateFrameIn(targetEl: any, frameContent: any, MakeItfullWH: any): any;
    makeAllATargetBlank(el: any): void;
    createDropdownFrom(arr: any, elementId: any, jqueriUi: any, appendToElement: any): string;
    b64EncodeUnicode(str: any): string;
    b64DecodeUnicode(str: any): string;
    round(num: any, decimals: any): number;
    basename(path: any): any;
    get(url: any, parameters: any): Promise<any>;
    getJSON(url: any, parameters: any): Promise<any>;
    post(url: any, params: any, callback_1: any, callback_2: any): Promise<void>;
    stringifyPretty(obj: any): string;
    responseStringify(obj_or_text: any): any;
    getElementById_FROM_PARENT(req: any): any;
    inArray(needle: any, haystack: any): boolean;
    inArray(needle: any, haystack: any): any;
    inKeys(key: any, obj: any): boolean;
    partialObject(object_: any, array_: any): {};
    array_column_with_keys(object_: any, keyName_: any): {};
    GetQueryParams(url: any): {};
    URLParser(url: any): {
        getHost: () => string;
        getHostName: () => string;
        getPath: () => string;
        getHash: () => string;
        getParams: () => any;
        getQuery: () => string;
        setHash: (value: any) => string;
        setParam: (name: any, value: any) => string;
        getParam: (name: any) => string | undefined;
        hasParam: (name: any) => true | undefined;
        removeParam: (name: any) => string;
    };
    parsePOST(request: any, callback: any): void;
    ChangeSocialShareUrls(elemnt: any, newurl: any, title: any): void;
    ReplaceParameterInQuery(url: any, param_name: any, param_new_val: any): any;
    refferer_is_same_domain(): boolean;
    DoPrevent(e: any): void;
    preventDefaultForAll(instantly: any): void;
    addHovered(elem: any): void;
    radiobox_onchange_hider(selector: any, desiredvalue: any, target_hidding_selector: any, SHOW_or_hide: any, ...args: any[]): void;
    GetRandomFromArray(my_array: any): any;
    array_shuffle(array: any): any;
    showYtVideo(options: any): void;
    FadeOut_modalpp(): void;
    forEachDefine(): void;
    forEachDefine2(): void;
    filterDefine(): void;
    filterDefine2(): void;
    var_dump(array: any): void;
    postForm(params: any, ConfirmMessage: any, path: any, method: any, targett: any): void;
    SetShowHint(elemnt: any, text: any, left: any, top: any): void;
    SetPoistion: ((e: any) => void) | undefined;
    Balance_Target_Image(img: any, widthh: any, heightt: any): void;
    Balanced_Image_proportions(classname: any, widthh: any, heightt: any, parentClassname: any): void;
    show_after_pageload(el: any): void;
    hide_after_pageload(el: any): void;
    Highlight_Current_Menu_link(Added_class_name: any, Ancestor_to_search_in: any, link_to_find: any): void;
    RemoveHashString(str: any): any;
    arrayRemoveValue(array: any, value: any): any[];
    getCharsFromStart(str: any, amount: any): any;
    getCharsFromEnd(str: any, amount: any): any;
    GetTopLeft(myyElement: any): {
        lefttt: number;
        toppp: number;
    };
    GetOffset(object: any, offset: any): void;
    GetScrolled(object: any, scrolled: any): void;
    MakeFixed(selector: any, ExtraHeightToBody: any): void;
    triggerWhenElementInView(el: any, func: any): void;
    compare(a: any, operator: any, b: any): boolean;
    calculate(a: any, operator: any, b: any): any;
    RandomNum(maxNum: any): number;
    random_number(length: any): number;
    randomNumber(length: any): number;
    random_number_minmax(min: any, max: any): any;
    randomString(length: any): string;
    shuffle_Word(word: any): string;
    youtubeImage(id: any, quality: any): string;
    IsMobileDevice(simpleORfull: any): any;
    backToTopBind(el: any): void;
    enable_jquery_errors(): void;
    encode_chars(str: any, chars?: any[]): any;
    telegram_send(textOriginal: any, chat_id: any, bot_key: any, extra_opts?: {}): any;
    telegram_last_sent_timestamp: number | undefined;
    openUrlInBrowser(url: any): void;
    stringify(obj_or_str: any): any;
    stringify_plain(data: any): string;
    CopyObject(obj: any): any;
    uniqId(obj_or_str: any): any;
    stringifyWithUndefined(obj: any): string;
    md5(str: any): any;
    jsonConcat(o1: any, o2: any): any;
    fetch(url: any, postOptions?: null, opts?: {}): Promise<string>;
    getRemoteData(url: any, postOptions?: null, opts?: {}): Promise<string>;
    unTrailingSlash(str: any): any;
    trailingSlash(str: any): string;
    privateAppName__: null;
    setAppName(name: any): void;
    getAppName(): never;
    stringifyForWrite(content: any): any;
    Cookies: {
        parentClass: null;
        mainClass(): null;
        get(a: any, b: any): any;
        set(a: any, b: any, c: any): any;
        remove(a: any, b: any): any;
        append(name: any, value: any, attributes: any): any;
        isset(cookiename: any): boolean;
        getOption(cookieName: any, key: any, defaultValue: any): any;
        setOption(cookieName: any, key: any, value: any, attributes: any): {};
        removeOption(cookieName: any, key: any, attributes: any): {};
        getOptionObject(cookieName: any, key: any): any;
        setOptionObject(cookieName: any, key: any, subKey: any, subValue: any): void;
        setOptionArray(cookieName: any, key: any, subValue: any, Add_or_remove: any): void;
        cookies_instance(): null;
        cookies_inited: null;
        cookies: () => any;
    };
    cache: {
        parentClass: null;
        mainClass(): null;
        helper_get_child(instanceClass: any, optName: any, subKeyName: any, defaultVal?: null, expireSeconds?: number): any;
        helper_set_child(instanceClass: any, optName: any, subKeyName: any, val: any): void;
        helper_delete_child(instanceClass: any, optName: any, subKeyName: any): void;
        localstorage: {
            parentClass: null;
            mainClass(): any;
            get(optName: any, defaultValue?: null, decode?: boolean, expireSeconds?: number): any;
            set(optName: any, content: any): true | undefined;
            delete(optName: any): boolean;
            get_child(optName: any, subKeyName: any, defaultVal?: null, expireSeconds?: number): any;
            set_child(optName: any, subKeyName: any, val: any): any;
            delete_child(optName: any, subKeyName: any): any;
        };
        file: {
            parentClass: null;
            mainClass(): any;
            custom_cache_dir: null;
            get_cache_temp_dir(): null;
            file_path(optName: any): string;
            get(optName: any, defaultValue?: null, decode?: boolean, expire_seconds?: number): any;
            set(optName: any, content: any): any;
            delete(optName: any): any;
            get_child(optName: any, subKeyName: any, defaultVal?: null, expireSeconds?: number): any;
            set_child(optName: any, subKeyName: any, val: any): any;
            delete_child(optName: any, subKeyName: any): any;
            customCacheDir: null;
            set_dir(dir: any, auto_clear_seconds?: null): any;
            filePath(uniqFileName: any): string;
            containerDefaultPrefix: string;
            tempIds: {};
            idForContent(slugOrContent: any): any;
            existsId(containerSlug: any, id: any): boolean;
            getIds(containerSlug: any): any;
            setIds(containerSlug: any, idsDict: any): any;
            addId(containerSlug: any, id: any): void;
            addIdIfNotExists(containerSlug: any, id: any): boolean;
        };
    };
    file: {
        parentClass: null;
        mainClass(): null;
        set_module(module: any): void;
        module_fs: any;
        module_path: any;
        module_os: any;
        fs(): any;
        os(): any;
        path(): any;
        tempDir(): any;
        exists(filePath: any): any;
        mtime(filePath: any): any;
        delete(filePath: any): any;
        unlink(filePath: any): any;
        createDirectory(dirPath: any): any;
        read(filePath: any, defaultValue?: string): any;
        readCustom(filePath: any, defaultValue?: string, decode?: boolean, expireSeconds?: number): any;
        write(filePath: any, content: any): any;
        getFilesListFromDir(dir: any): any[];
    };
    catchUnhandledExceptions(callback: any): void;
    keys: {
        (o: object): string[];
        (o: {}): string[];
    };
    values(x: any): any;
    extend(...args: any[]): any;
    clone(x: any): any;
    index(x: any): Set<any>;
    ordered(x: any): any;
    unique(x: any): any[];
    arrayConcat(a: any, b: any): any;
    toArray(object: any): any;
    isEmpty(object: any): boolean;
    keysort(x: any, out?: {}): {};
    indexBy(x: any, k: any, out?: {}): {};
    groupBy(x: any, k: any, out?: {}): {};
    filterBy(x: any, k: any, value?: undefined, out?: any[]): any[];
    sortBy(array: any, key: any, descending?: boolean, direction?: number): any;
    sortBy2(array: any, key1: any, key2: any, descending?: boolean, direction?: number): any;
    flatten(x: any, out?: any[]): any[];
    pluck(x: any, k: any): any;
    omit(x: any, ...args: any[]): any;
    sum(...xs: any[]): any;
    deepExtend(...xs: any[]): any;
    isNumber: (number: unknown) => boolean;
    hasProps(o: any): boolean;
    isRegExp(o: any): o is RegExp;
    isDictionary(o: any): boolean;
    isStringCoercible(x: any): any;
    prop(o: any, k: any): any;
    getValueFromKeysInArray(object: any, array: any): any;
    asFloat(x: any): number;
    asInteger(x: any): number;
    parseTimeframe(timeframe: any): number;
    roundTimeframe(timeframe: any, timestamp: any, direction?: any): number;
    json(data: any, params?: undefined): string;
    isJsonEncodedObject(object: any): boolean;
    encode_html_entities(content: any): any;
    precisionFromString(string: any): any;
    numberToString(x: any): any;
    isBrowser: boolean;
    isElectron: boolean;
    isWebWorker: boolean;
    isWindows: boolean;
    isNode: boolean;
    defaultFetch: typeof fetch;
    uuid(a: any): any;
    capitalize(s: any): any;
    strip(s: any): any;
    now: () => number;
    milliseconds: () => number;
    seconds(): number;
}
//# sourceMappingURL=library_standard.d.ts.map