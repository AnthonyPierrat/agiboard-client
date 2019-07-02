import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-view-navbar',
  templateUrl: './project-view-navbar.component.html',
  styleUrls: ['./project-view-navbar.component.css']
})
export class ProjectViewNavbarComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  idProject: number;

  ngOnInit() {
    this.idProject = Number.parseInt(this.route.snapshot.paramMap.get("projectId"));
  }
}
