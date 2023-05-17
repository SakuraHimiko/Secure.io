import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseSender {
  sendFulilled(
    token,
    message,
  ): { token: string; login_true: boolean; login_message: string } {
    return {
      login_true: true,
      token: 'Bearer ' + token,
      login_message: message,
    };
  }

  sendReject(message): { failed_true: boolean; login_message: string } {
    return {
      failed_true: true,
      login_message: message,
    };
  }
}
