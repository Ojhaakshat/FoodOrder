import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'
const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const [btnIsAnimated, setBtnIsAnimated] = useState(false);
    
    const {items} = cartCtx;
    
    const numberOfItems = items.reduce((sum, item)=> {
        return sum + item.amount;
    }, 0)
    
    const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump: ''}`
    
    useEffect(()=>{
        if(items.length === 0) {
            return;
        }
        setBtnIsAnimated(true);

        const timer = setTimeout(() => {
            setBtnIsAnimated(false);
        }, 300)
        return ()=> {
            clearTimeout(timer);
        }
    }, [items])
    
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>
                Cart
            </span>
            <span className={classes.badge}> {numberOfItems} </span>
        </button>
    )
}

export default HeaderCartButton; 