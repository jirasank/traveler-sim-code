import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalmasterService } from '../service/globalmaster.service';
import { GlobaldataService } from '../service/globaldata.service';
import { package_model } from '../shared/model/package.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'staff-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  tab = 1;
  myDate: Date;
  // fixedTimezone = '2015-06-15T09:03:01+0900';
  Package: package_model[] = [];
  constructor(
    public globalmasterService: GlobalmasterService
    , public packageSelect: GlobaldataService
    , private router: Router
    // , private route: ActivatedRoute
  ) { }
  @HostListener('window:focus', ['$event'])
  // onFocus(event: any): void {
  //     // Do something
  //      let t = "";
  // }

  // @HostListener('window:blur', ['$event'])
  // onBlur(event: any): void {
  //     // Do something
  //     let t = "";
  // }

  ngOnInit() {
    setInterval(() => {
      this.myDate = new Date();
      // console.log(this.myDate); 
    }, 1000);
    this.setAllTabClass(1);

  }
  setAllTabClass(btn) {
    this.tab = btn;
    // if(btn == 2)     this.router.navigate(['./finish'], { relativeTo: this.route });
  }
  onBlur(event) {
    // const innerWidth = event.target.innerHeight;
    let innerHeight = (window.screen.height);
    let innerWidth = (window.screen.width);
    console.log("screen:", document.hidden, document.visibilityState);
    if (document.hidden == true) {
      console.log('send to page Welcome');
      this.sendResumePage('welcome');
    } else {
      console.log('send to page Resume');
      this.sendResumePage('resume');
    }


  }

  sendResumePage(opt) {
    var str = {};
    if (opt == "welcome") {
      str = {
        command: 'next',
        data: '/customer'
      };
    } else { //customer stay page  welcome
      str = {
        command: 'next',
        data: ''
      };
    }
    //  let data = '{"command":"open","packages":}';
    this.globalmasterService.ws_master.send(str).subscribe(
      (msg) => {
        console.log("next", msg.data);
      },
      (msg) => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      }
    );
    setTimeout(() => {
      this.sendPackage(opt);
    },
      10);


  }
  sendPackage(opt) { //page not stayed welcome
    if (opt = "resume") {
      let currentPage = this.router.url;
      let show_Package = false;
      if (currentPage == "/staff/calulate" || currentPage == "/staff/process-sim" || currentPage == "/staff/finish") {
        show_Package = true;
        this.Package = this.packageSelect.globalPackageSelectCustomer.filter(pkg => pkg.count > 0);
      } else {
        this.Package = this.packageSelect.globalPackageSelectCustomer;
      }
      const str = {
        command: 'open',
        data: this.Package,
        msg: this.packageSelect.globalCallCenterMsg,
        amount: this.packageSelect.globalAmount,
        showPackage: show_Package
      };
      //  const myObjStr = JSON.stringify(str);    
      //  let data = '{"command":"open","packages":}';
      this.globalmasterService.ws_master.send(str).subscribe(
        (msg) => {
          console.log("next", msg.data);
        },
        (msg) => {
          console.log("error", msg);
        },
        () => {
          console.log("complete");
        }
      );
    }

  }


}
