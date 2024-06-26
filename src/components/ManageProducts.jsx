import React, { useRef } from 'react';

export default function ManageProducts() {
  const addProductsForm = useRef();
  const updateProductsForm = useRef();

  const moveToUpdateProducts = () => {
    addProductsForm.current.style.display = 'none';
    updateProductsForm.current.style.display = 'grid';
  }

  const moveToAddProducts = () => {
    updateProductsForm.current.style.display = 'none';
    addProductsForm.current.style.display = 'grid';
  }

  return (
    <>
      <div className="products" id="addProducts">

        <form className="form" ref={addProductsForm}>

          <div className="buttonMerger">
            <input type="button" id="actionProductsLeft" value="Add Products" class="green underline" />
            <input type="button" id="actionProductsRight" value="Update Products" class="red" onClick={moveToUpdateProducts} />
          </div>

          <label htmlFor="productName">Product Name:</label>
          <input type="text" name="productName" id="productName" />

          <label htmlFor="productCat">Product Category:</label>
          <select name="productCat" id="productCat">
            <option value="NA">NA</option>
            <option value="abc">abc</option>
            <option value="xyz">xyz</option>
          </select>

          <label htmlFor="productPrice">Product Price:</label>
          <input type="number" name="productPrice" id="productPrice" min="0" />

          <label htmlFor="productQuant">Product Quantity:</label>
          <input type="number" name="productQuant" id="productQuant" min="0" />

          <label htmlFor="productImg">Product Image:</label>
          <input type="file" name="productImg" id="productImg" accept='.jpg,.jpeg,.png' />

          <button type="submit" class="btnProduct">Add Product</button>

        </form>

        <form className="form" ref={updateProductsForm} id="updateProductsForm">

          <div className="buttonMerger">
            <input type="button" id="actionProductsLeft" value="Add Products" class="red" onClick={moveToAddProducts} />
            <input type="button" id="actionProductsRight" value="Update Products" class="green underline" />
          </div>

          <label htmlFor="productName">Product Name:</label>
          <select name="productName" id="productName">
            <option value="NA">NA</option>
            <option value="abc">abc</option>
            <option value="xyz">xyz</option>
          </select>

          <label htmlFor="productCat">Product Category:</label>
          <select name="productCat" id="productCat">
            <option value="NA">NA</option>
            <option value="abc">abc</option>
            <option value="xyz">xyz</option>
          </select>

          <label htmlFor="productPrice">Product Price:</label>
          <input type="number" name="productPrice" id="productPrice" min="0" />

          <label htmlFor="productQuant">Product Quantity:</label>
          <input type="number" name="productQuant" id="productQuant" min="0" />

          <label htmlFor="productImg">Product Image:</label>
          <input type="file" name="productImg" id="productImg" accept='.jpg,.jpeg,.png' />

          <button type="submit" class="btnProduct">Update Product</button>

        </form>

        <div className="tableContainer">
          <span id="productsTitle">Products</span>
          <table class="productsTable">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Quantity</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
            </tr>
          </table>
        </div>

      </div>
    </>
  )
}