import React from 'react'

export default function Product(props) {
    const {product, onAdd} = props;
    return (
        <div>
            <img classNmae="small" src={product.image} alt={product.name}></img>
            <h3>{product.name}</h3>
            <div>${product.price}</div>
            <div>
                <button onClick={this.onAdd}>Add to Cart</button>
            </div>
        </div>
    );
}
