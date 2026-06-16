import React, { useState } from 'react';
import { Product, Category } from '../../types';
import { useStore } from '../../store/useStore';
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
  XIcon,
  SearchIcon,
} from '../../components/Icons';

const emptyProduct: {
  name: string;
  description: string;
  price: number;
  category: Category;
  coverImage: string;
  downloadLink: string;
  features: string[];
  status: 'published' | 'draft';
} = {
  name: '',
  description: '',
  price: 0,
  category: 'ebooks',
  coverImage: '',
  downloadLink: '',
  features: [''],
  status: 'published',
};

const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductStatus } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAddForm = () => {
    setForm(emptyProduct);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      coverImage: product.coverImage,
      downloadLink: product.downloadLink,
      features: product.features.length > 0 ? product.features : [''],
      status: product.status,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = form.features.filter((f) => f.trim() !== '');

    if (editingId) {
      updateProduct(editingId, { ...form, features });
    } else {
      addProduct({
        ...form,
        id: `prod-${Date.now()}`,
        features,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
      });
    }

    setShowForm(false);
    setForm(emptyProduct);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ''] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: newFeatures.length > 0 ? newFeatures : [''] });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Products</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">{products.length} total products</p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          <PlusIcon size={16} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <SearchIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 transition-colors"
        />
      </div>

      {/* Product List */}
      <div className="bg-white dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-50 dark:bg-surface-800/80">
                <th className="text-left text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider px-5 py-3">Product</th>
                <th className="text-left text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Category</th>
                <th className="text-left text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider px-5 py-3">Price</th>
                <th className="text-left text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Status</th>
                <th className="text-right text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-700/50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.coverImage}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-surface-900 dark:text-white truncate max-w-[200px]">
                          {product.name}
                        </p>
                        <p className="text-xs text-surface-400 sm:hidden capitalize">
                          {product.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className="text-sm text-surface-600 dark:text-surface-400 capitalize">
                      {product.category === 'ebooks' ? 'eBook' : product.category === 'templates' ? 'Template' : 'Course'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm font-medium text-surface-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                      product.status === 'published'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : 'bg-surface-100 text-surface-500 dark:bg-surface-700 dark:text-surface-400'
                    }`}>
                      {product.status === 'published' ? '● Published' : '○ Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleProductStatus(product.id)}
                        className="p-2 text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        title={product.status === 'published' ? 'Set as Draft' : 'Publish'}
                      >
                        {product.status === 'published' ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                      </button>
                      <button
                        onClick={() => openEditForm(product)}
                        className="p-2 text-surface-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Edit"
                      >
                        <EditIcon size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="p-2 text-surface-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-surface-400 text-sm">
            No products found
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-sm w-full animate-scale-in shadow-2xl">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">Delete Product?</h3>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">
              This action cannot be undone. The product will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl text-sm font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-8 px-4">
          <div className="bg-white dark:bg-surface-800 rounded-2xl w-full max-w-2xl animate-scale-in shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 text-surface-400 hover:text-surface-600 transition-colors"
              >
                <XIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                    className="w-full px-4 py-2.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 transition-colors"
                  >
                    <option value="ebooks">eBook</option>
                    <option value="templates">Design Template</option>
                    <option value="courses">Online Course</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  Download / Access Link *
                </label>
                <input
                  type="text"
                  value={form.downloadLink}
                  onChange={(e) => setForm({ ...form, downloadLink: e.target.value })}
                  required
                  placeholder="https://example.com/download"
                  className="w-full px-4 py-2.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 transition-colors"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  Features
                </label>
                <div className="space-y-2">
                  {form.features.map((feature, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(i, e.target.value)}
                        placeholder={`Feature ${i + 1}`}
                        className="flex-1 px-4 py-2 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-lg text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 transition-colors"
                      />
                      {form.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(i)}
                          className="p-2 text-surface-400 hover:text-red-500 transition-colors"
                        >
                          <XIcon size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addFeature}
                  className="mt-2 text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline"
                >
                  + Add Feature
                </button>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={form.status === 'published'}
                      onChange={() => setForm({ ...form, status: 'published' })}
                      className="accent-primary-600"
                    />
                    <span className="text-sm text-surface-700 dark:text-surface-300">Published</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={form.status === 'draft'}
                      onChange={() => setForm({ ...form, status: 'draft' })}
                      className="accent-primary-600"
                    />
                    <span className="text-sm text-surface-700 dark:text-surface-300">Draft</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
