import { Injectable, Inject } from '@angular/core';
import { LOCALE_CONFIG, DefaultLocaleConfig } from './daterangepicker.config';
export class LocaleService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0ZXJhbmdlcGlja2VyL2xvY2FsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUFHNUYsTUFBTSxPQUFPLGFBQWE7SUFDdEIsWUFBMkMsT0FBcUI7UUFBckIsWUFBTyxHQUFQLE9BQU8sQ0FBYztJQUFHLENBQUM7SUFFcEUsSUFBSSxNQUFNO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixPQUFPLG1CQUFtQixDQUFDO1NBQzlCO1FBRUQsdUNBQVksbUJBQW1CLEdBQUssSUFBSSxDQUFDLE9BQU8sRUFBRztJQUN2RCxDQUFDOzs7WUFWSixVQUFVOzs7NENBRU0sTUFBTSxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExPQ0FMRV9DT05GSUcsIERlZmF1bHRMb2NhbGVDb25maWcsIExvY2FsZUNvbmZpZyB9IGZyb20gJy4vZGF0ZXJhbmdlcGlja2VyLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbGVTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogTG9jYWxlQ29uZmlnKSB7fVxuXG4gICAgZ2V0IGNvbmZpZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWcpIHtcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0TG9jYWxlQ29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgLi4uRGVmYXVsdExvY2FsZUNvbmZpZywgLi4udGhpcy5fY29uZmlnIH07XG4gICAgfVxufVxuIl19