import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import {
  TextField,
  Container,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams(); // product ID from URL
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await API.get("/products");
        const product = res.data.products.find((p) => p.id.toString() === id);
        if (!product) {
          toast.error("Product not found");
          return navigate("/products");
        }
        setForm(product);
        setLoading(false);
      } catch (err) {
        toast.error("Error loading product");
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/products/${id}`, {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        image_url: form.image_url,
      });
      toast.success("Product updated successfully");
      navigate("/products");
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  if (loading || !form) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Edit Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            margin="normal"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <TextField
            fullWidth
            label="Image URL"
            margin="normal"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Update Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProduct;
