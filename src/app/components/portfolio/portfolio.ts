import { Component, Input } from '@angular/core';

// const DATA = [
//     { name: 'Trust.med', 'title': }
// ]

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.html',
    styleUrls: ['./portfolio.scss']
})
export class AppPortfolioComponent {
    @Input() singleColumn: boolean = false;
}