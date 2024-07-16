import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { InjectionToken, Injectable, Inject, EventEmitter, Component, ViewEncapsulation, forwardRef, ElementRef, ChangeDetectorRef, Input, Output, ViewChild, Directive, KeyValueDiffers, NgModule } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import * as _moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentPortal } from '@angular/cdk/portal';

const moment$2 = _moment;
const LOCALE_CONFIG = new InjectionToken('daterangepicker.config');
/**
 *  DefaultLocaleConfig
 */
const DefaultLocaleConfig = {
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

class LocaleService {
    constructor(_config) {
        this._config = _config;
    }
    get config() {
        if (!this._config) {
            return DefaultLocaleConfig;
        }
        return Object.assign(Object.assign({}, DefaultLocaleConfig), this._config);
    }
}
LocaleService.decorators = [
    { type: Injectable }
];
LocaleService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [LOCALE_CONFIG,] }] }
];

const moment$1 = _moment;
var SideEnum;
(function (SideEnum) {
    SideEnum["left"] = "left";
    SideEnum["right"] = "right";
})(SideEnum || (SideEnum = {}));
class DaterangepickerComponent {
    constructor(el, _ref, _localeService) {
        this.el = el;
        this._ref = _ref;
        this._localeService = _localeService;
        this._old = { start: null, end: null };
        this.calendarVariables = { left: {}, right: {} };
        this.tooltiptext = []; // for storing tooltiptext
        this.timepickerVariables = { left: {}, right: {} };
        this.daterangepicker = { start: new FormControl(), end: new FormControl() };
        this.fromMonthControl = new FormControl();
        this.fromYearControl = new FormControl();
        this.toMonthControl = new FormControl();
        this.toYearControl = new FormControl();
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
        this.chosenDate = new EventEmitter();
        this.rangeClicked = new EventEmitter();
        this.datesUpdated = new EventEmitter();
        this.startDateChanged = new EventEmitter();
        this.endDateChanged = new EventEmitter();
        this.closeDateRangePicker = new EventEmitter();
        this.destroy$ = new Subject();
    }
    set locale(value) {
        this._locale = Object.assign(Object.assign({}, this._localeService.config), value);
    }
    get locale() {
        return this._locale;
    }
    set ranges(value) {
        this._ranges = value;
        this.renderRanges();
    }
    get ranges() {
        return this._ranges;
    }
    isInvalidDate(date) {
        return false;
    }
    isCustomDate(date) {
        return false;
    }
    isTooltipDate(date) {
        return null;
    }
    ngOnInit() {
        this.fromMonthControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((month) => {
            this.monthChanged(month, SideEnum.left);
        });
        this.fromYearControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((year) => {
            this.yearChanged(year, SideEnum.left);
        });
        this.toMonthControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((month) => {
            this.monthChanged(month, SideEnum.right);
        });
        this.toYearControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((year) => {
            this.yearChanged(year, SideEnum.right);
        });
        this._buildLocale();
        const daysOfWeek = [...this.locale.daysOfWeek];
        this.locale.firstDay = this.locale.firstDay % 7;
        if (this.locale.firstDay !== 0) {
            let iterator = this.locale.firstDay;
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
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    renderRanges() {
        this.rangesArray = [];
        let start, end;
        if (typeof this.ranges === 'object') {
            for (const range in this.ranges) {
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
                    let maxDate = this.maxDate;
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
                    const elem = document.createElement('textarea');
                    elem.innerHTML = range;
                    const rangeHtml = elem.value;
                    this.ranges[rangeHtml] = [start, end];
                }
            }
            for (const range in this.ranges) {
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
    }
    renderTimePicker(side) {
        let selected, minDate;
        const maxDate = this.maxDate;
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
        const start = this.timePicker24Hour ? 0 : 1;
        const end = this.timePicker24Hour ? 23 : 12;
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
        for (let i = start; i <= end; i++) {
            let i_in_24 = i;
            if (!this.timePicker24Hour) {
                i_in_24 = selected.hour() >= 12 ? (i === 12 ? 12 : i + 12) : i === 12 ? 0 : i;
            }
            const time = selected.clone().hour(i_in_24);
            let disabled = false;
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
        for (let i = 0; i < 60; i += this.timePickerIncrement) {
            const padded = i < 10 ? '0' + i : i;
            const time = selected.clone().minute(i);
            let disabled = false;
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
            for (let i = 0; i < 60; i++) {
                const padded = i < 10 ? '0' + i : i;
                const time = selected.clone().second(i);
                let disabled = false;
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
    }
    renderCalendar(side) {
        const mainCalendar = side === SideEnum.left ? this.leftCalendar : this.rightCalendar;
        const month = mainCalendar.month.month();
        const year = mainCalendar.month.year();
        const hour = mainCalendar.month.hour();
        const minute = mainCalendar.month.minute();
        const second = mainCalendar.month.second();
        const daysInMonth = moment$1([year, month]).daysInMonth();
        const firstDay = moment$1([year, month, 1]);
        const lastDay = moment$1([year, month, daysInMonth]);
        const lastMonth = moment$1(firstDay).subtract(1, 'month').month();
        const lastYear = moment$1(firstDay).subtract(1, 'month').year();
        const daysInLastMonth = moment$1([lastYear, lastMonth]).daysInMonth();
        const dayOfWeek = firstDay.day();
        // initialize a 6 rows x 7 columns array for the calendar
        const calendar = [];
        calendar.firstDay = firstDay;
        calendar.lastDay = lastDay;
        for (let i = 0; i < 6; i++) {
            calendar[i] = [];
        }
        // populate the calendar with date objects
        let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
        if (startDay > daysInLastMonth) {
            startDay -= 7;
        }
        if (dayOfWeek === this.locale.firstDay) {
            startDay = daysInLastMonth - 6;
        }
        let curDate = moment$1([lastYear, lastMonth, startDay, 12, minute, second]);
        for (let i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment$1(curDate).add(24, 'hour')) {
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
        const minDate = side === 'left' ? this.minDate : this.startDate;
        let maxDate = this.maxDate;
        // adjust maxDate to reflect the dateLimit setting in order to
        // grey out end dates beyond the dateLimit
        if (this.endDate === null && this.dateLimit) {
            const maxLimit = this.startDate.clone().add(this.dateLimit, 'day').endOf('day');
            if (!maxDate || maxLimit.isBefore(maxDate)) {
                maxDate = maxLimit;
            }
        }
        this.calendarVariables[side] = {
            month,
            year,
            hour,
            minute,
            second,
            daysInMonth,
            firstDay,
            lastDay,
            lastMonth,
            lastYear,
            daysInLastMonth,
            dayOfWeek,
            // other vars
            calRows: Array.from(Array(6).keys()),
            calCols: Array.from(Array(7).keys()),
            classes: {},
            minDate,
            maxDate,
            calendar
        };
        if (this.showDropdowns) {
            const currentMonth = calendar[1][1].month();
            const currentYear = calendar[1][1].year();
            const realCurrentYear = moment$1().year();
            const maxYear = (maxDate && maxDate.year()) || realCurrentYear + 5;
            const minYear = (minDate && minDate.year()) || realCurrentYear - 50;
            const inMinYear = currentYear === minYear;
            const inMaxYear = currentYear === maxYear;
            const years = [];
            for (let y = minYear; y <= maxYear; y++) {
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
    }
    setStartDate(startDate) {
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
    }
    setEndDate(endDate) {
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
    }
    updateView() {
        if (this.timePicker) {
            this.renderTimePicker(SideEnum.left);
            this.renderTimePicker(SideEnum.right);
        }
        this.updateMonthsInView();
        this.updateCalendars();
    }
    updateMonthsInView() {
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
    }
    /**
     *  This is responsible for updating the calendars
     */
    updateCalendars() {
        this.renderCalendar(SideEnum.left);
        this.renderCalendar(SideEnum.right);
        if (this.endDate === null) {
            return;
        }
        this.calculateChosenLabel();
    }
    updateElement() {
        const format = this.locale.displayFormat ? this.locale.displayFormat : this.locale.format;
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
    }
    /**
     * this should calculate the label
     */
    calculateChosenLabel() {
        if (!this.locale || !this.locale.separator) {
            this._buildLocale();
        }
        let customRange = true;
        let i = 0;
        if (this.rangesArray.length > 0) {
            for (const range in this.ranges) {
                if (this.ranges[range]) {
                    if (this.timePicker) {
                        const format = this.timePickerSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm';
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
    }
    clickApply(e) {
        if (!this.singleDatePicker && this.startDate && !this.endDate) {
            this.endDate = this._getDateWithTime(this.startDate, SideEnum.right);
            this.calculateChosenLabel();
        }
        if (this.isInvalidDate && this.startDate && this.endDate) {
            // get if there are invalid date between range
            const d = this.startDate.clone();
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
    }
    clickCancel() {
        this.startDate = this._old.start;
        this.endDate = this._old.end;
        if (this.inline) {
            this.updateView();
        }
        this.hide();
    }
    /**
     * called when month is changed
     * @param month month represented by a number (0 through 11)
     * @param side left or right
     */
    monthChanged(month, side) {
        const year = this.calendarVariables[side].dropdowns.currentYear;
        this.monthOrYearChanged(month, year, side);
    }
    /**
     * called when year is changed
     * @param year year represented by a number
     * @param side left or right
     */
    yearChanged(year, side) {
        const month = this.calendarVariables[side].dropdowns.currentMonth;
        this.monthOrYearChanged(month, year, side);
    }
    /**
     * called when time is changed
     * @param side left or right
     */
    timeChanged(side) {
        let hour = parseInt(this.timepickerVariables[side].selectedHour, 10);
        const minute = parseInt(this.timepickerVariables[side].selectedMinute, 10);
        const second = this.timePickerSeconds ? parseInt(this.timepickerVariables[side].selectedSecond, 10) : 0;
        if (!this.timePicker24Hour) {
            const ampm = this.timepickerVariables[side].ampmModel;
            if (ampm === 'PM' && hour < 12) {
                hour += 12;
            }
            if (ampm === 'AM' && hour === 12) {
                hour = 0;
            }
        }
        if (side === SideEnum.left) {
            const start = this.startDate.clone();
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
                const startClone = this._getDateWithTime(start, SideEnum.right);
                if (startClone.isBefore(start)) {
                    this.timepickerVariables[SideEnum.right].selectedHour = hour;
                    this.timepickerVariables[SideEnum.right].selectedMinute = minute;
                    this.timepickerVariables[SideEnum.right].selectedSecond = second;
                }
            }
        }
        else if (this.endDate) {
            const end = this.endDate.clone();
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
    }
    /**
     *  call when month or year changed
     * @param month month number 0 -11
     * @param year year eg: 1995
     * @param side left or right
     */
    monthOrYearChanged(month, year, side) {
        const isLeft = side === SideEnum.left;
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
    }
    /**
     * Click on previous month
     * @param side left or right calendar
     */
    clickPrev(side) {
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
    }
    /**
     * Click on next month
     * @param side left or right calendar
     */
    clickNext(side) {
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
    }
    /**
     * When hovering a date
     * @param e event: get value by e.target.value
     * @param side left or right
     * @param row row position of the current date clicked
     * @param col col position of the current date clicked
     */
    hoverDate(e, side, row, col) {
        const leftCalDate = this.calendarVariables.left.calendar[row][col];
        const rightCalDate = this.calendarVariables.right.calendar[row][col];
        if (this.pickingDate) {
            const hoverDate = side === SideEnum.left ? leftCalDate : rightCalDate;
            this.nowHoveredDate = this._isDateRangeInvalid(hoverDate) ? null : hoverDate;
            this.renderCalendar(SideEnum.left);
            this.renderCalendar(SideEnum.right);
        }
        const tooltip = side === SideEnum.left ? this.tooltiptext[leftCalDate] : this.tooltiptext[rightCalDate];
        if (tooltip.length > 0) {
            e.target.setAttribute('title', tooltip);
        }
    }
    /**
     * When selecting a date
     * @param e event: get value by e.target.value
     * @param side left or right
     * @param row row position of the current date clicked
     * @param col col position of the current date clicked
     */
    clickDate(e, side, row, col) {
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
        let date = side === SideEnum.left ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
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
    }
    /**
     *  Click on the custom range
     * @param label
     */
    clickRange(label) {
        this.chosenRange = label;
        if (label === this.locale.customRangeLabel) {
            this.isShown = true; // show calendars
            this.showCalInRanges = true;
        }
        else {
            const dates = this.ranges[label];
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
                        const nextMonth = dates[0].clone().add(1, 'month');
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
    }
    show(e) {
        if (this.isShown) {
            return;
        }
        this._old.start = this.startDate.clone();
        this._old.end = this.endDate.clone();
        this.isShown = true;
        this.updateView();
    }
    hide() {
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
    }
    /**
     * handle click on all element in the component, useful for outside of click
     * @param e event
     */
    handleInternalClick(e) {
        e.stopPropagation();
    }
    /**
     * update the locale options
     * @param locale
     */
    updateLocale(locale) {
        for (const key in locale) {
            if (locale.hasOwnProperty(key)) {
                this.locale[key] = locale[key];
                if (key === 'customRangeLabel') {
                    this.renderRanges();
                }
            }
        }
    }
    /**
     *  clear the daterange picker
     */
    clear() {
        this.startDate = moment$1().startOf('day');
        this.endDate = moment$1().endOf('day');
        this.chosenDate.emit({ chosenLabel: '', startDate: null, endDate: null });
        this.datesUpdated.emit({ startDate: null, endDate: null });
        this.hide();
    }
    /**
     * Find out if the selected range should be disabled if it doesn't
     * fit into minDate and maxDate limitations.
     */
    disableRange(range) {
        if (range === this.locale.customRangeLabel) {
            return false;
        }
        const rangeMarkers = this.ranges[range];
        const areBothBefore = rangeMarkers.every((date) => {
            if (!this.minDate) {
                return false;
            }
            return date.isBefore(this.minDate);
        });
        const areBothAfter = rangeMarkers.every((date) => {
            if (!this.maxDate) {
                return false;
            }
            return date.isAfter(this.maxDate);
        });
        return areBothBefore || areBothAfter;
    }
    /**
     *
     * @param date the date to add time
     * @param side left or right
     */
    _getDateWithTime(date, side) {
        let hour = parseInt(this.timepickerVariables[side].selectedHour, 10);
        if (!this.timePicker24Hour) {
            const ampm = this.timepickerVariables[side].ampmModel;
            if (ampm === 'PM' && hour < 12) {
                hour += 12;
            }
            if (ampm === 'AM' && hour === 12) {
                hour = 0;
            }
        }
        const minute = parseInt(this.timepickerVariables[side].selectedMinute, 10);
        const second = this.timePickerSeconds ? parseInt(this.timepickerVariables[side].selectedSecond, 10) : 0;
        return date.clone().hour(hour).minute(minute).second(second);
    }
    /**
     *  build the locale config
     */
    _buildLocale() {
        this.locale = Object.assign(Object.assign({}, this._localeService.config), this.locale);
        if (!this.locale.format) {
            if (this.timePicker) {
                this.locale.format = moment$1.localeData().longDateFormat('lll');
            }
            else {
                this.locale.format = moment$1.localeData().longDateFormat('L');
            }
        }
    }
    _buildCells(calendar, side) {
        for (let row = 0; row < 6; row++) {
            this.calendarVariables[side].classes[row] = {};
            const rowClasses = [];
            if (this.emptyWeekRowClass && !this.hasCurrentMonthDays(this.calendarVariables[side].month, calendar[row])) {
                rowClasses.push(this.emptyWeekRowClass);
            }
            for (let col = 0; col < 7; col++) {
                const classes = [];
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
                    !classes.find((el) => el === 'off')) {
                    classes.push('in-range');
                }
                // apply custom classes for this date
                const isCustom = this.isCustomDate(calendar[row][col]);
                if (isCustom !== false) {
                    if (typeof isCustom === 'string') {
                        classes.push(isCustom);
                    }
                    else {
                        Array.prototype.push.apply(classes, isCustom);
                    }
                }
                // apply custom tooltip for this date
                const isTooltip = this.isTooltipDate(calendar[row][col]);
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
                let cname = '', disabled = false;
                for (let i = 0; i < classes.length; i++) {
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
    }
    /**
     * Find out if the current calendar row has current month days
     * (as opposed to consisting of only previous/next month days)
     */
    hasCurrentMonthDays(currentMonth, row) {
        for (let day = 0; day < 7; day++) {
            if (row[day].month() === currentMonth) {
                return true;
            }
        }
        return false;
    }
    /**
     * Returns true when a date within the range of dates is invalid
     */
    _isDateRangeInvalid(endDate) {
        const days = [];
        let day = this.startDate;
        while (day <= endDate) {
            days.push(day);
            day = day.clone().add(1, 'd');
        }
        return days.some((d) => this.isInvalidDate(d));
    }
}
DaterangepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-daterangepicker-material',
                template: "<div\n    class=\"md-drppicker\"\n    #pickerContainer\n    [ngClass]=\"{\n        ltr: locale.direction === 'ltr',\n        rtl: this.locale.direction === 'rtl',\n        shown: isShown || inline,\n        hidden: !isShown && !inline,\n        inline: inline,\n        double: !singleDatePicker && showCalInRanges,\n        'show-ranges': rangesArray.length\n    }\"\n>\n    <div *ngIf=\"rangesArray.length > 0\" class=\"ranges\">\n        <ul>\n            <li *ngFor=\"let range of rangesArray\">\n                <button\n                    type=\"button\"\n                    [disabled]=\"disableRange(range)\"\n                    [ngClass]=\"{ active: range === chosenRange }\"\n                    (click)=\"clickRange(range)\"\n                >\n                    {{ range }}\n                </button>\n            </li>\n        </ul>\n    </div>\n    <div class=\"calendar\" [ngClass]=\"{ right: singleDatePicker, left: !singleDatePicker }\" *ngIf=\"showCalInRanges\">\n        <div class=\"calendar-table\">\n            <table class=\"table-condensed\" *ngIf=\"calendarVariables\">\n                <thead>\n                    <tr>\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\"></th>\n                        <ng-container\n                            *ngIf=\"\n                                !calendarVariables.left.minDate ||\n                                (calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) &&\n                                    (!this.linkedCalendars || true))\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickPrev(sideEnum.left)\">\n                                    <span class=\"calendar-icon calendar-icon--left\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    !calendarVariables.left.minDate ||\n                                    (calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) &&\n                                        (!this.linkedCalendars || true))\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                        <th colspan=\"5\" class=\"month drp-animate\">\n                            <ng-container *ngIf=\"showDropdowns && calendarVariables.left.dropdowns\">\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"fromMonthControl\">\n                                        <mat-option\n                                            *ngFor=\"let m of calendarVariables.left.dropdowns.monthArrays\"\n                                            [value]=\"m\"\n                                            [disabled]=\"\n                                                (calendarVariables.left.dropdowns.inMinYear &&\n                                                    m < calendarVariables.left.minDate.month()) ||\n                                                (calendarVariables.left.dropdowns.inMaxYear && m > calendarVariables.left.maxDate.month())\n                                            \"\n                                        >\n                                            {{ locale.monthNames[m] }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"fromYearControl\">\n                                        <mat-option *ngFor=\"let y of calendarVariables.left.dropdowns.yearArrays\" [value]=\"y\">\n                                            {{ y }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                            </ng-container>\n                            <ng-container *ngIf=\"!showDropdowns || !calendarVariables.left.dropdowns\">\n                                {{ this.locale.monthNames[calendarVariables?.left?.calendar[1][1].month()] }}\n                                {{ calendarVariables?.left?.calendar[1][1].format(' YYYY') }}\n                            </ng-container>\n                        </th>\n                        <ng-container\n                            *ngIf=\"\n                                (!calendarVariables.left.maxDate ||\n                                    calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) &&\n                                (!linkedCalendars || singleDatePicker)\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickNext(sideEnum.left)\">\n                                    <span class=\"calendar-icon calendar-icon--right\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    (!calendarVariables.left.maxDate ||\n                                        calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) &&\n                                    (!linkedCalendars || singleDatePicker)\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                    </tr>\n                    <tr class=\"week-days\">\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\" class=\"week\">\n                            <span>{{ this.locale.weekLabel }}</span>\n                        </th>\n                        <th *ngFor=\"let dayofweek of locale.daysOfWeek\">\n                            <span>{{ dayofweek }}</span>\n                        </th>\n                    </tr>\n                </thead>\n                <tbody class=\"drp-animate\">\n                    <tr *ngFor=\"let row of calendarVariables.left.calRows\" [class]=\"calendarVariables.left.classes[row].classList\">\n                        <!-- add week number -->\n                        <td class=\"week\" *ngIf=\"showWeekNumbers\">\n                            <span>{{ calendarVariables.left.calendar[row][0].week() }}</span>\n                        </td>\n                        <td class=\"week\" *ngIf=\"showISOWeekNumbers\">\n                            <span>{{ calendarVariables.left.calendar[row][0].isoWeek() }}</span>\n                        </td>\n                        <!-- cal -->\n                        <td\n                            *ngFor=\"let col of calendarVariables.left.calCols\"\n                            [class]=\"calendarVariables.left.classes[row][col]\"\n                            (click)=\"clickDate($event, sideEnum.left, row, col)\"\n                            (mouseenter)=\"hoverDate($event, sideEnum.left, row, col)\"\n                        >\n                            <span>{{ calendarVariables.left.calendar[row][col].date() }}</span>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"calendar-time\" *ngIf=\"timePicker\">\n            <div class=\"select\">\n                <mat-select\n                    class=\"hourselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.left.selectedHour\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.left.hours\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.left.disabledHours.indexOf(i) > -1\"\n                    >\n                        {{ i }}\n                    </mat-option>\n                </mat-select>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"minuteselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.left.selectedMinute\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.left.minutes; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.left.disabledMinutes.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.left.minutesLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"secondselect\"\n                    *ngIf=\"timePickerSeconds\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.left.selectedSecond\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.left.seconds; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.left.disabledSeconds.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.left.secondsLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"ampmselect\"\n                    *ngIf=\"!timePicker24Hour\"\n                    [(ngModel)]=\"timepickerVariables.left.ampmModel\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option value=\"AM\" [disabled]=\"timepickerVariables.left.amDisabled\">AM</mat-option>\n                    <mat-option value=\"PM\" [disabled]=\"timepickerVariables.left.pmDisabled\">PM</mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n        </div>\n    </div>\n    <div class=\"calendar right\" *ngIf=\"showCalInRanges && !singleDatePicker\">\n        <div class=\"calendar-table\">\n            <table class=\"table-condensed\" *ngIf=\"calendarVariables\">\n                <thead>\n                    <tr>\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\"></th>\n                        <ng-container\n                            *ngIf=\"\n                                (!calendarVariables.right.minDate ||\n                                    calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) &&\n                                !this.linkedCalendars\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickPrev(sideEnum.right)\">\n                                    <span class=\"calendar-icon calendar-icon--left\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    (!calendarVariables.right.minDate ||\n                                        calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) &&\n                                    !this.linkedCalendars\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                        <th colspan=\"5\" class=\"month\">\n                            <ng-container *ngIf=\"showDropdowns && calendarVariables.right.dropdowns\">\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"toMonthControl\">\n                                        <mat-option\n                                            *ngFor=\"let m of calendarVariables.right.dropdowns.monthArrays\"\n                                            [disabled]=\"\n                                                (calendarVariables.right.dropdowns.inMinYear && calendarVariables.right.minDate &&\n                                                    m < calendarVariables.right.minDate.month()) ||\n                                                (calendarVariables.right.dropdowns.inMaxYear && calendarVariables.right.maxDate &&\n                                                m > calendarVariables.right.maxDate.month())\n                                            \"\n                                            [value]=\"m\"\n                                        >\n                                            {{ locale.monthNames[m] }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"toYearControl\">\n                                        <mat-option *ngFor=\"let y of calendarVariables.right.dropdowns.yearArrays\" [value]=\"y\">\n                                            {{ y }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                            </ng-container>\n                            <ng-container *ngIf=\"!showDropdowns || !calendarVariables.right.dropdowns\">\n                                {{ this.locale.monthNames[calendarVariables?.right?.calendar[1][1].month()] }}\n                                {{ calendarVariables?.right?.calendar[1][1].format(' YYYY') }}\n                            </ng-container>\n                        </th>\n                        <ng-container\n                            *ngIf=\"\n                                !calendarVariables.right.maxDate ||\n                                (calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) &&\n                                    (!linkedCalendars || singleDatePicker || true))\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickNext(sideEnum.right)\">\n                                    <span class=\"calendar-icon calendar-icon--right\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    !calendarVariables.right.maxDate ||\n                                    (calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) &&\n                                        (!linkedCalendars || singleDatePicker || true))\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                    </tr>\n\n                    <tr class=\"week-days\">\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\" class=\"week\">\n                            <span>{{ this.locale.weekLabel }}</span>\n                        </th>\n                        <th *ngFor=\"let dayofweek of locale.daysOfWeek\">\n                            <span>{{ dayofweek }}</span>\n                        </th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let row of calendarVariables.right.calRows\" [class]=\"calendarVariables.right.classes[row].classList\">\n                        <td class=\"week\" *ngIf=\"showWeekNumbers\">\n                            <span>{{ calendarVariables.right.calendar[row][0].week() }}</span>\n                        </td>\n                        <td class=\"week\" *ngIf=\"showISOWeekNumbers\">\n                            <span>{{ calendarVariables.right.calendar[row][0].isoWeek() }}</span>\n                        </td>\n                        <td\n                            *ngFor=\"let col of calendarVariables.right.calCols\"\n                            [class]=\"calendarVariables.right.classes[row][col]\"\n                            (click)=\"clickDate($event, sideEnum.right, row, col)\"\n                            (mouseenter)=\"hoverDate($event, sideEnum.right, row, col)\"\n                        >\n                            <span>{{ calendarVariables.right.calendar[row][col].date() }}</span>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"calendar-time\" *ngIf=\"timePicker\">\n            <div class=\"select\">\n                <mat-select\n                    class=\"hourselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedHour\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.right.hours\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.right.disabledHours.indexOf(i) > -1\"\n                    >\n                        {{ i }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"minuteselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedMinute\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.right.minutes; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.right.disabledMinutes.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.right.minutesLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    *ngIf=\"timePickerSeconds\"\n                    class=\"secondselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedSecond\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.right.seconds; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.right.disabledSeconds.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.right.secondsLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    *ngIf=\"!timePicker24Hour\"\n                    class=\"ampmselect\"\n                    [(ngModel)]=\"timepickerVariables.right.ampmModel\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option value=\"AM\" [disabled]=\"timepickerVariables.right.amDisabled\">AM</mat-option>\n                    <mat-option value=\"PM\" [disabled]=\"timepickerVariables.right.pmDisabled\">PM</mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n        </div>\n    </div>\n    <div class=\"buttons\" *ngIf=\"!autoApply && (!rangesArray.length || (showCalInRanges && !singleDatePicker))\">\n        <div class=\"buttons_input\">\n            <button *ngIf=\"showClearButton\" mat-raised-button type=\"button\" [title]=\"locale.clearLabel\" (click)=\"clear()\">\n                <span class=\"clear-button\">\n                    {{ locale.clearLabel }}\n                    <span class=\"clear-icon\">\n                        <svg viewBox=\"0 0 24 24\">\n                            <path fill=\"currentColor\" d=\"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z\" />\n                        </svg>\n                    </span>\n                </span>\n            </button>\n            <button *ngIf=\"showCancel\" mat-raised-button (click)=\"clickCancel()\">{{ locale.cancelLabel }}</button>\n            <button [disabled]=\"applyBtn.disabled\" mat-raised-button color=\"primary\" (click)=\"clickApply($event)\">\n                {{ locale.applyLabel }}\n            </button>\n        </div>\n    </div>\n</div>\n",
                host: {
                    '(click)': 'handleInternalClick($event)'
                },
                encapsulation: ViewEncapsulation.None,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => DaterangepickerComponent),
                        multi: true
                    }
                ],
                styles: [".md-drppicker{border-radius:4px;width:340px;padding:4px;margin-top:-10px;overflow:hidden;font-size:14px;box-shadow:0 2px 4px 0 rgba(0,0,0,.16),0 2px 8px 0 rgba(0,0,0,.12)}.md-drppicker.double{width:auto}.md-drppicker.inline{position:relative;display:inline-block}.md-drppicker:after,.md-drppicker:before{position:absolute;display:inline-block;border-bottom-color:rgba(0,0,0,.2);content:\"\"}.md-drppicker.openscenter:after,.md-drppicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.md-drppicker.single .calendar,.md-drppicker.single .ranges{float:none}.md-drppicker .calendar{max-width:332px;margin:4px}.md-drppicker .calendar.single .calendar-table{border:none}.md-drppicker .calendar td,.md-drppicker .calendar th{padding:1px;white-space:nowrap;text-align:center;min-width:32px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md-drppicker .calendar td span,.md-drppicker .calendar th span{pointer-events:none}.md-drppicker .calendar-table{border:1px solid transparent;padding:4px}.md-drppicker .calendar-table table{border-spacing:2px;border-collapse:separate}.md-drppicker .ranges{float:none;text-align:left;margin:0}.md-drppicker .ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}.md-drppicker .ranges ul li{font-size:12px}.md-drppicker .ranges ul li button{padding:8px 12px;width:100%;background:none;border:none;text-align:left;cursor:pointer;outline:none}.md-drppicker .ranges ul li button[disabled]{opacity:.3}.md-drppicker .ranges ul li button:active{background:transparent}.md-drppicker table{width:100%;margin:0}.md-drppicker td,.md-drppicker th{text-align:center;width:20px;height:20px;border-radius:4px;white-space:nowrap;cursor:pointer;height:2em;width:2em}.md-drppicker td.week,.md-drppicker th.week{font-size:80%}.md-drppicker td.start-date{border-radius:2em 0 0 2em}.md-drppicker td.in-range{border-radius:0}.md-drppicker td.end-date{border-radius:0 2em 2em 0}.md-drppicker td.start-date.end-date{border-radius:4px}.md-drppicker td{margin:.25em 0;transition:background-color .2s ease;border-radius:2em;transform:scale(1);transition:all .45s cubic-bezier(.23,1,.32,1) 0ms}.md-drppicker th.month{width:auto}.md-drppicker option.disabled,.md-drppicker td.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}.md-drppicker .navigation-button{width:32px!important;height:32px!important;line-height:32px!important}.md-drppicker .navigation-button .calendar-icon{transform:rotate(180deg)}.md-drppicker .navigation-button .calendar-icon:after{display:block;content:\"\";height:6px;width:6px;border-width:0 0 2px 2px;border-style:solid;position:absolute;left:50%;top:50%}.md-drppicker .navigation-button .calendar-icon.calendar-icon--left:after{margin-left:1px;transform:translate(-50%,-50%) rotate(45deg)}.md-drppicker .navigation-button .calendar-icon.calendar-icon--right:after{margin-left:-1px;transform:translate(-50%,-50%) rotate(225deg)}.md-drppicker .dropdowns{width:60px}.md-drppicker .dropdowns+.dropdowns{margin-left:4px}.md-drppicker th.month>div{position:relative;display:inline-block}.md-drppicker .calendar-time{text-align:center;margin:4px auto 0;line-height:30px;position:relative}.md-drppicker .calendar-time .select{display:inline}.md-drppicker .calendar-time .select mat-select{width:46px}.md-drppicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}.md-drppicker .md-drppicker_input{position:relative;padding:0 30px 0 0}.md-drppicker .md-drppicker_input i,.md-drppicker .md-drppicker_input svg{position:absolute;left:8px;top:8px}.md-drppicker.rtl .label-input{padding-right:28px;padding-left:6px}.md-drppicker.rtl .md-drppicker_input i,.md-drppicker.rtl .md-drppicker_input svg{left:auto;right:8px}.md-drppicker .show-ranges .drp-calendar.left{border-left:1px solid #ddd}.md-drppicker .show-calendar .ranges{margin-top:8px}.md-drppicker [hidden]{display:none}.md-drppicker button+button{margin-left:8px}.md-drppicker .clear-button{display:flex;align-items:center;justify-content:center}.md-drppicker .clear-button .clear-icon{font-size:20px!important}.md-drppicker .clear-button .clear-icon svg{width:1em;height:1em;fill:currentColor;pointer-events:none;top:.125em;position:relative}.md-drppicker .buttons{text-align:right;margin:0 5px 5px 0}@media (min-width:564px){.md-drppicker{width:auto}.md-drppicker.single .calendar.left{clear:none}.md-drppicker.ltr{direction:ltr;text-align:left}.md-drppicker.ltr .calendar.left{clear:left}.md-drppicker.ltr .calendar.left .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.md-drppicker.ltr .calendar.right{margin-left:0}.md-drppicker.ltr .calendar.right .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.ltr .left .md-drppicker_input,.md-drppicker.ltr .right .md-drppicker_input{padding-right:35px}.md-drppicker.ltr .calendar.left .calendar-table{padding-right:12px}.md-drppicker.ltr .calendar,.md-drppicker.ltr .ranges{float:left}.md-drppicker.rtl{direction:rtl;text-align:right}.md-drppicker.rtl .calendar.left{clear:right;margin-left:0}.md-drppicker.rtl .calendar.left .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.rtl .calendar.right{margin-right:0}.md-drppicker.rtl .calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.md-drppicker.rtl .calendar.left .calendar-table,.md-drppicker.rtl .left .md-drppicker_input{padding-left:12px}.md-drppicker.rtl .calendar,.md-drppicker.rtl .ranges{text-align:right;float:right}.drp-animate{transform:translate(0);transition:transform .2s ease,opacity .2s ease}.drp-animate.drp-picker-site-this{transition-timing-function:linear}.drp-animate.drp-animate-right{transform:translateX(10%);opacity:0}.drp-animate.drp-animate-left{transform:translateX(-10%);opacity:0}}@media (min-width:730px){.md-drppicker .ranges{width:auto}.md-drppicker.ltr .ranges{float:left}.md-drppicker.rtl .ranges{float:right}.md-drppicker .calendar.left{clear:none!important}}"]
            },] }
];
DaterangepickerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: LocaleService }
];
DaterangepickerComponent.propDecorators = {
    startDate: [{ type: Input }],
    endDate: [{ type: Input }],
    dateLimit: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    autoApply: [{ type: Input }],
    singleDatePicker: [{ type: Input }],
    showDropdowns: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    showISOWeekNumbers: [{ type: Input }],
    linkedCalendars: [{ type: Input }],
    autoUpdateInput: [{ type: Input }],
    alwaysShowCalendars: [{ type: Input }],
    maxSpan: [{ type: Input }],
    lockStartDate: [{ type: Input }],
    timePicker: [{ type: Input }],
    timePicker24Hour: [{ type: Input }],
    timePickerIncrement: [{ type: Input }],
    timePickerSeconds: [{ type: Input }],
    showClearButton: [{ type: Input }],
    firstMonthDayClass: [{ type: Input }],
    lastMonthDayClass: [{ type: Input }],
    emptyWeekRowClass: [{ type: Input }],
    firstDayOfNextMonthClass: [{ type: Input }],
    lastDayOfPreviousMonthClass: [{ type: Input }],
    locale: [{ type: Input }],
    ranges: [{ type: Input }],
    showCustomRangeLabel: [{ type: Input }],
    showCancel: [{ type: Input }],
    keepCalendarOpeningWithRange: [{ type: Input }],
    showRangeLabelOnInput: [{ type: Input }],
    customRangeDirection: [{ type: Input }],
    isInvalidDate: [{ type: Input }],
    isCustomDate: [{ type: Input }],
    isTooltipDate: [{ type: Input }],
    closeOnAutoApply: [{ type: Input }],
    chosenDate: [{ type: Output }],
    rangeClicked: [{ type: Output }],
    datesUpdated: [{ type: Output }],
    startDateChanged: [{ type: Output }],
    endDateChanged: [{ type: Output }],
    closeDateRangePicker: [{ type: Output }],
    pickerContainer: [{ type: ViewChild, args: ['pickerContainer', { static: true },] }]
};

const moment = _moment;
class DaterangepickerDirective {
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
        var _a, _b;
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
}
DaterangepickerDirective.decorators = [
    { type: Directive, args: [{
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
                        useExisting: forwardRef(() => DaterangepickerDirective),
                        multi: true
                    }
                ]
            },] }
];
DaterangepickerDirective.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: KeyValueDiffers },
    { type: LocaleService },
    { type: ElementRef },
    { type: Overlay }
];
DaterangepickerDirective.propDecorators = {
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    autoApply: [{ type: Input }],
    alwaysShowCalendars: [{ type: Input }],
    showCustomRangeLabel: [{ type: Input }],
    linkedCalendars: [{ type: Input }],
    dateLimit: [{ type: Input }],
    singleDatePicker: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    showISOWeekNumbers: [{ type: Input }],
    showDropdowns: [{ type: Input }],
    showClearButton: [{ type: Input }],
    customRangeDirection: [{ type: Input }],
    ranges: [{ type: Input }],
    opens: [{ type: Input }],
    drops: [{ type: Input }],
    lastMonthDayClass: [{ type: Input }],
    emptyWeekRowClass: [{ type: Input }],
    firstDayOfNextMonthClass: [{ type: Input }],
    lastDayOfPreviousMonthClass: [{ type: Input }],
    keepCalendarOpeningWithRange: [{ type: Input }],
    showRangeLabelOnInput: [{ type: Input }],
    showCancel: [{ type: Input }],
    lockStartDate: [{ type: Input }],
    timePicker: [{ type: Input }],
    timePicker24Hour: [{ type: Input }],
    timePickerIncrement: [{ type: Input }],
    timePickerSeconds: [{ type: Input }],
    closeOnAutoApply: [{ type: Input }],
    locale: [{ type: Input }],
    _endKey: [{ type: Input }],
    change: [{ type: Output }],
    rangeClicked: [{ type: Output }],
    datesUpdated: [{ type: Output }],
    startDateChanged: [{ type: Output }],
    endDateChanged: [{ type: Output }],
    isInvalidDate: [{ type: Input }],
    isCustomDate: [{ type: Input }],
    isTooltipDate: [{ type: Input }],
    startKey: [{ type: Input }],
    endKey: [{ type: Input }]
};

class NgxDaterangepickerMd {
    static forRoot(config = {}) {
        return {
            ngModule: NgxDaterangepickerMd,
            providers: [
                { provide: LOCALE_CONFIG, useValue: config },
                { provide: LocaleService, useClass: LocaleService, deps: [LOCALE_CONFIG] }
            ]
        };
    }
}
NgxDaterangepickerMd.decorators = [
    { type: NgModule, args: [{
                declarations: [DaterangepickerComponent, DaterangepickerDirective],
                imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, OverlayModule],
                exports: [DaterangepickerComponent, DaterangepickerDirective]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { DaterangepickerComponent, DaterangepickerDirective, DefaultLocaleConfig, LOCALE_CONFIG, LocaleService, NgxDaterangepickerMd };
//# sourceMappingURL=ngx-daterangepicker-material.js.map