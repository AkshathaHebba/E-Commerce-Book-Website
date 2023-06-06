import {useContext, useEffect, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import Modal from 'react-bootstrap/Modal';
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckOut/CheckoutForm";
import OrderContext from '../../context/OrderContext'
const stripePromise = loadStripe("publish_key");
function Payments(){
    const [open,setOpen] = useState(false)
    const [clientSecret, setClientSecret] = useState("");
    const {ordersList} = useContext(OrderContext)
    const  [total,setTotal] = useState(0);
    const [orderSummary,setOrderSummary] = useState([])

     function calculateTotal(){
         const totalAmount = ordersList.reduce((acc,curr) => {
             return acc + (curr['Amount'] * curr['quantity']);
         },0)
         return totalAmount
     }
    const handleClose = () => setOpen(false);
    const handleShow = () => {
        setOpen(true)
        const totalCalculated = calculateTotal()
        setTotal(totalCalculated)
        setOrderSummary(ordersList.map((order) => [order.name,order.quantity]))
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: [{
                    total: totalCalculated,
                    currency: "usd"
                }]
            }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }
    const appearance = {
        theme: 'night',
    };
    const options = {
        clientSecret,
        appearance,
    };
    function actionBuy(e){
        handleShow()
    }
    return(
        <div>
            <div className="row">
                <button type="button" className="btn btn-primary" onClick={actionBuy}>Buy Now</button>
            </div>
            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Payment</Modal.Title>
                </Modal.Header>
                <div className="App">
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                    <Modal.Footer>
                        <div>
                            {orderSummary.map((order) =>{
                                return <p>{order[0]} x{order[1]}</p>
                            })}
                            <h6>Total: {total}</h6>
                       </div>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    )
}
export default Payments