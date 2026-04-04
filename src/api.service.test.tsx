import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from './api.service';
import { toast } from 'react-toastify';

vi.mock('react-toastify', () => ({
    toast: {
        error: vi.fn(),
    },
}));

describe('api service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should pass through success response', async () => {
        const response = { data: 'test' };
        // @ts-ignore
        const result = api.interceptors.response.handlers[0].fulfilled(response);
        expect(result).toBe(response);
    });

    it('should handle error and show toast', async () => {
        const error = {
            response: {
                data: {
                    message: ['Error 1', 'Error 2'],
                },
            },
        };
        
        console.log = vi.fn();

        try {
            // @ts-ignore
            await api.interceptors.response.handlers[0].rejected(error);
        } catch (e) {
            expect(e).toBe(error);
        }

        expect(toast.error).toHaveBeenCalledWith('Error 1\nError 2');
        expect(console.log).toHaveBeenCalledWith({ error });
    });
});
