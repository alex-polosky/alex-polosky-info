import { AfterViewInit, Component, Inject, Input, OnDestroy, ViewChild } from '@angular/core';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
  } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';

interface PortDatum {
    title: string,
    blurb: string,
    desc?: string,
    images: {
        title: string,
        path: string,
        caption: string
    }[]
}

const DATA: PortDatum[] = [
    {
        title: 'DSCSA Solution Platform',
        blurb: 'The pharmaceutical supply chain has a need for compliant tracking.\nThis platform enabled manufacturers to both be compliant and have control over their data.',
        // desc: '',
        images: [
            {
                title: 'Home',
                path: 'dscsa/0.dashboard.png',
                caption: 'The dashboard home page'
            },
            {
                title: 'Inbox',
                path: 'dscsa/1.inbox.png',
                caption: 'Your inbox, where all of your incoming messages live'
            },
            {
                title: 'Recall',
                path: 'dscsa/2.notifications.png',
                caption: 'A list of all of your recall messages'
            },
            {
                title: 'Slides',
                path: 'dscsa/3.multiple-slides.png',
                caption: 'Showing off multiple slides and the drop down editor'
            },
            {
                title: 'Status',
                path: 'dscsa/4.de-status.png',
                caption: 'All of your incoming and outgoing files that are processed'
            },
            {
                title: 'Filters',
                path: 'dscsa/5.filters.png',
                caption: 'Editable filters to drill down the status of the files'
            },
            {
                title: 'Map 1',
                path: '/dscsa/6.dispensers.png',
                caption: 'Snapshot of clustered view of dispensers for use with Dropship'
            },
            {
                title: 'Map 2',
                path: '/dscsa/7.dispensers.png',
                caption: 'Snapshot of zoomed in view of dispensers for use with Dropship'
            }
        ]
    },
    {
        title: 'Club Card by Futures',
        blurb: 'An app that would allow users to purchase and pay for drinks at bars or other establishments.\nCustomers could open tabs and close them out, along with tips, all from their phone.',
        images: [
            {
                title: '',
                path: 'clubcard/1.login.jpg',
                caption: 'The login page'
            },
            {
                title: '',
                path: 'clubcard/2.bar_list.jpg',
                caption: 'A map and list of nearby establishments'
            },
            {
                title: '',
                path: 'clubcard/3.list_drinks_plus_ad.jpg',
                caption: 'Listing of drinks'
            },
            {
                title: '',
                path: 'clubcard/4.order_drink.jpg',
                caption: 'Details of a drink, before ordering'
            },
            {
                title: '',
                path: 'clubcard/5.submitted.jpg',
                caption: 'Successful ordering'
            },
            {
                title: '',
                path: 'clubcard/6.notification.jpg',
                caption: 'Push notification of placed order'
            },
            {
                title: '',
                path: 'clubcard/7.selecting_tab.jpg',
                caption: 'Side menu for a logged in user'
            },
            {
                title: '',
                path: 'clubcard/8.notification_and_tab.jpg',
                caption: 'A user\'s tab'
            },
            {
                title: '',
                path: 'clubcard/9.tab_buttons.jpg',
                caption: 'Users could only mark a drink received once an employee marked it ready'
            },
            {
                title: '',
                path: 'clubcard/db.all.png',
                caption: 'The full database schema and relations of the project'
            },
            {
                title: '',
                path: 'clubcard/db.inv.png',
                caption: 'The database schema for the inventory system'
            },
            {
                title: '',
                path: 'clubcard/db.users.png',
                caption: 'The schema for users'
            }
        ]
    },
    {
        title: 'IEM System',
        blurb: 'As an avid local musician and tech nerd, I had a drive to build an In-Ear-System.\nThis allowed several musicians to plug in, and I would mix the sound for both front of house and up to 6 musicians.',
        images: [
            {
                title: '',
                path: 'iem/20230123_181921.jpg',
                caption: 'The back-end, featuring the mixer, power board, router, and external connections'
            },
            {
                title: '',
                path: 'iem/20230123_182102.jpg',
                caption: 'The front-end, showing where each mic / instrument would plug into, as well as controls for the wireless units'
            },
            {
                title: '',
                path: 'iem/20230123_182330.jpg',
                caption: 'The full system on display'
            },
            {
                title: '',
                path: 'iem/20230123_183201.jpg',
                caption: 'The mess of front-end cables I\'d use for connecting mics and instruments'
            },
            {
                title: '',
                path: 'iem/20230123_183810.jpg',
                caption: 'These were primarily used for connecting the drummer into the system, utilizing both forward/backward connects for in-ears and mics'
            },
            {
                title: '',
                path: 'iem/20230123_185357.jpg',
                caption: 'The mixer program I would use for mixing at venues'
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

    constructor(private dialog: MatDialog) {}

    setActive(item: PortDatum) {
        this.dialog.open(PortModalComponent, {
            minWidth: this.singleColumn ? '100%' : '80%',
            minHeight: this.singleColumn ? '' : '63em',
            data: {
                ...item,
                singleColumn: this.singleColumn
            }
        });
    }
}

@Component({
    selector: 'app-port-modal',
    templateUrl: './port-modal.component.html',
    styleUrl: './port-modal.component.scss'
  })
  export class PortModalComponent implements AfterViewInit, OnDestroy {
    root: string = '/assets/portfolio/';

    @ViewChild(MatStepper) stepper: MatStepper | null = null;

    _subs: Subscription[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: PortDatum & { singleColumn: boolean },
        public dialogRef: MatDialogRef<PortModalComponent>
    ) {}

    ngAfterViewInit(): void {
        if (!this.stepper) {
            return;
        }
        this._subs.push(this.stepper.selectedIndexChange.subscribe(
            (index) => {
                if (!this.data.singleColumn || !this.stepper || index < 1) {
                    return;
                }

                let elems = document.querySelectorAll('.mat-step-icon');
                if (!elems || elems.length < index) {
                    return;
                }

                setTimeout(() => {
                    let target = index === (elems.length - 1) ? index : index - 1;
                    elems[target].scrollIntoView(true);
                }, 100);
            }
        ));
    }

    ngOnDestroy(): void {
        for (let sub of this._subs) {
            sub.unsubscribe();
        }
    }

    hasNext(): boolean {
        return (this.stepper?.selectedIndex ?? 0) > 0;
    }

    hasPrevious(): boolean {
        return (this.stepper?.selectedIndex ?? 0) < (this.stepper?.steps.length ?? 0) - 1;
    }

    next() {
        this.stepper?.next();
        this.stepper?.selected?.content.elementRef.nativeElement.focus();
    }

    previous() {
        this.stepper?.previous();
        this.stepper?.selected?.content.elementRef.nativeElement.focus();
    }
  }
