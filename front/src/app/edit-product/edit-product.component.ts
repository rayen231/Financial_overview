
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { RouterModule, Router } from '@angular/router';  
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  productId: string | null = '';
  productName: string = '';
  productDescription: string = '';
  productPrice: number = 0;
  productStock: number = 0;

  constructor(private testService: TestService,private route: ActivatedRoute,private router: Router ) {
    // Get the 'id' parameter from the route
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
    });
  }
  ngOnInit(): void {
    // Load products when the component is initialized
    const productIdNumber = this.productId ? +this.productId : 0;
    this.testService.getProduct(productIdNumber).subscribe(
    (product) => {
      this.productName = product.name;
      this.productDescription = product.description;
      this.productPrice = product.price;
      this.productStock = product.stock;
      console.log('Product ID:', this.productId);
      console.log('Product Name:', this.productName);
      console.log('Product Description:', this.productDescription);
      console.log('Product Price:', this.productPrice);
      console.log('Product Stock:', this.productStock);
    }
    );
  }
  editProduct(): void {
    const updatedProduct = {
      id: this.productId ? +this.productId : 0,
      name: this.productName,
      description: this.productDescription,
      price: this.productPrice,
      stock: this.productStock
    };

    this.testService.editProduct(updatedProduct).subscribe(
      (product) => {
        console.log('Product updated successfully:', product);

        // Show SweetAlert success message
        Swal.fire({
          title: 'Success!',
          text: 'Product updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redirect to the test page after the success message
          this.router.navigate(['/test']);
        });
      },
      (error) => {
        console.error('Error updating product:', error);

        // Optionally, show an error message
        Swal.fire({
          title: 'Error!',
          text: 'There was an error updating the product.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
