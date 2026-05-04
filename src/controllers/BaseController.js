class BaseController {
  static success(res, data = null, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      data,
      message
    });
  }

  static error(res, message = 'Error', statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }

  static notFound(res, message = 'Not found') {
    return this.error(res, message, 404);
  }

  static badRequest(res, message = 'Bad request') {
    return this.error(res, message, 400);
  }

  static async handleRequest(req, res, handler) {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('Controller error:', error);
      this.error(res, error.message);
    }
  }
}

export default BaseController;