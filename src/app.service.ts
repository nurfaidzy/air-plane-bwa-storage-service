import { Injectable } from '@nestjs/common';
import rawData from './data/data.json';
import { join } from 'path';

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
  getImages = (imageUrl: string): string => {
    const resolvedPath = join(
      __dirname,
      '..',
      'images',
      imageUrl.split('/').pop(),
    );
    return resolvedPath;
  };

  getListData(): detailData[] {
    rawData.forEach((item) => {
      item.image = this.getImages(item.image);
    });
    return rawData;
  }
}
