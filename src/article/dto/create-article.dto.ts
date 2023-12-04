// src/post/dto/create-post.dto.ts
export class CreateArticleDto {
  readonly puuid: string;
  readonly nickName: string;
  readonly lineTag: string;
  readonly tier: string;
  readonly gameType: string;
  readonly vocie: boolean;
  readonly personel: string;
  updatedAt: Date;
}
