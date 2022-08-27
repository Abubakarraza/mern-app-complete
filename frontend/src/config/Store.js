import { configureStore } from '@reduxjs/toolkit';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import UserSlices from '../slices/UserSlices';
import CrudSlices from '../slices/CrudSlices';
const Store = configureStore({
    reducer: {
        user: UserSlices,
        crud: CrudSlices,
        // middleware: getDefaultMiddleware =>
        //     getDefaultMiddleware({
        //         serializableCheck: false,
        //     }),
    }
});
export default Store;