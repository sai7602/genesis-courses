import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input() filledStars: number = 0;
  @Input() totalStars = 5;
  ratings: number[] = [];

  ngOnInit() {
    this.ratings = Array(this.totalStars)
      .fill(0)
      .map((_, i) => i + 1);
  }
}
