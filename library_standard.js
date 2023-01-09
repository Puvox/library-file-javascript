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
 *         console.log ( helpers.telegramMessage("hello world", "1234567890", "BOTKEY123:456789") );
 *       ... etc
 *
*/

const puvox_library =
{
	// ########## ARRAY ########## //
	arrayValue(obj_arr, key, default_){
		return (obj_arr && key in obj_arr ? obj_arr[key] : default_);
	},
	arrayValueLower(obj_arr, key, default_){
		const val = this.arrayValue(obj_arr, key, default_);
		return (val===null ? null : val.toLowerCase());
	},
	arrayValueUpper(obj_arr, key, default_){
		const val = this.arrayValue(obj_arr, key, default_);
		return (val===null ? null : val.toUpperCase());
	},
	stringToArray(str, splitChar){
		var splitChar= splitChar || '|';
		let parts = str.split(splitChar);
		return parts;
	},
	arrayColumn(array, columnName) {
		return array.map(function(value,index) {
			return value[columnName];
		})
	},
	arrayUnique(array, removeEmpties){
		//let uniqueItems = [...new Set(items)]
		let res = array.filter(function(item, pos) {
			return array.indexOf(item) == pos;
		});
		return (removeEmpties ? this.arrayRemoveEmpty(res) : res);
	},
	arrayMerge(ar1,ar2){
		return ar1.concat(ar2);
	},
	objectsArrayTill(arrayBlocks, key, value)
	{
		let newArr = this.isObject(arrayBlocks) ? {} : [];
		for(let [key_1,obj_1] of Object.entries(arrayBlocks))
		{
			if (key in obj_1 && obj_1[key]===value)
			{
				break;
			}
			newArr[key_1] = obj_1;
		}
		return newArr;
	},
	arrayRemoveEmpty(array){  return array.filter(item => item); },
	arrayLastMember(arr){  return arr[arr.length-1]; },
	arrayLastItem(arr){ return this.arrayLastMember(arr); },
	removeKeys(obj, keysArr){
		let newObj ={};
		for (let [key,val] of Object.entries(obj)){
			if (!this.inArray(key,keysArr))
				newObj[key]=val;
		}
		return newObj;
	},
	removeKeysExcept (obj, keysArr){
		let newObj ={};
		for (let [key,val] of Object.entries(obj)){
			if (this.inArray(key,keysArr))
				newObj[key]=val;
		}
		return newObj;
	},
	arrayDiff(source, comparedTo){
		return source.filter(x => !comparedTo.includes(x));
	},
	arrayIntersect(source, comparedTo){
		return source.filter(x => comparedTo.includes(x));
	},
	arrayDiffFull(o1,o2) {
		const self = this;
		const typeObject = function(o){
			return typeof o === 'object';
		};
		const bothAreObjects = (o1,o2) =>{
			return (typeObject(o1) && typeObject(o2));
		};
		const bothAreArrays = (o1,o2) =>{
			return (this.isArray(o1) && this.isArray(o2));
		};
		const diff = function (o1, o2) {
			const result = {};
			// if first is item is not object
			if (!typeObject(o1) && typeObject(o2)) {
				return o2;
			}
			// if second is item is not object
			else if (typeObject(o1) && !typeObject(o2)) {
				return undefined;
			}
			// if they are equal
			else if (Object.is(o1, o2)) {
				return undefined;
			} else if (bothAreArrays(o1,o2)){
				return self.arrayDiff(o1,o2);
			}
			const keys = Object.keys(o2);
			for (let i=0; i<keys.length; i++) {
				const key = keys[i];
				// if both are objects
				if ( bothAreObjects(o1[key],o2[key])) {
					// if equal, return nothing
					if ( Object.is(o1[key], o2[key]) ) {
						// do nothing
					} else if (o1[key] === o2[key]) {
						// do nothing
					} else {
						result[key] = diff(o1[key],o2[key]);
					}
				} else if (bothAreArrays(o1[key],o2[key])) {
					result[key] = diff(o1[key],o2[key]);
				} else if (o1[key] !== o2[key]) {
					result[key] = o2[key];
				} else {
					// do nothing
				}
			}
			return result;
		};
		return [
			diff(o1,o2),
			diff(o2,o1),
		];
	},
	sortKeys (x, out = {}) {
        for (const k of Object.keys (x).sort ()) {
            out[k] = x[k]
        }
        return out
    },
	stringArrayToNumeric(arr){
		let newArr = [];
		for(let i=0; i<arr.length; i++){
			newArr.push( parseFloat(arr[i]) );
		}
		return newArr;
	},
	stringToArrayToNumeric(arr){
		return this.stringArrayToNumeric(this.stringToArray(arr));
	},
 
	objectCopy(obj){
		return JSON.parse(JSON.stringify(obj));
	},
	// https://stackoverflow.com/a/44782052/2377343
    cloneObjectDestructuve(orig){
        return Object.assign(Object.create(Object.getPrototypeOf(orig)), orig);
    },
	// https://stackoverflow.com/a/41474987/2377343
    cloneObjectWithPrototype(orig){
        const clone = Object.assign( Object.create(orig), orig );
		Object.setPrototypeOf( clone, Blah.prototype );
		return clone;
    },
    getKeyByValue (object, value) {
        const keys = Object.keys (object);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (object[key] === value) {
                return key;
            }
        }
        return undefined;
    },    
	hasChildWithKeyValue (obj, targetKey, targetValue) {
        const keys = Object.keys (obj);
        for (let i = 0; i < keys.length; i++) {
            const currentKey = keys[i];
            const childMember = obj[currentKey];
            const value = this.safeInteger (childMember, targetKey, undefined);
            if (value === targetValue) {
                return true;
            }
        }
        return false;
    },





	trigger_on_load(callerr, onInteractionInsteadComplete)
	{
		var stage=stage || 1;
		if (onInteractionInsteadComplete || true){
			document.addEventListener('readystatechange', event => {
				if (event.target.readyState === "interactive") {      //same as:  document.addEventListener("DOMContentLoaded"
					callerr();		//"All HTML DOM elements are accessible"
				}
			});
		}
		else{
			document.addEventListener('readystatechange', event => {
				if (event.target.readyState === "complete") {
					callerr();		//"Now external resources are loaded too, like css,src etc... "
				}
			});
		}
	},
	
	// setTimeout( window[arguments.callee.name.toString() ], 500);
	
	// lazyload images
	imagesLazyLoad(el_tag){
		jQuery(el_tag).each( function(){
				// set the img src from data-src
				jQuery( this ).attr( 'src', jQuery( this ).attr( 'data-src' ) );
			}
		);
	},

	move_to_top_in_parent (el_tag)
	{
		$(el_tag).each(function() {
			$(this).parent().prepend(this);
		});
	},

	//window.onload REPLACEMENT Both methods are used to achieve the same goal of attaching an event to an element.
	// ttachEvent can only be used on older trident rendering engines ( IE5+ IE5-8*) and addEventListener is a W3 standard that is implemented in the majority of other browsers (FF, Webkit, Opera, IE9+).
	// window.addEventListener ? window.addEventListener("load",yourFunction,false) : window.attachEvent && window.attachEvent("onload",yourFunction);


	// Append Style/Script In Head 
	Append_To_Head2(elemntType, content){
		// if provided conent is "link" or "inline codes"
		var Is_Link = content.split(/\r\n|\r|\n/).length <= 1  &&  content.indexOf("/") > -1 && (content.substring(0, 4)=='http' || content.substring(0, 2)=='//' || content.substring(0, 2)=='./' || content.substring(0, 1)=='/' );
		if(Is_Link){
			//assign temporary id
			var id= encodeURI( content.split('/').reverse()[0] );  //encodeURI(content.replace(/[\W_]+/g,"-"));
			if (!document.getElementById(id)){
				if (elemntType=='script')	 { var x=document.createElement('script');x.id=id;	x.src=content;	x.type='text/javascript'; }
				else if	(elemntType=='style'){ var x=document.createElement('link');  x.id=id;	x.href=content;	x.type='text/css';  x.rel = 'stylesheet'; }
			}
		}
		else{
			var x = document.createElement(elemntType);
			if (elemntType=='script')	 { x.type='text/javascript';	x.innerHTML = content;	}
			else if	(elemntType=='style'){ x.type='text/css';	 if (x.styleSheet){ x.styleSheet.cssText=content; } else { x.appendChild(document.createTextNode(content)); }	}
		}
		//append in head
		(document.head || document.getElementsByTagName('head')[0]).appendChild(x);
	},
	Append_To_Head(elemntType, content) {
		var Is_Link = content.split(/\r\n|\r|\n/).length <= 1 && content.indexOf("/") > -1 && (content.substring(0, 4) == 'http' || content.substring(0, 2) == '//' || content.substring(0, 2) == './' || content.substring(0, 1) == '/');
		if (Is_Link) {
			var id = encodeURI(content.replace(/[\W_]+/g,"-"));
			if (!document.getElementById(id)) {
				if (elemntType == 'script') {
					var x = document.createElement('script');
					x.id = id;
					document.head.appendChild(x);
					x.onload = function () {};
					x.src = content;
				} else if (elemntType == 'style') {
					var x = document.createElement('link');
					x.id = id;
					x.href = content;
					x.type = 'text/css';
					x.rel = 'stylesheet';
					document.head.appendChild(x);
				}
			}
		} else {
			var x = document.createElement(elemntType);
			if (elemntType == 'script') {
				x.type = 'text/javascript';
				x.innerHTML = content;
			} else if (elemntType == 'style') {
				x.type = 'text/css';
				if (x.styleSheet) {
					x.styleSheet.cssText = content;
				} else {
					x.appendChild(document.createTextNode(content));
				}
			}
			document.head.appendChild(x);
		}
	},
	// loadScript
	appendScript(url, callback, defer=false){
		var script = document.createElement('script');
		script.onload = (callback || function(){});
		script.src = url;
		if (defer)
			script.defer = true;
		document.head.appendChild(script);
	},
	appendScript2(url){
		var script = document.createElement('script');
		document.head.appendChild(script);
		script.onload = function () { };
		script.src = url;
	},

	blackground2(){
		var innerDiv = document.createElement("div"); innerDiv.id = "my_black_backgr";
		innerDiv.setAttribute("style", "background:black; height:4000px; left:0px; opacity:0.9; position:fixed; top:0px; width:100%; z-index:9990;");
		var BODYYY = document.body;	BODYYY.insertBefore(innerDiv, BODYYY.childNodes[0]);
	},
	
	getFileExtension(filename){
		var ext = filename.split('.').pop();
		return (ext===filename) ? '' : ext;
	},
	
	// stackoverflow -best foreach
	forEach(collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	},

	// ################
	sanitize(str){ return str.trim().replace( /[^a-zA-Z0-9_\-]/g, "_"); },
	sanitize_key(str, use_dash){ return str.trim().toLowerCase().replace( /[^a-z0-9_\-]/g, (use_dash===true ? '_' : (use_dash ? use_dash :'')) ); }, //same as wp
	sanitize_key_dashed(str){ return this.sanitize_key(str, true).replace(/__/g,'_'); },
	sanitize_variable_name(str)
	{
		return this.strip_non_word(str).replace(/-/g,"_");
	},
	sanitize_text(str, use_dash=false) { return str.trim().replace(/[^a-zA-Z0-9]+/g, (use_dash ? "_":"") ); },

	//nonword
	strip_non_word(str)
	{
		return str.replace(/[\W_]+/g,"-");
	},
	removeAllWhitespaces(content){ return content.replace(/\s/g,''); },

	// ####################### TYPE ##############################
	
	getVariableType(x) {
		if 		(this.isInteger(x))	return "integer";
		else if (this.isDecimal(x))	return "float";
		else if (this.isBoolean(x))	return "boolean";	//at first, priority to bool, because of "true" and "false" strings
		else if (this.isString(x))	return "string";
		else if (this.isArray(x))	return "array";
		else if (this.isObject(x))	return "object";
		return typeof x;
	},
	isInteger(x)	{ return Number.isInteger(x); },
	isNumeric(x)	{ return Number.isFinite(x); },
	isDecimal(x)	{ return this.isNumeric(x) && (!isNaN(parseFloat(x))); }, // avoid occasions like "1abc"
	isBoolean(x)	{ return this.isBooleanReal(x) || (this.isString(x) && (x.toLowerCase() =="true" || x.toLowerCase() =="false")); },
	isBooleanReal(x)	{ return x === true || x === false || toString.call(x) === '[object Boolean]'; },
	isString(x)	{ return Object.prototype.toString.call(x) === "[object String]"; }, // return (typeof content === 'string' || content instanceof String);
	// https://stackoverflow.com/questions/8834126/
	isObject(x)	{ return  ( !Array.isArray(x)  && Object.prototype.toString.call(x) !== '[object Array]' )  && (  (typeof x === 'object' && x !== null ) || ( (!!x) && (x.constructor === Object) ) || (typeof x === 'function' || typeof x === 'object' && !!x) ) ; },
	// https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
	isJsonObject(data){
		// doesnt work for string return data!="" && (data=={} || JSON.stringify(data)!='{}');
		return false;
	}, 
	isArray(x)	{ return ( (!!x) && (x.constructor === Array) ) || (Array.isArray(x)); },	
	
	isSimpleVariableType(obj){ return this.isSimpleVariableTypeName(typeof obj); },
	isSimpleVariableTypeName(typeName_){ return this.inArray( typeName_, [ "boolean", "integer", "float", "double", "decimal", "string"]);  },
	isNumericVariableType(obj){ return this.isNumericVariableTypeName(typeof obj); },
	isNumericVariableTypeName(typeName_){ return this.inArray(typeName_, [ "integer", "float", "double", "decimal"]); },

	stringToBoolean(string){
		switch(string.toLowerCase().trim()){
			case "true": case "yes": case "1": return true;
			case "false": case "no": case "0": case null: return false;
			default: return Boolean(string);
		}
	},
	isException(e){
		return e && e.stack && e.message;
	},
	IsJsonString (str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	},
	is_object(variable){
		return typeof variable === 'object' && variable !== null;
	},
	formItemsToJson(FormElement){    
		let formDataEntries = new FormData(FormElement).entries();
		const handleChild = function (obj,keysArr,value){
			let firstK = keysArr.shift();
			firstK=firstK.replace(']','');
			if (keysArr.length==0){
				if (firstK=='') {
					if (!Array.isArray(obj)) obj=[];
					obj.push(value);
				}
				else obj[firstK] = value; 
			} 
			else{
				if (firstK=='') obj.push(value); 
				else {
					if ( ! ( firstK in obj) ) obj[firstK]={};
					obj[firstK] = handleChild(obj[firstK],keysArr,value);
				}
			}
			return obj;
		};
		let result = {};
		for (const [key, value]  of formDataEntries )
			result= handleChild(result, key.split(/\[/), value); 
		return result;
	},

	hasEmptyChild(obj){
		let hasEmpty = false;
		if(this.isObject(obj)) {
			for (let [key,val] of Object.entries(obj)){
				if (val === null || val === undefined){
					hasEmpty = true; 
				}
			}
		}
		return hasEmpty;
	},

	filterObject(obj, callback) {
		return Object.fromEntries(Object.entries(obj).
		  filter(([key, val]) => callback(val, key)));
	},
	// #####################################$$$$$################
	
	
	isBetween(a,b,c)   { return a< b && b< c; },
	isBetweenEq(a,b,c) { return a<=b && b<=c; },
	startsWithWhiteSpace(content){
		return (/^\s/).test(content);
	},
	trimOnlyFromEnd(content){
		return content.replace(/\s*$/,"");
	},
	startsWith(content, what){
		return content.startsWith(what);
	},
	startsWithArray(content,array){
		array.forEach(function(val){
			if (content.startsWith(val)) return true;
		})
		return false;
	},
	endsWith(content, what){
		return content.endsWith(what);
	},
	endsWithArray(content,array){
		array.forEach(function(val){
			if (content.endsWith(val)) return true;
		})
		return false;
	},
	startLetters(str, amountOfLetters){
		return str.substr(0, amountOfLetters);
	},
	endLetters(str, amountOfLetters){
		return str.substr(str.length - amountOfLetters);
	},

	ConvertNumbToRoman(num){
		num= num.replace('40','XXXX');	num= num.replace('39','XXXIX');	num= num.replace('38','XXXVIII');	num= num.replace('37','XXXVII');
		num= num.replace('36','XXXVI');	num= num.replace('35','XXXV');	num= num.replace('34','XXXIV');		num= num.replace('33','XXXII');
		num= num.replace('32','XXXII');	num= num.replace('31','XXXI');  num= num.replace('30','XXX');		num= num.replace('29','XXIX');
		num= num.replace('28','XXVIII');num= num.replace('27','XXVII');	num= num.replace('26','XXVI');		num= num.replace('25','XXV');
		num= num.replace('24','XXIV');	num= num.replace('23','XXIII');	num= num.replace('22','XXII');		num= num.replace('21','XXI');
		num= num.replace('20','XX');	num= num.replace('19','XIX');	num= num.replace('18','XVIII');		num= num.replace('17','XVII');
		num= num.replace('16','XVI');	num= num.replace('15','XV');	num= num.replace('14','XIV');		num= num.replace('13','XIII');
		num= num.replace('12','XII');	num= num.replace('11','XI');	num= num.replace('10','X');			num= num.replace('9','IX');
		num= num.replace('8','VIII');	num= num.replace('7','VII');	num= num.replace('6','VI');			num= num.replace('5','V');
		num= num.replace('4','IV');		num= num.replace('3','III');	num= num.replace('2','II');			num= num.replace('1','I'); 		return num;
	},

	// encrypt decrypt: http://jsfiddle.net/kein1945/M9K2c/   |   https://stackoverflow.com/questions/18279141/    |    https://stackoverflow.com/questions/51531021/x


	//to check whenever element is loaded
	when_element_is_loaded(Id_or_class,functionname){	
		Id_or_class=Id_or_class.trim(); var eName = Id_or_class.substr(1);  if('#'==Id_or_class.charAt(0)){var x=document.getElementById(eName);} else{var x=document.getElementsByClassName(eName)[0];}  
		if(x) { functionname(); }	 else { setTimeout(when_element_is_loaded, 100,  Id_or_class, functionname); } 
	},

	// set document title
	SetTitlee(title) { document.getElementsByTagName('title')[0].innerHTML =	title; },
	
	setUrl(urlPath, title) {
		var title= title || false;
		window.history.pushState( ( title ? {"pageTitle":title} : ""),"", urlPath);   //{"html":...,"pageTitle":....}
	},
	
	requestUri(url){
		var url = url || location.href;
		return url.replace(origin,'');
	},
	// check if key exists in array
	ArrayKeyExistss(keyname,array) {
		return typeof array[keyname] !== 'undefined'; 
	},

	hashtageChangeOnClick(e) { 
		function MyCallbackTemp (e)
		{
			var e = window.e || e; var t=e.target; 
			if (t.tagName !== 'A') return;
			else{
				var link=t.href;
				if( link.indexOf('#') >-1) {  //found hashtag
					var hashtag= link.split('#')[1];  //var match = url.match(/#.*[?&]locale=([^&]+)(&|$)/);   return(match ? match[1] : "");(^|\s)(#[a-z\d-]+)
					var sanitized_link= link.replace( location.href.split('#')[0] ,"");
					if(link.indexOf(location.href) >-1 || sanitized_link.charAt(0)=='#') { //if conains current link, or starts with #
						location.hash=hashtag;
					}
				}
			}
		}

		if (document.addEventListener) document.addEventListener('click', MyCallbackTemp, false);
		else document.attachEvent('onclick', MyCallbackTemp);	
	},
	
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},

	addQueryArg(name,value, url)
	{
		var url = url || location.href;
		return url + (url.indexOf("?")<0 ? "?":"&") +escape(name)+"="+escape(value);
	},
	buildQueryString(params){
		if (!params)  return '';
		return Object.entries(params)
			.map(([key, value]) => {
				return `${key}=${encodeURIComponent(value)}`;
			})
			.join('&');
	},

	// find home url (in wordpress)
	wpHomeUrl  (){
		var matches = /(href|src)\=\"(.*?)wp-content\//.exec(document.getElementsByTagName('head')[0].innerHTML);
		if (typeof matches !== 'undefined' && matches != null && matches.length > 1 ){
			homeURL = matches[2];
		}
	},
	  
  
	LoadYoutubeApi(callback)
	{
		//  This code loads the IFrame Player API code asynchronously.
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		window.onYouTubeIframeAPIReady= function(){
			callback();
		};
	},

    argvsString(){ return process.argv[2]; },
    argvsArray(){ return process.argv.slice(2); },
	argvs(){ 
		let argvs= this.argvsArray();
		let KeyValues= {};
		for (let i=0; i<argvs.length; i++){
			let argumentString = argvs[i]; // each argument
			let pair = {}; 
			if ( argumentString.includes('=') ){
				pair = this.parseQuery(argumentString);
			} else {
				pair[argumentString] = undefined;
			}
			let pairKey= Object.keys(pair)[0];
			// if member already exists (i.e: cli  key1=val1 key2=val2 key1=xyz..)
			if (pairKey in KeyValues){
				// if not array yet
				if (!Array.isArray(KeyValues[pairKey]))
				{
					KeyValues[pairKey] = [ KeyValues[pairKey], pair[pairKey]];
				}  
				// if already array-ed
				else {
					KeyValues[pairKey] = KeyValues[pairKey].concat([pair[pairKey]]);
				}
			} else {
				KeyValues = Object.assign (KeyValues, pair);
			}
		}
		return KeyValues;
	},
	argv(which, def = undefined){ 
		let KeyValues= this.argvs();
		return (which in KeyValues ? KeyValues[which] : def);
	},
	argvIsSet(which){
		return this.inArray(which, this.argvsArray()) || this.argv(which)!=undefined;
	},

	
	parseQuery(queryString) {
		let query = {};
		let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
		for (let i = 0; i < pairs.length; i++) {
			let pair = pairs[i].split('=');
			let p2 =decodeURIComponent(pair[1] || '');
			try { 
				p2=JSON.parse(p2); 
			}
			catch(ex){ 
				p2=p2;
			}
			query[decodeURIComponent(pair[0])] = p2;
		}
		return query;
	},
	
	//https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
	//  $(window).on('DOMContentLoaded load resize scroll', handler);
	//function myHandler(el) {
    //   var visible = isElementInViewport(el);
    //}
	
	isElementInViewport (el) {
		// Special bonus for those using jQuery
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}

		var rect = el.getBoundingClientRect();

		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
			rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
		);
	},


	//state url change
	//function processAjaxData(response, urlPath){
	//	document.getElementById("content").innerHTML = response.html;
	//	document.title = response.pageTitle;
	//	window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
	//}
	//window.onpopstate = function(e){
	//	if(e.state){
	//		document.getElementById("content").innerHTML = e.state.html;
	//		document.title = e.state.pageTitle;
	//	}
	//};

	autoSizeTextareas(className)
	{
		let tx = document.querySelector(className);
		for (let i = 0; i < tx.length; i++) {
			tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
			var oninput = function () {
			  this.style.height = 'auto';
			  this.style.height = (this.scrollHeight) + 'px';
			};
			tx[i].addEventListener("input", OnInput, false);
		}
	},

	getAllMethods(obj, inherited_too)
	{
		var methods = [];
		for (var m in obj) {
			if (typeof obj[m] == "function" && ( inherited_too || obj.hasOwnProperty(m)) ) {
				methods.push(m);
			}
		}
		return methods;
	},
	
	hasMethod(obj, funcName, inherited_too)
	{
		if (obj==null) return null;
		
		for (var m in obj) {
			if (typeof obj[m] == "function" && ( inherited_too || obj.hasOwnProperty(m)) ) {
				if (funcName==m) return true;
			}
		}
		return false;
	},
	

	ConvertToHourMinSec(time){	//Output like "1:01" or "4:03:59" or "123:03:59" 
		var hrs = ~~(time / 3600);	var mins = ~~((time % 3600) / 60);	var secs = time % 60;
		var hms="";  hms +=""+hrs+":"+(mins< 10 ? "0":"");  hms +=""+mins+":"+(secs<10 ? "0":"");  hms +=""+secs;  return hms;
	},

	// =========== get device sizes ==========//
	// http://ryanve.com/lab/dimensions/
	getWindowSize(){
		return {x:document.documentElement.clientWidth,  y:document.documentElement.clientHeight} ;
	},

	removeItem(arr, value) {
		var i = 0;
		while (i < arr.length) {
			if(arr[i] === value) {
				arr.splice(i, 1);
			} else {
				++i;
			}
		}
		return arr;
	}, 
	removeItemOnce(arr, value) { 
		var index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	},
	toggleItemInArray(array, value, condition)
	{
		if (condition) array.push(value);
		else this.removeItemOnce(array,value);
		return array;
	},

	
	
	getScrollbarWidth() {
		var outer = document.createElement("div");
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		outer.style.msOverflowStyle = "scrollbar";
		document.body.appendChild(outer);
		var widthNoScroll = outer.offsetWidth;
		outer.style.overflow = "scroll";
		var inner = document.createElement("div");
		inner.style.width = "100%";
		outer.appendChild(inner); 
		var widthWithScroll = inner.offsetWidth;
		outer.parentNode.removeChild(outer);
		return widthNoScroll - widthWithScroll;
	}, 

	// animation-css https://codepen.io/AKGD/pen/yvwQYZ
    animationClick(element, animation, removeOrNot){
		var $=jQuery;
		element = $(element);
		element.click(
			function() {
				element.addClass('animated ' + animation);
				//wait for animation to finish before removing classes
				if(removeOrNot){
					window.setTimeout( function(){
							element.removeClass('animated ' + animation);
					}, 2000);
				}
			}
		);
    },
	
    animationClickTarget(element, target, animation, removeOrNot){
		var $=jQuery;
		element = $(element);
		element.click(
			function() {
				target.addClass('animated ' + animation);
				//wait for animation to finish before removing classes
				if(removeOrNot){
					window.setTimeout( function(){
							element.removeClass('animated ' + animation);
					}, 2000);
				}
			}
		);
    },


	dateUtils : {
		//  0940 type time-ints
		isBetweenHMS(target, start,  end,  equality) { }, // datetime, int/datetime, int/datetime, bool
		equalDays(d1,d2) { 
			return d1.getYear()==d2.getyear() && d1.getMonth()==d2.getMonth() && d1.getDate()==d2.getDate();
		}, // DateTime, DateTime
		IsTodayStart(dt) { }, // DateTime
		GetWeekOfMonth(dt) { }, // DateTime
		GetWeekOfYear(dt) { }, // DateTime
		GetQuarter(dt) { }, // DateTime
		NumberToHMSstring(hhmmss) { }, // int
		// ZZ incorrect, need LOCAL/UTC: DatetimeToHMSstring(dt) { }, // DateTime
		// HMSToTimeSpan(hhmmss) { }, // int
		addNumberToHMS(hhmmss, added_or_subtracted) { }, // int, int
		DatetimeToStringUtc(dt, withMS = true, withTZ = true) {
			var str = (new Date( dt || new Date() )).toISOString();
			let finalStr = (withTZ ? str : str.replace("T", " ").replace("Z", ""));
			return withMS ? finalStr : finalStr.split('.')[0]; //2022-07-09 15:25:00.276
		},
		DatetimeToStringLocal(dt, withMS = true, withT = false) {
			const str = (dt || new Date()).toLocaleString('sv', {year:'numeric', month:'numeric', day:'numeric', hour:'numeric', minute:'numeric', second:'numeric', fractionalSecondDigits: 3}).replace(',', '.');
			let finalStr = (withT ? str.replace(' ', 'T') : str);
			return withMS ? finalStr : finalStr.split('.')[0]; //2022-07-09 19:25:00.276
		},
		// in some langs, the date object has distinctions, so the two below needs separated methods. However, the "date" object returned from them, are same, just the representation can be local or UTC depending user.
		StringToDatetimeUtc(str, format, culture) { return new Date(str); }, 
		StringToDatetimeLocal(str, format, culture) { return new Date(str); }, 
		DatetimeUtc() {  
			var now = new Date();
			var utc = new Date(now.getTime()); // + now.getTimezoneOffset() * 60000 is not needed !!!!!!
			return utc;
		}, UtcDatetime() { return this.DatetimeUtc(); },
		// UTC
		TimestampUtc() { 
			return Math.floor(new Date().getTime()); 
		}, UtcTimestamp() { return this.TimestampUtc(); },
		//i.e. input:  "2021-03-08 11:59:00"      |  output : 1650000000000 (milliseconds)  
		// [DONT CHANGE THIS FUNC, I'VE REVISED]
		DatetimeToTimestampUtc(dt) { 
			let offset = this.getOffsetFromUtc();
			return ((((new Date( dt )).getTime()) / 1000) + 14400 - offset * 60* 60) * 1000; 
		}, UtcTimestampFrom(dt) { return this.DatetimeToTimestampUtc(dt); },
		TimestampUtcToDatetimeUtc(ts) {
			var d = new Date(ts);
			d.setHours(d.getHours());
			return d;
		}, UtcTimestampToUtcDatetime(ts) { return this.TimestampUtcToDatetimeUtc(ts); },
		// shorthands
		MaxDate(d1, d2, d3=null) {},
		MinDate(d1, d2, d3=null) {},
		localDatetimeToUtcString(dt){ },
		areSameDays(d1, d2){ },


		// ##### added to JS #####
		GetDayOfYear(dt) { return (dt || new Date()).getUTCDate(); },
		StringToUtcString(str) {
			return str.indexOf ('Z') > -1 || str.indexOf ('GMT') > -1 ? str : str  + ' GMT+0000';
		},
		//i.e. input:  1650000000000 (milliseconds)   |  output : "2021-03-08 11:59:00"
		UtcTimestampToLocalDatetime(ts) {
			var d = new Date(ts);
			d.setHours(d.getHours()); // + (offset==null) offset = this.getOffsetFromUtc(); 
			return d;
			// if (offset==null) offset = this.getOffsetFromUtc(); 
			// var d = new Date(time); 
			// var utc = d.getTime() + (d.getTimezoneOffset() * 60000);  //This converts to UTC 00:00
			// var nd = new Date(utc + (3600000*offset));    
			// return nd; return nd.toLocaleString();
		},
		//i.e. input:  1650000000000 (milliseconds)   |  output : "2021-07-14T21:08:00.000Z"
		// [DONT CHANGE THIS FUNC, I'VE REVISED]
		UtcTimestampToUtcDatetimeString_OLD_CORRECT(epochtime, withTZ){
			let d = new Date(epochtime);
			let str =d.toISOString();
			return (withTZ ? str : str.replace("T", " ").replace("Z", ""));
		}, 
		UtcTimestampToUtcDatetimeString(epochtime, withTZ){
			let d = this.UtcTimestampToUtcDatetime(epochtime);
			return this.DatetimeToStringUtc(d, true, withTZ);
		}, 
		getOffsetFromUtc(){
			var dt = new Date();
			return -dt.getTimezoneOffset()/60;
		},
		// https://stackoverflow.com/questions/8579861/how-to-convert-milliseconds-into-a-readable-date
		stringToDate(str){  // i.. "2021-04-05 15:59:55 GMT+4"
			return new Date( Date.parse(str) );
		},
		msGoneAfter(date){
			return (new Date()-date);
		},
		getYMDHISFfromDate(dt){
			return [1900 + dt.getYear(), dt.getMonth()+1, dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()];
		}, 
		prefixWithZero(num, digits){
			return (digits===1 ? num : (digits===2 ? (num < 10 ? "0"+num : num ) : (digits===3 ? (num < 10 ? "00"+num : (num < 100 ? "0"+num : num ) ) : num ) ) ).toString();
		},
		currentDatetimeIs(targetDate){ //"2021-03-30 13:33:45 GMT+0300"
			var curr_dt = new Date( Date.now() ); 
			var target_dt= new Date( Date.parse(targetDate) );
			return curr_dt.getYear() ==target_dt.getYear() && curr_dt.getMonth() ==target_dt.getMonth() && curr_dt.getDate() ==target_dt.getDate() && curr_dt.getHours() ==target_dt.getHours() && curr_dt.getMinutes() ==target_dt.getMinutes() && curr_dt.getSeconds() ==target_dt.getSeconds();
		},
		dateCompare(date1, date2){ 
			var date1 = puvox_library.isString(date1) ? Date.parse(date1) : date1;
				date1 = new Date( date1 );
			var date2 = date2 || new Date(Date.now());  
			return (+date1 > +date2 ? 1 : +date1 < +date2 ? -1 : 0);
		},
		dateTill(date1, date2){ 
			var date1 = puvox_library.isString(date1) ? Date.parse(date1) : date1;
			date1 = new Date( date1 );
			var date2 = date2 || new Date(Date.now()); 
			var diff = new Date(date1.getTime()-date2.getTime());
			return diff;
		},
		secondsTill(date1, date2){ 
			var date1 = puvox_library.isString(date1) ? Date.parse(date1) : date1;
			date1 = new Date( date1 );
			var date2 = date2 || new Date(Date.now()); 
			var diffS = date1.getTime()-date2.getTime();
			var seconds =  Math.round(diffS/1000);
			return seconds;
		},	  
		
		/**
		* Adds time to a date. Modelled after MySQL DATE_ADD function.
		* Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
		* https://stackoverflow.com/a/1214753/18511
		* 
		* @param date  Date to start with
		* @param interval  One of: year, quarter, month, week, day, hour, minute, second
		* @param units  Number of units of the given interval to add.
		*/
	   	add(date, interval, units) {
			if(!(date instanceof Date))
				return undefined;
			var ret = new Date(date); //don't change original date
			var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
			switch(String(interval).toLowerCase()) {
				case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
				case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
				case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
				case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
				case 'day'    :  ret.setDate(ret.getDate() + units);  break;
				case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
				case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
				case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
				default       :  ret = undefined;  break;
			}
			return ret;
	    },
		// this approach is correct, the other one: https://pastebin_com/GwsScXx1  has strange bug in node, might relate to: https://stackoverflow.com/a/19691491/2377343
		addSeconds(date, seconds){ 
			return new Date( Date.parse(date) + seconds*1000 );
		},
		addDays(date, days){ 
			var result = new Date(date);
			result.setDate(result.getDate() + days);
			return result;
		}
	},



	spinner(action)
	{
		var spinner_id = "puvox_spinner";
		if(action)
		{
			var div=
			'<div id="'+spinner_id+'" style="background:black; position:fixed; height:100%; width:100%; opacity:0.9; z-index:9990;   display: flex; justify-content: center; align-items: center;">'+
				'<div style="">Please Wait...</div>'+
			'</div>';
			document.body.insertAdjacentHTML("afterbegin", div);
		}
		else
		{
			var el = document.getElementById(spinner_id);
			if (el) {
				el.parentNode.removeChild(el);
			}
		}
	},



	contains(string, pattern){
		var re = new RegExp(pattern);
		return (re.test(string));
	},
	
	hide_show_transprent(el, hide){
		if(hide){
			el.css("opacity", 0.3);
			el.css("z-index", -1);
		}
		else if(!hide){
			el.css("opacity", 1);
			el.css("z-index", 0);
		}
	},
		
	get_extension_from_url( url ) {
		return url.split(/\#|\?/)[0].split('.').pop().trim();
	},
	
	
	oneSpace(cc){
		return cc.replace(/\s\s+/g, ' ');
	},
	removeFirstAndLastChar(cc){
		return this.oneSpace( cc.substring(1, cc.length-1 ) );
	},
	getWithin_X(cc, x){
		return this.oneSpace( cc.replace(new RegExp('(.*?)'+x+'(.*)'+x+'(.*)', 'g'), '$2')  );
	},
	getWithin_XY(cc, x, y){
		return this.oneSpace( cc.replace(new RegExp('(.*?)'+x+'(.*)'+y+'(.*)', 'g'), '$2')  );
	},
	// https://stackoverflow.com/q/6462578/2377343
	removeIfOutsideQuotes(content, replaceWhat, replaceWith){ 
		var regex = new RegExp('"[^"]+"|('+replaceWhat+')','g');
		let replaced = content.replace(regex, function(m, group1) {
			if (!group1) return m;
			else return replaceWith;
		});
		return replaced;
	},
	// https://stackoverflow.com/questions/19414193/regex-extract-string-not-between-two-brackets
	// https://stackoverflow.com/questions/62616023/regex-split-if-not-inside-the-two-characters
	splitBy_X_NotInside_Y(str, x, y) //x: split by; y: not inside
	{
		return str.split( RegExp(x+'+(?=(?:(?:[^'+y+']*"){2})*[^'+y+']*$)', 'g' ) );
	},
	splitBy_X_NotInside_YZ(str, by, y, z) //x: split by; y&z: not inside
	{
		return str.split( RegExp(by+'+(?=(?:(?:[^'+y+']*"){2})*[^'+z+']*$)', 'g' ) );
	},
	splitOnlyFirstOccurence(str, what){
		return str.split(new RegExp(what+'(.+)'));
	},
	//equal
	splitByEqualNotInsideDoubleQuotes(str)
	{
		return str.split(/\=+(?=(?:(?:[^"]*"){2})*[^"]*$)/g);
	},
	//double equals
	splitByEqualNotInsideDoubleQuotesAndDoubleEquals(str)
	{
		let newStr = str.replace(/==/g, "__DOUBLE_EQUAL__RAND294393494__");
		return newStr.split(/\=+(?=(?:(?:[^"]*"){2})*[^"]*$)/g).map(x=> x.replace(/__DOUBLE_EQUAL__RAND294393494__/g,"==") );
	},
	
	splitByNotInside2(str, splitChar,notInsideCharStart,notInsideCharEnd)
	{
		var str = 'a:0 b:1 moo:"foo bar" c:2';
		var parts = [];
		var currentPart = "";
		var isInQuotes= false;

		for (var i = 0; i < str.length; i++) {
		  var char = str.charAt(i);
		  if (char === " " && !isInQuotes) {
			parts.push(currentPart);
			currentPart = "";
		  } else {
			currentPart += char;
		  }
		  if (char === '"') {
			isInQuotes = !isInQuotes;
		  }
		}

		if (currentPart) parts.push(currentPart);
	},

	// i.e. if you want to get from first to last correct brackets 
	//		 start ( "a1)" "b1)" 'c1)' ) aaaaa )  bbbbb ) cccccc)
	getFromX_tillY_ExcudingQuotes(content, from, till, regex_index) {
		let from_ = from; //this.escapeRegExp(from);
		let matches= content.match( new RegExp(from_+"(.*)", 's'));
		let result = "";
		let till_strlen= till.length;
		if (matches != null )
		{
			let foundPart= matches[regex_index];
			let lettersArray = foundPart.split('');
			//
			let dQuote = '"';	let dQuote_active = false;
			let sQuote = '\'';	let sQuote_active = false;
			//
			let lastChar_='';
			let escapeChar_='\\';
			let currentStr ='';
			let currentStr_last ='';
			for(let char_ of lettersArray)
			{
				currentStr += char_;
				//if last char was escape, we can ignore current one
				if (lastChar_ != escapeChar_)
				{
					if (char_ == dQuote)
					{
						dQuote_active = !dQuote_active;
					}
					else if (char_ == sQuote)
					{
						sQuote_active = !sQuote_active;
					}
					//
					if (!sQuote_active && !dQuote_active)
					{
						let currLength = currentStr.length;
						let lastPossibleStr = currentStr.substring(currLength-till_strlen);
						if ( lastPossibleStr == till )
						{
							result = currentStr_last;
							break;
						}
					}
				}
				currentStr_last	= currentStr;
				lastChar_		= char_;
			}
		}
		return result;
	},
	
	// https://stackoverflow.com/questions/9621825/escape-a-variable-within-a-regular-expression
	preg_quote(str, delimiter) {
		return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
	},
	escapeRegExp(string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	},

	splitStringIntoChars(str){
		return str.split(/(?=[\s\S])/u);
	},
	
	empty(MyVar){ return this.is_empty_or_undefined(MyVar);},
	is_empty_or_undefined (MyVar)
	{
	   return ( 
			(typeof MyVar== 'undefined')
						||
			(MyVar == null) 
						||
			(MyVar == false)
						||
			(!MyVar)
						||
			(MyVar.length == 0)
						||
			(MyVar == "")
						||
			(MyVar.replace(/\s/g,"") == "")
						||
			(!/[^\s]/.test(MyVar))
						||
			(/^\s*$/.test(MyVar))
	  );
	},
	isEmptyValue(input){
		//input is considered empty value: falsy value (like null, undefined, '', except false and 0),
		// string with white space characters only, empty array, empty object
		return (!input && input !== false && input !== 0) ||
			((input instanceof String || typeof input === 'string') && !input.trim()) ||
			(Array.isArray(input) && !input.length) ||
			(input instanceof Object && !Object.keys(input).length);
	},
	removeEmptyValue (obj) {
		if (!(obj instanceof Object))
			return {};
		Object.keys(obj).forEach(key => this.isEmptyValue(obj[key]) && delete obj[key]);
		return obj;
	},
	isIterable(obj) {
		if (obj == null) { return false; }
		return typeof obj[Symbol.iterator] === 'function';
	},
	insertRedErrorLine(array_){
		var array = array_;
		array["position"] = array["position"] || "before";
		array["duration"] = array["duration"] || 2500;
		array["fadeout"]  = array["fadeout"]  || 1000;
		var mid_parent= $('<div/>');
		mid_parent.html(array["element"]);
		mid_parent.addClass("ui-state-error");
		if(array["position"]=="before" ) {	mid_parent.prependTo(array["parent"]);  }
		else {	mid_parent.appendTo(array["parent"]);}
		mid_parent.attr("style", "display:inline-block; padding:8px;  margin:10px; text-align:center;");
		mid_parent.delay(array["duration"]).fadeOut( array["fadeout"] , function() {
			$(this).hide();
		  }
		);
	} ,

	// more from locutus: https://github.com/locutusjs/locutus/blob/master/src/php
	stripTags (input, allowed) {
		allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
		const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
		const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
		return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
		return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
		});
	},

	br2nl(content) { return content.replace('/\<br(\s*)?\/?\>/i', "\n"); },

	jquery_popup(element, isModal, params){
		var isModal = isModal || true;
		var params = params || {};
		var width = params.hasOwnProperty('width') ? params.width : 340;
		var height = params.hasOwnProperty('height') ? params.height : 210;
	 
		return $(element).clone().dialog(
		{
			width : width,
			height : height,
			modal: isModal, 
			open: function() {
				$('.ui-widget-overlay').addClass('custom-overlay');
				$('body').append('<div id="custom_overlay"><style>.ui-widget-overlay {opacity:0.8; font-size: 0.95em; }</style></div>');
				//$('body').append('<div id="custom_overlay1"><style>#custom_overlay1{background:black; position:absolute; top:0; left:0; width:100%; height:100%; min-height:2000px;}</style></div>');
				$(this).parent().focus(); //remove focus from first input
			},
			close: function(event, ui)
			{
				$(this).dialog("close");
				$(this).remove();
				$("#custom_overlay").remove();
			}   
		});  
	},
	jquery_popup_once(cookiename, key, text, duration, onComplete){
		var text = text;
		var cookieVal = this.Cookies.getOption(cookiename, "popup_shown_"+key, "true");
		var onComplete = onComplete || function(){};
		if(cookieVal=="true")
		{
			text = '<div>'+text+'</div>';
			var pp = this.jquery_popup(text, true, {});
			this.Cookies.setOption(cookiename, "popup_shown_"+key, "false"); 
			var duration = (duration || 99999);
			window.setTimeout( function() { onComplete();}, duration ); // 
		}
		else{
			onComplete();
		}
	},
	
	jquery_popup_one_time_checkbox(cookiename, key, text, callable_func, defaultCheckboxTxt){
		var defaultCheckboxTxt = defaultCheckboxTxt || '<div class="dialog_dont_show_again" style=" bottom:0; right:0; font-size:0.7em; background:#e7e7e7; width:100%; margin: 2px; padding: 2px; display: inline-block;"><input type="checkbox" onclick="PuvoxLibrary.dialog_dont_show_again(event, \''+key+'\', \''+cookiename+'\')" /><span class="dont_show_again_inner">Don\'t show this window again</span></div>';
		var text = '<div class="popup_container" style="position:relative"><div class="popupMainText">'+text+'</div>'+ defaultCheckboxTxt+'</div>';
		var cookieVal = this.Cookies.getOption(cookiename, "popup_checkbox_"+key, "true");
		if(cookieVal=="true")
		{
			text = '<div>'+text+'</div>';
			var pp = this.jquery_popup(text, true, {});
			window.setTimeout( function() { $(".dialog_dont_show_again" ).focus();}, 1500); // 
		}
		else
		{
			callable_func();
		}
	},
	dialog_dont_show_again(event, key, cookiename)
	{
		this.Cookies.setOption(cookiename, "popup_checkbox_"+key, (event.target.checked ? "false" : "true") ); 
	},
	
	dialogClose(){
		window.parent.$('.ui-dialog-content:visible').dialog('close');
	},
	
	
	
	
	mergeObjects(obj1, obj2){
		for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
		return obj1;
	},

	// returns a new object with the values at each key mapped using mapFn(value)
	objectMap(obj, fn) {
		return Object.fromEntries(
			Object.entries(obj).map(
				([k, v], i) => [k, fn(v, k, i)]
			)
		)
	},

	fancyTimeFormat(time)
	{   
		var time = time.toFixed(0);
		// Hours, minutes and seconds
		var hrs = ~~(time / 3600);
		var mins = ~~((time % 3600) / 60);
		var secs = Math.floor((time-0.01) % 60).toFixed(0);

		// Output like "1:01" or "4:03:59" or "123:03:59"
		var ret = "";

		if (hrs > 0) {
			ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}
		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;
		return ret;
	},

	getYtIdFromURL(URL_or_ID){
		var id; 
		var URL_or_ID= URL_or_ID.trim();
		if(URL_or_ID.length == 11){
			id= URL_or_ID;
		}
		else{
			var r=URL_or_ID.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/); 
			id = r[1];
		}
		return id;
	},

	//
	jsonToArray(json_data){
		var result = [];
		//for(var i in json_data)	result.push([i, json_data[i]]);
		result = Object.keys(json_data).map((key) => [key, json_data[key]]);
		return result;
	},
	
	fixEntitiedJson(json_data){
		return json_data.replace(/&#34;/g,'"');
	},
	
	
	setSelectByOptionName(selectEl, optName){
		selectEl.find('option').filter(function () { var txt=$(this).html(); return (txt==optName); }).prop('selected', true);
	},
	ScrollTo(el, func, offset_distance)  //setHashInAddress
	{
		var offset_distance= offset_distance || 0;
		//document.querySelector(el).scrollIntoView({ behavior: 'smooth' });
		$('html, body').animate({
			scrollTop: $(el).offset().top - offset_distance
		}, 1000, func);
	},
	sleep(ms) {
		return new Promise(resolve => this.setTimeout_safe(resolve, ms));
	},
	// immitating ccxt setTimeout
	setTimeout_safe (done, ms) {
		const self = this; const targetTime = Date.now() + ms; if (ms >= 2147483647) { throw new Error ('setTimeout() function was called with unrealistic value of ' + ms.toString ()); }  let clearInnerTimeout = () => {}; let active = true; const id = setTimeout (() => { active = true; const rest = targetTime - Date.now (); if (rest > 0) { clearInnerTimeout = self.setTimeout_safe (done, rest, setTimeout, targetTime); } else { done (); } }, ms); return function clear () { if (active) { active = false; clearTimeout (id); } clearInnerTimeout (); };
	},

	scrollToBottom2(el)  //setHashInAddress
	{
		if (el && el[0])
			el.scrollTop(el[0].scrollHeight - el.height());
	},
	scrollToBottom(el_or_id) {
		var el = this.isObject(el_or_id) ? el_or_id : document.querySelector(el_or_id);
		el.scrollTop = el.scrollHeight - el.clientHeight;
	},
	
	scrollToBottom3(el_or_id) {
		var el = this.isObject(el_or_id) ? el_or_id : document.querySelector(el_or_id);
		el.scrollTop(el.scrollHeight - el.height());
	},
	
	
	// scroll to 
	smooth_scroll_to(selector)
	{
		$('html, body').animate({
			scrollTop: $(selector).offset().top-100
		}, 1000);
	},

	
	addLine(selector, text, first_or_last){
		let elem = this.isObject(selector) ? selector : document.querySelector(selector);
		elem.insertAdjacentHTML("beforeend", "\r\n - "+text);
	},
	removeLine(selector, first_or_last, ifMoreThanXlines) {
		let elem = this.isObject(selector) ? selector : document.querySelector(selector);
		//c( "a"+this.removeLineFromText(elem.innerHTML, first_or_last, ifMoreThanXlines));
		elem.innerHTML = this.removeElementFromElement(elem.innerHTML, first_or_last, ifMoreThanXlines);
	},

	removeElementIfMoreThan(el, amount, first_or_last){
		let childs = el.children; 
		if (childs.length>amount)
		{
			el.children[0].remove();
		}
	},
	
	removeElementIfMoreThanNEW(el, amount, first_or_last){
		let newEl = el.cloneNode(true);
		this.removeElementIfMoreThan(newEl, amount, first_or_last);
		return newEl;
	},
	
	//  if(setHashInAddress) {	window.location.hash = id_or_Name;	}
	removeLine_old(selector, first_or_last, ifMoreThanXlines) {
		let elem = document.querySelector(selector);
		let text = elem.value;

		let splited= text.split(/\n/g);
		let val  = splited.filter(function(n){
			return n;
		});
		var ifMoreThanXlines= ifMoreThanXlines || false;
		if (!ifMoreThanXlines || splited.length>ifMoreThanXlines) {
			if(first_or_last) val.shift(); 
			else val.pop();
		}
		elem.value=val.join('\n') + '\r\n';
	},

	removeLineFromTextarea(selector, first_or_last, ifMoreThanXlines) {
		let elem = document.querySelector(selector);
		elem.value = this.removeLineFromText(elem.value, first_or_last, ifMoreThanXlines);
	},
	removeLineFromText(text, first_or_last, ifMoreThanXlines)
	{
		var ifMoreThanXlines= ifMoreThanXlines || 0;
		let splited= text.split(/\n/g);
		if (ifMoreThanXlines && splited.length<ifMoreThanXlines) {
			return text;
		}
		if (first_or_last) 
			return text.substring(lines.indexOf("\n") + 1);
		else{
			let val  = splited; //.filter(function(n){      return n;     });
			if(first_or_last) val.shift(); 
			else val.pop();
			return val.join('\n') + '\r\n';
		}
	},
	
	
    arrayColumn(array, col)
    {
        return array.map(function(value,index) { return value[col]; });
    }, 
	arrayPart(array_, amount_, from)
	{
		var from = from || 'start'; //start|end
		let count = array_.length;
		return count<=amount_ ? array_ :  ( from=='start' ? array_.slice(0, amount_) :  array_.slice(-amount_) );
	},
	arrayInsertAt(array, index, value){
		return array.splice(index, 0, value);
	},
	executeAfterTry(el, func, num)
	{
		var num=num || 0;
		if (num>20) return;
		else 
		{
			var this_ = this;
			if( $(el).length ) func();
			else setTimeout( function(){ this_.executeAfterTry(el, func, num+1); }, 100 );
		}
	},
		
	waitExecute(el, func)
	{
		var this_ = this;
		if( jQuery(el).length ) func();
		else setTimeout( function(){ this_.waitExecute(el, func); }, 700 );
	}, 
	
	// https://stackoverflow.com/a/41407246/2377343
	consoleLogColor (text, backgroundColor=null, foregroundColor=null) {
		const prefix = '\x1b[';
		const suffix = 'm';
		const objectTree = {
			types: { reset: "0", bright: "1", dim: "2", underscore: "4", blink: "5", reverse: "7", hidden: "8", },
			foreground: { black: "30", red: "31", green: "32", yellow: "33", blue: "34", magenta: "35", cyan: "36", white: "37", },
			background: { black: "40", red: "41", green: "42", yellow: "43", blue: "44", magenta: "45", cyan: "46", white: "47", }
		};
		let backColorString = '';
		let foreColorString = '';
		if (backgroundColor) {
			backColorString = prefix + objectTree['background'][backgroundColor] + suffix;
		}
		if (foregroundColor) {
			foreColorString = prefix + objectTree['foreground'][foregroundColor] + suffix;
		}
		console.log (backColorString + foreColorString + "%s" + prefix + objectTree.types.reset + suffix, text);
	},
	
	toggleWindowsMessages_WindowConfirm() { return window.confirm },
	toggleWindowsMessages_WindowAlert() { return window.alert },
	toggleWindowsMessages(enable){
		if (enable)
		{
			window.confirm = this.toggleWindowsMessages_WindowConfirm();
			window.alert   = this.toggleWindowsMessages_WindowAlert();
		}
		else
		{
			window.confirm = function() { return true; };
			window.alert   = function() {};
		}
	},
	suspressMessagesExecution(func){
		var alert_	= window.alert;
		var confirm_= window.confirm;
		window.confirm = function() { return true; };
		window.alert   = function() {};
		func();
		window.confirm = alert_;
		window.alert   = confirm_;
	},
			
			
	MakeIframeFullHeight (iframeElement, cycling, overwrite_margin){
		cycling= cycling || false;
		overwrite_margin= overwrite_margin || false;
		iframeElement.style.width	= "100%";
		var ifrD = iframeElement.contentDocument || iframeElement.contentWindow.document;
		var mHeight = parseInt( window.getComputedStyle( ifrD.documentElement).height );  // Math.max( ifrD.body.scrollHeight, .. offsetHeight, ....clientHeight,
		var margins = ifrD.body.style.margin + ifrD.body.style.padding + ifrD.documentElement.style.margin + ifrD.documentElement.style.padding;
		if(overwrite_margin) { if(margins=="") { margins=0;  ifrD.body.style.margin="0px"; } }
		(function(){
		   var interval = setInterval(function(){
			if(ifrD.readyState  == 'complete' ){
				setTimeout( function(){ 
					if(!cycling) { setTimeout( function(){ clearInterval(interval);}, 500); }
					iframeElement.style.height	= (parseInt(window.getComputedStyle( ifrD.documentElement).height) + parseInt(margins)+1) +"px"; 
				}, 200 );
			} 
		   },200)
		})();
			//var funcname= arguments.callee.name;
			//window.setTimeout( function(){ console.log(funcname); console.log(cycling); window[funcname](iframeElement, cycling); }, 500 );	
	},

	in_array(needle, haystack) {
		for(var i in haystack) {
			if(haystack[i] == needle) return true;
		}
		return false;
	},

	CreateFrameIn(targetEl, frameContent, MakeItfullWH){	
		var MakeItfullWH = MakeItfullWH || false;
		var iframe = document.createElement('iframe');
		iframe.className="innerFrame innerFrame"+this.RandomNum(999999);
		iframe.style.padding="0px";
		targetEl.innerHTML = "";
		targetEl.appendChild(iframe);
		var ifr = iframe.contentWindow.document;
		ifr.open(); ifr.write("<body>"+frameContent+"</body>");	ifr.close();   //!!! dont use: ifr.body.insertAdjacentHTML("afterBegin", frameContent);
		if(MakeItfullWH){
			this.MakeIframeFullHeight(iframe);
		}
		return iframe;
	},

	makeAllATargetBlank(el){
		if(!el) return;
		var els=el.getElementsByTagName("a");
		for(var i=0; i<els.length; i++){
			if(els[i]){
				els[i].setAttribute("target", "_blank");
			}
		}
	},

	createDropdownFrom(arr, elementId, jqueriUi, appendToElement){
		var jqueriUi = jqueriUi || false;
		var appendToElement = appendToElement || false;
		var html=  '<select id="'+elementId+'">';
	//	if(arr instanceof Object){
		for(var i in arr ){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>';
		}
		html += '</select>';
		if(appendToElement && jqueriUi){
			appendToElement.append( html );
			$(elementId).selectmenu();
		}
		return html;
	},

	//=====

	b64EncodeUnicode(str) {
		// first we use encodeURIComponent to get percent-encoded UTF-8,
		// then we convert the percent encodings into raw bytes which
		// can be fed into btoa.
		return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
			function toSolidBytes(match, p1) {
				return String.fromCharCode('0x' + p1);
		}));
	},

	b64DecodeUnicode(str) {
		// Going backwards: from bytestream, to percent-encoding, to original string.
		return decodeURIComponent(atob(str).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	},

	round(num,decimals){
		let v=Math.pow(10,decimals); return Math.round((num + Number.EPSILON) * v) / v;   //toFixed
	},


		

	// ============================= get basename of url ============================
	basename(path) {   return path.split('/').reverse()[0];	},

		
	// ======== simple POPUP  ======== https://github.com/ttodua/useful-javascript/ ==============
	show_my_popup(TEXTorID, AdditionalStyles ){
			TEXTorID=TEXTorID.trim(); var FirstChar= TEXTorID.charAt(0); var eName = TEXTorID.substr(1); if ('#'==FirstChar || '.'==FirstChar){	if('#'==FirstChar){var x=document.getElementById(eName);} else{var x=document.getElementsByClassName(eName)[0];}} else { var x=document.createElement('div');x.innerHTML=TEXTorID;} var randm_id=Math.floor((Math.random()*100000000));
		var DivAA = document.createElement('div');    DivAA.id = "blkBackgr_"+randm_id;  DivAA.className = "MyJsBackg";   DivAA.setAttribute("style", 'background:black; height:5000px; left:0px; opacity:0.9; position:fixed; top:0px; width:100%; z-index:99995;'); document.body.appendChild(DivAA);      AdditionalStyles= AdditionalStyles || '';
		var DivBB = document.createElement('div');    DivBB.id = 'popupp_'+randm_id;     DivBB.className = "MyJsPopup";   DivBB.setAttribute("style",'background-color:white; border:6px solid white; border-radius:10px; display:block; min-height:1%; min-width:350px; width:auto; overflow:auto; max-height:80%; max-width:800px; padding:15px; position:fixed; text-align:left; top:10%; z-index:99995; left:0px; right:0px; margin-left:auto; margin-right:auto; width:80%;'+ AdditionalStyles); 	DivBB.innerHTML = '<div style="background-color:#C0BCBF; border-radius:55px; padding:5px; font-family:arial; float:right; font-weight:700; margin:-15px -10px 0px 0px; z-index: 88; "  class="CloseButtn" ><a href="javascript:my_popup_closee('+randm_id+');" style="display:block;margin:-5px 0 0 0;font-size:1.6em;">x</a></div>'; document.body.appendChild(DivBB);z=x.cloneNode(true);DivBB.appendChild(z); if(z.style.display=="none"){z.style.display="block";}       },
		my_popup_closee(RandomIDD) { var x=document.getElementById("blkBackgr_"+RandomIDD); x.parentNode.removeChild(x);      var x=document.getElementById('popupp_'+RandomIDD); x.parentNode.removeChild(x);
	},
	// ========================================================== //



		
	// ===================== "PLEASE WAIT" popup   =============== https://github.com/ttodua/useful-javascript/ ===============
	loaderImage(circleColor){
		var circlecolor=circleColor || '#ffffff';
		return '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="90px" height="90px" viewBox="0 0 128 128" xml:space="preserve"><g><circle cx="16" cy="64" r="16" fill="'+circlecolor+'" fill-opacity="1"/><circle cx="16" cy="64" r="16" fill="'+circlecolor+'" fill-opacity="0.67" transform="rotate(45,64,64)"/><circle cx="16" cy="64" r="16" fill="#ffffff" fill-opacity="0.42" transform="rotate(90,64,64)"/><circle cx="16" cy="64" r="16" fill="'+circlecolor+'" fill-opacity="0.2" transform="rotate(135,64,64)"/><circle cx="16" cy="64" r="16" fill="'+circlecolor+'" fill-opacity="0.12" transform="rotate(180,64,64)"/><circle cx="16" cy="64" r="16" fill="'+circlecolor+'" fill-opacity="0.12" transform="rotate(225,64,64)"/><circle cx="16" cy="64" r="16" fill="'+circlecolor+'" fill-opacity="0.12" transform="rotate(270,64,64)"/><circle cx="16" cy="64" r="16" fill="'+circlecolor+'" fill-opacity="0.12" transform="rotate(315,64,64)"/><animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite"></animateTransform></g></svg>';
	},
	Loader(ShowOrHide, style, content_To_show)
	{
		var elementID = 'waiter_box_p';
		if (ShowOrHide)
		{
			var b=document.body;
			var content_To_show= (content_To_show || "") + '<br/>' +this.loaderImage();
			var x = document.createElement('div'); x.id = elementID;    x.setAttribute("style","height:120%; width:120%; position:fixed; top:-10%; left:-10%; z-index:9900; overflow:hidden;");

			x.innerHTML = 
			'<div id="'+elementID+'_background" style="background-color: black; height: 100%; position: absolute; opacity: 0.9; width: 100%;' + (style || '') + '">'+
				'<div id="'+elementID+'_content" style="height: 100%;">'+
					'<div align="center" style="text-align:center;position:relative;top:50%;transform:translateY(-50%);color:#adb109;font-size:1.2em;"> '+ content_To_show + '</div>' + 
				'</div>'+
			'</div>';
			b.insertBefore(x, b.childNodes[0]);
		}
		else{
			var x =document.getElementById(elementID); if (x) x.parentNode.removeChild(x); 
		}
	}, 
	// ========================================================== //



	// ============================= AJAX EXAMPLES  =============== https://github.com/ttodua/useful-javascript/ ===============
	myyAjaxRequest(parameters, url, method, func, ShowBlackground){ ShowBlackground= ShowBlackground || false;
		method = method.toLowerCase() || "post"; if (method  == "get") {url=url+'?'+parameters+'&MakeRandomValuedLinkToAvoidCache=' + Math.random();}
		if(ShowBlackground) {Loader(true);}	try{try{var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");} catch( e ){var xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");}}catch(e){var xmlhttp = new XMLHttpRequest();}
		xmlhttp.onreadystatechange=function(){ if (xmlhttp.readyState==4){ if(ShowBlackground) {Loader(false);}  responseee = xmlhttp.responseText; //xmlhttp.readyState + xmlhttp.status//
			func(); //execute any codes
		}}; 
		xmlhttp.open(method,url, true); 
		if (method  == "post"){xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");xmlhttp.send(parameters);}
		else if (method  == "get"){xmlhttp.send(null);}
	},
	// ========================================================== //


	//all divs, which has a classname "My_TARGET_Hiddens", will be automatically hidden on page load...
	hide_popuping_divs(classnameee){
		var elmnts = document.getElementsByClassName(classnameee); var index;
		for (index = 0; index < elmnts.length; ++index) {
			elmnts[index].style.display= "none";	//elmnts[index].className = elmnts[index].className + " my_css_hide_class";
		}
	},
	//window.onload = function(){ if(typeof MyTargetHideClass ==='String') hide_popuping_divs(MyTargetHideClass); };

	get(url, parameters) {
	  // Return a new promise.
	  return new Promise(function(resolve, reject) {
		// Do the usual XHR stuff
		var req = new XMLHttpRequest();
		req.open('POST', url);

		req.onload = function() {
		  // This is called even on 404 etc
		  // so check the status
		  if (req.status == 200) {
			// Resolve the promise with the response text
			resolve(req.response);
		  }
		  else {
			// Otherwise reject with the status text
			// which will hopefully be a meaningful error
			reject(Error(req.statusText));
		  }
		};

		// Handle network errors
		req.onerror = function() {
		  reject(Error("Network Error"));
		};
		let parameters_ = parameters || {};
		params_ = Object.keys(parameters_).map(function (key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(parameters_[key]);
		}).join('&');
		// Make the request
		req.send(params_);
	  });
	},
	getJSON(url, parameters) {
	  return this.get(url, parameters).then(JSON.parse);
	},
		
	post(url, params, callback_1, callback_2){
		return fetch(url, {
			method: 'post',
			body:JSON.stringify(params)
		}).then(function(response) {
			return response.text().then(function(text) {
				callback_1(text); 
			});
		}); // .then(function(data) { callback_error(data);  });
	},


	stringifyPretty(obj){
		return JSON.stringify(obj, null, 2);
	},

	responseStringify(obj_or_text){
		return ! this.is_object(obj_or_text) ? obj_or_text : ( 'responseText' in obj_or_text ? obj_or_text.responseText : JSON.stringify(obj_or_text) );
	},
	// ============================= getElementById from parent_node  ========== http://stackoverflow.com/a/5683184/2377343 ==========
	//Element.prototype.getElementById_FROM_PARENT = function(req) {
	getElementById_FROM_PARENT(req) {
	  var elem = this, children = elem.childNodes, i, len, id;
	  for (i = 0, len = children.length; i < len; i++) {
		elem = children[i];										// current element
		if (elem.nodeType !== 1 )  continue;					// we only want real elements
		id = elem.id || elem.getAttribute('id');				// get ID
		if (id === req) {  return elem;  }						// If it was found, then return 
		else {id=elem.getElementById_FROM_PARENT(req); if(id) return id;}	// otherwise, search recursively within the child				
	  }
	  return null;												// if no match found
	},
	// ========================================================== //


	inArray(needle, haystack) {
		return haystack.indexOf(needle) > -1;
	},
	inKeys(key, obj){
		return key in obj;
	},
	
	partialObject(object_, array_) {
		let newObj ={};
		for (let [key, value] of Object.entries(object_)) {
			if( this.inArray(key, array_)){
				newObj[key] = value;
			}
		}
		return newObj;
	},


	array_column_with_keys(object_, keyName_) {
		let new_ ={};
		for (let [key_, value_] of Object.entries(object_)) {
			if( keyName_ in value_)
				new_[key_] = value_[keyName_];
		}
		return new_;
	},
	

	// ============================= URL parameters  ============================= //
	// executed below
	GetQueryParams(url) {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var url= url || window.location.href;
	  var query_string = {};
	  var query =  url.substr(url.indexOf("?") + 1) ;
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
			// If first entry with this name
		var value= pair[0];
		if(pair.length>1){
			value = pair[1].indexOf("#") >-1 ? pair[1].split("#")[0] : pair[1];
		}
		if (typeof query_string[pair[0]] === "undefined") {
		  query_string[pair[0]] = decodeURIComponent(value);
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
		  var arr = [ query_string[pair[0]],decodeURIComponent(value) ];
		  query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
		  query_string[pair[0]].push(decodeURIComponent(value));
		}
	  } 
	  return query_string;
	},

	// executed below
	URLParser(url){
		var url= url || window.location.href;
		var path="",query="",hash="",params;
		if(url.indexOf("#") > 0){
			hash = url.substr(url.indexOf("#") + 1);
			url = url.substr(0 , url.indexOf("#"));
		}
		if(url.indexOf("?") > 0){
			path = url.substr(0 , url.indexOf("?"));
			query = url.substr(url.indexOf("?") + 1);
			params= query.split('&');
		}else
			path = url;
		let obj= {
			getHost: function(){
				var hostexp = /\/\/([\w.-]*)/;
				var match = hostexp.exec(path);
				if (match != null && match.length > 1)
					return match[1];
				return "";
			},
			getHostName: function(){
				let domain = this.getHost();
				let parts = domain.split('.');
				return parts[parts.length-2];
			},
			getPath: function(){
				var pathexp = /\/\/[\w.-]*(?:\/([^?]*))/;
				var match = pathexp.exec(path);
				if (match != null && match.length > 1)
					return match[1];
				return "";
			},
			getHash: function(){
				return hash;
			},
			getParams: function(){
				return params
			},
			getQuery: function(){
				return query;
			},
			setHash: function(value){
				if(query.length > 0)
					query = "?" + query;
				if(value.length > 0)
					query = query + "#" + value;
				return path + query;
			},
			setParam: function(name, value){
				if(!params){
					params= new Array();
				}
				params.push(name + '=' + value);
				for (var i = 0; i < params.length; i++) {
					if(query.length > 0)
						query += "&";
					query += params[i];
				}
				if(query.length > 0)
					query = "?" + query;
				if(hash.length > 0)
					query = query + "#" + hash;
				return path + query;
			},
			getParam: function(name){
				if(params){
					for (var i = 0; i < params.length; i++) {
						var pair = params[i].split('=');
						if (decodeURIComponent(pair[0]) == name)
							return decodeURIComponent(pair[1]);
					}
				}
				console.log('Query variable %s not found', name);
			},
			hasParam: function(name){
				if(params){
					for (var i = 0; i < params.length; i++) {
						var pair = params[i].split('=');
						if (decodeURIComponent(pair[0]) == name)
							return true;
					}
				}
				console.log('Query variable %s not found', name);
			},
			removeParam: function(name){
				query = "";
				if(params){
					var newparams = new Array();
					for (var i = 0;i < params.length;i++) {
						var pair = params[i].split('=');
						if (decodeURIComponent(pair[0]) != name)
							  newparams .push(params[i]);
					}
					params = newparams;
					for (var i = 0; i < params.length; i++) {
						if(query.length > 0)
							query += "&";
						query += params[i];
					}
				}
				if(query.length > 0)
					query = "?" + query;
				if(hash.length > 0)
					query = query + "#" + hash;
				return path + query;
			}
		};
		if (typeof window != 'undefined') { 
			obj = Object.assign( obj, {
				href	: window.location.href,
				protocol: window.location.protocol,
				hostname: window.location.hostname,
				host 	: window.location.host,
				port 	: window.location.port,
				pathname: window.location.pathname,
				hash	: window.location.hash,
				search	: window.location.search,
				href_	: window.location.href.replace(window.location.protocol+"//"+window.location.host,""),
				href_after_home	: window.location.href.replace(window.location.protocol+"//"+window.location.host,"").replace( typeof BASE_PATH != "undefined" ? BASE_PATH : "", "")
			});
		}
		return obj;
	},
	/*
	http://www.example.com:8082/index.php#tab2?foo=789

	Property    Result
	------------------------------------------
	href        http://www.example.com:8082/index.php#tab2
	protocol    http:
	hostname    www.example.com
	host        www.example.com:8082
	port        8082
	pathname    index.php
	search      ?foo=789
	hash        #tab2
	*/
	// ============================= URL parameters  ============================= //


	
	// PuvoxLibrary.parsePOST( request, (stringData)=>{})
	parsePOST(request, callback)
	{
		if (request.method == 'POST') {
			let name='querystring';
			var qs = require(name);
			let stringData = '';
			request.on('data', function (data) {
				stringData += data;
				// Too much POST data, kill the connection!   1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
				if (stringData.length > 1e6)
					request.connection.destroy();
			});
			request.on('end', function(){ callback(qs.parse(stringData)); } );
		}
	},



	// ===== in special occasions, i need to change share urls  =======
	ChangeSocialShareUrls(elemnt, newurl,   title){
		ShareUrlForCurrentSession= newurl;
		TitleForCurrentSession	= title || false;
		$(elemnt).each(function(e, elemnt ){
			var el = $(this);
			var current_share_url = el.attr("href");
			var new_url = encodeURIComponent(ShareUrlForCurrentSession);
			
			var CurrentUrlReplaced =  current_share_url;
			var queryParams = GetQueryParams(current_share_url);
		
			CurrentUrlReplaced = ReplaceParameterInQuery(CurrentUrlReplaced, 'u', new_url);
			CurrentUrlReplaced = ReplaceParameterInQuery(CurrentUrlReplaced, 'url', new_url);
				
				if(title){
			var new_title = encodeURIComponent(TitleForCurrentSession);
			CurrentUrlReplaced = ReplaceParameterInQuery(CurrentUrlReplaced, 'text', new_title);
			CurrentUrlReplaced = ReplaceParameterInQuery(CurrentUrlReplaced, 'title', new_title);
				}
			
			el.attr("href", CurrentUrlReplaced);
		});
	},


	//replace parameter in query string
	ReplaceParameterInQuery(url, param_name, param_new_val){
		var queryParams = GetQueryParams(url);
		var param_name=param_name.replace('"','').replace("'","");
		var variations = {'a': queryParams[param_name],  b:encodeURIComponent(queryParams[param_name]) };
		for(var eachProp in variations){
			var part= param_name+'='+variations[eachProp]; if (url.indexOf(part) >= 0){url = url.replace(part, param_name+'='+param_new_val); }
		}
		return url;
	},
		


	//if referrer is from same domain
	refferer_is_same_domain(){ return document.referrer.indexOf(location.host) > -1;} ,
	//prevent default, better function
	DoPrevent(e) {  e.preventDefault(); e.stopPropagation();	},
	preventDefaultForAll(instantly){ 
		var func = function(){  document.querySelectorAll('.preventDefault').forEach( function(item){ item.addEventListener('click', function(e){ e.preventDefault(); }); } ); };
		if (instantly || false) func();
		else this.trigger_on_load(func);
	},
	
	//add hovered class on element
	addHovered(elem){   if(  elem.hasClass("hoveredd")) { elem.removeClass("hoveredd");}    else { elem.addClass("hoveredd"); }	},
	// ========================================================== //
		
		
	// hide content if chosen radio box not chosen
	// radiobox_onchange_hider('[name="xyz[optName]"]', "optValue", "#targetHide", true);
	radiobox_onchange_hider(selector, desiredvalue, target_hidding_selector, SHOW_or_hide){
		var SHOW_or_hide= SHOW_or_hide || false;
		if( typeof roh_dropdown_objs ==='undefined') { roh_dropdown_objs = {}; } 
		if( typeof roh_dropdown_objs[selector] ==='undefined' ){
			roh_dropdown_objs[selector] = true ; var funcname= arguments.callee.name;
			jQuery(selector).change(function() { window[funcname](selector, desiredvalue, target_hidding_selector, SHOW_or_hide);	});
		}
		var x = jQuery(target_hidding_selector); 
		if( jQuery(selector+':checked').val() == desiredvalue)	{if(SHOW_or_hide) x.show(); else x.hide();} 
		else 													{if(SHOW_or_hide) x.hide(); else x.show();}
	},
	
	// string.containss(smth) 
	// if (window.String && String.prototype && !String.prototype.containss) String.prototype.containss = function(arg) {	return (this.indexOf(arg) > -1);	} 

	// get random from array 
	GetRandomFromArray(my_array){
		return my_array[this.random_number_minmax(0, my_array.length-1)]; 
	},
	//  make array random
	array_shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;
	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	  }
	  return array;
	},


	// ============================= youtube modal popup ============================= //
	showYtVideo(options) {
		options = $.extend({  content:0, url:0,  videoId: '', modalSize: 'm', shadowOpacity: 0.5,	shadowColor: '#000',	clickOutside: 1, closeButton: 1,	autoplay: 0,	start: 0,	oncall: ''	}, options);
		var styleee = $('<style>	.modal { box-shadow: 0px 0px 40px white;  padding: 0px; left: 50%; top: 50%; position: fixed; z-index: 500; background: #fff; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; } 	.modal{max-width:80%;max-height:80%;} .modal.size-m { width: 600px; height: 400px; } 	.modal.size-l { width: 700px; height: 500px; } 	.modal.size-s { width: 500px; height: 300px; } 	.modal-bg { position: fixed; height: 100%; width: 100%;   opacity: 0.5; top: 0; left: 0; z-index: 100; }		.modal-close { color: #b1b0ac; font-size: 30px; line-height: .5; position: absolute; top: -18px; right: -18px; font-weight: bold; cursor: pointer; } 	.modal-close:hover { color: #e72626; }</style>');  styleee.appendTo('body');
		modal = $('<div class="modal yt-modal size-' + options.modalSize + '"></div>'); modal.appendTo('body');

		if (options.closeButton) {	
			var closeButton = $('<div class="modal-close">&#215;</div>');
			closeButton.appendTo(modal); 
			closeButton.on('click', function(){
				ThisVideoClosed=true;
				FadeOut_modalpp();
			});
		}
		var modalBg = $('<div class="modal-bg"></div>');  modalBg.appendTo('body');
		var vidWidth=modal.width();	var vidHeight=modal.height(); var modalWidth = modal.outerWidth(); var modalHeight = modal.outerHeight();
		var elemnt;
		if(options.content)	{ elemnt = $(options.content);  }
		else if(options.url || options.videoId){
			if(options.url)			{ var url = options.url; }
			else if(options.videoId){ var url = 'https://www.youtube.com/embed/'+ options.videoId	+ '?autoplay='+ options.autoplay + '&start='+ options.start; }
			elemnt = $('<iframe style="width:'+ vidWidth+'px; height:'+ vidHeight+'px;" src="'+url+'" frameborder="0" allowfullscreen></iframe>');  
		}
		else {	console.error('showYtVideo plugin error: videoId not specified');	}
		elemnt.appendTo(modal);  
		modal.css({		marginLeft: -modalWidth/2,		marginTop: -modalHeight/2	});
		modalBg.css({	opacity: options.shadowOpacity,	backgroundColor: options.shadowColor	});

		if (options.clickOutside) {
			$(document).mouseup(function(e) {
				if (!modal.is(e.target) && modal.has(e.target).length === 0) {			FadeOut_modalpp();			}
			});
		}
		if(options.oncall != ''){		window[options.oncall]();			}
	},
	
	FadeOut_modalpp(){
		$(".yt-modal").fadeOut(350, function() {
			$(this).remove();
			$(".modal-bg").remove();
		});
	},
	// ============================= Youtube popup  ============================= //


	forEachDefine(){
		Object.foreEach2 = function(obj, func){
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					func(key, obj[key]);
				}
			}
		};
	},
	forEachDefine2(){
		if (!Object.prototype.forEach2) {
			Object.defineProperty(Object.prototype, 'forEach2', {
				value: function (callback, thisArg) {
					if (this == null) {
						throw new TypeError('Not an object');
					}
					thisArg = thisArg || window;
					for (var key in this) {
						if (this.hasOwnProperty(key)) {
							callback.call(thisArg, key, this[key], this);
						}
					}
				}
			});
		}
	},
	filterDefine(){
		Object.filter2 = function( obj, predicate) {
			let result = {}, key;

			for (key in obj) {
				if (obj.hasOwnProperty(key) && predicate(key, obj[key])) {
					result[key] = obj[key];
				}
			}

			return result;
		};
	},
	filterDefine2(){
		if (!Object.prototype.filter2) {
			Object.defineProperty(Object.prototype, 'filter2', {
				value: function (callback, thisArg) {
					if (this == null) {
						throw new TypeError('Not an object');
					}
					
					thisArg = thisArg || window;
					
					let result = {};
					for (var key in this) {
						if (this.hasOwnProperty(key) && callback.call(thisArg, key, this[key], this)  ) {
							result[key] = this[key];
						}
					}
					
					return result;
					
				}
			});
		}
	},
	
	
	var_dump(array){ var o=""; for (x in array) {  o += x + ": " + array[x]+"; "; } window.console && console.log(o); },

	// =============================  POST REQUEST SEND (LIVE FORM CREATION) ============================= //
	//USAGE:      postForm( {deletecityy:'hihi',  surname: 'blabla'}, 'Are you sure?' , 'http://yoursite.com' , '_blank');
	postForm(params,ConfirmMessage, path, method, targett) {
		if (typeof ConfirmMessage != 'undefined' &&  ConfirmMessage != '') { if(!confirm(ConfirmMessage)){return;}}
		
		method	= method || "POST";
		path   	= path	|| "";
		targett	= targett || "";
		var form = document.createElement("form");form.setAttribute("method", method);form.setAttribute("action", path); form.setAttribute("target", targett); 
		for(var key in params) {
			if(params.hasOwnProperty(key)) 
			{
				var hiddenField = document.createElement("input");	hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);				hiddenField.setAttribute("value", params[key]);
				form.appendChild(hiddenField);
			}
		}
		document.body.appendChild(form); form.submit();
	},
	// ==========================================================


	// =============================  Show Hint On MouseOver =============================
	SetShowHint(elemnt,text, left, top){
		elemnt.onmouseover	= function(e){ Hinttttt = document.createElement('div'); Hinttttt.className="myHintClass";  Hinttttt.innerHTML = text; document.body.appendChild(Hinttttt);  this.SetPoistion(e,element);	};
		elemnt.onmousemove	= function(e){  this.SetPoistion(e,element) };
		elemnt.onmouseleave = function(e){ var all = document.getElementsByClassName("myHintClass"); for(i=0;i< all.length;i++){ all[i].parentNode.removeChild(all[i]);} };
		var NewClass = document.createElement('div');NewClass.innerHTML='.myHintClass{position:absolute; background:#eeeeee; z-index: 9999;}'; document.body.appendChild(NewClass);
				//
				this.SetPoistion=function(e){ e.target.style.top= parseInt(e.pageY+top)+'px';	e.target.style.left= parseInt(e.pageX + left) + 'px'; };
	},
	// ==========================================================
		

	// ========================================================== //
	// ====================  IMAGE PROPORTIONS ================== //
	// ========================================================== //


	Balance_Target_Image(img, widthh, heightt){ 
		if (img) { var Initial_is_larger_than_target = false; 
		  // ORIGINAL SIZES
			var W_1=img.naturalWidth;	var H_1=img.naturalHeight;
		  // DESIRED SIZES			
			var W_2=widthh;				var H_2=heightt;
			var proportion_1= W_1/H_1;  var proportion_2= W_2/H_2;
			
			var Initial_is_larger_than_target = (proportion_1 > proportion_2 ) ? true : false;
			if  (Initial_is_larger_than_target)	{	var HowManyTimesReduced = H_1/H_2;
				img.style.height="100%"; img.style.width="auto";	img.style.margin="0 0 0 -"+ ((W_1/HowManyTimesReduced - W_2 ) /2) +"px";
			}
			else								{	var HowManyTimesReduced = W_1/W_2;
				img.style.height="auto"; img.style.width="100%";	img.style.margin="-"+ ((W_1/HowManyTimesReduced - W_2 )/2) +"px 0 0 0";
			}
			
					//IF original image is smaller than desired
					if (W_1 < W_2){ img.style.height = parseInt(  H_1/ (W_1/W_2) )+"px"; }
					if (H_1 < H_2){ img.style.width	 = parseInt(  W_1/ (H_1/H_2) )+"px"; }
			
		}
		else{	window.console && console.log("img not defined.. error28475 in script");	}
	},
	
	
	Balanced_Image_proportions (classname, widthh, heightt, parentClassname){  var LOAD_Result; var myImages;   var FinalWidth=widthh;  var FinalHeight=heightt;
		myImages = document.getElementsByClassName(classname);  
		for (var i=0; i < myImages.length; i++) {
			//if parent was entered
			if (parentClassname != ""){
				var found=false; var TargetSizer;
				
				// if parent found
				if		(myImages[i].parentNode.className.indexOf(parentClassname) >= 0)						{found=true; TargetSizer=myImages[i].parentNode;}
				else if	(myImages[i].parentNode.parentNode.className.indexOf(parentClassname) >= 0)				{found=true; TargetSizer=myImages[i].parentNode.parentNode;}
				else if	(myImages[i].parentNode.parentNode.parentNode.className.indexOf(parentClassname) >= 0)	{found=true; TargetSizer=myImages[i].parentNode.parentNode.parentNode;}
				
				// if parent not found, then jump to next cycle
				if (!found) { continue;}
				else{
					//if they was set to auto, then set them to parents width
					if(widthh=="0" && heightt=="0"){
					  FinalWidth	= TargetSizer.offsetWidth;
					  FinalHeight	= TargetSizer.offsetHeight;
					}
				}
			}
			//if we continue
			myImages[i].DesiredW=FinalWidth;		myImages[i].DesiredH=FinalHeight;
			if( !myImages[i].complete || (myImages[i].naturalWidth === 0) ) {  //typeof myImages[i].naturalWidth !== "undefined" &&
				  LOAD_Result=false;	myImages[i].onload = function() {Balance_Target_Image(this, this.DesiredW, this.DesiredH);  };
			}
			else{ LOAD_Result=true;		Balance_Target_Image(myImages[i], FinalWidth, FinalHeight); }
			if(typeof Show_JS_image_load_result != "undefined") { window.console && console.log(LOAD_Result) && console.log(myImages[i]); }
			
			// 1)
				//  $("#photo").load(function() {    alert("Hello from Image");   });
			// 2)
				// $('img.mustLoad').on('load',function(){         });
			// 3)
				// document.querySelector("img").addEventListener("load", function() { alert('onload!'); });
			
			// 4)
				//objImg = new Image();
				//objImg.onload = function() { }
				//objImg.src = 'photo.gif';
		
			
		}
	},
	// ========================================================= //	
	// ================= ### IMAGE PROPORTIONS ================= //
	// ========================================================= //

	show_after_pageload(el){
		var el = el || '.show_after_pageload';
		this.Append_To_Head("style", 'body '+el+' {opacity:1;}');
	},
	hide_after_pageload(el){
		var el = el || '.hide_after_pageload';
		this.Append_To_Head("style", 'body '+el+' {display:none;}');
	}, 
		
	// ==================== Position ==================== //
	Highlight_Current_Menu_link(Added_class_name, Ancestor_to_search_in, link_to_find){
		var Added_class_name = Added_class_name || "current_item__from_JS";  
		var link_to_find = link_to_find || window.location.pathname;
		var Ancestor_to_search_in = typeof Ancestor_to_search_in === "undefined" ? document.body : getElementById(Ancestor_to_search_in);
		var A_elements = Ancestor_to_search_in.getElementsByTagName("a");
		for(var i=0; i<A_elements.length; i++){
			var condition=false;
			var href=A_elements[i].href.replace(window.location.origin,""); 
			if(href.indexOf('#')>-1 && href==link_to_find)	{condition=true;}
			else if( RemoveHashString(link_to_find).indexOf(RemoveHashString(href)) >- 1 && 
				href.substring(0, href.lastIndexOf("/")).trim() == link_to_find.substring(0, link_to_find.lastIndexOf("/")).trim()
				) {
				 condition= true;
			}
			if (condition) { A_elements[i].className += " "+Added_class_name; }
		}
	},
	//remove # from location
	RemoveHashString(str){  var hash=str.split("#")[1];  return str.replace("#"+hash,'');	},
	// ===================================================================//


	getCharsFromStart(str, amount){
		return str.substring(0, amount);
	},
	getCharsFromEnd(str, amount){
		return str.substring(str.length-amount, str.length);
	},
		
	// ============================= Position ============================= //
	GetTopLeft(myyElement) {
		var offset = {x : 0, y : 0};		this.GetOffset (myyElement, offset);
		var scrolled = {x : 0, y : 0};		this.GetScrolled (myyElement.parentNode, scrolled);
		var posX = offset.x - scrolled.x;	var posY = offset.y - scrolled.y;
		return {lefttt: posX , toppp: posY };
	},
	GetOffset(object, offset) {
		if (!object) return;
		offset.x += object.offsetLeft;       offset.y += object.offsetTop;
		this.GetOffset (object.offsetParent, offset);
	},
	GetScrolled(object, scrolled) {
		if (!object) return;
		scrolled.x += object.scrollLeft;    scrolled.y += object.scrollTop;
		if (object.tagName.toLowerCase () != "html") {          this.GetScrolled (object.parentNode, scrolled);        }
	},
	// ============================= ##Position ============================= //

	// ============================= ## jQUery Fixed navigation ============================= //		
	MakeFixed(selector, ExtraHeightToBody){
		var sticky = $(selector);		
		var StickyHeight=parseInt(sticky.height());
		navPosition= sticky.offset();
		var this_ = this;
		this_.Append_To_Head("style", selector+ '.fixed_stickyy { position:fixed!important; top:0; margin:0 auto; width:inherit; z-index:99; height: '+sticky.height()+'px; }');
		$(window).scroll(function(){ 
		  var navHeight	=ExtraHeightToBody + StickyHeight || 0;  
		  if ($(window).scrollTop() > navPosition.top)	{ if(!sticky.hasClass('fixed_stickyy')){sticky.addClass('fixed_stickyy');} }
		  else											{ if( sticky.hasClass('fixed_stickyy')){sticky.removeClass('fixed_stickyy');}  }
		});
	},
	// ========================================================== //
	
	triggerWhenElementInView(el, func){
		var element_ = el;
		var function_ = func;
		$(document).ready(function(){
			$(window).scroll(function(){
				if ($(element_).isOnScreen()) {
					function_();
				} else {
					// The element is NOT visible, do something else
				}
			});
		});

		$.fn.isOnScreen = function(){

			var win = $(window);

			var viewport = {
				top : win.scrollTop(),
				left : win.scrollLeft()
			};
			viewport.right = viewport.left + win.width();
			viewport.bottom = viewport.top + win.height();

			var bounds = this.offset();
			bounds.right = bounds.left + this.outerWidth();
			bounds.bottom = bounds.top + this.outerHeight();

			return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

		};
	},
	
	compare(a, b, operator) {
		if(operator === '==') return a == b;
		else if (operator === '===') return a === b;
		else if (operator === '!=') return a != b;
		else if (operator === '!==') return a !== b;
		else if (operator === '>') return a > b;
		else if (operator === '>=') return a >= b;
		else if (operator === '<') return a < b;
		else if (operator === '<=') return a <= b;
		else throw "Unknown operator";
	},
	calculate(a, b, operator) {
		if(operator === '+') return a + b;
		else if (operator === '-') return a - b;
		else if (operator === '*') return a * b;
		else if (operator === '/') return a / b;
		else if (operator === '%') return a % b;
		else throw "Unknown operator";
	},

	// random NUMBER or STRINGS
	RandomNum(maxNum)		{ return Math.floor((Math.random() * maxNum) + 1); },

	random_number(length)	{ var length= length || 5;  return Math.floor((Math.random() * Math.pow(10, length)) + 1);},
	random_number_minmax(min, max) { var min= min || 1; var max= max || 9999999999; return Math.floor(Math.random() * (max - min + 1)) + min;},
	randomString(length)	{ var length= length || 5;  return Math.random().toString(36).substr(2, length);},
    //getRandomInt(max) {    return Math.floor(Math.random() * Math.floor(max)); },
	
	shuffle_Word(word){
		var shuffledWord = '';
		var charIndex = 0;
		word = word.split('');
		while(word.length > 0){
			charIndex = word.length * Math.random() << 0;
			shuffledWord += word[charIndex];
			word.splice(charIndex,1);
		}
		return shuffledWord;
	},
	
	youtubeImage(id, quality) {  return 'http://img.youtube.com/vi/'+id+'/'+ (quality || "mqdefault") +'.jpg'; } ,
	 
	
	
	// ============================= detect mobile device ============================= //
	IsMobileDevice(simpleORfull){
		var simpleORfull = simpleORfull || "simple";
		var navigtr=navigator.userAgent||navigator.vendor||window.opera; 
		if(simpleORfull=="simple"){
			this.IsMobileDevice= ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigtr) );
		}
		else if(simpleORfull=="full"){
			this.IsMobileDevice=  (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge 	|maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigtr)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigtr.substr(0,4)));
		}
		return IsMobileDevice;
	},

	backToTopBind(el){
		if ($(el).length) {
			$(el).on('click', function (e) {
				e.preventDefault();
				$('html,body').animate({
					scrollTop: 0
				}, 700);
			});
		}
	},

	enable_jquery_errors()
	{
		$ = function(selector, context) {
			var elements = jQuery(selector, context);     if( !elements.length ) {  window.console && console.log("'" + selector + "' element(s) not found"); }
			return elements;
		}
	},


	// region ### TELEGRAM FUNCTIONS ###
	async telegramMessage(text, chat_id, bot_key, extra_opts={}){
		if (!extra_opts) extra_opts = {};
		const is_repeated_call = 'is_repeated_call' in extra_opts;
		if (! ('parse_mode' in extra_opts)){
			extra_opts['parse_mode'] = 'html';
		}
		if (! ('disable_web_page_preview' in extra_opts)){
			extra_opts['disable_web_page_preview'] = true;
		}
		// whether it's without `-100` prefix
		chat_id = chat_id.toString();
		if (!this.startsWith(chat_id, '-100')) chat_id = '-100' + chat_id;
		text = this.br2nl(text);
		text = this.stripTags(text,'<b><strong><i><em><u><ins><s><strike><del><a><code><pre>'); // allowed: https://core.telegram.org/bots/api#html-style
		text = text.substring(0, 4095); //max telegram message length 4096
		const requestOpts = Object.assign({'chat_id':chat_id, 'text':text}, extra_opts);
		delete requestOpts['cache'];
		delete requestOpts['is_repeated_call'];
		const responseText = await this.getRemoteData('https://api.telegram.org/bot'+ bot_key +'/sendMessage', requestOpts);  // pastebin_com/u0J1Cph3 //'sendMessage?'.http_build_query(opts, ''); 
		try {
			const responseJson = JSON.parse(responseText);
			if (responseJson.ok){
				return responseJson;
			} 
			// for some reason, if still unsupported format submitted, resubmit the plain format
			//i.e. {"ok":false,"error_code":400,"description":"Bad Request: can't parse entities: Unsupported start tag \"br/\" at byte offset 43"} 
			else {
				if( responseJson.description.indexOf ('Bad Request: can\'t parse entities')> -1 ){
					if ( ! is_repeated_call ){
						const extraOpts2 = this.objectCopy(opts);
						text = "[SecondSend with stipped tags] \r\n" + this.stripTags(text) ;
						extraOpts2['is_repeated_call'] = true;
						return this.telegram_message(text, chat_id, bot_key, extraOpts2);
					}
				}
				return responseJson;
			} 
		} catch (ex) {
			return {'ok': false, 'description': ex.message + ':::' + responseText };
		}
	},

	telegram_interval_ms: 50, // telegram seems to accept around 30 times per second, so we'd better wait around that milliseconds
	telegram_last_sent_time: 0,

	async telegramMessageCached(text, chat_id, bot_key, extra_opts={}, customCacheId=null){
		if (!extra_opts) extra_opts = {};
		const curMS  = this.milliseconds();
		const goneMS = curMS - this.telegram_last_sent_time;
		if ( goneMS < this.telegram_interval_ms ){
			await this.sleep (this.telegram_interval_ms - goneMS);
		}
		this.telegram_last_sent_time = curMS;
		const cacheId = customCacheId ? customCacheId : this.cache.file.idForContent( text +'_'+ chat_id +'_'+ bot_key +'_'+ JSON.stringify(extra_opts) );
		if (this.cache.file.addIdIfNotExists('function_telegram_message', cacheId) ){
			return this.telegramMessage(text, chat_id, bot_key, extra_opts);
		}
		else {
			return false;
		}
		//if(is_callable([$this,'notifications_db_entry'])) 
		//	$this->notifications_db_entry($key, $array['chat_id'], $this->stringify($res), time(), $ok );
		//return $res;
	},

	openUrlInBrowser(url)
	{
		var cmd = (process.platform == 'darwin'? `open ${url}`: process.platform == 'win32'? `start ${url}`: `xdg-open ${url}`); 
		let name='child_process';
		require(name).exec(cmd);
	},

	stringify(obj_or_str){
		return this.isSimpleVariableType(obj_or_str) ? obj_or_str.toString() : JSON.stringify(obj_or_str);
	},

	stringify_plain(data){
		var text='';
		if(this.isSimpleVariableType(data)){
			text = data;
		}
       	if(this.isException(data)){
			text = ('stack' in data) ? data.stack.toString() : data.toString(); //JSON.stringify(data); <!---- doesnt work for i.e.  "myclass.XYZ is not a function " exceptions
		}
		else if(this.isArray(data)){
			text = JSON.stringify(data);
		}
		else if(this.isObject(data)){
			text = JSON.stringify(data); //data.toString();
		}
		// zz missing: https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript 
		else{
			text = data;
		}
		return text;
	},
	CopyObject(obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	
	uniqId(obj_or_str){
		return this.md5( this.stringify(obj_or_str) );
	},

	stringifyWithUndefined(obj){
		return JSON.stringify(obj, function(key, value){ return value === undefined ? null : value; });
	},
	// https://gist.github.com/PixnBits/8811212
	//md5(str){ let name='crypto'; return require(name).createHash('md5').update(str).digest("hex"); }
	md5(str){var md5cycle=function(x,k){var a=x[0],b=x[1],c=x[2],d=x[3];a=ff(a,b,c,d,k[0],7,-680876936);d=ff(d,a,b,c,k[1],12,-389564586);c=ff(c,d,a,b,k[2],17,606105819);b=ff(b,c,d,a,k[3],22,-1044525330);a=ff(a,b,c,d,k[4],7,-176418897);d=ff(d,a,b,c,k[5],12,1200080426);c=ff(c,d,a,b,k[6],17,-1473231341);b=ff(b,c,d,a,k[7],22,-45705983);a=ff(a,b,c,d,k[8],7,1770035416);d=ff(d,a,b,c,k[9],12,-1958414417);c=ff(c,d,a,b,k[10],17,-42063);b=ff(b,c,d,a,k[11],22,-1990404162);a=ff(a,b,c,d,k[12],7,1804603682);d=ff(d,a,b,c,k[13],12,-40341101);c=ff(c,d,a,b,k[14],17,-1502002290);b=ff(b,c,d,a,k[15],22,1236535329);a=gg(a,b,c,d,k[1],5,-165796510);d=gg(d,a,b,c,k[6],9,-1069501632);c=gg(c,d,a,b,k[11],14,643717713);b=gg(b,c,d,a,k[0],20,-373897302);a=gg(a,b,c,d,k[5],5,-701558691);d=gg(d,a,b,c,k[10],9,38016083);c=gg(c,d,a,b,k[15],14,-660478335);b=gg(b,c,d,a,k[4],20,-405537848);a=gg(a,b,c,d,k[9],5,568446438);d=gg(d,a,b,c,k[14],9,-1019803690);c=gg(c,d,a,b,k[3],14,-187363961);b=gg(b,c,d,a,k[8],20,1163531501);a=gg(a,b,c,d,k[13],5,-1444681467);d=gg(d,a,b,c,k[2],9,-51403784);c=gg(c,d,a,b,k[7],14,1735328473);b=gg(b,c,d,a,k[12],20,-1926607734);a=hh(a,b,c,d,k[5],4,-378558);d=hh(d,a,b,c,k[8],11,-2022574463);c=hh(c,d,a,b,k[11],16,1839030562);b=hh(b,c,d,a,k[14],23,-35309556);a=hh(a,b,c,d,k[1],4,-1530992060);d=hh(d,a,b,c,k[4],11,1272893353);c=hh(c,d,a,b,k[7],16,-155497632);b=hh(b,c,d,a,k[10],23,-1094730640);a=hh(a,b,c,d,k[13],4,681279174);d=hh(d,a,b,c,k[0],11,-358537222);c=hh(c,d,a,b,k[3],16,-722521979);b=hh(b,c,d,a,k[6],23,76029189);a=hh(a,b,c,d,k[9],4,-640364487);d=hh(d,a,b,c,k[12],11,-421815835);c=hh(c,d,a,b,k[15],16,530742520);b=hh(b,c,d,a,k[2],23,-995338651);a=ii(a,b,c,d,k[0],6,-198630844);d=ii(d,a,b,c,k[7],10,1126891415);c=ii(c,d,a,b,k[14],15,-1416354905);b=ii(b,c,d,a,k[5],21,-57434055);a=ii(a,b,c,d,k[12],6,1700485571);d=ii(d,a,b,c,k[3],10,-1894986606);c=ii(c,d,a,b,k[10],15,-1051523);b=ii(b,c,d,a,k[1],21,-2054922799);a=ii(a,b,c,d,k[8],6,1873313359);d=ii(d,a,b,c,k[15],10,-30611744);c=ii(c,d,a,b,k[6],15,-1560198380);b=ii(b,c,d,a,k[13],21,1309151649);a=ii(a,b,c,d,k[4],6,-145523070);d=ii(d,a,b,c,k[11],10,-1120210379);c=ii(c,d,a,b,k[2],15,718787259);b=ii(b,c,d,a,k[9],21,-343485551);x[0]=add32(a,x[0]);x[1]=add32(b,x[1]);x[2]=add32(c,x[2]);x[3]=add32(d,x[3])};var cmn=function(q,a,b,x,s,t){a=add32(add32(a,q),add32(x,t));return add32(a<<s|a>>>32-s,b)};var ff=function(a,b,c,d,x,s,t){return cmn(b&c|~b&d,a,b,x,s,t)};var gg=function(a,b,c,d,x,s,t){return cmn(b&d|c&~d,a,b,x,s,t)};var hh=function(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t)};var ii=function(a,b,c,d,x,s,t){return cmn(c^(b|~d),a,b,x,s,t)};var md51=function(s){var txt="",n=s.length,state=[1732584193,-271733879,-1732584194,271733878],i;for(i=64;i<=s.length;i+=64){md5cycle(state,md5blk(s.substring(i-64,i)))}s=s.substring(i-64);var tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<s.length;i++)tail[i>>2]|=s.charCodeAt(i)<<(i%4<<3);tail[i>>2]|=128<<(i%4<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i++)tail[i]=0}tail[14]=n*8;md5cycle(state,tail);return state};var md5blk=function(s){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=s.charCodeAt(i)+(s.charCodeAt(i+1)<<8)+(s.charCodeAt(i+2)<<16)+(s.charCodeAt(i+3)<<24)}return md5blks};var hex_chr="0123456789abcdef".split("");var rhex=function(n){var s="",j=0;for(;j<4;j++)s+=hex_chr[n>>j*8+4&15]+hex_chr[n>>j*8&15];return s};var hex=function(x){for(var i=0;i<x.length;i++)x[i]=rhex(x[i]);return x.join("")};var md5_=function(s){return hex(md51(s))};var add32=function(a,b){return a+b&4294967295};if(md5_("hello")!="5d41402abc4b2a76b9719d911017c592"){var add32=function(x,y){var lsw=(x&65535)+(y&65535),msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&65535}}return md5_(str)},


	// ######## Cookies: https://github.com/ttodua/useful-javascript/blob/master/cookies-library.js ######## //
	Cookies : {
		get(a,b) { return this.cookies_instance().get(a,b); },
		set(a,b,c) { return this.cookies_instance().set(a,b);  },
		remove(a, b) {return this.cookies_instance().remove(a,b);   },
		append(name, value, attributes) {return this.cookies_instance().set((this.get(name) || '')  + value, attributes);  },
		isset(cookiename) {return this.get(cookiename)!="";}, // document.cookie.indexOf('; '+cookiename+'='); 
		// WORKING WITH ARRAY/OBJECTS
		getOption(cookieName, key, defaultValue)
		{ 
			var existingValue = this.get(cookieName);
			if(existingValue)
			{
				var parsed = JSON.parse(existingValue);
				if(key in parsed)
					return parsed[key];
			}
			return defaultValue;
		},
		setOption(cookieName, key, value, attributes)
		{
			var cookie = this.get(cookieName);
			var parsed = {};
			if(cookie) parsed = JSON.parse(cookie); 
			parsed[key] = value;
			var attributes = attributes ||  { expires: 99999 };
			this.set(cookieName, JSON.stringify(parsed), attributes);
			return parsed;
		},
		removeOption(cookieName, key, attributes)
		{
			var cookie = this.get(cookieName);
			var parsed = {};
			if(cookie) parsed = JSON.parse(cookie); 
			if(key in parsed) delete parsed[key];
			var attributes = attributes ||  { expires: 99999 };
			this.set(cookieName, JSON.stringify(parsed), attributes);
			return parsed;
		}, 
		//sub-array
		getOptionObject(cookieName, key){
			return JSON.parse( this.getOption(cookieName, key, "{}") );
		},
		setOptionObject(cookieName, key, subKey, subValue){
			var existing = JSON.parse( this.getOption(cookieName, key, "{}") );
			if (subValue==null) delete existing[subKey];
			else existing[subKey]=subValue;
			this.setOption(cookieName, key, JSON.stringify(existing));
		},
		setOptionArray(cookieName, key, subValue, Add_or_remove)
		{
			var existing = JSON.parse( this.getOption(cookieName, key, "[]") );
			if (Add_or_remove && !existing.includes(subValue) )
			{
				existing.push(subValue);
			}
			else if(!Add_or_remove && existing.includes(subValue) )
			{
				existing = this.removeItem(existing, subValue);
			}
			this.setOption(cookieName, key, JSON.stringify(existing));
		},
		//
		cookies_instance(){ if (!this.cookies_inited) this.cookies_inited=this.cookies(); return this.cookies_inited; } ,
		cookies_inited: null,
		// https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js
		cookies : function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}var t={read:function(e){return e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};return function n(r,o){function i(t,n,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),n=r.write(n,t);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n+c}}return Object.create({set:i,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var n=document.cookie?document.cookie.split("; "):[],o={},i=0;i<n.length;i++){var c=n[i].split("="),u=c.slice(1).join("=");'"'===u[0]&&(u=u.slice(1,-1));try{var f=t.read(c[0]);if(o[f]=r.read(u,f),e===f)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){i(t,"",e({},n,{expires:-1}))},withAttributes:function(t){return n(this.converter,e({},this.attributes,t))},withConverter:function(t){return n(e({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(r)}})}(t,{path:"/"})}
	},



	jsonConcat(o1, o2) {
		if ( this.isObject(o1) ){
			for (var key in o2) {
				o1[key] = o2[key];
			}
			return o1;
		}
		else{
			for (var key in o2) {
				o1[key] = o2[key];
			}
			return o1;
		}
	},







	async fetch(url, postOptions = null, opts = {}){
		return await this.getRemoteData(url, postOptions, opts);
	},
	async getRemoteData(url, postOptions = null, opts = {}){
		// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
		const options = {};
		if (postOptions) {
			options['method'] = 'POST';
			options['body'] = JSON.stringify(postOptions);
		}
		options['headers'] = ('headers' in opts) ? opts.headers : {'Content-Type': 'application/json'};
		const fetched = await fetch(url, options);
		const text = (await (fetched).text());
		return text;
		// return new Promise ((resolve, reject) => {
		// 	try {
		// 		// const https = require('https');
		// 		https.get (url, { 'agent': new https.Agent ({ 'rejectUnauthorized': false }) }, (res) => { let body = ''; res.setEncoding ('utf8'); res.on ('data', (data) => { body += data; }); res.on ('end', () => resolve (body)); res.on ('error', (e) => { reject (e); });
		// 		}).on ('error', (ex) => { reject (ex); });
		// 	} catch (ex) { reject (ex); }
		// });
	},
	//  if(setHashInAddress) {	window.location.hash = id_or_Name;	}
	

	

	// ######## CACHE ITEMS (client-side JS) ########
	_privateAppName : null, //override with anything you want
	setAppName (name){ this._privateAppName = name; },
	getAppName(){ 
		if (!this._privateAppName || this._privateAppName === ''){
			throw new Error ('Before you start using caching functions, please at first define your appplication\'s name(identifier) at first with .setAppName("whatever_my_app_name"), so it will get its own cache-storage');
		}
		return this._privateAppName; 
	},

	cache: {
		localStorage : { 
			storage: typeof window !== 'undefined' ? window.localStorage : null,

			get(name, defaultValue, expireSeconds = 0){
				let appName = puvox_library.getAppName();
				let val = this.storage.getItem(appName + '_' + name);
				let expireVal = this.storage.getItem(appName + '_createtime_' + name);
				if (val === null) {
					return defaultValue;
				} else {
					if (expireSeconds === 0){
						return val;
					} else {
						let now = (new Date()).getTime();
						if (now - expireVal > expireSeconds*1000){
							this.storage.removeItem(appName + '_' + name);
							this.storage.removeItem(appName + '_createtime_' + name);
							return defaultValue;
						}
					}
				}
			},
			set(name, value){
				try{ 
					const appName = puvox_library.getAppName();
					this.storage.setItem(appName + '_' +name, value); 
					this.storage.setItem(appName + '_createtime_' +name, (new Date()).getTime()); 
					return true; 
				}
				catch(ex){ alert("Cache storage quote exceeded. can't save value. err598"); return false; }
			},
			remove(name){
				const appName = puvox_library.getAppName();
				this.storage.removeItem(appName + '_' + name); 
				this.storage.removeItem(appName + '_createtime_' + name);
			},
			getItem(name, subItemName, defaultValue){
				let val = this.get(name, '{}');
				let parsed = JSON.parse(val);
				return (subItemName in parsed ? parsed[subItemName] : defaultValue);
			},
			setItem(name, subItemName, value){ 
				let curr = this.get(name, '{}' );
				let parsed = JSON.parse(curr);
				parsed[subItemName] = value;
				return this.set(name, JSON.stringify(parsed) );
			},
			removeItem(name, subItemName, value){ 
				let curr = this.get(name, '{}' );
				let parsed = JSON.parse(curr);
				if (subItemName in parsed)
					delete parsed[subItemName];
				return this.set(name, JSON.stringify(parsed) );
			}
		},
		file: {
			// ########## CACHE DIRS (server-side JS) ##########
			customCacheDir:null,
			dir(){  
				if (!this.customCacheDir){ 
					this.customCacheDir = puvox_library.file.getTempDir() + '/';
				}
				let finaldir = this.customCacheDir + '_cache_' + puvox_library.getAppName() + '/';
				return finaldir; 
			},
			filePath(uniqFileName){
				const parent = puvox_library;
				uniqFileName = parent.isString(uniqFileName) || parent.isNumeric(uniqFileName) ? uniqFileName : JSON.stringify(uniqFileName);
				uniqFileName = parent.sanitize_key_dashed(parent.getCharsFromStart(uniqFileName, 15)) + "_"+ parent.md5(uniqFileName);
				filePath= this.dir() + uniqFileName + "_tmp"; //"/". 
				return filePath;
			},
			//
			get(uniqFileName, defaultContent ='', expire_seconds=8640000, decode = true)
			{
				const parent = puvox_library;
				let filePath = this.filePath(uniqFileName);
				if ( filePath.length < 3) return "too tiny filename";

				if ( parent.file.exists(filePath) ){
					if ( parent.file.mtime(filePath) + expire_seconds *1000 < (new Date()).getTime() ){
						parent.file.unlink(filePath);
						return defaultContent;
					}
					else{	
						cont = parent.file.read(filePath, null);
						// if specifically array, then on empty, reckon as array
						if (cont===null)
						{
							return defaultContent;
						}
						if (decode){
							try{
								return JSON.parse(cont);
							}
							catch(ex){
								return cont;
							}
						}
						else{
							return cont;
						}
					}
				}
				else {
					return defaultContent;
				}
			},
			set(uniqFileName, content)
			{
				const parent = puvox_library;
				let filePath= this.filePath(uniqFileName);
				let contentFinal = parent.isString(content) ? content : ((parent.isArray(content) || parent.isObject(content)) ? JSON.stringify(content) : content);
				return parent.file.write(filePath, contentFinal);
			},
			
			//
			// writeFileAppendJson(filePath, jsonContent, callback){
			// 	try{
			// 		var callback = callback || function(){};
			// 		var self = this;
			// 		puvox_library.modules('fs').readFile(filePath, 'utf8', function(err,data) {
			// 			let json = {};
			// 			if (typeof data !="undefined" && data!=''){
			// 				json=JSON.parse(data);
			// 			}
			// 			let jsonNew = self.jsonConcat(json, jsonContent);
			// 			let content = JSON.stringify(jsonNew);
			// 			puvox_library.modules('fs').writeFile(filePath, content, 'utf8', function(callback_) {
			// 			}); 
			// 		});
			// 	}
			// 	catch(e){
			// 		console.log("writeFileAppendJson", e); 
			// 	}
			// },
			containerDefaultPrefix: "_cached_ids_",
			tempIds:{},
			idForContent(slugOrContent){
				return puvox_library.md5(puvox_library.isSimpleVariableType(slugOrContent) ? slugOrContent : JSON.stringify(slugOrContent)); 
			},
			existsId(containerSlug, id){
				return (id in this.getIds(containerSlug));
			},
			getIds(containerSlug) {
				if (! (containerSlug in this.tempIds)) {
					const content = puvox_library.file.read(this.dir() + this.containerDefaultPrefix + containerSlug, '{}');
					this.tempIds[containerSlug] = JSON.parse(content);
				}
				return this.tempIds[containerSlug];
			},
			setIds(containerSlug, idsDict) {
				this.tempIds[containerSlug] = idsDict;
				return puvox_library.file.write(this.dir() + this.containerDefaultPrefix + containerSlug, JSON.stringify(this.tempIds[containerSlug]));
			},
			addId(containerSlug, id){
				const ids = this.getIds(containerSlug);
				ids[id] = 1;
				this.setIds(containerSlug, ids);
			},
			addIdIfNotExists(containerSlug, id){
				if (! this.existsId(containerSlug, id)){
					this.addId(containerSlug, id);
					return true;
				}
				return false;
			},
		}
	}, 

	// ################################################
	// for node packs:_fs_instance :null,
	_required_instances : {},
	modules(name){
		if (name in this._required_instances){
			return this._required_instances[name];
		} else {
			this._required_instances[name] = require(name);
			return this._required_instances[name];
		}
	}, 
	file: {
		parent() {return puvox_library;},
		fs() {return puvox_library.modules('fs');},
		os() {return puvox_library.modules('os');},
		path() {return puvox_library.modules('path');},
		//
		getTempDir(){ return this.os().tmpdir(); },

		exists(filePath){
			return this.fs().existsSync(filePath);
		},
		mtime(filePath){
			if (this.exists(filePath)) {
				return (this.fs().statSync(filePath)).mtimeMs;
			} else {
				return null;
			}
		},
		unlink(filePath){
			return (this.fs().unlinkSync(filePath));
		},
		createDirectory(dirPath, force = false){
			if (!this.exists(dirPath) || force){
				this.fs().mkdirSync(dirPath, { recursive: true });
			}
		},
		read(filePath, defaultContent = ''){
			if (!this.exists(filePath)){
				return defaultContent;
			}
			return this.fs().readFileSync(filePath);
		},
		write(filePath, content){
			const dir = this.path().dirname(filePath);
			this.createDirectory(dir);
			this.fs().writeFileSync(filePath, content, 'utf8', function(err){
				if (err) throw err;
			});
		},
		getFilesListFromDir (dir) {
			const filesList = [];
			this.fs().readdirSync(dir, (err, files) => {
				files.forEach(file => {
					filesList.push(file);
				});
			});
			return filesList;
		},
	},



















	
	// region: ####### from CCXT ##########
	// generic
	keys: Object.keys,
    values(x) { return ((!this.isArray (x)) ? Object.values (x) : x);},
    extend(...args) { return Object.assign ({}, ...args) ;}, // NB: side-effect free
    clone(x){ return (this.isArray (x) ? Array.from (x) : this.extend (x)) ;},
    index(x) { return new Set (this.values (x));},
    ordered: (x) => x, // a stub to keep assoc keys in order (in JS it does nothing, it's mostly for Python)
    unique(x) { return Array.from (this.index (x));},
    arrayConcat: (a, b) => a.concat (b),
    inArray (needle, haystack) {
        return haystack.includes (needle);
    },
    toArray (object) {
        return Object.values (object);
    },
    isEmpty (object) {
        if (!object) {
            return true;
        }
        return (Array.isArray (object) ? object : Object.keys (object)).length < 1;
    },
    keysort (x, out = {}) {
        for (const k of this.keys (x).sort ()) {
            out[k] = x[k];
        }
        return out;
    },
    indexBy (x, k, out = {}) {
        //  description: https://github.com/ccxt/ccxt/blob/master/js/base/functions/generic.js
        for (const v of this.values (x)) {
            if (k in v) {
                out[v[k]] = v;
            }
        }

        return out;
    },
    groupBy (x, k, out = {}) {
        //  description: https://github.com/ccxt/ccxt/blob/master/js/base/functions/generic.js
        for (const v of this.values (x)) {
            if (k in v) {
                const p = v[k];
                out[p] = out[p] || [];
                out[p].push (v);
            }
        }
        return out;
    },
    filterBy (x, k, value = undefined, out = []) {
        //  description: https://github.com/ccxt/ccxt/blob/master/js/base/functions/generic.js
        for (const v of this.values (x)) {
            if (v[k] === value) {
                out.push (v);
            }
        }
        return out;
    },
    sortBy: (array, key, descending = false, direction = descending ? -1 : 1) => array.sort ((a, b) => {
        if (a[key] < b[key]) {
            return -direction;
        } else if (a[key] > b[key]) {
            return direction;
        } else {
            return 0;
        }
    }),
    sortBy2: (array, key1, key2, descending = false, direction = descending ? -1 : 1) => array.sort ((a, b) => {
        if (a[key1] < b[key1]) {
            return -direction;
        } else if (a[key1] > b[key1]) {
            return direction;
        } else {
            if (a[key2] < b[key2]) {
                return -direction;
            } else if (a[key2] > b[key2]) {
                return direction;
            } else {
                return 0;
            }
        }
    }),
    flatten: function flatten (x, out = []) {

        for (const v of x) {
            if (this.isArray (v)) {
                this.flatten (v, out);
            } else {
                out.push (v);
            }
        }

        return out;
    },
    pluck(x, k) { return this.values (x).filter ((v) => k in v).map ((v) => v[k]);},
    omit (x, ...args) {
        if (!Array.isArray (x)) {
            const out = this.clone (x);
            for (const k of args) {
                if (this.isArray (k)) { // omit (x, ['a', 'b'])
                    for (const kk of k) {
                        delete out[kk];
                    }
                } else {
                    delete out[k]; // omit (x, 'a', 'b')
                }
            }
            return out;
        }
        return x;
    },
    sum (...xs) {
        const ns = xs.filter (isNumber); // leave only numbers
        return (ns.length > 0) ? ns.reduce ((a, b) => a + b, 0) : undefined;
    },
    deepExtend: function deepExtend (...xs) {
        let out = undefined;
        for (const x of xs) {
            if (this.isDictionary (x)) {
                if (!this.isDictionary (out)) {
                    out = {};
                }
                for (const k in x) { // eslint-disable-line guard-for-in
                    out[k] = this.deepExtend (out[k], x[k]);
                }
            } else {
                out = x;
            }
        }
        return out;
    },
	// type
	isNumber: Number.isFinite,
    isInteger: Number.isInteger,
    isArray: Array.isArray,
    hasProps: o => ((o !== undefined) && (o !== null)),
    isString: s => (typeof s === 'string'),
    isObject: o => ((o !== null) && (typeof o === 'object')),
    isRegExp: o => (o instanceof RegExp),
    isDictionary(o ){return (this.isObject (o) && (Object.getPrototypeOf (o) === Object.prototype) && !this.isArray (o) && !this.isRegExp (o));},
    isStringCoercible(x){ return ((this.hasProps (x) && x.toString) || this.isNumber (x));},
	prop (o, k) { return (this.isObject (o) && o[k] !== '' && o[k] !== null ? o[k] : undefined);},
	getValueFromKeysInArray(object, array) { return object[array.find (k => this.prop (object,k) !== undefined)];},
	asFloat (x) { return ((this.isNumber (x) || (this.isString (x) && x.length !== 0)) ? parseFloat (x) : NaN);}
    , 
	asInteger(x) { return ((this.isNumber (x) || (this.isString (x) && x.length !== 0)) ? Math.trunc (Number(x)) : NaN);},
	// safeFloat:(o, k, $default, n = asFloat (prop (o, k))) => (this.isNumber (n) ? n : $default),
	// safeInteger: (o, k, $default, n = asInteger (prop (o, k))) => (this.isNumber (n) ? n : $default),
	// safeTimestamp: (o, k, $default, n = asFloat (prop (o, k))) => (isNumber (n) ? parseInt (n * 1000) : $default),
	// safeValue(o, k, $default, x = prop (o, k)) { return (hasProps (x) ? x : $default); },
	// safeString(o, k, $default, x = prop (o, k)){ return (this.isStringCoercible (x) ? String (x)       : $default);},
	// safeStringLower(o, k, $default, x = prop (o, k)){ return (this.isStringCoercible (x) ? String (x).toLowerCase () : $default ? $default.toLowerCase () : $default);},
    // safeStringUpper(o, k, $default, x = prop (o, k)){ return (this.isStringCoercible (x) ? String (x).toUpperCase () : $default ? $default.toUpperCase () : $default);},

	// misc
	parseTimeframe(timeframe){
		const amount = timeframe.slice (0, -1);
		const unit = timeframe.slice (-1);
		let scale = undefined;
		if (unit === 'y') {	scale = 60 * 60 * 24 * 365;	} 
		else if (unit === 'M') { scale = 60 * 60 * 24 * 30;	}
		else if (unit === 'w') { scale = 60 * 60 * 24 * 7; }
		else if (unit === 'd') { scale = 60 * 60 * 24; } 
		else if (unit === 'h') { scale = 60 * 60;} 
		else if (unit === 'm') { scale = 60; } 
		else if (unit === 's') { scale = 1;	} 
		else {	throw new NotSupported ('timeframe unit ' + unit + ' is not supported'); }
		return amount * scale;
	},
	roundTimeframe(timeframe, timestamp, direction = ROUND_DOWN) {
		const ms = this.parseTimeframe (timeframe) * 1000
		// Get offset based on timeframe in milliseconds
		const offset = timestamp % ms
		return timestamp - offset + ((direction === ROUND_UP) ? ms : 0);
	},
	json:(data, params = undefined) => JSON.stringify (data),
	isJsonEncodedObject: object => (
        (typeof object === 'string') &&
        (object.length >= 2) &&
        ((object[0] === '{') || (object[0] === '['))
    ),
	// number
	precisionFromString (string) {
		const split = string.replace (/0+$/g, '').split ('.')
		return (split.length > 1) ? (split[1].length) : 0
	},
	numberToString (x) { // avoids scientific notation for too large and too small numbers
		if (x === undefined) return undefined; if (typeof x !== 'number') return x.toString (); const s = x.toString (); if (Math.abs (x) < 1.0) { const n_e = s.split ('e-'); const n = n_e[0].replace ('.', ''); const e = parseInt (n_e[1]); const neg = (s[0] === '-'); if (e) { x = (neg ? '-' : '') + '0.' + (new Array (e)).join ('0') + n.substring (neg); return x; } } else { const parts = s.split ('e'); if (parts[1]) { let e = parseInt (parts[1]); const m = parts[0].split ('.'); let part = ''; if (m[1]) { e -= m[1].length; part = m[1]; } return m[0] + part + (new Array (e + 1)).join ('0'); } }	return s;
	},
	// platform
	isBrowser: typeof window !== 'undefined',
	isElectron: typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.electron !== 'undefined',
	isWebWorker: typeof WorkerGlobalScope !== 'undefined' && (self instanceof WorkerGlobalScope),
	isWindows: typeof process !== 'undefined' && process.platform === "win32",
	isNode: !(this.isBrowser || this.isWebWorker),
	defaultFetch: fetch,
	//string 
	uuid: a => a ? (a ^ Math.random () * 16 >> a / 4).toString (16) : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace (/[018]/g, uuid), 
	capitalize: s => s.length ? (s.charAt (0).toUpperCase () + s.slice (1)) : s,
    strip: s => s.replace(/^\s+|\s+$/g, ''),
	// time
	now: Date.now,
	milliseconds: Date.now, //  milliseconds(){ return (new Date().getTime()); },
	seconds: () => Math.floor (Date.now () / 1000),
	// endregion: ####### from CCXT ##########



};


// export to outside world
if (typeof module != 'undefined' && module.hasOwnProperty('exports')) {
	module.exports = puvox_library;
}
if (typeof window != 'undefined') {
	window['PuvoxLibrary'] = puvox_library;
}