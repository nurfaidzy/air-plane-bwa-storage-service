export class ResponseUtil {
  static success(data: any, message = 'Request successful'): object {
    return {
      status: 'success',
      message,
      data,
    };
  }

  static error(message = 'server error', errorCode = 500): object {
    return {
      status: 'error',
      message,
      errorCode,
    };
  }
}
