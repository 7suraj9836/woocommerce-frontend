import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await API.post("/products", {
        ...form,
        price: parseFloat(form.price),
      });

      if (res.status === 201) {
        setIsLoading(true);
        toast.success("Product added successfully");
        navigate("/products");
      }
    } catch (err) {
      setIsLoading(true);
      toast.error("Unable to add product");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Product
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
            <TextField
              label="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
            <TextField
              label="Image URL"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Save Product
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ProductForm;
