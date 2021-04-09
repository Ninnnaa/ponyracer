import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { FormControlValidationDirective } from './form-control-validation.directive';
import { FormLabelValidationDirective } from './form-label-validation.directive';
import { FormLabelDirective } from './form-label.directive';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, NgbAlertModule],
    declarations: [AlertComponent, FormControlValidationDirective, FormLabelValidationDirective, FormLabelDirective],
    exports: [AlertComponent, FormControlValidationDirective, FormLabelValidationDirective, FormLabelDirective, NgbAlertModule ]
})
export class SharedModule {}
