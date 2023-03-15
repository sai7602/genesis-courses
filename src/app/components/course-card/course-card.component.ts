import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course: any;
  constructor() {}

  ngOnInit(): void {
    function canGetSum(target: number, arr: any[]) {
      let n = arr.length;
      let dp = Array.from(Array(n + 1), () => Array(target + 1).fill(false));

      for (let i = 0; i <= n; i++) {
        dp[i][0] = true;
      }

      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= target; j++) {
          if (arr[i - 1] <= j) {
            dp[i][j] = dp[i - 1][j - arr[i - 1]] || dp[i - 1][j];
          } else {
            dp[i][j] = dp[i - 1][j];
          }
        }
      }

      return dp[n][target];
    }

    let arr = [-5, -10, 4, 6, 23, 10, 1, 3];
    let target = 32;
    let arr1 = [4, 6, 10, 1, 3];
    let target1 = 23;
    let arr2 = [5, 7, 1, 2];
    let target2 = 16;
    let arr3 = [3, 5, -1, 8];
    let target3 = 12;

    console.log(canGetSum(target, arr));
    console.log('test1', canGetSum(target1, arr1));
    console.log('test2', canGetSum(target2, arr2));
    console.log('test3', canGetSum(target3, arr3));
  }
}
