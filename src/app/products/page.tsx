"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import img from "next/image";
import { Product

 } from "@/types/products";

 export default function ProductsPage(){
    const[products ,setProducts]=useState<Product[]>([]);
    const[loading, setLoading] = useState(true);

    useEffect(()=> {
        fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    if (loading){
        return<p className="text-center mt-10">loding products...</p>

    }
    return(
      <div style={{ padding: "20px" }}>
      <h1>Catálogo de productos</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "15px",
        }}
      >
        {products.map(function (producto) {
          return (
            <div
              key={producto.id}
              style={{ border: "1px solid gray", padding: "10px" }}
            >
              <img src={producto.image} alt={producto.title} width="100" />
              <h3>{producto.title}</h3>
              <p>Categoria: {producto.category}</p>
              <p>Precio: ${producto.price}</p>
              <Link href={`/productos/${producto.id}`}>Ver detalle</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}