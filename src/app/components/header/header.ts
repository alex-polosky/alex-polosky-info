import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { PageLink } from 'src/app/app.component';

export interface TemplateLink {
    link: ElementRef | string | null;
    title: string;
    icon?: string;
}

export interface Cell {
    cols: number;
    rows: number;
    template: TemplateRef<any> | null;
    pages?: TemplateLink[] | string[];
}

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrls: ['./header.scss']
})
export class AppHeaderComponent {
    @Input() pageLinks: PageLink[] = [];
    @Input() singleColumn: boolean = false;

    colsWide = 5;
    colsNarrow = 1;

    get cols() {
        return this.singleColumn ? this.colsNarrow : this.colsWide;
    }

    @ViewChild('template_title') templateTitle: TemplateRef<any> | null = null;
    @ViewChild('template_links') templatePageLinks: TemplateRef<any> | null = null;
    @ViewChild('template_headline') templateHeadline: TemplateRef<any> | null = null;

    isInternalLink(link: any): boolean {
        return link === '#' || typeof link !== 'string';
    }
    pageClick(el: ElementRef): void {
        (el.nativeElement as HTMLElement).scrollIntoView({
            behavior: 'smooth'
        });
    }

    get cells(): Cell[] {
        return [
            {
                cols: 2,
                rows: 1,
                template: this.templateTitle
            },
            {
                cols: 2,
                rows: 1,
                template: this.templatePageLinks,
                pages: this.pageLinks
            },
            {
                cols: 1,
                rows: 1,
                template: this.templatePageLinks,
                pages: [
                    {
                        link: 'https://github.com/alex-polosky',
                        title: 'Github Account',
                        icon: 'github'
                    },
                    {
                        link: 'https://stackoverflow.com/users/568530',
                        title: 'StackOverflow Account',
                        icon: 'stackoverflow'
                    },
                    {
                        link: 'https://www.linkedin.com/in/alex-polosky/',
                        title: 'LinkedIn Profile',
                        icon: 'linkedin'
                    },
                    {
                        link: 'https://www.youtube.com/channel/UCpgqwkRck1EIlyzXxXY-19w',
                        title: 'Youtube Channel',
                        icon: 'youtube'
                    }
                ]
            },
            // {
            //     cols: 5,
            //     rows: 1,
            //     template: null
            // },
            // {
            //     rows: 1,
            //     cols: 1,
            //     template: null
            // },
            {
                rows: 2,
                cols: 5,
                template: this.templateHeadline,
                pages: [
                    "Developer",
                    "Tinkerer",
                    "Musician"
                ]
            },
            // {
            //     rows: 1,
            //     cols: 1,
            //     template: null
            // }
        ]
    }

    constructor(
        private matIconRegistry: MatIconRegistry,
        domSanitizer: DomSanitizer
    ) {
        this.matIconRegistry.addSvgIcon(
            'ajp',
            domSanitizer.bypassSecurityTrustResourceUrl('../assets/ajp.svg')
        );
        this.matIconRegistry.addSvgIcon(
            'github',
            domSanitizer.bypassSecurityTrustResourceUrl('../assets/github-mark.svg')
        );
        this.matIconRegistry.addSvgIcon(
            'stackoverflow',
            domSanitizer.bypassSecurityTrustResourceUrl('../assets/stackoverflow.svg')
        );
        this.matIconRegistry.addSvgIcon(
            'youtube',
            domSanitizer.bypassSecurityTrustResourceUrl('../assets/yt.svg')
        );
        this.matIconRegistry.addSvgIcon(
            'linkedin',
            domSanitizer.bypassSecurityTrustResourceUrl('../assets/linkedin.svg')
        );

        // TODO: Remove after debugging
        (window as any).vmheader = this;
    }
}