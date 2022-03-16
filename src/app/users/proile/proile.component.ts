import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-proile',
  templateUrl: './proile.component.html',
  styleUrls: ['./proile.component.scss']
})
export class ProileComponent implements OnInit {

  profiles$!: Observable<any>;
  readonly url = "http://localhost:8080/api/profiles";

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.profiles$ = this.http.get<{ profiles: any }>(this.url).pipe(
      map((profileData) => {
        return profileData.profiles;
      })
    );
  }
}
