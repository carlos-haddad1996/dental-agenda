import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Wrapper } from './common/wrapper';
import NavBar from './navbar';

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <NavBar />
            <Wrapper style={{ marginBottom: '80px' }}>
                <main>{children}</main>
            </Wrapper>
        </>
    );
};

export default Layout;
