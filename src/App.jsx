/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

const Products = ({ products }) => (
  products.map(value => (
    <tr key={value.id} data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {value.id}
      </td>

      <td data-cy="ProductName">{value.name}</td>
      <td data-cy="ProductCategory">{`${value.category.icon} - ${value.category.title}`}</td>

      <td
        data-cy="ProductUser"
        className="has-text-link"
      >
        {value.owner.name}
      </td>
    </tr>
  ))
);

const Users = ({
  setProducts,
  setFilteredByUsers,
  filteredByUsers,
}) => (
  usersFromServer.map(user => (
    <a
      key={user.id}
      data-cy="FilterAllUsers"
      href="#/"
      onClick={() => {
        const filteredProducts = FilterByUsers(preparedProducts(), user);

        setFilteredByUsers(filteredProducts);
        setProducts(filteredByUsers);
      }}
    >
      {user.name}
    </a>
  ))
);

const preparedProducts = () => (
  [...productsFromServer].map((value) => {
    const category = categoriesFromServer.find(item => (
      value.categoryId === item.id
    ));

    const owner = usersFromServer.find(user => (
      user.id === category.ownerId
    ));

    return {
      ...value,
      category,
      owner,
    };
  })
);

const FilterByUsers = (products, user) => (
  products.filter(product => (
    product.owner.name === user.name
  ))
);

export const App = () => {
  const [products, setProducts] = useState(preparedProducts());
  const [filteredByUsers, setFilteredByUsers] = useState(products);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
              >
                All
              </a>

              <Users
                setProducts={setProducts}
                products={products}
                filteredByUsers={filteredByUsers}
                setFilteredByUsers={setFilteredByUsers}
              />
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <Products products={products} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
