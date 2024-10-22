import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ממשק לתלמיד
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  gender: string;
  class: string;
  questionnaireStatus: string;
  personalProgramStatus: string;
  studentStatus: string;
  studentType: string;
  previousId: string;
  photoUrl: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';
  sortDirection: boolean = true; // true: ascending, false: descending
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getStudentsFromServer();
  }

  // קריאה לשרת כדי לקבל את רשימת התלמידים
  getStudentsFromServer(): void {
    this.http.get<Student[]>('/api/students')
      .subscribe(data => {
        this.students = data;
        this.filteredStudents = [...this.students]; // יצירת עותק עבור הסינון
      });
  }

  // פונקציה לחיפוש לפי שם פרטי
  onSearch(term: string): void {
    this.searchTerm = term;
    this.filteredStudents = this.students.filter(student =>
      student.firstName.toLowerCase().includes(term.toLowerCase())
    );
  }

  // פונקציה למיון התלמידים
  sortBy(property: keyof Student): void {
    this.sortDirection = !this.sortDirection; // שינוי כיוון המיון
    const direction = this.sortDirection ? 1 : -1;
    this.filteredStudents.sort((a, b) => {
      if (a[property] < b[property]) return -1 * direction;
      if (a[property] > b[property]) return 1 * direction;
      return 0;
    });
  }

  // פונקציה לדפדוף בין דפים
  getPaginatedStudents(): Student[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredStudents.slice(startIndex, startIndex + this.pageSize);
  }

  // פונקציות לדפדוף
  goToPage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredStudents.length / this.pageSize);
  }
}
