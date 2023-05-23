import "./App.css";
import BookList from "./components/Book/BookList";
import {OrderProvider} from "./context/OrderContext";
import Payments from '../src/components/payments/index'

export default function App() {
    return (
        <OrderProvider>
        <div className="container">
            <BookList/>
            <Payments/>
        </div>
        </OrderProvider>
    );
}