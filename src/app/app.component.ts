import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarComponent, NbSidebarService, NbSidebarState, NbThemeService } from '@nebular/theme';
import { UserService } from './user/user.service';
import { SettingsService } from './utils/settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  // @ViewChild('user') userbtn: any;
  // @ViewChild('login') login: any;
  drawer!: NbSidebarComponent;
  drawerState: NbSidebarState = 'collapsed';
  // loggedUser?: any;

  menuTop: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'map-outline',
      // icon: 'layout-outline',
      link: '/'
    },
    {
      title: 'Trucks',
      icon: 'car-outline',
      link: 'trucks'
    },
    {
      title: 'Packages',
      icon: 'cube-outline',
      link: 'packages'
    },
    {
      title: 'Deliveries',
      icon: 'arrow-circle-right-outline',
      link: 'deliveries'
    },
    {
      title: 'Offices',
      icon: 'home-outline',
      link: 'offices'
    },
    {
      title: 'Clients',
      icon: 'people-outline',
      link: 'clients'
    }
  ]
  menuBottom: NbMenuItem[] = [
    {
      title: 'Settings',
      icon: 'settings-2-outline',
      // link: "settings"
    }
  ]

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private settingsService: SettingsService,
    private themeService: NbThemeService,
    public userService: UserService
    ) {
  }

  ngAfterViewInit(): void {
    // if(document.querySelector('nb-user')){
    //   document.querySelector('nb-user').click();
    // }
    
    // console.log(this.userbtn.nativeElement);
    // let loginbtn: HTMLButtonElement = document.querySelector('button[hero]')
    // loginbtn?.click()
    // console.log(this.login.nativeElement);
  }

  async ngOnInit() {
    this.settingsService.onSettingsChanged((settings) => {
      this.themeService.changeTheme(settings.theme);
    });

    this.menuService.onItemClick().subscribe(menuBag => {
      const selectedItem = menuBag.item.title;
      if (selectedItem === 'Settings') {
        this.settingsService.openSettingsModal();
      }
    });

    
  }

  toggleSidebar() {
    this.sidebarService.toggle(true, 'menu')
  }
}
