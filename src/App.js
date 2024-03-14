import DefaultLayout from './Components/Layout/Components/DefaultLayout/DefaultLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import publicRoutes from './Components/Routes/Routes';
import BtnGototop from './Components/Layout/Components/BtnGototop/BtnGototop';
import BtnChat from './Components/Layout/Components/BtnChat/BtnChat';
import { Fragment } from 'react';
import ShopProds from './Components/Pages/ShopPage/ShopProds/ShopProds';
import HomeShopPage from './Components/Pages/ShopPage/HomeShopPage/HomeShopPage';
import ShopCollection from './Components/Pages/ShopPage/ShopCollection/ShopCollection';
import ShopBestPrice from './Components/Pages/ShopPage/ShopBestPrice/ShopBestPrice';
import InforS from './Components/Pages/ShopPage/InforS/InforS';
function App() {
    return (
        <Router>
            <div className="App" style={{ position: 'relative' }}>
                <Routes>
                    {publicRoutes.map((item, index) => {
                        let Layout = DefaultLayout;
                        if (item.layout) {
                            Layout = item.layout;
                        } else {
                            if (item.layout === null) {
                                Layout = Fragment;
                            }
                        }
                        const Page = item.component;
                        return (
                            <Route key={index}>
                                <Route
                                    key={index}
                                    path={item.path}
                                    element={
                                        <Layout>
                                            <Page data={item.path}></Page>
                                        </Layout>
                                    }
                                ></Route>
                                <Route path={'/shop/:paramValue'} element={<HomeShopPage />}></Route>
                                <Route path={'/shop/:paramValue/san-pham'} element={<ShopProds />}></Route>
                                <Route path={'/shop/:paramValue/bo-suu-tap'} element={<ShopCollection />}></Route>
                                <Route path={'/shop/:paramValue/gia-tot-hom-nay'} element={<ShopBestPrice />}></Route>
                                <Route path={'/shop/:paramValue/thong-tin-shop'} element={<InforS />}></Route>
                            </Route>
                        );
                    })}
                </Routes>
                <BtnGototop />
                <BtnChat />
            </div>
        </Router>
    );
}

export default App;
