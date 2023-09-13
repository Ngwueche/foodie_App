import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { ReduxPoductList } from "./redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product);
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:7111/newproduct`);
      const resData = await res.json();
      dispatch(ReduxPoductList(resData));
    })();
  }, []);
  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className='pt-16 bg-slate-200 min-h-[calc(100vh)]'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
