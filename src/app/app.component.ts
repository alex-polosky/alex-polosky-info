import { Component, ElementRef, ViewChild } from '@angular/core';

export interface PageLink {
    title: string;
    link: ElementRef | null;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('pageLink_whoami') pageLink_whoami: ElementRef | null = null;
    @ViewChild('pageLink_projects') pageLink_projects: ElementRef | null = null;
    @ViewChild('pageLink_skills') pageLink_skills: ElementRef | null = null;
    @ViewChild('pageLink_ideas') pageLink_ideas: ElementRef | null = null;

    get pageLinks(): PageLink[] {
        return [
            {
                title: 'whoami',
                link: this.pageLink_whoami
             },
             {
                title: 'Projects',
                link: this.pageLink_projects
             },
             {
                 title: 'Skills',
                 link: this.pageLink_skills
             },
             {
                 title: 'Ideas',
                 link: this.pageLink_ideas
             }
        ]
    }

    constructor() {
        (window as any).appvm = this;
    }
}
