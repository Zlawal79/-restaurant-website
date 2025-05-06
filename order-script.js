// Initialize an empty cart
let cart = [];

// Handle "Add to Cart" button click
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.dataset.item;
        const price = parseFloat(this.dataset.price);
        let selectedSauce = "No sauce";  // Default value if no sauce is selected
        let selectedFlavor = "No flavor"; // Default flavor value if none is selected
        let selectedIceCreamFlavor = "No flavor"; // Default for Ice Cream Cup

        // Check for sauce selection only if the item is "Wings" or "Boneless Bites"
        if (item === 'Wings' || item === 'Boneless Bites') {
            const itemContainer = this.closest('.item');
            const sauceSelection = itemContainer.querySelector('input[name="sauce"]:checked');
            if (sauceSelection) {
                selectedSauce = sauceSelection.value;
            }
        }

        // Check for flavor selection only if the item is "Milkshake" or "Lemonade"
        if (item === 'Milkshake' || item === 'Lemonade') {
            const itemContainer = this.closest('.item');
            const flavorSelection = itemContainer.querySelector('input[name="flavor"]:checked');
            if (flavorSelection) {
                selectedFlavor = flavorSelection.value;
            } else {
                alert("Please select a flavor for " + item + "."); // Alert if no flavor is selected
                return; // Exit the function if no flavor is selected
            }
        }

        // Check for ice cream flavor selection if the item is "Ice Cream Cup"
        if (item === 'Ice Cream Cup') {
            const itemContainer = this.closest('.item');
            const iceCreamFlavorSelection = itemContainer.querySelector('input[name="ice-cream-flavor"]:checked');
            if (iceCreamFlavorSelection) {
                selectedIceCreamFlavor = iceCreamFlavorSelection.value;
            } else {
                alert("Please select a flavor for Ice Cream Cup."); // Alert if no ice cream flavor selected
                return; // Exit the function if no ice cream flavor is selected
            }
        }

        // Check if the item with the same sauce, flavor, and ice cream selection already exists in the cart
        const existingItem = cart.find(cartItem =>
            cartItem.item === item && cartItem.sauce === selectedSauce && cartItem.flavor === selectedFlavor && 
            cartItem.iceCreamFlavor === selectedIceCreamFlavor
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ item, price, quantity: 1, sauce: selectedSauce, flavor: selectedFlavor, iceCreamFlavor: selectedIceCreamFlavor });
        }

        updateCart();
    });
});

// Update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalAmount = document.getElementById('subtotal-amount');
    const taxAmount = document.getElementById('tax-amount');
    const grandTotal = document.getElementById('grand-total');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(cartItem => {
        total += cartItem.price * cartItem.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            ${cartItem.item} - $${cartItem.price.toFixed(2)} x ${cartItem.quantity}
            ${cartItem.sauce !== "No sauce" ? `<p>Sauce: ${cartItem.sauce}</p>` : ''}
            ${cartItem.flavor !== "No flavor" ? `<p>Flavor: ${cartItem.flavor}</p>` : ''}
            ${cartItem.iceCreamFlavor !== "No flavor" ? `<p>Ice Cream Flavor: ${cartItem.iceCreamFlavor}</p>` : ''}
            <button class="remove-item-btn" data-item="${cartItem.item}" data-sauce="${cartItem.sauce}" data-flavor="${cartItem.flavor}" data-ice-cream-flavor="${cartItem.iceCreamFlavor}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    subtotalAmount.innerText = total.toFixed(2);

    const tax = total * 0.13;
    taxAmount.innerText = tax.toFixed(2);

    const grandTotalAmount = total + tax;
    grandTotal.innerText = grandTotalAmount.toFixed(2);

    // Add event listeners for removing items
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemToRemove = this.dataset.item;
            const sauceToRemove = this.dataset.sauce;
            const flavorToRemove = this.dataset.flavor;
            const iceCreamFlavorToRemove = this.dataset.iceCreamFlavor;

            // Remove the item from the cart by filtering out the selected item
            cart = cart.filter(cartItem =>
                !(cartItem.item === itemToRemove && cartItem.sauce === sauceToRemove && cartItem.flavor === flavorToRemove && 
                cartItem.iceCreamFlavor === iceCreamFlavorToRemove)
            );

            updateCart();
        });
    });
}

// Handle checkout button click
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to the cart before proceeding.');
    } else {
        // Show the user info form inside the cart section
        const userInfoForm = document.getElementById('user-info');
        userInfoForm.style.display = 'block';
    }
});
