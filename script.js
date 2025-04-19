const productsData = [
    { id: 1, name: "iPhone 16 Pro", price: 1500, marca: "Apple", favorite: false, category: "Apple" },
    { id: 2, name: "iPhone 15", price: 1200, marca: "Apple", favorite: false, category: "Apple" },
    { id: 3, name: "Galaxy S24 Ultra", price: 1400, marca: "Samsung", favorite: false, category: "Samsung" },
    { id: 4, name: "Galaxy Z Fold 5", price: 1800, marca: "Samsung", favorite: false, category: "Samsung" },
    { id: 5, name: "Pixel 8", price: 799, marca: "Google", favorite: false, category: "Google" },
    { id: 6, name: "Pixel 8 Pro", price: 999, marca: "Google", favorite: false, category: "Google" },
  ];
  
  function App() {
    const [cart, setCart] = React.useState([]);
    const [products, setProducts] = React.useState(productsData);
    const [category, setCategory] = React.useState("All");
  
    const toggleFavorite = (id) => {
      setProducts(prev =>
        prev.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p)
      );
    };
  
    const addToCart = (product) => {
      setCart(prev => [...prev, product]);
    };
  
    const filteredProducts = category === "All"
      ? products
      : products.filter(p => p.category === category);
  
    return (
      <div>
        <h1>Carrito de Celulares</h1>
        <Filter category={category} setCategory={setCategory} />
        <div className="container">
          <ProductList
            products={filteredProducts}
            onFavorite={toggleFavorite}
            onAddToCart={addToCart}
          />
          <Cart cart={cart} />
        </div>
      </div>
    );
  }
  
  function Filter({ category, setCategory }) {
    return (
      <div>
        <label>Filtrar por categoría: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">Todas las marcas</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Google">Google</option>
        </select>
      </div>
    );
  }
  
  function ProductList({ products, onFavorite, onAddToCart }) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onFavorite={onFavorite}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    );
  }
  
  function ProductCard({ product, onFavorite, onAddToCart }) {
    return (
      <div className="card">
        <h3>{product.name}</h3>
        <p>Precio: ${product.price}</p>
        <p>Categoría: {product.category}</p>
        <button onClick={() => onFavorite(product.id)}>
          {product.favorite ? "★ Favorito" : "☆ Favorito"}
        </button>
        <br />
        <button onClick={() => onAddToCart(product)}>Agregar al carrito</button>
      </div>
    );
  }
  
  function Cart({ cart }) {
    return (
      cart.length > 0 && ( 
        <div className="cart">
          <h2>Carrito</h2>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              {item.name} - ${item.price}
            </div>
          ))}
        </div>
      )
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);