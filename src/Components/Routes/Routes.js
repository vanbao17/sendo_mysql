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
import AddAddressUser from '../Pages/AddAddressUser/AddAddressUser';
import CheckOut from '../Pages/CheckOut/CheckOut';
import ShopProds from '../Pages/ShopPage/ShopProds/ShopProds';
import ShopCollection from '../Pages/ShopPage/ShopCollection/ShopCollection';
import InforS from '../Pages/ShopPage/InforS/InforS';
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
        path: routes.themdiachi,
        component: AddAddressUser,
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
    {
        path: routes.thanhtoan,
        component: CheckOut,
        layout: HeaderNoneCate,
    },
    {
        path: routes.shopSanpham,
        component: ShopProds,
        layout: HeaderNoneCate,
    },
    {
        path: routes.shopBoSuuTap,
        component: ShopCollection,
        layout: HeaderNoneCate,
    },
    {
        path: routes.shopGiaTot,
        component: ShopCollection,
        layout: HeaderNoneCate,
    },
    {
        path: routes.shopThongTin,
        component: InforS,
        layout: HeaderNoneCate,
    },
];
export default publicRoutes;
