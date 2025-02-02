import { ApiProperty } from '@nestjs/swagger';

export class LoginLogInfo {
  @ApiProperty({ description: '日志编号' })
  id: number;

  @ApiProperty({ description: '登录ip' })
  ip: string;

  @ApiProperty({ description: '系统' })
  os: string;

  @ApiProperty({ description: '浏览器' })
  browser: string;

  @ApiProperty({ description: '时间' })
  time: string;

  @ApiProperty({ description: '登录用户名' })
  username: string;
}

export class OnlineUserInfo {
  @ApiProperty({ description: '最近的一条登录日志ID' })
  id: number;

  @ApiProperty({ description: '登录IP' })
  ip: string;

  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '是否当前' })
  isCurrent: boolean;

  @ApiProperty({ description: '登陆时间' })
  time: string;

  @ApiProperty({ description: '状态' })
  status: number;

  @ApiProperty({ description: '系统' })
  os: string;

  @ApiProperty({ description: '浏览器' })
  browser: string;

  @ApiProperty({ description: '是否禁用' })
  disable: boolean;
}

export class TaskLogInfo {
  @ApiProperty({ description: '日志编号' })
  id: number;

  @ApiProperty({ description: '任务编号' })
  taskId: number;

  @ApiProperty({ description: '任务名称' })
  name: string;

  @ApiProperty({ description: '创建时间' })
  createTime: string;

  @ApiProperty({ description: '耗时' })
  consumeTime: number;

  @ApiProperty({ description: '执行信息' })
  detail: string;

  @ApiProperty({ description: '任务执行状态' })
  status: number;
}
