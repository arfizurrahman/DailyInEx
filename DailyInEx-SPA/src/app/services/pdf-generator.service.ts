import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  private readonly pdfFonts: any;
  pdfMake: any;

  constructor() {
      this.pdfMake = require('pdfmake/build/pdfmake.js');
      this.pdfFonts = require('pdfmake/build/vfs_fonts.js');
      this.pdfMake.vfs = this.pdfFonts.pdfMake.vfs;
  }
}
