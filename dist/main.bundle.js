webpackJsonp([0,4],{

/***/ 152:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__article__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__(352);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ArticleService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var sortByTime = function (direction) { return function (a, b) {
    return direction * (b.publishedAt.getTime() - a.publishedAt.getTime());
}; };
var sortByVotes = function (direction) { return function (a, b) {
    return direction * (b.votes - a.votes);
}; };
var sortFns = {
    'Time': sortByTime,
    'Votes': sortByVotes,
};
var ArticleService = (function () {
    function ArticleService(http) {
        this.http = http;
        this._articles = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"]([]);
        this._sortByDirectionSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](1);
        this._sortByFilterSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](sortByTime);
        this._filterBySubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"]('');
        this._sources = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"]([]);
        this._refreshSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"]('reddit-r-all');
        this.sources = this._sources.asObservable();
        this.articles = this._articles.asObservable();
        this._refreshSubject
            .subscribe(this.getArticles.bind(this));
        this.orderedArticles = __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].combineLatest(this._articles, this._sortByFilterSubject, this._sortByDirectionSubject, this._filterBySubject)
            .map(function (_a) {
            var articles = _a[0], sorter = _a[1], direction = _a[2], filterStr = _a[3];
            var re = new RegExp(filterStr, 'gi');
            return articles
                .filter(function (a) { return re.exec(a.title); })
                .sort(sorter(direction));
        });
    }
    ArticleService.prototype.updateArticles = function (sourceKey) {
        this._refreshSubject.next(sourceKey);
    };
    ArticleService.prototype.getArticles = function (sourceKey) {
        var _this = this;
        if (sourceKey === void 0) { sourceKey = 'reddit-r-all'; }
        this._makeHttpRequest('/v1/articles', sourceKey)
            .map(function (json) { return json.articles; })
            .subscribe(function (articlesJSON) {
            var articles = articlesJSON
                .map(function (articlejson) { return __WEBPACK_IMPORTED_MODULE_5__article__["a" /* Article */].fromJSON(articlejson); });
            _this._articles.next(articles);
        });
    };
    ArticleService.prototype.getSources = function () {
        this._makeHttpRequest('/v1/sources')
            .map(function (json) {
            console.log(json);
            return json.sources;
        })
            .filter(function (list) { return list.length > 0; })
            .subscribe(this._sources);
    };
    ArticleService.prototype.sortBy = function (filter, direction) {
        this._sortByDirectionSubject.next(direction);
        this._sortByFilterSubject.next(sortFns[filter]);
    };
    ArticleService.prototype.filterBy = function (filter) {
        this._filterBySubject.next(filter);
    };
    // ${baseUrl}/v1/articles?apiKey=${newsApiKey}
    ArticleService.prototype._makeHttpRequest = function (path, sourceKey) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* URLSearchParams */]();
        params.set('apiKey', __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].newsApiKey);
        if (sourceKey && sourceKey !== '') {
            params.set('source', sourceKey);
        }
        return this.http
            .get("" + __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].baseUrl + path, {
            search: params
        })
            .map(function (resp) { return resp.json(); });
    };
    ArticleService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], ArticleService);
    return ArticleService;
    var _a;
}());
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/article.service.js.map

/***/ },

/***/ 348:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AboutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutComponent = (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-about',
            template: __webpack_require__(699),
            styles: [__webpack_require__(692)]
        }), 
        __metadata('design:paramtypes', [])
    ], AboutComponent);
    return AboutComponent;
}());
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/about.component.js.map

/***/ },

/***/ 349:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(700),
            styles: [__webpack_require__(693)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* ViewEncapsulation */].Emulated
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/app.component.js.map

/***/ },

/***/ 350:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__article_service__ = __webpack_require__(152);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ArticleListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ArticleListComponent = (function () {
    function ArticleListComponent(articleService, activeRoute) {
        this.articleService = articleService;
        this.activeRoute = activeRoute;
        this.articles = articleService.orderedArticles;
    }
    ArticleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            var sourceKey = params['sourceKey'];
            _this.articleService.updateArticles(sourceKey);
        });
    };
    ArticleListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'article-list',
            template: __webpack_require__(702),
            styles: [__webpack_require__(695)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__article_service__["a" /* ArticleService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__article_service__["a" /* ArticleService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], ArticleListComponent);
    return ArticleListComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/article-list.component.js.map

/***/ },

/***/ 351:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Article; });
var Article = (function () {
    function Article(title, description, imageUrl, votes) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.votes = votes;
        this.votes = votes || 0;
        this.publishedAt = new Date();
    }
    Article.fromJSON = function (json) {
        var article = Object.create(Article.prototype);
        return Object.assign(article, json, {
            votes: json.votes ? json.votes : 0,
            imageUrl: json.urlToImage,
            publishedAt: json.publishedAt
                ? new Date(json.publishedAt)
                : new Date()
        });
    };
    Article.prototype.date = function () {
        return new Date();
    };
    Article.prototype.voteUp = function () {
        this.votes = this.votes + 1;
    };
    Article.prototype.voteDown = function () {
        this.votes = this.votes - 1;
    };
    return Article;
}());
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/article.js.map

/***/ },

/***/ 352:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
var environment = {
    production: true,
    baseUrl: 'https://newsapi.org',
    newsApiKey: '789a823705a3467282eae04d083d6db2',
};
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/environment.prod.js.map

/***/ },

/***/ 420:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 420;


/***/ },

/***/ 421:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(534);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_27" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/main.js.map

/***/ },

/***/ 530:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about_about_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__article_list_article_list_component__ = __webpack_require__(350);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot([
                    {
                        path: '',
                        redirectTo: 'news/reddit-r-all',
                        pathMatch: 'full'
                    },
                    {
                        path: 'about',
                        component: __WEBPACK_IMPORTED_MODULE_2__about_about_component__["a" /* AboutComponent */]
                    },
                    {
                        path: 'news/:sourceKey',
                        component: __WEBPACK_IMPORTED_MODULE_3__article_list_article_list_component__["a" /* ArticleListComponent */]
                    }
                ])
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */],
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/app-routing.module.js.map

/***/ },

/***/ 531:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sidebar_sidebar_component__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__article_article_component__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__article_list_article_list_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__article_service__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__article_list_header_article_list_header_component__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__about_about_component__ = __webpack_require__(348);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__sidebar_sidebar_component__["a" /* SidebarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__article_article_component__["a" /* ArticleComponent */],
                __WEBPACK_IMPORTED_MODULE_6__sidebar_sidebar_component__["a" /* SidebarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__article_article_component__["a" /* ArticleComponent */],
                __WEBPACK_IMPORTED_MODULE_8__article_list_article_list_component__["a" /* ArticleListComponent */],
                __WEBPACK_IMPORTED_MODULE_10__article_list_header_article_list_header_component__["a" /* ArticleListHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_11__about_about_component__["a" /* AboutComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__article_service__["a" /* ArticleService */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/app.module.js.map

/***/ },

/***/ 532:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__article_service__ = __webpack_require__(152);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ArticleListHeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ArticleListHeaderComponent = (function () {
    function ArticleListHeaderComponent(articleService) {
        this.articleService = articleService;
        this.currentFilter = 'Time';
        this.sortDirection = 1;
    }
    ArticleListHeaderComponent.prototype.ngOnInit = function () {
        jQuery('.ui.dropdown').dropdown();
    };
    ArticleListHeaderComponent.prototype.changeDirection = function () {
        this.sortDirection = this.sortDirection * -1;
        this._updateSort();
    };
    ArticleListHeaderComponent.prototype.changeSort = function (filter) {
        if (filter == this.currentFilter) {
            this.changeDirection();
        }
        else {
            this.currentFilter = filter;
            this._updateSort();
        }
    };
    ArticleListHeaderComponent.prototype.liveSearch = function (evt) {
        var val = evt.target.value;
        this.articleService.filterBy(val);
    };
    ArticleListHeaderComponent.prototype._updateSort = function () {
        this.articleService.sortBy(this.currentFilter, this.sortDirection);
    };
    ArticleListHeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-article-list-header',
            template: __webpack_require__(701),
            styles: [__webpack_require__(694)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__article_service__["a" /* ArticleService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__article_service__["a" /* ArticleService */]) === 'function' && _a) || Object])
    ], ArticleListHeaderComponent);
    return ArticleListHeaderComponent;
    var _a;
}());
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/article-list-header.component.js.map

/***/ },

/***/ 533:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__article__ = __webpack_require__(351);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ArticleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ArticleComponent = (function () {
    function ArticleComponent() {
    }
    ArticleComponent.prototype.ngOnInit = function () {
    };
    ArticleComponent.prototype.upvote = function () {
        this.article.voteUp();
    };
    ArticleComponent.prototype.downvote = function () {
        this.article.voteDown();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__article__["a" /* Article */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__article__["a" /* Article */]) === 'function' && _a) || Object)
    ], ArticleComponent.prototype, "article", void 0);
    ArticleComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-article',
            template: __webpack_require__(703),
            styles: [__webpack_require__(696)]
        }), 
        __metadata('design:paramtypes', [])
    ], ArticleComponent);
    return ArticleComponent;
    var _a;
}());
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/article.component.js.map

/***/ },

/***/ 534:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(531);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/index.js.map

/***/ },

/***/ 535:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__article_service__ = __webpack_require__(152);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SidebarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SidebarComponent = (function () {
    function SidebarComponent(articleService) {
        this.articleService = articleService;
        this.sources = this.articleService.sources;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.articleService.getSources();
    };
    SidebarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-sidebar',
            template: __webpack_require__(704),
            styles: [__webpack_require__(697)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__article_service__["a" /* ArticleService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__article_service__["a" /* ArticleService */]) === 'function' && _a) || Object])
    ], SidebarComponent);
    return SidebarComponent;
    var _a;
}());
//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/sidebar.component.js.map

/***/ },

/***/ 536:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(977);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/Users/s5ugys/Development/FullStack - ngbook/reddit-clone/src/polyfills.js.map

/***/ },

/***/ 692:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 693:
/***/ function(module, exports) {

module.exports = "/* Mobile */\n.pusher {\n  margin-left: 180px;\n}\n\n.item {\n  border: 10px solid blue;\n}\n\n/* Tablet */\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .pusher {\n    margin-left: 200px;\n  }\n}\n\n@media only screen and (min-width: 991px) {\n  .pusher {\n    margin-left: 260px;\n  }\n}\n"

/***/ },

/***/ 694:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 695:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 696:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 697:
/***/ function(module, exports) {

module.exports = ".sidebar-container {\n  width: 180px;\n  overflow: hidden;\n  height: 100%;\n  position: fixed;\n  margin: 0;\n  top: 0;\n  left: 0;\n}\n\n/* Tablet / iPad Portrait */\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .sidebar-container {\n    width: 200px;\n  }\n}\n\n@media only screen and (min-width: 991px) {\n  .sidebar-container {\n    width: 260px;\n  }\n}\n\na.item.news-item {\n  padding-left: 10px;\n  line-height: 1.4em !important;\n  color: white !important;\n}\n\na.item.news-item.active {\n  background-color: #ddd !important;\n}\na.item.news-item.active>span {\n  color: black !important;\n}\n\n.sidebar::-webkit-scrollbar { width: 0 !important }\n.sidebar { -ms-overflow-style: none; }\n.sidebar { overflow: -moz-scrollbars-none; }\n"

/***/ },

/***/ 699:
/***/ function(module, exports) {

module.exports = "<p>\n  about works!\n</p>\n"

/***/ },

/***/ 700:
/***/ function(module, exports) {

module.exports = "<div class=\"ui bottom attached segment\">\n  <app-sidebar></app-sidebar>\n  <div class=\"pusher\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n"

/***/ },

/***/ 701:
/***/ function(module, exports) {

module.exports = "<div class=\"ui basic\">\n  <h1 class=\"ui header\">News</h1>\n  <div class=\"ui grid\">\n    <div class=\"four column row\">\n      <div class=\"left floated column\">\n        <div class=\"ui buttons\">\n          <button class=\"ui left attached icon mini blue button\"\n                  (click)=\"changeDirection()\">\n            <i [ngClass]=\"{\n                  'up': sortDirection > 0,\n                  'down': sortDirection <= 0\n                }\"\n                class=\"arrow up icon\">\n            </i>\n          </button>\n          <div class=\"right attached ui icon top left pointing dropdown blue button\">\n            <i class=\"sort content descending icon\"></i>\n            <span class=\"text\">Sort</span>\n            <div class=\"menu\">\n              <div class=\"header\">Sort by</div>\n              <div\n                    (click)=\"changeSort('Time')\"\n                    class=\"item\">\n                Time\n              </div>\n              <div\n                    (click)=\"changeSort('Votes')\"\n                    class=\"item\">\n                Votes\n              </div>\n            </div>\n          </div>\n        </div> <!-- buttons container -->\n      </div> <!-- left column -->\n      <div class=\"right floated column\">\n        <div class=\"ui fluid icon input\">\n          <input type=\"text\"\n                 (keyup)=\"liveSearch($event)\"\n                 placeholder=\"Search...\" />\n          <i class=\"search icon\"></i>\n        </div>\n      </div>\n    </div> <!-- right column -->\n  </div> <!-- four column row -->\n</div>\n"

/***/ },

/***/ 702:
/***/ function(module, exports) {

module.exports = "<div class=\"ui container\">\n  <h2>Article</h2>\n  <app-article-list-header></app-article-list-header>\n  <div class=\"ui divided items\">\n    <app-article\n        *ngFor=\"let article of articles | async\"\n        [article]=\"article\"\n        class=\"item\">\n    </app-article>\n  </div>\n</div>\n"

/***/ },

/***/ 703:
/***/ function(module, exports) {

module.exports = "<div class=\"image\">\n  <img src=\"{{ article.imageUrl }}\" />\n</div>\n<div class=\"content\">\n  <div class=\"header\">\n    {{ article.title }}\n  </div>\n  <div class=\"meta\">\n    <span class=\"ui blue small label\">\n          <i class=\"heart icon\"></i>\n          <div class=\"detail\">\n            {{ article.votes }}\n          </div>\n        </span>\n    <span class=\"ui right floated\">\n          <a class=\"ui small label\"\n              (click)=\"upvote()\">\n            <i class=\"arrow up icon\"></i>\n            Upvote\n          </a>\n          <a class=\"ui small label\"\n              (click)=\"downvote()\">\n            <i class=\"arrow down icon\"></i>\n            Downvote\n          </a>\n        </span>\n  </div>\n  <div class=\"meta date\">\n    {{ article.publishedAt | date:'medium' }}\n  </div>\n  <div class=\"meta description\">\n    <p>{{ article.description }}</p>\n  </div>\n  <div class=\"extra\">\n    <a href=\"#\" target=\"_blank\" class=\"ui right floated button primary\">\n            Read more <i class=\"right chevron icon\"></i>\n        </a>\n  </div>\n</div>\n"

/***/ },

/***/ 704:
/***/ function(module, exports) {

module.exports = "<div class=\"sidebar-container\">\n  <div class=\"ui container visible fixed inverted left vertical sidebar menu\">\n    <div class=\"item\">\n      <div class=\"header\">News sources</div>\n    </div>\n\n    <div class=\"item\">\n      <div class=\"menu\">\n        <a\n            routerLink=\"/news/{{ source['id'] }}\"\n            routerLinkActive=\"active\"\n            *ngFor='let source of sources | async'\n            class=\"item news-item\">\n          <span class=\"side news-item\">\n            <img src=\"{{ source['urlsToLogos']['small'] }}\" class=\"ui avatar image\">\n            <span class=\"side news-item\">\n              {{ source['name'] }}\n            </span>\n          </span>\n        </a>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ },

/***/ 978:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(421);


/***/ }

},[978]);
//# sourceMappingURL=main.bundle.map