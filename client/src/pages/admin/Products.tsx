import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  status: string;
  category: string;
  price: string;
  date: string;
}

const Products: React.FC = () => {
  const initialProducts: Product[] = [
    {
      id: '39842-231',
      name: 'Macbook Pro 15\'',
      status: 'Available',
      category: 'Laptops',
      price: '$2,999.00',
      date: '20 Jan, 2022'
    },
    {
      id: '39842-232',
      name: 'Macbook Pro 13\'',
      status: 'In Review',
      category: 'Laptops',
      price: '$2,999.00',
      date: '22 Feb, 2022'
    },
    {
      id: '39842-233',
      name: 'iPhone 13 Mini',
      status: 'Sold Out',
      category: 'Phones',
      price: '$2,999.00',
      date: '22 Feb, 2022'
    },
    {
      id: '39842-234',
      name: 'iPhone 14',
      status: 'Preorder',
      category: 'Phones',
      price: '$2,999.00',
      date: '22 Feb, 2022'
    },
    {
      id: '39842-235',
      name: 'AirPods 2',
      status: 'Available',
      category: 'Electronics',
      price: '$2,999.00',
      date: '22 Feb, 2022'
    }
  ];

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setFormMode('add');
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setFormMode('edit');
    setShowForm(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: formData.get('id') as string,
      name: formData.get('name') as string,
      status: formData.get('status') as string,
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      date: formData.get('date') as string,
    };

    if (formMode === 'add') {
      setProducts([...products, newProduct]);
    } else if (formMode === 'edit' && currentProduct) {
      setProducts(products.map(product => product.id === currentProduct.id ? newProduct : product));
    }

    setShowForm(false);
  };

  const confirmDelete = () => {
    if (currentProduct) {
      setProducts(products.filter(product => product.id !== currentProduct.id));
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="products p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center">
        <FaPlus className="mr-2" /> Add Product
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.status}</td>
              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.date}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEditProduct(product)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 flex items-center">
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button onClick={() => handleDeleteProduct(product)} className="bg-red-500 text-white px-2 py-1 rounded flex items-center">
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/2">
            <h2 className="text-xl font-bold mb-4">{formMode === 'add' ? 'Add Product' : 'Edit Product'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-1">ID</label>
                <input name="id" defaultValue={currentProduct?.id || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input name="name" defaultValue={currentProduct?.name || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <input name="status" defaultValue={currentProduct?.status || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Category</label>
                <input name="category" defaultValue={currentProduct?.category || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Price</label>
                <input name="price" defaultValue={currentProduct?.price || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Date</label>
                <input name="date" defaultValue={currentProduct?.date || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
            <div className="flex justify-end mt-4">
              <button type="button" onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button type="button" onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
