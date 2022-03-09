import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.scss']
})
export class ResourceProfileFormComponent implements OnInit {

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => console.log({params}));
    }

    ngOnInit(): void {
    }

}
