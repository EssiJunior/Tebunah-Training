import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|favicon-16x16.png|favicon-32x32.png|.*\\..*).*)'
    ]
};