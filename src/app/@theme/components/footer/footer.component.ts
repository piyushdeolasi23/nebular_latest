import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <!-- old code -->
    <!--<span class="created-by">Created by <b><a href="https://atos.net" style="color: #3267a1 !important;" target="_blank">Atos</a></b> 2019</span>
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>-->
    <!-- syntbot logo added--->
    <span class="created-by"><img class="synt_lg img-responsive img_center" src="../assets/images/logo/SyntBots-blue.png" alt="Syntbots Logo"></span>
    <div class="">
      <img class="synt_ats_lg img-responsive img_center" src="../assets/images/logo/logoAtos_SyntBots_login.png" alt="Syntbots Logo">
    </div>
  `,
})
export class FooterComponent {
}
