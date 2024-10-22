import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { SortDirection } from '../models/sort-direction.enum';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  searchText = '';
  sortDirection: SortDirection = SortDirection.Ascending;
  sortColumn: keyof Student = 'firstName';  // מוודא שזה שדה מתוך המודל של Student
  defaultImage: string = 'path-to-default-image.jpg';

  columns = [
    { label: 'תמונת ילד', field: 'imageUrl' as keyof Student }, // field as keyof Student
    { label: 'תעודת זהות', field: 'id' as keyof Student },
    { label: 'שם פרטי', field: 'firstName' as keyof Student },
    { label: 'שם משפחה', field: 'lastName' as keyof Student },
    { label: 'תאריך לידה', field: 'birthDate' as keyof Student },
    { label: 'ארץ לידה', field: 'country' as keyof Student },
    { label: 'מגדר', field: 'gender' as keyof Student },
    { label: 'כיתה', field: 'class' as keyof Student },
    { label: 'סטטוס שאלון', field: 'questionnaireStatus' as keyof Student },
    { label: 'סטטוס תוכנית אישית', field: 'personalProgramStatus' as keyof Student },
    { label: 'סטטוס תלמיד', field: 'studentStatus' as keyof Student },
    { label: 'סוג תלמיד', field: 'studentType' as keyof Student },
    { label: 'מ.זיהוי קודם', field: 'previousIdentificationNumber' as keyof Student }
  ];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(
      data => this.students = data,
      error => console.error('There was an error!', error)
    );
  }

  getPaginatedStudents() {
    return this.students
      .filter(student => student.firstName.includes(this.searchText)) // פילטר חיפוש
      .sort((a, b) => {
        const compare = a[this.sortColumn] < b[this.sortColumn] ? -1 : 1;
        return this.sortDirection === SortDirection.Ascending ? compare : -compare;
      })
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  toggleSort(column: keyof Student) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === SortDirection.Ascending 
        ? SortDirection.Descending 
        : SortDirection.Ascending;
    } else {
      this.sortColumn = column;
      this.sortDirection = SortDirection.Ascending;
    }
  }

  getTotalPages() {
    return Math.ceil(this.students.length / this.itemsPerPage);
  }
}
