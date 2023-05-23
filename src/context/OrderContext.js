import {createContext, useContext, useState} from "react";

const OrderContext = createContext()
export const OrderProvider = (({children}) =>{
    const [ordersList, setOrdersList] = useState([]);
    const manageQuantity = (newBookOrder) =>{
        console.log(newBookOrder)
        const order = ordersList.find((order) => order.id === newBookOrder.id);
       if(order != null) {
           //has order in it - update the order
           setOrdersList(ordersList.map((eachOrder) => eachOrder.id === order.id ? {...eachOrder, ...newBookOrder} : eachOrder))
       }else{
           setOrdersList([...ordersList,newBookOrder])
       }
    }
    return(
        <OrderContext.Provider value={{
            ordersList,
            manageQuantity
        }}>
            {children}
        </OrderContext.Provider>
    )
})
export default OrderContext