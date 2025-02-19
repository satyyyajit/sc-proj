import React from 'react';

const Layout = ({children}) => {
    return (
        <>

            <nav className='bg-blue-100 text-blue-600 p-4'>
                <div className='container h-10 mx-auto flex justify-center items-center'>
                    <h1 className='text-2xl font-bold '>Predictor</h1>
                </div>
            </nav>
            <main className='antialiased bg-gray-100 text-black'> 
                {children}
            </main>
        </>
    );
};

export default Layout;