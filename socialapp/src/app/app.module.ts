import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SideenavModule } from './sideenav/sideenav.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedModule } from './feed/feed.module';
import { ChatboxModule } from './chatbox/chatbox.module';
import{SidebarModule} from './sidebar/sidebar.module';
import { NavbarModule } from './navbar/navbar.module';
import { FriendsModule } from './friends/friends.module';
import { GroupsModule } from './groups/groups.module';
import { ChatwindowModule } from './chatwindow/chatwindow.module';
import { ProfileModule } from './profile/profile.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SideenavModule,
    FeedModule,
    ChatboxModule,
    SidebarModule,FriendsModule,NavbarModule,GroupsModule,ChatwindowModule,ProfileModule,RegisterModule,LoginModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
