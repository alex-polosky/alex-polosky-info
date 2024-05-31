import { Component, Input } from '@angular/core';

const DATA: {
    title: string,
    desc: string,
    images: {
        path: string,
        caption: string
    }[]
}[] = [
    {
        title: 'DSCSA Solution Platform',
        desc: 'Insert some\ntext goes\nhere',
        images: [
            {
                path: 'dscsa/0.dashboard.png',
                caption: 'The dashboard home page'
            },
            {
                path: 'dscsa/1.inbox.png',
                caption: 'Your inbox, where all of your incoming messages live'
            },
            {
                path: 'dscsa/2.notifications.png',
                caption: 'A list of all of your recall messages'
            },
            {
                path: 'dscsa/3.multiple-slides.png',
                caption: 'Showing off multiple slides and the drop down editor'
            },
            {
                path: 'dscsa/4.de-status.png',
                caption: 'All of your incoming and outgoing files that are processed'
            },
            {
                path: 'dscsa/5.filters.png',
                caption: 'Editable filters to drill down the status of the files'
            }
        ]
    },
    {
        title: 'Club Card by Futures',
        desc: '',
        images: [
            {
                path: 'clubcard/1.login.png',
                caption: ''
            },
            {
                path: 'clubcard/2.bar_list.jpg',
                caption: ''
            },
            {
                path: 'clubcard/3.list_drinks_plus_ad.jpg',
                caption: ''
            },
            {
                path: 'clubcard/4.order_drink.jpg',
                caption: ''
            },
            {
                path: 'clubcard/5.submitted.jpg',
                caption: ''
            },
            {
                path: 'clubcard/6.notification.jpg',
                caption: ''
            },
            {
                path: 'clubcard/7.selecting_tab.jpg',
                caption: ''
            },
            {
                path: 'clubcard/8.notification_and_tab.jpg',
                caption: ''
            },
            {
                path: 'clubcard/9.tab_buttons.jpg',
                caption: ''
            },
            {
                path: 'clubcard/db.all.png',
                caption: ''
            },
            {
                path: 'clubcard/db.auth.png',
                caption: ''
            },
            {
                path: 'clubcard/db.inv.png',
                caption: ''
            },
            {
                path: 'clubcard/db.users.png',
                caption: ''
            }
        ]
    },
    {
        title: 'IEM System',
        desc: '',
        images: [
            {
                path: 'iem/20230123_181921.jpg',
                caption: ''
            },
            {
                path: 'iem/20230123_182102.jpg',
                caption: ''
            },
            {
                path: 'iem/20230123_182330.jpg',
                caption: ''
            },
            {
                path: 'iem/20230123_182514.jpg',
                caption: ''
            },
            {
                path: 'iem/20230123_183201.jpg',
                caption: ''
            },
            {
                path: 'iem/20230123_183810.jpg',
                caption: ''
            },
            {
                path: 'iem/20230123_184141.jpg',
                caption: ''
            },
            {
                path: 'iem/20230123_185233.jpg',
                caption: ''
            },
            {
                path: 'iem/20230123_185357.jpg',
                caption: ''
            },
            {
                path: 'iem/20230123_185424.jpg',
                caption: ''
            },
            {
                path: 'iem/20230123_185441.jpg',
                caption: ''
            },
            {
                path: 'iem/20230123_190446.jpg',
                caption: ''
            }
        ]
    }
]

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.html',
    styleUrls: ['./portfolio.scss']
})
export class AppPortfolioComponent {
    @Input() singleColumn: boolean = false;

    data = DATA;
    root: string = '/assets/portfolio/';
}