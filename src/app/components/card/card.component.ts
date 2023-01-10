import { Component } from '@angular/core';
import { Miras } from 'model/miras';
import { ActivatedRoute } from '@angular/router';
import { CrosshairsService } from 'src/app/services/crosshairs.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  public miras: Array<Miras> = [];
  constructor(
    private activeCat: ActivatedRoute,
    private svc: CrosshairsService
  ) {
    this.crossFilter();
  }

  crossFilter() {
    this.activeCat.queryParams.subscribe((params) => {
      const catActive = params['cat'];
      const searcher = params['search'];
      if (searcher === undefined || searcher === '') {
        if (
          catActive === 'pro' ||
          catActive === 'funny' ||
          catActive === 'streamer'
        ) {
          this.svc.getCat(catActive).subscribe((x) => {
            this.miras = x;
          });
        } else {
          this.svc.getCat('all').subscribe((x) => {
            this.miras = x;
          });
        }
      } else {
        this.svc.searcher(searcher).subscribe((x) => {
          this.miras = x;
        });
      }
    });
  }
}
