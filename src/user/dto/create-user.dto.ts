// src/post/dto/create-post.dto.ts
export class CreateUserDto {
  readonly puuid: string;
  readonly nickName: string;
  readonly lineTag: string;
  readonly tier: string;
  readonly age: string;
  readonly gender: string;
  readonly myVoice: boolean;
  readonly playStyle: string;
  readonly duoType: string;
  readonly playTime: string;
  readonly visible: boolean;
  readonly description: string;
  updatedAt: Date;
}
