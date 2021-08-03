import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-blurb',
    templateUrl: './blurb.html',
    styleUrls: ['./blurb.scss']
})
export class AppBlurbComponent {
    @Input() singleColumn: boolean = false;
}