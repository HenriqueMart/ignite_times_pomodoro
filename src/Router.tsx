import {Routes, Route} from 'react-router-dom';

import {Home} from './pages/Home/Index';
import {History} from './pages/History/Index'
import { DefaultLayout } from './layouts/DefaultLayout/index';

export function Router(){
    return(
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route path="/" element={<Home/>} />
                    <Route path="/history" element={<History/>}/>
                </Route> 
            </Routes>
    )
}