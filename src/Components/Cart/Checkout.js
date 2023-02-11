import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const Checkout = (props) => {
    const cartCtx = useContext(CartContext);    
    const { value: enteredName, hasError: nameInputHasError, isValid: nameIsValid, valueHandler: nameChangeHandler, touchHandler: nameTouchHandler, reset: nameReset} = useInput(value => value.trim() !== '');
    const { value: enteredStreet, hasError: streetInputHasError, isValid: streetIsValid, valueHandler: streetChangeHandler, touchHandler: streetTouchHandler, reset: streetReset} = useInput(value => value.trim() !== '');
    const { value: enteredPostalCode, hasError: postalCodeInputHasError, isValid: postalCodeIsValid, valueHandler: postalCodeChangeHandler, touchHandler: postalCodeTouchHandler, reset: postalCodeReset} = useInput(value => value.trim().length === 6 && !isNaN(value.trim()));
    const { value: enteredCity, hasError: cityInputHasError, isValid: cityIsValid, valueHandler: cityChangeHandler, touchHandler: cityTouchHandler, reset: cityReset} = useInput(value => value.trim() !== '');
    let formIsValid = false;
    if(nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid && cartCtx.items.length > 0) {
        formIsValid = true;
    }
    const confirmHandler = (event) => {
        event.preventDefault(); 
        // console.log(formIsValid, nameIsValid, cityIsValid, postalCodeIsValid, streetIsValid)
        if(!formIsValid) {
            return;
        }
        props.onSubmit({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity,
        })
        nameReset();
        cityReset();
        postalCodeReset();
        streetReset();
    };

    const nameInputClasses = nameInputHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const streetInputClasses = streetInputHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const postalCodeInputClasses = postalCodeInputHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const cityInputClasses = cityInputHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' onChange={nameChangeHandler} onBlur={nameTouchHandler} value={enteredName}/>
                {nameInputHasError && <p className={`${classes.errorText}`}>Name must not be empty !</p>}
            </div>  
            <div className={streetInputClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' onChange={streetChangeHandler} onBlur={streetTouchHandler} value={enteredStreet}/>
                {streetInputHasError && <p className={`${classes.errorText}`}>Street must not be empty !</p>}
            </div>
            <div className={postalCodeInputClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal'  onChange={postalCodeChangeHandler} onBlur={postalCodeTouchHandler} value={enteredPostalCode}/>
                {postalCodeInputHasError && <p className={`${classes.errorText}`}>Should be 6 numeric digits !</p>}
            </div>
            <div className={cityInputClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' onChange={cityChangeHandler} onBlur={cityTouchHandler} value={enteredCity}/>
                {cityInputHasError && <p className={`${classes.errorText}`}>City must not be empty !</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onClose}>
                    Cancel
                </button>
                <button className={classes.submit} >Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;