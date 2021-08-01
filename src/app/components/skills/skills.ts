import { Component, Input, ViewChild } from '@angular/core';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

interface Skill {
    type: string;
    name: string;
    level: number;
}

const DATA: Skill[] = [
    { type: '', name: '', level: 0 },

    { type: 'Concept', name: '', level: 0 },
    { type: 'Concept', name: 'Blockchain', level: 3 },
    { type: 'Concept', name: 'Caching', level: 5 },
    { type: 'Concept', name: 'Content management systems', level: 6 },
    { type: 'Concept', name: 'Data design', level: 7 },
    { type: 'Concept', name: 'Deployment', level: 8 },
    { type: 'Concept', name: 'Distributed services', level: 3 },
    { type: 'Concept', name: 'Document management', level: 7 },
    { type: 'Concept', name: 'Embedded systems', level: 3 },
    { type: 'Concept', name: 'Enterprise architecture', level: 4 },
    { type: 'Concept', name: 'Enterprise service bus', level: 5 },
    { type: 'Concept', name: 'Integrations', level: 8 },
    { type: 'Concept', name: 'Linux kernel', level: 2 },
    { type: 'Concept', name: 'Machine learning', level: 4 },
    { type: 'Concept', name: 'Microservices', level: 6 },
    { type: 'Concept', name: 'Networking', level: 7 },
    { type: 'Concept', name: 'ORM', level: 7 },
    { type: 'Concept', name: 'SEO', level: 3 },
    { type: 'Concept', name: 'Software architecture', level: 7 },
    { type: 'Concept', name: 'Software development', level: 9 },
    { type: 'Concept', name: 'System administration', level: 6 },
    { type: 'Concept', name: 'Web services', level: 8 },
    { type: 'Concept', name: 'Windows kernel', level: 2 },

    { type: 'Database', name: '', level: 0 },
    { type: 'Database', name: 'MongoDB', level: 5 },
    { type: 'Database', name: 'MSSQL', level: 6 },
    { type: 'Database', name: 'MySQL', level: 5 },
    { type: 'Database', name: 'Oracle', level: 5 },
    { type: 'Database', name: 'Postgresql', level: 6 },
    { type: 'Database', name: 'Sqlite', level: 6 },

    { type: 'Dev Ops', name: '', level: 0 },
    { type: 'Dev Ops', name: 'Active Directory', level: 5 },
    { type: 'Dev Ops', name: 'AWS', level: 5 },
    { type: 'Dev Ops', name: 'Azure', level: 6 },
    { type: 'Dev Ops', name: 'Docker', level: 7 },
    { type: 'Dev Ops', name: 'Jenkins', level: 5 },
    { type: 'Dev Ops', name: 'On premise', level: 7 },

    { type: 'Framework', name: '', level: 0 },
    { type: 'Framework', name: '.NET', level: 8 },
    { type: 'Framework', name: '.NET Core', level: 8 },
    { type: 'Framework', name: 'Android Studio', level: 5 },
    { type: 'Framework', name: 'Angular', level: 5 },
    { type: 'Framework', name: 'Cordova', level: 5 },
    { type: 'Framework', name: 'Django', level: 7 },
    { type: 'Framework', name: 'Ionic', level: 7 },
    { type: 'Framework', name: 'Moq', level: 5 },
    { type: 'Framework', name: 'RabbitMQ', level: 6 },
    { type: 'Framework', name: 'React', level: 5 },
    { type: 'Framework', name: 'Xamarin', level: 3 },
    { type: 'Framework', name: 'WPF', level: 6 },

    { type: 'Language', name: '', level: 0 },
    { type: 'Language', name: 'Assembly (6502, Z80, Custom)', level: 3 },
    { type: 'Language', name: 'C', level: 5 },
    { type: 'Language', name: 'C#', level: 9 },
    { type: 'Language', name: 'C++', level: 5 },
    { type: 'Language', name: 'CSS', level: 7 },
    { type: 'Language', name: 'Gosu', level: 5 },
    { type: 'Language', name: 'Java', level: 6 },
    { type: 'Language', name: 'Javascript', level: 7 },
    { type: 'Language', name: 'JSON', level: 9 },
    { type: 'Language', name: 'Lua', level: 4 },
    { type: 'Language', name: 'PHP', level: 5 },
    { type: 'Language', name: 'Python', level: 9 },
    { type: 'Language', name: 'Ruby', level: 2 },
    { type: 'Language', name: 'SCSS', level: 6 },
    { type: 'Language', name: 'Typescript', level: 8 },
    { type: 'Language', name: 'YAML', level: 7 },
    { type: 'Language', name: 'XML', level: 8 },

    { type: 'Library', name: '', level: 0 },
    { type: 'Library', name: 'Boost', level: 5 },
    { type: 'Library', name: 'Dapper', level: 5 },
    { type: 'Library', name: 'Flask', level: 7 },
    { type: 'Library', name: 'Infragistics', level: 5 },
    { type: 'Library', name: 'jQuery', level: 7 },

    { type: 'Protocol', name: '', level: 0 },
    { type: 'Protocol', name: 'FTP', level: 5 },
    { type: 'Protocol', name: 'HTTP', level: 5 },
    { type: 'Protocol', name: 'LDAP', level: 4 },
    { type: 'Protocol', name: 'REST', level: 7 },
    { type: 'Protocol', name: 'SOAP', level: 6 },

    { type: 'Skill', name: '', level: 0 },
    { type: 'Skill', name: 'Agile project management', level: 7 },
    { type: 'Skill', name: 'Requirements analysis', level: 7 },
    { type: 'Skill', name: 'Scrum', level: 7 },
    { type: 'Skill', name: 'Technical documentation', level: 7 },

    { type: 'Source control', name: '', level: 0 },
    { type: 'Source control', name: 'Git', level: 7 },
    { type: 'Source control', name: 'TFS', level: 5 },
];

@Component({
    selector: 'app-skills',
    templateUrl: './skills.html',
    styleUrls: ['./skills.scss']
})
export class AppSkillsComponent {
    @Input() singleColumn: boolean = false;
    @ViewChild(MatSort) sort: MatSort | null = null;

    dataSource = new MatTableDataSource(DATA.filter(x => x.type !== '' && x.name !== '' && x.level > 0));

    columns: string[] = [
        'type', 'name', 'level'
    ];

    constructor() {
        // TODO: Remove after debugging
        (window as any).vmskills = this;
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.sort?.sort({
            id: 'type',
            disableClear: true,
            start: 'asc'
        });
    }
}