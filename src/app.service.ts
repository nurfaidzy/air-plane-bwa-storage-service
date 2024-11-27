import { Injectable } from '@nestjs/common';
import rawData from './data/data.json';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';

interface detailData {
  id: number;
  name: string;
  city: string;
  image: string;
  rating: number;
  price: number;
}

@Injectable()
export class AppService {
  private convertImageToBase64(imagePath: string): string {
    const basePath = __dirname.includes('/dist/')
      ? join(__dirname, '../src/images')
      : join(__dirname, '../src/images');

    const resolvedPath = resolve(basePath, imagePath);
    try {
      const file = readFileSync(resolvedPath);
      const base64 = file.toString('base64');
      const mimeType = this.getMimeType(resolvedPath);
      return `data:${mimeType};base64,${base64}`;
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  private getMimeType(filePath: string): string {
    const extension = filePath.split('.').pop().toLowerCase();
    const mimeTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      bmp: 'image/bmp',
    };
    return mimeTypes[extension] || 'application/octet-stream';
  }

  getListData(): detailData[] {
    rawData.forEach((item) => {
      item.image = this.convertImageToBase64(item.image);
    });
    return rawData;
  }
}
