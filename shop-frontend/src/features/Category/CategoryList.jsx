import { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoryCreate } from "./categorySlice";

export default function CategoryList() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [newCategory, setNewCategory] = useState();
  const categories = useSelector((state) => state.category.data);
  const { loading } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const {products} = useSelector((state) => state.product);
  const user = useSelector((state) => state.auth.data);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreateCategory = async () => {
    try {
      const response = await dispatch(
        categoryCreate({ name: newCategory })
      ).unwrap();
      if (response) {
        setNewCategory("");
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProductCount = (categoryId) => {
    return products.filter((product) => product.categoryId === categoryId).length;
  }

  useEffect(() => {}, [categories, products]);

  return (
    <>
      <div className="container mt-3">
        <h1>Categories</h1>

        <Button variant="success" onClick={handleShow}>
          Add New Category
        </Button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>No. of Products</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                {/* use link to navigate category */}
                <td>
                  <a
                    onClick={() => {
                      if (user.isAdmin) {
                        // navigate to category page
                        navigate(category._id);
                      }
                    }}
                  >
                    {category.name}
                  </a>
                </td>
                {/* get the product count of each category */}
                <td>{getProductCount(category._id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>New Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="new category"
                autoFocus
                required
                max={20}
                min={5}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {loading ? (
            <Button variant="success" disabled>
              Loading... <Spinner animation="grow" variant="light" />
            </Button>
          ) : (
            <Button
              variant="success"
              type="submit"
              onClick={handleCreateCategory}
            >
              Create
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
