import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import { useState, useContext } from 'react';
import Checkout from './Checkout';

const Cart = props => {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    }
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const orderHandler = (event)=> {
        setIsCheckingOut(true);
    }
    const cartItems = (<ul className={classes['cart-items']}>
        {cartCtx.items.map(item => (
            <CartItem 
                key={item.id} 
                name={item.name} 
                price={item.price} 
                amount={item.amount} 
                onAdd={cartItemAddHandler.bind(null, item)} 
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />
        ))}
    </ul>);
    
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckingOut && <Checkout onClose={props.onClose}/>}
            {!isCheckingOut && <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>}

        </Modal>
    )
}

export default Cart;
