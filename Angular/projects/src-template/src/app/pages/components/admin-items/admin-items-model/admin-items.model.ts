
export class AdminItemsModel{
    Id: string;
    IdAccount: string;
    IdTransactionDetail: string;
    IdItem: string;
    Text: string;
    Rate: string;

}
export class DataItemsModel{
    IdItem:string = "";
    IdType:string = "";
    Name:string ="";
    Money:string = "";
    Type:string = "";
    Sales:string = "";
    RateAvg:string = "";
    LinkImage:string = "";

    clear(){
        this.IdItem = "";
        this.IdType = "";
        this.Type = "";
        this.Name = "";
        this.Money = "";
        this.Sales = "";
        this.RateAvg = "";
        this.LinkImage = "";
    }
    
    copy(item: DataItemsModel){
        this.IdItem = item.IdItem;
        this.IdType = item.IdType;
        this.Type = item.Type;
        this.Name = item.Name;
        this.Money = item.Money;
        this.Sales = item.Sales;
        this.RateAvg = item.RateAvg;
        this.LinkImage = item.LinkImage;
    }
}
export class ItemsImportModel{
    IdItem:string = "";
    IdType:string = "";
    Name:string ="";
    Money:string = "";
    Type:string = "";
    Sales:string = "";
    RateAvg:string = "";
    LinkImage:string = "";

    clear(){
        this.IdItem = "";
        this.IdType = "";
        this.Type = "";
        this.Name = "";
        this.Money = "";
        this.Sales = "";
        this.RateAvg = "";
        this.LinkImage = "";
    }
}
export class SaveItemsImportModel{
    IdItem:string = "";
    IdType:string = "";
    Type:string = "";
    Name:string ="";
    Money:string = "";
    Sales:string = "";
    RateAvg:string = "";
    LinkImage:string = "";
}

export class Import{
    MaNhomHH= ""
    TenNhomHH= ""
    GhiChu= ""
    Id_LoaiHH: number
    isError: boolean
    messageError= ""
    clear(){
        this.MaNhomHH = '';
        this.TenNhomHH = '';
        this.GhiChu = '';
        this.Id_LoaiHH = 0;
        this.isError = false;
        this.messageError = '';
    }
}