import routes from '../Config/Config';
import ViewProducts from '../Pages/ViewProducts/ViewProducts';
import HomePage from '../Layout/Components/HomePage/HomePage';
import Cart from '../Pages/Cart/Cart';
import HeaderNoneCate from '../Pages/HeaderNoneCate/HeaderNoneCate';
import Detail from '../Pages/Detail/Detail';
import FindProduct from '../Pages/FindProduct/FindProduct';
import ShopPage from '../Pages/ShopPage/ShopPage';
import ShopProd from '../Pages/ShopPage/ShopProds/ShopProds';
import HomeShopPage from '../Pages/ShopPage/HomeShopPage/HomeShopPage';
const publicRoutes = [
    {
        path: routes.home,
        component: HomePage,
    },
    {
        path: routes.dodung,
        component: ViewProducts,
    },
    {
        path: routes.chamsoc,
        component: ViewProducts,
    },
    {
        path: routes.maymoc,
        component: ViewProducts,
    },
    {
        path: routes.phukien,
        component: ViewProducts,
    },
    {
        path: routes.tuixach,
        component: ViewProducts,
    },
    {
        path: routes.cart,
        component: Cart,
        layout: HeaderNoneCate,
    },
    {
        path: routes.detail,
        component: Detail,
        layout: HeaderNoneCate,
    },
    {
        path: routes.timkiem,
        component: FindProduct,
        layout: HeaderNoneCate,
    },
    {
        path: routes.shopPage,
        component: HomeShopPage,
        layout: HeaderNoneCate,
    },
    {
        path: routes.shopPageProduct,
        component: ShopProd,
        layout: HeaderNoneCate,
    },
    {
        path: routes.findProd,
        component: FindProduct,
        layout: HeaderNoneCate,
    },
];
export default publicRoutes;
