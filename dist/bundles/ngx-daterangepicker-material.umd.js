(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@angular/material/button'), require('@angular/material/select'), require('moment'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/portal')) :
    typeof define === 'function' && define.amd ? define('ngx-daterangepicker-material', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@angular/forms', '@angular/material/button', '@angular/material/select', 'moment', 'rxjs', 'rxjs/operators', '@angular/cdk/portal'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-daterangepicker-material'] = {}, global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ng.forms, global.ng.material.button, global.ng.material.select, global.moment, global.rxjs, global.rxjs.operators, global.ng.cdk.portal));
}(this, (function (exports, overlay, common, core, forms, button, select, _moment, rxjs, operators, portal) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var _moment__namespace = /*#__PURE__*/_interopNamespace(_moment);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || from);
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var moment$2 = _moment__namespace;
    var LOCALE_CONFIG = new core.InjectionToken('daterangepicker.config');
    /**
     *  DefaultLocaleConfig
     */
    var DefaultLocaleConfig = {
        direction: 'ltr',
        separator: ' - ',
        weekLabel: 'W',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        clearLabel: 'Clear',
        customRangeLabel: 'Custom range',
        daysOfWeek: moment$2.weekdaysMin(),
        monthNames: moment$2.monthsShort(),
        firstDay: moment$2.localeData().firstDayOfWeek()
    };

    var LocaleService = /** @class */ (function () {
        function LocaleService(_config) {
            this._config = _config;
        }
        Object.defineProperty(LocaleService.prototype, "config", {
            get: function () {
                if (!this._config) {
                    return DefaultLocaleConfig;
                }
                return Object.assign(Object.assign({}, DefaultLocaleConfig), this._config);
            },
            enumerable: false,
            configurable: true
        });
        return LocaleService;
    }());
    LocaleService.decorators = [
        { type: core.Injectable }
    ];
    LocaleService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [LOCALE_CONFIG,] }] }
    ]; };

    var moment$1 = _moment__namespace;
    var SideEnum;
    (function (SideEnum) {
        SideEnum["left"] = "left";
        SideEnum["right"] = "right";
    })(SideEnum || (SideEnum = {}));
    var DaterangepickerComponent = /** @class */ (function () {
        function DaterangepickerComponent(el, _ref, _localeService) {
            this.el = el;
            this._ref = _ref;
            this._localeService = _localeService;
            this._old = { start: null, end: null };
            this.calendarVariables = { left: {}, right: {} };
            this.tooltiptext = []; // for storing tooltiptext
            this.timepickerVariables = { left: {}, right: {} };
            this.daterangepicker = { start: new forms.FormControl(), end: new forms.FormControl() };
            this.fromMonthControl = new forms.FormControl();
            this.fromYearControl = new forms.FormControl();
            this.toMonthControl = new forms.FormControl();
            this.toYearControl = new forms.FormControl();
            this.applyBtn = { disabled: false };
            this.startDate = moment$1().startOf('day');
            this.endDate = moment$1().endOf('day');
            this.dateLimit = null;
            // used in template for compile time support of enum values.
            this.sideEnum = SideEnum;
            this.minDate = null;
            this.maxDate = null;
            this.autoApply = false;
            this.singleDatePicker = false;
            this.showDropdowns = false;
            this.showWeekNumbers = false;
            this.showISOWeekNumbers = false;
            this.linkedCalendars = false;
            this.autoUpdateInput = true;
            this.alwaysShowCalendars = false;
            this.maxSpan = false;
            this.lockStartDate = false;
            // timepicker variables
            this.timePicker = false;
            this.timePicker24Hour = false;
            this.timePickerIncrement = 1;
            this.timePickerSeconds = false;
            // end of timepicker variables
            this.showClearButton = false;
            this.firstMonthDayClass = null;
            this.lastMonthDayClass = null;
            this.emptyWeekRowClass = null;
            this.firstDayOfNextMonthClass = null;
            this.lastDayOfPreviousMonthClass = null;
            this._locale = {};
            // custom ranges
            this._ranges = {};
            this.showCancel = false;
            this.keepCalendarOpeningWithRange = false;
            this.showRangeLabelOnInput = false;
            this.customRangeDirection = false;
            this.rangesArray = [];
            this.nowHoveredDate = null;
            this.pickingDate = false;
            // some state information
            this.isShown = false;
            this.inline = true;
            this.leftCalendar = { month: null };
            this.rightCalendar = { month: null };
            this.showCalInRanges = false;
            this.closeOnAutoApply = true;
            this.chosenDate = new core.EventEmitter();
            this.rangeClicked = new core.EventEmitter();
            this.datesUpdated = new core.EventEmitter();
            this.startDateChanged = new core.EventEmitter();
            this.endDateChanged = new core.EventEmitter();
            this.closeDateRangePicker = new core.EventEmitter();
            this.destroy$ = new rxjs.Subject();
        }
        Object.defineProperty(DaterangepickerComponent.prototype, "locale", {
            get: function () {
                return this._locale;
            },
            set: function (value) {
                this._locale = Object.assign(Object.assign({}, this._localeService.config), value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaterangepickerComponent.prototype, "ranges", {
            get: function () {
                return this._ranges;
            },
            set: function (value) {
                this._ranges = value;
                this.renderRanges();
            },
            enumerable: false,
            configurable: true
        });
        DaterangepickerComponent.prototype.isInvalidDate = function (date) {
            return false;
        };
        DaterangepickerComponent.prototype.isCustomDate = function (date) {
            return false;
        };
        DaterangepickerComponent.prototype.isTooltipDate = function (date) {
            return null;
        };
        DaterangepickerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.fromMonthControl.valueChanges.pipe(operators.takeUntil(this.destroy$)).subscribe(function (month) {
                _this.monthChanged(month, SideEnum.left);
            });
            this.fromYearControl.valueChanges.pipe(operators.takeUntil(this.destroy$)).subscribe(function (year) {
                _this.yearChanged(year, SideEnum.left);
            });
            this.toMonthControl.valueChanges.pipe(operators.takeUntil(this.destroy$)).subscribe(function (month) {
                _this.monthChanged(month, SideEnum.right);
            });
            this.toYearControl.valueChanges.pipe(operators.takeUntil(this.destroy$)).subscribe(function (year) {
                _this.yearChanged(year, SideEnum.right);
            });
            this._buildLocale();
            var daysOfWeek = __spreadArray([], __read(this.locale.daysOfWeek));
            this.locale.firstDay = this.locale.firstDay % 7;
            if (this.locale.firstDay !== 0) {
                var iterator = this.locale.firstDay;
                while (iterator > 0) {
                    daysOfWeek.push(daysOfWeek.shift());
                    iterator--;
                }
            }
            this.locale.daysOfWeek = daysOfWeek;
            if (this.inline) {
                this._old.start = this.startDate.clone();
                this._old.end = this.endDate.clone();
            }
            if (this.startDate && this.timePicker) {
                this.setStartDate(this.startDate);
                this.renderTimePicker(SideEnum.left);
            }
            if (this.endDate && this.timePicker) {
                this.setEndDate(this.endDate);
                this.renderTimePicker(SideEnum.right);
            }
            this.updateMonthsInView();
            this.renderCalendar(SideEnum.left);
            this.renderCalendar(SideEnum.right);
            this.renderRanges();
        };
        DaterangepickerComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
        };
        DaterangepickerComponent.prototype.renderRanges = function () {
            this.rangesArray = [];
            var start, end;
            if (typeof this.ranges === 'object') {
                for (var range in this.ranges) {
                    if (this.ranges[range]) {
                        if (typeof this.ranges[range][0] === 'string') {
                            start = moment$1(this.ranges[range][0], this.locale.format);
                        }
                        else {
                            start = moment$1(this.ranges[range][0]);
                        }
                        if (typeof this.ranges[range][1] === 'string') {
                            end = moment$1(this.ranges[range][1], this.locale.format);
                        }
                        else {
                            end = moment$1(this.ranges[range][1]);
                        }
                        // If the start or end date exceed those allowed by the minDate or maxSpan
                        // options, shorten the range to the allowable period.
                        if (this.minDate && start.isBefore(this.minDate)) {
                            start = this.minDate.clone();
                        }
                        var maxDate = this.maxDate;
                        if (this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate)) {
                            maxDate = start.clone().add(this.maxSpan);
                        }
                        if (maxDate && end.isAfter(maxDate)) {
                            end = maxDate.clone();
                        }
                        // If the end of the range is before the minimum or the start of the range is
                        // after the maximum, don't display this range option at all.
                        if ((this.minDate && end.isBefore(this.minDate, this.timePicker ? 'minute' : 'day')) ||
                            (maxDate && start.isAfter(maxDate, this.timePicker ? 'minute' : 'day'))) {
                            continue;
                        }
                        // Support unicode chars in the range names.
                        var elem = document.createElement('textarea');
                        elem.innerHTML = range;
                        var rangeHtml = elem.value;
                        this.ranges[rangeHtml] = [start, end];
                    }
                }
                for (var range in this.ranges) {
                    if (this.ranges[range]) {
                        this.rangesArray.push(range);
                    }
                }
                if (this.showCustomRangeLabel) {
                    this.rangesArray.push(this.locale.customRangeLabel);
                }
                this.showCalInRanges = !this.rangesArray.length || this.alwaysShowCalendars;
                if (!this.timePicker) {
                    this.startDate = this.startDate.startOf('day');
                    this.endDate = this.endDate.endOf('day');
                }
            }
        };
        DaterangepickerComponent.prototype.renderTimePicker = function (side) {
            var selected, minDate;
            var maxDate = this.maxDate;
            if (side === SideEnum.left) {
                (selected = this.startDate.clone()), (minDate = this.minDate);
            }
            else if (side === SideEnum.right && this.endDate) {
                (selected = this.endDate.clone()), (minDate = this.startDate);
            }
            else if (side === SideEnum.right && !this.endDate) {
                // don't have an end date, use the start date then put the selected time for the right side as the time
                selected = this._getDateWithTime(this.startDate, SideEnum.right);
                if (selected.isBefore(this.startDate)) {
                    selected = this.startDate.clone(); //set it back to the start date the time was backwards
                }
                minDate = this.startDate;
            }
            var start = this.timePicker24Hour ? 0 : 1;
            var end = this.timePicker24Hour ? 23 : 12;
            this.timepickerVariables[side] = {
                hours: [],
                minutes: [],
                minutesLabel: [],
                seconds: [],
                secondsLabel: [],
                disabledHours: [],
                disabledMinutes: [],
                disabledSeconds: [],
                selectedHour: 0,
                selectedMinute: 0,
                selectedSecond: 0
            };
            // generate hours
            for (var i = start; i <= end; i++) {
                var i_in_24 = i;
                if (!this.timePicker24Hour) {
                    i_in_24 = selected.hour() >= 12 ? (i === 12 ? 12 : i + 12) : i === 12 ? 0 : i;
                }
                var time = selected.clone().hour(i_in_24);
                var disabled = false;
                if (minDate && time.minute(59).isBefore(minDate)) {
                    disabled = true;
                }
                if (maxDate && time.minute(0).isAfter(maxDate)) {
                    disabled = true;
                }
                this.timepickerVariables[side].hours.push(i);
                if (i_in_24 === selected.hour() && !disabled) {
                    this.timepickerVariables[side].selectedHour = i;
                }
                else if (disabled) {
                    this.timepickerVariables[side].disabledHours.push(i);
                }
            }
            // generate minutes
            for (var i = 0; i < 60; i += this.timePickerIncrement) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().minute(i);
                var disabled = false;
                if (minDate && time.second(59).isBefore(minDate)) {
                    disabled = true;
                }
                if (maxDate && time.second(0).isAfter(maxDate)) {
                    disabled = true;
                }
                this.timepickerVariables[side].minutes.push(i);
                this.timepickerVariables[side].minutesLabel.push(padded);
                if (selected.minute() === i && !disabled) {
                    this.timepickerVariables[side].selectedMinute = i;
                }
                else if (disabled) {
                    this.timepickerVariables[side].disabledMinutes.push(i);
                }
            }
            // generate seconds
            if (this.timePickerSeconds) {
                for (var i = 0; i < 60; i++) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().second(i);
                    var disabled = false;
                    if (minDate && time.isBefore(minDate)) {
                        disabled = true;
                    }
                    if (maxDate && time.isAfter(maxDate)) {
                        disabled = true;
                    }
                    this.timepickerVariables[side].seconds.push(i);
                    this.timepickerVariables[side].secondsLabel.push(padded);
                    if (selected.second() === i && !disabled) {
                        this.timepickerVariables[side].selectedSecond = i;
                    }
                    else if (disabled) {
                        this.timepickerVariables[side].disabledSeconds.push(i);
                    }
                }
            }
            // generate AM/PM
            if (!this.timePicker24Hour) {
                if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate)) {
                    this.timepickerVariables[side].amDisabled = true;
                }
                if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate)) {
                    this.timepickerVariables[side].pmDisabled = true;
                }
                if (selected.hour() >= 12) {
                    this.timepickerVariables[side].ampmModel = 'PM';
                }
                else {
                    this.timepickerVariables[side].ampmModel = 'AM';
                }
            }
            this.timepickerVariables[side].selected = selected;
        };
        DaterangepickerComponent.prototype.renderCalendar = function (side) {
            var mainCalendar = side === SideEnum.left ? this.leftCalendar : this.rightCalendar;
            var month = mainCalendar.month.month();
            var year = mainCalendar.month.year();
            var hour = mainCalendar.month.hour();
            var minute = mainCalendar.month.minute();
            var second = mainCalendar.month.second();
            var daysInMonth = moment$1([year, month]).daysInMonth();
            var firstDay = moment$1([year, month, 1]);
            var lastDay = moment$1([year, month, daysInMonth]);
            var lastMonth = moment$1(firstDay).subtract(1, 'month').month();
            var lastYear = moment$1(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment$1([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();
            // initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;
            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }
            // populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth) {
                startDay -= 7;
            }
            if (dayOfWeek === this.locale.firstDay) {
                startDay = daysInLastMonth - 6;
            }
            var curDate = moment$1([lastYear, lastMonth, startDay, 12, minute, second]);
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment$1(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);
                if (this.minDate &&
                    calendar[row][col].format('YYYY-MM-DD') === this.minDate.format('YYYY-MM-DD') &&
                    calendar[row][col].isBefore(this.minDate) &&
                    side === 'left') {
                    calendar[row][col] = this.minDate.clone();
                }
                if (this.maxDate &&
                    calendar[row][col].format('YYYY-MM-DD') === this.maxDate.format('YYYY-MM-DD') &&
                    calendar[row][col].isAfter(this.maxDate) &&
                    side === 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }
            }
            // make the calendar object available to hoverDate/clickDate
            if (side === SideEnum.left) {
                this.leftCalendar.calendar = calendar;
            }
            else {
                this.rightCalendar.calendar = calendar;
            }
            //
            // Display the calendar
            //
            var minDate = side === 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            // adjust maxDate to reflect the dateLimit setting in order to
            // grey out end dates beyond the dateLimit
            if (this.endDate === null && this.dateLimit) {
                var maxLimit = this.startDate.clone().add(this.dateLimit, 'day').endOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    maxDate = maxLimit;
                }
            }
            this.calendarVariables[side] = {
                month: month,
                year: year,
                hour: hour,
                minute: minute,
                second: second,
                daysInMonth: daysInMonth,
                firstDay: firstDay,
                lastDay: lastDay,
                lastMonth: lastMonth,
                lastYear: lastYear,
                daysInLastMonth: daysInLastMonth,
                dayOfWeek: dayOfWeek,
                // other vars
                calRows: Array.from(Array(6).keys()),
                calCols: Array.from(Array(7).keys()),
                classes: {},
                minDate: minDate,
                maxDate: maxDate,
                calendar: calendar
            };
            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var realCurrentYear = moment$1().year();
                var maxYear = (maxDate && maxDate.year()) || realCurrentYear + 5;
                var minYear = (minDate && minDate.year()) || realCurrentYear - 50;
                var inMinYear = currentYear === minYear;
                var inMaxYear = currentYear === maxYear;
                var years = [];
                for (var y = minYear; y <= maxYear; y++) {
                    years.push(y);
                }
                this.calendarVariables[side].dropdowns = {
                    currentMonth: currentMonth,
                    currentYear: currentYear,
                    maxYear: maxYear,
                    minYear: minYear,
                    inMinYear: inMinYear,
                    inMaxYear: inMaxYear,
                    monthArrays: Array.from(Array(12).keys()),
                    yearArrays: years
                };
                if (side === SideEnum.left) {
                    this.fromMonthControl.setValue(currentMonth, { emitEvent: false });
                    this.fromYearControl.setValue(currentYear, { emitEvent: false });
                }
                else if (side === SideEnum.right) {
                    this.toMonthControl.setValue(currentMonth, { emitEvent: false });
                    this.toYearControl.setValue(currentYear, { emitEvent: false });
                }
            }
            this._buildCells(calendar, side);
        };
        DaterangepickerComponent.prototype.setStartDate = function (startDate) {
            if (typeof startDate === 'string') {
                this.startDate = moment$1(startDate, this.locale.format);
            }
            if (typeof startDate === 'object') {
                this.pickingDate = true;
                this.startDate = moment$1(startDate);
            }
            if (!this.timePicker) {
                this.pickingDate = true;
                this.startDate = this.startDate.startOf('day');
            }
            if (this.timePicker && this.timePickerIncrement) {
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }
            if (this.minDate && this.startDate.isBefore(this.minDate)) {
                this.startDate = this.minDate.clone();
                if (this.timePicker && this.timePickerIncrement) {
                    this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
                }
            }
            if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
                this.startDate = this.maxDate.clone();
                if (this.timePicker && this.timePickerIncrement) {
                    this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
                }
            }
            if (!this.isShown) {
                this.updateElement();
            }
            this.startDateChanged.emit({ startDate: this.startDate });
            this.updateMonthsInView();
        };
        DaterangepickerComponent.prototype.setEndDate = function (endDate) {
            if (typeof endDate === 'string') {
                this.endDate = moment$1(endDate, this.locale.format);
            }
            if (typeof endDate === 'object') {
                this.pickingDate = false;
                this.endDate = moment$1(endDate);
            }
            if (!this.timePicker) {
                this.pickingDate = false;
                this.endDate = this.endDate.add(1, 'd').startOf('day').subtract(1, 'second');
            }
            if (this.timePicker && this.timePickerIncrement) {
                this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }
            if (this.endDate.isBefore(this.startDate)) {
                this.endDate = this.startDate.clone();
            }
            if (this.maxDate && this.endDate.isAfter(this.maxDate)) {
                this.endDate = this.maxDate.clone();
            }
            if (this.dateLimit && this.startDate.clone().add(this.dateLimit, 'day').isBefore(this.endDate)) {
                this.endDate = this.startDate.clone().add(this.dateLimit, 'day');
            }
            if (!this.isShown) {
                // this.updateElement();
            }
            this.endDateChanged.emit({ endDate: this.endDate });
            this.updateMonthsInView();
        };
        DaterangepickerComponent.prototype.updateView = function () {
            if (this.timePicker) {
                this.renderTimePicker(SideEnum.left);
                this.renderTimePicker(SideEnum.right);
            }
            this.updateMonthsInView();
            this.updateCalendars();
        };
        DaterangepickerComponent.prototype.updateMonthsInView = function () {
            if (this.endDate) {
                // if both dates are visible already, do nothing
                if (!this.singleDatePicker &&
                    this.leftCalendar.month &&
                    this.rightCalendar.month &&
                    ((this.startDate && this.leftCalendar && this.startDate.format('YYYY-MM') === this.leftCalendar.month.format('YYYY-MM')) ||
                        (this.startDate &&
                            this.rightCalendar &&
                            this.startDate.format('YYYY-MM') === this.rightCalendar.month.format('YYYY-MM'))) &&
                    (this.endDate.format('YYYY-MM') === this.leftCalendar.month.format('YYYY-MM') ||
                        this.endDate.format('YYYY-MM') === this.rightCalendar.month.format('YYYY-MM'))) {
                    return;
                }
                if (this.startDate) {
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    if (!this.linkedCalendars &&
                        (this.endDate.month() !== this.startDate.month() || this.endDate.year() !== this.startDate.year())) {
                        this.rightCalendar.month = this.endDate.clone().date(2);
                    }
                    else {
                        this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                    }
                }
            }
            else {
                if (this.leftCalendar.month.format('YYYY-MM') !== this.startDate.format('YYYY-MM') &&
                    this.rightCalendar.month.format('YYYY-MM') !== this.startDate.format('YYYY-MM')) {
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            }
            if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
                this.rightCalendar.month = this.maxDate.clone().date(2);
                this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
            }
        };
        /**
         *  This is responsible for updating the calendars
         */
        DaterangepickerComponent.prototype.updateCalendars = function () {
            this.renderCalendar(SideEnum.left);
            this.renderCalendar(SideEnum.right);
            if (this.endDate === null) {
                return;
            }
            this.calculateChosenLabel();
        };
        DaterangepickerComponent.prototype.updateElement = function () {
            var format = this.locale.displayFormat ? this.locale.displayFormat : this.locale.format;
            if (!this.singleDatePicker && this.autoUpdateInput) {
                if (this.startDate && this.endDate) {
                    // if we use ranges and should show range label on input
                    if (this.rangesArray.length &&
                        this.showRangeLabelOnInput === true &&
                        this.chosenRange &&
                        this.locale.customRangeLabel !== this.chosenRange) {
                        this.chosenLabel = this.chosenRange;
                    }
                    else {
                        this.chosenLabel = this.startDate.format(format) + this.locale.separator + this.endDate.format(format);
                    }
                }
            }
            else if (this.autoUpdateInput) {
                this.chosenLabel = this.startDate.format(format);
            }
        };
        /**
         * this should calculate the label
         */
        DaterangepickerComponent.prototype.calculateChosenLabel = function () {
            if (!this.locale || !this.locale.separator) {
                this._buildLocale();
            }
            var customRange = true;
            var i = 0;
            if (this.rangesArray.length > 0) {
                for (var range in this.ranges) {
                    if (this.ranges[range]) {
                        if (this.timePicker) {
                            var format = this.timePickerSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm';
                            // ignore times when comparing dates if time picker seconds is not enabled
                            if (this.startDate.format(format) === this.ranges[range][0].format(format) &&
                                this.endDate.format(format) === this.ranges[range][1].format(format)) {
                                customRange = false;
                                this.chosenRange = this.rangesArray[i];
                                break;
                            }
                        }
                        else {
                            // ignore times when comparing dates if time picker is not enabled
                            if (this.startDate.format('YYYY-MM-DD') === this.ranges[range][0].format('YYYY-MM-DD') &&
                                this.endDate.format('YYYY-MM-DD') === this.ranges[range][1].format('YYYY-MM-DD')) {
                                customRange = false;
                                this.chosenRange = this.rangesArray[i];
                                break;
                            }
                        }
                        i++;
                    }
                }
                if (customRange) {
                    if (this.showCustomRangeLabel) {
                        this.chosenRange = this.locale.customRangeLabel;
                    }
                    else {
                        this.chosenRange = null;
                    }
                    // if custom label: show calendar
                    this.showCalInRanges = true;
                }
            }
            this.updateElement();
        };
        DaterangepickerComponent.prototype.clickApply = function (e) {
            if (!this.singleDatePicker && this.startDate && !this.endDate) {
                this.endDate = this._getDateWithTime(this.startDate, SideEnum.right);
                this.calculateChosenLabel();
            }
            if (this.isInvalidDate && this.startDate && this.endDate) {
                // get if there are invalid date between range
                var d = this.startDate.clone();
                while (d.isBefore(this.endDate)) {
                    if (this.isInvalidDate(d)) {
                        this.endDate = d.subtract(1, 'days');
                        this.calculateChosenLabel();
                        break;
                    }
                    d.add(1, 'days');
                }
            }
            if (this.chosenLabel) {
                this.chosenDate.emit({ chosenLabel: this.chosenLabel, startDate: this.startDate, endDate: this.endDate });
            }
            this.datesUpdated.emit({ startDate: this.startDate, endDate: this.endDate });
            if (e || (this.closeOnAutoApply && !e)) {
                this.hide();
            }
        };
        DaterangepickerComponent.prototype.clickCancel = function () {
            this.startDate = this._old.start;
            this.endDate = this._old.end;
            if (this.inline) {
                this.updateView();
            }
            this.hide();
        };
        /**
         * called when month is changed
         * @param month month represented by a number (0 through 11)
         * @param side left or right
         */
        DaterangepickerComponent.prototype.monthChanged = function (month, side) {
            var year = this.calendarVariables[side].dropdowns.currentYear;
            this.monthOrYearChanged(month, year, side);
        };
        /**
         * called when year is changed
         * @param year year represented by a number
         * @param side left or right
         */
        DaterangepickerComponent.prototype.yearChanged = function (year, side) {
            var month = this.calendarVariables[side].dropdowns.currentMonth;
            this.monthOrYearChanged(month, year, side);
        };
        /**
         * called when time is changed
         * @param side left or right
         */
        DaterangepickerComponent.prototype.timeChanged = function (side) {
            var hour = parseInt(this.timepickerVariables[side].selectedHour, 10);
            var minute = parseInt(this.timepickerVariables[side].selectedMinute, 10);
            var second = this.timePickerSeconds ? parseInt(this.timepickerVariables[side].selectedSecond, 10) : 0;
            if (!this.timePicker24Hour) {
                var ampm = this.timepickerVariables[side].ampmModel;
                if (ampm === 'PM' && hour < 12) {
                    hour += 12;
                }
                if (ampm === 'AM' && hour === 12) {
                    hour = 0;
                }
            }
            if (side === SideEnum.left) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                start.second(second);
                this.setStartDate(start);
                if (this.singleDatePicker) {
                    this.endDate = this.startDate.clone();
                }
                else if (this.endDate && this.endDate.format('YYYY-MM-DD') === start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                    this.setEndDate(start.clone());
                }
                else if (!this.endDate && this.timePicker) {
                    var startClone = this._getDateWithTime(start, SideEnum.right);
                    if (startClone.isBefore(start)) {
                        this.timepickerVariables[SideEnum.right].selectedHour = hour;
                        this.timepickerVariables[SideEnum.right].selectedMinute = minute;
                        this.timepickerVariables[SideEnum.right].selectedSecond = second;
                    }
                }
            }
            else if (this.endDate) {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                end.second(second);
                this.setEndDate(end);
            }
            // update the calendars so all clickable dates reflect the new time component
            this.updateCalendars();
            // re-render the time pickers because changing one selection can affect what's enabled in another
            this.renderTimePicker(SideEnum.left);
            this.renderTimePicker(SideEnum.right);
            if (this.autoApply) {
                this.clickApply();
            }
        };
        /**
         *  call when month or year changed
         * @param month month number 0 -11
         * @param year year eg: 1995
         * @param side left or right
         */
        DaterangepickerComponent.prototype.monthOrYearChanged = function (month, year, side) {
            var isLeft = side === SideEnum.left;
            if (!isLeft) {
                if (year < this.startDate.year() || (year === this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }
            if (this.minDate) {
                if (year < this.minDate.year() || (year === this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }
            if (this.maxDate) {
                if (year > this.maxDate.year() || (year === this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }
            this.calendarVariables[side].dropdowns.currentYear = year;
            this.calendarVariables[side].dropdowns.currentMonth = month;
            if (isLeft) {
                this.leftCalendar.month.month(month).year(year);
                if (this.linkedCalendars) {
                    this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
                }
            }
            else {
                this.rightCalendar.month.month(month).year(year);
                if (this.linkedCalendars) {
                    this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
                }
            }
            this.updateCalendars();
        };
        /**
         * Click on previous month
         * @param side left or right calendar
         */
        DaterangepickerComponent.prototype.clickPrev = function (side) {
            if (side === SideEnum.left) {
                this.leftCalendar.month.subtract(1, 'month');
                if (this.linkedCalendars) {
                    this.rightCalendar.month.subtract(1, 'month');
                }
            }
            else {
                this.rightCalendar.month.subtract(1, 'month');
            }
            this.updateCalendars();
        };
        /**
         * Click on next month
         * @param side left or right calendar
         */
        DaterangepickerComponent.prototype.clickNext = function (side) {
            if (side === SideEnum.left) {
                this.leftCalendar.month.add(1, 'month');
            }
            else {
                this.rightCalendar.month.add(1, 'month');
                if (this.linkedCalendars) {
                    this.leftCalendar.month.add(1, 'month');
                }
            }
            this.updateCalendars();
        };
        /**
         * When hovering a date
         * @param e event: get value by e.target.value
         * @param side left or right
         * @param row row position of the current date clicked
         * @param col col position of the current date clicked
         */
        DaterangepickerComponent.prototype.hoverDate = function (e, side, row, col) {
            var leftCalDate = this.calendarVariables.left.calendar[row][col];
            var rightCalDate = this.calendarVariables.right.calendar[row][col];
            if (this.pickingDate) {
                var hoverDate = side === SideEnum.left ? leftCalDate : rightCalDate;
                this.nowHoveredDate = this._isDateRangeInvalid(hoverDate) ? null : hoverDate;
                this.renderCalendar(SideEnum.left);
                this.renderCalendar(SideEnum.right);
            }
            var tooltip = side === SideEnum.left ? this.tooltiptext[leftCalDate] : this.tooltiptext[rightCalDate];
            if (tooltip.length > 0) {
                e.target.setAttribute('title', tooltip);
            }
        };
        /**
         * When selecting a date
         * @param e event: get value by e.target.value
         * @param side left or right
         * @param row row position of the current date clicked
         * @param col col position of the current date clicked
         */
        DaterangepickerComponent.prototype.clickDate = function (e, side, row, col) {
            if (e.target.tagName === 'TD') {
                if (!e.target.classList.contains('available')) {
                    return;
                }
            }
            else if (e.target.tagName === 'SPAN') {
                if (!e.target.parentElement.classList.contains('available')) {
                    return;
                }
            }
            if (this.rangesArray.length) {
                this.chosenRange = this.locale.customRangeLabel;
            }
            var date = side === SideEnum.left ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
            if ((this.endDate || (date.isBefore(this.startDate, 'day') && this.customRangeDirection === false)) &&
                this.lockStartDate === false) {
                // picking start
                if (this.timePicker) {
                    date = this._getDateWithTime(date, SideEnum.left);
                }
                this.endDate = null;
                this.setStartDate(date.clone());
            }
            else if (!this.endDate && date.isBefore(this.startDate) && this.customRangeDirection === false) {
                // special case: clicking the same date for start/end,
                // but the time of the end date is before the start date
                this.setEndDate(this.startDate.clone());
            }
            else {
                // picking end
                if (this.timePicker) {
                    date = this._getDateWithTime(date, SideEnum.right);
                }
                if (date.isBefore(this.startDate, 'day') === true && this.customRangeDirection === true) {
                    this.setEndDate(this.startDate);
                    this.setStartDate(date.clone());
                }
                else if (this._isDateRangeInvalid(date)) {
                    this.setStartDate(date.clone());
                }
                else {
                    this.setEndDate(date.clone());
                }
                if (this.autoApply) {
                    this.calculateChosenLabel();
                }
            }
            if (this.singleDatePicker) {
                this.setEndDate(this.startDate);
                this.updateElement();
                if (this.autoApply) {
                    this.clickApply();
                }
            }
            this.updateView();
            if (this.autoApply && this.startDate && this.endDate) {
                this.clickApply();
            }
            // This is to cancel the blur event handler if the mouse was in one of the inputs
            e.stopPropagation();
        };
        /**
         *  Click on the custom range
         * @param label
         */
        DaterangepickerComponent.prototype.clickRange = function (label) {
            this.chosenRange = label;
            if (label === this.locale.customRangeLabel) {
                this.isShown = true; // show calendars
                this.showCalInRanges = true;
            }
            else {
                var dates = this.ranges[label];
                this.startDate = dates[0].clone();
                this.endDate = dates[1].clone();
                if (this.showRangeLabelOnInput && label !== this.locale.customRangeLabel) {
                    this.chosenLabel = label;
                }
                else {
                    this.calculateChosenLabel();
                }
                this.showCalInRanges = !this.rangesArray.length || this.alwaysShowCalendars;
                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }
                if (!this.alwaysShowCalendars) {
                    this.isShown = false; // hide calendars
                }
                this.rangeClicked.emit({ label: label, dates: dates });
                if (!this.keepCalendarOpeningWithRange || this.autoApply) {
                    this.clickApply();
                }
                else {
                    if (!this.alwaysShowCalendars) {
                        return this.clickApply();
                    }
                    if (this.maxDate && this.maxDate.isSame(dates[0], 'month')) {
                        this.rightCalendar.month.month(dates[0].month());
                        this.rightCalendar.month.year(dates[0].year());
                        this.leftCalendar.month.month(dates[0].month() - 1);
                        this.leftCalendar.month.year(dates[1].year());
                    }
                    else {
                        this.leftCalendar.month.month(dates[0].month());
                        this.leftCalendar.month.year(dates[0].year());
                        if (this.linkedCalendars || dates[0].month() === dates[1].month()) {
                            var nextMonth = dates[0].clone().add(1, 'month');
                            this.rightCalendar.month.month(nextMonth.month());
                            this.rightCalendar.month.year(nextMonth.year());
                        }
                        else {
                            this.rightCalendar.month.month(dates[1].month());
                            this.rightCalendar.month.year(dates[1].year());
                        }
                    }
                    this.updateCalendars();
                    if (this.timePicker) {
                        this.renderTimePicker(SideEnum.left);
                        this.renderTimePicker(SideEnum.right);
                    }
                }
            }
        };
        DaterangepickerComponent.prototype.show = function (e) {
            if (this.isShown) {
                return;
            }
            this._old.start = this.startDate.clone();
            this._old.end = this.endDate.clone();
            this.isShown = true;
            this.updateView();
        };
        DaterangepickerComponent.prototype.hide = function () {
            this.closeDateRangePicker.emit();
            if (!this.isShown) {
                return;
            }
            // incomplete date selection, revert to last values
            if (!this.endDate) {
                if (this._old.start) {
                    this.startDate = this._old.start.clone();
                }
                if (this._old.end) {
                    this.endDate = this._old.end.clone();
                }
            }
            // if a new date range was selected, invoke the user callback function
            if (!this.startDate.isSame(this._old.start) || !this.endDate.isSame(this._old.end)) {
                // this.callback(this.startDate, this.endDate, this.chosenLabel);
            }
            // if picker is attached to a text input, update it
            this.updateElement();
            this.isShown = false;
            this._ref.detectChanges();
            this.closeDateRangePicker.emit();
        };
        /**
         * handle click on all element in the component, useful for outside of click
         * @param e event
         */
        DaterangepickerComponent.prototype.handleInternalClick = function (e) {
            e.stopPropagation();
        };
        /**
         * update the locale options
         * @param locale
         */
        DaterangepickerComponent.prototype.updateLocale = function (locale) {
            for (var key in locale) {
                if (locale.hasOwnProperty(key)) {
                    this.locale[key] = locale[key];
                    if (key === 'customRangeLabel') {
                        this.renderRanges();
                    }
                }
            }
        };
        /**
         *  clear the daterange picker
         */
        DaterangepickerComponent.prototype.clear = function () {
            this.startDate = moment$1().startOf('day');
            this.endDate = moment$1().endOf('day');
            this.chosenDate.emit({ chosenLabel: '', startDate: null, endDate: null });
            this.datesUpdated.emit({ startDate: null, endDate: null });
            this.hide();
        };
        /**
         * Find out if the selected range should be disabled if it doesn't
         * fit into minDate and maxDate limitations.
         */
        DaterangepickerComponent.prototype.disableRange = function (range) {
            var _this = this;
            if (range === this.locale.customRangeLabel) {
                return false;
            }
            var rangeMarkers = this.ranges[range];
            var areBothBefore = rangeMarkers.every(function (date) {
                if (!_this.minDate) {
                    return false;
                }
                return date.isBefore(_this.minDate);
            });
            var areBothAfter = rangeMarkers.every(function (date) {
                if (!_this.maxDate) {
                    return false;
                }
                return date.isAfter(_this.maxDate);
            });
            return areBothBefore || areBothAfter;
        };
        /**
         *
         * @param date the date to add time
         * @param side left or right
         */
        DaterangepickerComponent.prototype._getDateWithTime = function (date, side) {
            var hour = parseInt(this.timepickerVariables[side].selectedHour, 10);
            if (!this.timePicker24Hour) {
                var ampm = this.timepickerVariables[side].ampmModel;
                if (ampm === 'PM' && hour < 12) {
                    hour += 12;
                }
                if (ampm === 'AM' && hour === 12) {
                    hour = 0;
                }
            }
            var minute = parseInt(this.timepickerVariables[side].selectedMinute, 10);
            var second = this.timePickerSeconds ? parseInt(this.timepickerVariables[side].selectedSecond, 10) : 0;
            return date.clone().hour(hour).minute(minute).second(second);
        };
        /**
         *  build the locale config
         */
        DaterangepickerComponent.prototype._buildLocale = function () {
            this.locale = Object.assign(Object.assign({}, this._localeService.config), this.locale);
            if (!this.locale.format) {
                if (this.timePicker) {
                    this.locale.format = moment$1.localeData().longDateFormat('lll');
                }
                else {
                    this.locale.format = moment$1.localeData().longDateFormat('L');
                }
            }
        };
        DaterangepickerComponent.prototype._buildCells = function (calendar, side) {
            for (var row = 0; row < 6; row++) {
                this.calendarVariables[side].classes[row] = {};
                var rowClasses = [];
                if (this.emptyWeekRowClass && !this.hasCurrentMonthDays(this.calendarVariables[side].month, calendar[row])) {
                    rowClasses.push(this.emptyWeekRowClass);
                }
                for (var col = 0; col < 7; col++) {
                    var classes = [];
                    // highlight today's date
                    if (calendar[row][col].isSame(new Date(), 'day')) {
                        classes.push('today');
                    }
                    // highlight weekends
                    if (calendar[row][col].isoWeekday() > 5) {
                        classes.push('weekend');
                    }
                    // grey out the dates in other months displayed at beginning and end of this calendar
                    if (calendar[row][col].month() !== calendar[1][1].month()) {
                        classes.push('off');
                        // mark the last day of the previous month in this calendar
                        if (this.lastDayOfPreviousMonthClass &&
                            (calendar[row][col].month() < calendar[1][1].month() || calendar[1][1].month() === 0) &&
                            calendar[row][col].date() === this.calendarVariables[side].daysInLastMonth) {
                            classes.push(this.lastDayOfPreviousMonthClass);
                        }
                        // mark the first day of the next month in this calendar
                        if (this.firstDayOfNextMonthClass &&
                            (calendar[row][col].month() > calendar[1][1].month() || calendar[row][col].month() === 0) &&
                            calendar[row][col].date() === 1) {
                            classes.push(this.firstDayOfNextMonthClass);
                        }
                    }
                    // mark the first day of the current month with a custom class
                    if (this.firstMonthDayClass &&
                        calendar[row][col].month() === calendar[1][1].month() &&
                        calendar[row][col].date() === calendar.firstDay.date()) {
                        classes.push(this.firstMonthDayClass);
                    }
                    // mark the last day of the current month with a custom class
                    if (this.lastMonthDayClass &&
                        calendar[row][col].month() === calendar[1][1].month() &&
                        calendar[row][col].date() === calendar.lastDay.date()) {
                        classes.push(this.lastMonthDayClass);
                    }
                    // don't allow selection of dates before the minimum date
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day')) {
                        classes.push('off', 'disabled');
                    }
                    // don't allow selection of dates after the maximum date
                    if (this.calendarVariables[side].maxDate && calendar[row][col].isAfter(this.calendarVariables[side].maxDate, 'day')) {
                        classes.push('off', 'disabled');
                    }
                    // don't allow selection of date if a custom function decides it's invalid
                    if (this.isInvalidDate(calendar[row][col])) {
                        classes.push('off', 'disabled', 'invalid');
                    }
                    // highlight the currently selected start date
                    if (this.startDate && calendar[row][col].format('YYYY-MM-DD') === this.startDate.format('YYYY-MM-DD')) {
                        classes.push('active', 'start-date');
                    }
                    // highlight the currently selected end date
                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') === this.endDate.format('YYYY-MM-DD')) {
                        classes.push('active', 'end-date');
                    }
                    // highlight dates in-between the selected dates
                    if (((this.nowHoveredDate != null && this.pickingDate) || this.endDate != null) &&
                        calendar[row][col] > this.startDate &&
                        (calendar[row][col] < this.endDate || (calendar[row][col] < this.nowHoveredDate && this.pickingDate)) &&
                        !classes.find(function (el) { return el === 'off'; })) {
                        classes.push('in-range');
                    }
                    // apply custom classes for this date
                    var isCustom = this.isCustomDate(calendar[row][col]);
                    if (isCustom !== false) {
                        if (typeof isCustom === 'string') {
                            classes.push(isCustom);
                        }
                        else {
                            Array.prototype.push.apply(classes, isCustom);
                        }
                    }
                    // apply custom tooltip for this date
                    var isTooltip = this.isTooltipDate(calendar[row][col]);
                    if (isTooltip) {
                        if (typeof isTooltip === 'string') {
                            this.tooltiptext[calendar[row][col]] = isTooltip; // setting tooltiptext for custom date
                        }
                        else {
                            this.tooltiptext[calendar[row][col]] = 'Put the tooltip as the returned value of isTooltipDate';
                        }
                    }
                    else {
                        this.tooltiptext[calendar[row][col]] = '';
                    }
                    // store classes var
                    var cname = '', disabled = false;
                    for (var i = 0; i < classes.length; i++) {
                        cname += classes[i] + ' ';
                        if (classes[i] === 'disabled') {
                            disabled = true;
                        }
                    }
                    if (!disabled) {
                        cname += 'available';
                    }
                    this.calendarVariables[side].classes[row][col] = cname.replace(/^\s+|\s+$/g, '');
                }
                this.calendarVariables[side].classes[row].classList = rowClasses.join(' ');
            }
        };
        /**
         * Find out if the current calendar row has current month days
         * (as opposed to consisting of only previous/next month days)
         */
        DaterangepickerComponent.prototype.hasCurrentMonthDays = function (currentMonth, row) {
            for (var day = 0; day < 7; day++) {
                if (row[day].month() === currentMonth) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns true when a date within the range of dates is invalid
         */
        DaterangepickerComponent.prototype._isDateRangeInvalid = function (endDate) {
            var _this = this;
            var days = [];
            var day = this.startDate;
            while (day <= endDate) {
                days.push(day);
                day = day.clone().add(1, 'd');
            }
            return days.some(function (d) { return _this.isInvalidDate(d); });
        };
        return DaterangepickerComponent;
    }());
    DaterangepickerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-daterangepicker-material',
                    template: "<div\n    class=\"md-drppicker\"\n    #pickerContainer\n    [ngClass]=\"{\n        ltr: locale.direction === 'ltr',\n        rtl: this.locale.direction === 'rtl',\n        shown: isShown || inline,\n        hidden: !isShown && !inline,\n        inline: inline,\n        double: !singleDatePicker && showCalInRanges,\n        'show-ranges': rangesArray.length\n    }\"\n>\n    <div *ngIf=\"rangesArray.length > 0\" class=\"ranges\">\n        <ul>\n            <li *ngFor=\"let range of rangesArray\">\n                <button\n                    type=\"button\"\n                    [disabled]=\"disableRange(range)\"\n                    [ngClass]=\"{ active: range === chosenRange }\"\n                    (click)=\"clickRange(range)\"\n                >\n                    {{ range }}\n                </button>\n            </li>\n        </ul>\n    </div>\n    <div class=\"calendar\" [ngClass]=\"{ right: singleDatePicker, left: !singleDatePicker }\" *ngIf=\"showCalInRanges\">\n        <div class=\"calendar-table\">\n            <table class=\"table-condensed\" *ngIf=\"calendarVariables\">\n                <thead>\n                    <tr>\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\"></th>\n                        <ng-container\n                            *ngIf=\"\n                                !calendarVariables.left.minDate ||\n                                (calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) &&\n                                    (!this.linkedCalendars || true))\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickPrev(sideEnum.left)\">\n                                    <span class=\"calendar-icon calendar-icon--left\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    !calendarVariables.left.minDate ||\n                                    (calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) &&\n                                        (!this.linkedCalendars || true))\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                        <th colspan=\"5\" class=\"month drp-animate\">\n                            <ng-container *ngIf=\"showDropdowns && calendarVariables.left.dropdowns\">\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"fromMonthControl\">\n                                        <mat-option\n                                            *ngFor=\"let m of calendarVariables.left.dropdowns.monthArrays\"\n                                            [value]=\"m\"\n                                            [disabled]=\"\n                                                (calendarVariables.left.dropdowns.inMinYear &&\n                                                    m < calendarVariables.left.minDate.month()) ||\n                                                (calendarVariables.left.dropdowns.inMaxYear && m > calendarVariables.left.maxDate.month())\n                                            \"\n                                        >\n                                            {{ locale.monthNames[m] }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"fromYearControl\">\n                                        <mat-option *ngFor=\"let y of calendarVariables.left.dropdowns.yearArrays\" [value]=\"y\">\n                                            {{ y }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                            </ng-container>\n                            <ng-container *ngIf=\"!showDropdowns || !calendarVariables.left.dropdowns\">\n                                {{ this.locale.monthNames[calendarVariables?.left?.calendar[1][1].month()] }}\n                                {{ calendarVariables?.left?.calendar[1][1].format(' YYYY') }}\n                            </ng-container>\n                        </th>\n                        <ng-container\n                            *ngIf=\"\n                                (!calendarVariables.left.maxDate ||\n                                    calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) &&\n                                (!linkedCalendars || singleDatePicker)\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickNext(sideEnum.left)\">\n                                    <span class=\"calendar-icon calendar-icon--right\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    (!calendarVariables.left.maxDate ||\n                                        calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) &&\n                                    (!linkedCalendars || singleDatePicker)\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                    </tr>\n                    <tr class=\"week-days\">\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\" class=\"week\">\n                            <span>{{ this.locale.weekLabel }}</span>\n                        </th>\n                        <th *ngFor=\"let dayofweek of locale.daysOfWeek\">\n                            <span>{{ dayofweek }}</span>\n                        </th>\n                    </tr>\n                </thead>\n                <tbody class=\"drp-animate\">\n                    <tr *ngFor=\"let row of calendarVariables.left.calRows\" [class]=\"calendarVariables.left.classes[row].classList\">\n                        <!-- add week number -->\n                        <td class=\"week\" *ngIf=\"showWeekNumbers\">\n                            <span>{{ calendarVariables.left.calendar[row][0].week() }}</span>\n                        </td>\n                        <td class=\"week\" *ngIf=\"showISOWeekNumbers\">\n                            <span>{{ calendarVariables.left.calendar[row][0].isoWeek() }}</span>\n                        </td>\n                        <!-- cal -->\n                        <td\n                            *ngFor=\"let col of calendarVariables.left.calCols\"\n                            [class]=\"calendarVariables.left.classes[row][col]\"\n                            (click)=\"clickDate($event, sideEnum.left, row, col)\"\n                            (mouseenter)=\"hoverDate($event, sideEnum.left, row, col)\"\n                        >\n                            <span>{{ calendarVariables.left.calendar[row][col].date() }}</span>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"calendar-time\" *ngIf=\"timePicker\">\n            <div class=\"select\">\n                <mat-select\n                    class=\"hourselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.left.selectedHour\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.left.hours\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.left.disabledHours.indexOf(i) > -1\"\n                    >\n                        {{ i }}\n                    </mat-option>\n                </mat-select>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"minuteselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.left.selectedMinute\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.left.minutes; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.left.disabledMinutes.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.left.minutesLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"secondselect\"\n                    *ngIf=\"timePickerSeconds\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.left.selectedSecond\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.left.seconds; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.left.disabledSeconds.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.left.secondsLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"ampmselect\"\n                    *ngIf=\"!timePicker24Hour\"\n                    [(ngModel)]=\"timepickerVariables.left.ampmModel\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option value=\"AM\" [disabled]=\"timepickerVariables.left.amDisabled\">AM</mat-option>\n                    <mat-option value=\"PM\" [disabled]=\"timepickerVariables.left.pmDisabled\">PM</mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n        </div>\n    </div>\n    <div class=\"calendar right\" *ngIf=\"showCalInRanges && !singleDatePicker\">\n        <div class=\"calendar-table\">\n            <table class=\"table-condensed\" *ngIf=\"calendarVariables\">\n                <thead>\n                    <tr>\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\"></th>\n                        <ng-container\n                            *ngIf=\"\n                                (!calendarVariables.right.minDate ||\n                                    calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) &&\n                                !this.linkedCalendars\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickPrev(sideEnum.right)\">\n                                    <span class=\"calendar-icon calendar-icon--left\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    (!calendarVariables.right.minDate ||\n                                        calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) &&\n                                    !this.linkedCalendars\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                        <th colspan=\"5\" class=\"month\">\n                            <ng-container *ngIf=\"showDropdowns && calendarVariables.right.dropdowns\">\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"toMonthControl\">\n                                        <mat-option\n                                            *ngFor=\"let m of calendarVariables.right.dropdowns.monthArrays\"\n                                            [disabled]=\"\n                                                (calendarVariables.right.dropdowns.inMinYear && calendarVariables.right.minDate &&\n                                                    m < calendarVariables.right.minDate.month()) ||\n                                                (calendarVariables.right.dropdowns.inMaxYear && calendarVariables.right.maxDate &&\n                                                m > calendarVariables.right.maxDate.month())\n                                            \"\n                                            [value]=\"m\"\n                                        >\n                                            {{ locale.monthNames[m] }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"toYearControl\">\n                                        <mat-option *ngFor=\"let y of calendarVariables.right.dropdowns.yearArrays\" [value]=\"y\">\n                                            {{ y }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                            </ng-container>\n                            <ng-container *ngIf=\"!showDropdowns || !calendarVariables.right.dropdowns\">\n                                {{ this.locale.monthNames[calendarVariables?.right?.calendar[1][1].month()] }}\n                                {{ calendarVariables?.right?.calendar[1][1].format(' YYYY') }}\n                            </ng-container>\n                        </th>\n                        <ng-container\n                            *ngIf=\"\n                                !calendarVariables.right.maxDate ||\n                                (calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) &&\n                                    (!linkedCalendars || singleDatePicker || true))\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickNext(sideEnum.right)\">\n                                    <span class=\"calendar-icon calendar-icon--right\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    !calendarVariables.right.maxDate ||\n                                    (calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) &&\n                                        (!linkedCalendars || singleDatePicker || true))\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                    </tr>\n\n                    <tr class=\"week-days\">\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\" class=\"week\">\n                            <span>{{ this.locale.weekLabel }}</span>\n                        </th>\n                        <th *ngFor=\"let dayofweek of locale.daysOfWeek\">\n                            <span>{{ dayofweek }}</span>\n                        </th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let row of calendarVariables.right.calRows\" [class]=\"calendarVariables.right.classes[row].classList\">\n                        <td class=\"week\" *ngIf=\"showWeekNumbers\">\n                            <span>{{ calendarVariables.right.calendar[row][0].week() }}</span>\n                        </td>\n                        <td class=\"week\" *ngIf=\"showISOWeekNumbers\">\n                            <span>{{ calendarVariables.right.calendar[row][0].isoWeek() }}</span>\n                        </td>\n                        <td\n                            *ngFor=\"let col of calendarVariables.right.calCols\"\n                            [class]=\"calendarVariables.right.classes[row][col]\"\n                            (click)=\"clickDate($event, sideEnum.right, row, col)\"\n                            (mouseenter)=\"hoverDate($event, sideEnum.right, row, col)\"\n                        >\n                            <span>{{ calendarVariables.right.calendar[row][col].date() }}</span>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"calendar-time\" *ngIf=\"timePicker\">\n            <div class=\"select\">\n                <mat-select\n                    class=\"hourselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedHour\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.right.hours\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.right.disabledHours.indexOf(i) > -1\"\n                    >\n                        {{ i }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"minuteselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedMinute\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.right.minutes; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.right.disabledMinutes.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.right.minutesLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    *ngIf=\"timePickerSeconds\"\n                    class=\"secondselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedSecond\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.right.seconds; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.right.disabledSeconds.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.right.secondsLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    *ngIf=\"!timePicker24Hour\"\n                    class=\"ampmselect\"\n                    [(ngModel)]=\"timepickerVariables.right.ampmModel\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option value=\"AM\" [disabled]=\"timepickerVariables.right.amDisabled\">AM</mat-option>\n                    <mat-option value=\"PM\" [disabled]=\"timepickerVariables.right.pmDisabled\">PM</mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n        </div>\n    </div>\n    <div class=\"buttons\" *ngIf=\"!autoApply && (!rangesArray.length || (showCalInRanges && !singleDatePicker))\">\n        <div class=\"buttons_input\">\n            <button *ngIf=\"showClearButton\" mat-raised-button type=\"button\" [title]=\"locale.clearLabel\" (click)=\"clear()\">\n                <span class=\"clear-button\">\n                    {{ locale.clearLabel }}\n                    <span class=\"clear-icon\">\n                        <svg viewBox=\"0 0 24 24\">\n                            <path fill=\"currentColor\" d=\"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z\" />\n                        </svg>\n                    </span>\n                </span>\n            </button>\n            <button *ngIf=\"showCancel\" mat-raised-button (click)=\"clickCancel()\">{{ locale.cancelLabel }}</button>\n            <button [disabled]=\"applyBtn.disabled\" mat-raised-button color=\"primary\" (click)=\"clickApply($event)\">\n                {{ locale.applyLabel }}\n            </button>\n        </div>\n    </div>\n</div>\n",
                    host: {
                        '(click)': 'handleInternalClick($event)'
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: core.forwardRef(function () { return DaterangepickerComponent; }),
                            multi: true
                        }
                    ],
                    styles: [".md-drppicker{border-radius:4px;width:340px;padding:4px;margin-top:-10px;overflow:hidden;font-size:14px;box-shadow:0 2px 4px 0 rgba(0,0,0,.16),0 2px 8px 0 rgba(0,0,0,.12)}.md-drppicker.double{width:auto}.md-drppicker.inline{position:relative;display:inline-block}.md-drppicker:after,.md-drppicker:before{position:absolute;display:inline-block;border-bottom-color:rgba(0,0,0,.2);content:\"\"}.md-drppicker.openscenter:after,.md-drppicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.md-drppicker.single .calendar,.md-drppicker.single .ranges{float:none}.md-drppicker .calendar{max-width:332px;margin:4px}.md-drppicker .calendar.single .calendar-table{border:none}.md-drppicker .calendar td,.md-drppicker .calendar th{padding:1px;white-space:nowrap;text-align:center;min-width:32px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md-drppicker .calendar td span,.md-drppicker .calendar th span{pointer-events:none}.md-drppicker .calendar-table{border:1px solid transparent;padding:4px}.md-drppicker .calendar-table table{border-spacing:2px;border-collapse:separate}.md-drppicker .ranges{float:none;text-align:left;margin:0}.md-drppicker .ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}.md-drppicker .ranges ul li{font-size:12px}.md-drppicker .ranges ul li button{padding:8px 12px;width:100%;background:none;border:none;text-align:left;cursor:pointer;outline:none}.md-drppicker .ranges ul li button[disabled]{opacity:.3}.md-drppicker .ranges ul li button:active{background:transparent}.md-drppicker table{width:100%;margin:0}.md-drppicker td,.md-drppicker th{text-align:center;width:20px;height:20px;border-radius:4px;white-space:nowrap;cursor:pointer;height:2em;width:2em}.md-drppicker td.week,.md-drppicker th.week{font-size:80%}.md-drppicker td.start-date{border-radius:2em 0 0 2em}.md-drppicker td.in-range{border-radius:0}.md-drppicker td.end-date{border-radius:0 2em 2em 0}.md-drppicker td.start-date.end-date{border-radius:4px}.md-drppicker td{margin:.25em 0;transition:background-color .2s ease;border-radius:2em;transform:scale(1);transition:all .45s cubic-bezier(.23,1,.32,1) 0ms}.md-drppicker th.month{width:auto}.md-drppicker option.disabled,.md-drppicker td.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}.md-drppicker .navigation-button{width:32px!important;height:32px!important;line-height:32px!important}.md-drppicker .navigation-button .calendar-icon{transform:rotate(180deg)}.md-drppicker .navigation-button .calendar-icon:after{display:block;content:\"\";height:6px;width:6px;border-width:0 0 2px 2px;border-style:solid;position:absolute;left:50%;top:50%}.md-drppicker .navigation-button .calendar-icon.calendar-icon--left:after{margin-left:1px;transform:translate(-50%,-50%) rotate(45deg)}.md-drppicker .navigation-button .calendar-icon.calendar-icon--right:after{margin-left:-1px;transform:translate(-50%,-50%) rotate(225deg)}.md-drppicker .dropdowns{width:60px}.md-drppicker .dropdowns+.dropdowns{margin-left:4px}.md-drppicker th.month>div{position:relative;display:inline-block}.md-drppicker .calendar-time{text-align:center;margin:4px auto 0;line-height:30px;position:relative}.md-drppicker .calendar-time .select{display:inline}.md-drppicker .calendar-time .select mat-select{width:46px}.md-drppicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}.md-drppicker .md-drppicker_input{position:relative;padding:0 30px 0 0}.md-drppicker .md-drppicker_input i,.md-drppicker .md-drppicker_input svg{position:absolute;left:8px;top:8px}.md-drppicker.rtl .label-input{padding-right:28px;padding-left:6px}.md-drppicker.rtl .md-drppicker_input i,.md-drppicker.rtl .md-drppicker_input svg{left:auto;right:8px}.md-drppicker .show-ranges .drp-calendar.left{border-left:1px solid #ddd}.md-drppicker .show-calendar .ranges{margin-top:8px}.md-drppicker [hidden]{display:none}.md-drppicker button+button{margin-left:8px}.md-drppicker .clear-button{display:flex;align-items:center;justify-content:center}.md-drppicker .clear-button .clear-icon{font-size:20px!important}.md-drppicker .clear-button .clear-icon svg{width:1em;height:1em;fill:currentColor;pointer-events:none;top:.125em;position:relative}.md-drppicker .buttons{text-align:right;margin:0 5px 5px 0}@media (min-width:564px){.md-drppicker{width:auto}.md-drppicker.single .calendar.left{clear:none}.md-drppicker.ltr{direction:ltr;text-align:left}.md-drppicker.ltr .calendar.left{clear:left}.md-drppicker.ltr .calendar.left .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.md-drppicker.ltr .calendar.right{margin-left:0}.md-drppicker.ltr .calendar.right .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.ltr .left .md-drppicker_input,.md-drppicker.ltr .right .md-drppicker_input{padding-right:35px}.md-drppicker.ltr .calendar.left .calendar-table{padding-right:12px}.md-drppicker.ltr .calendar,.md-drppicker.ltr .ranges{float:left}.md-drppicker.rtl{direction:rtl;text-align:right}.md-drppicker.rtl .calendar.left{clear:right;margin-left:0}.md-drppicker.rtl .calendar.left .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.rtl .calendar.right{margin-right:0}.md-drppicker.rtl .calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.md-drppicker.rtl .calendar.left .calendar-table,.md-drppicker.rtl .left .md-drppicker_input{padding-left:12px}.md-drppicker.rtl .calendar,.md-drppicker.rtl .ranges{text-align:right;float:right}.drp-animate{transform:translate(0);transition:transform .2s ease,opacity .2s ease}.drp-animate.drp-picker-site-this{transition-timing-function:linear}.drp-animate.drp-animate-right{transform:translateX(10%);opacity:0}.drp-animate.drp-animate-left{transform:translateX(-10%);opacity:0}}@media (min-width:730px){.md-drppicker .ranges{width:auto}.md-drppicker.ltr .ranges{float:left}.md-drppicker.rtl .ranges{float:right}.md-drppicker .calendar.left{clear:none!important}}"]
                },] }
    ];
    DaterangepickerComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: LocaleService }
    ]; };
    DaterangepickerComponent.propDecorators = {
        startDate: [{ type: core.Input }],
        endDate: [{ type: core.Input }],
        dateLimit: [{ type: core.Input }],
        minDate: [{ type: core.Input }],
        maxDate: [{ type: core.Input }],
        autoApply: [{ type: core.Input }],
        singleDatePicker: [{ type: core.Input }],
        showDropdowns: [{ type: core.Input }],
        showWeekNumbers: [{ type: core.Input }],
        showISOWeekNumbers: [{ type: core.Input }],
        linkedCalendars: [{ type: core.Input }],
        autoUpdateInput: [{ type: core.Input }],
        alwaysShowCalendars: [{ type: core.Input }],
        maxSpan: [{ type: core.Input }],
        lockStartDate: [{ type: core.Input }],
        timePicker: [{ type: core.Input }],
        timePicker24Hour: [{ type: core.Input }],
        timePickerIncrement: [{ type: core.Input }],
        timePickerSeconds: [{ type: core.Input }],
        showClearButton: [{ type: core.Input }],
        firstMonthDayClass: [{ type: core.Input }],
        lastMonthDayClass: [{ type: core.Input }],
        emptyWeekRowClass: [{ type: core.Input }],
        firstDayOfNextMonthClass: [{ type: core.Input }],
        lastDayOfPreviousMonthClass: [{ type: core.Input }],
        locale: [{ type: core.Input }],
        ranges: [{ type: core.Input }],
        showCustomRangeLabel: [{ type: core.Input }],
        showCancel: [{ type: core.Input }],
        keepCalendarOpeningWithRange: [{ type: core.Input }],
        showRangeLabelOnInput: [{ type: core.Input }],
        customRangeDirection: [{ type: core.Input }],
        isInvalidDate: [{ type: core.Input }],
        isCustomDate: [{ type: core.Input }],
        isTooltipDate: [{ type: core.Input }],
        closeOnAutoApply: [{ type: core.Input }],
        chosenDate: [{ type: core.Output }],
        rangeClicked: [{ type: core.Output }],
        datesUpdated: [{ type: core.Output }],
        startDateChanged: [{ type: core.Output }],
        endDateChanged: [{ type: core.Output }],
        closeDateRangePicker: [{ type: core.Output }],
        pickerContainer: [{ type: core.ViewChild, args: ['pickerContainer', { static: true },] }]
    };

    var moment = _moment__namespace;
    var DaterangepickerDirective = /** @class */ (function () {
        function DaterangepickerDirective(_changeDetectorRef, differs, _localeService, elementRef, overlay) {
            this._changeDetectorRef = _changeDetectorRef;
            this.differs = differs;
            this._localeService = _localeService;
            this.elementRef = elementRef;
            this.overlay = overlay;
            this._onChange = Function.prototype;
            this._onTouched = Function.prototype;
            this._validatorChange = Function.prototype;
            this.dateLimit = null;
            this.ranges = {};
            this.opens = 'center';
            this.drops = 'down';
            this.showRangeLabelOnInput = true;
            this.showCancel = false;
            this.lockStartDate = false;
            this.timePicker = false;
            this.timePicker24Hour = false;
            this.timePickerIncrement = 1;
            this.timePickerSeconds = false;
            this.closeOnAutoApply = true;
            this._locale = {};
            this._endKey = 'endDate';
            this._startKey = 'startDate';
            this.notForChangesProperty = ['locale', 'endKey', 'startKey'];
            this.change = new core.EventEmitter();
            this.rangeClicked = new core.EventEmitter();
            this.datesUpdated = new core.EventEmitter();
            this.startDateChanged = new core.EventEmitter();
            this.endDateChanged = new core.EventEmitter();
            this.destroy$ = new rxjs.Subject();
            this.isInvalidDate = function (date) { return false; };
            this.isCustomDate = function (date) { return false; };
            this.isTooltipDate = function (date) { return null; };
        }
        Object.defineProperty(DaterangepickerDirective.prototype, "locale", {
            get: function () {
                return this._locale;
            },
            set: function (value) {
                this._locale = Object.assign(Object.assign({}, this._localeService.config), value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaterangepickerDirective.prototype, "startKey", {
            set: function (value) {
                if (value !== null) {
                    this._startKey = value;
                }
                else {
                    this._startKey = 'startDate';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaterangepickerDirective.prototype, "endKey", {
            set: function (value) {
                if (value !== null) {
                    this._endKey = value;
                }
                else {
                    this._endKey = 'endDate';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DaterangepickerDirective.prototype, "value", {
            get: function () {
                return this._value || null;
            },
            set: function (val) {
                this._value = val;
                this._onChange(val);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        DaterangepickerDirective.prototype.ngOnInit = function () {
            this._buildLocale();
        };
        DaterangepickerDirective.prototype.ngOnChanges = function (changes) {
            for (var change in changes) {
                if (changes.hasOwnProperty(change)) {
                    if (this.componentRef && this.notForChangesProperty.indexOf(change) === -1) {
                        this.componentRef[change] = changes[change].currentValue;
                    }
                }
            }
        };
        DaterangepickerDirective.prototype.ngOnDestroy = function () {
            this.destroy$.next();
        };
        DaterangepickerDirective.prototype.onBlur = function () {
            this._onTouched();
        };
        DaterangepickerDirective.prototype.open = function () {
            var _this = this;
            if (this.overlayRef) {
                this.hide();
            }
            var originX, overlayX;
            switch (this.opens) {
                case 'left':
                    originX = 'end';
                    overlayX = 'end';
                    break;
                case 'center':
                    originX = 'center';
                    overlayX = 'center';
                    break;
                case 'right':
                    originX = 'start';
                    overlayX = 'start';
                    break;
            }
            this.overlayRef = this.overlay.create({
                backdropClass: 'cdk-overlay-transparent-backdrop',
                hasBackdrop: true,
                scrollStrategy: this.overlay.scrollStrategies.reposition(),
                positionStrategy: this.overlay
                    .position()
                    .flexibleConnectedTo(this.elementRef.nativeElement)
                    .withPositions([
                    {
                        offsetY: this.drops === 'up' ? 0 : 13,
                        originX: originX,
                        originY: this.drops === 'up' ? 'top' : 'bottom',
                        overlayX: overlayX,
                        overlayY: this.drops === 'up' ? 'bottom' : 'top'
                    }
                ])
            });
            var dateRangePickerPortal = new portal.ComponentPortal(DaterangepickerComponent);
            this.componentRef = this.overlayRef.attach(dateRangePickerPortal);
            // Assign all inputs
            this.componentRef.instance.minDate = this.minDate;
            this.componentRef.instance.maxDate = this.maxDate;
            this.componentRef.instance.autoApply = this.autoApply;
            this.componentRef.instance.alwaysShowCalendars = this.alwaysShowCalendars;
            this.componentRef.instance.showCustomRangeLabel = this.showCustomRangeLabel;
            this.componentRef.instance.linkedCalendars = this.linkedCalendars;
            this.componentRef.instance.dateLimit = this.dateLimit;
            this.componentRef.instance.singleDatePicker = this.singleDatePicker;
            this.componentRef.instance.showWeekNumbers = this.showWeekNumbers;
            this.componentRef.instance.showISOWeekNumbers = this.showISOWeekNumbers;
            this.componentRef.instance.showDropdowns = this.showDropdowns;
            this.componentRef.instance.showClearButton = this.showClearButton;
            this.componentRef.instance.customRangeDirection = this.customRangeDirection;
            this.componentRef.instance.ranges = this.ranges;
            this.componentRef.instance.firstMonthDayClass = this.firstMonthDayClass;
            this.componentRef.instance.lastMonthDayClass = this.lastMonthDayClass;
            this.componentRef.instance.emptyWeekRowClass = this.emptyWeekRowClass;
            this.componentRef.instance.firstDayOfNextMonthClass = this.firstDayOfNextMonthClass;
            this.componentRef.instance.lastDayOfPreviousMonthClass = this.lastDayOfPreviousMonthClass;
            this.componentRef.instance.keepCalendarOpeningWithRange = this.keepCalendarOpeningWithRange;
            this.componentRef.instance.showRangeLabelOnInput = this.showRangeLabelOnInput;
            this.componentRef.instance.showCancel = this.showCancel;
            this.componentRef.instance.lockStartDate = this.lockStartDate;
            this.componentRef.instance.timePicker = this.timePicker;
            this.componentRef.instance.timePicker24Hour = this.timePicker24Hour;
            this.componentRef.instance.timePickerIncrement = this.timePickerIncrement;
            this.componentRef.instance.timePickerSeconds = this.timePickerSeconds;
            this.componentRef.instance.closeOnAutoApply = this.closeOnAutoApply;
            this.componentRef.instance.locale = this.locale;
            this.componentRef.instance.isInvalidDate = this.isInvalidDate;
            this.componentRef.instance.isCustomDate = this.isCustomDate;
            this.componentRef.instance.isTooltipDate = this.isTooltipDate;
            // Set the value
            this.setValue(this.value);
            var localeDiffer = this.differs.find(this.locale).create();
            if (localeDiffer) {
                var changes = localeDiffer.diff(this.locale);
                if (changes) {
                    this.componentRef.instance.updateLocale(this.locale);
                }
            }
            // Subscribe to all outputs
            this.componentRef.instance.startDateChanged
                .asObservable()
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (itemChanged) {
                _this.startDateChanged.emit(itemChanged);
            });
            this.componentRef.instance.endDateChanged
                .asObservable()
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (itemChanged) {
                _this.endDateChanged.emit(itemChanged);
            });
            this.componentRef.instance.rangeClicked
                .asObservable()
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (range) {
                _this.rangeClicked.emit(range);
            });
            this.componentRef.instance.datesUpdated
                .asObservable()
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (range) {
                _this.datesUpdated.emit(range);
            });
            this.componentRef.instance.chosenDate
                .asObservable()
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (chosenDate) {
                var _c;
                if (chosenDate) {
                    var endDate = chosenDate.endDate, startDate = chosenDate.startDate;
                    _this.value = (_c = {}, _c[_this._startKey] = startDate, _c[_this._endKey] = endDate, _c);
                    _this.change.emit(_this.value);
                    if (typeof chosenDate.chosenLabel === 'string') {
                        _this.elementRef.nativeElement.value = _this.getLabel();
                    }
                    _this.hide();
                }
            });
            this.componentRef.instance.closeDateRangePicker
                .asObservable()
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function () {
                _this.hide();
            });
            // Close the DateRangePicker when the backdrop is clicked
            this.overlayRef
                .backdropClick()
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function () {
                _this.hide();
            });
        };
        DaterangepickerDirective.prototype.hide = function () {
            if (this.overlayRef) {
                this.overlayRef.dispose();
                this.overlayRef = null;
                this.componentRef = null;
            }
        };
        DaterangepickerDirective.prototype.toggle = function () {
            if (this.overlayRef) {
                this.hide();
            }
            else {
                this.open();
            }
        };
        DaterangepickerDirective.prototype.clear = function () {
            if (this.componentRef) {
                this.componentRef.instance.clear();
            }
        };
        DaterangepickerDirective.prototype.writeValue = function (value) {
            var _c, _d;
            if (_moment__namespace.isMoment(value)) {
                this.value = (_c = {}, _c[this._startKey] = value, _c);
            }
            else if (value) {
                this.value = (_d = {}, _d[this._startKey] = moment(value[this._startKey]), _d[this._endKey] = moment(value[this._endKey]), _d);
            }
            else {
                this.value = null;
            }
            this.setValue(this.value);
        };
        DaterangepickerDirective.prototype.registerOnChange = function (fn) {
            this._onChange = fn;
        };
        DaterangepickerDirective.prototype.registerOnTouched = function (fn) {
            this._onTouched = fn;
        };
        DaterangepickerDirective.prototype.setValue = function (value) {
            if (this.componentRef) {
                if (value) {
                    if (value[this._startKey]) {
                        this.componentRef.instance.setStartDate(value[this._startKey]);
                    }
                    if (value[this._endKey]) {
                        this.componentRef.instance.setEndDate(value[this._endKey]);
                    }
                    this.componentRef.instance.calculateChosenLabel(); // this is required to highlight selected range in range picker
                }
                else {
                    this.componentRef.instance.clear();
                }
            }
            this.elementRef.nativeElement.value = this.getLabel();
        };
        DaterangepickerDirective.prototype.inputChanged = function (e) {
            if (e.target.tagName.toLowerCase() !== 'input') {
                return;
            }
            if (!e.target.value.length) {
                return;
            }
            if (this.componentRef) {
                var dateString = e.target.value.split(this.componentRef.instance.locale.separator);
                var start = null, end = null;
                if (dateString.length === 2) {
                    start = moment(dateString[0], this.componentRef.instance.locale.format);
                    end = moment(dateString[1], this.componentRef.instance.locale.format);
                }
                if (this.singleDatePicker || start === null || end === null) {
                    start = moment(e.target.value, this.componentRef.instance.locale.format);
                    end = start;
                }
                if (!start.isValid() || !end.isValid()) {
                    return;
                }
                this.componentRef.instance.setStartDate(start);
                this.componentRef.instance.setEndDate(end);
                this.componentRef.instance.updateView();
            }
        };
        /**
         *  build the locale config
         */
        DaterangepickerDirective.prototype._buildLocale = function () {
            this.locale = Object.assign(Object.assign({}, this._localeService.config), this.locale);
            if (!this.locale.format) {
                if (this.timePicker) {
                    this.locale.format = _moment__namespace.localeData().longDateFormat('lll');
                }
                else {
                    this.locale.format = _moment__namespace.localeData().longDateFormat('L');
                }
            }
        };
        DaterangepickerDirective.prototype.getLabel = function () {
            var _a, _b;
            if (!this.value) {
                return null;
            }
            if (!this.locale || !this.locale.separator) {
                this._buildLocale();
            }
            var customRange = true;
            var i = 0;
            var rangesArray = [];
            for (var range in this.ranges) {
                if (this.ranges[range]) {
                    rangesArray.push(range);
                }
            }
            var chosenRange = null;
            if (rangesArray.length > 0) {
                for (var range in this.ranges) {
                    if (this.ranges[range]) {
                        if (this.timePicker) {
                            var format = this.timePickerSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm';
                            // ignore times when comparing dates if time picker seconds is not enabled
                            if (this.value[this._startKey].format(format) === this.ranges[range][0].format(format) &&
                                this.value[this._endKey].format(format) === this.ranges[range][1].format(format)) {
                                customRange = false;
                                chosenRange = rangesArray[i];
                                break;
                            }
                        }
                        else {
                            // ignore times when comparing dates if time picker is not enabled
                            if (((_a = this.value[this._startKey]) === null || _a === void 0 ? void 0 : _a.format('YYYY-MM-DD')) === this.ranges[range][0].format('YYYY-MM-DD') &&
                                ((_b = this.value[this._endKey]) === null || _b === void 0 ? void 0 : _b.format('YYYY-MM-DD')) === this.ranges[range][1].format('YYYY-MM-DD')) {
                                customRange = false;
                                chosenRange = rangesArray[i];
                                break;
                            }
                        }
                        i++;
                    }
                }
                if (customRange) {
                    if (this.showCustomRangeLabel) {
                        chosenRange = this.locale.customRangeLabel;
                    }
                    else {
                        var format = this.locale.displayFormat ? this.locale.displayFormat : this.locale.format;
                        if (this.singleDatePicker) {
                            chosenRange = this.value[this._startKey].format(format);
                        }
                        else if (this.value[this._startKey] && this.value[this._endKey]) {
                            chosenRange = this.getRangeLabel(this.value[this._startKey], this.value[this._endKey], format);
                        }
                    }
                }
            }
            return chosenRange;
        };
        DaterangepickerDirective.prototype.getRangeLabel = function (fromDate, toDate, format) {
            if (fromDate.date() === 1 && moment(fromDate).endOf('month').format('YYYY-MM-DD') === toDate.format('YYYY-MM-DD')) {
                return fromDate.format('MMMM YYYY');
            }
            var fromStr = fromDate.format(format);
            var toStr = toDate.format(format);
            if (fromStr === toStr) {
                return fromStr;
            }
            return fromStr + this.locale.separator + toStr;
        };
        return DaterangepickerDirective;
    }());
    DaterangepickerDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'input[ngxDaterangepickerMd]',
                    host: {
                        '(keyup.esc)': 'hide()',
                        '(blur)': 'onBlur()',
                        '(click)': 'open()',
                        '(keyup)': 'inputChanged($event)',
                        autocomplete: 'off'
                    },
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: core.forwardRef(function () { return DaterangepickerDirective; }),
                            multi: true
                        }
                    ]
                },] }
    ];
    DaterangepickerDirective.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: core.KeyValueDiffers },
        { type: LocaleService },
        { type: core.ElementRef },
        { type: overlay.Overlay }
    ]; };
    DaterangepickerDirective.propDecorators = {
        minDate: [{ type: core.Input }],
        maxDate: [{ type: core.Input }],
        autoApply: [{ type: core.Input }],
        alwaysShowCalendars: [{ type: core.Input }],
        showCustomRangeLabel: [{ type: core.Input }],
        linkedCalendars: [{ type: core.Input }],
        dateLimit: [{ type: core.Input }],
        singleDatePicker: [{ type: core.Input }],
        showWeekNumbers: [{ type: core.Input }],
        showISOWeekNumbers: [{ type: core.Input }],
        showDropdowns: [{ type: core.Input }],
        showClearButton: [{ type: core.Input }],
        customRangeDirection: [{ type: core.Input }],
        ranges: [{ type: core.Input }],
        opens: [{ type: core.Input }],
        drops: [{ type: core.Input }],
        lastMonthDayClass: [{ type: core.Input }],
        emptyWeekRowClass: [{ type: core.Input }],
        firstDayOfNextMonthClass: [{ type: core.Input }],
        lastDayOfPreviousMonthClass: [{ type: core.Input }],
        keepCalendarOpeningWithRange: [{ type: core.Input }],
        showRangeLabelOnInput: [{ type: core.Input }],
        showCancel: [{ type: core.Input }],
        lockStartDate: [{ type: core.Input }],
        timePicker: [{ type: core.Input }],
        timePicker24Hour: [{ type: core.Input }],
        timePickerIncrement: [{ type: core.Input }],
        timePickerSeconds: [{ type: core.Input }],
        closeOnAutoApply: [{ type: core.Input }],
        locale: [{ type: core.Input }],
        _endKey: [{ type: core.Input }],
        change: [{ type: core.Output }],
        rangeClicked: [{ type: core.Output }],
        datesUpdated: [{ type: core.Output }],
        startDateChanged: [{ type: core.Output }],
        endDateChanged: [{ type: core.Output }],
        isInvalidDate: [{ type: core.Input }],
        isCustomDate: [{ type: core.Input }],
        isTooltipDate: [{ type: core.Input }],
        startKey: [{ type: core.Input }],
        endKey: [{ type: core.Input }]
    };

    var NgxDaterangepickerMd = /** @class */ (function () {
        function NgxDaterangepickerMd() {
        }
        NgxDaterangepickerMd.forRoot = function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: NgxDaterangepickerMd,
                providers: [
                    { provide: LOCALE_CONFIG, useValue: config },
                    { provide: LocaleService, useClass: LocaleService, deps: [LOCALE_CONFIG] }
                ]
            };
        };
        return NgxDaterangepickerMd;
    }());
    NgxDaterangepickerMd.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [DaterangepickerComponent, DaterangepickerDirective],
                    imports: [common.CommonModule, forms.FormsModule, forms.ReactiveFormsModule, button.MatButtonModule, select.MatSelectModule, overlay.OverlayModule],
                    exports: [DaterangepickerComponent, DaterangepickerDirective]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DaterangepickerComponent = DaterangepickerComponent;
    exports.DaterangepickerDirective = DaterangepickerDirective;
    exports.DefaultLocaleConfig = DefaultLocaleConfig;
    exports.LOCALE_CONFIG = LOCALE_CONFIG;
    exports.LocaleService = LocaleService;
    exports.NgxDaterangepickerMd = NgxDaterangepickerMd;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-daterangepicker-material.umd.js.map