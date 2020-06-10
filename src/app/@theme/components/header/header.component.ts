import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { Router } from '@angular/router';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import { LoginService } from '../../../@core/data/login/login.service';
// To show image modal
import { NbToastrService } from '@nebular/theme';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';
  @Output() pro_ch = new EventEmitter();

  user: any;
  rsk_obj:any;
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private loginService:LoginService,
              private toastrService: NbToastrService, 
              private modalService: NgbModal,
              public router : Router
              ) {
  }

  ngOnInit() {
        
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

 

  // logout user
  logout(){
    this.loginService.logOut();
    this.router.navigateByUrl('/login');

  }
  
}
