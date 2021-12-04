import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly tips = [
    '화장실 악취가 심하다면 환풍기 커버를 교체하는게 효과적일 수 있습니다.',
    '돌돌이가 바닥의 수 많은 먼지와 머리카락으로부터 여러분을 지켜줄 수 있습니다.',
    '종량제 봉투는 한 번 살때 많이 사두는게 좋습니다.',
    '배달보다 직접 요리하면 많은 식비를 저축할 수 있습니다.',
    '음식물 쓰레기를 냉동실에 보관하면 냉장고가 세균에 점령당할 수도 있습니다.',
    '화장실 배수구는 자주 깨끗이 청소해야 합니다.',
  ];

  getRandomTip(): string {
    return this.tips[Math.floor(Math.random() * this.tips.length)];
  }
}
