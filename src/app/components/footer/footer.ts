import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.html',
    styleUrls: ['./footer.scss']
})
export class AppFooterComponent {
    @Input() singleColumn: boolean = false;
}