const productSelect = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const productTotalLabel = document.getElementById("productTotal");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const invoiceList = document.getElementById("invoiceList");
const totalPriceLabel = document.getElementById("totalPrice");
const productImage = document.getElementById("productImage");
const selectedProductInput = document.getElementById("selectedProduct");

function updateProductTotal() {
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const price = parseFloat(selectedOption.dataset.price);
    const quantity = parseInt(quantityInput.value);
    const total = price * quantity;
    
    productTotalLabel.textContent = `$${total}`;
    selectedProductInput.value = `${selectedOption.value} - $${price}`;
    
    // Cambiar la imagen del producto
    productImage.src = selectedOption.value === "PANDA" ? "PANDA.jpg" :
                       selectedOption.value === "AGUILA" ? "images.jpg" :
                       "images (1).jpg";
}

productSelect.addEventListener("change", updateProductTotal);
quantityInput.addEventListener("input", updateProductTotal);

addButton.addEventListener("click", () => {
    const selectedProduct = selectedProductInput.value;
    const quantity = quantityInput.value;
    const price = parseFloat(productSelect.options[productSelect.selectedIndex].dataset.price);
    const total = price * quantity;

    const listItem = document.createElement("li");
    listItem.textContent = `${selectedProduct} - Cantidad: ${quantity} - Total: $${total}`;
    invoiceList.appendChild(listItem);

    const currentTotal = parseFloat(totalPriceLabel.textContent);
    totalPriceLabel.textContent = (currentTotal + total).toFixed(2);
});

clearButton.addEventListener("click", () => {
    const lastItem = invoiceList.lastElementChild;
    if (lastItem) {
        const totalText = lastItem.textContent;
        const totalMatch = totalText.match(/Total: \$(\d+(\.\d+)?)/);
        if (totalMatch) {
            const totalValue = parseFloat(totalMatch[1]);
            const currentTotal = parseFloat(totalPriceLabel.textContent);
            totalPriceLabel.textContent = (currentTotal - totalValue).toFixed(2);
        }
        invoiceList.removeChild(lastItem);
    }
});

// Inicializar el total del producto al cargar la página
updateProductTotal();