!function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){return o(e[i][1][r]||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}({1:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _home2=_interopRequireDefault(require("./pages/home.js")),_search2=_interopRequireDefault(require("./pages/search.js")),_artist2=_interopRequireDefault(require("./pages/artist.js")),_album2=_interopRequireDefault(require("./pages/album.js")),_favs2=(_interopRequireDefault(require("./pages/track.js")),_interopRequireDefault(require("./pages/favs.js")));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=new VueRouter({routes:[{name:"home",path:"/",component:_home2.default},{path:"/search",component:_search2.default},{path:"/search/:search/:showTab?",name:"quickSearch",component:_search2.default,props:!0},{path:"/search/:search/:order",name:"quickSearchWithOrder",component:_search2.default,props:!0},{name:"artist",path:"/artist/:id/:showTab?",component:_artist2.default,props:!0},{name:"album",path:"/album/:id",component:_album2.default,props:!0},{name:"favs",path:"/favs/:showTab?",component:_favs2.default}]})},{"./pages/album.js":6,"./pages/artist.js":7,"./pages/favs.js":8,"./pages/home.js":9,"./pages/search.js":10,"./pages/track.js":11}],2:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=Vue.component("album-grid",function(resolve){fetch("../../templates/locals/album-grid.html").then(function(albs){return albs.text()}).then(function(albs){resolve({name:"album-grid",template:albs,props:{albums:{type:Object,required:!0},release:{type:Boolean,required:!1}},data:function(){return{showBtnArray:[]}},methods:{toggleShowBtn:function(id){-1!==this.showBtnArray.indexOf(id)?this.showBtnArray.splice(this.showBtnArray.indexOf(id),1):this.showBtnArray.push(id)}}})})})},{}],3:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=Vue.component("artist-grid",function(resolveArts){fetch("../../templates/locals/artist-grid.html").then(function(arts){return arts.text()}).then(function(arts){resolveArts({name:"artist-grid",template:arts,props:{artists:{type:Object,required:!0}},filters:{addSpace:function(int){return int.toLocaleString()}},data:function(){return{showBtnArray:[]}},methods:{toggleShowBtn:function(id){-1!==this.showBtnArray.indexOf(id)?this.showBtnArray.splice(this.showBtnArray.indexOf(id),1):this.showBtnArray.push(id)}}})})})},{}],4:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _utils=require("../../js/utils.js");exports.default=Vue.component("tabs-menu",function(resolve,reject){fetch("../templates/globals/tabsMenu.html").then(function(res){return res.text()}).then(function(template){resolve({name:"tabs-menu",mixins:[_utils.mixins],props:["headers"],data:function(){return{asyncProps:[],titles:[],activeTab:""}},watch:{"$route.params.showTab":function(){this.showTab(this.$route.params.showTab)}},created:function(){var arr=/,/.test(this.headers)?this.headers.split(", "):this.headers.split(" "),_iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=arr[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var title=_step.value;this.titles.push(title)}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator.return&&_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}""===this.activeTab&&(this.activeTab=this.$route.params.showTab||this.titles[0])},filters:{toUp:function(y){return y.replace(/^\w/,function(x){return x.toUpperCase()}).replace(/-/g," ")}},methods:{showTab:function(title){this.$router.push({name:this.$route.name,params:{showTab:title}}),this.activeTab=title||this.titles[0]}},template:template})})})},{"../../js/utils.js":12}],5:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=Vue.component("track-grid",function(resolve){fetch("../templates/locals/track-grid.html").then(function(data){return data.text()}).then(function(data){resolve({props:{tracks:{type:Object,required:!0},mode:{type:Boolean,required:!1,default:!1}},data:function(){return{titles:this.mode?["#","Titre","Dur.","Pop."]:["Titre","Artiste","Album","Dur.","Pop."],class:this.mode?"grid-for-search":"grid-for-album"}},template:data})})})},{}],6:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _utils=require("../../js/utils.js");exports.default=Vue.component("Album",function(resolve,reject){fetch("../templates/pages/album.html").then(function(res){return res.text()}).then(function(template){resolve({name:"album",mixins:[_utils.mixins],data:function(){return{baseUrl:_utils.albumUrl,album:{},artist:{}}},props:["id"],created:function(){this.makeSearch()},computed:{c_date:function(){return this.album.release_date?this.album.release_date.replace(/-/g,"/"):""}},watch:{"$route.params.id":function(){this.$root.loading=!0,this.makeSearch()}},methods:{makeSearch:function(){var fullSearch,_this=this;fullSearch=this.baseUrl.replace("query",this.id),fetchJsonp(fullSearch).then(function(data){return data.json()}).then(function(data){_this.album=data,_this.artist=data.artist,_this.$root.loading=!1})}},template:template})})})},{"../../js/utils.js":12}],7:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _utils=require("../../js/utils.js");exports.default=Vue.component("Artist",function(resolve){fetch("../templates/pages/artist.html").then(function(res){return res.text()}).then(function(template){resolve({name:"artist",mixins:[_utils.mixins],props:["id"],data:function(){return{baseUrl:_utils.artistUrl,url:"",artist:{},tops:{},albums:{},similars:{},limit:20}},created:function(){this.loadAll()},watch:{albums:function(){document.querySelector("#header-top").style.backgroundImage="url("+this.albums.data[0].cover_xl+")"},"$route.params.id":function(){this.loadAll()}},methods:{loadAll:function(){this.loadArtist(),this.loadTop(),this.loadAlbums(),this.loadSimilars()},loadArtist:function(){var _this=this;this.url=this.baseUrl.replace("query",this.id),console.log(this.url),fetchJsonp(this.url).then(function(artist){return artist.json()}).then(function(artist){_this.artist=artist,_this.$root.loading=!1})},loadTop:function(){var _this2=this,url=this.url.replace(/\?/,"/top?limit="+this.limit+"&");console.log(url),fetchJsonp(url).then(function(tops){return tops.json()}).then(function(tops){_this2.tops=tops})},loadAlbums:function(){var _this3=this,url=this.url.replace(/\?/,"/albums&");console.log(url),fetchJsonp(url).then(function(albums){return albums.json()}).then(function(albums){_this3.albums=albums})},loadSimilars:function(){var _this4=this,url=this.url.replace(/\?/,"/related&");console.log(url),fetchJsonp(url).then(function(similars){return similars.json()}).then(function(similars){_this4.similars=similars})}},template:template})})})},{"../../js/utils.js":12}],8:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=Vue.component("Favs",function(resolve,reject){fetch("../templates/pages/favorites.html").then(function(res){return res.text()}).then(function(template){resolve({name:"favorites",data:function(){return{favs:{tracks:{data:[],total:0},albums:{data:[],total:0},artists:{data:[],total:0}}}},created:function(){this.$root.loading=!0,this.populateFavs(),this.$root.loading=!1},methods:{addOrRemoveFav:function(data){"#"+data.id in localStorage?localStorage.removeItem("#"+data.id):localStorage.setItem("#"+data.id,JSON.stringify(data)),this.populateFavs()},populateFavs:function(){var t=void 0,al=void 0,ar=void 0;for(var item in t=al=ar=0,localStorage)if(/#/.test(item))switch(!0){case/^track#/.test(item):Vue.set(this.favs.tracks.data,t,JSON.parse(localStorage.getItem(item))),t++;break;case/^album#/.test(item):Vue.set(this.favs.albums.data,al,JSON.parse(localStorage.getItem(item))),al++;break;case/^artist#/.test(item):Vue.set(this.favs.artists.data,ar,JSON.parse(localStorage.getItem(item))),ar++}for(var type in this.favs)this.favs[type].total=this.favs[type].data.length}},template:template})})})},{}],9:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=Vue.component("Home",function(resolve,reject){fetch("../templates/pages/home.html").then(function(res){return res.text()}).then(function(template){resolve({name:"home",data:function(){return{}},methods:{},template:template})})})},{}],10:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _utils=require("../../js/utils.js");exports.default=Vue.component("Home",function(resolve,reject){fetch("../templates/pages/search.html").then(function(data){return data.text()}).then(function(template){return resolve({name:"search",mixins:[_utils.mixins],props:["favs","search","order","query"],data:function(){return{searchInput:"",filterInput:"",orderInput:"",urls:{searchAllUrl:_utils.searchAllUrl,searchArtistUrl:_utils.searchArtistUrl,searchAlbumUrl:_utils.searchAlbumUrl},allResults:{all:{},artists:{},albums:{}}}},created:function(){this.$root.loading=!0,this.quickOrAdvanced()},methods:{updateRoute:function(){this.orderInput?this.$router.push({name:"quickSearchWithOrder",params:{search:this.searchInput||this.search,order:this.orderInput||this.order}}):this.$router.push({name:"quickSearch",params:{search:this.searchInput||this.search}})},throwQueryError:function(prob,type){console.error(prob+" should be of "+type+" type.")},makeQuickSearch:function(){this.searchForAll(),this.searchForArtists(),this.searchForAlbums(),this.searchInput=""},searchForAll:function(){var _this=this,search=this.searchInput?this.searchInput:this.search,order=this.checkOrder(),fullSearch="";fullSearch=order?this.urls.searchAllUrl.replace("query",search+"&order="+order.toUpperCase()):this.urls.searchAllUrl.replace("query",""+search),console.log(fullSearch),fetchJsonp(fullSearch).then(function(data){return data.json()}).then(function(data){_this.$set(_this.allResults,"all",data)})},searchForArtists:function(){var _this2=this,search=this.searchInput?this.searchInput:this.search,order=this.checkOrder(),fullSearch="";fullSearch=order?this.urls.searchArtistUrl.replace("query",search+"&order="+order.toUpperCase()):this.urls.searchArtistUrl.replace("query",""+search),console.log(fullSearch),fetchJsonp(fullSearch).then(function(data){return data.json()}).then(function(data){_this2.$set(_this2.allResults,"artists",data)})},searchForAlbums:function(){var _this3=this,search=this.searchInput?this.searchInput:this.search,order=this.checkOrder(),fullSearch="";fullSearch=order?this.urls.searchAlbumUrl.replace("query",search+"&order="+order.toUpperCase()):this.urls.searchAlbumUrl.replace("query",""+search),console.log(fullSearch),fetchJsonp(fullSearch).then(function(data){return data.json()}).then(function(data){_this3.$set(_this3.allResults,"albums",data),_this3.$root.loading=!1})},quickOrAdvanced:function(){(0,_utils.isAnEmptyObject)(this.$route.query)&&this.search?this.makeQuickSearch():(0,_utils.isAnEmptyObject)(this.$route.query)||this.makeAdvancedSearch()},checkOrder:function(){if(!this.order)return!1;var order=this.orderInput||this.order;return-1!==["RANKING","TRACK_ASC","TRACK_DESC","ARTIST_ASC","ARTIST_DESC","ALBUM_ASC","ALBUM_DESC","RATING_ASC","RATING_DESC","DURATION_ASC","DURATION_DESC"].indexOf(order.toUpperCase())?order:"RANKING"}},watch:{},template:template})})})},{"../../js/utils.js":12}],11:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _utils=require("../../js/utils.js");exports.default=Vue.component("Track",function(resolve,reject){fetch("../templates/pages/track.html").then(function(res){return res.text()}).then(function(template){resolve({name:"Track",data:function(){return{baseUrl:_utils.trackUrl,data:{}}},props:["id"],created:function(){this.makeSearch()},methods:{makeSearch:function(){var fullSearch,_this=this;fullSearch=this.baseUrl.replace("query",this.id),fetchJsonp(fullSearch).then(function(data){return data.json()}).then(function(data){_this.data=data})}},template:template})})})},{"../../js/utils.js":12}],12:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var mixins={created:function(){if(!document.querySelector("#_injected__"+this.$options.name)){var css=document.createElement("link"),head=document.querySelector("head");css.setAttribute("rel","stylesheet"),css.setAttribute("href","css/"+this.$options.name+".css"),css.setAttribute("id","_injected__"+this.$options.name),head.appendChild(css),console.log(this.$options.name+".css injected")}}};exports.searchAllUrl="https://api.deezer.com/search?q=query&output=jsonp",exports.searchArtistUrl="https://api.deezer.com/search/artist?q=query&output=jsonp",exports.searchAlbumUrl="https://api.deezer.com/search/album?q=query&output=jsonp",exports.artistUrl="https://api.deezer.com/artist/query?output=jsonp",exports.albumUrl="https://api.deezer.com/album/query?output=jsonp",exports.trackUrl="https://api.deezer.com/track/query?output=jsonp",exports.mixins=mixins,exports.isAnEmptyObject=function(obj){for(var key in obj)return!1;return!0}},{}],13:[function(require,module,exports){"use strict";var _Router2=_interopRequireDefault(require("./components/Router.js"));_interopRequireDefault(require("./components/globals/tabsMenu.js")),_interopRequireDefault(require("./components/globals/trackGrid.js")),_interopRequireDefault(require("./components/globals/artistGrid.js")),_interopRequireDefault(require("./components/globals/albumGrid.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}!function(){new Vue({el:"#app",name:"parent",router:_Router2.default,data:{favs:{},quickSearchInput:"",loading:!0},methods:{addOrRemoveFav:function(data){data.type+"#"+data.id in localStorage?(Vue.delete(this.favs,data.type+"#"+data.id),localStorage.removeItem(data.type+"#"+data.id)):(Vue.set(this.favs,data.type+"#"+data.id,JSON.stringify(data)),localStorage.setItem(data.type+"#"+data.id,JSON.stringify(data))),console.log(localStorage.length)},goSearch:function(){this.quickSearchInput.length&&_Router2.default.push({name:"quickSearch",params:{search:this.quickSearchInput}})},initWidget:function(data){var d=document,widg=d.querySelector("#widg-target");if(data){var mode=void 0,id=data.id;"artist"===data.type?(mode="radio",id="artist-"+id):mode="track"===data.type?"tracks":data.type;var newData=widg.getAttribute("data-src").replace(/(&type=)\w+(&id=)\d+/,"$1"+mode+"$2"+id);/&autoplay=false/.test(newData)&&(newData=newData.replace(/&autoplay=false/,"&autoplay=true")),widg.setAttribute("data-src",newData)}var idl="deezer-widget-loader",head=d.querySelector("head"),js=void 0;if(d.getElementById(idl))for(;widg.firstChild;)widg.removeChild(widg.firstChild);(js=d.createElement("script")).id=idl,js.src="https://e-cdns-files.dzcdn.net/js/widget/loader.js",head.appendChild(js)}},created:function(){for(var item in localStorage)/#/.test(item)&&(this.favs[""+item]=localStorage.getItem(""+item));this.initWidget()}});Vue.filter("duration",function(int){if(!(1<arguments.length&&void 0!==arguments[1]&&arguments[1])){var _min=int/60>>0,sec=int%60;return(_min<10?"0"+_min:_min)+":"+(sec<10?"0"+sec:sec)}return(int/60>>0)+" min"}),Vue.filter("slashedDate",function(date){return date.replace(/-/g,"/")})}()},{"./components/Router.js":1,"./components/globals/albumGrid.js":2,"./components/globals/artistGrid.js":3,"./components/globals/tabsMenu.js":4,"./components/globals/trackGrid.js":5}]},{},[13]);