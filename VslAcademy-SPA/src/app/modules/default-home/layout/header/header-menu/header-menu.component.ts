import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LayoutService } from '../../_services/layout.service';
import { BreadCrum } from 'src/app/common/bread-crum';
import { AuthService } from 'src/app/modules/auth/_services/authService';

function getCurrentURL(location) {
  return location.split(/[?#]/)[0];
}

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  ulCSSClasses: string;
  rootArrowEnabled: boolean;
  location: Location;
  headerMenuDesktopToggle: string;
  currentPage: BreadCrum[];

  constructor(private layout: LayoutService, private loc: Location, private auth: AuthService) {
    this.location = this.loc;
  }

  ngOnInit(): void {
    this.auth.userInPage.subscribe(page => this.currentPage  = page);
    this.ulCSSClasses = this.layout.getStringCSSClasses('header_menu_nav');
    this.rootArrowEnabled = this.layout.getProp('header.menu.self.rootArrow');
    this.headerMenuDesktopToggle = this.layout.getProp(
      'header.menu.desktop.toggle'
    );
  }

  getMenuItemActive(url) {
    return this.checkIsActive(url) ? 'menu-item-active' : '';
  }

  checkIsActive(url) {
    const location = this.location.path();
    const current = getCurrentURL(location);
    if (!current || !url) {
      return false;
    }

    if (current === url) {
      return true;
    }

    if (current.indexOf(url) > -1) {
      return true;
    }

    return false;
  }
}
