import { Component, OnInit } from '@angular/core';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from 'src/app/shared/navbar/navbar.service';
import { PageData } from 'src/models/PageData';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss'],
})
export class ViewBlogComponent implements OnInit {
  private pageData: PageData = {
    navBackground: '#ffffff',
    navLink: '#000000',
    specialNavLink: '#546c55',
    togglerColor: '#546c55',
    visible: true,
  };

  faArrowLeft = faArrowLeft;

  comments = [1, 2, 3];

  title = 'An Awesome Title';
  author = 'someone awesome'.toUpperCase();
  date = '32 December 2020';
  subtitle =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa possimus ipsum dolores eius in delectus nam, itaque neque minus qui, cum asperiores nihil, inventore quo maxime doloribus aliquam totam repellat?';

  body =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia eligendi dolores soluta. Officia in culpa sequi facilis natus modi eligendi doloribus vitae veritatis iure at quos consequuntur quia, harum sint beatae totam fugit nemo sed expedita aut! Accusantium, sapiente ipsa voluptatem officia nihil amet, aliquid magni placeat optio ipsum,impedit unde! Repellat porro, quibusdam iste nam fuga dolorem iusto minus ullam accusamus aperiam quia facere quidem! Sequi, nam? Fugiat, repellendus. Veritatis labore reprehenderit iure at iusto accusamus mollitia fugit earum impedit exercitationem debitis fuga omnis laborum obcaecati et, quisquam porro ullam blanditiis dolore eaque! Tempora saepe enim facilis hic consequuntur.';

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
  }
}
