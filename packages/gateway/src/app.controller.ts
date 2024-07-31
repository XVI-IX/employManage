import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('EMPLOYEE_SERVICE') private readonly employeeClient: ClientProxy,
    @Inject('PROJECTS_SERVICE') private readonly projectsClient: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() dto: any): string {
    return this.appService.getHello();
  }
}
