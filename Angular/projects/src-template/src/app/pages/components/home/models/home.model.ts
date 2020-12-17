export class ItemModel{
    IdItem: string
    IdType: string
    Name: string
    Money: string
    Sales: string
    RateAvg: string
    LinkImage: string

    clear(){
        this.IdItem = '';
        this.IdType = '';
        this.Name = '';
        this.Money = '';
        this.Sales = '';
        this.RateAvg = '';
        this.LinkImage = '';
    }

    copy(item: ItemModel){
        this.IdItem = item.IdItem;
        this.IdType = item.IdType;
        this.Name = item.Name;
        this.Money = item.Money;
        this.Sales = item.Sales;
        this.RateAvg = item.RateAvg;
        this.LinkImage = item.LinkImage;
    }
}