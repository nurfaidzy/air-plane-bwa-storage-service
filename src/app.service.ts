import { Injectable } from '@nestjs/common';
import rawData from './data/data.json';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import sharp from 'sharp';
// import { ResponseUtil } from './utils/responses';

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
  async compressionBuffer(
    fileBuffer: Buffer,
    mimeType: string,
    quality: number = 75,
  ): Promise<Buffer> {
    try {
      const image = sharp(fileBuffer);

      if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
        return await image.jpeg({ quality }).toBuffer();
      } else if (mimeType === 'image/png') {
        return await image.png({ quality }).toBuffer();
      } else if (mimeType === 'image/webp') {
        return await image.webp({ quality }).toBuffer();
      } else {
        throw new Error(`Unsupported MIME type: ${mimeType}`);
      }
    } catch (error) {
      throw new Error(`Error compressing buffer: ${error.message}`);
    }
  }

  async convertImageToBase64(imagePath: string): Promise<string> {
    const basePath = __dirname.includes('/dist/')
      ? join(__dirname, '../src/images')
      : join(__dirname, '../src/images');

    const resolvedPath = resolve(basePath, imagePath);

    try {
      const fileBuffer = readFileSync(resolvedPath); // Read file as buffer
      const mimeType = this.getMimeType(imagePath);

      const compressedBuffer = await this.compressionBuffer(
        fileBuffer,
        mimeType,
        75,
      );

      return `data:${mimeType};base64,${compressedBuffer.toString('base64')}`;
    } catch (error) {
      throw new Error(`Error converting image to base64: ${error.message}`);
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

  async getListData(): Promise<detailData[]> {
    const dataCopy = JSON.parse(JSON.stringify(rawData));
    for (const item of dataCopy) {
      item.image = await this.convertImageToBase64(item.image);
    }
    return dataCopy;
  }

  async getDetailData(id: number): Promise<detailData> {
    const dataCopy = JSON.parse(JSON.stringify(rawData));
    const item = dataCopy.find((item) => item.id === id);
    if (item) {
      item.image = await this.convertImageToBase64(item.image);
    }
    return item;
  }
}
