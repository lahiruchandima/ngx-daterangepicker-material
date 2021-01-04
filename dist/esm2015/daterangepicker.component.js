var DaterangepickerComponent_1;
import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocaleService } from './locale.service';
const moment = _moment;
export var SideEnum;
(function (SideEnum) {
    SideEnum["left"] = "left";
    SideEnum["right"] = "right";
})(SideEnum || (SideEnum = {}));
let DaterangepickerComponent = DaterangepickerComponent_1 = class DaterangepickerComponent {
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
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
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
                        start = moment(this.ranges[range][0], this.locale.format);
                    }
                    else {
                        start = moment(this.ranges[range][0]);
                    }
                    if (typeof this.ranges[range][1] === 'string') {
                        end = moment(this.ranges[range][1], this.locale.format);
                    }
                    else {
                        end = moment(this.ranges[range][1]);
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
        const daysInMonth = moment([year, month]).daysInMonth();
        const firstDay = moment([year, month, 1]);
        const lastDay = moment([year, month, daysInMonth]);
        const lastMonth = moment(firstDay).subtract(1, 'month').month();
        const lastYear = moment(firstDay).subtract(1, 'month').year();
        const daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
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
        let curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);
        for (let i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
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
            const realCurrentYear = moment().year();
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
            this.startDate = moment(startDate, this.locale.format);
        }
        if (typeof startDate === 'object') {
            this.pickingDate = true;
            this.startDate = moment(startDate);
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
            this.endDate = moment(endDate, this.locale.format);
        }
        if (typeof endDate === 'object') {
            this.pickingDate = false;
            this.endDate = moment(endDate);
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
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
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
                this.locale.format = moment.localeData().longDateFormat('lll');
            }
            else {
                this.locale.format = moment.localeData().longDateFormat('L');
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
};
DaterangepickerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: LocaleService }
];
__decorate([
    Input()
], DaterangepickerComponent.prototype, "startDate", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "endDate", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "dateLimit", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "minDate", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "maxDate", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "autoApply", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "singleDatePicker", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "showDropdowns", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "showWeekNumbers", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "showISOWeekNumbers", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "linkedCalendars", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "autoUpdateInput", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "alwaysShowCalendars", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "maxSpan", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "lockStartDate", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "timePicker", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "timePicker24Hour", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "timePickerIncrement", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "timePickerSeconds", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "showClearButton", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "firstMonthDayClass", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "lastMonthDayClass", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "emptyWeekRowClass", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "firstDayOfNextMonthClass", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "lastDayOfPreviousMonthClass", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "locale", null);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "ranges", null);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "showCustomRangeLabel", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "showCancel", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "keepCalendarOpeningWithRange", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "showRangeLabelOnInput", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "customRangeDirection", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "isInvalidDate", null);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "isCustomDate", null);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "isTooltipDate", null);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "closeOnAutoApply", void 0);
__decorate([
    Output()
], DaterangepickerComponent.prototype, "chosenDate", void 0);
__decorate([
    Output()
], DaterangepickerComponent.prototype, "rangeClicked", void 0);
__decorate([
    Output()
], DaterangepickerComponent.prototype, "datesUpdated", void 0);
__decorate([
    Output()
], DaterangepickerComponent.prototype, "startDateChanged", void 0);
__decorate([
    Output()
], DaterangepickerComponent.prototype, "endDateChanged", void 0);
__decorate([
    Output()
], DaterangepickerComponent.prototype, "closeDateRangePicker", void 0);
__decorate([
    ViewChild('pickerContainer', { static: true })
], DaterangepickerComponent.prototype, "pickerContainer", void 0);
DaterangepickerComponent = DaterangepickerComponent_1 = __decorate([
    Component({
        selector: 'ngx-daterangepicker-material',
        template: "<div\n    class=\"md-drppicker\"\n    #pickerContainer\n    [ngClass]=\"{\n        ltr: locale.direction === 'ltr',\n        rtl: this.locale.direction === 'rtl',\n        shown: isShown || inline,\n        hidden: !isShown && !inline,\n        inline: inline,\n        double: !singleDatePicker && showCalInRanges,\n        'show-ranges': rangesArray.length\n    }\"\n>\n    <div *ngIf=\"rangesArray.length > 0\" class=\"ranges\">\n        <ul>\n            <li *ngFor=\"let range of rangesArray\">\n                <button\n                    type=\"button\"\n                    [disabled]=\"disableRange(range)\"\n                    [ngClass]=\"{ active: range === chosenRange }\"\n                    (click)=\"clickRange(range)\"\n                >\n                    {{ range }}\n                </button>\n            </li>\n        </ul>\n    </div>\n    <div class=\"calendar\" [ngClass]=\"{ right: singleDatePicker, left: !singleDatePicker }\" *ngIf=\"showCalInRanges\">\n        <div class=\"calendar-table\">\n            <table class=\"table-condensed\" *ngIf=\"calendarVariables\">\n                <thead>\n                    <tr>\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\"></th>\n                        <ng-container\n                            *ngIf=\"\n                                !calendarVariables.left.minDate ||\n                                (calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) &&\n                                    (!this.linkedCalendars || true))\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickPrev(sideEnum.left)\">\n                                    <span class=\"calendar-icon calendar-icon--left\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    !calendarVariables.left.minDate ||\n                                    (calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) &&\n                                        (!this.linkedCalendars || true))\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                        <th colspan=\"5\" class=\"month drp-animate\">\n                            <ng-container *ngIf=\"showDropdowns && calendarVariables.left.dropdowns\">\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"fromMonthControl\">\n                                        <mat-option\n                                            *ngFor=\"let m of calendarVariables.left.dropdowns.monthArrays\"\n                                            [value]=\"m\"\n                                            [disabled]=\"\n                                                (calendarVariables.left.dropdowns.inMinYear &&\n                                                    m < calendarVariables.left.minDate.month()) ||\n                                                (calendarVariables.left.dropdowns.inMaxYear && m > calendarVariables.left.maxDate.month())\n                                            \"\n                                        >\n                                            {{ locale.monthNames[m] }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"fromYearControl\">\n                                        <mat-option *ngFor=\"let y of calendarVariables.left.dropdowns.yearArrays\" [value]=\"y\">\n                                            {{ y }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                            </ng-container>\n                            <ng-container *ngIf=\"!showDropdowns || !calendarVariables.left.dropdowns\">\n                                {{ this.locale.monthNames[calendarVariables?.left?.calendar[1][1].month()] }}\n                                {{ calendarVariables?.left?.calendar[1][1].format(' YYYY') }}\n                            </ng-container>\n                        </th>\n                        <ng-container\n                            *ngIf=\"\n                                (!calendarVariables.left.maxDate ||\n                                    calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) &&\n                                (!linkedCalendars || singleDatePicker)\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickNext(sideEnum.left)\">\n                                    <span class=\"calendar-icon calendar-icon--right\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    (!calendarVariables.left.maxDate ||\n                                        calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) &&\n                                    (!linkedCalendars || singleDatePicker)\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                    </tr>\n                    <tr class=\"week-days\">\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\" class=\"week\">\n                            <span>{{ this.locale.weekLabel }}</span>\n                        </th>\n                        <th *ngFor=\"let dayofweek of locale.daysOfWeek\">\n                            <span>{{ dayofweek }}</span>\n                        </th>\n                    </tr>\n                </thead>\n                <tbody class=\"drp-animate\">\n                    <tr *ngFor=\"let row of calendarVariables.left.calRows\" [class]=\"calendarVariables.left.classes[row].classList\">\n                        <!-- add week number -->\n                        <td class=\"week\" *ngIf=\"showWeekNumbers\">\n                            <span>{{ calendarVariables.left.calendar[row][0].week() }}</span>\n                        </td>\n                        <td class=\"week\" *ngIf=\"showISOWeekNumbers\">\n                            <span>{{ calendarVariables.left.calendar[row][0].isoWeek() }}</span>\n                        </td>\n                        <!-- cal -->\n                        <td\n                            *ngFor=\"let col of calendarVariables.left.calCols\"\n                            [class]=\"calendarVariables.left.classes[row][col]\"\n                            (click)=\"clickDate($event, sideEnum.left, row, col)\"\n                            (mouseenter)=\"hoverDate($event, sideEnum.left, row, col)\"\n                        >\n                            <span>{{ calendarVariables.left.calendar[row][col].date() }}</span>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"calendar-time\" *ngIf=\"timePicker\">\n            <div class=\"select\">\n                <mat-select\n                    class=\"hourselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.left.selectedHour\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.left.hours\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.left.disabledHours.indexOf(i) > -1\"\n                    >\n                        {{ i }}\n                    </mat-option>\n                </mat-select>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"minuteselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.left.selectedMinute\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.left.minutes; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.left.disabledMinutes.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.left.minutesLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"secondselect\"\n                    *ngIf=\"timePickerSeconds\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.left.selectedSecond\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.left.seconds; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.left.disabledSeconds.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.left.secondsLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"ampmselect\"\n                    *ngIf=\"!timePicker24Hour\"\n                    [(ngModel)]=\"timepickerVariables.left.ampmModel\"\n                    (ngModelChange)=\"timeChanged(sideEnum.left)\"\n                >\n                    <mat-option value=\"AM\" [disabled]=\"timepickerVariables.left.amDisabled\">AM</mat-option>\n                    <mat-option value=\"PM\" [disabled]=\"timepickerVariables.left.pmDisabled\">PM</mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n        </div>\n    </div>\n    <div class=\"calendar right\" *ngIf=\"showCalInRanges && !singleDatePicker\">\n        <div class=\"calendar-table\">\n            <table class=\"table-condensed\" *ngIf=\"calendarVariables\">\n                <thead>\n                    <tr>\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\"></th>\n                        <ng-container\n                            *ngIf=\"\n                                (!calendarVariables.right.minDate ||\n                                    calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) &&\n                                !this.linkedCalendars\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickPrev(sideEnum.right)\">\n                                    <span class=\"calendar-icon calendar-icon--left\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    (!calendarVariables.right.minDate ||\n                                        calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) &&\n                                    !this.linkedCalendars\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                        <th colspan=\"5\" class=\"month\">\n                            <ng-container *ngIf=\"showDropdowns && calendarVariables.right.dropdowns\">\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"toMonthControl\">\n                                        <mat-option\n                                            *ngFor=\"let m of calendarVariables.right.dropdowns.monthArrays\"\n                                            [disabled]=\"\n                                                (calendarVariables.right.dropdowns.inMinYear && calendarVariables.right.minDate &&\n                                                    m < calendarVariables.right.minDate.month()) ||\n                                                (calendarVariables.right.dropdowns.inMaxYear && calendarVariables.right.maxDate &&\n                                                m > calendarVariables.right.maxDate.month())\n                                            \"\n                                            [value]=\"m\"\n                                        >\n                                            {{ locale.monthNames[m] }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                                <div class=\"dropdowns\">\n                                    <mat-select [formControl]=\"toYearControl\">\n                                        <mat-option *ngFor=\"let y of calendarVariables.right.dropdowns.yearArrays\" [value]=\"y\">\n                                            {{ y }}\n                                        </mat-option>\n                                    </mat-select>\n                                </div>\n                            </ng-container>\n                            <ng-container *ngIf=\"!showDropdowns || !calendarVariables.right.dropdowns\">\n                                {{ this.locale.monthNames[calendarVariables?.right?.calendar[1][1].month()] }}\n                                {{ calendarVariables?.right?.calendar[1][1].format(' YYYY') }}\n                            </ng-container>\n                        </th>\n                        <ng-container\n                            *ngIf=\"\n                                !calendarVariables.right.maxDate ||\n                                (calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) &&\n                                    (!linkedCalendars || singleDatePicker || true))\n                            \"\n                        >\n                            <th>\n                                <button class=\"navigation-button\" mat-icon-button (click)=\"clickNext(sideEnum.right)\">\n                                    <span class=\"calendar-icon calendar-icon--right\"></span>\n                                </button>\n                            </th>\n                        </ng-container>\n                        <ng-container\n                            *ngIf=\"\n                                !(\n                                    !calendarVariables.right.maxDate ||\n                                    (calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) &&\n                                        (!linkedCalendars || singleDatePicker || true))\n                                )\n                            \"\n                        >\n                            <th></th>\n                        </ng-container>\n                    </tr>\n\n                    <tr class=\"week-days\">\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\" class=\"week\">\n                            <span>{{ this.locale.weekLabel }}</span>\n                        </th>\n                        <th *ngFor=\"let dayofweek of locale.daysOfWeek\">\n                            <span>{{ dayofweek }}</span>\n                        </th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let row of calendarVariables.right.calRows\" [class]=\"calendarVariables.right.classes[row].classList\">\n                        <td class=\"week\" *ngIf=\"showWeekNumbers\">\n                            <span>{{ calendarVariables.right.calendar[row][0].week() }}</span>\n                        </td>\n                        <td class=\"week\" *ngIf=\"showISOWeekNumbers\">\n                            <span>{{ calendarVariables.right.calendar[row][0].isoWeek() }}</span>\n                        </td>\n                        <td\n                            *ngFor=\"let col of calendarVariables.right.calCols\"\n                            [class]=\"calendarVariables.right.classes[row][col]\"\n                            (click)=\"clickDate($event, sideEnum.right, row, col)\"\n                            (mouseenter)=\"hoverDate($event, sideEnum.right, row, col)\"\n                        >\n                            <span>{{ calendarVariables.right.calendar[row][col].date() }}</span>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"calendar-time\" *ngIf=\"timePicker\">\n            <div class=\"select\">\n                <mat-select\n                    class=\"hourselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedHour\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.right.hours\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.right.disabledHours.indexOf(i) > -1\"\n                    >\n                        {{ i }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    class=\"minuteselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedMinute\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.right.minutes; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.right.disabledMinutes.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.right.minutesLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    *ngIf=\"timePickerSeconds\"\n                    class=\"secondselect\"\n                    [disabled]=\"!startDate\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedSecond\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option\n                        *ngFor=\"let i of timepickerVariables.right.seconds; let index = index\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.right.disabledSeconds.indexOf(i) > -1\"\n                    >\n                        {{ timepickerVariables.right.secondsLabel[index] }}\n                    </mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n            <div class=\"select\">\n                <mat-select\n                    *ngIf=\"!timePicker24Hour\"\n                    class=\"ampmselect\"\n                    [(ngModel)]=\"timepickerVariables.right.ampmModel\"\n                    (ngModelChange)=\"timeChanged(sideEnum.right)\"\n                >\n                    <mat-option value=\"AM\" [disabled]=\"timepickerVariables.right.amDisabled\">AM</mat-option>\n                    <mat-option value=\"PM\" [disabled]=\"timepickerVariables.right.pmDisabled\">PM</mat-option>\n                </mat-select>\n                <span class=\"select-highlight\"></span>\n                <span class=\"select-bar\"></span>\n            </div>\n        </div>\n    </div>\n    <div class=\"buttons\" *ngIf=\"!autoApply && (!rangesArray.length || (showCalInRanges && !singleDatePicker))\">\n        <div class=\"buttons_input\">\n            <button *ngIf=\"showClearButton\" mat-raised-button type=\"button\" [title]=\"locale.clearLabel\" (click)=\"clear()\">\n                <span class=\"clear-button\">\n                    {{ locale.clearLabel }}\n                    <span class=\"clear-icon\">\n                        <svg viewBox=\"0 0 24 24\">\n                            <path fill=\"currentColor\" d=\"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z\" />\n                        </svg>\n                    </span>\n                </span>\n            </button>\n            <button *ngIf=\"showCancel\" mat-raised-button (click)=\"clickCancel()\">{{ locale.cancelLabel }}</button>\n            <button [disabled]=\"applyBtn.disabled\" mat-raised-button color=\"primary\" (click)=\"clickApply($event)\">\n                {{ locale.applyLabel }}\n            </button>\n        </div>\n    </div>\n</div>\n",
        host: {
            '(click)': 'handleInternalClick($event)'
        },
        encapsulation: ViewEncapsulation.None,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DaterangepickerComponent_1),
                multi: true
            }
        ],
        styles: [".md-drppicker{border-radius:4px;width:340px;padding:4px;margin-top:-10px;overflow:hidden;font-size:14px;box-shadow:0 2px 4px 0 rgba(0,0,0,.16),0 2px 8px 0 rgba(0,0,0,.12)}.md-drppicker.double{width:auto}.md-drppicker.inline{position:relative;display:inline-block}.md-drppicker:after,.md-drppicker:before{position:absolute;display:inline-block;border-bottom-color:rgba(0,0,0,.2);content:''}.md-drppicker.openscenter:after,.md-drppicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.md-drppicker.single .calendar,.md-drppicker.single .ranges{float:none}.md-drppicker .calendar{max-width:332px;margin:4px}.md-drppicker .calendar.single .calendar-table{border:none}.md-drppicker .calendar td,.md-drppicker .calendar th{padding:1px;white-space:nowrap;text-align:center;min-width:32px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md-drppicker .calendar td span,.md-drppicker .calendar th span{pointer-events:none}.md-drppicker .calendar-table{border:1px solid transparent;padding:4px}.md-drppicker .calendar-table table{border-spacing:2px;border-collapse:separate}.md-drppicker .ranges{float:none;text-align:left;margin:0}.md-drppicker .ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}.md-drppicker .ranges ul li{font-size:12px}.md-drppicker .ranges ul li button{padding:8px 12px;width:100%;background:0 0;border:none;text-align:left;cursor:pointer;outline:0}.md-drppicker .ranges ul li button[disabled]{opacity:.3}.md-drppicker .ranges ul li button:active{background:0 0}.md-drppicker table{width:100%;margin:0}.md-drppicker td,.md-drppicker th{text-align:center;border-radius:4px;white-space:nowrap;cursor:pointer;height:2em;width:2em}.md-drppicker td.week,.md-drppicker th.week{font-size:80%}.md-drppicker td.start-date{border-radius:2em 0 0 2em}.md-drppicker td.in-range{border-radius:0}.md-drppicker td.end-date{border-radius:0 2em 2em 0}.md-drppicker td.start-date.end-date{border-radius:4px}.md-drppicker td{margin:.25em 0;transition:450ms cubic-bezier(.23,1,.32,1);border-radius:2em;transform:scale(1)}.md-drppicker th.month{width:auto}.md-drppicker option.disabled,.md-drppicker td.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}.md-drppicker .navigation-button{width:32px!important;height:32px!important;line-height:32px!important}.md-drppicker .navigation-button .calendar-icon{transform:rotate(180deg)}.md-drppicker .navigation-button .calendar-icon::after{display:block;content:'';height:6px;width:6px;border-width:0 0 2px 2px;border-style:solid;position:absolute;left:50%;top:50%}.md-drppicker .navigation-button .calendar-icon.calendar-icon--left::after{margin-left:1px;transform:translate(-50%,-50%) rotate(45deg)}.md-drppicker .navigation-button .calendar-icon.calendar-icon--right::after{margin-left:-1px;transform:translate(-50%,-50%) rotate(225deg)}.md-drppicker .dropdowns{width:60px}.md-drppicker .dropdowns+.dropdowns{margin-left:4px}.md-drppicker th.month>div{position:relative;display:inline-block}.md-drppicker .calendar-time{text-align:center;margin:4px auto 0;line-height:30px;position:relative}.md-drppicker .calendar-time .select{display:inline}.md-drppicker .calendar-time .select mat-select{width:46px}.md-drppicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}.md-drppicker .md-drppicker_input{position:relative;padding:0 30px 0 0}.md-drppicker .md-drppicker_input i,.md-drppicker .md-drppicker_input svg{position:absolute;left:8px;top:8px}.md-drppicker.rtl .label-input{padding-right:28px;padding-left:6px}.md-drppicker.rtl .md-drppicker_input i,.md-drppicker.rtl .md-drppicker_input svg{left:auto;right:8px}.md-drppicker .show-ranges .drp-calendar.left{border-left:1px solid #ddd}.md-drppicker .show-calendar .ranges{margin-top:8px}.md-drppicker [hidden]{display:none}.md-drppicker button+button{margin-left:8px}.md-drppicker .clear-button{display:flex;align-items:center;justify-content:center}.md-drppicker .clear-button .clear-icon{font-size:20px!important}.md-drppicker .clear-button .clear-icon svg{width:1em;height:1em;fill:currentColor;pointer-events:none;top:.125em;position:relative}.md-drppicker .buttons{text-align:right;margin:0 5px 5px 0}@media (min-width:564px){.md-drppicker{width:auto}.md-drppicker.single .calendar.left{clear:none}.md-drppicker.ltr{direction:ltr;text-align:left}.md-drppicker.ltr .calendar.left{clear:left}.md-drppicker.ltr .calendar.left .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;padding-right:12px}.md-drppicker.ltr .calendar.right{margin-left:0}.md-drppicker.ltr .calendar.right .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.ltr .left .md-drppicker_input,.md-drppicker.ltr .right .md-drppicker_input{padding-right:35px}.md-drppicker.ltr .calendar,.md-drppicker.ltr .ranges{float:left}.md-drppicker.rtl{direction:rtl;text-align:right}.md-drppicker.rtl .calendar.left{clear:right;margin-left:0}.md-drppicker.rtl .calendar.left .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.rtl .calendar.right{margin-right:0}.md-drppicker.rtl .calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.md-drppicker.rtl .calendar.left .calendar-table,.md-drppicker.rtl .left .md-drppicker_input{padding-left:12px}.md-drppicker.rtl .calendar,.md-drppicker.rtl .ranges{text-align:right;float:right}.drp-animate{transform:translate(0);transition:transform .2s,opacity .2s}.drp-animate.drp-picker-site-this{transition-timing-function:linear}.drp-animate.drp-animate-right{transform:translateX(10%);opacity:0}.drp-animate.drp-animate-left{transform:translateX(-10%);opacity:0}}@media (min-width:730px){.md-drppicker .ranges{width:auto}.md-drppicker.ltr .ranges{float:left}.md-drppicker.rtl .ranges{float:right}.md-drppicker .calendar.left{clear:none!important}}"]
    })
], DaterangepickerComponent);
export { DaterangepickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRlcmFuZ2VwaWNrZXItbWF0ZXJpYWwvIiwic291cmNlcyI6WyJkYXRlcmFuZ2VwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFdkIsTUFBTSxDQUFOLElBQVksUUFHWDtBQUhELFdBQVksUUFBUTtJQUNoQix5QkFBYSxDQUFBO0lBQ2IsMkJBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSFcsUUFBUSxLQUFSLFFBQVEsUUFHbkI7QUFrQkQsSUFBYSx3QkFBd0IsZ0NBQXJDLE1BQWEsd0JBQXdCO0lBNElqQyxZQUFvQixFQUFjLEVBQVUsSUFBdUIsRUFBVSxjQUE2QjtRQUF0RixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQTNJbEcsU0FBSSxHQUE2QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO1FB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LEVBQUU7OEVBQzZCO0FBRXJDO0lBREMsS0FBSyxFQUFFO3VFQUNzQjtBQUU5QjtJQURDLEtBQUssRUFBRTtzRUFDcUI7QUFHN0I7SUFEQyxLQUFLLEVBQUU7NkRBR1A7QUFHRDtJQURDLEtBQUssRUFBRTs0REFHUDtBQUdEO0lBREMsS0FBSyxFQUFFOzZEQUdQO0FBYVE7SUFBUixLQUFLLEVBQUU7a0VBQXlCO0FBRXZCO0lBQVQsTUFBTSxFQUFFOzREQUE0SDtBQUMzSDtJQUFULE1BQU0sRUFBRTs4REFBNkc7QUFDNUc7SUFBVCxNQUFNLEVBQUU7OERBQXlHO0FBQ3hHO0lBQVQsTUFBTSxFQUFFO2tFQUFvRjtBQUNuRjtJQUFULE1BQU0sRUFBRTtnRUFBZ0Y7QUFDL0U7SUFBVCxNQUFNLEVBQUU7c0VBQStEO0FBRXhCO0lBQS9DLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztpRUFBNkI7QUExSW5FLHdCQUF3QjtJQWhCcEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLDhCQUE4QjtRQUV4QyxtaXNCQUErQztRQUMvQyxJQUFJLEVBQUU7WUFDRixTQUFTLEVBQUUsNkJBQTZCO1NBQzNDO1FBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsU0FBUyxFQUFFO1lBQ1A7Z0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQywwQkFBd0IsQ0FBQztnQkFDdkQsS0FBSyxFQUFFLElBQUk7YUFDZDtTQUNKOztLQUNKLENBQUM7R0FDVyx3QkFBd0IsQ0E2MENwQztTQTcwQ1ksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgKiBhcyBfbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMb2NhbGVDb25maWcgfSBmcm9tICcuL2RhdGVyYW5nZXBpY2tlci5jb25maWcnO1xuaW1wb3J0IHsgTG9jYWxlU2VydmljZSB9IGZyb20gJy4vbG9jYWxlLnNlcnZpY2UnO1xuXG5jb25zdCBtb21lbnQgPSBfbW9tZW50O1xuXG5leHBvcnQgZW51bSBTaWRlRW51bSB7XG4gICAgbGVmdCA9ICdsZWZ0JyxcbiAgICByaWdodCA9ICdyaWdodCcsXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWRhdGVyYW5nZXBpY2tlci1tYXRlcmlhbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZGF0ZXJhbmdlcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RhdGVyYW5nZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGNsaWNrKSc6ICdoYW5kbGVJbnRlcm5hbENsaWNrKCRldmVudCknXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVyYW5nZXBpY2tlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfb2xkOiB7IHN0YXJ0OiBhbnk7IGVuZDogYW55IH0gPSB7IHN0YXJ0OiBudWxsLCBlbmQ6IG51bGwgfTtcbiAgICBjaG9zZW5MYWJlbDogc3RyaW5nO1xuICAgIGNhbGVuZGFyVmFyaWFibGVzOiB7IGxlZnQ6IGFueTsgcmlnaHQ6IGFueSB9ID0geyBsZWZ0OiB7fSwgcmlnaHQ6IHt9IH07XG4gICAgdG9vbHRpcHRleHQgPSBbXTsgLy8gZm9yIHN0b3JpbmcgdG9vbHRpcHRleHRcbiAgICB0aW1lcGlja2VyVmFyaWFibGVzOiB7IGxlZnQ6IGFueTsgcmlnaHQ6IGFueSB9ID0geyBsZWZ0OiB7fSwgcmlnaHQ6IHt9IH07XG5cbiAgICBkYXRlcmFuZ2VwaWNrZXI6IHsgc3RhcnQ6IEZvcm1Db250cm9sOyBlbmQ6IEZvcm1Db250cm9sIH0gPSB7IHN0YXJ0OiBuZXcgRm9ybUNvbnRyb2woKSwgZW5kOiBuZXcgRm9ybUNvbnRyb2woKSB9O1xuICAgIGZyb21Nb250aENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICBmcm9tWWVhckNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICB0b01vbnRoQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgIHRvWWVhckNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcblxuICAgIGFwcGx5QnRuOiB7IGRpc2FibGVkOiBib29sZWFuIH0gPSB7IGRpc2FibGVkOiBmYWxzZSB9O1xuICAgIEBJbnB1dCgpXG4gICAgc3RhcnREYXRlID0gbW9tZW50KCkuc3RhcnRPZignZGF5Jyk7XG4gICAgQElucHV0KClcbiAgICBlbmREYXRlID0gbW9tZW50KCkuZW5kT2YoJ2RheScpO1xuXG4gICAgQElucHV0KClcbiAgICBkYXRlTGltaXQ6IG51bWJlciA9IG51bGw7XG4gICAgLy8gdXNlZCBpbiB0ZW1wbGF0ZSBmb3IgY29tcGlsZSB0aW1lIHN1cHBvcnQgb2YgZW51bSB2YWx1ZXMuXG4gICAgc2lkZUVudW0gPSBTaWRlRW51bTtcblxuICAgIEBJbnB1dCgpXG4gICAgbWluRGF0ZTogX21vbWVudC5Nb21lbnQgPSBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgbWF4RGF0ZTogX21vbWVudC5Nb21lbnQgPSBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgYXV0b0FwcGx5ID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBzaW5nbGVEYXRlUGlja2VyID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBzaG93RHJvcGRvd25zID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBzaG93V2Vla051bWJlcnMgPSBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIHNob3dJU09XZWVrTnVtYmVycyA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgbGlua2VkQ2FsZW5kYXJzID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBhdXRvVXBkYXRlSW5wdXQgPSB0cnVlO1xuICAgIEBJbnB1dCgpXG4gICAgYWx3YXlzU2hvd0NhbGVuZGFycyA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgbWF4U3BhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgbG9ja1N0YXJ0RGF0ZSA9IGZhbHNlO1xuICAgIC8vIHRpbWVwaWNrZXIgdmFyaWFibGVzXG4gICAgQElucHV0KClcbiAgICB0aW1lUGlja2VyID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICB0aW1lUGlja2VyMjRIb3VyID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICB0aW1lUGlja2VySW5jcmVtZW50ID0gMTtcbiAgICBASW5wdXQoKVxuICAgIHRpbWVQaWNrZXJTZWNvbmRzID0gZmFsc2U7XG4gICAgLy8gZW5kIG9mIHRpbWVwaWNrZXIgdmFyaWFibGVzXG4gICAgQElucHV0KClcbiAgICBzaG93Q2xlYXJCdXR0b24gPSBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIGZpcnN0TW9udGhEYXlDbGFzczogc3RyaW5nID0gbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGxhc3RNb250aERheUNsYXNzOiBzdHJpbmcgPSBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZW1wdHlXZWVrUm93Q2xhc3M6IHN0cmluZyA9IG51bGw7XG4gICAgQElucHV0KClcbiAgICBmaXJzdERheU9mTmV4dE1vbnRoQ2xhc3M6IHN0cmluZyA9IG51bGw7XG4gICAgQElucHV0KClcbiAgICBsYXN0RGF5T2ZQcmV2aW91c01vbnRoQ2xhc3M6IHN0cmluZyA9IG51bGw7XG5cbiAgICBfbG9jYWxlOiBMb2NhbGVDb25maWcgPSB7fTtcbiAgICBASW5wdXQoKSBzZXQgbG9jYWxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2xvY2FsZSA9IHsgLi4udGhpcy5fbG9jYWxlU2VydmljZS5jb25maWcsIC4uLnZhbHVlIH07XG4gICAgfVxuXG4gICAgZ2V0IGxvY2FsZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICAgIH1cblxuICAgIC8vIGN1c3RvbSByYW5nZXNcbiAgICBfcmFuZ2VzOiBhbnkgPSB7fTtcblxuICAgIEBJbnB1dCgpIHNldCByYW5nZXModmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcmFuZ2VzID0gdmFsdWU7XG4gICAgICAgIHRoaXMucmVuZGVyUmFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0IHJhbmdlcygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmFuZ2VzO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2hvd0N1c3RvbVJhbmdlTGFiZWw6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBzaG93Q2FuY2VsID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBrZWVwQ2FsZW5kYXJPcGVuaW5nV2l0aFJhbmdlID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBzaG93UmFuZ2VMYWJlbE9uSW5wdXQgPSBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIGN1c3RvbVJhbmdlRGlyZWN0aW9uID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGlzSW52YWxpZERhdGUoZGF0ZTogX21vbWVudC5Nb21lbnQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaXNDdXN0b21EYXRlKGRhdGU6IF9tb21lbnQuTW9tZW50KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGlzVG9vbHRpcERhdGUoZGF0ZTogX21vbWVudC5Nb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjaG9zZW5SYW5nZTogc3RyaW5nO1xuICAgIHJhbmdlc0FycmF5OiBBcnJheTxhbnk+ID0gW107XG4gICAgbm93SG92ZXJlZERhdGUgPSBudWxsO1xuICAgIHBpY2tpbmdEYXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyBzb21lIHN0YXRlIGluZm9ybWF0aW9uXG4gICAgaXNTaG93bjogQm9vbGVhbiA9IGZhbHNlO1xuICAgIGlubGluZSA9IHRydWU7XG4gICAgbGVmdENhbGVuZGFyOiB7IG1vbnRoOiBfbW9tZW50Lk1vbWVudDsgY2FsZW5kYXI/OiBfbW9tZW50Lk1vbWVudFtdW10gfSA9IHsgbW9udGg6IG51bGwgfTtcbiAgICByaWdodENhbGVuZGFyOiB7IG1vbnRoOiBfbW9tZW50Lk1vbWVudDsgY2FsZW5kYXI/OiBfbW9tZW50Lk1vbWVudFtdW10gfSA9IHsgbW9udGg6IG51bGwgfTtcbiAgICBzaG93Q2FsSW5SYW5nZXM6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBjbG9zZU9uQXV0b0FwcGx5ID0gdHJ1ZTtcblxuICAgIEBPdXRwdXQoKSBjaG9zZW5EYXRlOiBFdmVudEVtaXR0ZXI8eyBjaG9zZW5MYWJlbDogc3RyaW5nOyBzdGFydERhdGU6IF9tb21lbnQuTW9tZW50OyBlbmREYXRlOiBfbW9tZW50Lk1vbWVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcmFuZ2VDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBsYWJlbDogc3RyaW5nOyBkYXRlczogW19tb21lbnQuTW9tZW50LCBfbW9tZW50Lk1vbWVudF0gfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGRhdGVzVXBkYXRlZDogRXZlbnRFbWl0dGVyPHsgc3RhcnREYXRlOiBfbW9tZW50Lk1vbWVudDsgZW5kRGF0ZTogX21vbWVudC5Nb21lbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHN0YXJ0RGF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjx7IHN0YXJ0RGF0ZTogX21vbWVudC5Nb21lbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGVuZERhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8eyBlbmREYXRlOiBfbW9tZW50Lk1vbWVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgY2xvc2VEYXRlUmFuZ2VQaWNrZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3BpY2tlckNvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIHBpY2tlckNvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX2xvY2FsZVNlcnZpY2U6IExvY2FsZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mcm9tTW9udGhDb250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChtb250aCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb250aENoYW5nZWQobW9udGgsIFNpZGVFbnVtLmxlZnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZyb21ZZWFyQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoeWVhcikgPT4ge1xuICAgICAgICAgICAgdGhpcy55ZWFyQ2hhbmdlZCh5ZWFyLCBTaWRlRW51bS5sZWZ0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50b01vbnRoQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgobW9udGgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9udGhDaGFuZ2VkKG1vbnRoLCBTaWRlRW51bS5yaWdodCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudG9ZZWFyQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoeWVhcikgPT4ge1xuICAgICAgICAgICAgdGhpcy55ZWFyQ2hhbmdlZCh5ZWFyLCBTaWRlRW51bS5yaWdodCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2J1aWxkTG9jYWxlKCk7XG4gICAgICAgIGNvbnN0IGRheXNPZldlZWsgPSBbLi4udGhpcy5sb2NhbGUuZGF5c09mV2Vla107XG4gICAgICAgIHRoaXMubG9jYWxlLmZpcnN0RGF5ID0gdGhpcy5sb2NhbGUuZmlyc3REYXkgJSA3O1xuICAgICAgICBpZiAodGhpcy5sb2NhbGUuZmlyc3REYXkgIT09IDApIHtcbiAgICAgICAgICAgIGxldCBpdGVyYXRvciA9IHRoaXMubG9jYWxlLmZpcnN0RGF5O1xuXG4gICAgICAgICAgICB3aGlsZSAoaXRlcmF0b3IgPiAwKSB7XG4gICAgICAgICAgICAgICAgZGF5c09mV2Vlay5wdXNoKGRheXNPZldlZWsuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3ItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvY2FsZS5kYXlzT2ZXZWVrID0gZGF5c09mV2VlaztcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLl9vbGQuc3RhcnQgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5fb2xkLmVuZCA9IHRoaXMuZW5kRGF0ZS5jbG9uZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhcnREYXRlICYmIHRoaXMudGltZVBpY2tlcikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGFydERhdGUodGhpcy5zdGFydERhdGUpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUaW1lUGlja2VyKFNpZGVFbnVtLmxlZnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSAmJiB0aGlzLnRpbWVQaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RW5kRGF0ZSh0aGlzLmVuZERhdGUpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUaW1lUGlja2VyKFNpZGVFbnVtLnJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTW9udGhzSW5WaWV3KCk7XG4gICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIoU2lkZUVudW0ubGVmdCk7XG4gICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIoU2lkZUVudW0ucmlnaHQpO1xuICAgICAgICB0aGlzLnJlbmRlclJhbmdlcygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB9XG5cbiAgICByZW5kZXJSYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmFuZ2VzQXJyYXkgPSBbXTtcbiAgICAgICAgbGV0IHN0YXJ0LCBlbmQ7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yYW5nZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJhbmdlIGluIHRoaXMucmFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmFuZ2VzW3JhbmdlXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucmFuZ2VzW3JhbmdlXVswXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gbW9tZW50KHRoaXMucmFuZ2VzW3JhbmdlXVswXSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gbW9tZW50KHRoaXMucmFuZ2VzW3JhbmdlXVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJhbmdlc1tyYW5nZV1bMV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSBtb21lbnQodGhpcy5yYW5nZXNbcmFuZ2VdWzFdLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gbW9tZW50KHRoaXMucmFuZ2VzW3JhbmdlXVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHN0YXJ0IG9yIGVuZCBkYXRlIGV4Y2VlZCB0aG9zZSBhbGxvd2VkIGJ5IHRoZSBtaW5EYXRlIG9yIG1heFNwYW5cbiAgICAgICAgICAgICAgICAgICAgLy8gb3B0aW9ucywgc2hvcnRlbiB0aGUgcmFuZ2UgdG8gdGhlIGFsbG93YWJsZSBwZXJpb2QuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgc3RhcnQuaXNCZWZvcmUodGhpcy5taW5EYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLm1pbkRhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4RGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4U3BhbiAmJiBtYXhEYXRlICYmIHN0YXJ0LmNsb25lKCkuYWRkKHRoaXMubWF4U3BhbikuaXNBZnRlcihtYXhEYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZSA9IHN0YXJ0LmNsb25lKCkuYWRkKHRoaXMubWF4U3Bhbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heERhdGUgJiYgZW5kLmlzQWZ0ZXIobWF4RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IG1heERhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZW5kIG9mIHRoZSByYW5nZSBpcyBiZWZvcmUgdGhlIG1pbmltdW0gb3IgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZSBpc1xuICAgICAgICAgICAgICAgICAgICAvLyBhZnRlciB0aGUgbWF4aW11bSwgZG9uJ3QgZGlzcGxheSB0aGlzIHJhbmdlIG9wdGlvbiBhdCBhbGwuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLm1pbkRhdGUgJiYgZW5kLmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgdGhpcy50aW1lUGlja2VyID8gJ21pbnV0ZScgOiAnZGF5JykpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAobWF4RGF0ZSAmJiBzdGFydC5pc0FmdGVyKG1heERhdGUsIHRoaXMudGltZVBpY2tlciA/ICdtaW51dGUnIDogJ2RheScpKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQgdW5pY29kZSBjaGFycyBpbiB0aGUgcmFuZ2UgbmFtZXMuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IHJhbmdlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5nZUh0bWwgPSBlbGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhbmdlc1tyYW5nZUh0bWxdID0gW3N0YXJ0LCBlbmRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmFuZ2UgaW4gdGhpcy5yYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yYW5nZXNbcmFuZ2VdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VzQXJyYXkucHVzaChyYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0N1c3RvbVJhbmdlTGFiZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmdlc0FycmF5LnB1c2godGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNob3dDYWxJblJhbmdlcyA9ICF0aGlzLnJhbmdlc0FycmF5Lmxlbmd0aCB8fCB0aGlzLmFsd2F5c1Nob3dDYWxlbmRhcnM7XG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGUuc3RhcnRPZignZGF5Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5lbmREYXRlLmVuZE9mKCdkYXknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRpbWVQaWNrZXIoc2lkZTogU2lkZUVudW0pIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkLCBtaW5EYXRlO1xuICAgICAgICBjb25zdCBtYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xuICAgICAgICBpZiAoc2lkZSA9PT0gU2lkZUVudW0ubGVmdCkge1xuICAgICAgICAgICAgKHNlbGVjdGVkID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKSksIChtaW5EYXRlID0gdGhpcy5taW5EYXRlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzaWRlID09PSBTaWRlRW51bS5yaWdodCAmJiB0aGlzLmVuZERhdGUpIHtcbiAgICAgICAgICAgIChzZWxlY3RlZCA9IHRoaXMuZW5kRGF0ZS5jbG9uZSgpKSwgKG1pbkRhdGUgPSB0aGlzLnN0YXJ0RGF0ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2lkZSA9PT0gU2lkZUVudW0ucmlnaHQgJiYgIXRoaXMuZW5kRGF0ZSkge1xuICAgICAgICAgICAgLy8gZG9uJ3QgaGF2ZSBhbiBlbmQgZGF0ZSwgdXNlIHRoZSBzdGFydCBkYXRlIHRoZW4gcHV0IHRoZSBzZWxlY3RlZCB0aW1lIGZvciB0aGUgcmlnaHQgc2lkZSBhcyB0aGUgdGltZVxuICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLl9nZXREYXRlV2l0aFRpbWUodGhpcy5zdGFydERhdGUsIFNpZGVFbnVtLnJpZ2h0KTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZC5pc0JlZm9yZSh0aGlzLnN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCk7IC8vc2V0IGl0IGJhY2sgdG8gdGhlIHN0YXJ0IGRhdGUgdGhlIHRpbWUgd2FzIGJhY2t3YXJkc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWluRGF0ZSA9IHRoaXMuc3RhcnREYXRlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy50aW1lUGlja2VyMjRIb3VyID8gMCA6IDE7XG4gICAgICAgIGNvbnN0IGVuZCA9IHRoaXMudGltZVBpY2tlcjI0SG91ciA/IDIzIDogMTI7XG4gICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXSA9IHtcbiAgICAgICAgICAgIGhvdXJzOiBbXSxcbiAgICAgICAgICAgIG1pbnV0ZXM6IFtdLFxuICAgICAgICAgICAgbWludXRlc0xhYmVsOiBbXSxcbiAgICAgICAgICAgIHNlY29uZHM6IFtdLFxuICAgICAgICAgICAgc2Vjb25kc0xhYmVsOiBbXSxcbiAgICAgICAgICAgIGRpc2FibGVkSG91cnM6IFtdLFxuICAgICAgICAgICAgZGlzYWJsZWRNaW51dGVzOiBbXSxcbiAgICAgICAgICAgIGRpc2FibGVkU2Vjb25kczogW10sXG4gICAgICAgICAgICBzZWxlY3RlZEhvdXI6IDAsXG4gICAgICAgICAgICBzZWxlY3RlZE1pbnV0ZTogMCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2Vjb25kOiAwXG4gICAgICAgIH07XG4gICAgICAgIC8vIGdlbmVyYXRlIGhvdXJzXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IGlfaW5fMjQgPSBpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIyNEhvdXIpIHtcbiAgICAgICAgICAgICAgICBpX2luXzI0ID0gc2VsZWN0ZWQuaG91cigpID49IDEyID8gKGkgPT09IDEyID8gMTIgOiBpICsgMTIpIDogaSA9PT0gMTIgPyAwIDogaTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdGltZSA9IHNlbGVjdGVkLmNsb25lKCkuaG91cihpX2luXzI0KTtcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG1pbkRhdGUgJiYgdGltZS5taW51dGUoNTkpLmlzQmVmb3JlKG1pbkRhdGUpKSB7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1heERhdGUgJiYgdGltZS5taW51dGUoMCkuaXNBZnRlcihtYXhEYXRlKSkge1xuICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLmhvdXJzLnB1c2goaSk7XG4gICAgICAgICAgICBpZiAoaV9pbl8yNCA9PT0gc2VsZWN0ZWQuaG91cigpICYmICFkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5zZWxlY3RlZEhvdXIgPSBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5kaXNhYmxlZEhvdXJzLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZW5lcmF0ZSBtaW51dGVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjA7IGkgKz0gdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBwYWRkZWQgPSBpIDwgMTAgPyAnMCcgKyBpIDogaTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBzZWxlY3RlZC5jbG9uZSgpLm1pbnV0ZShpKTtcblxuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobWluRGF0ZSAmJiB0aW1lLnNlY29uZCg1OSkuaXNCZWZvcmUobWluRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiB0aW1lLnNlY29uZCgwKS5pc0FmdGVyKG1heERhdGUpKSB7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLm1pbnV0ZXMucHVzaChpKTtcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5taW51dGVzTGFiZWwucHVzaChwYWRkZWQpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkLm1pbnV0ZSgpID09PSBpICYmICFkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5zZWxlY3RlZE1pbnV0ZSA9IGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLmRpc2FibGVkTWludXRlcy5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIHNlY29uZHNcbiAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlclNlY29uZHMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjA7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhZGRlZCA9IGkgPCAxMCA/ICcwJyArIGkgOiBpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBzZWxlY3RlZC5jbG9uZSgpLnNlY29uZChpKTtcblxuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChtaW5EYXRlICYmIHRpbWUuaXNCZWZvcmUobWluRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiB0aW1lLmlzQWZ0ZXIobWF4RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5zZWNvbmRzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLnNlY29uZHNMYWJlbC5wdXNoKHBhZGRlZCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLnNlY29uZCgpID09PSBpICYmICFkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uc2VsZWN0ZWRTZWNvbmQgPSBpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLmRpc2FibGVkU2Vjb25kcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBBTS9QTVxuICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcjI0SG91cikge1xuICAgICAgICAgICAgaWYgKG1pbkRhdGUgJiYgc2VsZWN0ZWQuY2xvbmUoKS5ob3VyKDEyKS5taW51dGUoMCkuc2Vjb25kKDApLmlzQmVmb3JlKG1pbkRhdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLmFtRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiBzZWxlY3RlZC5jbG9uZSgpLmhvdXIoMCkubWludXRlKDApLnNlY29uZCgwKS5pc0FmdGVyKG1heERhdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLnBtRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkLmhvdXIoKSA+PSAxMikge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5hbXBtTW9kZWwgPSAnUE0nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uYW1wbU1vZGVsID0gJ0FNJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB9XG5cbiAgICByZW5kZXJDYWxlbmRhcihzaWRlOiBTaWRlRW51bSk6IHZvaWQge1xuICAgICAgICBjb25zdCBtYWluQ2FsZW5kYXIgPSBzaWRlID09PSBTaWRlRW51bS5sZWZ0ID8gdGhpcy5sZWZ0Q2FsZW5kYXIgOiB0aGlzLnJpZ2h0Q2FsZW5kYXI7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gbWFpbkNhbGVuZGFyLm1vbnRoLm1vbnRoKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBtYWluQ2FsZW5kYXIubW9udGgueWVhcigpO1xuICAgICAgICBjb25zdCBob3VyID0gbWFpbkNhbGVuZGFyLm1vbnRoLmhvdXIoKTtcbiAgICAgICAgY29uc3QgbWludXRlID0gbWFpbkNhbGVuZGFyLm1vbnRoLm1pbnV0ZSgpO1xuICAgICAgICBjb25zdCBzZWNvbmQgPSBtYWluQ2FsZW5kYXIubW9udGguc2Vjb25kKCk7XG4gICAgICAgIGNvbnN0IGRheXNJbk1vbnRoID0gbW9tZW50KFt5ZWFyLCBtb250aF0pLmRheXNJbk1vbnRoKCk7XG4gICAgICAgIGNvbnN0IGZpcnN0RGF5ID0gbW9tZW50KFt5ZWFyLCBtb250aCwgMV0pO1xuICAgICAgICBjb25zdCBsYXN0RGF5ID0gbW9tZW50KFt5ZWFyLCBtb250aCwgZGF5c0luTW9udGhdKTtcbiAgICAgICAgY29uc3QgbGFzdE1vbnRoID0gbW9tZW50KGZpcnN0RGF5KS5zdWJ0cmFjdCgxLCAnbW9udGgnKS5tb250aCgpO1xuICAgICAgICBjb25zdCBsYXN0WWVhciA9IG1vbWVudChmaXJzdERheSkuc3VidHJhY3QoMSwgJ21vbnRoJykueWVhcigpO1xuICAgICAgICBjb25zdCBkYXlzSW5MYXN0TW9udGggPSBtb21lbnQoW2xhc3RZZWFyLCBsYXN0TW9udGhdKS5kYXlzSW5Nb250aCgpO1xuICAgICAgICBjb25zdCBkYXlPZldlZWsgPSBmaXJzdERheS5kYXkoKTtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBhIDYgcm93cyB4IDcgY29sdW1ucyBhcnJheSBmb3IgdGhlIGNhbGVuZGFyXG4gICAgICAgIGNvbnN0IGNhbGVuZGFyOiBhbnkgPSBbXTtcbiAgICAgICAgY2FsZW5kYXIuZmlyc3REYXkgPSBmaXJzdERheTtcbiAgICAgICAgY2FsZW5kYXIubGFzdERheSA9IGxhc3REYXk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgIGNhbGVuZGFyW2ldID0gW107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwb3B1bGF0ZSB0aGUgY2FsZW5kYXIgd2l0aCBkYXRlIG9iamVjdHNcbiAgICAgICAgbGV0IHN0YXJ0RGF5ID0gZGF5c0luTGFzdE1vbnRoIC0gZGF5T2ZXZWVrICsgdGhpcy5sb2NhbGUuZmlyc3REYXkgKyAxO1xuICAgICAgICBpZiAoc3RhcnREYXkgPiBkYXlzSW5MYXN0TW9udGgpIHtcbiAgICAgICAgICAgIHN0YXJ0RGF5IC09IDc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF5T2ZXZWVrID09PSB0aGlzLmxvY2FsZS5maXJzdERheSkge1xuICAgICAgICAgICAgc3RhcnREYXkgPSBkYXlzSW5MYXN0TW9udGggLSA2O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1ckRhdGUgPSBtb21lbnQoW2xhc3RZZWFyLCBsYXN0TW9udGgsIHN0YXJ0RGF5LCAxMiwgbWludXRlLCBzZWNvbmRdKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgY29sID0gMCwgcm93ID0gMDsgaSA8IDQyOyBpKyssIGNvbCsrLCBjdXJEYXRlID0gbW9tZW50KGN1ckRhdGUpLmFkZCgyNCwgJ2hvdXInKSkge1xuICAgICAgICAgICAgaWYgKGkgPiAwICYmIGNvbCAlIDcgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb2wgPSAwO1xuICAgICAgICAgICAgICAgIHJvdysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsZW5kYXJbcm93XVtjb2xdID0gY3VyRGF0ZS5jbG9uZSgpLmhvdXIoaG91cikubWludXRlKG1pbnV0ZSkuc2Vjb25kKHNlY29uZCk7XG4gICAgICAgICAgICBjdXJEYXRlLmhvdXIoMTIpO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5taW5EYXRlICYmXG4gICAgICAgICAgICAgICAgY2FsZW5kYXJbcm93XVtjb2xdLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09PSB0aGlzLm1pbkRhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykgJiZcbiAgICAgICAgICAgICAgICBjYWxlbmRhcltyb3ddW2NvbF0uaXNCZWZvcmUodGhpcy5taW5EYXRlKSAmJlxuICAgICAgICAgICAgICAgIHNpZGUgPT09ICdsZWZ0J1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY2FsZW5kYXJbcm93XVtjb2xdID0gdGhpcy5taW5EYXRlLmNsb25lKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLm1heERhdGUgJiZcbiAgICAgICAgICAgICAgICBjYWxlbmRhcltyb3ddW2NvbF0uZm9ybWF0KCdZWVlZLU1NLUREJykgPT09IHRoaXMubWF4RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSAmJlxuICAgICAgICAgICAgICAgIGNhbGVuZGFyW3Jvd11bY29sXS5pc0FmdGVyKHRoaXMubWF4RGF0ZSkgJiZcbiAgICAgICAgICAgICAgICBzaWRlID09PSAncmlnaHQnXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjYWxlbmRhcltyb3ddW2NvbF0gPSB0aGlzLm1heERhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2UgdGhlIGNhbGVuZGFyIG9iamVjdCBhdmFpbGFibGUgdG8gaG92ZXJEYXRlL2NsaWNrRGF0ZVxuICAgICAgICBpZiAoc2lkZSA9PT0gU2lkZUVudW0ubGVmdCkge1xuICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIuY2FsZW5kYXIgPSBjYWxlbmRhcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5jYWxlbmRhciA9IGNhbGVuZGFyO1xuICAgICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIERpc3BsYXkgdGhlIGNhbGVuZGFyXG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IG1pbkRhdGUgPSBzaWRlID09PSAnbGVmdCcgPyB0aGlzLm1pbkRhdGUgOiB0aGlzLnN0YXJ0RGF0ZTtcbiAgICAgICAgbGV0IG1heERhdGUgPSB0aGlzLm1heERhdGU7XG4gICAgICAgIC8vIGFkanVzdCBtYXhEYXRlIHRvIHJlZmxlY3QgdGhlIGRhdGVMaW1pdCBzZXR0aW5nIGluIG9yZGVyIHRvXG4gICAgICAgIC8vIGdyZXkgb3V0IGVuZCBkYXRlcyBiZXlvbmQgdGhlIGRhdGVMaW1pdFxuICAgICAgICBpZiAodGhpcy5lbmREYXRlID09PSBudWxsICYmIHRoaXMuZGF0ZUxpbWl0KSB7XG4gICAgICAgICAgICBjb25zdCBtYXhMaW1pdCA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCkuYWRkKHRoaXMuZGF0ZUxpbWl0LCAnZGF5JykuZW5kT2YoJ2RheScpO1xuICAgICAgICAgICAgaWYgKCFtYXhEYXRlIHx8IG1heExpbWl0LmlzQmVmb3JlKG1heERhdGUpKSB7XG4gICAgICAgICAgICAgICAgbWF4RGF0ZSA9IG1heExpbWl0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxlbmRhclZhcmlhYmxlc1tzaWRlXSA9IHtcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIGhvdXIsXG4gICAgICAgICAgICBtaW51dGUsXG4gICAgICAgICAgICBzZWNvbmQsXG4gICAgICAgICAgICBkYXlzSW5Nb250aCxcbiAgICAgICAgICAgIGZpcnN0RGF5LFxuICAgICAgICAgICAgbGFzdERheSxcbiAgICAgICAgICAgIGxhc3RNb250aCxcbiAgICAgICAgICAgIGxhc3RZZWFyLFxuICAgICAgICAgICAgZGF5c0luTGFzdE1vbnRoLFxuICAgICAgICAgICAgZGF5T2ZXZWVrLFxuICAgICAgICAgICAgLy8gb3RoZXIgdmFyc1xuICAgICAgICAgICAgY2FsUm93czogQXJyYXkuZnJvbShBcnJheSg2KS5rZXlzKCkpLFxuICAgICAgICAgICAgY2FsQ29sczogQXJyYXkuZnJvbShBcnJheSg3KS5rZXlzKCkpLFxuICAgICAgICAgICAgY2xhc3Nlczoge30sXG4gICAgICAgICAgICBtaW5EYXRlLFxuICAgICAgICAgICAgbWF4RGF0ZSxcbiAgICAgICAgICAgIGNhbGVuZGFyXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnNob3dEcm9wZG93bnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb250aCA9IGNhbGVuZGFyWzFdWzFdLm1vbnRoKCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50WWVhciA9IGNhbGVuZGFyWzFdWzFdLnllYXIoKTtcbiAgICAgICAgICAgIGNvbnN0IHJlYWxDdXJyZW50WWVhciA9IG1vbWVudCgpLnllYXIoKTtcbiAgICAgICAgICAgIGNvbnN0IG1heFllYXIgPSAobWF4RGF0ZSAmJiBtYXhEYXRlLnllYXIoKSkgfHwgcmVhbEN1cnJlbnRZZWFyICsgNTtcbiAgICAgICAgICAgIGNvbnN0IG1pblllYXIgPSAobWluRGF0ZSAmJiBtaW5EYXRlLnllYXIoKSkgfHwgcmVhbEN1cnJlbnRZZWFyIC0gNTA7XG4gICAgICAgICAgICBjb25zdCBpbk1pblllYXIgPSBjdXJyZW50WWVhciA9PT0gbWluWWVhcjtcbiAgICAgICAgICAgIGNvbnN0IGluTWF4WWVhciA9IGN1cnJlbnRZZWFyID09PSBtYXhZZWFyO1xuICAgICAgICAgICAgY29uc3QgeWVhcnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSBtaW5ZZWFyOyB5IDw9IG1heFllYXI7IHkrKykge1xuICAgICAgICAgICAgICAgIHllYXJzLnB1c2goeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyVmFyaWFibGVzW3NpZGVdLmRyb3Bkb3ducyA9IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50TW9udGg6IGN1cnJlbnRNb250aCxcbiAgICAgICAgICAgICAgICBjdXJyZW50WWVhcjogY3VycmVudFllYXIsXG4gICAgICAgICAgICAgICAgbWF4WWVhcjogbWF4WWVhcixcbiAgICAgICAgICAgICAgICBtaW5ZZWFyOiBtaW5ZZWFyLFxuICAgICAgICAgICAgICAgIGluTWluWWVhcjogaW5NaW5ZZWFyLFxuICAgICAgICAgICAgICAgIGluTWF4WWVhcjogaW5NYXhZZWFyLFxuICAgICAgICAgICAgICAgIG1vbnRoQXJyYXlzOiBBcnJheS5mcm9tKEFycmF5KDEyKS5rZXlzKCkpLFxuICAgICAgICAgICAgICAgIHllYXJBcnJheXM6IHllYXJzXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoc2lkZSA9PT0gU2lkZUVudW0ubGVmdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJvbU1vbnRoQ29udHJvbC5zZXRWYWx1ZShjdXJyZW50TW9udGgsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmZyb21ZZWFyQ29udHJvbC5zZXRWYWx1ZShjdXJyZW50WWVhciwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzaWRlID09PSBTaWRlRW51bS5yaWdodCkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9Nb250aENvbnRyb2wuc2V0VmFsdWUoY3VycmVudE1vbnRoLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b1llYXJDb250cm9sLnNldFZhbHVlKGN1cnJlbnRZZWFyLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9idWlsZENlbGxzKGNhbGVuZGFyLCBzaWRlKTtcbiAgICB9XG5cbiAgICBzZXRTdGFydERhdGUoc3RhcnREYXRlKTogdm9pZCB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhcnREYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBtb21lbnQoc3RhcnREYXRlLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzdGFydERhdGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tpbmdEYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gbW9tZW50KHN0YXJ0RGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMucGlja2luZ0RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSB0aGlzLnN0YXJ0RGF0ZS5zdGFydE9mKCdkYXknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIgJiYgdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5taW51dGUoTWF0aC5yb3VuZCh0aGlzLnN0YXJ0RGF0ZS5taW51dGUoKSAvIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkgKiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB0aGlzLnN0YXJ0RGF0ZS5pc0JlZm9yZSh0aGlzLm1pbkRhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMubWluRGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlciAmJiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5taW51dGUoTWF0aC5yb3VuZCh0aGlzLnN0YXJ0RGF0ZS5taW51dGUoKSAvIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkgKiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB0aGlzLnN0YXJ0RGF0ZS5pc0FmdGVyKHRoaXMubWF4RGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5tYXhEYXRlLmNsb25lKCk7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyICYmIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLm1pbnV0ZShNYXRoLmZsb29yKHRoaXMuc3RhcnREYXRlLm1pbnV0ZSgpIC8gdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSAqIHRoaXMudGltZVBpY2tlckluY3JlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaXNTaG93bikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGFydERhdGVDaGFuZ2VkLmVtaXQoeyBzdGFydERhdGU6IHRoaXMuc3RhcnREYXRlIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZU1vbnRoc0luVmlldygpO1xuICAgIH1cblxuICAgIHNldEVuZERhdGUoZW5kRGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIGVuZERhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBtb21lbnQoZW5kRGF0ZSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZW5kRGF0ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMucGlja2luZ0RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IG1vbWVudChlbmREYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcikge1xuICAgICAgICAgICAgdGhpcy5waWNraW5nRGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5lbmREYXRlLmFkZCgxLCAnZCcpLnN0YXJ0T2YoJ2RheScpLnN1YnRyYWN0KDEsICdzZWNvbmQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIgJiYgdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmVuZERhdGUubWludXRlKE1hdGgucm91bmQodGhpcy5lbmREYXRlLm1pbnV0ZSgpIC8gdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSAqIHRoaXMudGltZVBpY2tlckluY3JlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lbmREYXRlLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGhpcy5lbmREYXRlLmlzQWZ0ZXIodGhpcy5tYXhEYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5tYXhEYXRlLmNsb25lKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRlTGltaXQgJiYgdGhpcy5zdGFydERhdGUuY2xvbmUoKS5hZGQodGhpcy5kYXRlTGltaXQsICdkYXknKS5pc0JlZm9yZSh0aGlzLmVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmFkZCh0aGlzLmRhdGVMaW1pdCwgJ2RheScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd24pIHtcbiAgICAgICAgICAgIC8vIHRoaXMudXBkYXRlRWxlbWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5kRGF0ZUNoYW5nZWQuZW1pdCh7IGVuZERhdGU6IHRoaXMuZW5kRGF0ZSB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVNb250aHNJblZpZXcoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWaWV3KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoU2lkZUVudW0ubGVmdCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoU2lkZUVudW0ucmlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlTW9udGhzSW5WaWV3KCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ2FsZW5kYXJzKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlTW9udGhzSW5WaWV3KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5lbmREYXRlKSB7XG4gICAgICAgICAgICAvLyBpZiBib3RoIGRhdGVzIGFyZSB2aXNpYmxlIGFscmVhZHksIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhdGhpcy5zaW5nbGVEYXRlUGlja2VyICYmXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGggJiZcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggJiZcbiAgICAgICAgICAgICAgICAoKHRoaXMuc3RhcnREYXRlICYmIHRoaXMubGVmdENhbGVuZGFyICYmIHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTScpID09PSB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuc3RhcnREYXRlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTScpID09PSB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGguZm9ybWF0KCdZWVlZLU1NJykpKSAmJlxuICAgICAgICAgICAgICAgICh0aGlzLmVuZERhdGUuZm9ybWF0KCdZWVlZLU1NJykgPT09IHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLmZvcm1hdCgnWVlZWS1NTScpIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0nKSA9PT0gdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLmZvcm1hdCgnWVlZWS1NTScpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnREYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmRhdGUoMik7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhdGhpcy5saW5rZWRDYWxlbmRhcnMgJiZcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuZW5kRGF0ZS5tb250aCgpICE9PSB0aGlzLnN0YXJ0RGF0ZS5tb250aCgpIHx8IHRoaXMuZW5kRGF0ZS55ZWFyKCkgIT09IHRoaXMuc3RhcnREYXRlLnllYXIoKSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoID0gdGhpcy5lbmREYXRlLmNsb25lKCkuZGF0ZSgyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmRhdGUoMikuYWRkKDEsICdtb250aCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSAhPT0gdGhpcy5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NJykgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGguZm9ybWF0KCdZWVlZLU1NJykgIT09IHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTScpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aCA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCkuZGF0ZSgyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmRhdGUoMikuYWRkKDEsICdtb250aCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGhpcy5saW5rZWRDYWxlbmRhcnMgJiYgIXRoaXMuc2luZ2xlRGF0ZVBpY2tlciAmJiB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPiB0aGlzLm1heERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aCA9IHRoaXMubWF4RGF0ZS5jbG9uZSgpLmRhdGUoMik7XG4gICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aCA9IHRoaXMubWF4RGF0ZS5jbG9uZSgpLmRhdGUoMikuc3VidHJhY3QoMSwgJ21vbnRoJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgVGhpcyBpcyByZXNwb25zaWJsZSBmb3IgdXBkYXRpbmcgdGhlIGNhbGVuZGFyc1xuICAgICAqL1xuICAgIHVwZGF0ZUNhbGVuZGFycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcihTaWRlRW51bS5sZWZ0KTtcbiAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcihTaWRlRW51bS5yaWdodCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2hvc2VuTGFiZWwoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVFbGVtZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmb3JtYXQgPSB0aGlzLmxvY2FsZS5kaXNwbGF5Rm9ybWF0ID8gdGhpcy5sb2NhbGUuZGlzcGxheUZvcm1hdCA6IHRoaXMubG9jYWxlLmZvcm1hdDtcbiAgICAgICAgaWYgKCF0aGlzLnNpbmdsZURhdGVQaWNrZXIgJiYgdGhpcy5hdXRvVXBkYXRlSW5wdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSAmJiB0aGlzLmVuZERhdGUpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSB1c2UgcmFuZ2VzIGFuZCBzaG91bGQgc2hvdyByYW5nZSBsYWJlbCBvbiBpbnB1dFxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yYW5nZXNBcnJheS5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmFuZ2VMYWJlbE9uSW5wdXQgPT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaG9zZW5SYW5nZSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsICE9PSB0aGlzLmNob3NlblJhbmdlXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSB0aGlzLmNob3NlblJhbmdlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSB0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQoZm9ybWF0KSArIHRoaXMubG9jYWxlLnNlcGFyYXRvciArIHRoaXMuZW5kRGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvVXBkYXRlSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSB0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRoaXMgc2hvdWxkIGNhbGN1bGF0ZSB0aGUgbGFiZWxcbiAgICAgKi9cbiAgICBjYWxjdWxhdGVDaG9zZW5MYWJlbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvY2FsZSB8fCAhdGhpcy5sb2NhbGUuc2VwYXJhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9idWlsZExvY2FsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXN0b21SYW5nZSA9IHRydWU7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgaWYgKHRoaXMucmFuZ2VzQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCByYW5nZSBpbiB0aGlzLnJhbmdlcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJhbmdlc1tyYW5nZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gdGhpcy50aW1lUGlja2VyU2Vjb25kcyA/ICdZWVlZLU1NLUREIEhIOm1tOnNzJyA6ICdZWVlZLU1NLUREIEhIOm1tJztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSB0aW1lcyB3aGVuIGNvbXBhcmluZyBkYXRlcyBpZiB0aW1lIHBpY2tlciBzZWNvbmRzIGlzIG5vdCBlbmFibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydERhdGUuZm9ybWF0KGZvcm1hdCkgPT09IHRoaXMucmFuZ2VzW3JhbmdlXVswXS5mb3JtYXQoZm9ybWF0KSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5mb3JtYXQoZm9ybWF0KSA9PT0gdGhpcy5yYW5nZXNbcmFuZ2VdWzFdLmZvcm1hdChmb3JtYXQpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21SYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuUmFuZ2UgPSB0aGlzLnJhbmdlc0FycmF5W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIHRpbWVzIHdoZW4gY29tcGFyaW5nIGRhdGVzIGlmIHRpbWUgcGlja2VyIGlzIG5vdCBlbmFibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykgPT09IHRoaXMucmFuZ2VzW3JhbmdlXVswXS5mb3JtYXQoJ1lZWVktTU0tREQnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gdGhpcy5yYW5nZXNbcmFuZ2VdWzFdLmZvcm1hdCgnWVlZWS1NTS1ERCcpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21SYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuUmFuZ2UgPSB0aGlzLnJhbmdlc0FycmF5W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VzdG9tUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93Q3VzdG9tUmFuZ2VMYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNob3NlblJhbmdlID0gdGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNob3NlblJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgY3VzdG9tIGxhYmVsOiBzaG93IGNhbGVuZGFyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q2FsSW5SYW5nZXMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XG4gICAgfVxuXG4gICAgY2xpY2tBcHBseShlPyk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc2luZ2xlRGF0ZVBpY2tlciAmJiB0aGlzLnN0YXJ0RGF0ZSAmJiAhdGhpcy5lbmREYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLl9nZXREYXRlV2l0aFRpbWUodGhpcy5zdGFydERhdGUsIFNpZGVFbnVtLnJpZ2h0KTtcblxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDaG9zZW5MYWJlbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJbnZhbGlkRGF0ZSAmJiB0aGlzLnN0YXJ0RGF0ZSAmJiB0aGlzLmVuZERhdGUpIHtcbiAgICAgICAgICAgIC8vIGdldCBpZiB0aGVyZSBhcmUgaW52YWxpZCBkYXRlIGJldHdlZW4gcmFuZ2VcbiAgICAgICAgICAgIGNvbnN0IGQgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgd2hpbGUgKGQuaXNCZWZvcmUodGhpcy5lbmREYXRlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW52YWxpZERhdGUoZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZC5zdWJ0cmFjdCgxLCAnZGF5cycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUNob3NlbkxhYmVsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkLmFkZCgxLCAnZGF5cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2hvc2VuTGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuY2hvc2VuRGF0ZS5lbWl0KHsgY2hvc2VuTGFiZWw6IHRoaXMuY2hvc2VuTGFiZWwsIHN0YXJ0RGF0ZTogdGhpcy5zdGFydERhdGUsIGVuZERhdGU6IHRoaXMuZW5kRGF0ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0ZXNVcGRhdGVkLmVtaXQoeyBzdGFydERhdGU6IHRoaXMuc3RhcnREYXRlLCBlbmREYXRlOiB0aGlzLmVuZERhdGUgfSk7XG4gICAgICAgIGlmIChlIHx8ICh0aGlzLmNsb3NlT25BdXRvQXBwbHkgJiYgIWUpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrQ2FuY2VsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMuX29sZC5zdGFydDtcbiAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5fb2xkLmVuZDtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiBtb250aCBpcyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIG1vbnRoIG1vbnRoIHJlcHJlc2VudGVkIGJ5IGEgbnVtYmVyICgwIHRocm91Z2ggMTEpXG4gICAgICogQHBhcmFtIHNpZGUgbGVmdCBvciByaWdodFxuICAgICAqL1xuICAgIG1vbnRoQ2hhbmdlZChtb250aDogbnVtYmVyLCBzaWRlOiBTaWRlRW51bSk6IHZvaWQge1xuICAgICAgICBjb25zdCB5ZWFyID0gdGhpcy5jYWxlbmRhclZhcmlhYmxlc1tzaWRlXS5kcm9wZG93bnMuY3VycmVudFllYXI7XG4gICAgICAgIHRoaXMubW9udGhPclllYXJDaGFuZ2VkKG1vbnRoLCB5ZWFyLCBzaWRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiB5ZWFyIGlzIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0geWVhciB5ZWFyIHJlcHJlc2VudGVkIGJ5IGEgbnVtYmVyXG4gICAgICogQHBhcmFtIHNpZGUgbGVmdCBvciByaWdodFxuICAgICAqL1xuICAgIHllYXJDaGFuZ2VkKHllYXI6IG51bWJlciwgc2lkZTogU2lkZUVudW0pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbW9udGggPSB0aGlzLmNhbGVuZGFyVmFyaWFibGVzW3NpZGVdLmRyb3Bkb3ducy5jdXJyZW50TW9udGg7XG4gICAgICAgIHRoaXMubW9udGhPclllYXJDaGFuZ2VkKG1vbnRoLCB5ZWFyLCBzaWRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiB0aW1lIGlzIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0gc2lkZSBsZWZ0IG9yIHJpZ2h0XG4gICAgICovXG4gICAgdGltZUNoYW5nZWQoc2lkZTogU2lkZUVudW0pOiB2b2lkIHtcbiAgICAgICAgbGV0IGhvdXIgPSBwYXJzZUludCh0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uc2VsZWN0ZWRIb3VyLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZSA9IHBhcnNlSW50KHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5zZWxlY3RlZE1pbnV0ZSwgMTApO1xuICAgICAgICBjb25zdCBzZWNvbmQgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzID8gcGFyc2VJbnQodGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLnNlbGVjdGVkU2Vjb25kLCAxMCkgOiAwO1xuXG4gICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyKSB7XG4gICAgICAgICAgICBjb25zdCBhbXBtID0gdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLmFtcG1Nb2RlbDtcbiAgICAgICAgICAgIGlmIChhbXBtID09PSAnUE0nICYmIGhvdXIgPCAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBob3VyID09PSAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpZGUgPT09IFNpZGVFbnVtLmxlZnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgIHN0YXJ0LmhvdXIoaG91cik7XG4gICAgICAgICAgICBzdGFydC5taW51dGUobWludXRlKTtcbiAgICAgICAgICAgIHN0YXJ0LnNlY29uZChzZWNvbmQpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGFydERhdGUoc3RhcnQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZW5kRGF0ZSAmJiB0aGlzLmVuZERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykgPT09IHN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCcpICYmIHRoaXMuZW5kRGF0ZS5pc0JlZm9yZShzdGFydCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVuZERhdGUoc3RhcnQuY2xvbmUoKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmVuZERhdGUgJiYgdGhpcy50aW1lUGlja2VyKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRDbG9uZSA9IHRoaXMuX2dldERhdGVXaXRoVGltZShzdGFydCwgU2lkZUVudW0ucmlnaHQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0Q2xvbmUuaXNCZWZvcmUoc3RhcnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tTaWRlRW51bS5yaWdodF0uc2VsZWN0ZWRIb3VyID0gaG91cjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW1NpZGVFbnVtLnJpZ2h0XS5zZWxlY3RlZE1pbnV0ZSA9IG1pbnV0ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW1NpZGVFbnVtLnJpZ2h0XS5zZWxlY3RlZFNlY29uZCA9IHNlY29uZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5lbmREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmVuZERhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgIGVuZC5ob3VyKGhvdXIpO1xuICAgICAgICAgICAgZW5kLm1pbnV0ZShtaW51dGUpO1xuICAgICAgICAgICAgZW5kLnNlY29uZChzZWNvbmQpO1xuICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKGVuZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGNhbGVuZGFycyBzbyBhbGwgY2xpY2thYmxlIGRhdGVzIHJlZmxlY3QgdGhlIG5ldyB0aW1lIGNvbXBvbmVudFxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGVuZGFycygpO1xuXG4gICAgICAgIC8vIHJlLXJlbmRlciB0aGUgdGltZSBwaWNrZXJzIGJlY2F1c2UgY2hhbmdpbmcgb25lIHNlbGVjdGlvbiBjYW4gYWZmZWN0IHdoYXQncyBlbmFibGVkIGluIGFub3RoZXJcbiAgICAgICAgdGhpcy5yZW5kZXJUaW1lUGlja2VyKFNpZGVFbnVtLmxlZnQpO1xuICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoU2lkZUVudW0ucmlnaHQpO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9BcHBseSkge1xuICAgICAgICAgICAgdGhpcy5jbGlja0FwcGx5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgY2FsbCB3aGVuIG1vbnRoIG9yIHllYXIgY2hhbmdlZFxuICAgICAqIEBwYXJhbSBtb250aCBtb250aCBudW1iZXIgMCAtMTFcbiAgICAgKiBAcGFyYW0geWVhciB5ZWFyIGVnOiAxOTk1XG4gICAgICogQHBhcmFtIHNpZGUgbGVmdCBvciByaWdodFxuICAgICAqL1xuICAgIG1vbnRoT3JZZWFyQ2hhbmdlZChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIsIHNpZGU6IFNpZGVFbnVtKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlzTGVmdCA9IHNpZGUgPT09IFNpZGVFbnVtLmxlZnQ7XG5cbiAgICAgICAgaWYgKCFpc0xlZnQpIHtcbiAgICAgICAgICAgIGlmICh5ZWFyIDwgdGhpcy5zdGFydERhdGUueWVhcigpIHx8ICh5ZWFyID09PSB0aGlzLnN0YXJ0RGF0ZS55ZWFyKCkgJiYgbW9udGggPCB0aGlzLnN0YXJ0RGF0ZS5tb250aCgpKSkge1xuICAgICAgICAgICAgICAgIG1vbnRoID0gdGhpcy5zdGFydERhdGUubW9udGgoKTtcbiAgICAgICAgICAgICAgICB5ZWFyID0gdGhpcy5zdGFydERhdGUueWVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSkge1xuICAgICAgICAgICAgaWYgKHllYXIgPCB0aGlzLm1pbkRhdGUueWVhcigpIHx8ICh5ZWFyID09PSB0aGlzLm1pbkRhdGUueWVhcigpICYmIG1vbnRoIDwgdGhpcy5taW5EYXRlLm1vbnRoKCkpKSB7XG4gICAgICAgICAgICAgICAgbW9udGggPSB0aGlzLm1pbkRhdGUubW9udGgoKTtcbiAgICAgICAgICAgICAgICB5ZWFyID0gdGhpcy5taW5EYXRlLnllYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUpIHtcbiAgICAgICAgICAgIGlmICh5ZWFyID4gdGhpcy5tYXhEYXRlLnllYXIoKSB8fCAoeWVhciA9PT0gdGhpcy5tYXhEYXRlLnllYXIoKSAmJiBtb250aCA+IHRoaXMubWF4RGF0ZS5tb250aCgpKSkge1xuICAgICAgICAgICAgICAgIG1vbnRoID0gdGhpcy5tYXhEYXRlLm1vbnRoKCk7XG4gICAgICAgICAgICAgICAgeWVhciA9IHRoaXMubWF4RGF0ZS55ZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxlbmRhclZhcmlhYmxlc1tzaWRlXS5kcm9wZG93bnMuY3VycmVudFllYXIgPSB5ZWFyO1xuICAgICAgICB0aGlzLmNhbGVuZGFyVmFyaWFibGVzW3NpZGVdLmRyb3Bkb3ducy5jdXJyZW50TW9udGggPSBtb250aDtcbiAgICAgICAgaWYgKGlzTGVmdCkge1xuICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGgubW9udGgobW9udGgpLnllYXIoeWVhcik7XG4gICAgICAgICAgICBpZiAodGhpcy5saW5rZWRDYWxlbmRhcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPSB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5jbG9uZSgpLmFkZCgxLCAnbW9udGgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5tb250aChtb250aCkueWVhcih5ZWFyKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpbmtlZENhbGVuZGFycykge1xuICAgICAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoID0gdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLmNsb25lKCkuc3VidHJhY3QoMSwgJ21vbnRoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVDYWxlbmRhcnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGljayBvbiBwcmV2aW91cyBtb250aFxuICAgICAqIEBwYXJhbSBzaWRlIGxlZnQgb3IgcmlnaHQgY2FsZW5kYXJcbiAgICAgKi9cbiAgICBjbGlja1ByZXYoc2lkZTogU2lkZUVudW0pIHtcbiAgICAgICAgaWYgKHNpZGUgPT09IFNpZGVFbnVtLmxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLnN1YnRyYWN0KDEsICdtb250aCcpO1xuICAgICAgICAgICAgaWYgKHRoaXMubGlua2VkQ2FsZW5kYXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLnN1YnRyYWN0KDEsICdtb250aCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLnN1YnRyYWN0KDEsICdtb250aCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlQ2FsZW5kYXJzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xpY2sgb24gbmV4dCBtb250aFxuICAgICAqIEBwYXJhbSBzaWRlIGxlZnQgb3IgcmlnaHQgY2FsZW5kYXJcbiAgICAgKi9cbiAgICBjbGlja05leHQoc2lkZTogU2lkZUVudW0pOiB2b2lkIHtcbiAgICAgICAgaWYgKHNpZGUgPT09IFNpZGVFbnVtLmxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLmFkZCgxLCAnbW9udGgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5hZGQoMSwgJ21vbnRoJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5saW5rZWRDYWxlbmRhcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5hZGQoMSwgJ21vbnRoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVDYWxlbmRhcnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGhvdmVyaW5nIGEgZGF0ZVxuICAgICAqIEBwYXJhbSBlIGV2ZW50OiBnZXQgdmFsdWUgYnkgZS50YXJnZXQudmFsdWVcbiAgICAgKiBAcGFyYW0gc2lkZSBsZWZ0IG9yIHJpZ2h0XG4gICAgICogQHBhcmFtIHJvdyByb3cgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgZGF0ZSBjbGlja2VkXG4gICAgICogQHBhcmFtIGNvbCBjb2wgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgZGF0ZSBjbGlja2VkXG4gICAgICovXG4gICAgaG92ZXJEYXRlKGUsIHNpZGU6IFNpZGVFbnVtLCByb3c6IG51bWJlciwgY29sOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgbGVmdENhbERhdGUgPSB0aGlzLmNhbGVuZGFyVmFyaWFibGVzLmxlZnQuY2FsZW5kYXJbcm93XVtjb2xdO1xuICAgICAgICBjb25zdCByaWdodENhbERhdGUgPSB0aGlzLmNhbGVuZGFyVmFyaWFibGVzLnJpZ2h0LmNhbGVuZGFyW3Jvd11bY29sXTtcbiAgICAgICAgaWYgKHRoaXMucGlja2luZ0RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGhvdmVyRGF0ZSA9IHNpZGUgPT09IFNpZGVFbnVtLmxlZnQgPyBsZWZ0Q2FsRGF0ZSA6IHJpZ2h0Q2FsRGF0ZTtcbiAgICAgICAgICAgIHRoaXMubm93SG92ZXJlZERhdGUgPSB0aGlzLl9pc0RhdGVSYW5nZUludmFsaWQoaG92ZXJEYXRlKSA/IG51bGwgOiBob3ZlckRhdGU7XG5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIoU2lkZUVudW0ubGVmdCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckNhbGVuZGFyKFNpZGVFbnVtLnJpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0b29sdGlwID0gc2lkZSA9PT0gU2lkZUVudW0ubGVmdCA/IHRoaXMudG9vbHRpcHRleHRbbGVmdENhbERhdGVdIDogdGhpcy50b29sdGlwdGV4dFtyaWdodENhbERhdGVdO1xuICAgICAgICBpZiAodG9vbHRpcC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdG9vbHRpcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHNlbGVjdGluZyBhIGRhdGVcbiAgICAgKiBAcGFyYW0gZSBldmVudDogZ2V0IHZhbHVlIGJ5IGUudGFyZ2V0LnZhbHVlXG4gICAgICogQHBhcmFtIHNpZGUgbGVmdCBvciByaWdodFxuICAgICAqIEBwYXJhbSByb3cgcm93IHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGRhdGUgY2xpY2tlZFxuICAgICAqIEBwYXJhbSBjb2wgY29sIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGRhdGUgY2xpY2tlZFxuICAgICAqL1xuICAgIGNsaWNrRGF0ZShlLCBzaWRlOiBTaWRlRW51bSwgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnVEQnKSB7XG4gICAgICAgICAgICBpZiAoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXZhaWxhYmxlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1NQQU4nKSB7XG4gICAgICAgICAgICBpZiAoIWUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdmFpbGFibGUnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yYW5nZXNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY2hvc2VuUmFuZ2UgPSB0aGlzLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGUgPSBzaWRlID09PSBTaWRlRW51bS5sZWZ0ID8gdGhpcy5sZWZ0Q2FsZW5kYXIuY2FsZW5kYXJbcm93XVtjb2xdIDogdGhpcy5yaWdodENhbGVuZGFyLmNhbGVuZGFyW3Jvd11bY29sXTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAodGhpcy5lbmREYXRlIHx8IChkYXRlLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlLCAnZGF5JykgJiYgdGhpcy5jdXN0b21SYW5nZURpcmVjdGlvbiA9PT0gZmFsc2UpKSAmJlxuICAgICAgICAgICAgdGhpcy5sb2NrU3RhcnREYXRlID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIHBpY2tpbmcgc3RhcnRcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5fZ2V0RGF0ZVdpdGhUaW1lKGRhdGUsIFNpZGVFbnVtLmxlZnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKGRhdGUuY2xvbmUoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuZW5kRGF0ZSAmJiBkYXRlLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlKSAmJiB0aGlzLmN1c3RvbVJhbmdlRGlyZWN0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlOiBjbGlja2luZyB0aGUgc2FtZSBkYXRlIGZvciBzdGFydC9lbmQsXG4gICAgICAgICAgICAvLyBidXQgdGhlIHRpbWUgb2YgdGhlIGVuZCBkYXRlIGlzIGJlZm9yZSB0aGUgc3RhcnQgZGF0ZVxuICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKHRoaXMuc3RhcnREYXRlLmNsb25lKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcGlja2luZyBlbmRcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5fZ2V0RGF0ZVdpdGhUaW1lKGRhdGUsIFNpZGVFbnVtLnJpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRlLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlLCAnZGF5JykgPT09IHRydWUgJiYgdGhpcy5jdXN0b21SYW5nZURpcmVjdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RW5kRGF0ZSh0aGlzLnN0YXJ0RGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGFydERhdGUoZGF0ZS5jbG9uZSgpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5faXNEYXRlUmFuZ2VJbnZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGFydERhdGUoZGF0ZS5jbG9uZSgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKGRhdGUuY2xvbmUoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9BcHBseSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQ2hvc2VuTGFiZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZURhdGVQaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RW5kRGF0ZSh0aGlzLnN0YXJ0RGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9BcHBseSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tBcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b0FwcGx5ICYmIHRoaXMuc3RhcnREYXRlICYmIHRoaXMuZW5kRGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5jbGlja0FwcGx5KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGlzIGlzIHRvIGNhbmNlbCB0aGUgYmx1ciBldmVudCBoYW5kbGVyIGlmIHRoZSBtb3VzZSB3YXMgaW4gb25lIG9mIHRoZSBpbnB1dHNcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgQ2xpY2sgb24gdGhlIGN1c3RvbSByYW5nZVxuICAgICAqIEBwYXJhbSBsYWJlbFxuICAgICAqL1xuICAgIGNsaWNrUmFuZ2UobGFiZWw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmNob3NlblJhbmdlID0gbGFiZWw7XG4gICAgICAgIGlmIChsYWJlbCA9PT0gdGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5pc1Nob3duID0gdHJ1ZTsgLy8gc2hvdyBjYWxlbmRhcnNcbiAgICAgICAgICAgIHRoaXMuc2hvd0NhbEluUmFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVzID0gdGhpcy5yYW5nZXNbbGFiZWxdO1xuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBkYXRlc1swXS5jbG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZGF0ZXNbMV0uY2xvbmUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dSYW5nZUxhYmVsT25JbnB1dCAmJiBsYWJlbCAhPT0gdGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDaG9zZW5MYWJlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zaG93Q2FsSW5SYW5nZXMgPSAhdGhpcy5yYW5nZXNBcnJheS5sZW5ndGggfHwgdGhpcy5hbHdheXNTaG93Q2FsZW5kYXJzO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5lbmRPZignZGF5Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5hbHdheXNTaG93Q2FsZW5kYXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1Nob3duID0gZmFsc2U7IC8vIGhpZGUgY2FsZW5kYXJzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJhbmdlQ2xpY2tlZC5lbWl0KHsgbGFiZWw6IGxhYmVsLCBkYXRlczogZGF0ZXMgfSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMua2VlcENhbGVuZGFyT3BlbmluZ1dpdGhSYW5nZSB8fCB0aGlzLmF1dG9BcHBseSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tBcHBseSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWx3YXlzU2hvd0NhbGVuZGFycykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbGlja0FwcGx5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGhpcy5tYXhEYXRlLmlzU2FtZShkYXRlc1swXSwgJ21vbnRoJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLm1vbnRoKGRhdGVzWzBdLm1vbnRoKCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGgueWVhcihkYXRlc1swXS55ZWFyKCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5tb250aChkYXRlc1swXS5tb250aCgpIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLnllYXIoZGF0ZXNbMV0ueWVhcigpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5tb250aChkYXRlc1swXS5tb250aCgpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGgueWVhcihkYXRlc1swXS55ZWFyKCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saW5rZWRDYWxlbmRhcnMgfHwgZGF0ZXNbMF0ubW9udGgoKSA9PT0gZGF0ZXNbMV0ubW9udGgoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dE1vbnRoID0gZGF0ZXNbMF0uY2xvbmUoKS5hZGQoMSwgJ21vbnRoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGgubW9udGgobmV4dE1vbnRoLm1vbnRoKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLnllYXIobmV4dE1vbnRoLnllYXIoKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGgubW9udGgoZGF0ZXNbMV0ubW9udGgoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGgueWVhcihkYXRlc1sxXS55ZWFyKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FsZW5kYXJzKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoU2lkZUVudW0ubGVmdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGltZVBpY2tlcihTaWRlRW51bS5yaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdyhlPykge1xuICAgICAgICBpZiAodGhpcy5pc1Nob3duKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb2xkLnN0YXJ0ID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTtcbiAgICAgICAgdGhpcy5fb2xkLmVuZCA9IHRoaXMuZW5kRGF0ZS5jbG9uZSgpO1xuICAgICAgICB0aGlzLmlzU2hvd24gPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBoaWRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsb3NlRGF0ZVJhbmdlUGlja2VyLmVtaXQoKTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNTaG93bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGluY29tcGxldGUgZGF0ZSBzZWxlY3Rpb24sIHJldmVydCB0byBsYXN0IHZhbHVlc1xuICAgICAgICBpZiAoIXRoaXMuZW5kRGF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX29sZC5zdGFydCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5fb2xkLnN0YXJ0LmNsb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fb2xkLmVuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMuX29sZC5lbmQuY2xvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGEgbmV3IGRhdGUgcmFuZ2Ugd2FzIHNlbGVjdGVkLCBpbnZva2UgdGhlIHVzZXIgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0RGF0ZS5pc1NhbWUodGhpcy5fb2xkLnN0YXJ0KSB8fCAhdGhpcy5lbmREYXRlLmlzU2FtZSh0aGlzLl9vbGQuZW5kKSkge1xuICAgICAgICAgICAgLy8gdGhpcy5jYWxsYmFjayh0aGlzLnN0YXJ0RGF0ZSwgdGhpcy5lbmREYXRlLCB0aGlzLmNob3NlbkxhYmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHBpY2tlciBpcyBhdHRhY2hlZCB0byBhIHRleHQgaW5wdXQsIHVwZGF0ZSBpdFxuICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5pc1Nob3duID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAgICAgdGhpcy5jbG9zZURhdGVSYW5nZVBpY2tlci5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIGNsaWNrIG9uIGFsbCBlbGVtZW50IGluIHRoZSBjb21wb25lbnQsIHVzZWZ1bCBmb3Igb3V0c2lkZSBvZiBjbGlja1xuICAgICAqIEBwYXJhbSBlIGV2ZW50XG4gICAgICovXG4gICAgaGFuZGxlSW50ZXJuYWxDbGljayhlKTogdm9pZCB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlIHRoZSBsb2NhbGUgb3B0aW9uc1xuICAgICAqIEBwYXJhbSBsb2NhbGVcbiAgICAgKi9cbiAgICB1cGRhdGVMb2NhbGUobG9jYWxlKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGxvY2FsZSkge1xuICAgICAgICAgICAgaWYgKGxvY2FsZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGVba2V5XSA9IGxvY2FsZVtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdjdXN0b21SYW5nZUxhYmVsJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclJhbmdlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBjbGVhciB0aGUgZGF0ZXJhbmdlIHBpY2tlclxuICAgICAqL1xuICAgIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xuICAgICAgICB0aGlzLmVuZERhdGUgPSBtb21lbnQoKS5lbmRPZignZGF5Jyk7XG4gICAgICAgIHRoaXMuY2hvc2VuRGF0ZS5lbWl0KHsgY2hvc2VuTGFiZWw6ICcnLCBzdGFydERhdGU6IG51bGwsIGVuZERhdGU6IG51bGwgfSk7XG4gICAgICAgIHRoaXMuZGF0ZXNVcGRhdGVkLmVtaXQoeyBzdGFydERhdGU6IG51bGwsIGVuZERhdGU6IG51bGwgfSk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmQgb3V0IGlmIHRoZSBzZWxlY3RlZCByYW5nZSBzaG91bGQgYmUgZGlzYWJsZWQgaWYgaXQgZG9lc24ndFxuICAgICAqIGZpdCBpbnRvIG1pbkRhdGUgYW5kIG1heERhdGUgbGltaXRhdGlvbnMuXG4gICAgICovXG4gICAgZGlzYWJsZVJhbmdlKHJhbmdlKSB7XG4gICAgICAgIGlmIChyYW5nZSA9PT0gdGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhbmdlTWFya2VycyA9IHRoaXMucmFuZ2VzW3JhbmdlXTtcbiAgICAgICAgY29uc3QgYXJlQm90aEJlZm9yZSA9IHJhbmdlTWFya2Vycy5ldmVyeSgoZGF0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0ZS5pc0JlZm9yZSh0aGlzLm1pbkRhdGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBhcmVCb3RoQWZ0ZXIgPSByYW5nZU1hcmtlcnMuZXZlcnkoKGRhdGUpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5tYXhEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRhdGUuaXNBZnRlcih0aGlzLm1heERhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFyZUJvdGhCZWZvcmUgfHwgYXJlQm90aEFmdGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGUgdGhlIGRhdGUgdG8gYWRkIHRpbWVcbiAgICAgKiBAcGFyYW0gc2lkZSBsZWZ0IG9yIHJpZ2h0XG4gICAgICovXG4gICAgcHJpdmF0ZSBfZ2V0RGF0ZVdpdGhUaW1lKGRhdGUsIHNpZGU6IFNpZGVFbnVtKTogX21vbWVudC5Nb21lbnQge1xuICAgICAgICBsZXQgaG91ciA9IHBhcnNlSW50KHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5zZWxlY3RlZEhvdXIsIDEwKTtcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIyNEhvdXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGFtcG0gPSB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uYW1wbU1vZGVsO1xuICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdQTScgJiYgaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbXBtID09PSAnQU0nICYmIGhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWludXRlID0gcGFyc2VJbnQodGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLnNlbGVjdGVkTWludXRlLCAxMCk7XG4gICAgICAgIGNvbnN0IHNlY29uZCA9IHRoaXMudGltZVBpY2tlclNlY29uZHMgPyBwYXJzZUludCh0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uc2VsZWN0ZWRTZWNvbmQsIDEwKSA6IDA7XG4gICAgICAgIHJldHVybiBkYXRlLmNsb25lKCkuaG91cihob3VyKS5taW51dGUobWludXRlKS5zZWNvbmQoc2Vjb25kKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgYnVpbGQgdGhlIGxvY2FsZSBjb25maWdcbiAgICAgKi9cbiAgICBwcml2YXRlIF9idWlsZExvY2FsZSgpIHtcbiAgICAgICAgdGhpcy5sb2NhbGUgPSB7IC4uLnRoaXMuX2xvY2FsZVNlcnZpY2UuY29uZmlnLCAuLi50aGlzLmxvY2FsZSB9O1xuICAgICAgICBpZiAoIXRoaXMubG9jYWxlLmZvcm1hdCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlLmZvcm1hdCA9IG1vbWVudC5sb2NhbGVEYXRhKCkubG9uZ0RhdGVGb3JtYXQoJ2xsbCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5mb3JtYXQgPSBtb21lbnQubG9jYWxlRGF0YSgpLmxvbmdEYXRlRm9ybWF0KCdMJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9idWlsZENlbGxzKGNhbGVuZGFyLCBzaWRlOiBTaWRlRW51bSkge1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCA2OyByb3crKykge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhclZhcmlhYmxlc1tzaWRlXS5jbGFzc2VzW3Jvd10gPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IHJvd0NsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVtcHR5V2Vla1Jvd0NsYXNzICYmICF0aGlzLmhhc0N1cnJlbnRNb250aERheXModGhpcy5jYWxlbmRhclZhcmlhYmxlc1tzaWRlXS5tb250aCwgY2FsZW5kYXJbcm93XSkpIHtcbiAgICAgICAgICAgICAgICByb3dDbGFzc2VzLnB1c2godGhpcy5lbXB0eVdlZWtSb3dDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCA3OyBjb2wrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAvLyBoaWdobGlnaHQgdG9kYXkncyBkYXRlXG4gICAgICAgICAgICAgICAgaWYgKGNhbGVuZGFyW3Jvd11bY29sXS5pc1NhbWUobmV3IERhdGUoKSwgJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgndG9kYXknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IHdlZWtlbmRzXG4gICAgICAgICAgICAgICAgaWYgKGNhbGVuZGFyW3Jvd11bY29sXS5pc29XZWVrZGF5KCkgPiA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnd2Vla2VuZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBncmV5IG91dCB0aGUgZGF0ZXMgaW4gb3RoZXIgbW9udGhzIGRpc3BsYXllZCBhdCBiZWdpbm5pbmcgYW5kIGVuZCBvZiB0aGlzIGNhbGVuZGFyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGVuZGFyW3Jvd11bY29sXS5tb250aCgpICE9PSBjYWxlbmRhclsxXVsxXS5tb250aCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnb2ZmJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWFyayB0aGUgbGFzdCBkYXkgb2YgdGhlIHByZXZpb3VzIG1vbnRoIGluIHRoaXMgY2FsZW5kYXJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RGF5T2ZQcmV2aW91c01vbnRoQ2xhc3MgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChjYWxlbmRhcltyb3ddW2NvbF0ubW9udGgoKSA8IGNhbGVuZGFyWzFdWzFdLm1vbnRoKCkgfHwgY2FsZW5kYXJbMV1bMV0ubW9udGgoKSA9PT0gMCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyW3Jvd11bY29sXS5kYXRlKCkgPT09IHRoaXMuY2FsZW5kYXJWYXJpYWJsZXNbc2lkZV0uZGF5c0luTGFzdE1vbnRoXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKHRoaXMubGFzdERheU9mUHJldmlvdXNNb250aENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hcmsgdGhlIGZpcnN0IGRheSBvZiB0aGUgbmV4dCBtb250aCBpbiB0aGlzIGNhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3REYXlPZk5leHRNb250aENsYXNzICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2FsZW5kYXJbcm93XVtjb2xdLm1vbnRoKCkgPiBjYWxlbmRhclsxXVsxXS5tb250aCgpIHx8IGNhbGVuZGFyW3Jvd11bY29sXS5tb250aCgpID09PSAwKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXJbcm93XVtjb2xdLmRhdGUoKSA9PT0gMVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCh0aGlzLmZpcnN0RGF5T2ZOZXh0TW9udGhDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gbWFyayB0aGUgZmlyc3QgZGF5IG9mIHRoZSBjdXJyZW50IG1vbnRoIHdpdGggYSBjdXN0b20gY2xhc3NcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RNb250aERheUNsYXNzICYmXG4gICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyW3Jvd11bY29sXS5tb250aCgpID09PSBjYWxlbmRhclsxXVsxXS5tb250aCgpICYmXG4gICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyW3Jvd11bY29sXS5kYXRlKCkgPT09IGNhbGVuZGFyLmZpcnN0RGF5LmRhdGUoKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2godGhpcy5maXJzdE1vbnRoRGF5Q2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBtYXJrIHRoZSBsYXN0IGRheSBvZiB0aGUgY3VycmVudCBtb250aCB3aXRoIGEgY3VzdG9tIGNsYXNzXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RNb250aERheUNsYXNzICYmXG4gICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyW3Jvd11bY29sXS5tb250aCgpID09PSBjYWxlbmRhclsxXVsxXS5tb250aCgpICYmXG4gICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyW3Jvd11bY29sXS5kYXRlKCkgPT09IGNhbGVuZGFyLmxhc3REYXkuZGF0ZSgpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCh0aGlzLmxhc3RNb250aERheUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZG9uJ3QgYWxsb3cgc2VsZWN0aW9uIG9mIGRhdGVzIGJlZm9yZSB0aGUgbWluaW11bSBkYXRlXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiBjYWxlbmRhcltyb3ddW2NvbF0uaXNCZWZvcmUodGhpcy5taW5EYXRlLCAnZGF5JykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdvZmYnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZG9uJ3QgYWxsb3cgc2VsZWN0aW9uIG9mIGRhdGVzIGFmdGVyIHRoZSBtYXhpbXVtIGRhdGVcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWxlbmRhclZhcmlhYmxlc1tzaWRlXS5tYXhEYXRlICYmIGNhbGVuZGFyW3Jvd11bY29sXS5pc0FmdGVyKHRoaXMuY2FsZW5kYXJWYXJpYWJsZXNbc2lkZV0ubWF4RGF0ZSwgJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnb2ZmJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGRvbid0IGFsbG93IHNlbGVjdGlvbiBvZiBkYXRlIGlmIGEgY3VzdG9tIGZ1bmN0aW9uIGRlY2lkZXMgaXQncyBpbnZhbGlkXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnZhbGlkRGF0ZShjYWxlbmRhcltyb3ddW2NvbF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnb2ZmJywgJ2Rpc2FibGVkJywgJ2ludmFsaWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgc3RhcnQgZGF0ZVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSAmJiBjYWxlbmRhcltyb3ddW2NvbF0uZm9ybWF0KCdZWVlZLU1NLUREJykgPT09IHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJywgJ3N0YXJ0LWRhdGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZW5kIGRhdGVcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmREYXRlICE9IG51bGwgJiYgY2FsZW5kYXJbcm93XVtjb2xdLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09PSB0aGlzLmVuZERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdhY3RpdmUnLCAnZW5kLWRhdGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IGRhdGVzIGluLWJldHdlZW4gdGhlIHNlbGVjdGVkIGRhdGVzXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAoKHRoaXMubm93SG92ZXJlZERhdGUgIT0gbnVsbCAmJiB0aGlzLnBpY2tpbmdEYXRlKSB8fCB0aGlzLmVuZERhdGUgIT0gbnVsbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXJbcm93XVtjb2xdID4gdGhpcy5zdGFydERhdGUgJiZcbiAgICAgICAgICAgICAgICAgICAgKGNhbGVuZGFyW3Jvd11bY29sXSA8IHRoaXMuZW5kRGF0ZSB8fCAoY2FsZW5kYXJbcm93XVtjb2xdIDwgdGhpcy5ub3dIb3ZlcmVkRGF0ZSAmJiB0aGlzLnBpY2tpbmdEYXRlKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgIWNsYXNzZXMuZmluZCgoZWwpID0+IGVsID09PSAnb2ZmJylcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdpbi1yYW5nZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBhcHBseSBjdXN0b20gY2xhc3NlcyBmb3IgdGhpcyBkYXRlXG4gICAgICAgICAgICAgICAgY29uc3QgaXNDdXN0b20gPSB0aGlzLmlzQ3VzdG9tRGF0ZShjYWxlbmRhcltyb3ddW2NvbF0pO1xuICAgICAgICAgICAgICAgIGlmIChpc0N1c3RvbSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpc0N1c3RvbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChpc0N1c3RvbSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjbGFzc2VzLCBpc0N1c3RvbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gYXBwbHkgY3VzdG9tIHRvb2x0aXAgZm9yIHRoaXMgZGF0ZVxuICAgICAgICAgICAgICAgIGNvbnN0IGlzVG9vbHRpcCA9IHRoaXMuaXNUb29sdGlwRGF0ZShjYWxlbmRhcltyb3ddW2NvbF0pO1xuICAgICAgICAgICAgICAgIGlmIChpc1Rvb2x0aXApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpc1Rvb2x0aXAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXB0ZXh0W2NhbGVuZGFyW3Jvd11bY29sXV0gPSBpc1Rvb2x0aXA7IC8vIHNldHRpbmcgdG9vbHRpcHRleHQgZm9yIGN1c3RvbSBkYXRlXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXB0ZXh0W2NhbGVuZGFyW3Jvd11bY29sXV0gPSAnUHV0IHRoZSB0b29sdGlwIGFzIHRoZSByZXR1cm5lZCB2YWx1ZSBvZiBpc1Rvb2x0aXBEYXRlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcHRleHRbY2FsZW5kYXJbcm93XVtjb2xdXSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzdG9yZSBjbGFzc2VzIHZhclxuICAgICAgICAgICAgICAgIGxldCBjbmFtZSA9ICcnLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjbmFtZSArPSBjbGFzc2VzW2ldICsgJyAnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3Nlc1tpXSA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY25hbWUgKz0gJ2F2YWlsYWJsZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJWYXJpYWJsZXNbc2lkZV0uY2xhc3Nlc1tyb3ddW2NvbF0gPSBjbmFtZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyVmFyaWFibGVzW3NpZGVdLmNsYXNzZXNbcm93XS5jbGFzc0xpc3QgPSByb3dDbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmQgb3V0IGlmIHRoZSBjdXJyZW50IGNhbGVuZGFyIHJvdyBoYXMgY3VycmVudCBtb250aCBkYXlzXG4gICAgICogKGFzIG9wcG9zZWQgdG8gY29uc2lzdGluZyBvZiBvbmx5IHByZXZpb3VzL25leHQgbW9udGggZGF5cylcbiAgICAgKi9cbiAgICBoYXNDdXJyZW50TW9udGhEYXlzKGN1cnJlbnRNb250aCwgcm93KTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAobGV0IGRheSA9IDA7IGRheSA8IDc7IGRheSsrKSB7XG4gICAgICAgICAgICBpZiAocm93W2RheV0ubW9udGgoKSA9PT0gY3VycmVudE1vbnRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSB3aGVuIGEgZGF0ZSB3aXRoaW4gdGhlIHJhbmdlIG9mIGRhdGVzIGlzIGludmFsaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIF9pc0RhdGVSYW5nZUludmFsaWQoZW5kRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBkYXlzID0gW107XG4gICAgICAgIGxldCBkYXkgPSB0aGlzLnN0YXJ0RGF0ZTtcblxuICAgICAgICB3aGlsZSAoZGF5IDw9IGVuZERhdGUpIHtcbiAgICAgICAgICAgIGRheXMucHVzaChkYXkpO1xuICAgICAgICAgICAgZGF5ID0gZGF5LmNsb25lKCkuYWRkKDEsICdkJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF5cy5zb21lKChkKSA9PiB0aGlzLmlzSW52YWxpZERhdGUoZCkpO1xuICAgIH1cbn1cbiJdfQ==