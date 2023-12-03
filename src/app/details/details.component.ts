import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  userForm: any;
  submitted = false;
  statusMessage: any = '';
  // dipendancy injection
  constructor(
    private formBuilder: FormBuilder,
    private userService: DetailsService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  get formControls() {
    return this.userForm.controls;
  }
  // button on submit
  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      this.statusMessage = `Enter User Details`;
    } else {
      const userData = this.userForm.value;
      // subscribe the values
      this.userService.addUser(userData).subscribe((response) => {
        // onsubmit response
        this.statusMessage = `User details saved successfully. User ID: ${response.id}`;
        // console the details response
        console.log('Response:', response);
        this.submitted = false;
        // reset the form
        this.userForm.reset();
      });
    }
  }
}
