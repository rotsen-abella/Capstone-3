import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function DeactivateProduct({ productId, isActive, fetchData }) {
  	// console.log(productId)
  const deactivateToggle = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ productId }),
    })
      .then((res) => res.json())
      .then((data) => {
      	console.log(data)
        if (data.message === "Product archived successfully") {
          Swal.fire({
            title: 'Product Deactivated',
            icon: 'success',
          });
          fetchData();
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Failed to deactivate product',
            icon: 'error',
          });
        }
      })
      .catch((error) => {
        console.log('Error archiving product:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to deactivate product',
          icon: 'error',
        });
      });
  };

  const activateToggle = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ productId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product activated successfully") {
          Swal.fire({
            title: 'Product Activated',
            icon: 'success',
          });
          fetchData();
        } else {
          Swal.fire({
            title: 'Error',
            text:'Failed to activate product',
            icon: 'error',
          });
        }
      })
      .catch((error) => {
        console.error('Error activating product:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to activate product',
          icon: 'error',
        });
      });
  };

  return (
    <>
      {isActive ? (
        <Button variant="danger" onClick={deactivateToggle}>
          Deactivate
        </Button>
      ) : (
        <Button   variant="success" onClick={activateToggle}>
          Activate
        </Button>
      )}
    </>
  );
}