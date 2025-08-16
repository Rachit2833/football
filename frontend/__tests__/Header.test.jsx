
import Header from '../app/_Component/Header.jsx'
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { act, fireEvent, render, screen,  } from '@testing-library/react'


describe('Page', () => {
    it('renders  navbar in web', () => {
        render(<Header />)
        const heading = screen.getByText('FootBallInfo',)

        expect(heading).toBeInTheDocument()
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(4);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    })
    it('renders  navbar in mobile',async () => {
         userEvent.setup();
        render(<Header />)
        const heading = screen.getByText('FootBallInfo',)
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
        expect(heading).toBeInTheDocument()
        await act(async () => {
            await userEvent.click(button);
        });
        expect(screen.getByText('XHome')).toBeInTheDocument();
        expect(screen.getByText('XAbout')).toBeInTheDocument();
        expect(screen.getByText('XServices')).toBeInTheDocument();
        expect(screen.getByText('XContact')).toBeInTheDocument();
    })



})