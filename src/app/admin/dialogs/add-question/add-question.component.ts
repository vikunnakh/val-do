import { Component, Inject, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {
  form!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _matDialogRef: MatDialogRef<AddQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: Question
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      question: new FormControl('', [Validators.required]),
      answers: new FormArray([], [Validators.required])
    });

    // set data id exsits
    if(this._data) {
      this.form.patchValue(this._data);
      this._data.answers.forEach((el) => {
        this.answers.push(
          this._formBuilder.group({
            answers: new FormControl(el.answer, [Validators.required]),
            isCorrect: new FormControl(el.isCorrect, [Validators.required]),
          })
        );
      });
    }
  }


  get answers(): FormArray {
    return this.form.controls['answers'] as FormArray;
  }

  add() {
    this.answers.push(
      this._formBuilder.group({
        answer: new FormControl('', [Validators.required]),
        isCorrect: new FormControl(false, [Validators.required])
      })
    )
  }


  isTrue(i: number) {
    this.answers.controls.forEach((el: any, index) => {
      el.controls['isCorrect'].patchValue(i == index ? true : false);
    })
  }

  delete(i: number) {
    this.answers.removeAt(i);
  }

  submit() {
    this._matDialogRef.close({
      isEdit: this._data ? true : false,
      question: this.form.value
    });
  }
}
