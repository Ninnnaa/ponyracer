import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControlValidationDirective } from './form-control-validation.directive';
import { FormLabelValidationDirective } from './form-label-validation.directive';
import { FormLabelDirective } from './form-label.directive';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule],
    declarations: [ FormControlValidationDirective, FormLabelValidationDirective, FormLabelDirective],
    exports: [FormControlValidationDirective, FormLabelValidationDirective, FormLabelDirective, NgbAlertModule, NgbPaginationModule],
})
export class SharedModule {}
