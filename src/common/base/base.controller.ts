export abstract class BaseController {
    protected response(data: any, message: string | null = null) {
        return {
            message,
            data,
        };
    }
}
