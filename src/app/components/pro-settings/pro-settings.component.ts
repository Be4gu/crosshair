import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pro-settings',
  templateUrl: './pro-settings.component.html',
  styleUrls: ['./pro-settings.component.css']
})
export class ProSettingsComponent implements OnInit {
  infoPlayer=[{pro:'mixwell', info: 'Info correspondiente a mixwell'},{pro:'tenz', info: 'Info correspondiente a tenz'}]
  players =["mixwell","tenz","yay", "cned"]
  active!: string;
  constructor(private activeR: ActivatedRoute, private route: Router){
    this.active= 'mixwell'
  }
  ngOnInit(){
    this.activeR.queryParams.subscribe((params) => {
      this.active = params['player'];
    })
  }
  activeButton(name: string) {
    this.active = name.toLowerCase();
    this.setQueryParams();
  }
  setQueryParams() {
    this.route.navigate(['/settings'], {
      queryParams: { player: this.active },
    })
  }
}
