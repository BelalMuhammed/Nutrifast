import "./App.css";
import AppRoutes from "./routes/AppRoutes/AppRoutes";
import CartWishlistInitializer from "./Components/shared/CartWishlistInitializer";

function App() {
  return (
    <>
      <CartWishlistInitializer />
      <AppRoutes />
    </>
  );
}

export default App;
