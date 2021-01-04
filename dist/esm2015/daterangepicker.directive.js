var DaterangepickerDirective_1;
import { __decorate } from "tslib";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, Directive, ElementRef, EventEmitter, forwardRef, Input, KeyValueDiffers, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DaterangepickerComponent } from './daterangepicker.component';
import { LocaleService } from './locale.service';
const moment = _moment;
let DaterangepickerDirective = DaterangepickerDirective_1 = class DaterangepickerDirective {
    constructor(_changeDetectorRef, differs, _localeService, elementRef, overlay) {
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
        this.isInvalidDate = (date) => false;
        this.isCustomDate = (date) => false;
        this.isTooltipDate = (date) => null;
    }
    set locale(value) {
        this._locale = Object.assign(Object.assign({}, this._localeService.config), value);
    }
    get locale() {
        return this._locale;
    }
    set startKey(value) {
        if (value !== null) {
            this._startKey = value;
        }
        else {
            this._startKey = 'startDate';
        }
    }
    set endKey(value) {
        if (value !== null) {
            this._endKey = value;
        }
        else {
            this._endKey = 'endDate';
        }
    }
    get value() {
        return this._value || null;
    }
    set value(val) {
        this._value = val;
        this._onChange(val);
        this._changeDetectorRef.markForCheck();
    }
    ngOnInit() {
        this._buildLocale();
    }
    ngOnChanges(changes) {
        for (const change in changes) {
            if (changes.hasOwnProperty(change)) {
                if (this.componentRef && this.notForChangesProperty.indexOf(change) === -1) {
                    this.componentRef[change] = changes[change].currentValue;
                }
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    onBlur() {
        this._onTouched();
    }
    open() {
        if (this.overlayRef) {
            this.hide();
        }
        let originX, overlayX;
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
                    originX,
                    originY: this.drops === 'up' ? 'top' : 'bottom',
                    overlayX,
                    overlayY: this.drops === 'up' ? 'bottom' : 'top'
                }
            ])
        });
        const dateRangePickerPortal = new ComponentPortal(DaterangepickerComponent);
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
        const localeDiffer = this.differs.find(this.locale).create();
        if (localeDiffer) {
            const changes = localeDiffer.diff(this.locale);
            if (changes) {
                this.componentRef.instance.updateLocale(this.locale);
            }
        }
        // Subscribe to all outputs
        this.componentRef.instance.startDateChanged
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe((itemChanged) => {
            this.startDateChanged.emit(itemChanged);
        });
        this.componentRef.instance.endDateChanged
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe((itemChanged) => {
            this.endDateChanged.emit(itemChanged);
        });
        this.componentRef.instance.rangeClicked
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe((range) => {
            this.rangeClicked.emit(range);
        });
        this.componentRef.instance.datesUpdated
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe((range) => {
            this.datesUpdated.emit(range);
        });
        this.componentRef.instance.chosenDate
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe((chosenDate) => {
            if (chosenDate) {
                const { endDate, startDate } = chosenDate;
                this.value = { [this._startKey]: startDate, [this._endKey]: endDate };
                this.change.emit(this.value);
                if (typeof chosenDate.chosenLabel === 'string') {
                    this.elementRef.nativeElement.value = this.getLabel();
                }
                this.hide();
            }
        });
        this.componentRef.instance.closeDateRangePicker
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.hide();
        });
        // Close the DateRangePicker when the backdrop is clicked
        this.overlayRef
            .backdropClick()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.hide();
        });
    }
    hide() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
            this.componentRef = null;
        }
    }
    toggle() {
        if (this.overlayRef) {
            this.hide();
        }
        else {
            this.open();
        }
    }
    clear() {
        if (this.componentRef) {
            this.componentRef.instance.clear();
        }
    }
    writeValue(value) {
        if (_moment.isMoment(value)) {
            this.value = { [this._startKey]: value };
        }
        else if (value) {
            this.value = { [this._startKey]: moment(value[this._startKey]), [this._endKey]: moment(value[this._endKey]) };
        }
        else {
            this.value = null;
        }
        this.setValue(this.value);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setValue(value) {
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
    }
    inputChanged(e) {
        if (e.target.tagName.toLowerCase() !== 'input') {
            return;
        }
        if (!e.target.value.length) {
            return;
        }
        if (this.componentRef) {
            const dateString = e.target.value.split(this.componentRef.instance.locale.separator);
            let start = null, end = null;
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
    }
    /**
     *  build the locale config
     */
    _buildLocale() {
        this.locale = Object.assign(Object.assign({}, this._localeService.config), this.locale);
        if (!this.locale.format) {
            if (this.timePicker) {
                this.locale.format = _moment.localeData().longDateFormat('lll');
            }
            else {
                this.locale.format = _moment.localeData().longDateFormat('L');
            }
        }
    }
    getLabel() {
        if (!this.value) {
            return null;
        }
        if (!this.locale || !this.locale.separator) {
            this._buildLocale();
        }
        let customRange = true;
        let i = 0;
        const rangesArray = [];
        for (const range in this.ranges) {
            if (this.ranges[range]) {
                rangesArray.push(range);
            }
        }
        let chosenRange = null;
        if (rangesArray.length > 0) {
            for (const range in this.ranges) {
                if (this.ranges[range]) {
                    if (this.timePicker) {
                        const format = this.timePickerSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm';
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
                    const format = this.locale.displayFormat ? this.locale.displayFormat : this.locale.format;
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
    }
    getRangeLabel(fromDate, toDate, format) {
        if (fromDate.date() === 1 && moment(fromDate).endOf('month').format('YYYY-MM-DD') === toDate.format('YYYY-MM-DD')) {
            return fromDate.format('MMMM YYYY');
        }
        const fromStr = fromDate.format(format);
        const toStr = toDate.format(format);
        if (fromStr === toStr) {
            return fromStr;
        }
        return fromStr + this.locale.separator + toStr;
    }
};
DaterangepickerDirective.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: KeyValueDiffers },
    { type: LocaleService },
    { type: ElementRef },
    { type: Overlay }
];
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
                useExisting: forwardRef(() => DaterangepickerDirective_1),
                multi: true
            }
        ]
    })
], DaterangepickerDirective);
export { DaterangepickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlcGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRlcmFuZ2VwaWNrZXItbWF0ZXJpYWwvIiwic291cmNlcyI6WyJkYXRlcmFuZ2VwaWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUNILGlCQUFpQixFQUNqQixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFDaEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQW1CdkIsSUFBYSx3QkFBd0IsZ0NBQXJDLE1BQWEsd0JBQXdCO0lBMEhqQyxZQUNXLGtCQUFxQyxFQUNwQyxPQUF3QixFQUN4QixjQUE2QixFQUM3QixVQUFzQixFQUN0QixPQUFnQjtRQUpqQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3BDLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ3hCLG1CQUFjLEdBQWQsY0FBYyxD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TUFBTSxFQUFFOzhEQUE2RztBQUM1RztJQUFULE1BQU0sRUFBRTs4REFBeUc7QUFDeEc7SUFBVCxNQUFNLEVBQUU7a0VBQW9GO0FBQ25GO0lBQVQsTUFBTSxFQUFFO2dFQUFnRjtBQU16RjtJQURDLEtBQUssRUFBRTsrREFDd0M7QUFFaEQ7SUFEQyxLQUFLLEVBQUU7OERBQ3VDO0FBRS9DO0lBREMsS0FBSyxFQUFFOytEQUN1QztBQUV0QztJQUFSLEtBQUssRUFBRTt3REFNUDtBQUVRO0lBQVIsS0FBSyxFQUFFO3NEQU1QO0FBOUdRLHdCQUF3QjtJQWpCcEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLDZCQUE2QjtRQUN2QyxJQUFJLEVBQUU7WUFDRixhQUFhLEVBQUUsUUFBUTtZQUN2QixRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsUUFBUTtZQUNuQixTQUFTLEVBQUUsc0JBQXNCO1lBQ2pDLFlBQVksRUFBRSxLQUFLO1NBQ3RCO1FBQ0QsU0FBUyxFQUFFO1lBQ1A7Z0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQywwQkFBd0IsQ0FBQztnQkFDdkQsS0FBSyxFQUFFLElBQUk7YUFDZDtTQUNKO0tBQ0osQ0FBQztHQUNXLHdCQUF3QixDQXNkcEM7U0F0ZFksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgS2V5VmFsdWVEaWZmZXJzLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgKiBhcyBfbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGVyYW5nZXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9jYWxlQ29uZmlnIH0gZnJvbSAnLi9kYXRlcmFuZ2VwaWNrZXIuY29uZmlnJztcbmltcG9ydCB7IExvY2FsZVNlcnZpY2UgfSBmcm9tICcuL2xvY2FsZS5zZXJ2aWNlJztcblxuY29uc3QgbW9tZW50ID0gX21vbWVudDtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbnB1dFtuZ3hEYXRlcmFuZ2VwaWNrZXJNZF0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhrZXl1cC5lc2MpJzogJ2hpZGUoKScsXG4gICAgICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuICAgICAgICAnKGNsaWNrKSc6ICdvcGVuKCknLFxuICAgICAgICAnKGtleXVwKSc6ICdpbnB1dENoYW5nZWQoJGV2ZW50KScsXG4gICAgICAgIGF1dG9jb21wbGV0ZTogJ29mZidcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVyYW5nZXBpY2tlckRpcmVjdGl2ZSksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlcmFuZ2VwaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF9vbkNoYW5nZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgICBwcml2YXRlIF9vblRvdWNoZWQgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gICAgcHJpdmF0ZSBfdmFsaWRhdG9yQ2hhbmdlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG4gICAgcHJpdmF0ZSBvdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuICAgIHByaXZhdGUgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8RGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50PjtcblxuICAgIEBJbnB1dCgpXG4gICAgbWluRGF0ZTogX21vbWVudC5Nb21lbnQ7XG4gICAgQElucHV0KClcbiAgICBtYXhEYXRlOiBfbW9tZW50Lk1vbWVudDtcbiAgICBASW5wdXQoKVxuICAgIGF1dG9BcHBseTogYm9vbGVhbjtcbiAgICBASW5wdXQoKVxuICAgIGFsd2F5c1Nob3dDYWxlbmRhcnM6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBzaG93Q3VzdG9tUmFuZ2VMYWJlbDogYm9vbGVhbjtcbiAgICBASW5wdXQoKVxuICAgIGxpbmtlZENhbGVuZGFyczogYm9vbGVhbjtcbiAgICBASW5wdXQoKVxuICAgIGRhdGVMaW1pdDogbnVtYmVyID0gbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIHNpbmdsZURhdGVQaWNrZXI6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBzaG93V2Vla051bWJlcnM6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBzaG93SVNPV2Vla051bWJlcnM6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBzaG93RHJvcGRvd25zOiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0NsZWFyQnV0dG9uOiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgY3VzdG9tUmFuZ2VEaXJlY3Rpb246IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICByYW5nZXMgPSB7fTtcbiAgICBASW5wdXQoKVxuICAgIG9wZW5zOiAnbGVmdCcgfCAnY2VudGVyJyB8ICdyaWdodCcgPSAnY2VudGVyJztcbiAgICBASW5wdXQoKVxuICAgIGRyb3BzOiAndXAnIHwgJ2Rvd24nID0gJ2Rvd24nO1xuICAgIGZpcnN0TW9udGhEYXlDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgpXG4gICAgbGFzdE1vbnRoRGF5Q2xhc3M6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIGVtcHR5V2Vla1Jvd0NsYXNzOiBzdHJpbmc7XG4gICAgQElucHV0KClcbiAgICBmaXJzdERheU9mTmV4dE1vbnRoQ2xhc3M6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIGxhc3REYXlPZlByZXZpb3VzTW9udGhDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgpXG4gICAga2VlcENhbGVuZGFyT3BlbmluZ1dpdGhSYW5nZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKVxuICAgIHNob3dSYW5nZUxhYmVsT25JbnB1dCA9IHRydWU7XG4gICAgQElucHV0KClcbiAgICBzaG93Q2FuY2VsID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBsb2NrU3RhcnREYXRlID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICB0aW1lUGlja2VyID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICB0aW1lUGlja2VyMjRIb3VyID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICB0aW1lUGlja2VySW5jcmVtZW50ID0gMTtcbiAgICBASW5wdXQoKVxuICAgIHRpbWVQaWNrZXJTZWNvbmRzID0gZmFsc2U7XG4gICAgQElucHV0KCkgY2xvc2VPbkF1dG9BcHBseSA9IHRydWU7XG4gICAgX2xvY2FsZTogTG9jYWxlQ29uZmlnID0ge307XG4gICAgQElucHV0KCkgc2V0IGxvY2FsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9sb2NhbGUgPSB7IC4uLnRoaXMuX2xvY2FsZVNlcnZpY2UuY29uZmlnLCAuLi52YWx1ZSB9O1xuICAgIH1cblxuICAgIGdldCBsb2NhbGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgX2VuZEtleSA9ICdlbmREYXRlJztcbiAgICBwcml2YXRlIF9zdGFydEtleSA9ICdzdGFydERhdGUnO1xuICAgIG5vdEZvckNoYW5nZXNQcm9wZXJ0eTogQXJyYXk8c3RyaW5nPiA9IFsnbG9jYWxlJywgJ2VuZEtleScsICdzdGFydEtleSddO1xuXG4gICAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPHsgc3RhcnREYXRlOiBfbW9tZW50Lk1vbWVudDsgZW5kRGF0ZTogX21vbWVudC5Nb21lbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHJhbmdlQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgbGFiZWw6IHN0cmluZzsgZGF0ZXM6IFtfbW9tZW50Lk1vbWVudCwgX21vbWVudC5Nb21lbnRdIH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBkYXRlc1VwZGF0ZWQ6IEV2ZW50RW1pdHRlcjx7IHN0YXJ0RGF0ZTogX21vbWVudC5Nb21lbnQ7IGVuZERhdGU6IF9tb21lbnQuTW9tZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBzdGFydERhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8eyBzdGFydERhdGU6IF9tb21lbnQuTW9tZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBlbmREYXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHsgZW5kRGF0ZTogX21vbWVudC5Nb21lbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgaXNJbnZhbGlkRGF0ZSA9IChkYXRlOiBfbW9tZW50Lk1vbWVudCkgPT4gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBpc0N1c3RvbURhdGUgPSAoZGF0ZTogX21vbWVudC5Nb21lbnQpID0+IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgaXNUb29sdGlwRGF0ZSA9IChkYXRlOiBfbW9tZW50Lk1vbWVudCkgPT4gbnVsbDtcblxuICAgIEBJbnB1dCgpIHNldCBzdGFydEtleSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0S2V5ID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEtleSA9ICdzdGFydERhdGUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IGVuZEtleSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZEtleSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZW5kS2V5ID0gJ2VuZERhdGUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xuICAgICAgICB0aGlzLl9vbkNoYW5nZSh2YWwpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICBwcml2YXRlIF9sb2NhbGVTZXJ2aWNlOiBMb2NhbGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheVxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9idWlsZExvY2FsZSgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBjaGFuZ2UgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoY2hhbmdlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFJlZiAmJiB0aGlzLm5vdEZvckNoYW5nZXNQcm9wZXJ0eS5pbmRleE9mKGNoYW5nZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVmW2NoYW5nZV0gPSBjaGFuZ2VzW2NoYW5nZV0uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9yaWdpblgsIG92ZXJsYXlYO1xuICAgICAgICBzd2l0Y2ggKHRoaXMub3BlbnMpIHtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIG9yaWdpblggPSAnZW5kJztcbiAgICAgICAgICAgICAgICBvdmVybGF5WCA9ICdlbmQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgICAgICBvcmlnaW5YID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgb3ZlcmxheVggPSAnY2VudGVyJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICBvcmlnaW5YID0gJ3N0YXJ0JztcbiAgICAgICAgICAgICAgICBvdmVybGF5WCA9ICdzdGFydCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHtcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCksXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLm92ZXJsYXlcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WTogdGhpcy5kcm9wcyA9PT0gJ3VwJyA/IDAgOiAxMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpblgsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiB0aGlzLmRyb3BzID09PSAndXAnID8gJ3RvcCcgOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6IHRoaXMuZHJvcHMgPT09ICd1cCcgPyAnYm90dG9tJyA6ICd0b3AnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGF0ZVJhbmdlUGlja2VyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMub3ZlcmxheVJlZi5hdHRhY2goZGF0ZVJhbmdlUGlja2VyUG9ydGFsKTtcblxuICAgICAgICAvLyBBc3NpZ24gYWxsIGlucHV0c1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5taW5EYXRlID0gdGhpcy5taW5EYXRlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5tYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5hdXRvQXBwbHkgPSB0aGlzLmF1dG9BcHBseTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuYWx3YXlzU2hvd0NhbGVuZGFycyA9IHRoaXMuYWx3YXlzU2hvd0NhbGVuZGFycztcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2Uuc2hvd0N1c3RvbVJhbmdlTGFiZWwgPSB0aGlzLnNob3dDdXN0b21SYW5nZUxhYmVsO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5saW5rZWRDYWxlbmRhcnMgPSB0aGlzLmxpbmtlZENhbGVuZGFycztcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZGF0ZUxpbWl0ID0gdGhpcy5kYXRlTGltaXQ7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnNpbmdsZURhdGVQaWNrZXIgPSB0aGlzLnNpbmdsZURhdGVQaWNrZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnNob3dXZWVrTnVtYmVycyA9IHRoaXMuc2hvd1dlZWtOdW1iZXJzO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5zaG93SVNPV2Vla051bWJlcnMgPSB0aGlzLnNob3dJU09XZWVrTnVtYmVycztcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2Uuc2hvd0Ryb3Bkb3ducyA9IHRoaXMuc2hvd0Ryb3Bkb3ducztcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2Uuc2hvd0NsZWFyQnV0dG9uID0gdGhpcy5zaG93Q2xlYXJCdXR0b247XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmN1c3RvbVJhbmdlRGlyZWN0aW9uID0gdGhpcy5jdXN0b21SYW5nZURpcmVjdGlvbjtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UucmFuZ2VzID0gdGhpcy5yYW5nZXM7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmZpcnN0TW9udGhEYXlDbGFzcyA9IHRoaXMuZmlyc3RNb250aERheUNsYXNzO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5sYXN0TW9udGhEYXlDbGFzcyA9IHRoaXMubGFzdE1vbnRoRGF5Q2xhc3M7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmVtcHR5V2Vla1Jvd0NsYXNzID0gdGhpcy5lbXB0eVdlZWtSb3dDbGFzcztcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZmlyc3REYXlPZk5leHRNb250aENsYXNzID0gdGhpcy5maXJzdERheU9mTmV4dE1vbnRoQ2xhc3M7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmxhc3REYXlPZlByZXZpb3VzTW9udGhDbGFzcyA9IHRoaXMubGFzdERheU9mUHJldmlvdXNNb250aENsYXNzO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5rZWVwQ2FsZW5kYXJPcGVuaW5nV2l0aFJhbmdlID0gdGhpcy5rZWVwQ2FsZW5kYXJPcGVuaW5nV2l0aFJhbmdlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5zaG93UmFuZ2VMYWJlbE9uSW5wdXQgPSB0aGlzLnNob3dSYW5nZUxhYmVsT25JbnB1dDtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2Uuc2hvd0NhbmNlbCA9IHRoaXMuc2hvd0NhbmNlbDtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UubG9ja1N0YXJ0RGF0ZSA9IHRoaXMubG9ja1N0YXJ0RGF0ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UudGltZVBpY2tlciA9IHRoaXMudGltZVBpY2tlcjtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UudGltZVBpY2tlcjI0SG91ciA9IHRoaXMudGltZVBpY2tlcjI0SG91cjtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UudGltZVBpY2tlckluY3JlbWVudCA9IHRoaXMudGltZVBpY2tlckluY3JlbWVudDtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UudGltZVBpY2tlclNlY29uZHMgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5jbG9zZU9uQXV0b0FwcGx5ID0gdGhpcy5jbG9zZU9uQXV0b0FwcGx5O1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5sb2NhbGUgPSB0aGlzLmxvY2FsZTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5pc0ludmFsaWREYXRlID0gdGhpcy5pc0ludmFsaWREYXRlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5pc0N1c3RvbURhdGUgPSB0aGlzLmlzQ3VzdG9tRGF0ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuaXNUb29sdGlwRGF0ZSA9IHRoaXMuaXNUb29sdGlwRGF0ZTtcblxuICAgICAgICAvLyBTZXQgdGhlIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgY29uc3QgbG9jYWxlRGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5sb2NhbGUpLmNyZWF0ZSgpO1xuICAgICAgICBpZiAobG9jYWxlRGlmZmVyKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0gbG9jYWxlRGlmZmVyLmRpZmYodGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS51cGRhdGVMb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGFsbCBvdXRwdXRzXG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnN0YXJ0RGF0ZUNoYW5nZWRcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoaXRlbUNoYW5nZWQ6IHsgc3RhcnREYXRlOiBfbW9tZW50Lk1vbWVudCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydERhdGVDaGFuZ2VkLmVtaXQoaXRlbUNoYW5nZWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZW5kRGF0ZUNoYW5nZWRcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoaXRlbUNoYW5nZWQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGVDaGFuZ2VkLmVtaXQoaXRlbUNoYW5nZWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UucmFuZ2VDbGlja2VkXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nZUNsaWNrZWQuZW1pdChyYW5nZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5kYXRlc1VwZGF0ZWRcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzVXBkYXRlZC5lbWl0KHJhbmdlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmNob3NlbkRhdGVcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2hvc2VuRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaG9zZW5EYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZW5kRGF0ZSwgc3RhcnREYXRlIH0gPSBjaG9zZW5EYXRlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0geyBbdGhpcy5fc3RhcnRLZXldOiBzdGFydERhdGUsIFt0aGlzLl9lbmRLZXldOiBlbmREYXRlIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2hvc2VuRGF0ZS5jaG9zZW5MYWJlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5nZXRMYWJlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuY2xvc2VEYXRlUmFuZ2VQaWNrZXJcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBDbG9zZSB0aGUgRGF0ZVJhbmdlUGlja2VyIHdoZW4gdGhlIGJhY2tkcm9wIGlzIGNsaWNrZWRcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmXG4gICAgICAgICAgICAuYmFja2Ryb3BDbGljaygpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoX21vbWVudC5pc01vbWVudCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB7IFt0aGlzLl9zdGFydEtleV06IHZhbHVlIH07XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB7IFt0aGlzLl9zdGFydEtleV06IG1vbWVudCh2YWx1ZVt0aGlzLl9zdGFydEtleV0pLCBbdGhpcy5fZW5kS2V5XTogbW9tZW50KHZhbHVlW3RoaXMuX2VuZEtleV0pIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50UmVmKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVbdGhpcy5fc3RhcnRLZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnNldFN0YXJ0RGF0ZSh2YWx1ZVt0aGlzLl9zdGFydEtleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmFsdWVbdGhpcy5fZW5kS2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5zZXRFbmREYXRlKHZhbHVlW3RoaXMuX2VuZEtleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5jYWxjdWxhdGVDaG9zZW5MYWJlbCgpOyAgLy8gdGhpcyBpcyByZXF1aXJlZCB0byBoaWdobGlnaHQgc2VsZWN0ZWQgcmFuZ2UgaW4gcmFuZ2UgcGlja2VyXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmdldExhYmVsKCk7XG4gICAgfVxuXG4gICAgaW5wdXRDaGFuZ2VkKGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2lucHV0Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFlLnRhcmdldC52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGUudGFyZ2V0LnZhbHVlLnNwbGl0KHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmxvY2FsZS5zZXBhcmF0b3IpO1xuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbnVsbCxcbiAgICAgICAgICAgICAgICBlbmQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGRhdGVTdHJpbmcubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBtb21lbnQoZGF0ZVN0cmluZ1swXSwgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UubG9jYWxlLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgZW5kID0gbW9tZW50KGRhdGVTdHJpbmdbMV0sIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmxvY2FsZS5mb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlciB8fCBzdGFydCA9PT0gbnVsbCB8fCBlbmQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IG1vbWVudChlLnRhcmdldC52YWx1ZSwgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UubG9jYWxlLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgZW5kID0gc3RhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN0YXJ0LmlzVmFsaWQoKSB8fCAhZW5kLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLnNldFN0YXJ0RGF0ZShzdGFydCk7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5zZXRFbmREYXRlKGVuZCk7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS51cGRhdGVWaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgYnVpbGQgdGhlIGxvY2FsZSBjb25maWdcbiAgICAgKi9cbiAgICBwcml2YXRlIF9idWlsZExvY2FsZSgpIHtcbiAgICAgICAgdGhpcy5sb2NhbGUgPSB7IC4uLnRoaXMuX2xvY2FsZVNlcnZpY2UuY29uZmlnLCAuLi50aGlzLmxvY2FsZSB9O1xuICAgICAgICBpZiAoIXRoaXMubG9jYWxlLmZvcm1hdCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlLmZvcm1hdCA9IF9tb21lbnQubG9jYWxlRGF0YSgpLmxvbmdEYXRlRm9ybWF0KCdsbGwnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuZm9ybWF0ID0gX21vbWVudC5sb2NhbGVEYXRhKCkubG9uZ0RhdGVGb3JtYXQoJ0wnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMubG9jYWxlIHx8ICF0aGlzLmxvY2FsZS5zZXBhcmF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkTG9jYWxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1c3RvbVJhbmdlID0gdHJ1ZTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBjb25zdCByYW5nZXNBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHJhbmdlIGluIHRoaXMucmFuZ2VzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yYW5nZXNbcmFuZ2VdKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2VzQXJyYXkucHVzaChyYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNob3NlblJhbmdlID0gbnVsbDtcbiAgICAgICAgaWYgKHJhbmdlc0FycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcmFuZ2UgaW4gdGhpcy5yYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yYW5nZXNbcmFuZ2VdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMudGltZVBpY2tlclNlY29uZHMgPyAnWVlZWS1NTS1ERCBISDptbTpzcycgOiAnWVlZWS1NTS1ERCBISDptbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgdGltZXMgd2hlbiBjb21wYXJpbmcgZGF0ZXMgaWYgdGltZSBwaWNrZXIgc2Vjb25kcyBpcyBub3QgZW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVbdGhpcy5fc3RhcnRLZXldLmZvcm1hdChmb3JtYXQpID09PSB0aGlzLnJhbmdlc1tyYW5nZV1bMF0uZm9ybWF0KGZvcm1hdCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlW3RoaXMuX2VuZEtleV0uZm9ybWF0KGZvcm1hdCkgPT09IHRoaXMucmFuZ2VzW3JhbmdlXVsxXS5mb3JtYXQoZm9ybWF0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVJhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuUmFuZ2UgPSByYW5nZXNBcnJheVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSB0aW1lcyB3aGVuIGNvbXBhcmluZyBkYXRlcyBpZiB0aW1lIHBpY2tlciBpcyBub3QgZW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVbdGhpcy5fc3RhcnRLZXldLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09PSB0aGlzLnJhbmdlc1tyYW5nZV1bMF0uZm9ybWF0KCdZWVlZLU1NLUREJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlW3RoaXMuX2VuZEtleV0uZm9ybWF0KCdZWVlZLU1NLUREJykgPT09IHRoaXMucmFuZ2VzW3JhbmdlXVsxXS5mb3JtYXQoJ1lZWVktTU0tREQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVJhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuUmFuZ2UgPSByYW5nZXNBcnJheVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1c3RvbVJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0N1c3RvbVJhbmdlTGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hvc2VuUmFuZ2UgPSB0aGlzLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMubG9jYWxlLmRpc3BsYXlGb3JtYXQgPyB0aGlzLmxvY2FsZS5kaXNwbGF5Rm9ybWF0IDogdGhpcy5sb2NhbGUuZm9ybWF0O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaW5nbGVEYXRlUGlja2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaG9zZW5SYW5nZSA9IHRoaXMudmFsdWVbdGhpcy5fc3RhcnRLZXldLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWVbdGhpcy5fc3RhcnRLZXldICYmIHRoaXMudmFsdWVbdGhpcy5fZW5kS2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuUmFuZ2UgPSB0aGlzLmdldFJhbmdlTGFiZWwodGhpcy52YWx1ZVt0aGlzLl9zdGFydEtleV0sIHRoaXMudmFsdWVbdGhpcy5fZW5kS2V5XSwgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hvc2VuUmFuZ2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSYW5nZUxhYmVsKGZyb21EYXRlLCB0b0RhdGUsIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGZyb21EYXRlLmRhdGUoKSA9PT0gMSAmJiBtb21lbnQoZnJvbURhdGUpLmVuZE9mKCdtb250aCcpLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09PSB0b0RhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tRGF0ZS5mb3JtYXQoJ01NTU0gWVlZWScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZyb21TdHIgPSBmcm9tRGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgY29uc3QgdG9TdHIgPSB0b0RhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgIGlmIChmcm9tU3RyID09PSB0b1N0cikge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21TdHI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZyb21TdHIgKyB0aGlzLmxvY2FsZS5zZXBhcmF0b3IgKyB0b1N0cjtcbiAgICB9XG59XG4iXX0=