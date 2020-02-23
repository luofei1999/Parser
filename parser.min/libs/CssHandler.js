// 小程序富文本插件 https://github.com/jin-yufeng/Parser
"use strict";function _classCallCheck(t,s){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,s){for(var i=0;i<s.length;i++){var e=s[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(s,i,e){return i&&t(s.prototype,i),e&&t(s,e),s}}(),config=require("./config.js"),CssHandler=function(){function t(){var s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,t),this.styles=Object.assign({},s)}return _createClass(t,[{key:"getStyle",value:function(t){var s="";return t=t.replace(/<[sS][tT][yY][lL][eE][\s\S]*?>([\s\S]*?)<\/[sS][tT][yY][lL][eE][\s\S]*?>/g,function(t,i){return s+=i,""}),this.styles=new CssParser(s,this.styles).parse(),t}},{key:"match",value:function(t,s){var i,e=(i=this.styles[t])?i+";":"";if(s.class)for(var a=s.class.split(" "),h=0;h<a.length;h++)(i=this.styles["."+a[h]])&&(e+=i+";");return(i=this.styles["#"+s.id])&&(e+=i+";"),e}}]),t}();module.exports=CssHandler;var CssParser=function(){function t(s,i){_classCallCheck(this,t),this.data=s,this.res=i;for(var e in config.userAgentStyles)i[e]?i[e]=config.userAgentStyles[e]+";"+i[e]:i[e]=config.userAgentStyles[e];this._comma=!1,this._floor=0,this._i=0,this._list=[],this._sectionStart=0,this._state=this.Space}return _createClass(t,[{key:"parse",value:function(){for(var t=this.data.length;this._i<t;this._i++)this._state(this.data[this._i]);return this.res}},{key:"Space",value:function(t){"."==t||"#"==t||t>="a"&&t<="z"||t>="A"&&t<="Z"?(this._sectionStart=this._i,this._state=this.StyleName):"/"==t&&"*"==this.data[this._i+1]?this.Comment():config.blankChar[t]||";"==t||(this._state=this.Ignore)}},{key:"Comment",value:function(){this._i=this.data.indexOf("*/",this._i)+1,this._i||(this._i=this.data.length),this._state=this.Space}},{key:"Ignore",value:function(t){"{"==t?this._floor++:"}"!=t||--this._floor||(this._list=[],this._state=this.Space)}},{key:"StyleName",value:function(t){config.blankChar[t]?(this._sectionStart!=this._i&&this._list.push(this.data.substring(this._sectionStart,this._i)),this._state=this.NameSpace):"{"==t?(this._list.push(this.data.substring(this._sectionStart,this._i)),this._sectionStart=this._i+1,this.Content()):","==t?(this._list.push(this.data.substring(this._sectionStart,this._i)),this._sectionStart=this._i+1,this._comma=!0):(t<"a"||t>"z")&&(t<"A"||t>"Z")&&(t<"0"||t>"9")&&"."!=t&&"#"!=t&&"-"!=t&&"_"!=t&&(this._state=this.Ignore)}},{key:"NameSpace",value:function(t){"{"==t?(this._sectionStart=this._i+1,this.Content()):","==t?(this._comma=!0,this._sectionStart=this._i+1,this._state=this.StyleName):config.blankChar[t]||(this._comma?(this._state=this.StyleName,this._sectionStart=this._i--,this._comma=!1):this._state=this.Ignore)}},{key:"Content",value:function(){this._i=this.data.indexOf("}",this._i),-1==this._i&&(this._i=this.data.length);for(var t,s=this.data.substring(this._sectionStart,this._i),i=this._list.length;t=this._list[--i];)this.res[t]?this.res[t]+=";"+s:this.res[t]=s;this._list=[],this._state=this.Space}}]),t}();