import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.html',
    styleUrls: ['./portfolio.scss']
})
export class AppPortfolioComponent {
    @Input() singleColumn: boolean = false;
}