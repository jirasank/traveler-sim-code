import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
import { CookieService } from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    
     
    // if (environment.name === 'develop' || environment.name === 'release') {
    //   // location code 1216 user MCE
    //   // let accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DRSIsInRpbWVzdGFtcCI6IjIwMTgwMjE0MTQyMCIsImxvY2F0aW9uQ29kZSI6IjEyMTYiLCJlbWFpbCI6IiIsImZpcnN0bmFtZSI6IiIsImxhc3RuYW1lIjoiIiwic2hhcmVkVXNlciI6Ik1PQklMRUFQUCIsInVzZXJUeXBlIjoiIiwicm9sZSI6IiIsImNoYW5uZWxUeXBlIjoiZWFzeS1hcHAiLCJhc2NDb2RlIjoiMTIzNDU2IiwibW9iaWxlTm8iOiIiLCJpYXQiOjE1MDYwNzE2MDQsImV4cCI6MTUwODY2MzYwNH0.yfS8_1-6HkcxpfscZTgpimC9WeSSF9wLh_osQ8Dwo4g';
    //   // location code 1136 user MCA
    //   // let accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DQSIsInRpbWVzdGFtcCI6IjIwMTgwMjE0MTQyMCIsImxvY2F0aW9uQ29kZSI6IjExMzYiLCJlbWFpbCI6IiIsImZpcnN0bmFtZSI6IiIsImxhc3RuYW1lIjoiIiwic2hhcmVkVXNlciI6Ik1PQklMRUFQUCIsInVzZXJUeXBlIjoiIiwicm9sZSI6IiIsImNoYW5uZWxUeXBlIjoiZWFzeS1hcHAiLCJhc2NDb2RlIjoiMTIzNDU2IiwibW9iaWxlTm8iOiIiLCJpYXQiOjE1MDU5Nzk3NzksImV4cCI6MTUwODU3MTc3OX0.iinHu0p4OokpWxTKDikhciG9oAxdq_GNd82h-OHKTW8';
    //   // location code 1100
    //   // let accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DIiwidGltZXN0YW1wIjoiMjAyMDAyMTQxNDIwIiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiIiwiZmlyc3RuYW1lIjoiIiwibGFzdG5hbWUiOiIiLCJzaGFyZWRVc2VyIjoiIiwidXNlclR5cGUiOiIiLCJyb2xlIjoiIiwiY2hhbm5lbFR5cGUiOiJlYXN5LWFwcCIsImFzY0NvZGUiOiIxMjM0NTYiLCJtb2JpbGVObyI6IjA4NzgzMDMzODgiLCJpYXQiOjE1MDU0NDgzNjgsImV4cCI6MTUwODA0MDM2OH0.2aTdl_S03fedYnUImMkbdgOd8DfoxMVHlra0kIigtA4';
    //   // location code 90035
    //  let accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DIiwidGltZXN0YW1wIjoiMjAxODAyMTQxNDIwIiwibG9jYXRpb25Db2RlIjoiOTAwMzUiLCJlbWFpbCI6IiIsImZpcnN0bmFtZSI6IiIsImxhc3RuYW1lIjoiIiwic2hhcmVkVXNlciI6Ik1PQklMRUFQUCIsInVzZXJUeXBlIjoiIiwicm9sZSI6IiIsImNoYW5uZWxUeXBlIjoiZWFzeS1hcHAiLCJhc2NDb2RlIjoiMTIzNDU2IiwibW9iaWxlTm8iOiIiLCJpYXQiOjE1MDcwMTQ4NjUsImV4cCI6MTUwOTYwNjg2NX0.qmJlQMvbxmYlzaBHd-Mqfj6oPwDz709w1LdxPC_qn0c';
    //   let refreshToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DIiwidGltZXN0YW1wIjoiMjAyMHMwMjE0MTQyMCIsImxvY2F0aW9uQ29kZSI6IjExMDAiLCJpYXQiOjE1MDQ1MjM1NjYsImV4cCI6MTUwNzExNTU2Nn0.ImNe58n2k6NxFG-BvqCWNpWmzzCmHMVY1OS29A2VDg8';
    //   this.cookieService.put("accessToken", accessToken);
    //   this.cookieService.put("refreshToken", refreshToken);
    //   // this.cookieService.put("mobileNo", '0811111111');
    // }

    let accessToken: any = this.cookieService.get("accessToken");
    let logoutUrl: any = environment.logoutUrl;
    if (!accessToken) {
       window.location.href = logoutUrl;
    } 
  }

}
