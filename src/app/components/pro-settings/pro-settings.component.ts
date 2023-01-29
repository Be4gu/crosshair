import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrosshairsService } from 'src/app/services/crosshairs.service';

@Component({
  selector: 'app-pro-settings',
  templateUrl: './pro-settings.component.html',
  styleUrls: ['./pro-settings.component.css'],
})
export class ProSettingsComponent implements OnInit {
  infoPlayers: any;
  players = ['mixwell', 'tenz', 'yay', 'nats', 'f0rsaken'];
  active!: string;
  constructor(
    private activeR: ActivatedRoute,
    private route: Router,
    private svc: CrosshairsService
  ) {}

  ngOnInit() {
    this.activeR.queryParams.subscribe((params) => {
      this.active = params['player'];
      const player = this.active ?? 'mixwell';
      this.svc.getPlayer(player).subscribe((x) => {
        this.infoPlayers = x[0];
      });
    });
  }

  activeButton(name: string) {
    this.active = name.toLowerCase();

    this.setQueryParams();
  }

  setQueryParams() {
    this.route.navigate(['/settings'], {
      queryParams: { player: this.active },
    });
  }
}
