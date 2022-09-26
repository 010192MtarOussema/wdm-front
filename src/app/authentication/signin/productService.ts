import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ProductService {

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    anyNames: string[] = [
        "Bamboo Watch", 
        "Black Watch", 
        "Blue Band", 
        "Blue T-Shirt", 
        "Bracelet", 
        "Brown Purse", 
        "Chakra Bracelet",
        "Galaxy Earrings",
        "Game Controller",
        "Gaming Set",
        "Gold Phone Case",
        "Green Earbuds",
        "Green T-Shirt",
        "Grey T-Shirt",
        "Headphones",
        "Light Green T-Shirt",
        "Lime Band",
        "Mini Speakers",
        "Painted Phone Case",
        "Pink Band",
        "Pink Purse",
        "Purple Band",
        "Purple Gemstone Necklace",
        "Purple T-Shirt",
        "Shoes",
        "Sneakers",
        "Teal T-Shirt",
        "Yellow Earbuds",
        "Yoga Mat",
        "Yoga Set",
    ];

    constructor(private http: HttpClient) { }

    getanysSmall() {
        return this.http.get<any>('assets/anys-small.json')
        .toPromise()
        .then(res => <any[]>res.data)
        .then(data => { return data; });
    }

    getanys() {
        return this.http.get<any>('assets/anys.json')
        .toPromise()
        .then(res => <any[]>res.data)
        .then(data => { return data; });
    }

    getanysWithOrdersSmall() {
        return this.http.get<any>('assets/anys-orders-small.json')
        .toPromise()
        .then(res => <any[]>res.data)
        .then(data => { return data; });
    }

    generatePrduct(): any {
        const any: any =  {
            id: this.generateId(),
            name: this.generateName(),
            description: "any Description",
            price: this.generatePrice(),
            quantity: this.generateQuantity(),
            category: "any Category",
            inventoryStatus: this.generateStatus(),
            rating: this.generateRating()
        };

        any.image = any.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
        return any;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }

    generateName() {
        return this.anyNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generatePrice() {
        return Math.floor(Math.random() * Math.floor(299)+1);
    }

    generateQuantity() {
        return Math.floor(Math.random() * Math.floor(75)+1);
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5)+1);
    }
}