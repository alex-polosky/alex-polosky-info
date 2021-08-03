import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-ideas',
    templateUrl: './ideas.html',
    styleUrls: ['./ideas.scss']
})
export class AppIdeasComponent {
    @Input() singleColumn: boolean = false;
}