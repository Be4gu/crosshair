import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
})
export class SubMenuComponent implements OnInit {
  types = ['all', 'pro', 'streamer', 'funny'];
  active!: string;
  searcher!: string;

  constructor(private route: Router, private activeRout: ActivatedRoute) {
    this.activeRout.queryParams.subscribe((params) => {
      if (
        params['cat'] === undefined ||
        (params['cat'] !== 'pro' &&
          params['cat'] !== 'funny' &&
          params['cat'] !== 'streamer' &&
          params['cat'] !== 'all')
      ) {
        this.route.navigate(['/miras'], {
          queryParams: { cat: 'all', search: null },
        });
      }
    });
  }
  ngOnInit() {
    this.activeRout.queryParams.subscribe((params) => {
      this.active = params['cat'];
      this.searcher = params['search'];
    });
  }

  activeButton(name: string) {
    this.active = name.toLowerCase();
    this.setQueryParams();
  }

  setQuerySearch() {
    this.route.navigate(['/miras'], {
      queryParams: { cat: 'all', search: this.searcher },
    });
  }

  setQueryParams() {
    this.route.navigate(['/miras'], {
      queryParams: { cat: this.active },
    });
  }
}
