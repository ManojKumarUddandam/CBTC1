import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import AngularFirestore
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild("createPortfolioform") portfolioForm !: NgForm;

  constructor(private firestore: AngularFirestore) {} // Inject AngularFirestore

  resetForm(): void {
    this.portfolioForm.reset({
      'name': '',
      'email': '',
      'textarea': ''
    });
  }

  submitForm(): void {
    const formData = this.portfolioForm.value;
    this.firestore.collection('users').add(formData) // Save form data to Firestore
      .then(() => {
        alert('Form data submitted successfully!');
        this.resetForm();
      })
      .catch(error => {
        console.error('Error submitting form data:', error);
      });
  }
}