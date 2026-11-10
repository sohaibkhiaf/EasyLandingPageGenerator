import { createContext, useContext, useState } from "react";

// create context
const StoreContext = createContext();

// provider component
export function StoreProvider({ children, pjtId }) {

    // current cart status ////////////
    const cart = loadCart(pjtId);
    const items = cart.items;
    const subtotal = cart.subtotal;
    const totalItems = cart.total_items;
    const shippingCost = cart.shipping_cost;
    const total = cart.total;
    const shippingType = cart.shipping_type;
    const clientFullName = cart.client_full_name;
    const clientPhone = cart.client_phone;
    const clientAddress = cart.client_address;
    const clientRegion = cart.client_region;

    // states ///////////////
    // cart side panel state
    const [cartSidePanel, setCartSidePanel] = useState(false);
    // product side panel state
    const [productSidePanel, setProductSidePanel] = useState(null);

    // cart items state
    const [cartItems, setCartItems] = useState(items);

    // cart subtotal state
    const [cartSubtotal, setCartSubtotal] = useState(subtotal);

    // cart total items state
    const [cartTotalItems, setCartTotalItems] = useState(totalItems);

    // cart shipping cost state
    const [cartShippingCost, setCartShippingCost] = useState(shippingCost);

    // cart total state
    const [cartTotal, setCartTotal] = useState(total);

    // cart shipping type state
    const [cartShippingType, setCartShippingType] = useState(shippingType);

    // cart client full name state
    const [cartClientFullName, setCartClientFullName] = useState(clientFullName);

    // cart client phone state
    const [cartClientPhone, setCartClientPhone] = useState(clientPhone);

    // cart client address state
    const [cartClientAddress, setCartClientAddress] = useState(clientAddress);

    // cart region state
    const [cartClientRegion, setCartClientRegion] = useState(clientRegion);

    // shared functions /////////////

    // cart side panel functions
    const openCartSidePanel = () => {
        setCartSidePanel(true);
        setProductSidePanel(null);
    }
    const closeCartSidePanel = () => setCartSidePanel(false);

    // product side panel functions
    const openProductSidePanel = (product) => {
        setProductSidePanel(product);
        setCartSidePanel(false);
    }
    const closeProductSidePanel = () => setProductSidePanel(null);

    // full name function
    const updateFullName= (name) => {
        const cart = loadCart(pjtId);
        cart.client_full_name = name;
        saveCart(pjtId, cart);
        setCartClientFullName(name);
    };
    // client phone function
    const updatePhone= (phone) => {
        const cart = loadCart(pjtId);
        cart.client_phone = phone;
        saveCart(pjtId, cart);
        setCartClientPhone(phone);
    };
    // client address function 
    const updateAddress= (address) => {
        const cart = loadCart(pjtId);
        cart.client_address = address;
        saveCart(pjtId, cart);
        setCartClientAddress(address);
    };
    // region function
    const updateRegion= (region) => {
        const cart = loadCart(pjtId);
        cart.client_region = region;
        saveCart(pjtId, cart);
        setCartClientRegion(region);
    };
    // shipping type function
    const updateShippingType= (type) => {
        const cart = loadCart(pjtId);
        cart.shipping_type = type;
        saveCart(pjtId, cart);
        setCartShippingType(type);
    };
    // shipping cost function
    const updateShippingCost = (cost) => {
        const cart = loadCart(pjtId);
        cart.shipping_cost = cost;
        saveCart(pjtId, cart);
        setCartShippingCost(cost);
        updateTotal();
    };
    // update total function
    const updateTotal= () => {
        const cart = loadCart(pjtId);
        cart.total =cart.subtotal + cart.shipping_cost;
        saveCart(pjtId, cart);
        setCartTotal(cart.total);
    };
    // subtotal function
    const updateSubtotal = () => {
        const cart = loadCart(pjtId);
        const subtotal = cart.items.reduce((sum, item) => 
            sum + item.quantity * item.unit_price , 0);
        cart.subtotal = subtotal;
        saveCart(pjtId, cart);
        setCartSubtotal(subtotal);
        updateTotal();
    };
    // total items function
    const updateTotalItems = () => {
        const cart = loadCart(pjtId);
        const totalItems = cart.items.reduce((sum, item) => 
                sum + item.quantity, 0);
        cart.total_items = totalItems;
        saveCart(pjtId, cart);
        setCartTotalItems(totalItems);
        updateTotal();
    };

    // cart items functions
    const updateCartItem = (pjtId, item) => {
        const cart = loadCart(pjtId);
        const items = cart.items;
        items.map(i => { 
            if (i.product_id == item.product_id) {
                i.product_name= item.product_name; 
                i.quantity= item.quantity;
                i.unit_price= item.unit_price;
                i.subtotal= item.subtotal;
                i.image_url= item.image_url;
                i.max_quantity= item.max_quantity;
            }
        });
        saveCart(pjtId, cart);
        setCartItems(items); 
        updateSubtotal();
        updateTotalItems();
    }
    const addCartItem = (pjtId, item) => {
        const cart = loadCart(pjtId);
        const items = cart.items;
        items.push(item);
        saveCart(pjtId, cart);
        setCartItems(items); 
        updateSubtotal();
        updateTotalItems();
    }
    const deleteCartItem = (pjtId, item) => {
        const cart = loadCart(pjtId);
        const items = cart.items;
        cart.items = items.filter(i => i.product_id != item.product_id);
        saveCart(pjtId, cart);
        setCartItems(cart.items); 
        updateSubtotal();
        updateTotalItems();
    }
    const emptyCart = (pjtId) => {
        const cart = loadCart(pjtId);
        cart.items = [];
        saveCart(pjtId, cart);
        setCartItems(cart.items);
        updateSubtotal();
        updateTotalItems();
    }

    return (
    <StoreContext.Provider
        value={{
        cartSidePanel,
        openCartSidePanel,
        closeCartSidePanel,

        productSidePanel,
        openProductSidePanel,
        closeProductSidePanel,

        cartItems,
        updateCartItem,
        addCartItem,
        deleteCartItem,

        cartSubtotal,
        cartTotalItems,

        cartShippingCost,
        updateShippingCost,

        cartTotal,
        updateTotal,

        cartShippingType,
        updateShippingType,

        cartClientFullName,
        updateFullName,

        cartClientPhone,
        updatePhone,

        cartClientAddress,
        updateAddress,

        cartClientRegion,
        updateRegion,

        emptyCart,
        }}>
        {children}
    </StoreContext.Provider>
    );
}

// custom hook (VERY IMPORTANT for clean usage)
export function useStoreContext() {
    return useContext(StoreContext);
}

// cart functions

function loadCart(pjtId) {
    const cart = localStorage.getItem("cart_"+pjtId);
    return cart ? JSON.parse(cart) : createEmptyCart(pjtId);
}

function createEmptyCart(pjtId) {
    const cart = {
        total: 0,
        subtotal: 0, 
        shipping_cost: 0, 
        client_full_name: "",
        client_phone: "",
        client_address: "" ,
        client_region: 0, 
        shipping_type: "home",
        items: [
            // {product_id:(integer), 
            // product_name: (string), 
            // unit_price: (integer), 
            // quantity: (integer), 
            // subtotal: (integer),
            // max_quantity: (integer),
            // image_url: (string), }
        ],
        total_items: 0,
    };
    localStorage.setItem("cart_"+pjtId, JSON.stringify(cart));
    return cart;
}

function saveCart(pjtId, cart) {
  localStorage.setItem("cart_"+pjtId, JSON.stringify(cart));
}

