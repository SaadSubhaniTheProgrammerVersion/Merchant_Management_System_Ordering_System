import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';
import { InvoiceService } from '../shared/invoice.service';
import { Invoice } from '../shared/invoice.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  constructor(public orderService: OrderService, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //  this.resetForm();
    this.refreshOrderList();

  }
  refreshOrderList() {
    this.orderService.getOrderList().subscribe((res) => {
      this.orderService.orders = res as Order[];
    });
  }


  // resetForm(form?: NgForm) {
  //   if (form)
  //     form.reset();
  //   this.studentService.selectedStudent = {
  //     _id: "",
  //     name: "",
  //     cms: 0,
  //     email: "",
  //     phone: "",
  //     address: ""

  //   }
  // }
  // onSubmit(form: NgForm) {
  //   if (this.studentService.selectedStudent._id == "") {
  //     this.studentService.postStudent(form.value).subscribe((res) => {
  //       this.resetForm(form);;
  //       this.refreshStudentList();
  //       if(res==true){
  //       M.toast({ html: 'Saved successfully', classes: 'rounded'});
  //       }
  //       else{
  //         alert('CMS already exists');
  //       }
  //     });


  // }
  //   else {
  //     this.studentService.putStudent(form.value).subscribe((res) => {
  //       this.resetForm(form);
  //       this.refreshStudentList();
  //       M.toast({ html: 'Updated successfully', classes: 'rounded' });
  //     });
  //   }
  editOrderStatus(ord: Order) {
    this.orderService.statusOrder(ord).subscribe((res) => {
      this.refreshOrderList();
      this.snackBar.open('Updated Successfully!', '', {
        duration: 3000,
      });
    }
    );
  }
  editOrderAddress(ord: Order) {
    var shipping_address = prompt("Enter the new shipping address: ");


    if (shipping_address == null) {
      shipping_address = ord.shipping_address;
    }

    ord.shipping_address = shipping_address;

    this.orderService.putOrder(ord).subscribe((res) => {
      this.refreshOrderList();
      this.snackBar.open('Updated Successfully!', '', {
        duration: 3000,
      });
    }
    );

  }
  deleteOrder(ord: Order) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.orderService.deleteOrder(ord).subscribe((res) => {
        this.refreshOrderList();
        this.snackBar.open('Deleted Successfully!', '', {
          duration: 3000,
        });
      });
    }
  }
  navigateToHome() {
    this.router.navigate(['products']);
  }
  viewProducts(ord: Order) {
    this.orderService.getInvoiceList(ord).subscribe((res) => {
      let invoice: any
      invoice = res;


      // Create a modal container
      const modalContainer = document.createElement("div");
      modalContainer.id = "modal-container";

      // Create a modal content container
      const modalContent = document.createElement("div");
      modalContent.id = "modal-content";

      // Add some content to the modal
      const modalHeading = document.createElement("h3");
      modalHeading.textContent = "Invoice Details";
      modalHeading.id="modal-heading";
      modalContent.appendChild(modalHeading);

      const modalBody = document.createElement("div");

      // Loop through each invoice in the response and display its details


      for (const list of invoice) {
        const invoiceElement = document.createElement("div");

        invoiceElement.innerHTML = `
          <p><b> Order id:</b> ${"..."+list.order_id.slice(list.order_id.length-5, list.order_id.length)}</p>
          <p><b> Product_id:</b>${"..."+list.product_id.slice(list.product_id.length-5, list.product_id.length)}</p>
          <p><b> Quanity: ${list.quantity}</b></p>
          <p><b> Cost:</b> ${list.cost}</b></p>
          <hr>
        `;

        modalBody.appendChild(invoiceElement);
      }

      modalContent.appendChild(modalBody);

      // Add the modal content to the modal container
      modalContainer.appendChild(modalContent);

      // Add the modal container to the page
      document.body.appendChild(modalContainer);

    
//add a button in the end to close the modal
      const modalCloseButton = document.createElement("button");
      modalCloseButton.id = "modal-close-button";
      modalCloseButton.textContent = "Close";
      modalContent.appendChild(modalCloseButton);

      // Add an event listener to the close button
      modalCloseButton.addEventListener("click", () => {
        // Remove the modal container from the page
        document.body.removeChild(modalContainer);
      }
      );
      

   
    });
  }
}
