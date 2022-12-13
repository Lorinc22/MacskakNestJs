import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { MacskaDTO } from './macska.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async ListCats(){
    const [rows] = await db.execute(
      'SELECT suly, szem_szin FROM macskak ORDER BY suly DESC'
    );
    return {
      macskak: rows,
    };
  }

  @Get('cats/new')
  @Render('form')
  newMacskakForm() {
    return {};
  }

  @Post('cats/new')
  @Redirect()
  async newPainting(@Body() macskak: MacskaDTO) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [macskak.szem_szin, macskak.suly],
    );
    return {
      url: '/',
    };
  }
  @Get('cats/modifyForm/:id')
  @Render('edit')
  async modifyFormPainting(@Param('id') id: number) {
    const [rows] = await db.execute(
      'SELECT id, title, year, on_display FROM cats WHERE id = ?',
      [id],
    );
    return { macskak: rows[0] };
  }
  @Get('cats/:id')
  @Render('show')
  async showCats(@Param('id') id: number) {
    const [rows] = await db.execute(
      'SELECT title, year, on_display FROM cats WHERE id = ?',
      [id],
    );
    return { cat: rows[0] };
  }
}

  

