import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from './page';
import { useUserHook } from '@/user/useUserHook';
import api from '@/api.service';
import axios from 'axios';
import { toast } from 'react-toastify';

vi.mock('@/user/useUserHook', () => ({
    useUserHook: vi.fn(),
}));

vi.mock('@/api.service', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
    },
}));

vi.mock('axios', () => ({
    default: {
        get: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    },
}));

vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe('Dashboard Page', () => {
    const mockUser = { id: 1, name: 'Test User', profileId: 1 };
    const mockLogout = vi.fn();
    const mockRefreshUserData = vi.fn();

    const mockClasses = [
        {
            id: 1,
            subject: { name: 'Math' },
            school: { name: 'School A' },
            statededAt: '2023-01-01T10:00:00Z',
            finishedAt: '2023-01-01T11:00:00Z',
            registredById: null,
        },
        {
            id: 2,
            subject: { name: 'Science' },
            school: { name: 'School B' },
            statededAt: '2023-01-01T12:00:00Z',
            finishedAt: '2023-01-01T13:00:00Z',
            registredById: 1,
            registredBy: { name: 'Test User' },
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        (useUserHook as any).mockReturnValue({
            user: mockUser,
            logout: mockLogout,
            refreshUserData: mockRefreshUserData,
        });
        (axios.get as any).mockResolvedValue({ data: mockClasses });
        (api.get as any).mockImplementation((url: string) => {
            if (url === '/schools/1') return Promise.resolve({ data: { id: 1, name: 'School A' } });
            if (url === '/subjects') return Promise.resolve({ data: [{ id: 1, name: 'Math' }] });
            return Promise.resolve({ data: [] });
        });
    });

    it('renders and loads data', async () => {
        render(<Home />);
        
        expect(screen.getByText(/Olá, Test User/)).toBeInTheDocument();
        
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('/api/classes', expect.any(Object));
            expect(api.get).toHaveBeenCalledWith('/schools/1');
            expect(api.get).toHaveBeenCalledWith('/subjects');
        });
    });

    it('filters classes based on tabs', async () => {
        render(<Home />);
        
        await waitFor(() => expect(screen.getByText('Math')).toBeInTheDocument());
        expect(screen.queryByText('Science')).not.toBeInTheDocument(); // registredById != null is hidden in "Aulas Disponiveis"

        const myClassesButton = screen.getByText('Aulas aceitas');
        fireEvent.click(myClassesButton);

        await waitFor(() => {
            expect(screen.getByText('Science')).toBeInTheDocument();
            expect(screen.queryByText('Math')).not.toBeInTheDocument();
        });
    });

    it('handles search', async () => {
        render(<Home />);
        
        const searchInput = screen.getByPlaceholderText('Pesquisar');
        fireEvent.change(searchInput, { target: { value: 'Math' } });
        
        const searchButton = screen.getByText('Buscar');
        fireEvent.click(searchButton);

        await waitFor(() => {
            expect(screen.getByText('Math')).toBeInTheDocument();
        });
    });

    it('submits a new class', async () => {
        (api.post as any).mockResolvedValue({});
        render(<Home />);
        
        await waitFor(() => expect(screen.getByText('Math')).toBeInTheDocument());

        fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
        fireEvent.change(screen.getByPlaceholderText('Inicio'), { target: { value: '2023-01-01T10:00' } });
        fireEvent.change(screen.getByPlaceholderText('Termino'), { target: { value: '2023-01-01T11:00' } });

        fireEvent.click(screen.getByText('Cadastrar'));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/classes', expect.any(Object));
            expect(toast.success).toHaveBeenCalledWith('Aula cadastrada com sucesso');
        });
    });

    it('handles submit error', async () => {
        (api.post as any).mockRejectedValue(new Error('Fail'));
        render(<Home />);
        
        await waitFor(() => expect(screen.getByText('Math')).toBeInTheDocument());

        fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
        fireEvent.change(screen.getByPlaceholderText('Inicio'), { target: { value: '2023-01-01T10:00' } });
        fireEvent.change(screen.getByPlaceholderText('Termino'), { target: { value: '2023-01-01T11:00' } });

        fireEvent.click(screen.getByText('Cadastrar'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Erro ao cadastrar aula');
        });
    });

    it('deletes a class', async () => {
        (axios.delete as any).mockResolvedValue({});
        render(<Home />);
        
        await waitFor(() => expect(screen.getByText('Math')).toBeInTheDocument());
        
        const deleteButton = screen.getByText('deletar');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith('/api/classes/1');
            expect(toast.success).toHaveBeenCalledWith('Aula removida com sucesso');
        });
    });

    it('handles delete error', async () => {
        (axios.delete as any).mockRejectedValue(new Error('Fail'));
        render(<Home />);
        
        await waitFor(() => expect(screen.getByText('Math')).toBeInTheDocument());
        
        const deleteButton = screen.getByText('deletar');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Erro ao remover aula');
        });
    });

    it('approves a class', async () => {
        (axios.patch as any).mockResolvedValue({});
        render(<Home />);
        
        fireEvent.click(screen.getByText('Aulas aceitas'));
        
        await waitFor(() => expect(screen.getByText('Science')).toBeInTheDocument());
        
        const approveButton = screen.getByText('aprovar');
        fireEvent.click(approveButton);

        await waitFor(() => {
            expect(axios.patch).toHaveBeenCalledWith('/api/classes/2', expect.any(Object), expect.any(Object));
            expect(toast.success).toHaveBeenCalledWith('Aula aprovada com sucesso');
        });
    });

    it('handles approve error', async () => {
        (axios.patch as any).mockRejectedValue(new Error('Fail'));
        console.log = vi.fn();
        render(<Home />);
        
        fireEvent.click(screen.getByText('Aulas aceitas'));
        
        await waitFor(() => expect(screen.getByText('Science')).toBeInTheDocument());
        
        const approveButton = screen.getByText('aprovar');
        fireEvent.click(approveButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Erro ao aprovar aula');
            expect(console.log).toHaveBeenCalled();
        });
    });

    it('calls logout when button clicked', () => {
        render(<Home />);
        fireEvent.click(screen.getByText('Sair'));
        expect(mockLogout).toHaveBeenCalled();
    });

    it('refreshes user data if no user', () => {
        (useUserHook as any).mockReturnValue({
            user: null,
            logout: mockLogout,
            refreshUserData: mockRefreshUserData,
        });
        render(<Home />);
        expect(mockRefreshUserData).toHaveBeenCalled();
    });

    it('allows teacher to accept a class', async () => {
        (useUserHook as any).mockReturnValue({
            user: { ...mockUser, profileId: 3 },
            logout: mockLogout,
            refreshUserData: mockRefreshUserData,
        });
        (axios.patch as any).mockResolvedValue({});

        render(<Home />);
        
        await waitFor(() => expect(screen.getByText('Math')).toBeInTheDocument());
        
        const acceptButton = screen.getByText('aceitar');
        fireEvent.click(acceptButton);

        await waitFor(() => {
            expect(axios.patch).toHaveBeenCalledWith('/api/classes/1', expect.any(Object), expect.any(Object));
            expect(toast.success).toHaveBeenCalledWith('Aula aprovada com sucesso');
        });
    });
    
    it('handles accept error for teacher', async () => {
        (useUserHook as any).mockReturnValue({
            user: { ...mockUser, profileId: 3 },
            logout: mockLogout,
            refreshUserData: mockRefreshUserData,
        });
        (axios.patch as any).mockRejectedValue(new Error('Fail'));

        render(<Home />);
        
        await waitFor(() => expect(screen.getByText('Math')).toBeInTheDocument());
        
        const acceptButton = screen.getByText('aceitar');
        fireEvent.click(acceptButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Erro ao aprovar aula');
        });
    });
});
