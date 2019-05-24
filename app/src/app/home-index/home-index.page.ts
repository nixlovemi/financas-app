import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.page.html',
  styleUrls: ['./home-index.page.scss'],
})
export class HomeIndexPage implements OnInit {

  pages = [
    {
      title: 'Início',
      url: '/homeIndex/page-inicio',
      icon: 'ios-home',
    },
    {
      title: 'Lançamentos',
      url: '/homeIndex/page-lancamentos',
      icon: 'md-cash',
    }
  ];

  selectedPath = '';

  constructor(
    private menu: MenuController,
    private router: Router,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

}
