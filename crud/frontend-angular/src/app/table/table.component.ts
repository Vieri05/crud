import { Component, OnInit } from '@angular/core';
import { DipendentiService } from '../dipendenti.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { Person } from '../model/person';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PaginationComponent,FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent implements OnInit {
  data: any;
  currentPage : number =1;
  showForm : boolean = false;

  newEmployee: Person = {   
    birthDate:"" ,
    firstName: "",
    gender:"",
    hireDate:"",
    lastName: "",
  };


  constructor(private dipendentiService: DipendentiService) { }

  ngOnInit(): void {
    this.loadData(0, 10);
  }

  loadData(page: number, size: number): void {
    this.dipendentiService.get(page, size).subscribe(response => {
      this.data = response;
    });
  }



  deleteItem(id: number): void {
    this.dipendentiService.delete(id)
      .subscribe(() => {
        this.loadData(0, 10);
      });
  }


  loadFirstPage(): void {
    this.loadData(1,10);
    this.currentPage = 1;
  }

  loadPreviousPage(): void {
    if (this.currentPage > 1) {
      this.loadData(this.currentPage - 1,10);
      this.currentPage--;
    }
  }

  loadNextPage(): void {
    this.loadData(this.currentPage + 1,10);
    this.currentPage++;
  }

  loadLastPage(): void {
    this.dipendentiService.get(-1, 10)
      .subscribe(response => {
        const totalPages = Math.ceil(response.page.totalElements / 10);
        this.loadData(totalPages,10);
        this.currentPage = totalPages;
      });
  }



  personAdd = () => {
    
    this.dipendentiService.add(this.newEmployee);
    
    this.showForm = false;
  }

  addMode = ()=> {
    this.showForm = true;

  }

}
