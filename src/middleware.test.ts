import { describe, it, expect, vi } from 'vitest';
import { middleware } from './middleware';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';

vi.mock('next/server', () => ({
    NextResponse: {
        next: vi.fn(),
        redirect: vi.fn(),
    },
}));

vi.mock('cookie', () => ({
    parse: vi.fn(),
}));

describe('Middleware', () => {
    const createRequest = (pathname: string, cookieHeader = '') => {
        return {
            nextUrl: { pathname },
            headers: {
                get: vi.fn().mockReturnValue(cookieHeader),
            },
            url: `http://localhost${pathname}`,
        } as unknown as NextRequest;
    };

    it('allows public paths', () => {
        const req = createRequest('/');
        middleware(req);
        expect(NextResponse.next).toHaveBeenCalled();
    });

    it('allows /cadastro', () => {
        const req = createRequest('/cadastro');
        middleware(req);
        expect(NextResponse.next).toHaveBeenCalled();
    });

    it('redirects to / if token is missing on private path', () => {
        const req = createRequest('/dashboard');
        (parse as any).mockReturnValue({});
        
        middleware(req);
        
        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/', 'http://localhost/dashboard'));
    });

    it('allows access if token is present', () => {
        const req = createRequest('/dashboard', 'token=valid');
        (parse as any).mockReturnValue({ token: 'valid' });
        
        middleware(req);
        
        expect(NextResponse.next).toHaveBeenCalled();
    });

    it('handles empty cookie header', () => {
        const req = {
            nextUrl: { pathname: '/dashboard' },
            headers: {
                get: vi.fn().mockReturnValue(null),
            },
            url: 'http://localhost/dashboard',
        } as unknown as NextRequest;
        
        (parse as any).mockReturnValue({});
        
        middleware(req);
        
        expect(NextResponse.redirect).toHaveBeenCalled();
    });
});
