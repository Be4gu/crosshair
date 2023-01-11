import {  Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    
    this.activeRout.queryParams.subscribe((params) => {
      this.active = params['cat'];
      console.log("value active: "+this.active);
      
    });
  }

}
