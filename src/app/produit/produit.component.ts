import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  produits: any=[];

  modalTitle="";
  Id=0;
  Libelle="";
  Description="";
  PU=0;
  Quantite=0;
  DatePeremption="";

  constructor(private produitService: ProduitService) {
    
  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.produitService.getEmployees().subscribe(
      res=>{
        console.log(res);
        this.produits=res;
        console.log(this.produits);
      },
      err=>{
        console.log(err);
      }
    )
  }

  addClick(){
    this.modalTitle="Ajout Employee";
    this.Id=0;
    this.Libelle="";
    this.Description="";
    this.PU=0;
    this.Quantite=0;
    this.DatePeremption="";
  }

  editClick(produit:any){
    this.modalTitle="Modification Employee";
    this.Id=produit.Id;
    this.Libelle=produit.Libelle;
    this.Description=produit.Description;
    this.PU=produit.PU;
    this.Quantite=produit.Quantite;
    this.DatePeremption=produit.DatePeremption;
  }

  createClick(){
    var produit={
      Libelle:this.Libelle,
      Description:this.Description,
      PU:this.PU,
      Quantite:this.Quantite,
      DatePeremption:this.DatePeremption
    };

    this.produitService.create(produit).subscribe(
      res=>{
        console.log(res);
        alert(res.toString())
        this.refreshList();
      },
      err=>{
        console.log(err);
      }
    )
  }

  updateClick(){
    var produit={
      Id:this.Id,
      Libelle:this.Libelle,
      Description:this.Description,
      PU:this.PU,
      Quantite:this.Quantite,
      DatePeremption:this.DatePeremption
    };

    this.produitService.update(produit,produit.Id).subscribe(
      res=>{
        console.log(res);
        alert(res.toString())
        this.refreshList();
      },
      err=>{
        console.log(err);
      }
    )
  }

  delete(id:any){
    if (confirm('Etes-vous sur de vouloir supprimer?')) {
      this.produitService.delete(id).subscribe(
      res=>{
        console.log(res);
        alert(res.toString())
        this.refreshList();
      },
      err=>{
        console.log(err);
      }
    )
    }
    
  }
}
