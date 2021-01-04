import { __assign, __decorate } from "tslib";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, Directive, ElementRef, EventEmitter, forwardRef, Input, KeyValueDiffers, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DaterangepickerComponent } from './daterangepicker.component';
import { LocaleService } from './locale.service';
var moment = _moment;
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
        this.change = new EventEmitter();
        this.rangeClicked = new EventEmitter();
        this.datesUpdated = new EventEmitter();
        this.startDateChanged = new EventEmitter();
        this.endDateChanged = new EventEmitter();
        this.destroy$ = new Subject();
        this.isInvalidDate = function (date) { return false; };
        this.isCustomDate = function (date) { return false; };
        this.isTooltipDate = function (date) { return null; };
    }
    DaterangepickerDirective_1 = DaterangepickerDirective;
    Object.defineProperty(DaterangepickerDirective.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (value) {
            this._locale = __assign(__assign({}, this._localeService.config), value);
        },
        enumerable: true,
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
        enumerable: true,
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
        enumerable: true,
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
        enumerable: true,
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
        var dateRangePickerPortal = new ComponentPortal(DaterangepickerComponent);
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
            .pipe(takeUntil(this.destroy$))
            .subscribe(function (itemChanged) {
            _this.startDateChanged.emit(itemChanged);
        });
        this.componentRef.instance.endDateChanged
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe(function (itemChanged) {
            _this.endDateChanged.emit(itemChanged);
        });
        this.componentRef.instance.rangeClicked
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe(function (range) {
            _this.rangeClicked.emit(range);
        });
        this.componentRef.instance.datesUpdated
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe(function (range) {
            _this.datesUpdated.emit(range);
        });
        this.componentRef.instance.chosenDate
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe(function (chosenDate) {
            var _a;
            if (chosenDate) {
                var endDate = chosenDate.endDate, startDate = chosenDate.startDate;
                _this.value = (_a = {}, _a[_this._startKey] = startDate, _a[_this._endKey] = endDate, _a);
                _this.change.emit(_this.value);
                if (typeof chosenDate.chosenLabel === 'string') {
                    _this.elementRef.nativeElement.value = _this.getLabel();
                }
                _this.hide();
            }
        });
        this.componentRef.instance.closeDateRangePicker
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe(function () {
            _this.hide();
        });
        // Close the DateRangePicker when the backdrop is clicked
        this.overlayRef
            .backdropClick()
            .pipe(takeUntil(this.destroy$))
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
        var _a, _b;
        if (_moment.isMoment(value)) {
            this.value = (_a = {}, _a[this._startKey] = value, _a);
        }
        else if (value) {
            this.value = (_b = {}, _b[this._startKey] = moment(value[this._startKey]), _b[this._endKey] = moment(value[this._endKey]), _b);
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
        this.locale = __assign(__assign({}, this._localeService.config), this.locale);
        if (!this.locale.format) {
            if (this.timePicker) {
                this.locale.format = _moment.localeData().longDateFormat('lll');
            }
            else {
                this.locale.format = _moment.localeData().longDateFormat('L');
            }
        }
    };
    DaterangepickerDirective.prototype.getLabel = function () {
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
                        if (this.value[this._startKey].format('YYYY-MM-DD') === this.ranges[range][0].format('YYYY-MM-DD') &&
                            this.value[this._endKey].format('YYYY-MM-DD') === this.ranges[range][1].format('YYYY-MM-DD')) {
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
    var DaterangepickerDirective_1;
    DaterangepickerDirective.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: KeyValueDiffers },
        { type: LocaleService },
        { type: ElementRef },
        { type: Overlay }
    ]; };
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "minDate", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "maxDate", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "autoApply", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "alwaysShowCalendars", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "showCustomRangeLabel", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "linkedCalendars", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "dateLimit", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "singleDatePicker", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "showWeekNumbers", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "showISOWeekNumbers", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "showDropdowns", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "showClearButton", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "customRangeDirection", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "ranges", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "opens", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "drops", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "lastMonthDayClass", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "emptyWeekRowClass", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "firstDayOfNextMonthClass", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "lastDayOfPreviousMonthClass", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "keepCalendarOpeningWithRange", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "showRangeLabelOnInput", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "showCancel", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "lockStartDate", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "timePicker", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "timePicker24Hour", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "timePickerIncrement", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "timePickerSeconds", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "closeOnAutoApply", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "locale", null);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "_endKey", void 0);
    __decorate([
        Output()
    ], DaterangepickerDirective.prototype, "change", void 0);
    __decorate([
        Output()
    ], DaterangepickerDirective.prototype, "rangeClicked", void 0);
    __decorate([
        Output()
    ], DaterangepickerDirective.prototype, "datesUpdated", void 0);
    __decorate([
        Output()
    ], DaterangepickerDirective.prototype, "startDateChanged", void 0);
    __decorate([
        Output()
    ], DaterangepickerDirective.prototype, "endDateChanged", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "isInvalidDate", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "isCustomDate", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "isTooltipDate", void 0);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "startKey", null);
    __decorate([
        Input()
    ], DaterangepickerDirective.prototype, "endKey", null);
    DaterangepickerDirective = DaterangepickerDirective_1 = __decorate([
        Directive({
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
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return DaterangepickerDirective_1; }),
                    multi: true
                }
            ]
        })
    ], DaterangepickerDirective);
    return DaterangepickerDirective;
}());
export { DaterangepickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlcGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRlcmFuZ2VwaWNrZXItbWF0ZXJpYWwvIiwic291cmNlcyI6WyJkYXRlcmFuZ2VwaWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLGVBQWUsRUFDZixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBbUJ2QjtJQTBISSxrQ0FDVyxrQkFBcUMsRUFDcEMsT0FBd0IsRUFDeEIsY0FBNkIsRUFDN0IsVUFBc0IsRUFDdEIsT0FBZ0I7UUFKakIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNwQyxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUN4QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FB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SWxCO1FBQVQsTUFBTSxFQUFFOzREQUFtRztJQUNsRztRQUFULE1BQU0sRUFBRTtrRUFBNkc7SUFDNUc7UUFBVCxNQUFNLEVBQUU7a0VBQXlHO0lBQ3hHO1FBQVQsTUFBTSxFQUFFO3NFQUFvRjtJQUNuRjtRQUFULE1BQU0sRUFBRTtvRUFBZ0Y7SUFNekY7UUFEQyxLQUFLLEVBQUU7bUVBQ3dDO0lBRWhEO1FBREMsS0FBSyxFQUFFO2tFQUN1QztJQUUvQztRQURDLEtBQUssRUFBRTttRUFDdUM7SUFFdEM7UUFBUixLQUFLLEVBQUU7NERBTVA7SUFFUTtRQUFSLEtBQUssRUFBRTswREFNUDtJQTlHUSx3QkFBd0I7UUFqQnBDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsSUFBSSxFQUFFO2dCQUNGLGFBQWEsRUFBRSxRQUFRO2dCQUN2QixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFNBQVMsRUFBRSxzQkFBc0I7Z0JBQ2pDLFlBQVksRUFBRSxLQUFLO2FBQ3RCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLDBCQUF3QixFQUF4QixDQUF3QixDQUFDO29CQUN2RCxLQUFLLEVBQUUsSUFBSTtpQkFDZDthQUNKO1NBQ0osQ0FBQztPQUNXLHdCQUF3QixDQXNkcEM7SUFBRCwrQkFBQztDQUFBLEFBdGRELElBc2RDO1NBdGRZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0ICogYXMgX21vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlcmFuZ2VwaWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IExvY2FsZUNvbmZpZyB9IGZyb20gJy4vZGF0ZXJhbmdlcGlja2VyLmNvbmZpZyc7XG5pbXBvcnQgeyBMb2NhbGVTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbGUuc2VydmljZSc7XG5cbmNvbnN0IG1vbWVudCA9IF9tb21lbnQ7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbmd4RGF0ZXJhbmdlcGlja2VyTWRdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5dXAuZXNjKSc6ICdoaWRlKCknLFxuICAgICAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcbiAgICAgICAgJyhjbGljayknOiAnb3BlbigpJyxcbiAgICAgICAgJyhrZXl1cCknOiAnaW5wdXRDaGFuZ2VkKCRldmVudCknLFxuICAgICAgICBhdXRvY29tcGxldGU6ICdvZmYnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlcmFuZ2VwaWNrZXJEaXJlY3RpdmUpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZXJhbmdlcGlja2VyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfb25DaGFuZ2UgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gICAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICAgIHByaXZhdGUgX3ZhbGlkYXRvckNoYW5nZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgICBwcml2YXRlIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPERhdGVyYW5nZXBpY2tlckNvbXBvbmVudD47XG5cbiAgICBASW5wdXQoKVxuICAgIG1pbkRhdGU6IF9tb21lbnQuTW9tZW50O1xuICAgIEBJbnB1dCgpXG4gICAgbWF4RGF0ZTogX21vbWVudC5Nb21lbnQ7XG4gICAgQElucHV0KClcbiAgICBhdXRvQXBwbHk6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBhbHdheXNTaG93Q2FsZW5kYXJzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0N1c3RvbVJhbmdlTGFiZWw6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBsaW5rZWRDYWxlbmRhcnM6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBkYXRlTGltaXQ6IG51bWJlciA9IG51bGw7XG4gICAgQElucHV0KClcbiAgICBzaW5nbGVEYXRlUGlja2VyOiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0lTT1dlZWtOdW1iZXJzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0Ryb3Bkb3duczogYm9vbGVhbjtcbiAgICBASW5wdXQoKVxuICAgIHNob3dDbGVhckJ1dHRvbjogYm9vbGVhbjtcbiAgICBASW5wdXQoKVxuICAgIGN1c3RvbVJhbmdlRGlyZWN0aW9uOiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgcmFuZ2VzID0ge307XG4gICAgQElucHV0KClcbiAgICBvcGVuczogJ2xlZnQnIHwgJ2NlbnRlcicgfCAncmlnaHQnID0gJ2NlbnRlcic7XG4gICAgQElucHV0KClcbiAgICBkcm9wczogJ3VwJyB8ICdkb3duJyA9ICdkb3duJztcbiAgICBmaXJzdE1vbnRoRGF5Q2xhc3M6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIGxhc3RNb250aERheUNsYXNzOiBzdHJpbmc7XG4gICAgQElucHV0KClcbiAgICBlbXB0eVdlZWtSb3dDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgpXG4gICAgZmlyc3REYXlPZk5leHRNb250aENsYXNzOiBzdHJpbmc7XG4gICAgQElucHV0KClcbiAgICBsYXN0RGF5T2ZQcmV2aW91c01vbnRoQ2xhc3M6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIGtlZXBDYWxlbmRhck9wZW5pbmdXaXRoUmFuZ2U6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBzaG93UmFuZ2VMYWJlbE9uSW5wdXQgPSB0cnVlO1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0NhbmNlbCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgbG9ja1N0YXJ0RGF0ZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgdGltZVBpY2tlciA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgdGltZVBpY2tlcjI0SG91ciA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgdGltZVBpY2tlckluY3JlbWVudCA9IDE7XG4gICAgQElucHV0KClcbiAgICB0aW1lUGlja2VyU2Vjb25kcyA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGNsb3NlT25BdXRvQXBwbHkgPSB0cnVlO1xuICAgIF9sb2NhbGU6IExvY2FsZUNvbmZpZyA9IHt9O1xuICAgIEBJbnB1dCgpIHNldCBsb2NhbGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlID0geyAuLi50aGlzLl9sb2NhbGVTZXJ2aWNlLmNvbmZpZywgLi4udmFsdWUgfTtcbiAgICB9XG5cbiAgICBnZXQgbG9jYWxlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIF9lbmRLZXkgPSAnZW5kRGF0ZSc7XG4gICAgcHJpdmF0ZSBfc3RhcnRLZXkgPSAnc3RhcnREYXRlJztcbiAgICBub3RGb3JDaGFuZ2VzUHJvcGVydHk6IEFycmF5PHN0cmluZz4gPSBbJ2xvY2FsZScsICdlbmRLZXknLCAnc3RhcnRLZXknXTtcblxuICAgIEBPdXRwdXQoKSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjx7IHN0YXJ0RGF0ZTogX21vbWVudC5Nb21lbnQ7IGVuZERhdGU6IF9tb21lbnQuTW9tZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSByYW5nZUNsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGxhYmVsOiBzdHJpbmc7IGRhdGVzOiBbX21vbWVudC5Nb21lbnQsIF9tb21lbnQuTW9tZW50XSB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgZGF0ZXNVcGRhdGVkOiBFdmVudEVtaXR0ZXI8eyBzdGFydERhdGU6IF9tb21lbnQuTW9tZW50OyBlbmREYXRlOiBfbW9tZW50Lk1vbWVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgc3RhcnREYXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHsgc3RhcnREYXRlOiBfbW9tZW50Lk1vbWVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgZW5kRGF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjx7IGVuZERhdGU6IF9tb21lbnQuTW9tZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIGlzSW52YWxpZERhdGUgPSAoZGF0ZTogX21vbWVudC5Nb21lbnQpID0+IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgaXNDdXN0b21EYXRlID0gKGRhdGU6IF9tb21lbnQuTW9tZW50KSA9PiBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIGlzVG9vbHRpcERhdGUgPSAoZGF0ZTogX21vbWVudC5Nb21lbnQpID0+IG51bGw7XG5cbiAgICBASW5wdXQoKSBzZXQgc3RhcnRLZXkodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEtleSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRLZXkgPSAnc3RhcnREYXRlJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBlbmRLZXkodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmRLZXkgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZEtleSA9ICdlbmREYXRlJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlIHx8IG51bGw7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbCkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbDtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UodmFsKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgcHJpdmF0ZSBfbG9jYWxlU2VydmljZTogTG9jYWxlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXlcbiAgICApIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYnVpbGRMb2NhbGUoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgY2hhbmdlIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KGNoYW5nZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21wb25lbnRSZWYgJiYgdGhpcy5ub3RGb3JDaGFuZ2VzUHJvcGVydHkuaW5kZXhPZihjaGFuZ2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZltjaGFuZ2VdID0gY2hhbmdlc1tjaGFuZ2VdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25CbHVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvcmlnaW5YLCBvdmVybGF5WDtcbiAgICAgICAgc3dpdGNoICh0aGlzLm9wZW5zKSB7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICBvcmlnaW5YID0gJ2VuZCc7XG4gICAgICAgICAgICAgICAgb3ZlcmxheVggPSAnZW5kJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgb3JpZ2luWCA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgIG92ZXJsYXlYID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgb3JpZ2luWCA9ICdzdGFydCc7XG4gICAgICAgICAgICAgICAgb3ZlcmxheVggPSAnc3RhcnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnLFxuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5vdmVybGF5XG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcbiAgICAgICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFk6IHRoaXMuZHJvcHMgPT09ICd1cCcgPyAwIDogMTMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5YLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogdGhpcy5kcm9wcyA9PT0gJ3VwJyA/ICd0b3AnIDogJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5WCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiB0aGlzLmRyb3BzID09PSAndXAnID8gJ2JvdHRvbScgOiAndG9wJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGRhdGVSYW5nZVBpY2tlclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoRGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKGRhdGVSYW5nZVBpY2tlclBvcnRhbCk7XG5cbiAgICAgICAgLy8gQXNzaWduIGFsbCBpbnB1dHNcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UubWluRGF0ZSA9IHRoaXMubWluRGF0ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UubWF4RGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuYXV0b0FwcGx5ID0gdGhpcy5hdXRvQXBwbHk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmFsd2F5c1Nob3dDYWxlbmRhcnMgPSB0aGlzLmFsd2F5c1Nob3dDYWxlbmRhcnM7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnNob3dDdXN0b21SYW5nZUxhYmVsID0gdGhpcy5zaG93Q3VzdG9tUmFuZ2VMYWJlbDtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UubGlua2VkQ2FsZW5kYXJzID0gdGhpcy5saW5rZWRDYWxlbmRhcnM7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmRhdGVMaW1pdCA9IHRoaXMuZGF0ZUxpbWl0O1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5zaW5nbGVEYXRlUGlja2VyID0gdGhpcy5zaW5nbGVEYXRlUGlja2VyO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5zaG93V2Vla051bWJlcnMgPSB0aGlzLnNob3dXZWVrTnVtYmVycztcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2Uuc2hvd0lTT1dlZWtOdW1iZXJzID0gdGhpcy5zaG93SVNPV2Vla051bWJlcnM7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnNob3dEcm9wZG93bnMgPSB0aGlzLnNob3dEcm9wZG93bnM7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnNob3dDbGVhckJ1dHRvbiA9IHRoaXMuc2hvd0NsZWFyQnV0dG9uO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5jdXN0b21SYW5nZURpcmVjdGlvbiA9IHRoaXMuY3VzdG9tUmFuZ2VEaXJlY3Rpb247XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnJhbmdlcyA9IHRoaXMucmFuZ2VzO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5maXJzdE1vbnRoRGF5Q2xhc3MgPSB0aGlzLmZpcnN0TW9udGhEYXlDbGFzcztcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UubGFzdE1vbnRoRGF5Q2xhc3MgPSB0aGlzLmxhc3RNb250aERheUNsYXNzO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5lbXB0eVdlZWtSb3dDbGFzcyA9IHRoaXMuZW1wdHlXZWVrUm93Q2xhc3M7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmZpcnN0RGF5T2ZOZXh0TW9udGhDbGFzcyA9IHRoaXMuZmlyc3REYXlPZk5leHRNb250aENsYXNzO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5sYXN0RGF5T2ZQcmV2aW91c01vbnRoQ2xhc3MgPSB0aGlzLmxhc3REYXlPZlByZXZpb3VzTW9udGhDbGFzcztcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2Uua2VlcENhbGVuZGFyT3BlbmluZ1dpdGhSYW5nZSA9IHRoaXMua2VlcENhbGVuZGFyT3BlbmluZ1dpdGhSYW5nZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2Uuc2hvd1JhbmdlTGFiZWxPbklucHV0ID0gdGhpcy5zaG93UmFuZ2VMYWJlbE9uSW5wdXQ7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnNob3dDYW5jZWwgPSB0aGlzLnNob3dDYW5jZWw7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmxvY2tTdGFydERhdGUgPSB0aGlzLmxvY2tTdGFydERhdGU7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnRpbWVQaWNrZXIgPSB0aGlzLnRpbWVQaWNrZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnRpbWVQaWNrZXIyNEhvdXIgPSB0aGlzLnRpbWVQaWNrZXIyNEhvdXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnRpbWVQaWNrZXJJbmNyZW1lbnQgPSB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQ7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnRpbWVQaWNrZXJTZWNvbmRzID0gdGhpcy50aW1lUGlja2VyU2Vjb25kcztcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuY2xvc2VPbkF1dG9BcHBseSA9IHRoaXMuY2xvc2VPbkF1dG9BcHBseTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UubG9jYWxlID0gdGhpcy5sb2NhbGU7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuaXNJbnZhbGlkRGF0ZSA9IHRoaXMuaXNJbnZhbGlkRGF0ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuaXNDdXN0b21EYXRlID0gdGhpcy5pc0N1c3RvbURhdGU7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmlzVG9vbHRpcERhdGUgPSB0aGlzLmlzVG9vbHRpcERhdGU7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB2YWx1ZVxuICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IGxvY2FsZURpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMubG9jYWxlKS5jcmVhdGUoKTtcbiAgICAgICAgaWYgKGxvY2FsZURpZmZlcikge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlcyA9IGxvY2FsZURpZmZlci5kaWZmKHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UudXBkYXRlTG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBhbGwgb3V0cHV0c1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5zdGFydERhdGVDaGFuZ2VkXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGl0ZW1DaGFuZ2VkOiB7IHN0YXJ0RGF0ZTogX21vbWVudC5Nb21lbnQgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlQ2hhbmdlZC5lbWl0KGl0ZW1DaGFuZ2VkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmVuZERhdGVDaGFuZ2VkXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGl0ZW1DaGFuZ2VkKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlQ2hhbmdlZC5lbWl0KGl0ZW1DaGFuZ2VkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnJhbmdlQ2xpY2tlZFxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VDbGlja2VkLmVtaXQocmFuZ2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZGF0ZXNVcGRhdGVkXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlc1VwZGF0ZWQuZW1pdChyYW5nZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5jaG9zZW5EYXRlXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGNob3NlbkRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hvc2VuRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGVuZERhdGUsIHN0YXJ0RGF0ZSB9ID0gY2hvc2VuRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHsgW3RoaXMuX3N0YXJ0S2V5XTogc3RhcnREYXRlLCBbdGhpcy5fZW5kS2V5XTogZW5kRGF0ZSB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNob3NlbkRhdGUuY2hvc2VuTGFiZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuZ2V0TGFiZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmNsb3NlRGF0ZVJhbmdlUGlja2VyXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ2xvc2UgdGhlIERhdGVSYW5nZVBpY2tlciB3aGVuIHRoZSBiYWNrZHJvcCBpcyBjbGlja2VkXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZlxuICAgICAgICAgICAgLmJhY2tkcm9wQ2xpY2soKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoaWRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKF9tb21lbnQuaXNNb21lbnQodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0geyBbdGhpcy5fc3RhcnRLZXldOiB2YWx1ZSB9O1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0geyBbdGhpcy5fc3RhcnRLZXldOiBtb21lbnQodmFsdWVbdGhpcy5fc3RhcnRLZXldKSwgW3RoaXMuX2VuZEtleV06IG1vbWVudCh2YWx1ZVt0aGlzLl9lbmRLZXldKSB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlW3RoaXMuX3N0YXJ0S2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5zZXRTdGFydERhdGUodmFsdWVbdGhpcy5fc3RhcnRLZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlW3RoaXMuX2VuZEtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2Uuc2V0RW5kRGF0ZSh2YWx1ZVt0aGlzLl9lbmRLZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuY2FsY3VsYXRlQ2hvc2VuTGFiZWwoKTsgIC8vIHRoaXMgaXMgcmVxdWlyZWQgdG8gaGlnaGxpZ2h0IHNlbGVjdGVkIHJhbmdlIGluIHJhbmdlIHBpY2tlclxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5nZXRMYWJlbCgpO1xuICAgIH1cblxuICAgIGlucHV0Q2hhbmdlZChlKTogdm9pZCB7XG4gICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdpbnB1dCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZS50YXJnZXQudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBlLnRhcmdldC52YWx1ZS5zcGxpdCh0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5sb2NhbGUuc2VwYXJhdG9yKTtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IG51bGwsXG4gICAgICAgICAgICAgICAgZW5kID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChkYXRlU3RyaW5nLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbW9tZW50KGRhdGVTdHJpbmdbMF0sIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmxvY2FsZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChkYXRlU3RyaW5nWzFdLCB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5sb2NhbGUuZm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNpbmdsZURhdGVQaWNrZXIgfHwgc3RhcnQgPT09IG51bGwgfHwgZW5kID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBtb21lbnQoZS50YXJnZXQudmFsdWUsIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmxvY2FsZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdGFydC5pc1ZhbGlkKCkgfHwgIWVuZC5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5zZXRTdGFydERhdGUoc3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2Uuc2V0RW5kRGF0ZShlbmQpO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UudXBkYXRlVmlldygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIGJ1aWxkIHRoZSBsb2NhbGUgY29uZmlnXG4gICAgICovXG4gICAgcHJpdmF0ZSBfYnVpbGRMb2NhbGUoKSB7XG4gICAgICAgIHRoaXMubG9jYWxlID0geyAuLi50aGlzLl9sb2NhbGVTZXJ2aWNlLmNvbmZpZywgLi4udGhpcy5sb2NhbGUgfTtcbiAgICAgICAgaWYgKCF0aGlzLmxvY2FsZS5mb3JtYXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5mb3JtYXQgPSBfbW9tZW50LmxvY2FsZURhdGEoKS5sb25nRGF0ZUZvcm1hdCgnbGxsJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlLmZvcm1hdCA9IF9tb21lbnQubG9jYWxlRGF0YSgpLmxvbmdEYXRlRm9ybWF0KCdMJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmxvY2FsZSB8fCAhdGhpcy5sb2NhbGUuc2VwYXJhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9idWlsZExvY2FsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXN0b21SYW5nZSA9IHRydWU7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgY29uc3QgcmFuZ2VzQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCByYW5nZSBpbiB0aGlzLnJhbmdlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMucmFuZ2VzW3JhbmdlXSkge1xuICAgICAgICAgICAgICAgIHJhbmdlc0FycmF5LnB1c2gocmFuZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBjaG9zZW5SYW5nZSA9IG51bGw7XG4gICAgICAgIGlmIChyYW5nZXNBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJhbmdlIGluIHRoaXMucmFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmFuZ2VzW3JhbmdlXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXQgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzID8gJ1lZWVktTU0tREQgSEg6bW06c3MnIDogJ1lZWVktTU0tREQgSEg6bW0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIHRpbWVzIHdoZW4gY29tcGFyaW5nIGRhdGVzIGlmIHRpbWUgcGlja2VyIHNlY29uZHMgaXMgbm90IGVuYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlW3RoaXMuX3N0YXJ0S2V5XS5mb3JtYXQoZm9ybWF0KSA9PT0gdGhpcy5yYW5nZXNbcmFuZ2VdWzBdLmZvcm1hdChmb3JtYXQpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZVt0aGlzLl9lbmRLZXldLmZvcm1hdChmb3JtYXQpID09PSB0aGlzLnJhbmdlc1tyYW5nZV1bMV0uZm9ybWF0KGZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21SYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNob3NlblJhbmdlID0gcmFuZ2VzQXJyYXlbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgdGltZXMgd2hlbiBjb21wYXJpbmcgZGF0ZXMgaWYgdGltZSBwaWNrZXIgaXMgbm90IGVuYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlW3RoaXMuX3N0YXJ0S2V5XS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gdGhpcy5yYW5nZXNbcmFuZ2VdWzBdLmZvcm1hdCgnWVlZWS1NTS1ERCcpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZVt0aGlzLl9lbmRLZXldLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09PSB0aGlzLnJhbmdlc1tyYW5nZV1bMV0uZm9ybWF0KCdZWVlZLU1NLUREJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21SYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNob3NlblJhbmdlID0gcmFuZ2VzQXJyYXlbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXN0b21SYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dDdXN0b21SYW5nZUxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNob3NlblJhbmdlID0gdGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXQgPSB0aGlzLmxvY2FsZS5kaXNwbGF5Rm9ybWF0ID8gdGhpcy5sb2NhbGUuZGlzcGxheUZvcm1hdCA6IHRoaXMubG9jYWxlLmZvcm1hdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuUmFuZ2UgPSB0aGlzLnZhbHVlW3RoaXMuX3N0YXJ0S2V5XS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlW3RoaXMuX3N0YXJ0S2V5XSAmJiB0aGlzLnZhbHVlW3RoaXMuX2VuZEtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNob3NlblJhbmdlID0gdGhpcy5nZXRSYW5nZUxhYmVsKHRoaXMudmFsdWVbdGhpcy5fc3RhcnRLZXldLCB0aGlzLnZhbHVlW3RoaXMuX2VuZEtleV0sIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNob3NlblJhbmdlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmFuZ2VMYWJlbChmcm9tRGF0ZSwgdG9EYXRlLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmIChmcm9tRGF0ZS5kYXRlKCkgPT09IDEgJiYgbW9tZW50KGZyb21EYXRlKS5lbmRPZignbW9udGgnKS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gdG9EYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbURhdGUuZm9ybWF0KCdNTU1NIFlZWVknKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmcm9tU3RyID0gZnJvbURhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgIGNvbnN0IHRvU3RyID0gdG9EYXRlLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICBpZiAoZnJvbVN0ciA9PT0gdG9TdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tU3RyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcm9tU3RyICsgdGhpcy5sb2NhbGUuc2VwYXJhdG9yICsgdG9TdHI7XG4gICAgfVxufVxuIl19