import { useEffect, useState } from "react";
import API from "../utils/api";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  Box,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Fetch products for current user
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Synced to WooCommerce":
        return "success";
      case "Sync Failed":
        return "error";
      case "Created Locally":
      default:
        return "warning";
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success("Product deleted");
    

    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        My Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image_url}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ₹ {product.price}
                </Typography>
                <Chip
                  label={product.status}
                  color={getStatusColor(product.status)}
                  size="small"
                  sx={{ mt: 1 }}
                />
                {/* Action Buttons */}
                <Stack direction="row" spacing={6} mt={2}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
