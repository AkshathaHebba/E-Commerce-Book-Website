import Image from "../Image";
import {useState,useContext} from "react";
import cs from 'classnames'
import Styles from './books.module.css'
import OrderContext from '../../context/OrderContext'
function Book({book}){
    const {manageQuantity} = useContext(OrderContext)
    const [quantity, setQuantity] = useState(0);
    const [orders,setOrdersInfo] = useState(null);


    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        manageQuantity({...book, quantity : newQuantity});
        setQuantity(newQuantity)
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            book['quantity'] = newQuantity;
            manageQuantity(book);
            setQuantity(newQuantity)
        }
    };
    return(
        <div className="mx-auto my-4">
            <div className="row text-center">
                <div className="col">
                    <Image imageName={book.Image}/>
                </div>
                <div className={cs('col', Styles['book-details'])}>
                    <h3>{book.name}</h3>
                </div>
                <div className="col">
                    <div className="row">
                        <h5>${book.Amount}</h5>
                    </div>
                    <div>
                        <button type="button" className={cs(Styles['quantity'], 'btn btn-secondary btn-sm')} onClick={decreaseQuantity}>-</button>
                        <span className>{quantity}</span>
                        <button type="button" className={cs(Styles['quantity'], 'btn btn-secondary btn-sm')} onClick={increaseQuantity}>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book