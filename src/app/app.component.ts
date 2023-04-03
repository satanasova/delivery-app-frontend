import { HttpClient } from '@angular/common/http';
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
  // drawer!: NbSidebarComponent;
  // drawerState: NbSidebarState = 'expanded';

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
    public userService: UserService,
    private http: HttpClient
    ) {
  }

  ngAfterViewInit(): void {}

  async ngOnInit() {
    console.log('app component init');
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

  testRequest() {
    this.http.get('http://77.71.12.146:3000/api/request-info').subscribe((res: any) => {
      console.log(res);
      console.log(res['headers'])
    })
  }
}
