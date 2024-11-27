export class ResponseUtil {
  static success(data: any, message = 'Request successful'): object {
    return {
      status: 'success',
      message,
      data,
    };
  }

  static error(message = 'An error occurred', errorCode = 500): object {
    return {
      status: 'error',
      message,
      errorCode,
    };
  }
}
